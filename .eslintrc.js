module.exports = {
    root: true,
    env: {
        browser: true,
        node: true
    },
    parserOptions: {
        parser: 'babel-eslint'
    },
    extends: [
        "eslint:recommended",
        "plugin:vue/recommended",
        "plugin:prettier/recommended"
    ],
    plugins: [
        'vue'
    ],
    rules: {
        "semi": [2, "never"],
        "no-console": "off",
        "no-debugger": "off",
        "require-atomic-updates": "off",
        "vue/max-attributes-per-line": "off",
        "vue/singleline-html-element-content-newline": 'off',
        "vue/html-self-closing": 'off',
        "vue/no-v-html": "off",
        "vue/html-quotes": ["error", "double"],
        "vue/html-indent": ["error", 4, {
            "attribute": 1,
            "baseIndent": 1,
            "closeBracket": 0,
            "alignAttributesVertically": true,
            "ignores": []
        }],
        "prettier/prettier": ["error", {
            "semi": false,
            "singleQuote": true,
            "quoteProps": 'consistent',
            "printWidth": 120,
            "tabWidth": 4,
            "proseWrap": "always"
        }]
    }
}