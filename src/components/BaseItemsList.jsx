import React, {Component} from 'react';
import PropTypes from 'prop-types';

import List from 'react-toolbox/lib/list/List';

import map from 'lodash/map';

export default function(ItemComponent, key='items') {
  return class ItemList extends Component {
    static propTypes = {
      [key]: PropTypes.arrayOf(PropTypes.object),
      onSelect: PropTypes.func.isRequired
    };

    static defaultProps = {
      [key]: []
    };

    handleSelection = (item) => () => {
      this.props.onSelect(item);
    };

    render() {
      const {children, className, style} = this.props;
      return (
        <List className={className} style={style}>
          {
            map(this.props[key], (item) => {
              const {id} = item;
              return (
                <ItemComponent key={id} item={item} onClick={this.handleSelection(item)} />
              )
            })
          }
          {children}
        </List>
      );
    }
  }
}