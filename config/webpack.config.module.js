"use strict";

const autoprefixer = require("autoprefixer");
const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const eslintFormatter = require("react-dev-utils/eslintFormatter");
const ModuleScopePlugin = require("react-dev-utils/ModuleScopePlugin");
const DllReferencePlugin = require("webpack/lib/DllReferencePlugin");
const paths = require("./paths");
// Webpack uses `publicPath` to determine where the app is being served from.
// It requires a trailing slash, or the file assets will get an incorrect path.
const publicPath = paths.servedPath;
// Some apps do not use client-side routing with pushState.
// For these, "homepage" can be set to "." to enable relative asset paths.
const shouldUseRelativeAssetPaths = publicPath === "./";
// Source maps are resource heavy and can cause out of memory issue for large source files.
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== "false";
// `publicUrl` is just like `publicPath`, but we will provide it to our app
// as %PUBLIC_URL% in `index.html` and `process.env.PUBLIC_URL` in JavaScript.
// Omit trailing slash as %PUBLIC_URL%/xyz looks better than %PUBLIC_URL%xyz.

// Note: defined here because it will be used more than once.
const cssFilename = "static/css/[name].[contenthash:8].css";

// ExtractTextPlugin expects the build output to be flat.
// (See https://github.com/webpack-contrib/extract-text-webpack-plugin/issues/27)
// However, our output is structured with css, js and media folders.
// To have this structure working with relative paths, we have to use custom options.
const extractTextPluginOptions = shouldUseRelativeAssetPaths
    ? // Making sure that the publicPath goes back to to build folder.
      { publicPath: Array(cssFilename.split("/").length).join("../") }
    : {};
const entry = {
    auth: [path.resolve(paths.appModules, "auth")],
    todo: [path.resolve(paths.appModules, "todo")],
    loader: [path.resolve(paths.appModules, "loader")]
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
            filename: "static/dll/modules/[name].js",
            // We inferred the "public path" (such as / or /my-project) from homepage.
            publicPath: publicPath
        },
        resolve: {
            // This allows you to set a fallback for where Webpack should look for modules.
            // We placed these paths second because we want `node_modules` to "win"
            // if there are any conflicts. This matches Node resolution mechanism.
            // https://github.com/facebookincubator/create-react-app/issues/253
            modules: ["node_modules", paths.appNodeModules],
            // These are the reasonable defaults supported by the Node ecosystem.
            // We also include JSX as a common component filename extension to support
            // some tools, although we do not recommend using it, see:
            // https://github.com/facebookincubator/create-react-app/issues/290
            // `web` extension prefixes have been added for better support
            // for React Native Web.
            extensions: [".web.js", ".mjs", ".js", ".json", ".web.jsx", ".jsx"],
            alias: {
                // Support React Native Web
                // https://www.smashingmagazine.com/2016/08/a-glimpse-into-the-future-with-react-native-for-web/
                "react-native": "react-native-web",
                src: path.resolve(__dirname, "../src"),
                commons: path.resolve(__dirname, "../src/commons"),
                components: path.resolve(__dirname, "../src/components"),
                actions: path.resolve(__dirname, "../src/actions"),
                reducers: path.resolve(__dirname, "../src/reducers"),
                pages: path.resolve(__dirname, "../src/pages"),
                assets: path.resolve(__dirname, "../src/assets"),
                actionTypes: path.resolve(__dirname, "../src/actionTypes"),
                modules: path.resolve(__dirname, "../src/modules")
            },
            plugins: [
                // Prevents users from importing files from outside of src/ (or node_modules/).
                // This often causes confusion because we only process files within src/ with babel.
                // To fix this, we prevent you from importing files out of src/ -- if you'd like to,
                // please link the files into your node_modules/ and let module-resolution kick in.
                // Make sure your source files are compiled, as they will not be processed in any way.
                new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson])
            ]
        },
        module: {
            strictExportPresence: true,
            rules: [
                {
                    // "oneOf" will traverse all following loaders until one will
                    // match the requirements. When no loader matches it will fall
                    // back to the "file" loader at the end of the loader list.
                    oneOf: [
                        // "url" loader works just like "file" loader but it also embeds
                        // assets smaller than specified size as data URLs to avoid requests.
                        {
                            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                            loader: require.resolve("url-loader"),
                            options: {
                                limit: 10000,
                                name: "static/media/[name].[hash:8].[ext]"
                            }
                        },
                        // Process JS with Babel.
                        {
                            test: /\.(js|jsx|mjs)$/,
                            include: paths.appSrc,
                            loader: require.resolve("babel-loader"),
                            options: {
                                compact: true
                            }
                        },
                        // "file" loader makes sure assets end up in the `build` folder.
                        // When you `import` an asset, you get its filename.
                        // This loader doesn't use a "test" so it will catch all modules
                        // that fall through the other loaders.
                        {
                            loader: require.resolve("file-loader"),
                            // Exclude `js` files to keep "css" loader working as it injects
                            // it's runtime that would otherwise processed through "file" loader.
                            // Also exclude `html` and `json` extensions so they get processed
                            // by webpacks internal loaders.
                            exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
                            options: {
                                name: "static/media/[name].[hash:8].[ext]"
                            }
                        }
                        // ** STOP ** Are you adding a new loader?
                        // Make sure to add the new loader(s) before the "file" loader.
                    ]
                }
            ]
        },
        plugins: [
            // Makes some environment variables available to the JS code, for example:
            // if (process.env.NODE_ENV === 'production') { ... }. See `./env.js`.
            // It is absolutely essential that NODE_ENV was set to production here.
            // Otherwise React will be compiled in the very slow development mode.
            // Generate a manifest file which contains a mapping of all asset filenames
            // to their corresponding output file so that tools can pick it up without
            // having to parse `index.html`.
            // new ManifestPlugin({
            //     fileName: "module-manifest.json"
            // }),
            new webpack.DllPlugin({
                path: path.join(
                    paths.appBuild,
                    "static/dll/modules",
                    "[name]-manifest.json"
                ),
                name: "[name]_[hash]"
            }),
            new DllReferencePlugin({
                manifest: require("../build/static/dll/third/materialUI-manifest.json")
            }),
            new DllReferencePlugin({
                manifest: require("../build/static/dll/third/react-manifest.json")
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
