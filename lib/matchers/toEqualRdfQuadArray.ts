import * as RDF from "@rdfjs/types";
import {quadToStringQuad} from "rdf-string";
import M from "./toEqualRdfQuad";

function quadArrayToString<Q extends RDF.BaseQuad = RDF.Quad>(quadArray: Q[]): string {
  return '[ ' + quadArray.map((quad) => JSON.stringify(quadToStringQuad(quad))).join(', ') + ' ]';
}

export default {
  toEqualRdfQuadArray<Q extends RDF.BaseQuad = RDF.Quad>(received: Q[], actual: Q[]) {
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
