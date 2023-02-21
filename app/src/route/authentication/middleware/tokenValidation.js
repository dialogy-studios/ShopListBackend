const jsonwebtoken = require('jsonwebtoken');
const jwkToPem = require('jwk-to-pem');
const jwks = JSON.parse(process.env["SHOP_LIST_COGNITO_CONFIG"]).jwks.keys
const tokenValidationRouter = require("express").Router()
/**
 * Decode and validate token middleware
 *
 * @param {string} token the token of the client
 * @returns {boolean}
 */
function getToken(token) {
    const header = decodeTokenHeader(token);
    const jsonWebKey = getJsonWebKeyWithKID(header.kid);
    verifyJsonWebTokenSignature(token, jsonWebKey, (err, decodedToken) => {
        if (err) {
            throw err
        } else {
            return decodedToken
        }
    })
}

function decodeTokenHeader(token) {
    const [headerEncoded] = token.split('.')
    const buff = Buffer.from(headerEncoded, "base64")
    const text = buff.toString('ascii');
    return JSON.parse(text);
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

tokenValidationRouter.use((req, response, next) => {
    const idToken = req.header("Authorization")
    try {
        getToken(idToken)
        next()
    } catch (e) {
        response.sendStatus(401)
    }
})

module.exports = { tokenValidationRouter, getToken }
