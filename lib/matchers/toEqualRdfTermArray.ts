import type * as RDF from '@rdfjs/types';
import { termToString } from 'rdf-string';
import M from './toEqualRdfTerm';

function termArrayToString(termArray: RDF.Term[]): string {
  return `[ ${termArray.map(term => JSON.stringify(termToString(term))).join(', ')} ]`;
}

export default {
  toEqualRdfTermArray(received: RDF.Term[], actual: RDF.Term[]) {
    if (received.length !== actual.length) {
      return {
        message: () => `expected ${termArrayToString(received)} to equal ${termArrayToString(actual)}`,
        pass: false,
      };
    }

    for (const [ i, element ] of received.entries()) {
      const q = M.toEqualRdfTerm(element, actual[i]);
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
