import { INIT_STATE } from "../../constant";
import { getPostById, getPosts, getType, updatePost, deletePost } from "../actions"; 

export default function postsReducers (state = INIT_STATE.posts, action){
    switch (action.type) {
        // case get post
        case getType(getPosts.getPostsRequest): // case 'getPostsRequest'
            return {
                ...state,
                isLoading: true,
            }
        case getType(getPosts.getPostsSuccess): // case 'getPostsSuccess'
            return {
                ...state,
                isLoading: false,
                data: action.payload
            }
        case getType(getPosts.getPostsFailure): // case 'getPostsFailure'
            return {
                ...state,
                isLoading: false,
            }

        // case update post
        case getType(updatePost.updatePostSuccess): // case 'getPostsFailure'
            return {
                ...state,
                data: state.data.map((post) =>
                    post._id === action.payload.data._id ? action.payload.data : post
                ),
                isLoading: false,
            }

        // case get post by id
        case getType(getPostById.getPostByIdSuccess): // case 'getPostByIdSuccess'
            return {
                ...state,
                isLoading: false,
                dataDetail: action.payload.data
            }
        case getType(getPostById.getPostByIdFailure): // case 'getPostByIdSuccess'
            return {
                ...state,
                isLoading: false,
                dataDetail: {}
            }
        case getType(deletePost.deletePostSuccess): // case 'getPostByIdSuccess'
            const deleteId = action.payload 
            const data = state.data.filter(post => post._id !== deleteId); 
            return {
                data,
                isLoading: false,
            }
        default:
            return state;
    }

};