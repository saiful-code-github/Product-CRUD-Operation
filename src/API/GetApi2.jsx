import { useEffect, useState } from "react"
import { deleteApi, getApi } from "./Api";
import { CContainer } from "@coreui/react";
import { PostApi } from "./PostApi";

export const GetApi2 = () => {
    const [loading, setLoading] = useState(false);
    const [todo, setTodo] =  useState([]);
    const [editId, setEditId] = useState(null);
    const [newTodo, setNewTodo] = useState({
        title: "",
        price: "",
        description: "",
        category: "",
        rating: "",
        image: ""

    })
    //get data
    const getData = async() => {
        try {
            setLoading(true);
             const res = await getApi();
             if(res.status === 200){
                console.log(res.data)
                setTodo(res.data);
                setNewTodo(res.data)
                setLoading(false)
             }
        } catch (error) {
            console.log(error)
        }finally{
            setLoading(false)
        }
    }
    useEffect(()=>{
        getData()
    },[])
    //deleted 
    const handleClick = async(id) => {
         try {
            const res = await deleteApi(id);
            if(res.status === 200) {
                if(setTodo || setNewTodo) {
                    setTodo((prev)=>
                        prev.filter((item)=> item.id !== id)
                     )    
                }            
            } 
         } catch (error) {
            console.log(error)
         }
    }

    //edit
    const Edit = (item) => {
        setNewTodo(item); 
        setEditId(item.id)
    }
    //handleRating
    const handleRating = (rating) => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
          if(rating >= 1){
            stars.push(<i key={i} className="bi bi-star-fill text-yellow-400"></i>);
            rating--;
          }else if (rating >= 0.5){
            stars.push(<i key={i} className="bi bi-star-half text-yellow-400"></i>);
            rating--;
          }else{
            stars.push(<i key={i} className="bi bi-start text-yellow-400"></i>)
          }
        }
        return stars; // Return the array of elements
    }
    return (
        <section className="mt-10">
            <CContainer fluid>
                <PostApi todo={todo} setTodo={setTodo} newTodo={newTodo} setNewTodo={setNewTodo} editId={editId} setEditId={setEditId}/>
            {loading ? (
                <p className="text-2xl font-bold ">Loading....</p>
            ): (
                <ul className="grid grid-cols-3 gap-4 w-full h-full">
                   {todo.map((item)=>{
                    const {id, description, category, image, price, rating, title} = item;
                    return  (
                        <li key={item.id} className="flex flex-col justify-start align-middle" >
                        <div className="bg-amber-600 text-white py-5 px-8 rounded-[10px] w-full h-full ">
                            <img src={image} alt={title} className="w-[150px] h-[200px] object-contain mb-3"/>
                            <h2 className="text-[18px]" style={{fontSize: "20px"}}><b>Tittle:</b> {title}</h2>
                            <h2 className="text-[18px]" style={{fontSize: "20px"}}><b>Price:</b> {price}</h2>
                            <h3 style={{fontSize: "20px"}}><b>Category:</b> {category}</h3>
                            <p className="text-justify"><b>Description: </b>{description}</p>
                            <h6 className="flex gap-1">Rating: {handleRating(rating.rate || rating)}</h6>
                            <div>
                            <button className="bg-blue-700 text-white py-[8px] px-[15px] mt-3 rounded-[5px] border-0" onClick={() => Edit(item)}>Edit</button>
                            <button className="bg-red-700 text-white py-[8px] px-[15px] mt-3 rounded-[5px] border-0" onClick={() => handleClick(id)}>Deleted</button>
                            </div>
                        </div>
                        </li>
                    )
                   })}
                </ul>
            )} 
            </CContainer>  
        </section>
    )
}