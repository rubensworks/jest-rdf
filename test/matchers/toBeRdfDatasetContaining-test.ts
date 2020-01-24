import { defaultGraph, literal, namedNode, quad } from '@rdfjs/data-model';
import datasetFactory = require('rdf-dataset-indexed');
import '../../index';

const quad1 = quad(
  namedNode('s'),
  namedNode('p'),
  namedNode('o'),
  namedNode('g'),
);

const quad2 = quad(
  namedNode('s'),
  namedNode('p'),
  namedNode('o'),
  defaultGraph(),
);

const quad3 = quad(
  namedNode('s'),
  namedNode('p'),
  literal('o'),
  defaultGraph(),
);

describe('#toBeRdfDatasetContaining', () => {
  it('should succeed if the dataset has a quad', () => {
    return expect(datasetFactory([quad1])).toBeRdfDatasetContaining(quad1);
  });

  it('should succeed if the dataset has multiple quads', () => {
    return expect(datasetFactory([quad1, quad2])).toBeRdfDatasetContaining(quad1, quad2);
  });

  it('should not succeed if the dataset does not have a quad', () => {
    return expect(datasetFactory([quad1])).not.toBeRdfDatasetContaining(quad2);
  });

  it('should not succeed if the dataset does not have multiple quads', () => {
    return expect(datasetFactory([quad1])).not.toBeRdfDatasetContaining(quad2, quad3);
  });

  it('should fail if the dataset does not have a quad', () => {
    return expect(() => expect([
      expect(datasetFactory([quad1])).toBeRdfDatasetContaining(quad2),
    ])).toThrowErrorMatchingSnapshot();
  });

  it('should not fail if the dataset does have a quad', () => {
    return expect(() => expect([
      expect(datasetFactory([quad1])).not.toBeRdfDatasetContaining(quad1),
    ])).toThrowErrorMatchingSnapshot();
  });

  it('should fail if the dataset does not have multiple quads', () => {
    return expect(() => expect([
      expect(datasetFactory([quad1])).toBeRdfDatasetContaining(quad2, quad3),
    ])).toThrowErrorMatchingSnapshot();
  });

  it('should not fail if the dataset does have multiple quads', () => {
    return expect(() => expect([
      expect(datasetFactory([quad1, quad2])).not.toBeRdfDatasetContaining(quad1, quad2),
    ])).toThrowErrorMatchingSnapshot();
  });
});
