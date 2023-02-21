const { CognitoIdentityProviderClient, InitiateAuthCommand, InitiateAuthCommandOutput } = require("@aws-sdk/client-cognito-identity-provider")
const {AWS_COGNITO_USERNAME_PARAMETER, AWS_COGNITO_PASSWORD_PARAMETER} = require("../setup/constants");
/**
 * Sign In Function
 *
 * @param {CognitoIdentityProviderClient} client
 * @param {string} username the username of the client
 * @param {string} pwd the password of the client
 * @param {string} clientId the clientId of the client
 * @returns {InitiateAuthCommandOutput}
 */
async function signIn(client, username, pwd, clientId) {
    const input = {
        ClientId: clientId,
        Username: username,
        Password: pwd,
        AuthFlow: "USER_PASSWORD_AUTH",
        AuthParameters: {}
    }
    input.AuthParameters[AWS_COGNITO_USERNAME_PARAMETER] = username
    input.AuthParameters[AWS_COGNITO_PASSWORD_PARAMETER] = pwd
    return client.send(new InitiateAuthCommand(input))
}

module.exports = { signIn }
