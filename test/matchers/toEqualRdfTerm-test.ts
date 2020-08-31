import { DataFactory } from 'rdf-data-factory';
import "../../index";

const DF = new DataFactory();

describe('#toEqualRdfTerm', () => {
  it('should succeed for equal named nodes', () => {
    return expect(DF.namedNode('a')).toEqualRdfTerm(DF.namedNode('a'));
  });

  it('should not succeed for non-equal named nodes', () => {
    return expect(DF.namedNode('a')).not.toEqualRdfTerm(DF.namedNode('b'));
  });

  it('should not succeed for a named node and a variable', () => {
    return expect(DF.namedNode('a')).not.toEqualRdfTerm(DF.variable('a'));
  });

  it('should not fail for equal named nodes', () => {
    return expect(() => expect(DF.namedNode('a')).not.toEqualRdfTerm(DF.namedNode('a'))).toThrowErrorMatchingSnapshot();
  });

  it('should fail for non-equal named nodes', () => {
    return expect(() => expect(DF.namedNode('a')).toEqualRdfTerm(DF.namedNode('b'))).toThrowErrorMatchingSnapshot();
  });

  it('should fail for a named node and a variable', () => {
    return expect(() => expect(DF.namedNode('a')).toEqualRdfTerm(DF.variable('a'))).toThrowErrorMatchingSnapshot();
  });

  it('should succeed for equal blank nodes', () => {
    return expect(DF.blankNode('a')).toEqualRdfTerm(DF.blankNode('a'));
  });

  it('should succeed for non-equal blank nodes', () => {
    return expect(DF.blankNode('a')).toEqualRdfTerm(DF.blankNode('b'));
  });

  it('should not succeed for a blank node and a variable', () => {
    return expect(DF.blankNode('a')).not.toEqualRdfTerm(DF.variable('a'));
  });

  it('should not fail for equal blank nodes', () => {
    return expect(() => expect(DF.blankNode('a')).not.toEqualRdfTerm(DF.blankNode('a'))).toThrowErrorMatchingSnapshot();
  });

  it('should not fail for non-equal blank nodes', () => {
    return expect(() => expect(DF.blankNode('a')).not.toEqualRdfTerm(DF.blankNode('b'))).toThrowErrorMatchingSnapshot();
  });

  it('should fail for a blank node and a variable', () => {
    return expect(() => expect(DF.blankNode('a')).toEqualRdfTerm(DF.variable('a'))).toThrowErrorMatchingSnapshot();
  });
});
