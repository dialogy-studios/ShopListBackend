
const {CognitoIdentityProviderClient, ConfirmSignUpCommand, ConfirmSignUpCommandOutput, AttributeType} = require("@aws-sdk/client-cognito-identity-provider")
/**
 * Confirm Sign Up Function
 *
 * @param {CognitoIdentityProviderClient} client User Pool Client.
 * @param {string} clientId .
 * @param {string} username .
 * @param {string} confirmationCode .
 * @returns {ConfirmSignUpCommandOutput}
 */
async function confirmSignUp(client, clientId, username, confirmationCode) {
    const input = {
        ClientId: clientId,
        Username: username,
        ConfirmationCode: confirmationCode,
    }
    console.log(input)
    return client.send(new ConfirmSignUpCommand(input))
}

module.exports = { confirmSignUp }

