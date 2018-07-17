import express from 'express';
import React from 'react';
import algoliasearch from 'algoliasearch';
import { renderToString } from 'react-dom/server';
import { App, findResultsState } from './app';
import template from './template';

const algoliaClient = algoliasearch('latency', '6be0576ff61c053d5f9a3225e2a90f76');

const server = express();

server.use('/assets', express.static('assets'));

server.get('/', async (req, res) => {
  const resultsState = await findResultsState(App);
  const initialState = { resultsState };
  const appString = renderToString(<App {...initialState} />);

  res.send(
    template({
      body: appString,
      title: 'Hello World from the server',
      initialState: JSON.stringify(initialState),
    })
  );
});

server.post('/search', async (req, res) => {
  const { requests } = req.body;
  const results = await algoliaClient.search(requests);
  res.status(200).send(results);
});

server.post('/sffv', async (req, res) => {
  const { requests } = req.body;
  const results = await algoliaClient.searchForFacetValues(requests);
  res.status(200).send(results);
});

server.listen(8080);

/* eslint-disable no-console */
console.log('listening on 8080');
/* eslint-enable no-console */
