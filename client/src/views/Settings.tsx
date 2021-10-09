import axios from 'axios';
import { useContext, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { Context } from '../context/Context';
import '../styles/pageStyles/settings.scss';

interface UserInterface {
  userId: string | undefined;
  username?: string | undefined;
  email?: string | undefined;
  password?: string;
  profilePic?: string;
}

function Settings() {
  const { user, dispatch } = useContext(Context);
  const [file, setFile] = useState<File | null>(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const PF = process.env.REACT_APP_PF_URL;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccess(false);
    dispatch({ type: 'UPDATE_START' });
    const apiURL = process.env.REACT_APP_API_URL;
    const updatedUser: UserInterface = {
      userId: user?._id,
      ...(username !== '' && { username }),
      ...(email !== '' && { email }),
      ...(password !== '' && { password })
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append('name', filename);
      data.append('file', file);
      updatedUser.profilePic = filename;

      try {
        await axios.post(`${apiURL}/upload`, data);
      } catch (err) {
        console.error(err);
        dispatch({ type: 'UPDATE_FAILURE' });
      }
    }
    try {
      const res = await axios.put(`${apiURL}/users/${user?._id}`, updatedUser);
      setSuccess(true);
      dispatch({ type: 'UPDATE_SUCCESS', payload: res.data });
    } catch (err) {
      console.error(err);
      dispatch({ type: 'UPDATE_FAILURE' });
    }
  };

  const handleDelete = async () => {
    try {
      const apiURL = process.env.REACT_APP_API_URL;
      await axios.delete(`${apiURL}/users/${user?._id}`, {
        data: { userId: user?._id }
      });
      dispatch({ type: 'LOGOUT' });
      // window.location.replace('/register');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container-fluid p-0 m-0">
      <div className="row no-gutters mx-0">
        <div className="col-xl-9 px-0">
          <div className="settingsWrapper">
            <div className="settingsTitle">
              <span className="settingsUpdateTitle">Update Your Account</span>
              <span className="settingsDeleteTitle" onClick={handleDelete}>
                Delete Account
              </span>
            </div>
            <form className="settingsForm" onSubmit={handleSubmit}>
              <label>Profile Picture</label>
              <div className="settingsPP">
                <img
                  src={
                    file
                      ? URL.createObjectURL(file)
                      : `${PF}/${user?.profilePic}`
                  }
                  alt=""
                />
                <label htmlFor="fileInput">
                  <i className="settingsPPIcon far fa-user-circle" />
                </label>
                <input
                  type="file"
                  id="fileInput"
                  style={{ display: 'none' }}
                  onChange={(e) => setFile(e.target.files && e.target.files[0])}
                />
              </div>
              <label>Username</label>
              <input
                type="text"
                placeholder={user?.username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label>Email</label>
              <input
                type="email"
                placeholder={user?.email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label>Password</label>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit" className="settingsSubmit">
                Update
              </button>
              {success && (
                <span className="settingsSuccessText">
                  Profile has been updated...
                </span>
              )}
            </form>
          </div>
        </div>
        <div className="col-xl-3 px-0">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}

export default Settings;
