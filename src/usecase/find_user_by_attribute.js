const { CognitoIdentityProviderClient, ListUsersCommandOutput, ListUsersCommand} = require("@aws-sdk/client-cognito-identity-provider")
const {AWS_COGNITO_PHONE_NUMBER_PARAMETER} = require("../setup/constants");
/**
 * List Users Function
 *
 * @param {CognitoIdentityProviderClient} client
 * @param {string} attribute the attribute to find of
 * @param {string} value the value searching
 * @param {string} userPoolId the value searching
 * @returns {ListUsersCommandOutput}
 */
async function findUserByAttribute(client, attribute, value, userPoolId) {
    const input = {
        UserPoolId: userPoolId,
        Filter:  `${attribute} = \"${value}\"`,
        AttributesToGet: [AWS_COGNITO_PHONE_NUMBER_PARAMETER]
    }
    return client.send(new ListUsersCommand(input))
}

module.exports = { findUserByAttribute }
