const { CognitoIdentityProviderClient, AdminGetUserCommandOutput, AdminGetUserCommand } = require("@aws-sdk/client-cognito-identity-provider")
/**
 * Get User Function
 *
 * @param {CognitoIdentityProviderClient} client
 * @param {string} username the username of the client
 * @param {string} userPoolId the user pool id of the cognito region
 * @returns {AdminGetUserCommandOutput}
 */
async function getUser(client, username, userPoolId) {
    const input = {
        UserPoolId: userPoolId,
        Username: username,
    }
    return client.send(new AdminGetUserCommand(input))
}

module.exports = { getUser }
