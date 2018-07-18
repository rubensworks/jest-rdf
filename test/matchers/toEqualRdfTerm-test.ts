import {blankNode, namedNode, variable} from "rdf-data-model";
import "../../index";

describe('#toEqualRdfTerm', () => {
  it('should succeed for equal named nodes', () => {
    return expect(namedNode('a')).toEqualRdfTerm(namedNode('a'));
  });

  it('should not succeed for non-equal named nodes', () => {
    return expect(namedNode('a')).not.toEqualRdfTerm(namedNode('b'));
  });

  it('should not succeed for a named node and a variable', () => {
    return expect(namedNode('a')).not.toEqualRdfTerm(variable('a'));
  });

  it('should not fail for equal named nodes', () => {
    return expect(() => expect(namedNode('a')).not.toEqualRdfTerm(namedNode('a'))).toThrowErrorMatchingSnapshot();
  });

  it('should fail for non-equal named nodes', () => {
    return expect(() => expect(namedNode('a')).toEqualRdfTerm(namedNode('b'))).toThrowErrorMatchingSnapshot();
  });

  it('should fail for a named node and a variable', () => {
    return expect(() => expect(namedNode('a')).toEqualRdfTerm(variable('a'))).toThrowErrorMatchingSnapshot();
  });

  it('should succeed for equal blank nodes', () => {
    return expect(blankNode('a')).toEqualRdfTerm(blankNode('a'));
  });

  it('should succeed for non-equal blank nodes', () => {
    return expect(blankNode('a')).toEqualRdfTerm(blankNode('b'));
  });

  it('should not succeed for a blank node and a variable', () => {
    return expect(blankNode('a')).not.toEqualRdfTerm(variable('a'));
  });

  it('should not fail for equal blank nodes', () => {
    return expect(() => expect(blankNode('a')).not.toEqualRdfTerm(blankNode('a'))).toThrowErrorMatchingSnapshot();
  });

  it('should not fail for non-equal blank nodes', () => {
    return expect(() => expect(blankNode('a')).not.toEqualRdfTerm(blankNode('b'))).toThrowErrorMatchingSnapshot();
  });

  it('should fail for a blank node and a variable', () => {
    return expect(() => expect(blankNode('a')).toEqualRdfTerm(variable('a'))).toThrowErrorMatchingSnapshot();
  });
});
