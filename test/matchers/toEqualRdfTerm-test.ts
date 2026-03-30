import { DataFactory } from 'rdf-data-factory';
import '../../index';

const DF = new DataFactory();

describe('#toEqualRdfTerm', () => {
  it('should succeed for equal named nodes', () => {
    expect(DF.namedNode('a')).toEqualRdfTerm(DF.namedNode('a'));
  });

  it('should not succeed for non-equal named nodes', () => {
    expect(DF.namedNode('a')).not.toEqualRdfTerm(DF.namedNode('b'));
  });

  it('should not succeed for a named node and a variable', () => {
    expect(DF.namedNode('a')).not.toEqualRdfTerm(DF.variable('a'));
  });

  it('should not fail for equal named nodes', () => {
    expect(() => expect(DF.namedNode('a')).not.toEqualRdfTerm(DF.namedNode('a'))).toThrowErrorMatchingSnapshot();
  });

  it('should fail for non-equal named nodes', () => {
    expect(() => expect(DF.namedNode('a')).toEqualRdfTerm(DF.namedNode('b'))).toThrowErrorMatchingSnapshot();
  });

  it('should fail for a named node and a variable', () => {
    expect(() => expect(DF.namedNode('a')).toEqualRdfTerm(DF.variable('a'))).toThrowErrorMatchingSnapshot();
  });

  it('should succeed for equal blank nodes', () => {
    expect(DF.blankNode('a')).toEqualRdfTerm(DF.blankNode('a'));
  });

  it('should succeed for non-equal blank nodes', () => {
    expect(DF.blankNode('a')).toEqualRdfTerm(DF.blankNode('b'));
  });

  it('should not succeed for a blank node and a variable', () => {
    expect(DF.blankNode('a')).not.toEqualRdfTerm(DF.variable('a'));
  });

  it('should not fail for equal blank nodes', () => {
    expect(() => expect(DF.blankNode('a')).not.toEqualRdfTerm(DF.blankNode('a'))).toThrowErrorMatchingSnapshot();
  });

  it('should not fail for non-equal blank nodes', () => {
    expect(() => expect(DF.blankNode('a')).not.toEqualRdfTerm(DF.blankNode('b'))).toThrowErrorMatchingSnapshot();
  });

  it('should fail for a blank node and a variable', () => {
    expect(() => expect(DF.blankNode('a')).toEqualRdfTerm(DF.variable('a'))).toThrowErrorMatchingSnapshot();
  });

  it('should succeed for equal quads nodes', () => {
    expect(DF.quad(
      DF.namedNode('s'),
      DF.namedNode('p'),
      DF.namedNode('o'),
      DF.namedNode('g'),
    )).toEqualRdfTerm(DF.quad(
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
    )).toEqualRdfTerm(DF.quad(
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
    )).not.toEqualRdfTerm(DF.quad(
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
    )).not.toEqualRdfTerm(DF.quad(
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

  it('should not succeed for a named node and a quad', () => {
    expect(DF.namedNode('a')).not.toEqualRdfTerm(DF.quad(
      DF.namedNode('s'),
      DF.namedNode('p'),
      DF.namedNode('o'),
      DF.namedNode('g'),
    ));
  });

  it('should not fail for equal quads', () => {
    expect(() => expect(DF.quad(
      DF.namedNode('s'),
      DF.namedNode('p'),
      DF.namedNode('o'),
      DF.namedNode('g'),
    )).not.toEqualRdfTerm(DF.quad(
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
    )).toEqualRdfTerm(DF.quad(
      DF.namedNode('s1'),
      DF.namedNode('p'),
      DF.namedNode('o'),
      DF.namedNode('g'),
    ))).toThrowErrorMatchingSnapshot();
  });

  it('should fail for a blank node and a quads', () => {
    expect(() => expect(DF.blankNode('a')).toEqualRdfTerm(DF.quad(
      DF.namedNode('s'),
      DF.namedNode('p'),
      DF.namedNode('o'),
      DF.namedNode('g'),
    ))).toThrowErrorMatchingSnapshot();
  });
});
