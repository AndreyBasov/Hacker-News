import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchPostIds } from "../actions";
import PostHeader from "./PostHeader";
import CommentPage from "./CommentPage";
import { HashRouter, Route } from "react-router-dom";

const PostList = ({ fetchPostIds, ids }) => {
  let [newsToggle, setNewsToggle] = useState(true);

  useEffect(() => {
    fetchPostIds();
    //refetch posts every minute
    let intId = setInterval(() => {
      fetchPostIds();
    }, 60000);
    return () => {
      clearInterval(intId);
    };
  }, [fetchPostIds]);

  const MainPage = () => {
    return (
      <div>
        <button
          onClick={() => setNewsToggle(!newsToggle)}
          className="ui primary button"
          style={{}}
        >
          Reload
        </button>
        <div className="ui relaxed divided list">
          {ids.map((id, index) => {
            return <PostHeader key={id} userId={id} userIndex={index} />;
          })}
        </div>
      </div>
    );
  };

  return (
    // Hash router to work on github pages
    <HashRouter>
      <h1 style={{ backgroundColor: "#98acf8" }}>
        <i className="hacker news icon" />
        Hacker News
      </h1>
      <Route path="/" exact component={MainPage} />
      <Route path="/:pageNum" component={CommentPage} />
    </HashRouter>
  );
};

const mapStateToProps = (state) => {
  return { ids: state.ids };
};

export default connect(mapStateToProps, { fetchPostIds })(PostList);
