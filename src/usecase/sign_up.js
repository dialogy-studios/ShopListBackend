
const {CognitoIdentityProviderClient, SignUpCommand, SignUpCommandOutput, AttributeType} = require("@aws-sdk/client-cognito-identity-provider")
const {AWS_COGNITO_GIVEN_NAME_PARAMETER, AWS_COGNITO_FAMILY_NAME_PARAMETER, AWS_COGNITO_PHONE_NUMBER_PARAMETER} = require("../setup/constants");
/**
 * Sign Up Function
 *
 * @param {CognitoIdentityProviderClient} client User Pool Client.
 * @param {string} clientId .
 * @param {string} username .
 * @param {string} pwd .
 * @param {string} email .
 * @param {string} name .
 * @param {string} lastname .
 * @param {string} phoneNumber .
 * @returns {SignUpCommandOutput}
 */
async function signUp(client, clientId, username, pwd, email, name, lastname, phoneNumber) {
    const input = {
        ClientId: clientId,
        Username: username,
        Password: pwd,
        UserAttributes: [
            { Name: AWS_COGNITO_GIVEN_NAME_PARAMETER, Value: name },
            { Name: AWS_COGNITO_FAMILY_NAME_PARAMETER, Value: lastname },
            { Name: AWS_COGNITO_PHONE_NUMBER_PARAMETER, Value: phoneNumber }
        ]
    }
    return client.send(new SignUpCommand(input))
}

module.exports = { signUp }

