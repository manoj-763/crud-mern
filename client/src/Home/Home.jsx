import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Home = () => {

const [users, setUsers] = useState([])

  useEffect(()=>{
    const fetchData = async()=>{
    const response =  await axios.get("http://localhost:5000/api/getAll")
    setUsers(response.data)
    }
    fetchData()
  },[])


const deleteUser = async(userId)=>{
  await axios.delete(`http://localhost:5000/api/delete/${userId}`)
  .then((response)=>{
    setUsers((prevUser)=>prevUser.filter((user)=> user._id !== userId))
    toast.success(response.data.msg, {position:"top-right"})
  }).catch((error)=>{
    console.log(error)
  })
}


  return (
    <div className="container mx-auto p-4">

      <Link to="/addUser"><button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-20 mt-5"
              >
                Add User Details
              </button></Link>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Sl.no</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Password</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              users.map((user, index)=>{
                return(
                  <tr className="bg-gray-100" key={user._id}>
                  <td className="border px-4 py-2">{index+1}</td>
                  <td className="border px-4 py-2">{user.fname}{user.lanme}</td>
                  <td className="border px-4 py-2">{user.email}</td>
                  <td className="border px-4 py-2">{user.password}</td>
                  <div className="flex justify-center items-center border px-4 py-2">
                        <td>
                        <button onClick={()=> deleteUser(user._id)} className="rounded-full  bg-red-600 text-white w-24 h-11">
                            Delete
                        </button>
                        <Link to={`/edit/`+user._id}><button className=" ml-2 rounded-full bg-green-600 text-white w-20 h-11">
                            Edit
                        </button></Link>
                        </td>
                   </div>
                </tr>
                )
              })
            }
          
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
