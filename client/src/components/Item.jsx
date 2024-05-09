import React from 'react';
import { MdDelete } from 'react-icons/md';
import axios from "axios";

const Item = ({cct, id}) => {
    const [data, setData] = React.useState([
        "Making backend",
        "connection from frontend and backed"
    ])
  const deleteItem = async () => {
    console.log(id);
    try {
      const res = await axios.get('/api/contentdelete', { params: { id: id } });
      console.log(res);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  return (

        <div className="flex bg-gray-800 p-2 mb-2 rounded-md">
        <div className="w-full text-gray-300 p-2">
           "make backend"
        </div>
        <div className="p-2" onClick={deleteItem}>
            <MdDelete className="text-xl text-amber-400" />
        </div>
        </div>
    
  );
};

export default Item;
