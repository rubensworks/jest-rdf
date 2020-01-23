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

describe('#toBeRdfDatasetMatching', () => {
  it('should succeed if the dataset matches', () => {
    return expect(datasetFactory([quad1, quad2, quad3])).toBeRdfDatasetMatching({ subject: namedNode('s') }, 3);
  });

  it('should not succeed if the dataset does not match', () => {
    return expect(datasetFactory([quad1, quad2, quad3])).not.toBeRdfDatasetMatching({ subject: namedNode('s') });
  });

  it('should fail if the dataset does not match', () => {
    return expect(() => expect([
      expect(datasetFactory([quad1, quad2, quad3])).toBeRdfDatasetMatching({ subject: namedNode('s') }),
    ])).toThrowErrorMatchingSnapshot();
  });

  it('should not fail if the dataset matches', () => {
    return expect(() => expect([
      expect(datasetFactory([quad1, quad2, quad3])).not.toBeRdfDatasetMatching({ subject: namedNode('s') }, 3),
    ])).toThrowErrorMatchingSnapshot();
  });
});
