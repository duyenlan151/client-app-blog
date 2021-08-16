import { Fab, TablePagination } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Spinner from "components/Spinner";
import { isEmpty } from "lodash";
import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useRouteMatch } from "react-router-dom";
import * as actions from "redux/actions";
import { isLoading$, postsState$ } from "redux/selectors/selectorPost";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: theme.spacing(5),
        minHeight: "35vh",
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: "center",
        color: theme.palette.text.secondary,
    },
    table: {
        minWidth: 650,
    },
    tableTd: {
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
    },
    btnPrimary: {
        backgroundColor: "#001529",
        color: "#ffffff",
    },
    danger: {
        color: "#d50000",
    },
    primary: {
        color: "#2196f3",
    },
}));

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: "#001529",
        color: theme.palette.common.white,
        padding: theme.spacing(2),
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        "&:nth-of-type(odd)": {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

export default function PostList() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const posts = useSelector(postsState$);

    const isLoading = useSelector(isLoading$);
    const history = useHistory();
    const match = useRouteMatch();

    useEffect(() => {
        dispatch(actions.getPosts.getPostsRequest());
        return () => {};
    }, []);

    const openCreatePostModal = React.useCallback(() => {
        history.push(`/post/create`);
    }, [dispatch]);

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);

        if (newPage)
            history.push({
                pathname: `${match.url}`,
                search: `?page=${newPage}`,
            });
        else
            history.push({
                pathname: `${match.url}`,
                search: null,
            });
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <>
            <Spinner isLoading={isLoading} />

            <div className={classes.root}>
                <Paper>
                    <TableContainer className={classes.container}>
                        <Table
                            size="small"
                            stickyHeader
                            aria-label="sticky table"
                        >
                             <TableHead>
                                <TableRow>
                                    <StyledTableCell>Title</StyledTableCell>
                                    <StyledTableCell align="center">
                                        Type
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        Create Date
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        View
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        Action
                                    </StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {!isEmpty(posts) &&
                                    posts
                                        .slice(
                                            page * rowsPerPage,
                                            page * rowsPerPage + rowsPerPage
                                        )
                                        .map((post, index) => (
                                            <StyledTableRow
                                                key={index}
                                                className={classes.tableTd}
                                            >
                                                <TableCell
                                                    component="th"
                                                    scope="row"
                                                >
                                                    {post.title}
                                                </TableCell>
                                                <TableCell align="center">
                                                    {post.type}
                                                </TableCell>
                                                <TableCell align="center">
                                                    {moment(
                                                        post?.createdAt
                                                    ).format("L")}
                                                </TableCell>
                                                <TableCell align="center">
                                                    {post.likeCount}
                                                </TableCell>
                                                <TableCell align="center">
                                                    <IconButton
                                                        className={
                                                            classes.primary
                                                        }
                                                        onClick={() =>
                                                            history.push(
                                                                `/post/${post._id}`
                                                            )
                                                        }
                                                        aria-label="delete"
                                                    >
                                                        <EditIcon />
                                                    </IconButton>
                                                    <IconButton
                                                        className={
                                                            classes.danger
                                                        }
                                                        onClick={() =>
                                                            dispatch(
                                                                actions.deletePost.deletePostRequest(
                                                                    post?._id
                                                                )
                                                            )
                                                        }
                                                        aria-label="delete"
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </TableCell>
                                            </StyledTableRow>
                                        ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25, 100]}
                        component="div"
                        count={posts.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </div>
            <div className="mt-2">
                <Fab
                    className={classes.btnPrimary}
                    onClick={openCreatePostModal}
                >
                    <AddIcon />
                </Fab>
            </div>
        </>
    );
}
