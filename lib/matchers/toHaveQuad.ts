import * as RDF from 'rdf-js';
import { quadToStringQuad } from 'rdf-string';

export default {
  toHaveQuad<Q extends RDF.BaseQuad = RDF.Quad>(dataset: RDF.DatasetCore<Q>, quad: Q) {
    if (!dataset.has(quad)) {
      return {
        message: () => `expected dataset to have quad ${JSON.stringify(quadToStringQuad(quad))}`,
        pass: false,
      };
    }

    return {
      message: () => `expected dataset to not have quad ${JSON.stringify(quadToStringQuad(quad))}`,
      pass: true,
    };
  },
};
