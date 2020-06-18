import React, { Component } from 'react';

class LikeButton extends Component {
    constructor(props) {
        super(props);
        this.state ={
            likes:0
        }
    }

    addLike = () => {
        let count = this.state.likes + 1;
        this.setState({
            likes: count
        });
    };

    render() {
        return (
            <button onClick={this.addLike}>Likes: {this.state.likes}</button>
        )
    }
}

export default LikeButton;