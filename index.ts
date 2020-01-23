import * as RDF from "rdf-js";
import matchers from './lib/matchers';

declare global {
  namespace jest {
    // tslint:disable-next-line:interface-name
    interface Matchers<R> {
      toBeRdfDatasetContaining: (...actual: RDF.BaseQuad[]) => R;
      toBeRdfDatasetOfSize: (size: number) => R;
      toBeRdfIsomorphic: (actual: RDF.BaseQuad[]) => R;
      toEqualRdfQuad: (actual: RDF.BaseQuad) => R;
      toEqualRdfQuadArray: (actual: RDF.BaseQuad[]) => R;
      toEqualRdfTerm: (actual: RDF.Term) => R;
      toEqualRdfTermArray: (actual: RDF.Term[]) => R;
    }
  }
}

const jestExpect = (<any> global).expect;

if (jestExpect) {
  jestExpect.extend(matchers);
} else {
  throw new Error('Jest was not installed.');
}
