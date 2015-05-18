module.exports = {
    context: __dirname,
    entry: {
        index: ["./src/Tutorial1.ts"]
    },
    output: {
        path: "dist/",
        filename: "./bundle.js"
    },
    resolve: {
        extensions: ["", ".ts", ".webpack.js", ".web.js", ".js"]
    },
    externals: {
        "jquery": "jQuery",
        "react/addons": "React",
        "marked": "Marked"
    },
    module: {
        loaders: [
            {
                test: /\.ts$/,
                loader: "ts-loader?sourceMap!ts-jsx-loader"
            }
        ]
    }
};
