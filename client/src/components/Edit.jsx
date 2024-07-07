import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate  } from "react-router-dom";
import toast from "react-hot-toast";

const Edit = () => {

  const users = {
    fname:"",
    lname:"",
    email:"",
}
  const {id} = useParams();
  const [user, setUser] = useState(users)
  const navigate = useNavigate()



  const inputChangeHandler=(e)=>{
    const {name, value} = e.target;
    setUser({...user, [name]:value})
  }

  useEffect(()=>{
    axios.get(`http://localhost:5000/api/getOne/${id}`)
    .then((response)=>{
      setUser(response.data)

    }).catch((error)=>{
        console.log(error)
    })
  },[id])

  const submitForm = async(e)=>{
    e.preventDefault();
    await axios.put(`http://localhost:5000/api/update/${id}`, user)
    .then((response)=>{
       toast.success(response.data.msg, {position:"top-center"})
       navigate("/")
    }).catch(error => console.log(error))
  }

  return (
    <div>
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <Link to="/">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Edit User Details</h2>
        </Link>
        <form onSubmit={submitForm}>
          <div className="mb-4">
            <label htmlFor="fname" className="block text-gray-700 text-sm font-bold mb-2">
              First Name
            </label>
            <input
              onChange={inputChangeHandler}
              type="text"
              value={user.fname}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Last Name
            </label>
            <input
              onChange={inputChangeHandler}
              type="text"
              value={user.lname}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              onChange={inputChangeHandler}
              type="email"
              id="email"
              value={user.email}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
              Update User
              </button>
            </div>
            <Link to='/'><button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Back
            </button></Link>
          </div>
        </form>
      </div>
    </div>
  </div>
  )
}

export default Edit