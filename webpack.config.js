const HtmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const path = require("path");
const { HotModuleReplacementPlugin } = require("webpack");

const baseUrl = "/";
const srcDir = path.resolve(__dirname, "./src");
const title = "TRISTAR Front-End Skills Assessment";

module.exports = {
    mode: "development",
    entry: [
        path.resolve(__dirname, "./src/index.js"),
        "webpack-hot-middleware/client"
    ],
    resolve: {
        extensions: [".js", ".vue"],
        modules: [srcDir, "node_modules"],
        alias: {
            Components: path.resolve(__dirname, "./src/components"),
            Helpers: path.resolve(__dirname, "./src/helpers"),
            Services: path.resolve(__dirname, "./src/services"),
            Source: srcDir
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/i,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.css$/i,
                use: [
                    "style-loader",
                    "css-loader"
                ]
            },
            {
                test: /\.vue$/i,
                exclude: /node_modules/,
                use: [
                    "vue-loader"
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: "src/index.ejs",
            metadata: {
                title,
                baseUrl
            }
        })
    ]
};