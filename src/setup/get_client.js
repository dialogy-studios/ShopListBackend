const { AwsCredentialIdentity, CognitoIdentityProviderClient  } = require('@aws-sdk/client-cognito-identity-provider')

/**
 * Get Client Function
 *
 * @param {AwsCredentialIdentity} credentials object with client_id and secret strings.
 * @param {string} region Region of AWS Cognito User Pool.
 * @returns {CognitoIdentityProviderClient} item found.
 */
function getClient(credentials, region) {
    return new CognitoIdentityProviderClient(
        {
            credentials,
            region
        }
    )
}

module.exports = { getClient }
