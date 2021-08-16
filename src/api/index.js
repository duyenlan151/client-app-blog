import request from 'utils/request'

// const URL = 'http://localhost:5000';

export const fetchPosts = () => request(`/posts`, {
    method: 'get',
})

export const createPost = (payload) => request(`/posts`, {
    method: 'post',
    data: payload
})

export const updatePost = (payload) => request(`/posts/update`, {
    method: 'post',
    data: payload
})

export const deletePost = (postId) => request(`/posts/${postId}`, {
    method: 'delete',
})

export const getPostById = (postId) => request(`/posts/${postId}`)