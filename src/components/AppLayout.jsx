import React, {Component} from 'react'
import PropTypes from 'prop-types';

import classnames from 'classnames';

import AppBar from 'react-toolbox/lib/app_bar/AppBar';

import Layout from 'react-toolbox/lib/layout/Layout';
import Panel from 'react-toolbox/lib/layout/Panel';
import NavDrawer from 'react-toolbox/lib/layout/NavDrawer';
import FaBars from 'react-icons/lib/fa/bars';
import NavBarUserInfo from './user/NavBarUserInfo';

import './AppLayout.css'

class AppLayout extends Component {
  static propTypes = {
    user: PropTypes.object,
    menus: PropTypes.element,
    brand: PropTypes.any
  }

  state = {
    activeDrawer: true
  }

  handleDrawer = () => {
    const { activeDrawer } = this.state;
    this.setState({activeDrawer: !activeDrawer});
  }

  render() {
    const { activeDrawer } = this.state;
    const {brand, menus, user, children} = this.props;

    return (
      <Layout className="rp-layout">
        <NavDrawer pinned={activeDrawer} className="rp-layout-nav">
          <header>{brand || 'GITPROFILE'}</header>
          {menus}
        </NavDrawer>

        <Panel className={classnames('rp-layout-panel', {'inactive': !activeDrawer})}>
          <AppBar flat fixed
            className={classnames('rp-layout-bar', {"inactive": !activeDrawer})}
            leftIcon={<FaBars />}
            onLeftIconClick={this.handleDrawer}>
            <NavBarUserInfo user={user} />
          </AppBar>

          <main className="rp-layout-main">{children}</main>
        </Panel>
      </Layout>
    );
  }
}

export default AppLayout;
