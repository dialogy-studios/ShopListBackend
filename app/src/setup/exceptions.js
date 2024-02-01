const {
    NAME_BODY_PARAMETER,
    LAST_NAME_BODY_PARAMETER,
    PHONE_NUMBER_BODY_PARAMETER,
    EMAIL_BODY_PARAMETER,
    PASSWORD_BODY_PARAMETER,
    SESSION_EXCEPTION_ID,
    PHONE_NUMBER_CONFLICT,
    USERNAME_BODY_PARAMETER,
    CONFIRMATION_CODE_BODY_PARAMETER,
    PAGE_QUERY_PARAMETER,
    DEPARTMENT_QUERY_PARAMETER
} = require("./constants");

/**
 * Parse the AWS Cognito Errors
 *
 * @param {Error} error the exception
 * @returns {[string]}
 */
function parseError(error) {
    const mappedExceptions = error["__type"] !== undefined ? EXCEPTION_PAYLOAD[error["__type"]] : error
    var status
    var message
    var type

    try {
        status = mappedExceptions["status"] || error["status"]
        message = mappedExceptions["message"] || error["message"]
        type = error["__type"] || error["type"]
    } catch (exception) {
        status = 500
        message = "Something Wrong happened!"
        type = ""
    }
    return [status, message, type]
}

/**
 * Generate AWS Cognito Error
 *
 * @param {{status: int, message: string, type: string}} payload
 * @returns {Error}
 */
function generateError(payload) {
    var error = new Error(payload.message)
    error["type"] = payload.type
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
        throw generateError(payload)
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
    const value = req.body[property] ?? req.query[property]
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

EXCEPTION_PAYLOAD[USERNAME_BODY_PARAMETER] = {
    status: 406,
    message: "Username is empty or null",
    type: "UsernameInvalid"
}

EXCEPTION_PAYLOAD[NAME_BODY_PARAMETER] = {
    status: 406,
    message: "Name is empty or null",
    type: "NameInvalid"
}

EXCEPTION_PAYLOAD[PAGE_QUERY_PARAMETER] = {
    status: 406,
    message: "Page query parameter is empty or null",
    type: "InvalidPage"
}

EXCEPTION_PAYLOAD[DEPARTMENT_QUERY_PARAMETER] = {
    status: 406,
    message: "Department query parameter is empty or null",
    type: "DepartmentInvalid"
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

EXCEPTION_PAYLOAD[CONFIRMATION_CODE_BODY_PARAMETER] = {
    status: 406,
    message: "Confirmation code is empty or null",
    type: "ConfirmationCodeInvalid"
}

EXCEPTION_PAYLOAD[PHONE_NUMBER_CONFLICT] = {
    status: 401,
    message: "Phone already used",
    type: PHONE_NUMBER_CONFLICT
}

module.exports = {EXCEPTION_PAYLOAD, parseError, validate, validateThenGet, generateError}
