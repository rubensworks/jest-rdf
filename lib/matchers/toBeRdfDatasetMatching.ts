import type * as RDF from '@rdfjs/types';

export interface IQuadTerms<TQuad extends RDF.BaseQuad = RDF.Quad> {
  subject?: TQuad['subject'];
  predicate?: TQuad['predicate'];
  object?: TQuad['object'];
  graph?: TQuad['graph'];
}

export default {
  toBeRdfDatasetMatching<TQuad extends RDF.BaseQuad = RDF.Quad>(
    dataset: RDF.DatasetCore<TQuad>,
    { subject, predicate, object, graph }: IQuadTerms<TQuad>,
    matches = 1,
  ) {
    const times = matches === 1 ? 'once' : `${matches} times`;

    if (dataset.match(subject, predicate, object, graph).size !== matches) {
      return {
        message: () => `expected dataset to match ${JSON.stringify({ subject, predicate, object, graph })} ${times}`,
        pass: false,
      };
    }

    return {
      message: () => `expected dataset to not match ${JSON.stringify({ subject, predicate, object, graph })} ${times}`,
      pass: true,
    };
  },
};
