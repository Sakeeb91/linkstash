import { defineAuth } from "@aws-amplify/backend";

/**
 * LinkStash Authentication Configuration
 * 
 * Uses AWS Cognito for user authentication with email sign-in.
 * Includes password policy for security and optional MFA support.
 * 
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth/
 */
export const auth = defineAuth({
  loginWith: {
    email: true,
  },
  userAttributes: {
    preferredUsername: {
      required: false,
      mutable: true,
    },
  },
  passwordPolicy: {
    minLength: 8,
    requireLowercase: true,
    requireUppercase: true,
    requireNumbers: true,
    requireSymbols: false,
  },
  multifactor: {
    mode: "OPTIONAL",
    totp: true,
  },
});

