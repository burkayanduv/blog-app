import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { Context } from '../context/Context';
import '../styles/componentStyles/singlePost.scss';

interface PostInterface {
  _id: string;
  title: string;
  desc: string;
  photo: string;
  username: string;
  categories: string[];
  createdAt: Date;
}

function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split('/')[2];
  const { user } = useContext(Context);
  const [post, setPost] = useState<PostInterface>();
  const PF = process.env.REACT_APP_PF_URL;

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [updateMode, setUpdateMode] = useState(false);

  const handleDelete = async () => {
    try {
      const apiURL = process.env.REACT_APP_API_URL;
      await axios.delete(`${apiURL}/posts/${path}`, {
        data: { username: user?.username }
      });
      window.location.replace('/');
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async () => {
    try {
      const apiURL = process.env.REACT_APP_API_URL;
      await axios.put(`${apiURL}/posts/${path}`, {
        username: user?.username,
        title,
        desc
      });
      setUpdateMode(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const getPost = async () => {
      const apiURL = process.env.REACT_APP_API_URL;
      const res = await axios.get(`${apiURL}/posts/${path}`);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    };
    getPost();
  }, [path]);
  return (
    <div className="singlePostWrapper">
      {post?.photo && (
        <img
          className="singlePostImg"
          src={post.photo ? `${PF}/${post.photo}` : `${PF}/blank-profile.png`}
          alt=""
        />
      )}
      {updateMode ? (
        <input
          className="singlePostTitleInput"
          type="text"
          value={title}
          autoFocus
          onChange={(e) => setTitle(e.target.value)}
        />
      ) : (
        <h1 className="singlePostTitle">
          {title}
          {post?.username === user?.username && (
            <div className="singlePostEdit">
              <i
                className="singlePostIcon far fa-edit"
                onClick={() => setUpdateMode(true)}
              />
              <i
                className="singlePostIcon far fa-trash-alt"
                onClick={handleDelete}
              />
            </div>
          )}
        </h1>
      )}
      <div className="singlePostInfo">
        <span className="singlePostAuthor">
          Author:&nbsp;
          <Link to={`/?user=${post?.username}`} className="link">
            <b>{post?.username}</b>
          </Link>
        </span>
        <span className="singlePostDate">
          {new Date(post ? post?.createdAt : '').toDateString()}
        </span>
      </div>
      {updateMode ? (
        <>
          <textarea
            className="singlePostDescInput"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          <button
            className="singlePostButton"
            type="submit"
            onClick={handleUpdate}
          >
            Update
          </button>
        </>
      ) : (
        <p className="singlePostDesc">{desc}</p>
      )}
    </div>
  );
}

export default SinglePost;
