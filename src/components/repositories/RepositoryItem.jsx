import React from 'react';
import ListItem from 'react-toolbox/lib/list/ListItem';
import MenuItem from 'react-toolbox/lib/menu/MenuItem';
import IconMenu from 'react-toolbox/lib/menu/IconMenu';
import classnames from 'classnames';
import map from 'lodash/map';
import './RepositoryItem.css';

const Dropdown = ({actions, onClick}) => {
  const handleClick = (type) => () => {
    onClick && onClick(type);
  }
  const actionItems = map(actions, (type, key) => {
    return (
      <MenuItem key={key} className='dropdown-menu-item' caption={key} onClick={handleClick(type)} />
    );
  });

  return (
    <IconMenu icon='more_horiz' position='topRight' menuRipple>
      {actionItems}
    </IconMenu>
  )
}

const RepositoryItem = ({className, onClick, onAction, item, ...props}) => {
  const {name, stargazers, forks, watchers, issues} = item;
  const legend = `Stars: ${stargazers} Forks: ${forks} Watchers:${watchers} Issues:${issues}`;
  const handleAction = (type) => {
    onAction && onAction(type);
  };
  const rightActions = [
    <Dropdown key="dropdown" actions={{'View Issues': 'issues'}} onClick={handleAction}/>
  ];
  return (
    <ListItem className={classnames('rp-repository-item', className)}
      caption={name}
      legend={legend}
      rightActions={rightActions}
      {...props}
      onClick={onClick}
    />
  );
};

export default RepositoryItem;