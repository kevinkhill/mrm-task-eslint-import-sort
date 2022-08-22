// @ts-check
const { json, lines, install } = require("mrm-core");

module.exports = function (config) {
  // .eslintrc
  json(".eslintrc.json")
    .merge({
      env: {
        node: true,
        browser: true,
      },
      plugins: ["import", "simple-import-sort"],
      parserOptions: {
        ecmaFeatures: {
          modules: true,
        },
      },
      rules: {
        "sort-imports": "off",
        "import/order": "off",
        "import/first": "error",
        "import/no-duplicates": "error",
        "import/newline-after-import": "error",
        "simple-import-sort/imports": [
          "error",
          {
            groups: [ 
              ["^\\u0000"], // This is to get `import type` to have a
              ["^@?\\w"], //   blank line after the last module import
              ["^"],
              ["^\\."],
              ["^.+\\u0000$"],
            ],
          },
        ],
        "simple-import-sort/exports": "error",
      },
    })
    .save();

  // .eslintignore
  lines(".eslintignore").add("node_modules/").save();

  install([
    "eslint-plugin-import",
    "eslint-plugin-simple-import-sort",
    "eslint-import-resolver-typescript",
  ]);
};

module.exports.description = "Adds ESLint Plugins for import sorting";
