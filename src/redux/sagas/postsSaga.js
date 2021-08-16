import { all, call, put, takeLatest } from "redux-saga/effects";
import * as actions from '../actions';
import * as api from './../../api';

// Worker Sagas
function* getPostsSaga() {
    try {
        const resPosts = yield call(api.fetchPosts);
        yield put(actions.getPosts.getPostsSuccess(resPosts?.data))
    } catch (err) {
        yield put(actions.getPosts.getPostsFailure(err))
    }
}

function* createPostSaga(action) {
    try {
        yield call(api.createPost, action.payload);
        
        yield put(actions.createPost.createPostSuccess())
    } catch (err) {
        yield put(actions.createPost.createPostFailure(err))
    }
}

function* updatePostSaga(action) {
    try {
        let resPost = yield call(api.updatePost, action.payload);
        
        yield put(actions.updatePost.updatePostSuccess(resPost))
    } catch (err) {
        yield put(actions.updatePost.updatePostFailure(err))
    }
}

function* getPostByIdSaga(action) {
    try {
        const resPosts = yield call(api.getPostById, action.payload);

        yield put(actions.getPostById.getPostByIdSuccess(resPosts));
    } catch (err) {
        console.log(err)
    }
}

function* deletePostSaga(action) {
    try {
        yield call(api.deletePost, action.payload);

        yield put(actions.deletePost.deletePostSuccess(action.payload));
    } catch (err) {
        console.log(err)
    }
}

// Watcher Sagas

// get all posts
function* getPostsRequest() {
    yield takeLatest(actions.getPosts.getPostsRequest, getPostsSaga)
}

// create new post
function* createPostRequest() {
    yield takeLatest(actions.createPost.createPostRequest, createPostSaga)
}

// update post
function* updatePostRequest() {
    yield takeLatest(actions.updatePost.updatePostRequest, updatePostSaga)
}

// update post
function* deletePostRequest() {
    yield takeLatest(actions.deletePost.deletePostRequest, deletePostSaga)
}

// get post by id
function* getPostRequestById() {
    yield takeLatest(actions.getPostById.getPostByIdRequest, getPostByIdSaga)
}

// root saga
export function* postsSaga(){
    yield all([
        getPostsRequest(),
        createPostRequest(),
        updatePostRequest(),
        deletePostRequest(),
        getPostRequestById(),
    ])
}