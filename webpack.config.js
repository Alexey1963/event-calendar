var HtmlWebpackPlugin = require ("html-webpack-plugin");
const path = require('path');
var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
    template: __dirname + "/public/index.html",
    filename: "index.html",
    inject: "body"
});
let mode = 'development'; // По умолчанию режим development
if (process.env.NODE_ENV === 'production') { // Режим production, если 
  // при запуске вебпака было указано --mode=production
  mode = 'production';
}

module.exports = {
    mode,
    entry: {
        main: path.resolve(__dirname, './src/index.js')
    },
    output: {
        path: path.resolve(__dirname, "/build"),
        filename: 'main.bundle.js',
        assetModuleFilename: 'assets/[hash][ext][query]', // Все ассеты будут складываться в dist/assets
        clean: true,
   },
    devtool: 'source-map',
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
    port: 3000,
    hot: true, // Включает автоматическую перезагрузку страницы при изменениях
    } 
};
 