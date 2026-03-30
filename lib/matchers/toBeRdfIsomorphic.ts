import type * as RDF from '@rdfjs/types';
import type { ITermHash } from 'rdf-isomorphic';
import { getGraphBlankNodes, getQuadsWithBlankNodes, hashTerms, isomorphic, uniqGraph } from 'rdf-isomorphic';
import { quadToStringQuad } from 'rdf-string';
import { everyTerms, someTerms } from 'rdf-terms';

function getNonBlankDiff<TQuad extends RDF.BaseQuad = RDF.Quad>(a1: TQuad[], a2: TQuad[]): TQuad[] {
  return a1.filter(
    quad =>
      everyTerms(quad, term => term.termType !== 'BlankNode') &&
        a2.every(q2 => !q2.equals(quad)),
  );
}

export function getDiff(hash1: ITermHash, hash2: ITermHash): string[] {
  const diffed: string[] = [];
  const values = new Set(Object.values(hash2));
  for (const key in hash1) {
    if (!values.has(hash1[key])) {
      diffed.push(key);
    }
  }
  return diffed;
}

export function unGroundHashes<TQuad extends RDF.BaseQuad = RDF.Quad>(graph: TQuad[]): ITermHash {
  return hashTerms(uniqGraph(getQuadsWithBlankNodes(graph)), getGraphBlankNodes(graph), {})[1];
}

export function getBnodeDiff<TQuad extends RDF.BaseQuad = RDF.Quad>(
  receivedQuads: TQuad[],
  expectedQuads: TQuad[],
): { received: Record<string, TQuad[]>; expected: Record<string, TQuad[]> } {
  // Hash every term based on the signature of the quads if appears in.
  const ungroundedHashesA = unGroundHashes(receivedQuads);
  const ungroundedHashesB = unGroundHashes(expectedQuads);
  const blankA = uniqGraph(getQuadsWithBlankNodes(receivedQuads));
  const blankB = uniqGraph(getQuadsWithBlankNodes(expectedQuads));

  const received: Record<string, TQuad[]> = {};
  const expected: Record<string, TQuad[]> = {};

  for (const elem of getDiff(ungroundedHashesA, ungroundedHashesB)) {
    received[elem] = blankA.filter(quad =>
      someTerms(quad, term => term.termType === 'BlankNode' && term.value === elem.slice(2)));
  }

  for (const elem of getDiff(ungroundedHashesB, ungroundedHashesA)) {
    expected[elem] = blankB.filter(quad =>
      someTerms(quad, term => term.termType === 'BlankNode' && term.value === elem.slice(2)));
  }

  return {
    received,
    expected,
  };
}

function quadArrayToString<TQuad extends RDF.BaseQuad = RDF.Quad>(quadArray: TQuad[]): string {
  return `[\n${quadArray.map(quad => `  ${JSON.stringify(quadToStringQuad(quad))}`).join(',\n')}\n]`;
}

export default {
  toBeRdfIsomorphic<TQuad extends RDF.BaseQuad = RDF.Quad>(received: Iterable<TQuad>, actual: Iterable<TQuad>) {
    const receivedArray = [ ...received ];
    const actualArray = [ ...actual ];

    if (!isomorphic(receivedArray, actualArray)) {
      const { received: receivedBnodes, expected: actualBnodes } = getBnodeDiff(receivedArray, actualArray);

      return {
        message: () => `expected two graphs to be isomorphic.

  Expected:
${quadArrayToString(actualArray)}

  Actual:
${quadArrayToString(receivedArray)}

Missing Quads (that don't contain Blank Nodes):
${quadArrayToString(getNonBlankDiff(actualArray, receivedArray))}

Additional Quads (that don't contain Blank Nodes):
${quadArrayToString(getNonBlankDiff(receivedArray, actualArray))}

Missing Blank Node Patterns:
${Object.entries(actualBnodes).map(([ bnode, quads ]) => `${bnode} : ${quadArrayToString(quads)}`).join('\n')}

Additional Blank Node Patterns:
${Object.entries(receivedBnodes).map(([ bnode, quads ]) => `${bnode} : ${quadArrayToString(quads)}`).join('\n')}
`,
        pass: false,
      };
    }

    return {
      message: () => `expected two graphs not to be isomorphic.

  Expected:
${quadArrayToString(actualArray)}

  Actual:
${quadArrayToString(receivedArray)}
`,
      pass: true,
    };
  },
};
