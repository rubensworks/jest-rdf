import { DataFactory } from 'rdf-data-factory';
import * as RDF from "rdf-js";
import "../../index";

const DF = new DataFactory();

describe('#toEqualRdfQuad', () => {
  it('should succeed for equal quads', () => {
    return expect(DF.quad(
      DF.namedNode('s'),
      DF.namedNode('p'),
      DF.namedNode('o'),
      DF.namedNode('g'),
    )).toEqualRdfQuad(DF.quad(
      DF.namedNode('s'),
      DF.namedNode('p'),
      DF.namedNode('o'),
      DF.namedNode('g'),
    ));
  });

  it('should succeed for equal generalized quads', () => {
    return expect(new DataFactory<RDF.BaseQuad>().quad(
      DF.blankNode('s'),
      DF.blankNode('p'),
      DF.blankNode('o'),
      DF.blankNode('g'),
    )).toEqualRdfQuad(new DataFactory<RDF.BaseQuad>().quad(
      DF.blankNode('s'),
      DF.blankNode('p'),
      DF.blankNode('o'),
      DF.blankNode('g'),
    ));
  });

  it('should not fail for equal quads', () => {
    return expect(() => expect(DF.quad(
      DF.namedNode('s'),
      DF.namedNode('p'),
      DF.namedNode('o'),
      DF.namedNode('g'),
    )).not.toEqualRdfQuad(DF.quad(
      DF.namedNode('s'),
      DF.namedNode('p'),
      DF.namedNode('o'),
      DF.namedNode('g'),
    ))).toThrowErrorMatchingSnapshot();
  });

  it('should not succeed for quads with different subjects', () => {
    return expect(DF.quad(
      DF.namedNode('s1'),
      DF.namedNode('p'),
      DF.namedNode('o'),
      DF.namedNode('g'),
    )).not.toEqualRdfQuad(DF.quad(
      DF.namedNode('s2'),
      DF.namedNode('p'),
      DF.namedNode('o'),
      DF.namedNode('g'),
    ));
  });

  it('should not succeed for quads with different predicates', () => {
    return expect(DF.quad(
      DF.namedNode('s'),
      DF.namedNode('p1'),
      DF.namedNode('o'),
      DF.namedNode('g'),
    )).not.toEqualRdfQuad(DF.quad(
      DF.namedNode('s'),
      DF.namedNode('p2'),
      DF.namedNode('o'),
      DF.namedNode('g'),
    ));
  });

  it('should not succeed for quads with different objects', () => {
    return expect(DF.quad(
      DF.namedNode('s'),
      DF.namedNode('p'),
      DF.namedNode('o1'),
      DF.namedNode('g'),
    )).not.toEqualRdfQuad(DF.quad(
      DF.namedNode('s'),
      DF.namedNode('p'),
      DF.namedNode('o2'),
      DF.namedNode('g'),
    ));
  });

  it('should not succeed for quads with different graphs', () => {
    return expect(DF.quad(
      DF.namedNode('s'),
      DF.namedNode('p'),
      DF.namedNode('o'),
      DF.namedNode('g1'),
    )).not.toEqualRdfQuad(DF.quad(
      DF.namedNode('s'),
      DF.namedNode('p'),
      DF.namedNode('o'),
      DF.namedNode('g2'),
    ));
  });
});
