import React, { Component } from "react";
import axios from "../../../axios";
import Post from "../../../components/Post/Post";
import "./Posts.css";

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
        this.setState({ selectedPostId: id });
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
                    <Post
                        key={post.id}
                        title={post.title}
                        author={post.author}
                        clicked={() => this.postSelectedHandler(post.id)}
                    />
                );
            });
        }
        return <section className="Posts">{posts}</section>;
    }
}
