/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

module.exports = (...args) => {
  const mode = args?.[1]?.mode || "production";
  return {
    devtool: "eval-source-map",
    target: "web",
    mode,
    devServer: {
      compress: true,
      host: "0.0.0.0",
      port: 4666,
      hot: true,
      historyApiFallback: true,
    },

    entry: path.resolve(__dirname, "./src/index.tsx"),
    output: {
      path: path.resolve(__dirname, "./dist"),
      filename: "[name].[contenthash].js",
      clean: true,
    },
    plugins: [
      new ReactRefreshWebpackPlugin({
        exclude: /node_modules/,
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "./src/index.html"),
      }),
    ].filter(Boolean),

    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx"],
      mainFields: ["browser", "main", "module"],
      modules: ["node_modules", "modules"],
      alias: {
        "@mui/styled-engine": "@mui/styled-engine-sc",
        "@components": path.resolve(__dirname, "./src/components"),
        "@hooks": path.resolve(__dirname, "./src/hooks"),
        "@views": path.resolve(__dirname, "./src/views"),
      },
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: {
            loader: "swc-loader",
            options:
              mode === "development"
                ? {
                    jsc: {
                      transform: {
                        react: {
                          development: true,
                          refresh: true,
                        },
                      },
                    },
                  }
                : {},
          },
        },
        {
          test: /\.(png|jpe?g|gif|)$/i,
          use: [
            {
              loader: "file-loader",
            },
          ],
        },
      ],
    },
  };
};
