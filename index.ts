import * as RDF from "rdf-js";
import matchers from './lib/matchers';

declare global {
  namespace jest {
    // tslint:disable-next-line:interface-name
    interface Matchers<R> {
      toBeRdfIsomorphic: (actual: RDF.BaseQuad[]) => R;
      toEqualRdfQuad: (actual: RDF.BaseQuad) => R;
      toEqualRdfQuadArray: (actual: RDF.BaseQuad[]) => R;
      toEqualRdfTerm: (actual: RDF.Term) => R;
      toEqualRdfTermArray: (actual: RDF.Term[]) => R;
      toHaveQuad: (actual: RDF.BaseQuad) => R;
      toHaveQuads: (size: number) => R;
    }
  }
}

const jestExpect = (<any> global).expect;

if (jestExpect) {
  jestExpect.extend(matchers);
} else {
  throw new Error('Jest was not installed.');
}
