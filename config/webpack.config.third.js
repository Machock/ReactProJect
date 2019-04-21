"use strict";

const autoprefixer = require("autoprefixer");
const path = require("path");
const webpack = require("webpack");
const paths = require("./paths");
var ManifestPlugin = require("webpack-manifest-plugin");

// Webpack uses `publicPath` to determine where the app is being served from.
// It requires a trailing slash, or the file assets will get an incorrect path.
const publicPath = paths.servedPath;
// Some apps do not use client-side routing with pushState.
// For these, "homepage" can be set to "." to enable relative asset paths.

// ExtractTextPlugin expects the build output to be flat.
// (See https://github.com/webpack-contrib/extract-text-webpack-plugin/issues/27)
// However, our output is structured with css, js and media folders.
// To have this structure working with relative paths, we have to use custom options.

const entry = {
    materialUI: ["@material-ui/core", "@material-ui/icons"],
    react: [
        "react",
        "react-dom",
        "react-router-dom",
        "redux",
        "react-redux",
        "redux-saga"
    ]
};
// This is the production configuration.
// It compiles slowly and is focused on producing a fast and minimal bundle.
// The development configuration is different and lives in a separate file.
module.exports = function() {
    return {
        // In production, we only want to load the polyfills and the app code.
        entry: entry,
        output: {
            // The build folder.
            path: path.resolve(paths.appBuild),
            // Generated JS file names (with nested folders).
            // There will be one main bundle, and one file per asynchronous chunk.
            // We don't currently advertise code splitting but Webpack supports it.
            filename: "static/dll/third/[name].js",
            publicPath
        },
        plugins: [
            // new ManifestPlugin({
            //     fileName: "third-manifest.json"
            // })
            new webpack.DllPlugin({
                path: path.join(paths.appBuild, "static/dll/third", "[name]-manifest.json"),
                name: "[name]_[hash]"
            })
        ],
        // Some libraries import Node modules but don't use them in the browser.
        // Tell Webpack to provide empty mocks for them so importing them works.
        node: {
            dgram: "empty",
            fs: "empty",
            net: "empty",
            tls: "empty",
            child_process: "empty"
        }
    };
};
