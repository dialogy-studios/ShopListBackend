const express = require("express")
const {getClient} = require("../../../setup/get_client");
const {signUp} = require("../../../usecase/sign_up");
const {confirmSignUp} = require("../../../usecase/confirm_sign_up");
const { NAME_BODY_PARAMETER, LAST_NAME_BODY_PARAMETER, PHONE_NUMBER_BODY_PARAMETER,
    CONFIRMATION_CODE_BODY_PARAMETER, USERNAME_BODY_PARAMETER, PASSWORD_BODY_PARAMETER, EMAIL_BODY_PARAMETER
} = require("../../../setup/constants")
const { parseAWSCognitoError, validateThenGet} = require("../../../setup/exceptions")
const {validatePhoneNumber} = require("../domain/validators");
const {CONFIRM_REGISTER_ROUTE_NAME, REGISTER_ROUTE_NAME} = require("../../../setup/route_names");
const router = express.Router()

router.post(REGISTER_ROUTE_NAME, async (req, res) => {
    try {
        const username = validateThenGet(req, USERNAME_BODY_PARAMETER)
        const password = validateThenGet(req, PASSWORD_BODY_PARAMETER)
        const name = validateThenGet(req, NAME_BODY_PARAMETER)
        const email = username
        const lastname = validateThenGet(req, LAST_NAME_BODY_PARAMETER)
        const phoneNumber = validateThenGet(req, PHONE_NUMBER_BODY_PARAMETER)
        const config = JSON.parse(process.env.SHOP_LIST_COGNITO_CONFIG)
        const client = getClient(
            {
                accessKeyId: config.accessKey,
                secretAccessKey: config.secretKey
            },
            config.region
        )
        await validatePhoneNumber(client, config.userPoolId, phoneNumber)
        const signUpResponse = await signUp(client, config.clientId, username, password, email, name, lastname, phoneNumber)
        res.status(200).send(JSON.stringify("success"))
    } catch (error) {
        const [status, _, type] = parseAWSCognitoError(error)
        res.status(status).send(type)
    }
})

router.post(CONFIRM_REGISTER_ROUTE_NAME, async (req, res) => {
    try {
        const confirmationCode = validateThenGet(req, CONFIRMATION_CODE_BODY_PARAMETER)
        const username = validateThenGet(req, USERNAME_BODY_PARAMETER)
        const config = JSON.parse(process.env.SHOP_LIST_COGNITO_CONFIG)
        const client = getClient(
            {
                accessKeyId: config.accessKey,
                secretAccessKey: config.secretKey
            },
            config.region
        )
        const confirmSignUpResponse = await confirmSignUp(client, config.clientId, username, confirmationCode)
        res.status(200).send(JSON.stringify("success"))
    } catch (error) {
        const [status, _, type] = parseAWSCognitoError(error)
        res.status(status).send(type)
    }
})

module.exports = router
