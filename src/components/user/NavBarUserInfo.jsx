import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Avatar from 'react-toolbox/lib/avatar/Avatar';
import Chip from 'react-toolbox/lib/chip/Chip';
import FaChevronDown from 'react-icons/lib/fa/chevron-down';
import UserInfo from './UserInfo';
import './NavBarUserInfo.css';

const defaultAvatar = require('../../assets/images/defaultAvatar.png');

class NavBarUserInfo extends Component{
  static propTypes = {
    user: PropTypes.object.isRequired
  }

  static defaultProps = {
    user: {}
  }

  state = {
    showInfo: false
  }

  toggleShowInfo = () => {
    this.setState({ showInfo: !this.state.showInfo})
  }

  render(){
    const { user } = this.props;
    const { showInfo } = this.state;
    return(
      <section className='rp-navbar-user-info'>
        <Chip onClick={this.toggleShowInfo}>
          <Avatar><img src={user.avatarUrl ? user.avatarUrl : defaultAvatar} alt='avatar'/></Avatar>
          <span>{user.name || user.username}</span>
          <FaChevronDown />
        </Chip>

        <div className={classnames('card', {'active': !!showInfo})}>
          <UserInfo user={this.props.user}/>
        </div>
        <div className={classnames({'overlay': !!showInfo})} onClick={this.toggleShowInfo}></div>
      </section>
    );
  }
}

export default NavBarUserInfo;