import { message, superValidate } from 'sveltekit-superforms';
import { arktype } from 'sveltekit-superforms/adapters';

import e from '$dbschema/edgeql-js';
import { ark, match, type } from 'arktype';
import { fail } from '@sveltejs/kit';
import { formSchema, type FormSchema } from './schema';
import type { Actions } from './$types';

import type { PageServerLoad } from './$types';
import type { TokenData } from '@gel/auth-sveltekit/server';
const defaults: FormSchema = { username: 'hello', email: '', password: '' };

export const load: PageServerLoad = async (event) => {
	const form = await superValidate(arktype(formSchema, { defaults }));

	return {
		form
	};
};

export const actions: Actions = {
	default: async (event) => {
		const request = event.request;

		const form = await superValidate(request, arktype(formSchema, { defaults }));
		console.log(form);

		if (!form.valid) {
			// Return { form } and things will just work.
			return fail(400, { form });
		}

		const gelEmailTokens = (await event.locals.auth.emailPasswordSignUp({
			email: form.data.email,
			password: form.data.password
		})) as { tokenData: TokenData };

		const identityQuery = e.select(e.ext.auth.Identity, () => ({
			filter_single: {
				id: gelEmailTokens.tokenData.identity_id
			}
		}));

		const emailFactorQuery = e.select(e.ext.auth.EmailFactor, () => ({
			email: true,
			filter_single: {
				identity: e.select(e.ext.auth.LocalIdentity, () => ({
					filter_single: {
						id: gelEmailTokens.tokenData.identity_id
					}
				}))
			}
		}));

		const userQuery = e.insert(e.User, {
			identity: identityQuery,
			email: emailFactorQuery.email,
			name: form.data.username
		});

		const user = await userQuery.run(event.locals.auth.session.client);

		console.log('User created', user.id);

		// Return the form with a status message
		return message(form, 'Form posted successfully!');
	}
};
