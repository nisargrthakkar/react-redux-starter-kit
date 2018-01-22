import PostPageView from './PostPageView';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getPostbyID, emptyPost } from '../../services/getPost';

const mapStateToProps = state => ({
  post: state.post.post
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getPostbyID,
  emptyPost
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostPageView);

