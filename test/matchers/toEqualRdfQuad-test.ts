import type * as RDF from '@rdfjs/types';
import { DataFactory } from 'rdf-data-factory';
import '../../index';

const DF = new DataFactory();

describe('#toEqualRdfQuad', () => {
  it('should succeed for equal quads', () => {
    expect(DF.quad(
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
    expect(new DataFactory<RDF.BaseQuad>().quad(
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
    expect(() => expect(DF.quad(
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
    expect(DF.quad(
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
    expect(DF.quad(
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
    expect(DF.quad(
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
    expect(DF.quad(
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

  it('should succeed for equal quads nodes', () => {
    expect(DF.quad(
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

  it('should succeed for equal nested quads nodes', () => {
    expect(DF.quad(
      DF.namedNode('s'),
      DF.namedNode('p'),
      DF.quad(
        DF.namedNode('s'),
        DF.namedNode('p'),
        DF.namedNode('o'),
        DF.namedNode('g'),
      ),
      DF.namedNode('g'),
    )).toEqualRdfQuad(DF.quad(
      DF.namedNode('s'),
      DF.namedNode('p'),
      DF.quad(
        DF.namedNode('s'),
        DF.namedNode('p'),
        DF.namedNode('o'),
        DF.namedNode('g'),
      ),
      DF.namedNode('g'),
    ));
  });

  it('should not succeed for non-equal quads', () => {
    expect(DF.quad(
      DF.namedNode('s'),
      DF.namedNode('p'),
      DF.namedNode('o'),
      DF.namedNode('g'),
    )).not.toEqualRdfQuad(DF.quad(
      DF.namedNode('s1'),
      DF.namedNode('p'),
      DF.namedNode('o'),
      DF.namedNode('g'),
    ));
  });

  it('should not succeed for non-equal nested quads', () => {
    expect(DF.quad(
      DF.namedNode('s'),
      DF.namedNode('p'),
      DF.quad(
        DF.namedNode('s'),
        DF.namedNode('p'),
        DF.namedNode('o'),
        DF.namedNode('g'),
      ),
      DF.namedNode('g'),
    )).not.toEqualRdfQuad(DF.quad(
      DF.namedNode('s'),
      DF.namedNode('p'),
      DF.quad(
        DF.namedNode('s1'),
        DF.namedNode('p'),
        DF.namedNode('o'),
        DF.namedNode('g'),
      ),
      DF.namedNode('g'),
    ));
  });

  it('should not fail for equal quad nodes', () => {
    expect(() => expect(DF.quad(
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

  it('should fail for non-equal quads', () => {
    expect(() => expect(DF.quad(
      DF.namedNode('s'),
      DF.namedNode('p'),
      DF.namedNode('o'),
      DF.namedNode('g'),
    )).toEqualRdfQuad(DF.quad(
      DF.namedNode('s1'),
      DF.namedNode('p'),
      DF.namedNode('o'),
      DF.namedNode('g'),
    ))).toThrowErrorMatchingSnapshot();
  });
});
