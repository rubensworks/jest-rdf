import * as RDF from "@rdfjs/types";
import {termToString} from "rdf-string";

function fail(received: RDF.Term, actual: RDF.Term) {
  return {
    message: () => `expected ${termToString(received)} and ${termToString(actual)} to be equal`,
    pass: false,
  };
}

function succeed(received: RDF.Term, actual: RDF.Term) {
  return {
    message: () => `expected ${termToString(received)} and ${termToString(actual)} not to be equal`,
    pass: true,
  };
}

export default {
  toEqualRdfTerm(received: RDF.Term, actual: RDF.Term) {
    if (received.termType !== actual.termType) {
      return fail(received, actual);
    }

    if (received.termType !== 'BlankNode' && !received.equals(actual)) {
      return fail(received, actual);
    }

    return succeed(received, actual);
  },
};
