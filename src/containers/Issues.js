import BaseItemsView from '../components/BaseItemsView';
import BaseItemsList from '../components/BaseItemsList';
import IssueItem from '../components/issues/IssueItem';
import { gql, graphql } from 'react-apollo';
import map from 'lodash/map';
import merge from 'lodash/merge';

const Issues = BaseItemsList(IssueItem, 'issues');
const IssuesView = BaseItemsView(Issues, 'issues', 'No Issue Found');

const ISSUE_QUERY = gql`
    query RepoIssues($name:String!, $owner:String!, $cursor:String) {
      repository(name: $name, owner: $owner) {
        issues(first:10, after:$cursor, orderBy:{field: CREATED_AT, direction: DESC}) {
          edges {
            node {
              title
              id
              number
              createdAt
              author {
                login
              }
            }
          }
          pageInfo {
            hasNextPage,
            endCursor
          }
        }
      }
    }
  `;


const flattenIssues = (repository) => {
  const {issues} = repository || {};
  const {pageInfo, edges=[]} = issues || {};
  const {endCursor, hasNextPage:hasNext} = pageInfo || {};
  return {
    endCursor,
    hasNext,
    issues: map(edges, ({node}) => ({...node}))
  }
};

export default graphql(ISSUE_QUERY, {
  options: ({match:{params:{owner, name}}}) => {
    return {
      variables:{
        owner, name
      }
    }
  },
  props({ data: { loading, repository, fetchMore }, ownProps:{match:{params:{owner, name, branch}}}}) {
    const {endCursor, ...other} = flattenIssues(repository);
    return {
      loading,
      onSelect: () => {},
      ...other,
      onLoadMore: () => {
        return fetchMore({
          query: ISSUE_QUERY,
          variables: {
            cursor: endCursor,
            name,
            owner
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            const oldEdges = previousResult.repository.issues.edges;
            const newEdges = fetchMoreResult.repository.issues.edges;
            const {pageInfo} = fetchMoreResult.repository.issues;

            return merge({}, previousResult, {
              repository: {
                issues:{
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
})(IssuesView);