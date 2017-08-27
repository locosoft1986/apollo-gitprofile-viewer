import React from 'react';
import ListItem from 'react-toolbox/lib/list/ListItem';
import classnames from 'classnames';
import formatDate from '../../utils/formatDate';

import './IssueItem.css';

const IssueItem = ({className, onClick, item, ...props}) => {
  const {title, author:{login}, number, createdAt} = item;
  const legend = `#${number}, Issued By: ${login}, At:${formatDate(createdAt, 'YYYY-MM-DD HH:mm')}`;
  return (
    <ListItem className={classnames('rp-issue-item', className)}
              caption={title}
              legend={legend}
              {...props}
              onClick={onClick}
    />
  );
};

export default IssueItem;