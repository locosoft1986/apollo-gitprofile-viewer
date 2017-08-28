import React from 'react';
import Card from 'react-toolbox/lib/card/Card';
import CardTitle from 'react-toolbox/lib/card/CardTitle';
import CardText from 'react-toolbox/lib/card/CardText';
import classnames from 'classnames';
import formatDate from '../../utils/formatDate';

import './IssueCommentItem.css';

export const IssueCommentHeader = ({className, onClick, item, ...props}) => {
  const {
    author: {login, avatarUrl},
    createdAt,
    title,
    bodyHTML
  } = item;
  const contentAttr = bodyHTML ? {dangerouslySetInnerHTML: {__html: bodyHTML}} : {}
  return (
    <Card className={classnames('rp-issuecomment-item', className)}>
      <CardTitle
        avatar={avatarUrl}
        title={login}
        subtitle={`Posted At: ${formatDate(createdAt)}`}
      />
      <CardTitle
        title={title}
      />
      <CardText className="rp-issuecomment-text" {...contentAttr} />
    </Card>
  )
};

const IssueCommentItem = ({className, onClick, item, ...props}) => {
  const {
    author: {login, avatarUrl},
    createdAt,
    bodyHTML
  } = item;
  const contentAttr = bodyHTML ? {dangerouslySetInnerHTML: {__html: bodyHTML}} : {}
  return (
    <Card className={classnames('rp-issuecomment-item', className)}>
      <CardTitle
        avatar={avatarUrl}
        title={login}
        subtitle={`Posted At: ${formatDate(createdAt)}`}
      />
      <CardText className="rp-issuecomment-text" {...contentAttr} />
    </Card>
  )
};

export default IssueCommentItem;