import React, { Component } from 'react';
import { Route, NavLink, Routes } from 'react-router-dom';
import FullPost from '../../components/fullPost/FullPost';
import NewPost from '../../components/newPost/NewPost';
import Posts from './posts/Posts';
import './Blog.css';

class Blog extends Component {
  render() {
    return (
      <div className='Blog'>
        <header>
          <nav>
            <ul>
              <li>
                <NavLink to='/'>Home</NavLink>
              </li>
              <li><NavLink to={'/new-post'}>New Post</NavLink>
              </li>
            </ul>
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<Posts />} />
          <Route path="/new-post" element={<NewPost />} />
          <Route path='/:id' element={<FullPost />} />
        </Routes>
      </div>
    )
  }
}

export default Blog;