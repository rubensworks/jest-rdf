import type * as RDF from '@rdfjs/types';
import { quadToStringQuad } from 'rdf-string';

function quadArrayToString<TQuad extends RDF.BaseQuad = RDF.Quad>(quadArray: TQuad[]): string {
  return `[ ${quadArray.map(quad => JSON.stringify(quadToStringQuad(quad))).join(', ')} ]`;
}

export default {
  toBeRdfDatasetContaining<TQuad extends RDF.BaseQuad = RDF.Quad>(dataset: RDF.DatasetCore<TQuad>, ...quads: TQuad[]) {
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
