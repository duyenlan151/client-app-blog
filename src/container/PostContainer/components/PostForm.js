import { yupResolver } from "@hookform/resolvers/yup";
import { Button, CircularProgress, TextareaAutosize, Typography } from "@material-ui/core";
import InputField from "components/InputField";
import RadioGroup from "components/Radio";
import { isEmpty } from "lodash";
import React, { useEffect, useMemo, useState } from "react";
import FileBase64 from "react-file-base64";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { createPost, updatePost } from "redux/actions";
import * as yup from "yup";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        "& > *": {
            margin: theme.spacing(1),
        },
    },
    wrapperImg: {
        width: 250,
        height: 250,
        marginBottom: theme.spacing(1),
        marginTop: theme.spacing(1),
        padding: theme.spacing(1),
        border: '1px solid #ddd'
    },
    img: {
        height: '100%',
        width: '100%',
        objectFit: 'cover',
        objectPosition: 'center'
    },
    btnPrimary: {
        backgroundColor: '#001529',
        color: '#ffffff'
    }
}));

const schema = yup.object().shape({
    title: yup.string().required("Please enter title"),
    content: yup.string().required("Please enter title"),
    author: yup.string().required("Please enter title"),
    type: yup.string().required("Please select type post"),
    attachment: yup.string().required("Please select image"),
});

export default function PostForm(props) {
    const { post } = props;
    const params = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();
    const [isFormSubmitting, setIsFormSubmitting] = useState(false);
    const [file, setFile] = useState({});
    let fileType = ["image/jpeg", "image/png"];
    const [isErrFile, setIsErrFile] =  useState(false);

    const {
        handleSubmit,
        control,
        reset,
        setValue,
        getValues,
        setError,
        formState: { errors, isSubmitting, isDirty }
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: useMemo(() => post, [post])
    });

    useEffect(() => {
        if (!isEmpty(post)) {
            dispatch(
                updatePost.updatePostRequest({
                    ...post,
                    likeCount: post?.likeCount + 1,
                })
            );
        }
    }, []);

    const onSubmit = (data) => {
        // console.log("🚀 ~ file: PostForm.js ~ line 87 ~ onSubmit ~ data", data)
        if(!isEmpty(file)){
            let check = handleImage(file.type, file.size, file.base64);
            if(!check) return;
        }

        setIsFormSubmitting(true);

        setTimeout(() => {
            setIsFormSubmitting(false);
            handleSubmitForm(data);
        }, 1000);
    };

    const handleSubmitForm = async (data) => {
        if (post?._id) {
            // update
            dispatch(updatePost.updatePostRequest(data));
            notify("Update successfully!", "success");
        } else {
            // create
            dispatch(createPost.createPostRequest(data));
            notify("Create successfully!", "info");
        }

        setTimeout(() => {
            history.push("/post");
        }, 2000);
    };

    const notify = (msg, type) => {
        toast[type](msg, {
            position: toast.POSITION.TOP_RIGHT,
            className: "foo-bar",
            autoClose: 2000,
        });
    };

    const getFiles = ({type, size, base64}) => {
        setFile({type, size, base64})
        handleImage(type, size, base64);
    }

    const handleImage = (type, size, base64) => {
            if( size && Number(size.split(" ")[0]) > 80){
                setError("attachment", { type: "required", message: "Size image too large! (< 80KB)" }, { shouldValidate: true });
                if(fileType.includes(type)) setValue("attachment", base64);
    
                return 0;
            }else if(!fileType.includes(type)){
                setValue('attachment', '')
                setError("attachment", { type: "required", message: "Type image not support!" }, { shouldValidate: true });
                return 0;
            }
            setValue("attachment", base64, {
                shouldValidate: true,
            })
            return 1;
        return 1;
    }


    return (
        <>
            {isFormSubmitting && (
                <div className="loading">
                    <CircularProgress color="secondary" />
                </div>
            )}
            <form
                onSubmit={handleSubmit(onSubmit)}
                method="post"
                encType="multipart/form-data"
            >
                <Typography
                    variant="h4"
                    style={{ marginTop: "1rem", textAlign: "center" }}
                >
                    {params?.postId ? "Edit" : "Create"}
                </Typography>

                {/* title */}
                <InputField
                    isRequired={true}
                    control={control}
                    name="title"
                    label="Tilte"
                    errorMsg={
                        errors.title?.message ? errors.title?.message : null
                    }
                />
                {/* content */}
                <InputField
                    isRequired={true}
                    control={control}
                    name="content"
                    label="Content"
                    rows={6}
                    errorMsg={
                        errors.content?.message ? errors.content?.message : null
                    }
                />
                {/* author */}
                <InputField
                    isRequired={true}
                    control={control}
                    name="author"
                    label="Author"
                    errorMsg={
                        errors.author?.message ? errors.author?.message : null
                    }
                />

                <RadioGroup
                    name="type"
                    control={control}
                    errorMsg={errors.type?.message}
                />
                <div>
                    <Typography variant="body2" gutterBottom>
                        Image
                    </Typography>
                    <FileBase64
                        accept="image/*"
                        multiple={false}
                        type="file"
                        control
                        name="attachment"
                        onDone={ (files) => getFiles(files) }
                    />
                    <div className={classes.wrapperImg}>
                        <img className={classes.img} src={getValues('attachment') ? getValues('attachment') : 'https://via.placeholder.com/250'} />
                    </div>
                    <p style={{ fontSize: 12, color: "red" }}>
                        {errors.attachment?.message}
                    </p>
                </div>
                <div className="mt-2" className={classes.root}>
                    <Button
                        variant="contained"
                        className={classes.btnPrimary}
                        type="submit"
                        disabled={isFormSubmitting}
                    >
                        {isFormSubmitting && (
                            <CircularProgress size={16} color="secondary" />
                        )}{" "}
                        {params?.postId ? "Update" : "Create"}
                    </Button>
                    <Button
                        variant="contained"
                        color="info"
                        type="button"
                        onClick={() => history.goBack()}
                    >
                        Back
                    </Button>
                </div>
            </form>
        </>
    );
}
