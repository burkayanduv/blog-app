import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Context } from '../context/Context';
import '../styles/pageStyles/write.scss';

interface PostInterface {
  username: string | undefined;
  title: string;
  desc: string;
  photo?: string;
  categories: string[];
}

interface CheckedCatsInterface {
  [key: string]: boolean;
}

function Write() {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const { user } = useContext(Context);
  const [categories, setCategories] = useState([]);
  const [checkedCats, setCheckedCats] = useState<CheckedCatsInterface>({});

  useEffect(() => {
    const getCategories = async () => {
      try {
        const apiURL = process.env.REACT_APP_API_URL;
        const res = await axios.get(`${apiURL}/categories`);
        setCategories(res.data);
        res.data.forEach((item: { name: string }) => {
          setCheckedCats((s) => ({ ...s, [item.name]: false }));
        });
      } catch (err) {
        console.error(err);
      }
    };
    getCategories();
  }, []);

  const handleToggle = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedCats({
      ...checkedCats,
      [target.value]: !checkedCats[target.value]
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const selectedCats = Object.keys(checkedCats).filter(
      (key) => checkedCats[key]
    );
    e.preventDefault();
    const apiURL = process.env.REACT_APP_API_URL;
    const newPost: PostInterface = {
      username: user?.username,
      title,
      desc,
      categories: selectedCats
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append('name', filename);
      data.append('file', file);
      newPost.photo = filename;
      try {
        await axios.post(`${apiURL}/upload`, data);
      } catch (err) {
        console.error(err);
      }
    }
    try {
      const res = await axios.post(`${apiURL}/posts`, newPost);
      window.location.replace(`/post/${res.data._id}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="write">
      {file && (
        <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
      )}
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus" />
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: 'none' }}
            onChange={(e) => setFile(e.target.files && e.target.files[0])}
          />
          <div className="dropdown">
            <button
              className="dropdown-toggle writeCategory"
              type="button"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Category
            </button>

            <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
              {categories.map((item: { _id: string; name: string }) => (
                <li key={item._id}>
                  <input
                    className="writeCheckbox form-check-input"
                    type="checkbox"
                    value={item.name}
                    id={item._id}
                    onChange={handleToggle}
                  />
                  <label className="form-check-label" htmlFor={item._id}>
                    {item.name}
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <input
            type="text"
            placeholder="Title"
            className="writeInput"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            placeholder="Tell your story..."
            className="writeInput writeText"
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
}

export default Write;
