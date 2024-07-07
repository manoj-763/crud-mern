import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"
import toast from "react-hot-toast";


const AddUser = () => {

    const users = {
        fname:"",
        lname:"",
        email:"",
        password:"",
    }
    
    const [user, setUser] = useState(users);
    const navigate = useNavigate()

    const inputHandler=(e)=>{
       const {name, value} = e.target;
        setUser({...user,[name]:value})
        
    }

    const submitForm = async(e)=>{
        e.preventDefault();
        await axios.post("http://localhost:5000/api/create", user)
        .then((response)=>{
           toast.success(response.data.msg, {position:"top-center"})
           navigate("/")
        }).catch(error => console.log(error))
    }
  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <Link to="/addUser">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Add User</h2>
          </Link>
          <form onSubmit={submitForm}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                First Name
              </label>
              <input
                onChange={inputHandler}
                type="text"
                id="name"
                name="fname"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Last Name
              </label>
              <input
                onChange={inputHandler}
                type="text"
                id="name"
                name="lname"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                onChange={inputHandler}
                type="email"
                id="email"
                name="email"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
              <input
                onChange={inputHandler}
                type="password"
                id="password"
                name="password"
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
                  Add User
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
  );
};

export default AddUser;
