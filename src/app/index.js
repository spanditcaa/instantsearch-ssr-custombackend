import React, { Component } from 'react';
import Axios from 'axios';
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
    return Axios.request('http://localhost:8080/search', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ requests }),
    }).then(res => res.json());
  },

  searchForFacetValues(requests) {
    return Axios.request('http://localhost:8080/sffv', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ requests }),
    }).then(res => res.json());
  }
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
