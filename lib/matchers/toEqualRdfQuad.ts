import * as RDF from "rdf-js";
import {quadToStringQuad} from "rdf-string";
import M from "./toEqualRdfTerm";

export default {
  toEqualRdfQuad<Q extends RDF.BaseQuad = RDF.Quad>(received: Q, actual: Q) {
    const s = M.toEqualRdfTerm(received.subject, actual.subject);
    if (!s.pass) {
      return s;
    }
    const p = M.toEqualRdfTerm(received.predicate, actual.predicate);
    if (!p.pass) {
      return p;
    }
    const o = M.toEqualRdfTerm(received.object, actual.object);
    if (!o.pass) {
      return o;
    }
    const g = M.toEqualRdfTerm(received.graph, actual.graph);
    if (!g.pass) {
      return g;
    }

    return {
      message: () => `expected
  ${JSON.stringify(quadToStringQuad(received))}
not to equal
  ${JSON.stringify(quadToStringQuad(actual))}`,
      pass: true,
    };
  },
};
