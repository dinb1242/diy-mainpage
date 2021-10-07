import jwt from "jsonwebtoken";
import randToken from "rand-token";

const secret = process.env.JWT.secretKey;
const accessTokenOptions = process.env.JWT.accessTokenOptions;
const refreshTokenOptions = process.env.JWT.refreshTokenOptions;
const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;

module.exports = {
    sign: async (user) => {
        // Payload 생성
        const payload = {
            seq: user.member_seq,
            username: user.member_username,
            name: user.member_name
        }

        const tokens = {
            accessToken: jwt.sign(payload, secret, accessTokenOptions),
            refreshToken: jwt.sign({}, secret, refreshTokenOptions)
        }

        return tokens;
    },

    decode: async (token) => {
        return jwt.decode(token);
    },
    
    verify: async (accessToken) => {
        let decoded;
        try {
            decoded = jwt.verify(token, secret);
        } catch (err) {
            if (err.message === "jwt expired") {
                return TOKEN_EXPIRED;
            } else if (err.message === "invalid token") {
                return TOKEN_INVALID;
            } else {
                return TOKEN_INVALID;
            }
        }
        return decoded
    } 
}