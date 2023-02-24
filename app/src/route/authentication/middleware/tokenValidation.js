const jsonwebtoken = require('jsonwebtoken');
const jwkToPem = require('jwk-to-pem');
const {USER_ACCOUNT_ID_HEADER} = require("../../../setup/constants");
const jwks = JSON.parse(process.env["SHOP_LIST_COGNITO_CONFIG"]).jwks.keys
const tokenValidationRouter = require("express").Router()
/**
 * Decode and validate token middleware
 *
 * @param {string} token the token of the client
 * @returns {Promise}
 */
function getToken(token) {
    const header = decodeTokenHeader(token);
    const jsonWebKey = getJsonWebKeyWithKID(header.kid);

    return new Promise((res, rej) => {
        verifyJsonWebTokenSignature(token, jsonWebKey, (err, decodedToken) => {
            if (err) {
                rej(err)
            } else {
                res(decodedToken)
            }
        })
    })
}

function decodeTokenHeader(token) {
    const [headerEncoded] = token.split('.')
    const buff = Buffer.from(headerEncoded, "base64")
    const text = buff.toString('ascii');
    const decoded = JSON.parse(text);
    return decoded
}

function getJsonWebKeyWithKID(kid) {
    for (let jwk of jwks) {
        if (jwk.kid === kid) {
            return jwk;
        }
    }
    return null
}

function verifyJsonWebTokenSignature(token, jsonWebKey, clbk) {
    const pem = jwkToPem(jsonWebKey);
    jsonwebtoken.verify(token, pem, {algorithms: ['RS256']}, (err, decodedToken) => clbk(err, decodedToken))
}

tokenValidationRouter.use(async (req, response, next) => {
    const idToken = req.header("Authorization")
    try {
        const userData = await getToken(idToken)
        req.header[USER_ACCOUNT_ID_HEADER] = userData.sub
        next()
    } catch (e) {
        response.sendStatus(401)
    }
})

module.exports = { tokenValidationRouter, getToken }
