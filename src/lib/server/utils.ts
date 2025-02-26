import e from '$dbschema/edgeql-js';
import type { BuiltinProviderNames, Client, TokenData } from '@gel/auth-sveltekit/server';

export async function createUser({
	client,
	tokenData,
	provider
}: {
	client: Client;
	tokenData: TokenData;
	provider?: BuiltinProviderNames;
}) {
	console.log('Creating user with provider', provider);
	let username: string | null = null;
	// if (provider && provider === 'builtin::oauth_google' && tokenData.provider_token) {
	// 	try {
	// 		const userInfo = await getGoogleUserInfo(tokenData.provider_token);
	// 		username = userInfo.name;
	// 	} catch (e) {
	// 		console.error(
	// 			`Failed to fetch Google user info for user identity ${tokenData.identity_id}:`,
	// 			e
	// 		);
	// 	}
	// }

	const identityQuery = e.select(e.ext.auth.Identity, () => ({
		filter_single: {
			id: tokenData.identity_id
		}
	}));

	const emailFactorQuery = e.select(e.ext.auth.EmailFactor, () => ({
		email: true,
		filter_single: {
			identity: e.select(e.ext.auth.LocalIdentity, () => ({
				filter_single: {
					id: tokenData.identity_id
				}
			}))
		}
	}));

	const userQuery = e.insert(e.User, {
		identity: identityQuery,
		email: emailFactorQuery.email
		//name: username,
	});

	const user = await userQuery.run(client);

	console.log('User created', user.id);
}
