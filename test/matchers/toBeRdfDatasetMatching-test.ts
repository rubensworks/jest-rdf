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

const quad3 = DF.quad(
  DF.namedNode('s'),
  DF.namedNode('p'),
  DF.literal('o'),
  DF.defaultGraph(),
);

describe('#toBeRdfDatasetMatching', () => {
  it('should succeed if the dataset matches', () => {
    return expect(datasetFactory([quad1, quad2, quad3])).toBeRdfDatasetMatching({ subject: DF.namedNode('s') }, 3);
  });

  it('should not succeed if the dataset does not match', () => {
    return expect(datasetFactory([quad1, quad2, quad3])).not.toBeRdfDatasetMatching({ subject: DF.namedNode('s') });
  });

  it('should fail if the dataset does not match', () => {
    return expect(() => expect([
      expect(datasetFactory([quad1, quad2, quad3])).toBeRdfDatasetMatching({ subject: DF.namedNode('s') }),
    ])).toThrowErrorMatchingSnapshot();
  });

  it('should not fail if the dataset matches', () => {
    return expect(() => expect([
      expect(datasetFactory([quad1, quad2, quad3])).not.toBeRdfDatasetMatching({ subject: DF.namedNode('s') }, 3),
    ])).toThrowErrorMatchingSnapshot();
  });
});
