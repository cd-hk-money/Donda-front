/* eslint-env node */
module.exports = {
    "env": {
        "node": true,
        "browser": true,
        "es2021": true,
    },
    "extends": [
        "eslint:recommended",
        "plugin:vue/essential",
        "plugin:@typescript-eslint/recommended"
    ],
    "parserOptions": {
        "ecmaVersion": 12,
        "parser": "@typescript-eslint/parser",
        "sourceType": "module"
    },
    "plugins": [
        "vue",
        "@typescript-eslint"
    ],
    "rules": {
        "vue/valid-v-slot": ["error", { "allowModifiers": false }]
    },
    "parser": "vue-eslint-parser"
};
