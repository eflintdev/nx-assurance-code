import { Config } from '@stencil/core';
import { OutputTarget } from '@stencil/core/internal';
import { angularOutputTarget } from '@stencil/angular-output-target';
import { reactOutputTarget } from '@stencil/react-output-target';
import { sass } from '@stencil/sass';

const outputTargets: OutputTarget[] | undefined = [];

outputTargets.push({
  type: 'dist',
  esmLoaderPath: '../dist/loader',
  empty: true
},
  {
    type: 'dist-custom-elements',
    customElementsExportBehavior: 'auto-define-custom-elements',
    externalRuntime: false
  },
  {
    type: 'docs-readme'
  },
  {
    type: 'www',
    serviceWorker: null // disable service workers
  });

if (process.env.NX_BUILD_ENV === 'react') {
  outputTargets.push(
    reactOutputTarget({
      outDir: 'dist',
      stencilPackageName: '.',
      customElementsDir: 'components'
      // Optionally include defineCustomElements if not using lazy-loading
      // includeDefineCustomElements: true,
    }));
} else if (process.env.NX_BUILD_ENV === 'angular') {
  outputTargets.push(
    angularOutputTarget({
      componentCorePackage: 'frontend-stenciljs',
      outputType: 'component',
      directivesProxyFile: 'dist/angular-components.ts',
      directivesArrayFile: 'dist/angular-directives/index.ts'
    }));
}

// Can simply extend the list if you ever consume more esModules
const esModules = ['some-esm-package'].join('|');

export const config: Config = {
  namespace: 'frontend-stenciljs',
  globalScript: 'src/global/app-init.ts',
  globalStyle: 'src/global/app.scss',
  plugins: [
    sass()
  ],
  transformAliasedImportPaths: false,
  outputTargets,
  testing: {
    testRunner: 'jest-circus/runner',
    testEnvironment: 'node',
    transform: {
      '^.+\\.(ts|tsx|js|jsx|css)$': './jest-transformer.js'
    },
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1',
      '^@apps-shared$': '<rootDir>/../../apps-shared/src/index.ts',
      '^@apps-shared/(.*)$': '<rootDir>/../../apps-shared/src/$1',
      '^@apps-shared/lib/types$': '<rootDir>/../../apps-shared/dist/apps-shared/src/lib/types/index.js',
      '^@apps-shared/lib/constants$': '<rootDir>/../../apps-shared/dist/apps-shared/src/lib/constants/index.js',
      '^@apps-shared/lib/mocks$': '<rootDir>/../../apps-shared/dist/apps-shared/src/lib/mocks/index.js'
    },
    testPathIgnorePatterns: ['./src/e2e-playwright', './src/e2e-playwright/src/lib/tests/home.spec.ts'],
    coveragePathIgnorePatterns: ['./src/e2e-playwright'],
    transformIgnorePatterns: [`/node_modules/(?!${esModules})`],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'jsx', 'map'],
    collectCoverageFrom: [
      'src/**/*.{ts,tsx}',
      '!src/**/*.d.ts',
      '!src/components.d.ts'
    ],
  }
};
