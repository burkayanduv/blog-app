import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/componentStyles/sidebar.scss';

interface CategoryInterface {
  name: string;
}

function Sidebar() {
  const [cats, setCats] = useState<CategoryInterface[]>([]);

  useEffect(() => {
    const getCats = async () => {
      const apiURL = process.env.REACT_APP_API_URL;
      const res = await axios.get(`${apiURL}/categories/`);
      setCats(res.data);
    };
    getCats();
  }, []);
  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <img
          src="https://images.pexels.com/photos/4065877/pexels-photo-4065877.jpeg?cs=srgb&dl=pexels-cottonbro-4065877.jpg&fm=jpg"
          alt=""
        />
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam
          libero recusandae ipsa esse rem.
        </p>

        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
          {cats.map((c) => (
            <li key={c.name} className="sidebarListItem">
              <Link to={`/?cat=${c.name}`} className="link">
                {c.name}
              </Link>
            </li>
          ))}
        </ul>

        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          <i className="sidebarIcon fab fa-facebook-square" />
          <i className="sidebarIcon fab fa-twitter-square" />
          <i className="sidebarIcon fab fa-pinterest-square" />
          <i className="sidebarIcon fab fa-instagram-square" />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
