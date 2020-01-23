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

describe('#toHaveQuads', () => {
  it('should succeed if the dataset has the right number of quad', () => {
    return expect(datasetFactory([quad1, quad2])).toHaveQuads(2);
  });

  it('should not succeed if the dataset does not have the right number of quads', () => {
    return expect(datasetFactory([quad1])).not.toHaveQuads(2);
  });
});
