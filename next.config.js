const config = require("./config.blog.js");

/** @type {import('next').NextConfig} */
const nextConfig = {
    trailingSlash: true,
    output: config.auth.enable ? undefined : "export"
};

module.exports = nextConfig