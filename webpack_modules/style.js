const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = devMode => ({
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                  devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                  'css-loader',
                  'postcss-loader',
                  'sass-loader',
                ],
            }
        ]
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: devMode ? 'css/[name].css' : 'css/[name].[hash:8].css'
        }),
        // new OptimizeCssAssetsPlugin({
        //     cssProcessorOptions: {
        //         discardComments: {
        //             removeAll: true
        //         },
        //         safe: true,
        //         map: { inline: false }
        //     }
        // })
    ]
});