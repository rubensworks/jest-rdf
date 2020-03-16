# jest-rdf

[![Build Status](https://travis-ci.org/rubensworks/jest-rdf.svg?branch=master)](https://travis-ci.org/rubensworks/jest-rdf)
[![Coverage Status](https://coveralls.io/repos/github/rubensworks/jest-rdf/badge.svg?branch=master)](https://coveralls.io/github/rubensworks/jest-rdf?branch=master)
[![npm version](https://badge.fury.io/js/jest-rdf.svg)](https://www.npmjs.com/package/jest-rdf)

[Jest](https://jestjs.io/) test utilities for [RDFJS](https://github.com/rdfjs/representation-task-force/),
including several new matchers.

## Installation

```bash
$ yarn install --save-dev jest-rdf
```

## Configuration

In order to use matchers in your tests,
you'll have to make sure that they are imported.
This can be done by adding the following entry to your Jest configuration:
```json
"jest": {
  "setupTestFrameworkScriptFile": "jest-rdf"
}
```

If you are already using an existing test framework script file,
make sure to add jest-rdf as follows to your file:
```javascript
...
require('jest-rdf');
```

## _Optional: Typescript typings configuration_

If you are using TypeScript, possibly in combination with [ts-jest](https://www.npmjs.com/package/ts-jest),
you will need to import the typings of this package to make the TS compiler recognise the new matchers.

For this, include the following import at the top of each applicable test file:
```
import "jest-rdf";
```

## API

#### toBeRdfIsomorphic

Check if two RDF graphs are [isomorphic](https://www.w3.org/TR/rdf11-concepts/#graph-isomorphism).
An RDF graph is represented as an iterable of quads where the order of quads is not important.

```js
const g1 = [
  quad(blankNode('b1'), namedNode('p1'), namedNode('o1'), namedNode('g1')),
  quad(blankNode('b1'), namedNode('p2'), namedNode('o2'), namedNode('g2')),
];
const g2 = [
  quad(blankNode('b2'), namedNode('p2'), namedNode('o2'), namedNode('g2')),
  quad(blankNode('b2'), namedNode('p1'), namedNode('o1'), namedNode('g1')),
];
expect(g1).toBeRdfIsomorphic(g2);
expect(dataset(g1)).toBeRdfIsomorphic(dataset(g2));
```

#### toEqualRdfQuad

Check if two RDF Quads are equal.

Terms are compared under the semantics of _toEqualRdfTerm_.

```js
const q1 = quad(namedNode('s1'), namedNode('p1'), namedNode('o1'), namedNode('g1'));
const q2 = quad(namedNode('s2'), namedNode('p2'), namedNode('o2'), namedNode('g2'));
expect(q1).toEqualRdfQuad(q2);
```

#### toEqualRdfQuadArray

Check if two RDF Quad arrays are equal.

Quads are compared under the semantics of _toEqualRdfQuad_.

```js
const q1 = quad(namedNode('s1'), namedNode('p1'), namedNode('o1'), namedNode('g1'));
const q2 = quad(namedNode('s2'), namedNode('p2'), namedNode('o2'), namedNode('g2'));
expect([q1]).toEqualRdfQuadArray([q2]);
```

#### toEqualRdfTerm

Check if two RDF Terms are equal.

_Blank nodes are always considered equal._

```js
expect(namedNode('t1')).toEqualRdfTerm(namedNode('t2'));
```

#### toEqualRdfTermArray

Check if two RDF Term arrays are equal.

Terms are compared under the semantics of _toEqualRdfTerm_.

```js
expect([namedNode('t1'), namedNode('t2')]).toEqualRdfTermArray([namedNode('t2'), namedNode('t3')]);
```

#### toBeRdfDatasetContaining

Check if a dataset contains _all_ of the given quads.

```js
const q1 = quad(namedNode('s1'), namedNode('p1'), namedNode('o1'), namedNode('g1'));
const q2 = quad(namedNode('s2'), namedNode('p2'), namedNode('o2'), namedNode('g2'));
const d = dataset([q1, q2]);
expect(d).toBeRdfDatasetContaining(q1);
expect(d).toBeRdfDatasetContaining(q1, q2);
```

#### toBeRdfDatasetMatching

Check if a dataset contains _exactly_ the given amount of matching quads (default 1).

```js
const q1 = quad(namedNode('s'), namedNode('p1'), namedNode('o1'), namedNode('g1'));
const q2 = quad(namedNode('s'), namedNode('p2'), namedNode('o2'), namedNode('g2'));
const d = dataset([q1, q2]);
expect(d).toBeRdfDatasetMatching({ subject: namedNode('s'), predicate: namedNode('p1') });
expect(d).toBeRdfDatasetMatching({ subject: namedNode('s') }, 2);
```

#### toBeRdfDatasetOfSize

Check if a dataset contains _exactly_ the given amount of quads.

```js
const q = quad(namedNode('s1'), namedNode('p1'), namedNode('o1'), namedNode('g1'));
const d = dataset([q]);
expect(d).toBeRdfDatasetOfSize(1);
```

## License
This software is written by [Ruben Taelman](http://rubensworks.net/).

This code is released under the [MIT license](http://opensource.org/licenses/MIT).
