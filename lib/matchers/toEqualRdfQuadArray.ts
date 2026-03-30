import type * as RDF from '@rdfjs/types';
import { quadToStringQuad } from 'rdf-string';
import M from './toEqualRdfQuad';

function quadArrayToString<TQuad extends RDF.BaseQuad = RDF.Quad>(quadArray: TQuad[]): string {
  return `[ ${quadArray.map(quad => JSON.stringify(quadToStringQuad(quad))).join(', ')} ]`;
}

export default {
  toEqualRdfQuadArray<TQuad extends RDF.BaseQuad = RDF.Quad>(received: TQuad[], actual: TQuad[]) {
    if (received.length !== actual.length) {
      return {
        message: () => `expected ${quadArrayToString(received)} to equal ${quadArrayToString(actual)}`,
        pass: false,
      };
    }

    for (const [ i, element ] of received.entries()) {
      const q = M.toEqualRdfQuad(element, actual[i]);
      if (!q.pass) {
        return q;
      }
    }

    return {
      message: () => `expected ${quadArrayToString(received)} not to equal ${quadArrayToString(actual)}`,
      pass: true,
    };
  },
};
