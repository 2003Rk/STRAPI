import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';
import axios from 'axios';
import './Posts.css';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newPost, setNewPost] = useState({ title: '', content: '' });
  const [creating, setCreating] = useState(false);

  // Strapi API base URL
  const STRAPI_URL = 'http://localhost:1337/api';

  // Helper function to extract text from Strapi rich content
  const extractTextFromContent = (content) => {
    if (!content) return '';
    
    // If it's already a string, return it
    if (typeof content === 'string') return content;
    
    // If it's an array (rich text format), extract text
    if (Array.isArray(content)) {
      return content.map(block => {
        if (block.children) {
          return block.children.map(child => child.text || '').join('');
        }
        return '';
      }).join('\n');
    }
    
    // If it's an object, try to stringify it safely
    return JSON.stringify(content);
  };

  // Listen for real-time updates from Firebase
  useEffect(() => {
    const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const postsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPosts(postsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Create new post via Strapi API
  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!newPost.title || !newPost.content) return;

    setCreating(true);
    try {
      await axios.post(`${STRAPI_URL}/posts`, {
        data: {
          title: newPost.title,
          content: newPost.content
        }
      });
      
      setNewPost({ title: '', content: '' });
      alert('Post created successfully! It will appear in real-time.');
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Error creating post. Make sure Strapi is running on port 1337.');
    }
    setCreating(false);
  };

  // Delete post via Strapi API
  const handleDeletePost = async (post) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;

    try {
      // Use documentId if available, fallback to Firebase document ID, then to id
      const strapiId = post.documentId || post.firebaseId || post.id;
      await axios.delete(`${STRAPI_URL}/posts/${strapiId}`);
      alert('Post deleted successfully!');
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Error deleting post.');
    }
  };

  if (loading) {
    return <div className="loading">Loading posts...</div>;
  }

  return (
    <div className="posts-container">
      <h1>Posts with Real-time Updates</h1>
      
      {/* Create new post form */}
      <div className="create-post">
        <h2>Create New Post</h2>
        <form onSubmit={handleCreatePost}>
          <input
            type="text"
            placeholder="Post title"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            required
          />
          <textarea
            placeholder="Post content"
            value={newPost.content}
            onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
            required
          />
          <button type="submit" disabled={creating}>
            {creating ? 'Creating...' : 'Create Post'}
          </button>
        </form>
      </div>

      {/* Display posts */}
      <div className="posts-list">
        <h2>All Posts ({posts.length})</h2>
        {posts.length === 0 ? (
          <p>No posts yet. Create one above!</p>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="post-card">
              <h3>{post.title}</h3>
              <div className="post-content">
                {extractTextFromContent(post.content)}
              </div>
              <div className="post-meta">
                <small>
                  Created: {post.createdAt?.toDate?.()?.toLocaleString() || 'Unknown'}
                </small>
                {post.published && <span className="published-badge">Published</span>}
                <button 
                  onClick={() => handleDeletePost(post)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Posts;
