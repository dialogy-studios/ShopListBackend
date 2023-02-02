const express = require("express")
const {getClient} = require("../../../setup/get_client");
const {signIn} = require("../../../usecase/sign_in");
const {confirmSignIn} = require("../../../usecase/confirm_sign_in");
const LocalStorage = require("../../../storage/LocalStorage")
const {parseAWSCognitoError, validateThenGet} = require("../../../setup/exceptions");
const {PASSWORD_BODY_PARAMETER, USERNAME_BODY_PARAMETER, AWS_COGNITO_SESSION_PARAMETER,
    CONFIRMATION_CODE_BODY_PARAMETER
} = require("../../../setup/constants");
const {LOGIN_ROUTE_NAME, CONFIRM_LOGIN_ROUTE_NAME} = require("../../../setup/route_names");
const router = express.Router()

router.post(LOGIN_ROUTE_NAME, async (req, res) => {
    try {
        const username = validateThenGet(req, USERNAME_BODY_PARAMETER)
        const password = validateThenGet(req, PASSWORD_BODY_PARAMETER)
        const config = JSON.parse(process.env.SHOP_LIST_COGNITO_CONFIG)
        const client = getClient(
            {
                accessKeyId: config.accessKey,
                secretAccessKey: config.secretKey
            },
            config.region
        )

        const response = await signIn(client, username, password, config.clientId)
        LocalStorage.sessions[username] = response[AWS_COGNITO_SESSION_PARAMETER]
        res.status(200).send()
    } catch (error) {
        const [status, message] = parseAWSCognitoError(error)
        res.status(status).send(message)
    }
})

router.post(CONFIRM_LOGIN_ROUTE_NAME, async (req, res) => {
    try {
        const username = validateThenGet(req, USERNAME_BODY_PARAMETER)
        const confirmationCode = validateThenGet(req, CONFIRMATION_CODE_BODY_PARAMETER)
        const config = JSON.parse(process.env.SHOP_LIST_COGNITO_CONFIG)
        const client = getClient(
            {
                accessKeyId: config.accessKey,
                secretAccessKey: config.secretKey
            },
            config.region
        )
        const session = LocalStorage.sessions[username]
        const response = await confirmSignIn(client, config.clientId, username, confirmationCode, session)
        res.sendStatus(200)
    } catch (error) {
        const [status, message] = parseAWSCognitoError(error)
        res.status(status).send(message)
    }
})

module.exports = router
