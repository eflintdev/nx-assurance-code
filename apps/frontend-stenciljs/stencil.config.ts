import { Config } from '@stencil/core';
import { reactOutputTarget } from '@stencil/react-output-target';
 
export const config: Config = {
  namespace: 'frontend-stenciljs',
  outputTargets: [
    {
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
    },
    reactOutputTarget({
      outDir: 'dist',
      stencilPackageName: '.',
      customElementsDir: 'components'
      // Optionally include defineCustomElements if not using lazy-loading
      // includeDefineCustomElements: true,
    })
  ],
  testing: {
    browserHeadless: "shell",
  },
};
