module.exports = {
    root: true,
    extends: ['mkscanner/ts'],
    "parserOptions": {
        "project": "./tsconfig.eslint.json"
    },
    rules: {
        "@typescript-eslint/lines-between-class-members": 0
    },
}
    
