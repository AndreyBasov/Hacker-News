import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchComment } from "../actions";
import jsonPlaceholder from "../apis/jsonPlaceholder";

const Comment = ({ fetchComment, commentId, commentIndex, comments }) => {
  useEffect(() => {
    fetchComment(commentId, commentIndex);
  }, [fetchComment, commentId, commentIndex]);

  // are nested comments open?
  let [nestedCommentsToggle, setNestedCommentsToggle] = useState(false);
  let [nestedComments, setNestedComments] = useState([]);

  const getNestedComments = async () => {
    setNestedComments([]);
    setNestedCommentsToggle(!nestedCommentsToggle);
    // if there are children and we open then load comments
    if (comments[commentIndex].kids && !nestedCommentsToggle) {
      for (let id of comments[commentIndex].kids) {
        const post = await jsonPlaceholder.get(`/item/${id}.json`);
        const comment = post.data.text;
        setNestedComments((prev) => [...prev, comment]);
      }
    }
  };

  return (
    <div onClick={getNestedComments} className="item" key={commentId}>
      {comments[commentIndex]?.text && (
        <p style={{ marginTop: "5px" }}>
          {nestedCommentsToggle ? (
            <i className="angle down icon" />
          ) : (
            <i className="angle up icon" />
          )}
          <b style={{ cursor: "pointer" }}>Comment {commentIndex}: </b>
          <span
            dangerouslySetInnerHTML={{ __html: comments[commentIndex]?.text }}
          ></span>
        </p>
      )}
      <div style={{ marginLeft: "2rem" }}>
        {nestedCommentsToggle &&
          nestedComments.map((text, index) => {
            return (
              text && (
                <span
                  key={index}
                  dangerouslySetInnerHTML={{
                    __html: `${index + 1}) ${text} <br></br>`,
                  }}
                ></span>
              )
            );
          })}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { comments: state.comments };
};

export default connect(mapStateToProps, { fetchComment })(Comment);
