import React, {Component} from 'react'
import PropTypes from 'prop-types';
import BaseItemsList from '../BaseItemsList';
import BaseItemsView from '../BaseItemsView';
import IssueCommentItem, {IssueCommentHeader} from './IssueCommentItem';


const IssueComments = BaseItemsList(IssueCommentItem, 'comments');
const CommentsView = BaseItemsView(IssueComments, 'comments', 'No Comment Found');

export default class IssueCommentsView extends Component {
  static propTypes = {
    issue: PropTypes.object,
    onSubmit: PropTypes.func
  } ;

  render() {
    const {loading, issue: {comments, ...issue}, onSubmit, ...props} = this.props;
    console.log(this.props)
    if(loading) {
      return <p>Loading...</p>
    }
    return (
      <div>
        <IssueCommentHeader item={issue} />
        <CommentsView comments={comments} {...props} />
      </div>
    );
  }
}