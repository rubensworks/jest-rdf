import * as RDF from "rdf-js";
import {termToString} from "rdf-string";
import M from "./toEqualRdfTerm";

function termArrayToString(termArray: RDF.Term[]): string {
  return '[ ' + termArray.map((term) => JSON.stringify(termToString(term))).join(', ') + ' ]';
}

export default {
  toEqualRdfTermArray(received: RDF.Term[], actual: RDF.Term[]) {
    if (received.length !== actual.length) {
      return {
        message: () => `expected ${termArrayToString(received)} to equal ${termArrayToString(actual)}`,
        pass: false,
      };
    }

    for (let i = 0; i < received.length; i++) {
      const q = M.toEqualRdfTerm(received[i], actual[i]);
      if (!q.pass) {
        return q;
      }
    }

    return {
      message: () => `expected ${termArrayToString(received)} not to equal ${termArrayToString(actual)}`,
      pass: true,
    };
  },
};
