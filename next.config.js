module.exports = {
    env: {
        MYSQL_HOST: "127.0.0.1",
        MYSQL_PORT: "3306",
        MYSQL_DATABASE: "diy",
        MYSQL_USER: "root",
        MYSQL_PASSWORD: "server402!",
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
