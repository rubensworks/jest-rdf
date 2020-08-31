import { DataFactory } from 'rdf-data-factory';
import "../../index";

const DF = new DataFactory();

describe('#toEqualRdfTermArray', () => {
  it('should succeed for equal term arrays', () => {
    return expect([
      DF.namedNode('s1'),
      DF.namedNode('p1'),
      DF.namedNode('o1'),
      DF.namedNode('g1'),
    ]).toEqualRdfTermArray([
      DF.namedNode('s1'),
      DF.namedNode('p1'),
      DF.namedNode('o1'),
      DF.namedNode('g1'),
    ]);
  });

  it('should not fail for equal quad arrays', () => {
    return expect(() => expect([
      DF.namedNode('s1'),
      DF.namedNode('p1'),
      DF.namedNode('o1'),
      DF.namedNode('g1'),
    ]).not.toEqualRdfTermArray([
      DF.namedNode('s1'),
      DF.namedNode('p1'),
      DF.namedNode('o1'),
      DF.namedNode('g1'),
    ])).toThrowErrorMatchingSnapshot();
  });

  it('should not succeed for quad arrays with different length', () => {
    return expect([
      DF.namedNode('s1'),
      DF.namedNode('p1'),
      DF.namedNode('o1'),
      DF.namedNode('g1'),
    ]).not.toEqualRdfTermArray([
      DF.namedNode('s1'),
    ]);
  });

  it('should fail for quad arrays with different length', () => {
    return expect(() => expect([
      DF.namedNode('s1'),
      DF.namedNode('p1'),
      DF.namedNode('o1'),
      DF.namedNode('g1'),
    ]).toEqualRdfTermArray([
      DF.namedNode('s1'),
    ])).toThrowErrorMatchingSnapshot();
  });

  it('should not succeed for quad arrays with equal length but different contents', () => {
    return expect([
      DF.namedNode('s1'),
      DF.namedNode('p1'),
      DF.namedNode('o1'),
      DF.namedNode('g1'),
    ]).not.toEqualRdfTermArray([
      DF.namedNode('s2'),
      DF.namedNode('p2'),
      DF.namedNode('o2'),
      DF.namedNode('g2'),
    ]);
  });

  it('should fail for quad arrays with equal length but different contents', () => {
    return expect(() => expect([
      DF.namedNode('s1'),
      DF.namedNode('p1'),
      DF.namedNode('o1'),
      DF.namedNode('g1'),
    ]).toEqualRdfTermArray([
      DF.namedNode('s2'),
      DF.namedNode('p2'),
      DF.namedNode('o2'),
      DF.namedNode('g2'),
    ])).toThrowErrorMatchingSnapshot();
  });
});
