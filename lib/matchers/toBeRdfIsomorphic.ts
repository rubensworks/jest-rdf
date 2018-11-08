import {isomorphic} from "rdf-isomorphic";
import * as RDF from "rdf-js";
import {quadToStringQuad} from "rdf-string";

function quadArrayToString<Q extends RDF.BaseQuad = RDF.Quad>(quadArray: Q[]): string {
  return '[\n' + quadArray.map((quad) => '  ' + JSON.stringify(quadToStringQuad(quad))).join(',\n') + '\n]';
}

export default {
  toBeRdfIsomorphic<Q extends RDF.BaseQuad = RDF.Quad>(received: Q[], actual: Q[]) {
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
