import Header from "components/Header";
import PostPage from "pages/PostPage";
import { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";

function App() {
    return (
        <Suspense fallback={<Spinner />}>
            <Header />
            {/* <Redirect to='/post'/> */}
            <Switch>
                <Route path="/" exact component={PostPage} />
                <Route path="/post" component={PostPage} />
                <Route
                    component={() => {
                        return <>not found</>;
                    }}
                />
            </Switch>
        </Suspense>
    );
}

const Spinner = () => {
    return <>Loading...</>;
};

export default App;
