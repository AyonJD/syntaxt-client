import { createContext, useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navigation from './Components/Shared/Navigation';
import AdminUpload from './Pages/Admin/AdminUpload';
import Login from './Pages/Auth/Login';
import Signup from './Pages/Auth/Signup';
import { BASE_URL } from './Utils/Urls';

const dataContext = createContext();

function App() {
  const [openPopup, setOpenPopup] = useState(false);
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [services, setServices] = useState([]);

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


  /* Creating an object that contains the token, setToken, userId, setUserId, and loggedInUser. */
  const dataObject = {
    token,
    setToken,
    userId,
    setUserId,
    loggedInUser,
    openPopup,
    setOpenPopup,
  }

  return (
    <div>
      <dataContext.Provider value={dataObject}>
        <Navigation />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
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