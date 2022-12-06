import { createContext, useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navigation from './Components/Shared/Navigation';
import AdminUpload from './Pages/Admin/AdminUpload';
import Login from './Pages/Auth/Login';
import Signup from './Pages/Auth/Signup';
import ClientPage from './Pages/ClientPage/ClientPage';
import ContentPage from './Pages/ContentPage/ContentPage';
import { BASE_URL } from './Utils/Urls';

const dataContext = createContext();

function App() {
  const [openPopup, setOpenPopup] = useState(false);
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [allUser, setAllUser] = useState([]);

  /**
   * The above function is an async function that fetches all the users from the database.
   */
  const getAllUser = async () => {
    const res = await fetch(`${BASE_URL}/api/v1/auth/user`);
    const data = await res.json();
    setAllUser(data);
  };

  /**
   * It fetches the user's data from the server and sets the state of the logged in user
   */
  const getLoggedInUser = async () => {
    try {
      const url = `${BASE_URL}/api/v1/auth/user/${userId}`
      const res = await fetch(url)

      const parseData = await res.json();
      setLoggedInUser(parseData);
    } catch (err) {
      console.error(err.message);
    }
  }

  /* A hook that is called when the component is mounted. It is used to set the token and userId from
  localStorage. */
  useEffect(() => {
    setToken(localStorage.getItem('access_token'));
    setUserId(localStorage.getItem('user_id'));
    if (userId) {
      getLoggedInUser();
    }
  }, [token, userId]);

  /* Fetching all the users from the database. */
  useEffect(() => {
    getAllUser();
  }, []);


  /* Creating an object that contains the token, setToken, userId, setUserId, and loggedInUser. */
  const dataObject = {
    token,
    setToken,
    userId,
    setUserId,
    loggedInUser,
    openPopup,
    setOpenPopup,
    allUser
  }

  return (
    <div>
      <dataContext.Provider value={dataObject}>
        <Navigation />
        <Routes>
          <Route path="/" element={<ContentPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/client-page" element={<ClientPage />} />
          <Route path="/content-page" element={<ContentPage />} />
        </Routes>
        {
          openPopup && <AdminUpload />
        }
      </dataContext.Provider>
      <Toaster />
    </div>
  );
}

export default App;
export { dataContext };