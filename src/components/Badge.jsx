import React from 'react';
import classnames from 'classnames';

import './Badge.css';

const Badge = ({ color, children, ...props}) => {
  return (
    <div className={classnames('badge', color)} {...props}>{children}</div>
  )
}

export default Badge;