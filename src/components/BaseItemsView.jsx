import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paginator from './Paginator';

import isEmpty from 'lodash/isEmpty';

export default function(ItemsComponent, key='items', emptyHint='No Item Found') {
  return class BaseItemView extends Component {
    static propTypes = {
      loading: PropTypes.bool,
      hasNext: PropTypes.bool,
      [key]: PropTypes.arrayOf(PropTypes.object),
      onSelect: PropTypes.func.isRequired,
      onLoadMore: PropTypes.func.isRequired,
      loadButton: PropTypes.any
    };

    static defaultProps = {
      loading: false,
      [key]: []
    };

    render() {
      const {
        hasNext, loading, onSelect, onLoadMore, loadButton
      } = this.props;
      const propsToPass = {
        [key]: this.props[key],
        onSelect
      }
      const items = (loading || !isEmpty(this.props[key])) ?
        <ItemsComponent {...propsToPass} />: (<p>{emptyHint}</p>);

      return (
        <Paginator
          style={{height: '100%'}}
          loading={loading}
          hasNext={hasNext}
          loadButton={loadButton || "Load More"}
          onLoadMore={onLoadMore}>
          {items}
        </Paginator>
      )
    }
  }
}