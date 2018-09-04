import {isomorphic} from "rdf-isomorphic";
import * as RDF from "rdf-js";
import {quadToStringQuad} from "rdf-string";

function quadArrayToString(quadArray: RDF.Quad[]): string {
  return '[ ' + quadArray.map((quad) => JSON.stringify(quadToStringQuad(quad))).join(', ') + ' ]';
}

export default {
  toBeRdfIsomorphic(received: RDF.Quad[], actual: RDF.Quad[]) {
    if (!isomorphic(received, actual)) {
      return {
        message: () => `expected ${quadArrayToString(received)} to be isomorphic with ${quadArrayToString(actual)}`,
        pass: false,
      };
    }

    return {
      message: () => `expected ${quadArrayToString(received)} not to be isomorphic with ${quadArrayToString(actual)}`,
      pass: true,
    };
  },
};
