import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from 'js-cookie';
import Header from './Header';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProjectBox from './ProjectBox';
import Work from "./Work";
import Profile from "./Profile";
import Todo from "./Todo";


const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showPlus, setShowPlus] = useState(false);
  const [showCreateClass, setShowCreateClass] = useState(false);
  const [showJoinClass, setShowJoinClass] = useState(false);
  const [projectcode , setProjectCode] = useState("");
  const [boxData, setBoxData] = useState([{
    "name":"school",
    "description": "nice word",
    "admin": "rohit",
    "projectType": "educatoin"
  },
  {
    "name":"office",
    "desp": "good work",
    "admin": "bicchu",
    "projectType": "finance"
  }
]);

const [name, setName] = useState("");
const [desp, setDesp] = useState("");
const [ptype, setType] = useState("");

  const url = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await axios.post(`${url}/get-project-detail`);
        setBoxData(prevData => [...prevData, ...resp.data]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleProfile = () => {
    setShowProfile(!showProfile);
  };

  const togglePlus = () => {
    setShowPlus(!showPlus);
  };

  const toggleCreateClass = () => {
    setShowPlus(false);
    setShowCreateClass(!showCreateClass);
  };

  const toggleJoinClass = () => {
    setShowJoinClass(!showJoinClass);
    setShowPlus(false);
    // setShowPlus(!showPlus);
    console.log(Cookies.get("loggedIn"));
  };

  const logout = () =>{
    Cookies.remove("loggedIn");
  }

  const createProject = async () => {
    try {
      const a = Cookies.get('loggedIn');
      console.log(a);
      const data = {
        name: name,
        desp: desp,
        type: ptype,
        user: a,
      }
      const res = await axios.post(`${url}/create-project`, data);
      console.log(res);
      console.log(name, desp, ptype, Cookies.get("loggedIn"));
      // If creation is successful, close the modal and update boxDat
      setShowCreateClass(false);
      setBoxData(prevData => [...prevData, {"name": name, "admin": Cookies.get("loggedIn"), "desp": desp, "projectType":ptype}]);
    } catch (error) {
      console.log(error);
    }
  };

  const joinproject = async() =>{
    console.log(projectcode);
    setShowJoinClass(!showJoinClass);
    try {
      const a = Cookies.get("loggedIn");
      console.log(a);
      const res = await axios.post(`${url}/join-code`, {projectcode, a});
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
<>
      <div className="page">
        {/* side bar content */}
        <div className={`sidebar ${isSidebarOpen ? '' : 'close'}`}>
          <div className="logo-details">
          <i class='bx bx-notepad'></i>
            <span className="logo_name">TechHive</span>
          </div>
          <ul className="nav-links">
            <li>
              <Link to="#">
                <i className="fas fa-home" />
                <span className="navlink">Home</span>
              </Link>
            </li>
            <li>
              <Link to="/todo">
                <i className="fas fa-calendar-check" />
                <span className="navlink">To-do</span>
              </Link>
            </li>
            <li>
              <Link to="/project">
                <i className="fas fa-graduation-cap" />
                <span className="navlink">All Project</span>
              </Link>
            </li>
            <li>
              <Link to="#">
                <i className="fas fa-cog" />
                <span className="navlink">Settings</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* home content */}
        <section className="home-section">
          <div className="home-content" style={{ justifyContent: "space-between" }}>
            <div className="menu">
              <button id='bx_menu' onClick={toggleSidebar}>
                <i className="bx bx-menu"/>
              </button>
              <span className="text">TechHive</span>
            </div>
            <div className="menubar" style={{ display: "block" }}>
              <div className="icons">
                <div id="plus-btn" className="fa fa-plus" onClick={togglePlus} />

                <Link to="/profile">
                  <div id="user-btn" className="fas fa-user" />
                </Link>
                <Link to="/loginRegister">
                <div id="toggle-btn" style={{ marginRight: "1rem" }} onClick={logout} className="bx bx-log-out-circle font-bold"> </div>
                </Link>
              </div>
              {/* <div className={`profile ${showProfile ? 'active' : ''}`}>
                <img src="profile.jpeg" alt="" />
                <h3>Rohit</h3>
                <span>Student</span>
                <div className="profile-btn">
                  <a href="profile.html">Profile</a>
                  <button onClick={logout}>Logout</button>
                </div>
              </div> */}
              
              <div className={`plus ${showPlus ? 'active' : ''}`}>
                <button id="join" onClick={toggleJoinClass}>Join</button>
                <button id="rate" onClick={toggleCreateClass}>Create</button>
              </div>
              
            </div>
          </div>

          {/* home sub Routes */}
          <div className=" flex fex-row w-full" >
            <Routes>
                <Route path="/project" element={<ProjectBox />} />
                <Route path="/header" element={<Header />} />
                <Route path="/project/*" element={<Work />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/todo" element={<Todo />} />
            </Routes>
          </div>

        </section>
      </div>

      {/* join class */}
      {/* {showJoinClass && ( */}
        <div className={`joinclass ${showJoinClass ? 'active' : ''}`}>
          <p>Join Project</p>
          <div className="form">
            <input
              type="text"
              name="projectcode"
              placeholder="Project code"
              id="projectcode"
              required=""
              onChange={(e)=>setProjectCode(e.target.value)}
            />
            <br />
            <div className="joinbtn">
              <button id="jcancel-btn" onClick={toggleJoinClass}>cancel</button>
              <button id="join-btn" onClick={joinproject}>join</button>
            </div>
          </div>
        </div>
      {/* )} */}

      {/* create class */}
      {/* {showCreateClass && ( */}
        <div className={`createclass ${showCreateClass ? 'active' : ''}`}>
          <p>New Project</p>
          <div className="form">
            <input
              type="text"
              name="projectname"
              placeholder="Project Name"
              id="projectname"
              required=""
              onChange={(e)=>{setName(e.target.value)}}
            />
            <br />
            <input
              type="text"
              name="description"
              placeholder="Description"
              id="Semester"
              required=""
              onChange={(e)=>{setDesp(e.target.value)}}
            />
            <br />
            <select name="Project Type" id="projecttype" required="" onChange={(e)=>{setType(e.target.value)}}>
              <option value="">Project Type</option>
              <option value="visa">Software Development</option>
              <option value="rupay">Education</option>
              <option value="Marketing">Marketing</option>
              <option value="Design">Design</option>
              <option value="Personal">Personal</option>
              <option value="Product Management">Product Management</option>
              <option value="Human Resource">Human Resource</option>
              <option value="Finance">Finance</option>
            </select>
            <div className="create-btn">
              <button id="cancel-btn" onClick={toggleCreateClass}>cancel</button>
              <button id="create" onClick={createProject}>create</button>
            </div>
          </div>
        </div>
      {/* )} */}
    </>
  );
};

export default Home;

