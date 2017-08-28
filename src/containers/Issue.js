import IssueCommentsView from '../components/issues/IssueCommentsView';
import { gql, graphql } from 'react-apollo';
import map from 'lodash/map';
import merge from 'lodash/merge';


const ISSUECOMMENT_QUERY = gql`
    query RepoIssues($name:String!, $owner:String!, $number:Int!, $cursor:String) {
      repository(name: $name, owner: $owner) {
        issue(number: $number) {
          author {
            login
            avatarUrl
          }
          state
          title
          createdAt
          comments(first:10,after:$cursor) {
            edges {
              node {
                id
                author {
                  login
                  avatarUrl
                }
                bodyHTML
                createdAt
              }
            }
            pageInfo {
              endCursor
              hasNextPage
            }
          }
        }
      }
    }
  `;


const flattenIssueComments = (repository) => {
  const {issue} = repository || {};
  const {comments, ...issueData} = issue || {};
  const {pageInfo, edges = []} = comments || {};
  const {endCursor, hasNextPage:hasNext} = pageInfo || {};
  return {
    endCursor,
    hasNext,
    issue: {
      ...issueData,
      comments: map(edges, ({node}) => ({...node}))
    }
  }
};

export default graphql(ISSUECOMMENT_QUERY, {
  options: ({match:{params:{owner, name, number}}}) => {
    return {
      variables:{
        owner, name, number:parseInt(number)
      }
    }
  },
  props({ data, ownProps:{match:{params:{owner, name, number}}}}) {
    const { loading, repository, fetchMore } = data;
    const {endCursor, ...other} = flattenIssueComments(repository);
    return {
      loading,
      onSelect: () => {},
      ...other,
      onLoadMore: () => {
        return fetchMore({
          query: ISSUECOMMENT_QUERY,
          variables: {
            cursor: endCursor,
            name,
            owner,
            number
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            const oldEdges = previousResult.repository.issue.comments.edges;
            const newEdges = fetchMoreResult.repository.issue.comments.edges;
            const {pageInfo} = fetchMoreResult.repository.issue.comments;

            return merge({}, previousResult, {
              repository: {
                issue:{
                  comments: {
                    edges: [...oldEdges, ...newEdges],
                    pageInfo: {...pageInfo}
                  }
                }
              }
            })
          },
        });
      },
    };
  },
})(IssueCommentsView);