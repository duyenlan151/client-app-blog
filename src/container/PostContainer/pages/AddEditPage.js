import { CircularProgress } from "@material-ui/core";
import Spinner from "components/Spinner";
import { isEmpty } from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPostById, updatePost } from "redux/actions";
import { postDetailState$ } from "redux/selectors/selectorPost";
import PostForm from "../components/PostForm";

function AddEditPage(props) {
    const params = useParams();
    const dispatch = useDispatch();
    const postDetailState = useSelector(postDetailState$);
    const [postDetail, setPostDetail] = useState(postDetailState);

    useEffect(() => {
        if (params?.postId) {
            dispatch(getPostById.getPostByIdRequest(params?.postId));
        }
        return () => {
            dispatch(getPostById.getPostByIdFailure());
        };
    }, []);

    useEffect(() => {
        if (postDetailState){
            setPostDetail(postDetailState);
        }
    }, [postDetailState]);


    return (
        <div>
            {isEmpty(postDetail) && params?.postId && (
                <Spinner isLoading={true} color="sd" />
            )}
            {!isEmpty(postDetail) && params?.postId && (
                <PostForm post={postDetail} />
            )}
            {!params?.postId && <PostForm post={postDetail} />}
        </div>
    );
}

AddEditPage.propTypes = {};

export default AddEditPage;
