import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Post from '../../posts/containers/Post.jsx';

import api from '../../api.js';

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {},
            posts: [],
            loading: true,
        }
    }

    async componentDidMount() {
        const [
            user,
            posts,
        ] = await Promise.all([
            api.users.getSingle(this.props.match.params.id),
            api.users.getPosts(this.props.match.params.id),
        ]);

        this.setState({
            user, posts, loading: false,
        })
    }

    render() {
        const { name, email, address } = this.state.user;
        return (
            <section name="Profile">
                <h2>Profile of { name }</h2>

                <fieldset>
                    <legend>Basic info</legend>
                    <input type="email" value={ email } disabled/>
                </fieldset>

                {address && (
                    <fieldset>
                        <legend>Address</legend>
                        <address>
                            { address.street } <br/>
                            { address.suite } <br/>
                            { address.city } <br/>
                            { address.zipcode } <br/>
                        </address>
                    </fieldset>
                )}

                <section>
                    { this.state.posts
                        .map(post => (
                            <Post 
                                key={ post.id } 
                                user={ this.state.user }
                                { ...post } 
                            />
                        ))
                    }
                </section>
            </section>
        );
    }
}

export default Profile;