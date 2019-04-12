
const path = require("path");

module.exports = {
    entry: "./src/index.js",
    // entry: "./src/index.jsx",
    mode: "development",
    target: "web",
    output: {
        filename: "./main.js"
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    node: {
        fs: 'empty'
      },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9000,
        watchContentBase: true,
        progress: true
    },

    module: {
        rules: [
            {
                test: /\.m?jsx?$/,
                exclude: /(node_modules)/,
                use: {
                    loader: "babel-loader",
                }
            },
            {
                test: /\.less$/,
                use: [{
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader'
                }, {
                    loader: 'less-loader'
                }]
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader?limit=100000'
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            modules: false
                        }
                    }
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                exclude: /(node_modules)/,
                use: ["file-loader"]
            }
        ]
    }
};