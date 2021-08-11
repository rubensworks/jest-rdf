import {isomorphic} from "rdf-isomorphic";
import * as RDF from "@rdfjs/types";
import {quadToStringQuad} from "rdf-string";

function quadArrayToString<Q extends RDF.BaseQuad = RDF.Quad>(quadArray: Q[]): string {
  return '[\n' + quadArray.map((quad) => '  ' + JSON.stringify(quadToStringQuad(quad))).join(',\n') + '\n]';
}

export default {
  toBeRdfIsomorphic<Q extends RDF.BaseQuad = RDF.Quad>(received: Iterable<Q>, actual: Iterable<Q>) {
    const receivedArray = [...received];
    const actualArray = [...actual];

    if (!isomorphic(receivedArray, actualArray)) {
      return {
        message: () => `expected two graphs to be isomorphic.

  Expected:
${quadArrayToString(actualArray)}

  Actual:
${quadArrayToString(receivedArray)}
`,
        pass: false,
      };
    }

    return {
      message: () => `expected two graphs not to be isomorphic.

  Expected:
${quadArrayToString(actualArray)}

  Actual:
${quadArrayToString(receivedArray)}
`,
      pass: true,
    };
  },
};
