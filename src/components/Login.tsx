import axios from "axios";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface IInitialState {
  email: string;
  password: string;
}

const initialState: IInitialState = {
  email: "",
  password: ""
}

function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialState)
  const handleSubmit = async () => {
    try {
      if(!form.email || !form.password) {
        toast.error("No login", {
          position: "top-right",
          autoClose: 5000
        })
      }
      const response = await axios.post("https://fakestoreapi.com/users", {
        email: form.email,
        password: form.password
      })
      localStorage.setItem("token", response.data)
      navigate("/")
    } catch(err) {
      console.log(err);
      toast.error("No Login", {
        position: "top-right",
        autoClose: 5000
      })
    }
  } 
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }
  const handleReset = () => {
    setForm(initialState)
    toast.success("Reset", {
      position: "top-right",
      autoClose: 5000
    })
  }
  return (
    <div className="w-[75vw] h-[75vh] flex items-center justify-center">
        <div className="w-[500px] h-auto bg-sky-500 rounded-md p-5 text-white">
          <h2 className="text-5xl font-bold">Login User</h2>
          <div className="text-left my-8 flex items-center">
            <label className="text-3xl ml-8 cursor-pointer mr-[70px]" htmlFor="email">Email</label>
            <input className="w-[280px] h-[40px] pl-3 text-black rounded-md cursor-pointer hover:border-2 hover:text-white outline-none hover:bg-transparent hover:border-white" value={form.email} onChange={handleChange} placeholder="Enter your email" type="email" id="email" name="email" />
          </div>
          <div className="text-left my-8 flex items-center">
            <label className="text-3xl ml-8 cursor-pointer mr-[20px]" htmlFor="password">Password</label>
            <input className="w-[280px] h-[40px] pl-3 text-black rounded-md cursor-pointer hover:border-2 hover:text-white outline-none hover:bg-transparent hover:border-white" value={form.password} onChange={handleChange} placeholder="Enter your password" type="password" id="password" name="password" />
          </div>
          <div className="flex items-center justify-around">
            <button onClick={handleSubmit} type="button" className="border-none outline-none text-white rounded-lg w-[150px] h-[40px] bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500">Submit</button>
            <button onClick={handleReset} className="border-none outline-none text-white rounded-lg w-[150px] h-[40px] bg-gradient-to-r from-pink-500 to-orange-500 hover:from-teal-400 hover:to-blue-500">Reset</button>
          </div>
          <ToastContainer />
        </div>
    </div>
  )
}

export default LoginPage
