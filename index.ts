import * as RDF from "rdf-js";
import matchers from './lib/matchers';

declare global {
  namespace jest {
    // tslint:disable-next-line:interface-name
    interface Matchers<R> {
      toEqualRdfQuad: (actual: RDF.Quad) => R;
      toEqualRdfQuadArray: (actual: RDF.Quad[]) => R;
      toEqualRdfTerm: (actual: RDF.Term) => R;
    }
  }
}

const jestExpect = (<any> global).expect;

if (jestExpect) {
  jestExpect.extend(matchers);
} else {
  throw new Error('Jest was not installed.');
}
