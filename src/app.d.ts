// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import type { ServerRequestAuth } from '@gel/auth-sveltekit/server';
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			auth: ServerRequestAuth;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
