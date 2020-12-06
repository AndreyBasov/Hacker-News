import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Route, Link } from "react-router-dom";
import Comment from "./Comment";

const CommentPage = ({
  match: {
    params: { pageNum },
  },
  post,
}) => {
  let [commentsToggle, setCommentsToggle] = useState(true);
  useEffect(() => {
    let intervalId = setInterval(() => {
      setCommentsToggle(!commentsToggle);
    }, 60000);
    return () => {
      clearInterval(intervalId);
    };
  }, [commentsToggle]);

  const CommentPage = () => {
    return (
      <div style={{ paddingBottom: "2rem" }}>
        <Link
          to={"/"}
          onClick={() => {
            window.scrollTo(0, 0);
          }}
        >
          <button className="ui red button" style={{}}>
            Go back
          </button>
        </Link>
        <button
          onClick={() => {
            setCommentsToggle(!commentsToggle);
          }}
          className="ui primary button"
          style={{}}
        >
          Reload
        </button>
        <div className="ui relaxed divided list">
          <div className="item">
            <div className="content">
              <h2 style={{ marginBottom: "10px" }}>{post?.title}</h2>
              <div className="description">
                <p>
                  {/* an additional space to remove a warning */}
                  <b>URL: </b> <a href={`${post?.url} `}>{post?.url}</a>
                </p>
                <p>
                  <b>Number of comments: </b> {post?.descendants}
                </p>
                <p>
                  <b>Author: </b> {post?.by}
                </p>
                <p>
                  <b>Date and time: </b>
                  {new Date(1000 * post?.time).toLocaleString()}
                </p>
              </div>
              <h1>Comment Section</h1>
              {post?.kids?.map((id, index) => {
                return <Comment key={id} commentId={id} commentIndex={index} />;
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return <Route path={"/" + pageNum} exact component={CommentPage} />;
};

const mapStateToProps = (state, ownProps) => {
  return { post: state.posts[ownProps.match.params.pageNum] };
};

export default connect(mapStateToProps, {})(CommentPage);
