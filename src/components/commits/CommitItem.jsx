import React from 'react';
import ListItem from 'react-toolbox/lib/list/ListItem';
import classnames from 'classnames';
import formatDate from '../../utils/formatDate';

import './CommitItem.css';

const CommitItem = ({className, onClick, item, ...props}) => {
  const {messageHeadline, committedDate, author:{name}} = item;
  const legend = `Commited By: ${name}, At: ${formatDate(committedDate)}`;
  return (
    <ListItem className={classnames('rp-commit-item', className)}
      caption={messageHeadline}
      legend={legend}
      {...props}
      onClick={onClick}
    />
  );
};

export default CommitItem;