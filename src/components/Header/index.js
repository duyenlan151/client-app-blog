import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import HomeIcon from "@material-ui/icons/Home";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        color: "#fff",
    },
    colorWhite: {
        color: "#fff",
    },
    bgDark: {
        backgroundColor: "#001529",
    },
    center: {
        textAlign: "center",
    },
    dFlex: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    header: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#001529",
    }
}));

export default function Header() {
    const classes = useStyles();

    return (
        <AppBar position="static" className={classes.header}>
            <Toolbar>
                <NavLink to="/post" className={classes.dFlex}>
                    <Typography variant="p" className={classes.title}>
                        CRUD POSTS
                    </Typography>
                </NavLink>
            </Toolbar>
        </AppBar>
    );
}
