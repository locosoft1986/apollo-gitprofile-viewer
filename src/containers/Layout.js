import React, {Component} from 'react';
import PropTypes from 'prop-types';
import AppLayout from '../components/AppLayout';
import AppMenu from '../components/AppMenu';
import { gql, graphql } from 'react-apollo';

class Layout extends Component{
  static contextTypes = {
    router: PropTypes.object
  };

  static propTypes = {
    currentUser: PropTypes.object,
  };

  handleMenuClick = (e, path) => {
    this.context.router.history.push(path);
  };

  render(){
    const {children, location = {}, currentUser, loading} = this.props;

    if(loading) {
      return (
        <p>Loading</p>
      )
    }

    const {
      repositories: {
        totalCount: repositories
      },
      followers: {
        totalCount: followers
      },
      following: {
        totalCount: following
      },
      pullRequests: {
        totalCount: pullRequests
      },
      watching: {
        totalCount: watching
      },
      ...otherUserProps
    } = currentUser;

    const user = {
      repositories,
      followers,
      following,
      pullRequests,
      watching,
      ...otherUserProps
    };
    const menus = (
      <AppMenu
        location={location.pathname || 'repositories'}
        onMenuClick={this.handleMenuClick}
      />
    )

    return (
      <AppLayout
        user={user}
        menus={menus}
      >
        {children}
      </AppLayout>
    );
  }
}

const PROFILE_QUERY = gql`
  query CurrentUserForLayout {
    viewer {
      login,
      location,
      name,
      email,
      avatarUrl,
      repositories {
        totalCount
      },
      followers {
        totalCount
      },
      following {
        totalCount
      },
      pullRequests {
        totalCount
      },
      watching {
        totalCount
      }
    }
  }
`;

export default graphql(PROFILE_QUERY, {
  options: {
    fetchPolicy: 'cache-and-network',
  },
  props: ({data:{loading, viewer}}) => ({
    loading,
    currentUser: viewer
  }),
})(Layout);
