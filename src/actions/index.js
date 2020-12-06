import jsonPlaceholder from "../apis/jsonPlaceholder";

const numOfPosts = 100;

export const fetchPostIds = () => async (dispatch) => {
  //P.S. to see top stories input "topstories" where there are more comments
  const response = await jsonPlaceholder.get("/newstories.json");
  const postIds = response.data.sort((a, b) => b > a).splice(0, numOfPosts);
  dispatch({
    type: "FETCH_IDS",
    payload: postIds,
  });
};

export const fetchComment = (id, index) => async (dispatch) => {
  const post = await jsonPlaceholder.get(`/item/${id}.json`);
  dispatch({
    type: "FETCH_COMMENT",
    payload: post.data,
    index,
  });
};

export const fetchPost = (id, index) => async (dispatch) => {
  const post = await jsonPlaceholder.get(`/item/${id}.json`);
  dispatch({
    type: "FETCH_POST",
    payload: post.data,
    index,
  });
};
