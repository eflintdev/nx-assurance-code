import { Config } from '@stencil/core';
import { OutputTarget } from '@stencil/core/internal';
import { angularOutputTarget } from '@stencil/angular-output-target';
import { reactOutputTarget } from '@stencil/react-output-target';
import { sass } from '@stencil/sass';

const outputTargets: OutputTarget[] | undefined = [];

outputTargets.push({
  type: 'dist',
  esmLoaderPath: '../dist/loader',
  empty: true,
},
  {
    type: 'dist-custom-elements',
    customElementsExportBehavior: 'auto-define-custom-elements',
    externalRuntime: false,
  },
  {
    type: 'docs-readme',
  },
  {
    type: 'www',
    serviceWorker: null, // disable service workers
  });

if (process.env.NX_BUILD_ENV === 'react') {
  outputTargets.push(
    reactOutputTarget({
      outDir: 'dist',
      stencilPackageName: '.',
      customElementsDir: 'components'
      // Optionally include defineCustomElements if not using lazy-loading
      // includeDefineCustomElements: true,
    }))
} else if (process.env.NX_BUILD_ENV == 'angular') {
  outputTargets.push(
    angularOutputTarget({
      componentCorePackage: 'frontend-stenciljs',
      outputType: 'component',
      directivesProxyFile: 'dist/angular-components.ts',
      directivesArrayFile: 'dist/angular-directives/index.ts',
    }),)
}

export const config: Config = {
  namespace: 'frontend-stenciljs',
  globalScript: 'src/global/app-init.ts',
  plugins: [
    sass()
  ],
  outputTargets,
  testing: {
    browserHeadless: "shell",
  },
};
