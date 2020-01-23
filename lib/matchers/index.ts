import toBeRdfIsomorphic from './toBeRdfIsomorphic';
import toEqualRdfQuad from './toEqualRdfQuad';
import toEqualRdfQuadArray from './toEqualRdfQuadArray';
import toEqualRdfTerm from './toEqualRdfTerm';
import toEqualRdfTermArray from './toEqualRdfTermArray';
import toHaveQuad from './toHaveQuad';
import toHaveQuads from './toHaveQuads';

export default [
  toBeRdfIsomorphic,
  toEqualRdfTerm,
  toEqualRdfQuad,
  toEqualRdfQuadArray,
  toEqualRdfTermArray,
  toHaveQuad,
  toHaveQuads,
].reduce((acc, matcher) => ({ ...acc, ...matcher }), {});
