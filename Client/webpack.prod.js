const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const Dotenv = require('dotenv-webpack');

console.log('DOT ENV TEST',process.env.API_URL);

module.exports = {
    entry: {
        global: './src/guest/js/home.js',
        adminglobal: './src/admin/js/index.js',
        'index': './src/guest/js/index.js',
        // Add other entries as needed
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: ['html-loader'],
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                type: 'asset',
            },
            {
                test: /\.(woff(2)?|eot|ttf|otf|)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[name][contenthash][ext]',
                },
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new Dotenv(),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        }),

        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/guest/pages/index.html',
            chunks: ['index'],
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
            },
        }),

        // Additional HtmlWebpackPlugin instances for all your pages
        new HtmlWebpackPlugin({
            filename: 'home.html',
            template: './src/guest/pages/home.html',
            chunks: ['global'],
        }),
        new HtmlWebpackPlugin({
            filename: 'customer-service-list.html',
            template: './src/guest/pages/customer-service-list.html',
            chunks: ['global', 'customer-service-list'],
        }),
        new HtmlWebpackPlugin({
            filename: 'site-admin-list.html',
            template: './src/guest/pages/site-admin-list.html',
            chunks: ['global', 'site-admin-list'],
        }),
        new HtmlWebpackPlugin({
            filename: 'sub-admin-list.html',
            template: './src/guest/pages/sub-admin-list.html',
            chunks: ['global', 'sub-admin-list'],
        }),
        new HtmlWebpackPlugin({
            filename: 'super-agent-list.html',
            template: './src/guest/pages/super-agent-list.html',
            chunks: ['global', 'super-agent-list'],
        }),
        new HtmlWebpackPlugin({
            filename: 'master-agent-list.html',
            template: './src/guest/pages/master-agent-list.html',
            chunks: ['global', 'master-agent-list'],
        }),
        new HtmlWebpackPlugin({
            filename: 'old-new-list.html',
            template: './src/guest/pages/old-new-list.html',
            chunks: ['global', 'old-new-list'],
        }),
        new HtmlWebpackPlugin({
            filename: 'dashboard.html',
            template: './src/admin/pages/dashboard.html',
            chunks: ['adminglobal', 'dashboard'],
        }),
        new HtmlWebpackPlugin({
            filename: 'customer-service.html',
            template: './src/admin/pages/customer-service.html',
            chunks: ['adminglobal', 'customer-service'],
        }),
        new HtmlWebpackPlugin({
            filename: 'master-agent.html',
            template: './src/admin/pages/master-agent.html',
            chunks: ['adminglobal', 'master-agent'],
        }),
        new HtmlWebpackPlugin({
            filename: 'super-agent.html',
            template: './src/admin/pages/super-agent.html',
            chunks: ['adminglobal', 'super-agent'],
        }),
        new HtmlWebpackPlugin({
            filename: 'site-admin.html',
            template: './src/admin/pages/site-admin.html',
            chunks: ['adminglobal', 'site-admin'],
        }),
        new HtmlWebpackPlugin({
            filename: 'sub-admin.html',
            template: './src/admin/pages/sub-admin.html',
            chunks: ['adminglobal', 'sub-admin'],
        }),
        new HtmlWebpackPlugin({
            filename: 'old-new.html',
            template: './src/admin/pages/old-new.html',
            chunks: ['adminglobal', 'old-new'],
        }),
        new HtmlWebpackPlugin({
            filename: 'users.html',
            template: './src/admin/pages/users.html',
            chunks: ['adminglobal', 'users'],
        }),
        new HtmlWebpackPlugin({
            filename: 'login.html',
            template: './src/admin/pages/login.html',
            chunks: ['login'],
        }),
        new HtmlWebpackPlugin({
            filename: 'verify-agent.html',
            template: './src/guest/pages/verify-agent.html',
            chunks: ['global'],
        }),
        new HtmlWebpackPlugin({
            filename: 'proxylink.html',
            template: './src/guest/pages/proxylink.html',
            chunks: ['global'],
        }),
        new HtmlWebpackPlugin({
            filename: 'general-qna.html',
            template: './src/guest/pages/general-qna.html',
            chunks: ['global'],
        }),
        new HtmlWebpackPlugin({
            filename: 'open-velki-account.html',
            template: './src/guest/pages/open-velki-account.html',
            chunks: ['global'],
        }),
        new HtmlWebpackPlugin({
            filename: 'phone-number-search.html',
            template: './src/guest/pages/phone-number-search.html',
            chunks: ['global'],
        }),
        new HtmlWebpackPlugin({
            filename: 'velki-quick-master-agent.html',
            template: './src/guest/pages/velki-quick-master-agent.html',
            chunks: ['global'],
        }),
        new HtmlWebpackPlugin({
            filename: 'velki-faqs.html',
            template: './src/guest/pages/velki-faqs.html',
            chunks: ['global'],
        }),

        new ImageMinimizerPlugin({
            minimizer: {
                implementation: ImageMinimizerPlugin.imageminMinify,
                options: {
                    plugins: [
                        ['imagemin-gifsicle', { interlaced: true }],
                        ['imagemin-mozjpeg', { progressive: true, quality: 70 }],
                        ['imagemin-optipng', { optimizationLevel: 7 }],
                        ['imagemin-svgo', {
                            plugins: [
                                { name: 'removeViewBox', active: false },
                                { name: 'removeDimensions', active: true },
                            ],
                        }],
                    ],
                },
            },
        }),

        new CompressionPlugin({
            test: /\.(js|css|html|svg)$/,
            filename: '[path][base].gz',
            algorithm: 'gzip',
            threshold: 10240,
            minRatio: 0.8,
        }),

        new BundleAnalyzerPlugin({
            analyzerMode: process.env.ANALYZE ? 'server' : 'disabled',
        }),
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    compress: {
                        drop_console: true,
                    },
                    output: {
                        comments: false,
                    },
                },
                extractComments: false,
            }),
            new CssMinimizerPlugin(),
        ],
        splitChunks: {
            chunks: 'all',
            maxInitialRequests: 20,
            maxAsyncRequests: 30,
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name(module) {
                        const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
                        return `vendor/${packageName.replace('@', '')}`;
                    },
                    chunks: 'all',
                },
            },
        },
        runtimeChunk: 'single',
    },
    performance: {
        maxEntrypointSize: 512000,
        maxAssetSize: 512000,
        hints: 'warning',
    },
    cache: {
        type: 'filesystem',
    },
    mode: 'production',
    devtool: false,
};
