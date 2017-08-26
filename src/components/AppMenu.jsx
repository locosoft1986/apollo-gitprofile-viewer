import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import List from 'react-toolbox/lib/list/List';
import ListItem from 'react-toolbox/lib/list/ListItem';

import './AppMenu.css';

const AppMenu = ({location, onMenuClick}) => {
  const handleMenuClick = (path, name, idx) => (e) => {
    onMenuClick(e, path, name, idx)
  }

  const items = [
    {path: '/info', label: 'Info'},
    {path: '/repositories', label: 'Repositories'}
  ].map(({path, label}, i) => {
    const isActive = location && location.startsWith(path)
    return (
      <ListItem
        key={i}
        itemContent={<a>{label}</a>}
        className={classnames({'active': isActive})}
        onClick={handleMenuClick(path, label, i)}
      />
    )
  })

  return (
    <List ripple className="rp-nav">{items}</List>
  );
}

AppMenu.propTypes = {
  location: PropTypes.string,
  onMenuClick: PropTypes.func.isRequired
}

export default AppMenu;
