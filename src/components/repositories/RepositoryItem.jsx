import React from 'react';
import ListItem from 'react-toolbox/lib/list/ListItem';
import classnames from 'classnames';

import './RepositoryItem.css';

const RepositoryItem = ({className, onClick, item, ...props}) => {
  const {name, stargazers, forks, watchers, issues} = item;
  const legend = `Stars: ${stargazers} Forks: ${forks} Watchers:${watchers} Issues:${issues}`;
  return (
    <ListItem className={classnames('rp-repository-item', className)}
      caption={name}
      legend={legend}
      {...props}
      onClick={onClick}
    />
  );
};

export default RepositoryItem;