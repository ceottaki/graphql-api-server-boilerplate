module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module' // Allows for the use of imports
  },
  extends: [
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
    'plugin:prettier/recommended' // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  rules: {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    // e.g. "@typescript-eslint/explicit-function-return-type": "off",
    'comma-dangle': [1, 'never'],
    'no-console': 0,
    'max-len': [1, { code: 100, tabWidth: 2, ignoreComments: true }],
    'no-empty': [1, { allowEmptyCatch: true }],
    '@typescript-eslint/no-explicit-any': [1, { fixToUnknown: true, ignoreRestArgs: true }],
    '@typescript-eslint/no-inferrable-types': 0,
    'no-trailing-spaces': 1,
    radix: 0
  }
}
