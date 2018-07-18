import toEqualRdfQuad from './toEqualRdfQuad';
import toEqualRdfQuadArray from './toEqualRdfQuadArray';
import toEqualRdfTerm from './toEqualRdfTerm';

export default [
  toEqualRdfTerm,
  toEqualRdfQuad,
  toEqualRdfQuadArray,
].reduce((acc, matcher) => ({ ...acc, ...matcher }), {});
