import * as RDF from 'rdf-js';
import { quadToStringQuad } from 'rdf-string';

function quadArrayToString<Q extends RDF.BaseQuad = RDF.Quad>(quadArray: Q[]): string {
  return '[ ' + quadArray.map((quad) => JSON.stringify(quadToStringQuad(quad))).join(', ') + ' ]';
}

export default {
  toBeRdfDatasetContaining<Q extends RDF.BaseQuad = RDF.Quad>(dataset: RDF.DatasetCore<Q>, ...quads: Q[]) {
    for (const quad of quads) {
      if (!dataset.has(quad)) {
        return {
          message: () => `expected dataset to have quads ${quadArrayToString(quads)}`,
          pass: false,
        };
      }
    }

    return {
      message: () => `expected dataset to not have quads ${quadArrayToString(quads)}`,
      pass: true,
    };
  },
};
