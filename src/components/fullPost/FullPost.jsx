import React, { Component } from 'react';
import axios from 'axios';
import './FullPost.css';

class FullPost extends Component {

  state = {
    loadedPost: []
  }

  componentDidUpdate = () => {
    if (this.props.id)
      if (this.state.loadedPost.id !== this.props.id)
        axios.get('posts/' + this.props.id).then(Response => {
          this.setState({ loadedPost: Response.data })
        })
  }

  deletePostHandler = () => {
    axios.delete('posts/' + this.props.id).then(Response => {
      console.log(this.state.loadedPost)
    })
  }
  render() {
    let post = <p>Please select a Post!</p>;
    if (this.state.loadedPost)
      post = (
        <div className="FullPost">
          <h1>{this.state.loadedPost.title}</h1>
          <p>{this.state.loadedPost.body}</p>
          <div className="Edit">
            <button className="Delete"
              onClick={this.deletePostHandler}>Delete</button>
          </div>
        </div>

      )
    return post
  }
}

export default FullPost;