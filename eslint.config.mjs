import nx from '@nx/eslint-plugin';

export default [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  {
    ignores: ['**/dist', '**/out-tsc', '**/vite.config.*.timestamp*', '**/test-output', './apps/react-app/src/app/components/custom/**', './apps/angular-app/src/app/components/custom/**', './apps/frontend-stenciljs/www/build/**']
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?[jt]s$'],
          depConstraints: [
            {
              sourceTag: '*',
              onlyDependOnLibsWithTags: ['*']
            }
          ]
        }
      ],
      '@typescript-eslint/no-unused-vars': [
        'error', { 'argsIgnorePattern': '^_', 'varsIgnorePattern': '(^_)|(^h{1}$)' }
      ]
    }
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.cts', '**/*.mts', '**/*.js', '**/*.jsx', '**/*.cjs', '**/*.mjs'],
    // Override or add rules here
    rules: {
      // Airbnb and common style rules
      'semi': ['error', 'always'],
      'no-extra-semi': 'error',
      'no-unexpected-multiline': 'error',
      'comma-dangle': ['error', 'never'],
      'quotes': ['error', 'single', { 'avoidEscape': true, 'allowTemplateLiterals': true }],
      'object-curly-spacing': ['error', 'always'],
      'array-bracket-spacing': ['error', 'never'],
      'space-before-function-paren': ['error', 'never'],
      'arrow-parens': ['error', 'always'],
      'no-multiple-empty-lines': ['error', { 'max': 1, 'maxEOF': 0 }],
      'eol-last': ['error', 'always'],
      'key-spacing': ['error', { 'beforeColon': false, 'afterColon': true }],
      'space-in-parens': ['error', 'never'],
      'block-spacing': ['error', 'always'],
      'keyword-spacing': ['error', { 'before': true, 'after': true }],
      'brace-style': ['error', '1tbs', { 'allowSingleLine': true }],
      'no-trailing-spaces': 'error',
      'spaced-comment': ['error', 'always', { 'exceptions': ['-','+'] }],
      'func-call-spacing': ['error', 'never'],
      'space-before-blocks': ['error', 'always'],
      'space-infix-ops': 'error',
      'no-whitespace-before-property': 'error',
      'operator-linebreak': ['error', 'after'],
      'padded-blocks': ['error', 'never'],
      'arrow-spacing': ['error', { 'before': true, 'after': true }],
      'object-curly-newline': ['error', { 'consistent': true }],
      'prefer-const': 'error',
      'no-var': 'error',
      'prefer-arrow-callback': 'error',
      'no-const-assign': 'error',
      'no-unused-vars': ['warn', { 'args': 'none', 'ignoreRestSiblings': true }],
      'no-use-before-define': ['error', { 'functions': false, 'classes': true, 'variables': true }]
    }
  }
];
