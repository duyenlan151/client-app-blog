import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import { red } from "@material-ui/core/colors";
import IconButton from "@material-ui/core/IconButton";
import Popover from "@material-ui/core/Popover";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import VisibilityIcon from "@material-ui/icons/Visibility";
import moment from "moment";
import React, { useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import * as actions from "redux/actions";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
    root: {
        // maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: "56.25%", // 16:9
    },
    expand: {
        transform: "rotate(0deg)",
        marginLeft: "auto",
        transition: theme.transitions.create("transform", {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: "rotate(180deg)",
    },
    avatar: {
        backgroundColor: red[500],
    },
    typography: {
        padding: theme.spacing(2),
    },
    content: {
        display: "-webkit-box",
        boxOrient: "vertical",
        lineClamp: 2,
        wordBreak: "break-all",
        overflow: "hidden"
    }
}));

export default function Post({ post }) {
    const match = useRouteMatch();
    const classes = useStyles();
    const dispatch = useDispatch();

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDelete = () => {
        dispatch(actions.deletePost.deletePostRequest(post?._id));
    };

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        R
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon
                            aria-describedby={id}
                            variant="contained"
                            color="primary"
                            onClick={(e) => handleClick(e)}
                        />
                        <Popover
                            id={id}
                            open={open}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "center",
                            }}
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "center",
                            }}
                        >
                            <Typography className={classes.typography}>
                                {/* Delete */}
                                <Button
                                     onClick={handleDelete}
                                >
                                    <DeleteOutlineIcon />
                                </Button>
                            </Typography>
                        </Popover>
                    </IconButton>
                }
                title={
                    <Link to={`${match.path}/${post._id}`}>{post?.author}</Link>
                }
                subheader={moment(post?.createdAt).format("LL")}
            />
            <Link to={`${match.path}/${post._id}`}>
                <CardMedia
                    className={classes.media}
                    image={post?.attachment ? post.attachment : ""}
                    title="Paella dish"
                />
            </Link>
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p" className={classes.content}>
                    {post?.content}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <VisibilityIcon />
                </IconButton>
                <Typography color="textSecondary" component="span">
                    {post?.likeCount}
                </Typography>
            </CardActions>
        </Card>
    );
}
