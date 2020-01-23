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

describe('#toHaveQuad', () => {
  it('should succeed if the dataset has a quad', () => {
    return expect(datasetFactory([quad1])).toHaveQuad(quad1);
  });

  it('should not succeed if the dataset does not have a quad', () => {
    return expect(datasetFactory([quad1])).not.toHaveQuad(quad2);
  });
});