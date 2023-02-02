const { CognitoIdentityProviderClient, RespondToAuthChallengeCommand, RespondToAuthChallengeCommandOutput } = require("@aws-sdk/client-cognito-identity-provider")
const {validate} = require("../setup/exceptions");
const {SESSION_EXCEPTION_ID} = require("../setup/constants");
/**
 * Sign Un Function
 *
 * @param {CognitoIdentityProviderClient} client
 * @param {string} clientId the username of the client
 * @param {string} username the username of the client
 * @param {string} clientId the clientId of the client
 * @param {string} confirmationCode the code received via SMS
 * @param {string | null} session the session of the user
 * @returns {RespondToAuthChallengeCommandOutput}
 */
async function confirmSignIn(client, clientId,  username, confirmationCode, session) {
    validate(session, SESSION_EXCEPTION_ID)
    const input = {
        ClientId: clientId,
        ChallengeName: "SMS_MFA",
        Session: session,
        ChallengeResponses: {
            "SMS_MFA_CODE": confirmationCode,
            "USERNAME": username,
        }
    }
    return client.send(new RespondToAuthChallengeCommand(input))
}

module.exports = { confirmSignIn }
