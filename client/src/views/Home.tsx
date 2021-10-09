import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import axios from 'axios';
import Header from '../components/Header';
import Posts from '../components/Posts';
import Sidebar from '../components/Sidebar';
import '../styles/pageStyles/home.scss';

function Home() {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      const apiURL = process.env.REACT_APP_API_URL;
      const res = await axios.get(`${apiURL}/posts/${search}`);
      setPosts(res.data);
    };
    fetchPosts();
  }, [search]);
  return (
    <div className="container-fluid p-0 m-0">
      <div className="row no-gutters mx-0">
        <div className="col-12 px-0">
          <Header />
        </div>
      </div>
      <div className="row no-gutters mx-0">
        <div className="col-lg-9 px-0">
          <div className="home">
            <Posts posts={posts} />
          </div>
        </div>
        <div className="col-lg-3 px-0">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}

export default Home;
