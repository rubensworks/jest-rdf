import {namedNode} from "@rdfjs/data-model";
import "../../index";

describe('#toEqualRdfTermArray', () => {
  it('should succeed for equal term arrays', () => {
    return expect([
      namedNode('s1'),
      namedNode('p1'),
      namedNode('o1'),
      namedNode('g1'),
    ]).toEqualRdfTermArray([
      namedNode('s1'),
      namedNode('p1'),
      namedNode('o1'),
      namedNode('g1'),
    ]);
  });

  it('should not fail for equal quad arrays', () => {
    return expect(() => expect([
      namedNode('s1'),
      namedNode('p1'),
      namedNode('o1'),
      namedNode('g1'),
    ]).not.toEqualRdfTermArray([
      namedNode('s1'),
      namedNode('p1'),
      namedNode('o1'),
      namedNode('g1'),
    ])).toThrowErrorMatchingSnapshot();
  });

  it('should not succeed for quad arrays with different length', () => {
    return expect([
      namedNode('s1'),
      namedNode('p1'),
      namedNode('o1'),
      namedNode('g1'),
    ]).not.toEqualRdfTermArray([
      namedNode('s1'),
    ]);
  });

  it('should fail for quad arrays with different length', () => {
    return expect(() => expect([
      namedNode('s1'),
      namedNode('p1'),
      namedNode('o1'),
      namedNode('g1'),
    ]).toEqualRdfTermArray([
      namedNode('s1'),
    ])).toThrowErrorMatchingSnapshot();
  });

  it('should not succeed for quad arrays with equal length but different contents', () => {
    return expect([
      namedNode('s1'),
      namedNode('p1'),
      namedNode('o1'),
      namedNode('g1'),
    ]).not.toEqualRdfTermArray([
      namedNode('s2'),
      namedNode('p2'),
      namedNode('o2'),
      namedNode('g2'),
    ]);
  });

  it('should fail for quad arrays with equal length but different contents', () => {
    return expect(() => expect([
      namedNode('s1'),
      namedNode('p1'),
      namedNode('o1'),
      namedNode('g1'),
    ]).toEqualRdfTermArray([
      namedNode('s2'),
      namedNode('p2'),
      namedNode('o2'),
      namedNode('g2'),
    ])).toThrowErrorMatchingSnapshot();
  });
});
