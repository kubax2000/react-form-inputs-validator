const path = require("path");
module.exports = (env, options) => {
    const isProduction = "production" === options.mode;
    return {
        devtool: isProduction ? false : "source-map",
        entry: {
            index: "./docs/index.jsx",
        },
        module: {
            rules: [
                {
                    test: /\.css$/i,
                    use: ["style-loader", "css-loader"],
                },
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                    },
                },
            ],
        },
        output: {
            chunkFilename: "[name].js",
            filename: "[name].js",
            path: path.resolve(__dirname, "docs"),
        },
    };
};
