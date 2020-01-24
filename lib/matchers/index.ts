import toBeRdfDatasetContaining from './toBeRdfDatasetContaining';
import toBeRdfDatasetMatching from './toBeRdfDatasetMatching';
import toBeRdfDatasetOfSize from './toBeRdfDatasetOfSize';
import toBeRdfIsomorphic from './toBeRdfIsomorphic';
import toEqualRdfQuad from './toEqualRdfQuad';
import toEqualRdfQuadArray from './toEqualRdfQuadArray';
import toEqualRdfTerm from './toEqualRdfTerm';
import toEqualRdfTermArray from './toEqualRdfTermArray';

export default [
  toBeRdfDatasetContaining,
  toBeRdfDatasetMatching,
  toBeRdfDatasetOfSize,
  toBeRdfIsomorphic,
  toEqualRdfTerm,
  toEqualRdfQuad,
  toEqualRdfQuadArray,
  toEqualRdfTermArray,
].reduce((acc, matcher) => ({ ...acc, ...matcher }), {});
