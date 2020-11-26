import React, { Component } from "react";
import axios from "../../../axios";
import Post from "../../../components/Post/Post";
import "./Posts.css";
// import { Link } from "react-router-dom";
import { Route } from "react-router-dom";
import FullPost from "../FullPost/FullPost";

export default class Posts extends Component {
    state = {
        posts: [],
        selectedPostId: null,
        error: false,
    };

    componentDidMount() {
        axios
            .get("/posts")
            .then((response) => {
                const posts = response.data.slice(0, 8);
                const updatedPosts = posts.map((post) => {
                    return {
                        ...post,
                        author: "Shishir Sarder",
                    };
                });
                this.setState({ posts: updatedPosts });
                // console.log(response);
            })
            .catch((error) => {
                this.setState({ error: true });
                // console.log(error);
            });
    }

    postSelectedHandler = (id) => {
        // this.setState({ selectedPostId: id });
        // this.props.history.push({ pathname: "/posts/" + id }); // same as after
        this.props.history.push("/posts/" + id); // same as before
    };

    render() {
        let posts = (
            <h2 style={{ textAlign: "center", color: "red" }}>
                Something went wrong!!
            </h2>
        );

        if (!this.state.error) {
            posts = this.state.posts.map((post) => {
                return (
                    // <Link to={"/posts/" + post.id} key={post.id}>
                    <Post
                        key={post.id}
                        title={post.title}
                        author={post.author}
                        clicked={() => this.postSelectedHandler(post.id)}
                    />
                    // </Link>
                );
            });
        }
        return (
            <div>
                <section className="Posts">{posts}</section>
                <Route
                    path={this.props.match.url + "/:id"}
                    exact
                    component={FullPost}
                />
            </div>
        );
    }
}
