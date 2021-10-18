import jwt from "jsonwebtoken";
import randToken from "rand-token";

const SECRET = "TeStKeY";
const ACCESS_TOKEN_OPTIONS = {
    algorithm: "HS256",
    expiresIn: "5s",
    issuer: "tester"
}

const REFRESH_TOKEN_OPTIONS = {
    algorithm: "HS256",
    expiresIn: "10s",
    issuer: "tester"
}

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
            accessToken: jwt.sign(payload, SECRET, ACCESS_TOKEN_OPTIONS),
            refreshToken: jwt.sign({}, SECRET, REFRESH_TOKEN_OPTIONS)
        }

        return tokens;
    },

    accessRenewal: async (user) => {
        const payload = {
            seq: user.seq,
            username: user.username,
            name: user.name
        }

        return jwt.sign(payload, SECRET, ACCESS_TOKEN_OPTIONS);
    },

    refreshRenewal: async () => {
        return jwt.sign({}, SECRET, REFRESH_TOKEN_OPTIONS);
    },

    decode: async (token) => {
        return jwt.decode(token);
    },
    
    verify: async (token) => {
        let decoded;
        try {
            decoded = jwt.verify(token, SECRET);
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