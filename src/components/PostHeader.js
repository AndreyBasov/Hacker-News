import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchPost } from "../actions";
import { Link } from "react-router-dom";

const PostHeader = ({ fetchPost, userId, userIndex, posts }) => {
  useEffect(() => {
    fetchPost(userId, userIndex);
  }, [fetchPost, userId, userIndex]);

  return (
    <div className="item" key={userId}>
      {/* to not show a post if a json is null  */}
      {posts[userIndex] && (
        <div className="content">
          <div className="description">
            <Link
              to={`/${userIndex}`}
              onClick={() => {
                window.scrollTo(0, 0);
              }}
            >
              <h2 style={{ marginBottom: "10px" }}>
                {posts[userIndex]?.title}
              </h2>
            </Link>
            <p>
              <b>Score: </b> {posts[userIndex]?.score}
            </p>
            <p>
              <b>Author: </b> {posts[userIndex]?.by}
            </p>
            <p>
              <b>Date and time: </b>
              {new Date(1000 * posts[userIndex]?.time).toLocaleString()}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { posts: state.posts };
};

export default connect(mapStateToProps, { fetchPost })(PostHeader);
