const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    mode: 'production',
    entry: {
        global: './src/guest/js/home.js',
        adminglobal: './src/admin/js/index.js',
        'index': './src/guest/js/index.js',
        'customer-service-list': './src/guest/js/customer-service-list.js',
        'site-admin-list': './src/guest/js/site-admin-list.js',
        'sub-admin-list': './src/guest/js/sub-admin-list.js',
        'super-agent-list': './src/guest/js/super-agent-list.js',
        'master-agent-list': './src/guest/js/master-agent-list.js',
        'old-new-list': './src/guest/js/old-new-list.js',
        'customer-service': './src/admin/js/customer-service.js',
        'dashboard': './src/admin/js/dashboard.js',
        'master-agent': './src/admin/js/master-agent.js',
        'super-agent': './src/admin/js/super-agent.js',
        'site-admin': './src/admin/js/site-admin.js',
        'sub-admin': './src/admin/js/sub-admin.js',
        'old-new': './src/admin/js/old-new.js',
        'users': './src/admin/js/users.js',
        'login': './src/admin/auth/login.js',
    },
    output: {
        filename: '[name].[contenthash].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                type: 'asset',
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        }),
        new HtmlWebpackPlugin({
            template: './src/guest/pages/index.html',
            filename: 'index.html',
            chunks: ['index'],
        }),
        new HtmlWebpackPlugin({
            filename: 'home.html',
            template: './src/guest/pages/home.html',
            chunks: ['global']
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
            chunks: ['adminglobal', 'dashboard']
        }),
        new HtmlWebpackPlugin({
            filename: 'customer-service.html',
            template: './src/admin/pages/customer-service.html',
            chunks: ['adminglobal', 'customer-service']
        }),
        new HtmlWebpackPlugin({
            filename: 'master-agent.html',
            template: './src/admin/pages/master-agent.html',
            chunks: ['adminglobal', 'master-agent']
        }),
        new HtmlWebpackPlugin({
            filename: 'super-agent.html',
            template: './src/admin/pages/super-agent.html',
            chunks: ['adminglobal', 'super-agent']
        }),
        new HtmlWebpackPlugin({
            filename: 'site-admin.html',
            template: './src/admin/pages/site-admin.html',
            chunks: ['adminglobal', 'site-admin']
        }),
        new HtmlWebpackPlugin({
            filename: 'sub-admin.html',
            template: './src/admin/pages/sub-admin.html',
            chunks: ['adminglobal', 'sub-admin']
        }),
        new HtmlWebpackPlugin({
            filename: 'old-new.html',
            template: './src/admin/pages/old-new.html',
            chunks: ['adminglobal', 'old-new']
        }),
        new HtmlWebpackPlugin({
            filename: 'users.html',
            template: './src/admin/pages/users.html',
            chunks: ['adminglobal', 'users']
        }),
        new HtmlWebpackPlugin({
            filename: 'login.html',
            template: './src/admin/pages/login.html',
            chunks: ['login']
        }),
        new HtmlWebpackPlugin({
            filename: 'verify-agent.html',
            template: './src/guest/pages/verify-agent.html',
            chunks: ['global']
        }),
        new HtmlWebpackPlugin({
            filename: 'proxylink.html',
            template: './src/guest/pages/proxylink.html',
            chunks: ['global']
        }),
        new HtmlWebpackPlugin({
            filename: 'general-qna.html',
            template: './src/guest/pages/general-qna.html',
            chunks: ['global']
        }),
        new HtmlWebpackPlugin({
            filename: 'open-velki-account.html',
            template: './src/guest/pages/open-velki-account.html',
            chunks: ['global']
        }),
        new HtmlWebpackPlugin({
            filename: 'phone-number-search.html',
            template: './src/guest/pages/phone-number-search.html',
            chunks: ['global']
        }),
        new HtmlWebpackPlugin({
            filename: 'velki-quick-master-agent.html',
            template: './src/guest/pages/velki-quick-master-agent.html',
            chunks: ['global']
        }),
        new HtmlWebpackPlugin({
            filename: 'velki-faqs.html',
            template: './src/guest/pages/velki-faqs.html',
            chunks: ['global']
        }),
        new ImageMinimizerPlugin({
            minimizer: {
                implementation: ImageMinimizerPlugin.imageminMinify,
                options: {
                    plugins: [
                        ['imagemin-gifsicle', { interlaced: true }],
                        ['imagemin-jpegtran', { progressive: true }],
                        ['imagemin-optipng', { optimizationLevel: 5 }],
                        ['imagemin-svgo', {
                            plugins: [
                                { name: 'removeViewBox', active: false },
                            ],
                        }],
                    ],
                },
            },
        }),
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    compress: {
                        drop_console: true, // Remove console.logs in production
                    },
                },
            }),
            new CssMinimizerPlugin(), // Minifies CSS
        ],
        splitChunks: {
            chunks: 'all', // Code splitting for optimization
        },
    },
    devtool: 'source-map', // Use source-maps in production for better debugging
};