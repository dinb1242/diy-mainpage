module.exports = {
    env: {
        MYSQL_HOST: "133.186.222.152",
        MYSQL_PORT: "31390",
        MYSQL_DATABASE: "diy",
        MYSQL_USER: "root",
        MYSQL_PASSWORD: "1q2w3e4r!@Q",
        JWT: {
            secretKey: "TeStKeY",
            accessTokenOptions: {
                algorithm: "HS256",
                expiresIn: "15m",
                issuer: "tester"
            },
            refreshTokenOptions: {
                algorithm: "HS256",
                expiresIn: "7d",
                issuer: "tester"
            }
        }
    },
};
