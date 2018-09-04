import {namedNode, quad} from "@rdfjs/data-model";
import "../../index";

describe('#toEqualRdfQuad', () => {
  it('should succeed for equal quads', () => {
    return expect(quad(
      namedNode('s'),
      namedNode('p'),
      namedNode('o'),
      namedNode('g'),
    )).toEqualRdfQuad(quad(
      namedNode('s'),
      namedNode('p'),
      namedNode('o'),
      namedNode('g'),
    ));
  });

  it('should not fail for equal quads', () => {
    return expect(() => expect(quad(
      namedNode('s'),
      namedNode('p'),
      namedNode('o'),
      namedNode('g'),
    )).not.toEqualRdfQuad(quad(
      namedNode('s'),
      namedNode('p'),
      namedNode('o'),
      namedNode('g'),
    ))).toThrowErrorMatchingSnapshot();
  });

  it('should not succeed for quads with different subjects', () => {
    return expect(quad(
      namedNode('s1'),
      namedNode('p'),
      namedNode('o'),
      namedNode('g'),
    )).not.toEqualRdfQuad(quad(
      namedNode('s2'),
      namedNode('p'),
      namedNode('o'),
      namedNode('g'),
    ));
  });

  it('should not succeed for quads with different predicates', () => {
    return expect(quad(
      namedNode('s'),
      namedNode('p1'),
      namedNode('o'),
      namedNode('g'),
    )).not.toEqualRdfQuad(quad(
      namedNode('s'),
      namedNode('p2'),
      namedNode('o'),
      namedNode('g'),
    ));
  });

  it('should not succeed for quads with different objects', () => {
    return expect(quad(
      namedNode('s'),
      namedNode('p'),
      namedNode('o1'),
      namedNode('g'),
    )).not.toEqualRdfQuad(quad(
      namedNode('s'),
      namedNode('p'),
      namedNode('o2'),
      namedNode('g'),
    ));
  });

  it('should not succeed for quads with different graphs', () => {
    return expect(quad(
      namedNode('s'),
      namedNode('p'),
      namedNode('o'),
      namedNode('g1'),
    )).not.toEqualRdfQuad(quad(
      namedNode('s'),
      namedNode('p'),
      namedNode('o'),
      namedNode('g2'),
    ));
  });
});
