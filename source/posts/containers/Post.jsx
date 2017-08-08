import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import api from '../../api.js';


class Post extends Component {
    constructor(props){
        super(props);
        this.state = { 
            loading: true,
            user: props.user || null,
            comments: [],
        }
    } 

    async componentDidMount() {
        const { userId, id } = this.props;
        const [
            user,
            comments,
        ] = await Promise.all([
            !this.state.user ? api.users.getSingle(userId) : Promise.resolve(null),
            api.posts.getComments(id)
        ]);

        this.setState({
            loading: false,
            user: user || this.state.user,
            comments
        });
    }

    render() {
        const { id, title, body } = this.props;
        const { loading, comments  } = this.state;
        return (
            <article id={`post-${id}`}>
                <h2>{ title }</h2>

                <p>{ body }</p>

                {!loading && (
                    <div>
                        <Link to={`/user/${this.state.user.id}`}>
                            { this.state.user.name }
                        </Link>

                        
                        <span>
                            Hay { comments.length } comentarios.
                        </span>
                    </div>
                )}
            </article>
        );
    }
}

Post.propTypes = {
    id: PropTypes.number,
    userId: PropTypes.number,
    title: PropTypes.string,
    body: PropTypes.string
}

export default Post;