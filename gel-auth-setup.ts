// essentially stolen from the nextjs template
import { createClient } from 'gel';

// Useally you would go in and generate this through the edgedb UI.
const auth_signing_key =
	'F2KHaJfHi9Dzd8+6DI7FB9IFIoJXnhz2rzG/UzCRE7jTtYxqgTHHydc8xnN6emDB3tlR99FvPsyJfcVLVcQ5odSQpceDXplBOP+N14+EBy2mV6rA/7W7azIEKebtr9TVKrpBTMTOLAXo08ZnA6lvjn0VMs95za6Pta7VW62hjcb8jy6yxulvvU5SWnwa0x2z401K0pLK7byDD5eNqgTl40YaeOGoQ0iCkSmGxvLxyQgCIz2IU0zUbBwC9bQsTDORvflunruJznHuMxwbfYo/czQIIGuawU0H+G3GJZ3hecZLQlvwYCyLF37PFQVrcNMtUuGyDy2OyYtYHru2GW5B7Q';
const client = createClient();
const baseUrl = 'http://localhost:5173';

const SET_CONFIG = 'CONFIGURE CURRENT BRANCH SET';
const RESET_CONFIG = 'CONFIGURE CURRENT BRANCH RESET';
const INSERT_CONFIG = 'CONFIGURE CURRENT BRANCH INSERT';

const RESET_AUTH_CONFIG = `
${RESET_CONFIG} ext::auth::ProviderConfig;
${RESET_CONFIG} ext::auth::AuthConfig;
${RESET_CONFIG} ext::auth::UIConfig;
`;
//${RESET_CONFIG} ext::auth::SMTPConfig;

const SETUP_AUTH_CONFIG = `

${SET_CONFIG} ext::auth::AuthConfig::auth_signing_key := "${auth_signing_key}";
${SET_CONFIG} ext::auth::AuthConfig::app_name := "EdgeDB Sveltekit";
${SET_CONFIG} ext::auth::AuthConfig::allowed_redirect_urls := {
  "${baseUrl}",
};
`;

const SETUP_UI_CONFIG = `
${INSERT_CONFIG} ext::auth::UIConfig {
  redirect_to := "${new URL('auth/builtin/callback', baseUrl)}",
  redirect_to_on_signup := "${new URL('auth/builtin/callback?isSignUp=true', baseUrl)}",
};
`;

const SETUP_EMAIL_PASSWORD_PROVIDER = `
${INSERT_CONFIG} ext::auth::EmailPasswordProviderConfig {
  require_verification := false,
};
  `;

async function main() {
	await client.execute(`
${RESET_AUTH_CONFIG}
${SETUP_AUTH_CONFIG}
${SETUP_UI_CONFIG}
${SETUP_EMAIL_PASSWORD_PROVIDER}
  `);
	// console.log(
	// 	'NOTE: Email password provider is configured, but SMTP is not set up. Please log into your EdgeDB UI and configure SMTP.',
	// );
}

await main();
