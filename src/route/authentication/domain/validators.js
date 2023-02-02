const {AWS_COGNITO_PHONE_NUMBER_PARAMETER, PHONE_NUMBER_CONFLICT} = require("../../../setup/constants");
const {generateAWSCognitoError, EXCEPTION_PAYLOAD} = require("../../../setup/exceptions");
const {findUserByAttribute} = require("../../../usecase/find_user_by_attribute");
const {CognitoIdentityProviderClient} = require("@aws-sdk/client-cognito-identity-provider")
/**
 * Validate duplicated phone number
 *
 * @param {CognitoIdentityProviderClient} client the desired value
 * @param {string} userPoolId the user pool id .
 * @param {string} phoneNumber the target phone number .
 * @returns {void}
 */
async function validatePhoneNumber(client, userPoolId, phoneNumber) {
    const user = await findUserByAttribute(client, AWS_COGNITO_PHONE_NUMBER_PARAMETER, phoneNumber, userPoolId)
    if (user != null && user.Users.length > 0) {
        throw generateAWSCognitoError(EXCEPTION_PAYLOAD[PHONE_NUMBER_CONFLICT])
    }
}

module.exports = { validatePhoneNumber }
