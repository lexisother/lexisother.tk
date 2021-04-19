// // eslint-disable-next-line @typescript-eslint/no-var-requires
// let fs = require("fs");

// const AboutContent = fs.readFileSync("./src/assets/test.md");

// module.exports = {
//   chainWebpack: (config) => {
//     config.plugin("define").tap((args) => {
//       let _base = args[0]["process.env"];
//       args[0]["process.env"] = {
//         ..._base,
//         ABOUT_CONTENT: AboutContent,
//       };
//       return args;
//     });
//   },
// };

module.exports = {
  chainWebpack: (config) => {
    config.module
      .rule("md")
      .test(/\.md$/)
      .use("html-loader")
      .loader("html-loader")
      .end()
      .use("markdown-loader")
      .loader("markdown-loader")
      .end();
  },
};
