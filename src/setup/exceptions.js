const {
    NAME_BODY_PARAMETER,
    LAST_NAME_BODY_PARAMETER,
    PHONE_NUMBER_BODY_PARAMETER,
    EMAIL_BODY_PARAMETER,
    PASSWORD_BODY_PARAMETER, SESSION_EXCEPTION_ID, PHONE_NUMBER_CONFLICT
} = require("./constants");

/**
 * Parse the AWS Cognito Errors
 *
 * @param {Error} error the exception
 * @returns {[string]}
 */
function parseAWSCognitoError(error) {
    const mappedExceptions = EXCEPTION_PAYLOAD[error["__type"]]
    const status = mappedExceptions["status"] || error["status"] || 500
    const message = mappedExceptions["message"] || error["message"] || "Something Wrong happened!"
    return [status, message]
}

/**
 * Generate AWS Cognito Error
 *
 * @param {{status: int, message: string, type: string}} payload
 * @returns {Error}
 */
function generateAWSCognitoError(payload) {
    var error = new Error(payload.message)
    error["__type"] = payload.type
    error["status"] = payload.status
    return error
}

/**
 * Validate values function
 *
 * @param {string} value the desired value
 * @param {string} property the property name .
 * @returns {void}
 */
const validate = (value, property) => {
    if (value == null || value === "" || value === undefined) {
        const payload = EXCEPTION_PAYLOAD[property]
        throw generateAWSCognitoError(payload)
    }
}

/**
 * Validate values function
 *
 * @param {Request} req the request parameter
 * @param {string} property the property name .
 * @returns {string}
 */
function validateThenGet(req, property) {
    const value = req.body[property]
    validate(value, property)
    return value
}

const EXCEPTION_PAYLOAD = {}

EXCEPTION_PAYLOAD["UsernameExistsException"] = {
    status: 409,
    message: "Username already registered",
    type: "UsernameExistsException"
}

EXCEPTION_PAYLOAD["UserNotFoundException"] = {
    status: 404,
    message: "Username not found",
    type: "UserNotFoundException"
}

EXCEPTION_PAYLOAD[SESSION_EXCEPTION_ID] = {
    status: 401,
    message: "Session is null",
    type: SESSION_EXCEPTION_ID
}

EXCEPTION_PAYLOAD["UsernameExistsException"] = {
    status: 409,
    message: "Username already registered",
    type: "UsernameExistsException"
}

EXCEPTION_PAYLOAD["NotAuthorizedException"] = {
    status: 401,
    message: "Not Authorized",
    type: "NotAuthorizedException"
}

EXCEPTION_PAYLOAD["InvalidParameterException"] = {
    status: 406,
    message: "Input invalid",
    type: "InvalidParameterException"
}

EXCEPTION_PAYLOAD["CodeMismatchException"] = {
    status: 401,
    message: "Invalid code",
    type: "CodeMismatchException"
}

EXCEPTION_PAYLOAD["ExpiredCodeException"] = {
    status: 401,
    message: "Code expired",
    type: "ExpiredCodeException"
}

EXCEPTION_PAYLOAD[NAME_BODY_PARAMETER] = {
    status: 406,
    message: "Name is empty or null",
    type: "NameInvalid"
}

EXCEPTION_PAYLOAD[LAST_NAME_BODY_PARAMETER] = {
    status: 406,
    message: "Last name is empty or null",
    type: "LastNameInvalid"
}

EXCEPTION_PAYLOAD[PHONE_NUMBER_BODY_PARAMETER] = {
    status: 406,
    message: "PhoneNumber is empty or null",
    type: "PhoneNumberInvalid"
}

EXCEPTION_PAYLOAD[PASSWORD_BODY_PARAMETER] = {
    status: 406,
    message: "Password is empty or null",
    type: "PasswordInvalid"
}

EXCEPTION_PAYLOAD[EMAIL_BODY_PARAMETER] = {
    status: 406,
    message: "Email is empty or null",
    type: "EmailInvalid"
}

EXCEPTION_PAYLOAD[PHONE_NUMBER_CONFLICT] = {
    status: 401,
    message: "Phone already used",
    type: PHONE_NUMBER_CONFLICT
}

module.exports = {EXCEPTION_PAYLOAD, parseAWSCognitoError, validate, validateThenGet, generateAWSCognitoError}