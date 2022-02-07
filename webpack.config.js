var HtmlWebpackPlugin = require ("html-webpack-plugin");
var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
    template: __dirname + "/public/index.html",
    filename: "index.html",
    inject: "body"
});

module.exports = {
    mode: 'development',
    entry: {
        main: path.resolve(__dirname, './src/index.js')
    },

    output: {
        path: path.resolve(__dirname, "/build"),
        filename: 'main.bundle.js',
    },
    plugins: [
        HTMLWebpackPluginConfig
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
                type: 'asset/inline',
            },            
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
     devServer: {
        port: 3000
      } 
 };
 