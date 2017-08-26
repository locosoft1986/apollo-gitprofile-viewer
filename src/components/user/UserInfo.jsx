import React from 'react';

import Avatar from 'react-toolbox/lib/avatar/Avatar';

import defaultAvatar from '../../assets/images/defaultAvatar.png';
import './UserInfo.css';

const UserInfo = ({user}) => {
  if(!user){
    return null;
  }
  const {login, name, avatarUrl, repositories, followers, pullRequests, watching, location} = user;

  return (
    <section className='rp-user-info'>
      <blockquote>
        <dl>
          <dt><Avatar image={avatarUrl || defaultAvatar} /></dt>
          <dd>
            <span>{name}</span>
            <small>
              {login}
            </small>
          </dd>
        </dl>
      </blockquote>
      <ul>
        <li>
          Repositories
          <span>{repositories}</span>
        </li>
        <li>
          Followers
          <span>{followers}</span>
        </li>
        <li>
          PullRequests
          <span>{pullRequests}</span>
        </li>
        <li>
          Watching
          <span>{watching}</span>
        </li>
        <li>
          Location
          <span>{location}</span>
        </li>
      </ul>
    </section>
  )
}

export default UserInfo;
