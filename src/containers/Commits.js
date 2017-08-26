import BaseItemsView from '../components/BaseItemsView';
import BaseItemsList from '../components/BaseItemsList';
import CommitItem from '../components/commits/CommitItem';
import { gql, graphql } from 'react-apollo';
import map from 'lodash/map';
import merge from 'lodash/merge';

const Commits = BaseItemsList(CommitItem, 'commits');
const CommitsView = BaseItemsView(Commits, 'commits', 'No Commit Found');

const COMMIT_QUERY = gql`
    query RepoCommits($name:String!, $owner:String!,$branch:String!,$cursor:String) {
      repository(name: $name, owner: $owner) {
        ref(qualifiedName: $branch) {
          target {
            ... on Commit {
              id
              history(first: 10,after:$cursor) {
                pageInfo {
                  hasNextPage,
                  endCursor
                }
                edges {
                  node {
                    id
                    messageHeadline
                    oid
                    committedDate
                    message
                    author {
                      name
                      email
                      date
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;


const flattenCommitHistory = (repository) => {
  const {ref} = repository || {};
  const {target} = ref || {};
  const {history} = target || {};
  const {pageInfo, edges=[]} = history || {};
  const {endCursor, hasNextPage:hasNext} = pageInfo || {};
  return {
    endCursor,
    hasNext,
    commits: map(edges, ({node}) => ({...node}))
  }
};

export default graphql(COMMIT_QUERY, {
  options: ({match:{params:{owner, name, branch}}}) => {
    return {
      variables:{
        owner, name, branch
      }
    }
  },
  props({ data: { loading, repository, fetchMore }, ownProps:{match:{params:{owner, name, branch}}}}) {
    const {endCursor, ...other} = flattenCommitHistory(repository);
    return {
      loading,
      onSelect: () => {},
      ...other,
      onLoadMore: () => {
        return fetchMore({
          query: COMMIT_QUERY,
          variables: {
            cursor: endCursor,
            name,
            owner,
            branch
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            const oldEdges = previousResult.repository.ref.target.history.edges;
            const newEdges = fetchMoreResult.repository.ref.target.history.edges;
            const {pageInfo} = fetchMoreResult.repository.ref.target.history;

            return merge({}, previousResult, {
              repository: {
                ref:{
                  target:{
                    history:{
                      edges: [...oldEdges, ...newEdges],
                      pageInfo: {...pageInfo}
                    }
                  }
                }
              }
            })
          },
        });
      },
    };
  },
})(CommitsView);