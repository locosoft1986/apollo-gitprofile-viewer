import BaseItemsView from '../components/BaseItemsView';
import BaseItemsList from '../components/BaseItemsList';
import RepositoryItem from '../components/repositories/RepositoryItem';
import { gql, graphql } from 'react-apollo';
import map from 'lodash/map';
import merge from 'lodash/merge';

const Repositories = BaseItemsList(RepositoryItem, 'repositories');
const RepositoriesView = BaseItemsView(Repositories, 'repositories', 'No Repository Found');

const REPO_QUERY = gql`
  query CurrentUserRepos($cursor:String) {
    viewer {
      repositories(first:10, after:$cursor, orderBy:{field: CREATED_AT, direction: DESC}) {
        edges {
          node {
            id,
            name,
            url,
            owner {
              login
            },
            forks {
              totalCount
            },
            stargazers {
              totalCount
            },
            watchers {
              totalCount
            },
            issues {
              totalCount
            }
          }
        },
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
`;

const flattenRepoEdges = (edges) => {
  return map(edges, ({node}) => {
    const {
      forks:{totalCount:forks},
      stargazers:{totalCount:stargazers},
      watchers:{totalCount:watchers},
      issues:{totalCount:issues},
      ...other
    } = node;

    return {
      forks, stargazers, watchers, issues, ...other
    }
  })
};

const flattenRepoFromView = (viewer) => {
  const {repositories} = viewer || {};
  const {edges = [], pageInfo} = repositories || {};
  const {endCursor, hasNextPage:hasNext} = pageInfo || {};

  return {
    endCursor,
    hasNext,
    repositories:flattenRepoEdges(edges)
  }
};


export default graphql(REPO_QUERY, {
  props({ data: { loading, viewer, fetchMore }, ownProps:{history}}) {
    const {endCursor, ...other} = flattenRepoFromView(viewer);
    return {
      loading,
      onSelect: (repo) => {history.push(`/repositories/${repo.owner.login}/${repo.name}/master`)},
      onAction: (type, repo) => {
        if(type === 'issues') {
          history.push(`/issues/${repo.owner.login}/${repo.name}`);
        }
      },
      ...other,
      onLoadMore: () => {
        return fetchMore({
          query: REPO_QUERY,
          variables: {
            cursor: endCursor,
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            const oldEdges = previousResult.viewer.repositories.edges;
            const newEdges = fetchMoreResult.viewer.repositories.edges;
            const {pageInfo} = fetchMoreResult.viewer.repositories;

            return merge({}, previousResult, {
              viewer: {
                repositories:{
                  edges: [...oldEdges, ...newEdges],
                  pageInfo: {...pageInfo}
                }
              }
            })
          },
        });
      },
    };
  },
})(RepositoriesView);
