import type * as RDF from '@rdfjs/types';

export default {
  toBeRdfDatasetOfSize<TQuad extends RDF.BaseQuad = RDF.Quad>(dataset: RDF.DatasetCore<TQuad>, expected: number) {
    const actual = dataset.size;

    if (expected !== actual) {
      return {
        message: () => `expected dataset to have ${expected} quads, ${actual} received`,
        pass: false,
      };
    }

    return {
      message: () => `expected dataset to not have exactly ${expected} quads`,
      pass: true,
    };
  },
};
