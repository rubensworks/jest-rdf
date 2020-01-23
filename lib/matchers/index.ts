import toBeRdfDatasetContaining from './toBeRdfDatasetContaining';
import toBeRdfDatasetOfSize from './toBeRdfDatasetOfSize';
import toBeRdfIsomorphic from './toBeRdfIsomorphic';
import toEqualRdfQuad from './toEqualRdfQuad';
import toEqualRdfQuadArray from './toEqualRdfQuadArray';
import toEqualRdfTerm from './toEqualRdfTerm';
import toEqualRdfTermArray from './toEqualRdfTermArray';

export default [
  toBeRdfDatasetContaining,
  toBeRdfDatasetOfSize,
  toBeRdfIsomorphic,
  toEqualRdfTerm,
  toEqualRdfQuad,
  toEqualRdfQuadArray,
  toEqualRdfTermArray,
].reduce((acc, matcher) => ({ ...acc, ...matcher }), {});
