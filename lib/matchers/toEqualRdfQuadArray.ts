import * as RDF from "rdf-js";
import {quadToStringQuad} from "rdf-string";
import M from "./toEqualRdfQuad";

function quadArrayToString(quadArray: RDF.Quad[]): string {
  return '[ ' + quadArray.map((quad) => JSON.stringify(quadToStringQuad(quad))).join(', ') + ' ]';
}

export default {
  toEqualRdfQuadArray(received: RDF.Quad[], actual: RDF.Quad[]) {
    if (received.length !== actual.length) {
      return {
        message: () => `expected ${quadArrayToString(received)} to equal ${quadArrayToString(actual)}`,
        pass: false,
      };
    }

    for (let i = 0; i < received.length; i++) {
      const q = M.toEqualRdfQuad(received[i], actual[i]);
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
