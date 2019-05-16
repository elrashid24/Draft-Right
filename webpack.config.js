const path = require("path");

module.exports = {
    context: __dirname,
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "./bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.(txt|csv)$/,
                use: ["file-loader"]
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader", "sass-loader"]
            }
        ]
    },
    devtool: "inline-source-map",
    resolve: {
        extensions: [".js", ".jsx", "*"]
    }
}