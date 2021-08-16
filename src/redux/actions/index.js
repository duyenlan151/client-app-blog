import { createActions } from 'redux-actions';

/**
 * 
 * @param {getType(getPosts.getPostsSuccess)} reduxAction 
 * @returns {
 *     type: getPostsSuccess,
*      payload: { name: 'test'}
 * }
 */
export const getType = (reduxAction) => {
    return reduxAction().type;
}

export const getPosts = createActions({
    getPostsRequest: undefined,
    getPostsSuccess: (payload) => payload,
    getPostsFailure: (err) => err
})

/**
 * @param {getPostsRequest} funtion
 * 
 * @return {
 *    type: getPostsRequest,
 *    payload: undefined
 * }
 * 
 * --------------------------------
 * @param {getPostsRequest} funtion
 * 
 * @return {
 *    type: getPostsRequest,
 *    payload: payload
 * }
 * * --------------------------------
 * @param {getPostsFailure} funtion
 * 
 * @return {
 *    type: getPostsFailure,
 *    payload: err
 * }
 */


// action create post
 export const createPost = createActions({
    createPostRequest: (payload) => payload,
    createPostSuccess: (payload) => payload,
    createPostFailure: (err) => err
})

// action update post
export const updatePost = createActions({
    updatePostRequest: (payload) => payload,
    updatePostSuccess: (payload) => payload,
    updatePostFailure: (err) => err
})

// action delete post
export const deletePost = createActions({
    deletePostRequest: (payload) => payload,
    deletePostSuccess: (payload) => payload,
    deletePostFailure: (err) => err
})

// action update post
export const getPostById = createActions({
    getPostByIdRequest: (payload) => payload,
    getPostByIdSuccess: (payload) => payload,
    getPostByIdFailure: (err) => err
})