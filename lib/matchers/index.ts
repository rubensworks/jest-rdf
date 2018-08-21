import toEqualRdfQuad from './toEqualRdfQuad';
import toEqualRdfQuadArray from './toEqualRdfQuadArray';
import toEqualRdfTerm from './toEqualRdfTerm';
import toEqualRdfTermArray from './toEqualRdfTermArray';

export default [
  toEqualRdfTerm,
  toEqualRdfQuad,
  toEqualRdfQuadArray,
  toEqualRdfTermArray,
].reduce((acc, matcher) => ({ ...acc, ...matcher }), {});
