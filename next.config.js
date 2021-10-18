const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true"
})

module.exports = withBundleAnalyzer({});

module.exports = {
    env: {
        MYSQL_HOST: "133.186.222.152",
        MYSQL_PORT: "31390",
        MYSQL_DATABASE: "diy",
        MYSQL_USER: "root",
        MYSQL_PASSWORD: "1q2w3e4r!@Q",
        FULLPAGE_KEY: "12574D70-423A44D0-8F20C9BF-D15BDD17"
    },
};