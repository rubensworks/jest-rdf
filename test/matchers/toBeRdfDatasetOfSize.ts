import { DataFactory } from 'rdf-data-factory';
import datasetFactory = require('rdf-dataset-indexed');
import '../../index';

const DF = new DataFactory();

const quad1 = DF.quad(
  DF.namedNode('s'),
  DF.namedNode('p'),
  DF.namedNode('o'),
  DF.namedNode('g'),
);

const quad2 = DF.quad(
  DF.namedNode('s'),
  DF.namedNode('p'),
  DF.namedNode('o'),
  DF.defaultGraph(),
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
