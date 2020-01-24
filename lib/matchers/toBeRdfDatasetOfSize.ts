import * as RDF from 'rdf-js';

export default {
  toBeRdfDatasetOfSize<Q extends RDF.BaseQuad = RDF.Quad>(dataset: RDF.DatasetCore<Q>, expected: number) {
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
