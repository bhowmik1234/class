"use client";
import Item from "./Item";
import React from "react";
import axios from "axios";
import Cookies from "js-cookie";

const Todo = ()=> {
  const [value, setValue] = React.useState('');
//   const userName = params.userid;
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    const fetchContentData = async () => {
      try {
        // const a = Cookies.get("loggedIn");
        // const response = await axios.get('/api/contentdata',{params:{name:userName}}); 
        // console.log(response.data);
        // // const contents = response.data.data.map( (elem:any) => {elem.content, elem._id});
        // const contents = response.data.data.map((elem) => ({ content: elem.content, id: elem._id }));

        // console.log(contents);
        // setData(contents);
        console.log("done");
      } catch (error) {
        console.error('Error fetching content data:', error);
      }
    };

    fetchContentData();
  }, []);

  const refresh = ()=>{
    window.location.reload()
  }

  
  async function logout() {
    
    // const data = await axios.get("../api/user/data");
    // console.log(data);
    // console.log(userName);
    console.log(data);
  }

  async function add() {
    // const cont = {
    //   userName,
    //   data: value,
    // }
    // try {
    //   const res = await axios.post('/api/contentupload', cont);
    //   console.log(res);
    // } catch (error) {
    //   console.log(error); 
    // }

  }

  return (
    <main className="flex p-10 w-full justify-center">
      <div className="flex flex-col w-3/4">
        {/* <button
          onClick={logout}
          className="outline-none border-2 w-20 p-2 rounded-md m-2 hover:border-amber-500 hover:text-amber-500"
        >
          Log out
        </button> */}
        <div className="flex justify-center w-full gap-2.5 h-14 mb-4">
          <input
            onChange={(e) =>{
              setValue(e.target.value);
            }}
            name="content"
            placeholder="Enter to do item"
            className="p-2 bg-gray-700 border-amber-900 outline-none w-full rounded-md text-gray-400"
          />
          <button onClick={add} className="px-6 rounded-md bg-amber-600 hover:bg-amber-700">
            Add
          </button>
        </div>
        <button onClick={refresh} className="mb-12 outline-none border-2 rounded-md text-sm w-20 hover:border-amber-500 hover:text-amber-500">Refresh</button>
        {/* {
          data.length > 0 ? (
            data.map((elem, index) => (
              <Item key={index} id={elem.id} cct={elem.content} />
            ))
          ) : (
            <p>No data available</p>
          )
        } */}
        <Item />
      </div>
    </main>
  );
}

export default Todo
