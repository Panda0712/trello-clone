// constants
// define the api root for dev and production
let apiRoot = "";
if (process.env.BUILD_MODE === "dev") {
  apiRoot = "https://trello-backend-wkjl.onrender.com";
}
if (process.env.BUILD_MODE === "production") {
  apiRoot = "https://trello-backend-wkjl.onrender.com";
}
export const API_ROOT = apiRoot;
