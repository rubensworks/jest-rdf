import * as RDF from '@rdfjs/types';

export interface IQuadTerms<Q extends RDF.BaseQuad = RDF.Quad> {
  subject?: Q['subject'];
  predicate?: Q['predicate'];
  object?: Q['object'];
  graph?: Q['graph'];
}

export default {
  toBeRdfDatasetMatching<Q extends RDF.BaseQuad = RDF.Quad>(dataset: RDF.DatasetCore<Q>,
                                                            { subject, predicate, object, graph }: IQuadTerms<Q>,
                                                            matches = 1) {
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
