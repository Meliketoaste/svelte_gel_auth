import { type } from 'arktype';

export const formSchema = type({
	username: '3 < string < 10',
	email: 'string.email',
	password: 'string'
});
export type FormSchema = typeof formSchema.infer;
