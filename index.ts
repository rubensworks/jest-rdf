import type * as RDF from '@rdfjs/types';
import matchers from './lib/matchers';
import type { IQuadTerms } from './lib/matchers/toBeRdfDatasetMatching';

declare global {
  // eslint-disable-next-line ts/no-namespace
  namespace jest {
    // eslint-disable-next-line ts/naming-convention
    interface Matchers<R> {
      toBeRdfDatasetContaining: (...actual: RDF.BaseQuad[]) => R;
      toBeRdfDatasetMatching: (match: IQuadTerms<RDF.BaseQuad>, matches?: number) => R;
      toBeRdfDatasetOfSize: (size: number) => R;
      toBeRdfIsomorphic: (actual: Iterable<RDF.BaseQuad>) => R;
      toEqualRdfQuad: (actual: RDF.BaseQuad) => R;
      toEqualRdfQuadArray: (actual: RDF.BaseQuad[]) => R;
      toEqualRdfTerm: (actual: RDF.Term) => R;
      toEqualRdfTermArray: (actual: RDF.Term[]) => R;
    }
  }
}

// eslint-disable-next-line ts/no-unsafe-assignment
const jestExpect = (<any> globalThis).expect;

if (jestExpect) {
  jestExpect.extend(matchers);
} else {
  throw new Error('Jest was not installed.');
}
