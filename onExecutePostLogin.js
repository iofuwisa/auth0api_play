const DEFAULT_ROLE_LIST = ["Set your role's id"]

exports.onExecutePostLogin = async (event, api) => {
  const ManagementClient = require("auth0").ManagementClient;

  const management = new ManagementClient({
    domain: event.secret.domain,
    clientId: event.secret.clientId,
    clientSecret: event.secret.clientSecret,
    scope: "read:roles update:roles",
  });

  const params = { id: event.user.user_id };
  const data = { roles: [...DEFAULT_ROLE_LIST]};

  try {
    await management.users.assignRoles(params, data);
  } catch (e) {
    console.log(e);
  }

};

// Necessary to create an application to set roles.
const event = {
  secret: {
    domain: "domain",
    clientId: "client id",
    clientSecret: "client secret"
  },
  user: {
    user_id: "This parameter is set by auth0 flow."
  }
}
exports.onExecutePostLogin(event).then(() => {
   console.log("completed")
})
 