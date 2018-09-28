import {isomorphic} from "rdf-isomorphic";
import * as RDF from "rdf-js";
import {quadToStringQuad} from "rdf-string";

function quadArrayToString(quadArray: RDF.Quad[]): string {
  return '[\n' + quadArray.map((quad) => '  ' + JSON.stringify(quadToStringQuad(quad))).join(',\n') + '\n]';
}

export default {
  toBeRdfIsomorphic(received: RDF.Quad[], actual: RDF.Quad[]) {
    if (!isomorphic(received, actual)) {
      return {
        message: () => `expected two graphs to be isomorphic.

  Expected:
${quadArrayToString(actual)}

  Actual:
${quadArrayToString(received)}
`,
        pass: false,
      };
    }

    return {
      message: () => `expected two graphs not to be isomorphic.

  Expected:
${quadArrayToString(actual)}

  Actual:
${quadArrayToString(received)}
`,
      pass: true,
    };
  },
};
