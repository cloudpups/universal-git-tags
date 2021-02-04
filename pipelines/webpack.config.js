const path = require("path");
const fs = require("fs");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: "./GitTag/GitTag.js",
    output: {
        filename: "[name]/[name].js"
    },
    resolve: {
        extensions: [".js"],
    },
    stats: {
        warnings: false
    },
    plugins: [
        new CopyWebpackPlugin([ { from: "**/*.html", context: "src/" }])
    ]
};
