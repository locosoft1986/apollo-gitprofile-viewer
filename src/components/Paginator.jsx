import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Button from 'react-toolbox/lib/button/Button';

import './Paginator.css';

export default class Paginator extends Component {
  static propsTypes = {
    loading: PropTypes.bool,
    hasNext: PropTypes.bool,
    loadButton: PropTypes.any,
    onLoadMore: PropTypes.func.isRequired
  };

  handleClick = (e) => {
    const {onLoadMore} = this.props;
    e.preventDefault()
    onLoadMore();
  }

  renderButton = () => {
    const {hasNext, loadButton, loading} = this.props;
    if(!hasNext){
      return null
    }

    if(loading) {
      return (
        <center>
          <p>Loading</p>
        </center>
      )
    }

    switch (typeof loadButton) {
      case 'string':
        return (
          <center>
            <Button flat onClick={this.handleClick} label={loadButton}/>
          </center>
        );

      case 'function':
        return React.createElement(
          loadButton,
          {onClick:this.handleClick, className: 'loadButton'}
        );
      default:
        return null
    }
  };

  render() {
    const {className, style, children} = this.props;
    return (
      <div className={classnames('rp-paginator-root', className)} style={style}>
        {children}
        {this.renderButton()}
      </div>
    )
  }
}