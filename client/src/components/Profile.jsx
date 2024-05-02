import React, { useState, useRef, useEffect } from 'react';
import { IoIosMail } from "react-icons/io";
import { FaMobileScreenButton } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { SiCodechef } from "react-icons/si";
import { LiaEditSolid } from "react-icons/lia";
import { FaXTwitter } from "react-icons/fa6";
import img from "./profile.png";
import Cookies from "js-cookie";
import axios from "axios";

const Profile = () => {

  const [edit, setEdit] = useState(false);
  const editRef = useRef(false); // Use a ref to store edit state
  const [user, setUser] = useState("");
  const [dob, setDob] = useState("");
  const [gender,setGender] = useState("");
  const [profession, setProfession] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [LinkedIn, setLinkdIn] = useState("");
  const [github, setGithub] = useState("");
  const [codechef, setCodechef] = useState("");
  const [x, setX] = useState("");
  const url = process.env.REACT_APP_BACKEND_URL;
  
//   onChange = {(e) => {(e.target.value)}}


  useEffect(()=>{
    setUser(Cookies.get("loggedIn"));
    const details = async ()=>{
        try {
            const res = await axios.post(`${url}/get-contact`, {user: "bisu"});
            console.log(res);
            setDob(res.data.dob);
            setGender(res.data.gender);
            setProfession(res.data.profession);
            setMobile(res.data.mobile);
            setEmail(res.data.email);
            setLinkdIn(res.data.LinkedIn);
            setGithub(res.data.github);
            setCodechef(res.data.codechef);
            setX(res.data.X);

        } catch (error) {
            console.log(error);
        }
    }
    details();
  },[ dob, gender, profession, mobile, email, LinkedIn, github, codechef, x])

  const Edit = () => {
    setEdit(!editRef.current);
    editRef.current = !editRef.current;
  }

  const handleCancel = () => {
      setEdit(false); // Reset edit state
      editRef.current = false; // Reset edit ref
    };

    const handleSave = async() => {
        const data = {
            dob,
            gender,
            profession,
            mobile,
            email,
            LinkedIn,
            github,
            codechef,
            X:x,
            user: "bisu"
        };
        try {
            const res = await axios.post(`${url}/contact`, data);
            console.log(res);
        } catch (error) {
            console.log(error);
        }
        // console.log(data);
      setEdit(false); // Reset edit state
      editRef.current = false; // Reset edit ref
    };



 
  return (
        <div className="w-full">
          {/* popping screen and background screen */}
            {/* <div className="flex"> */}
            {/* in this div there is sidebar and the remaining area */}
                <div className="flex flex-col bg-neutral-700 w-full">
              {/* div for nav bar and content page */}

              <div className="my-20 mx-32 align-center items-center">
                  {/* profile section ka content */}
                  <div className="flex w-full h-[700px] justify-between bg-stone-500 rounded-lg ">
                    {/* Edit button */}
                    <button className="absolute right-36 mx-4 -translate-x-4 my-4 text-3xl" onClick={Edit}><LiaEditSolid /></button>
                      {/* left wala box */}
                      <div className="ml-48 w-1/3 my-12 py-3 mr-12 h-fit bg-grey-200 items-center rounded-lg">
                        {/* image in profile section */}
                        <div className="flex justify-center items-center " >
                          <img src={img} alt="imgloc" className="h-[270px] w-[300px] mt-8 mb-5 py-4 bg-white rounded-lg" />
                        </div>
                        {/* basic details in profile section like name dob collage name */}
                        <div className="item-center bg-white rounded-lg  bg-emerald-700 py-4">
                          <h2 className="text-2xl w-full mb-7 bg-emerald-600 py-4 px-16">{user}</h2>
                          <div>

                            <div className=" text-1xl ml-[35px] mb-3 border-b border-neutral-400 outline-none justify-between  flex w-5/6" >
                              <h2  className="   ">Date of Birth  </h2>
                              <h2  className=""> {dob}</h2>
                            </div>

                            <div className="text-1xl my-3 ml-[35px] border-b border-neutral-400 outline-none justify-between flex w-5/6"> 
                                <h2>Gender</h2>
                                <h2 className=" ml-[120px]">{gender}</h2>
                            </div>

                            <div className=" text-1xl my-3 ml-[35px] border-b border-neutral-400 outline-none justify-between flex w-5/6" >
                              <h2 htmlFor="profession" className="">Profession  </h2>
                              <h2 htmlFor="professiondetail" className=" ml-[101px]">{profession}</h2>
                            </div>
                  
                          </div>

                        </div>

                      </div>

                      {/* right wala box */}
                      <div className="mr-48 w-1/3 py-3 mt-16 h-fit  items-center rounded-lg">
                      
                      {/* upr wala box */}
                        <div className="h-1/3 bg-purple-600 align-center mb-12 py-4 rounded-lg">
                            <h2 className="text-2xl py-3 pl-8 bg-purple-500 border-b border-neutral-400 outline-none">Contact Info</h2>
                            <div className="text-1xl my-3 ml-8 border-b border-neutral-400 outline-none justify-between flex w-4/5">
                              <div className="flex">
                                <FaMobileScreenButton />
                              </div>
                                <h2>{mobile}</h2>
                            </div>
                            <div className="text-1xl my-3 ml-8 border-b border-neutral-400 outline-none justify-between flex w-4/5">
                              <div className="flex">
                                <IoIosMail />
                              </div>
                              <h2>{email}</h2>
                            </div>
                            
                        </div>

                        {/* right box k niche wala box */}

                        <div className="h-108 bg-amber-500 py-3 rounded-lg">
                            <h2 className="bg-amber-400 text-2xl py-3 pl-8 border-b border-neutral-400 outline-none">Links</h2>

                            <div className="text-1xl my-3 ml-8 border-b border-neutral-400 outline-none justify-between flex w-4/5">
                              <div className="flex">
                                <FaLinkedin />
                              </div>
                              <a href="linkedin.com">{LinkedIn}</a>
                            </div>

                            <div className="text-1xl my-3 ml-8 border-b border-neutral-400 outline-none justify-between flex w-4/5">
                              <div className="flex">
                                <FaGithub />
                              </div>
                              <a href="github.com">{github}</a>
                            </div>

                            <div className="text-1xl my-3 ml-8 border-b border-neutral-400 outline-none justify-between flex w-4/5">
                              <div className="flex">
                                <SiCodechef />
                              </div>
                              <a href="codechef.com">{codechef}</a>
                            </div>
                            <div className="text-1xl my-3 ml-8 border-b border-neutral-400 outline-none justify-between flex w-4/5">
                              <h2 className=" text-1xl  border-b border-neutral-400 outline-none"><FaXTwitter /></h2>
                              {/* <h2 className="text-1xl  border-b border-neutral-400 outline-none"> youtube.com/praveen</h2> */}
                              <a href="twitter.com" className="text-1xl  border-b border-neutral-400 outline-none">{x}</a>

                            </div>
                        </div>
                      </div>
                  </div>

                </div>
            {/* </div> */}
          </div>

          {/* popping screen */}
          {edit &&
          <div className="absolute top-0 left-0 right-0 bottom-0  flex items-center justify-center ">
            <div className="w-2/5 bg-white text-center py-3 bg-amber-50 rounded-lg">
              <div className="text-lg border-b my-6 ml-8 border-neutral-400 justify-between flex w-4/5">
                <label htmlFor="name" className="">Name  </label>
                <input  type="text" value="Praveen" readOnly className=" hover:bg-slate-200 w-3/5 bg-slate-200 ml-8 outline-none"/>
              </div>

              <div className="text-lg border-b my-6 ml-8 border-neutral-400 justify-between flex w-4/5">
                <label htmlFor="dob" className="">Date Of Birth</label>
                <input onChange = {(e) => {setDob(e.target.value)}} type="date" className=" hover:bg-slate-200 rounded-s py-1 w-3/5 bg-slate-50 outline-none " />
              </div>

              <div className="text-lg border-b my-6 ml-8 border-neutral-400 justify-between flex w-4/5">
                <label htmlFor="Gender" className="">Gender </label>
                <input onChange = {(e) => {setGender(e.target.value)}} type="radio" name="female" value="female " className="ml-28 rounded-s py-1 hover:bg-slate-200 bg-slate-200 outline-none"/>
                <label for="male">Male</label><br/>
                <input onChange = {(e) => {setGender(e.target.value)}} type="radio" name="female" value="female"  className="rounded-s py-1 hover:bg-slate-200 bg-slate-200 outline-none"/>
                <label for="female">Female</label><br/>
              </div>

              <div className="text-lg border-b my-6 ml-8 border-neutral-400 justify-between flex w-4/5">
                <label htmlFor="profession" className="">Profession </label>
                <input onChange = {(e) => {setProfession(e.target.value)}} type="text" className="w-3/5 py-1 rounded-s hover:bg-slate-200 bg-slate-200 outline-none" />
              </div>

              <div className="text-lg border-b my-6 ml-8 border-neutral-400 justify-between flex w-4/5">
                <label htmlFor="mobile" className=""><FaMobileScreenButton /> </label>
                <input onChange = {(e) => {setMobile(e.target.value)}} type="text" maxLength={10}  className="w-3/5 rounded-s py-1 hover:bg-slate-200 bg-slate-200 outline-none" />
              </div>

              <div className="text-lg border-b my-6 ml-8 border-neutral-400 justify-between flex w-4/5">
                <label htmlFor="email" className=""><IoIosMail /> </label>
                <input onChange = {(e) => {setEmail(e.target.value)}} type="email" className="w-3/5 hover:bg-slate-200 rounded-s py-1 bg-slate-200 outline-none" />
              </div>

              <div className="text-lg border-b my-6 ml-8 border-neutral-400 justify-between flex w-4/5">
                <label htmlFor="linkedin" className=""><FaLinkedin /> </label>
                <input onChange = {(e) => {setLinkdIn(e.target.value)}} type="text" className="w-3/5 hover:bg-slate-200 rounded-s py-1 bg-slate-200 outline-none" />
              </div>

              <div className="text-lg border-b my-6 ml-8 border-neutral-400 justify-between flex w-4/5">
                <label htmlFor="github" className=""> <FaGithub /></label>
                <input onChange = {(e) => {setGithub(e.target.value)}} type="text" className="w-3/5 hover:bg-slate-200 rounded-s py-1 bg-slate-200 outline-none" />
              </div>

              <div className="text-lg border-b my-6 ml-8 border-neutral-400 justify-between flex w-4/5">
                <label htmlFor="codechef" className=""><SiCodechef /></label>
                <input onChange = {(e) => {setCodechef(e.target.value)}} type="text" className="w-3/5 hover:bg-slate-200 rounded-s py-1 bg-slate-200 outline-none" />
              </div>

              <div className="text-lg border-b my-6 ml-8 border-neutral-400 justify-between flex w-4/5">
                <label htmlFor="twitter" className=""><FaXTwitter /> </label>
                <input onChange = {(e) => {setX(e.target.value)}} type="text" className="w-3/5 hover:bg-slate-200 rounded-s py-1 bg-slate-200 outline-none" />
              </div>

              <div className="ml-1/4 flex justify-between">
                <button className=" bg-indigo-800 hover:bg-orange-200 rounded-lg ml-40 py-[3px] px-[25px]" onClick={handleCancel}>Cancel</button>
                <button className="mr-3/4  bg-indigo-800 hover:bg-orange-200 rounded-lg  rounded-s py-1 mr-28 py-[3px] px-[36px]" onClick={handleSave}>Save</button>
              </div>

            </div>
          </div>
          } 

        </div>

  )
}

export default Profile;















