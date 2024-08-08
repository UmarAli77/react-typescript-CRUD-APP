import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import starsFour from '../assets/stars-four.png'
import starsFive from '../assets/five-starrs.png'
import starsThree from '../assets/three-star.png'
import starsTwo from '../assets/two-starr.png'
import starsOne from '../assets/one-star.png'
import starsBirYarim from "../assets/stars-bir-yarim.png";
import starsIkkiYarim from '../assets/ikki-yarim.png';
import starsUchYarim from '../assets/uch-yarim.png';
import starsTortYarim from '../assets/tort-yarim.png';
import zeroStars from "../assets/zero-stars.png"

interface IInitialState {
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

const initialState: IInitialState = {
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

function Read() {
    const navigate = useNavigate();
    const [data, setData] = useState(initialState)
    const { id } = useParams()
    useEffect(() => {
        const token = localStorage.getItem('token')
        if(!token) {
            navigate("/login")
        }
    }, [navigate])
    useEffect(() => {
        async function getProduct() {
            try {
                const response = await axios.get(`https://ecommerce-backend-fawn-eight.vercel.app/api/products/${id}`)
                setData(response.data)
            }catch(err) {
                console.log(err);
            }
        }
        getProduct()
    }, [id])
    const stars = 
        data.rate === 1 ? <img  width={150} height={150} src={starsOne} alt="stars-four" /> 
        : data.rate === 2 ? <img  width={150} height={150} src={starsTwo} alt="star-three" /> 
        : data.rate === 3 ? <img  width={150} height={150} src={starsThree} alt="stars-three" /> 
        : data.rate === 4 ? <img  width={150} height={150} src={starsFour} alt="star-one" />
        : data.rate === 5 ? <img  width={150} height={150} src={starsFive} alt="stars-five" />
        : data.rate === 1.5 ? <img  width={150} height={150} src={starsBirYarim} alt="stars-one-yarim" />
        : data.rate === 2.5 ? <img  width={150} height={150} src={starsIkkiYarim} alt="stars-two-yarim" />
        : data.rate === 3.5 ? <img  width={150} height={150} src={starsUchYarim} alt="stars-three-yarim" />
        : data.rate === 4.5 ? <img  width={150} height={150} src={starsTortYarim} alt="stars-four-yarim" />
        : <img width={150} height={150} src={zeroStars} alt="stars-zero" />
  return (
    <div className="flex items-center justify-center w-full h-full">
        <div className="bg-emerald-500 rounded-lg w-[750px] h-auto flex shadow-xl">
            <img width={400} src={data.image} alt={data.title} />
            <div className="text-white pt-3 text-left">
                <h1 className="text-3xl my-3 font-semibold ml-10 uppercase ">{data.title}</h1>
                <h3 className="text-xl font-medium my-2 ml-10 capitalize">{data.subtitle}</h3>
                <p className="ml-10 my-3">{data.description}</p>
                <p className="text-xl ml-10">Price: {data.price}.00</p>
                <div className="flex items-center relative">
                    <button className={`w-10 h-10 rounded-xl bg-${data.color} border ml-10 my-3`}></button>
                    <p className="absolute right-[105px]">{ stars }</p>
                </div>
                <div className="flex items-center justify-around mt-1 mb-2 gap-5 ml-5">
                    <button className="border border-transparent text-white rounded-lg w-[150px] h-[40px] bg-gradient-to-r from-pink-500 to-orange-500 hover:from-teal-400 hover:to-blue-500"><Link to={`/update/${data._id}`}>Edit</Link></button>
                    <button className="border border-transparent text-white rounded-lg w-[150px] h-[40px] bg-gradient-to-r from-pink-500 to-blue-500 hover:from-teal-400 hover:to-orange-500"><Link to="/">Back</Link></button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Read