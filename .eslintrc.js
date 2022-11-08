module.exports = {
	env: {
		browser: true,
		commonjs: true,
		es2021: true
	},
	plugins: ['prettier'],
	extends: ['eslint:recommended', 'plugin:prettier/recommended'],
	overrides: [],
	parserOptions: {
		ecmaVersion: 'latest'
	},
	rules: {
		'no-unused-vars': 'error',
		'no-fallthrough': 'off',
		'no-mixed-spaces-and-tabs': 'off',
		'prettier/prettier': 'error',
		eqeqeq: 'error',
		'no-new-wrappers': 'error'
	}
};
