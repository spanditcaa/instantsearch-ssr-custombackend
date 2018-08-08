import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import {
  RefinementList,
  SearchBox,
  Hits,
  Configure,
} from 'react-instantsearch/dom';
import { createInstantSearch } from 'react-instantsearch/server';

const customSearchClient = {
  search(requests) {
    return axios
      .post('http://localhost:8080/search', { requests })
      .then(response => response.data);
  },

  searchForFacetValues(requests) {
    return axios
      .post('http://localhost:8080/sffv', { requests })
      .then(response => response.data);
  },
};

const { InstantSearch, findResultsState } = createInstantSearch();
class App extends Component {
  render() {
    const { resultsState } = this.props;

    return (
      <InstantSearch
        indexName="ikea"
        searchClient={customSearchClient}
        resultsState={resultsState}
      >
        <Configure hitsPerPage={3} />
        <SearchBox />
        <Hits />
        <RefinementList attribute="category" />
      </InstantSearch>
    );
  }
}

App.propTypes = {
  resultsState: PropTypes.object,
};

export { App, findResultsState };
