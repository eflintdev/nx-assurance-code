const path = require('path');

// Dynamically resolve the Stencil preprocessor
let stencilTransformer;
try {
  stencilTransformer = require('../../node_modules/@stencil/core/testing/jest-preprocessor.js');
} catch (e) {
  stencilTransformer = require('@stencil/core/testing/jest-preprocessor');
}

module.exports = {
  process(sourceText, sourcePath, options) {
    const result = stencilTransformer.process(sourceText, sourcePath, options);
    
    // Wrap the result if it's just a string (old format for Jest 28+)
    if (typeof result === 'string') {
      return {
        code: result,
      };
    }
    
    return result;
  },
};
