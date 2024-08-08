import axios from "axios";
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface IData {
    _id: string;
    title: string;
    subtitle: string;
    image: string;
    description: string;
    rate: number;
    price: number;
    size: string;
    color: string;
    __v: number;
}

function Home() {
    const [data, setData] = useState<IData[]>([])
    const navigate = useNavigate();
    useEffect(() => {
        async function getProduct() {
            try {
                const response = await axios.get("https://ecommerce-backend-fawn-eight.vercel.app/api/products")
                setData(response.data)
            } catch(err) {
                console.log(err);
            }
        }
        getProduct()
    }, [])

    useEffect(() => {
        const token = localStorage.getItem('token')
        if(!token) {
            navigate("/login")
        }
    }, [navigate])
    
    const handleDelete = async (id: string) => {
        const confirm = window.confirm("Would you like to Delete ?");
        if(confirm) {
            try {
                const token = localStorage.getItem("token");
                const headers = {
                    Authorization: token
                }
                const response = await axios.delete(`https://ecommerce-backend-fawn-eight.vercel.app/api/products/${id}`, {
                    headers: headers
                })
                if(response.data) {
                    toast.success("The information has been deleted", {
                        position: "top-right",
                        autoClose: 5000
                    })
                }
                navigate(0)
                navigate("/")
            } catch(err) {
                console.log(err);
                toast.error("There was a problem deleting data", {
                    position: "top-right",
                    autoClose: 5000
                })
            }
        }
    }

    return (
    <div className="flex flex-col justify-start items-center bg-slate-200 w-full h-full">
        <div className="flex items-center justify-between">
            <h1 className="text-5xl text-left my-5">Products</h1>
            <button className="w-[100px] h-[40px] border rounded-md bg-green-400 text-white mt-5 ml-[610px]">
                <Link to="/create">Add +</Link>
            </button>
        </div>
        <div className="w-[900px] h-[50px] rounded-md bg-white border shadow-md p-4">
            <table className="table">
                <thead>
                    <tr className="flex items-center justify-beetwen">
                        <th className="mr-[185px]">Image</th>
                        <th className="mr-[160px]">Title</th>
                        <th className="mr-[80px]">Price</th>
                        <th className="mr-[70px]">Size</th>
                        <th className="mr-[90px]">Color</th>
                        <th>Actions</th>
                    </tr>
                </thead>
            </table>
        </div>
        <tbody className="w-[900px] h-auto mt-1">
            {
                data.map((item) => (
                    <tr className="bg-white p-3 flex items-center justify-between hover:bg-gray-50 hover:my-2" key={item._id}>
                        <td><img width={150} src={item.image} alt={item.title} /></td>
                        <td>{item.title}</td>
                        <td>{item.price}</td>
                        <td>{item.size}</td>
                        <td>{item.color}</td>
                        <td>
                            <Link className="w-[90px] py-1 flex items-center justify-center rounded-md bg-sky-600 text-white hover:bg-transparent hover:border-sky-600 hover:border-2 hover:text-black" to={`/read/${item._id}`}>Read</Link>
                            <Link className="w-[90px] py-1 flex items-center justify-center rounded-md bg-green-500 text-white my-2 hover:bg-transparent hover:border-green-500 hover:border-2 hover:text-black" to={`/update/${item._id}`}>Edit</Link>
                            <button onClick={() => handleDelete(item._id)} className="w-[90px] py-1 flex items-center justify-center rounded-md bg-red-600 text-white hover:bg-transparent hover:border-red-600 hover:border-2 hover:text-black">Delete</button>
                        </td>
                    </tr>
                ))
            }
            <ToastContainer />
        </tbody>
    </div>
  )
}

export default Home
