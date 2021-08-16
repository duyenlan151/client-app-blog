import { Container } from "@material-ui/core";
import React from "react";
import {
    Route,
    Switch,
    useRouteMatch
} from "react-router-dom";
import PostForm from "./components/PostForm";
import AddEditPage from "./pages/AddEditPage";
import PostList from "./pages/PostList";

export default function PostContainer({ children }) {
    const match = useRouteMatch();

    return (
        <Container>
            <Switch>
                <Route path={match.path} exact component={PostList} />
                {/* <Redirect exact from="/" to="/post" /> */}
                <Route
                    path={`${match.path}/create`}
                    exact
                    component={AddEditPage}
                />
                <Route
                    path={`${match.path}/:postId`}
                    exact
                    component={AddEditPage}
                />
            </Switch>
        </Container>
    );
}
