import { defineBackend } from "@aws-amplify/backend";
import { auth } from "./auth/resource";
import { data } from "./data/resource";

/**
 * LinkStash Backend Configuration
 * 
 * This is the main entry point for the Amplify Gen 2 backend.
 * It defines all the backend resources that will be deployed to AWS.
 * 
 * @see https://docs.amplify.aws/gen2/build-a-backend/
 */
const backend = defineBackend({
  auth,
  data,
});

export default backend;

