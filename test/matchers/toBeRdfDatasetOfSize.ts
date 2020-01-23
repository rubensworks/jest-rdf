import { defaultGraph, namedNode, quad } from '@rdfjs/data-model';
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

describe('#toBeRdfDatasetOfSize', () => {
  it('should succeed if the dataset has the right number of quad', () => {
    return expect(datasetFactory([quad1, quad2])).toBeRdfDatasetOfSize(2);
  });

  it('should not succeed if the dataset does not have the right number of quads', () => {
    return expect(datasetFactory([quad1])).not.toBeRdfDatasetOfSize(2);
  });

  it('should fail if the dataset does not have the right number of quads', () => {
    return expect(() => expect([
      expect(datasetFactory([quad1])).toBeRdfDatasetOfSize(2),
    ])).toThrowErrorMatchingSnapshot();
  });

  it('should not fail if the dataset has the right number of quads', () => {
    return expect(() => expect([
      expect(datasetFactory([quad1, quad2])).not.toBeRdfDatasetOfSize(2),
    ])).toThrowErrorMatchingSnapshot();
  });
});
