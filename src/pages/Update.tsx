import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface IInitialState {
  _id: string
  title: string;
  subtitle: string;
  image: string;
  description: string;
  rate: number;
  price: number;
  size: string;
  color: string;
  __v: number
}

const initialState:IInitialState = {
  _id: "",
  title: "",
  subtitle: "",
  image: "",
  description: "",
  rate: 0,
  price: 0,
  size: "",
  color: "",
  __v: 0
}
function Update() {
  const navigate = useNavigate();
  const [idData, setIdData] = useState(initialState)
  const {id} = useParams();
  useEffect(() => {
    const token = localStorage.getItem('token')
    if(!token) {
        navigate("/login")
    }
  }, [navigate])

  useEffect(() => {
    async function getIdProduct() {
      try {
        const response = await axios.get(`https://ecommerce-backend-fawn-eight.vercel.app/api/products/${id}`)
        setIdData(response.data)
      } catch(err) {
        console.log(err);
      }
    }
    getIdProduct()
  }, [id])
  const handleSubmit = async () => {
    try {
        const { title, subtitle, size, color, description, image, price, rate } = idData
        if(!title || !subtitle || !size || !color || !description || !image || !price || !rate) {
            toast.error("Please fill in the main fields", {
                position: "top-right",
                autoClose: 5000,
            })
        }
        const token = localStorage.getItem("token");
        const headers = {
            Authorization: token
        }
        const data = {
            title: idData.title,
            subtitle: idData.subtitle,
            image: idData.image,
            description: idData.description,
            rate: idData.rate,
            price: idData.price,
            size: idData.size,
            color: idData.color
        }
        const response = await axios.put(`https://ecommerce-backend-fawn-eight.vercel.app/api/products/${id}`, data, {
            headers: headers
        })
        if(response.data) {
            navigate("/")
            console.log(response.data);
        }
    } catch(err) {
        console.log(err);
    }
}

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIdData({ ...idData, [event.target.name]: event.target.value })
  }
  return (
    <div className="flex items-center justify-center w-full h-full">
        <div className="bg-emerald-500 rounded-lg w-[550px] h-auto">
            <h1 className="text-4xl my-5 text-white">Add a Furniture</h1>
            <form className="text-left">
                <div className="my-[12px] flex flex-row items-center">
                    <label className="text-xl cursor-pointer ml-7 text-white" htmlFor="title">Title</label>
                    <input className="outline-none cursor-pointer w-[380px] h-[40px] rounded-[3.5px] pl-5 ml-[80px]" name="title" id="title" value={idData.title} onChange={handleChange} type="text" placeholder="Enter title"  />
                </div>
                <div className="my-[12px] flex flex-row items-center">
                    <label className="text-xl cursor-pointer ml-7 text-white" htmlFor="subtitle">Subtitle</label>
                    <input className="outline-none cursor-pointer w-[380px] h-[40px] rounded-[3.5px] pl-5 ml-[50px]" name="subtitle" id="subtitle" value={idData.subtitle} onChange={handleChange} type="text" placeholder="Enter subtitle"  />
                </div>
                <div className="my-[12px] flex flex-row items-center">
                    <label className="text-xl cursor-pointer ml-7 text-white" htmlFor="image">Image</label>
                    <input className="outline-none cursor-pointer w-[380px] h-[40px] rounded-[3.5px] pl-5 ml-[63px]" name="image" id="image" value={idData.image} onChange={handleChange} type="text" placeholder="Enter image"  />
                </div>
                <div className="my-[12px] flex flex-row items-center">
                    <label className="text-xl cursor-pointer ml-7 text-white" htmlFor="description">Description</label>
                    <input className="outline-none cursor-pointer w-[380px] h-[40px] rounded-[3.5px] pl-5 ml-[18px]" name="description" id="description" value={idData.description} onChange={handleChange} type="text" placeholder="Enter description"  />
                </div>
                <div className="my-[12px] flex flex-row items-center">
                    <label className="text-xl cursor-pointer ml-7 text-white" htmlFor="rate">Rate</label>
                    <input className="outline-none cursor-pointer w-[380px] h-[40px] rounded-[3.5px] pl-5 ml-[80px]" name="rate" id="rate" value={idData.rate} onChange={handleChange} type="text" placeholder="Enter Rate"  />
                </div>
                <div className="my-[12px] flex flex-row items-center">
                    <label className="text-xl cursor-pointer ml-7 text-white" htmlFor="price">Price</label>
                    <input className="outline-none cursor-pointer w-[380px] h-[40px] rounded-[3.5px] pl-5 ml-[75px]" name="price" id="price" value={idData.price} onChange={handleChange} type="text" placeholder="Enter price"  />
                </div>
                <div className="my-[12px] flex flex-row items-center">
                    <label className="text-xl cursor-pointer ml-7 text-white" htmlFor="size">Size</label>
                    <input className="outline-none cursor-pointer w-[380px] h-[40px] rounded-[3.5px] pl-5 ml-[83px]" name="size" id="size" value={idData.size} onChange={handleChange} type="text" placeholder="Enter size"  />
                </div>
                <div className="my-[12px] flex flex-row items-center">
                    <label className="text-xl cursor-pointer ml-7 text-white" htmlFor="color">Color</label>
                    <input className="outline-none cursor-pointer w-[380px] h-[40px] rounded-[3.5px] pl-5 ml-[70px]" name="color" id="color" value={idData.color} onChange={handleChange} type="text" placeholder="Enter Color"  />
                </div>
                <div className="flex items-center justify-around my-5">
                    <button onClick={handleSubmit} type="button" className="border-none text-white rounded-lg w-[150px] h-[40px] bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500">Submit</button>
                    <button onClick={() => setIdData(initialState)} className="border-none text-white rounded-lg w-[150px] h-[40px] bg-gradient-to-r from-pink-500 to-orange-500 hover:from-teal-400 hover:to-blue-500">Reset</button>
                    <button className="border-none text-white rounded-lg w-[150px] h-[40px] bg-gradient-to-r from-pink-500 to-blue-500 hover:from-teal-400 hover:to-orange-500"><Link to="/">Back</Link></button>
                </div>
                <ToastContainer />
            </form>
        </div>
    </div>
  )
}

export default Update
