/* eslint-disable react/prop-types */
import { CContainer } from "@coreui/react"
import { postApi, putApi } from "./Api"

export const PostApi = ({todo,setTodo,newTodo,setNewTodo,editId, setEditId}) =>{
    //handleChange 
    const handleChange = (e) => {
        const {name, value} = e.target;
        setNewTodo((prev) => ({
            ...prev,
            [name]: value
        }))
    }
 //add method
 const addData = async() => {
    try {
        if(!newTodo.title.trim() || !newTodo.description.trim() || !newTodo.category.trim() || !newTodo.price.trim() || !newTodo.rating.trim() || !newTodo.image.trim()) { return alert("please fill the all input")};
      const res = await postApi(newTodo);
      if(res.status === 200){
        const addedTodo = {
           ...newTodo,
           id: todo.length ? todo [todo.length - 1].id + 1 : 1,
          };
          setTodo((prev)=> [...prev, addedTodo])
      }
      setNewTodo({
        title: "",
        price: "",
        description: "",
        category: "",
        rating: "",
        image: ""
      })
    } catch (error) {
      console.log(error)
    }
}
//update data
const updateData = async() => {
    try {
        const res = await putApi(editId, newTodo);
        if(res.status === 200){
            setTodo((prev)=> 
               prev.map((item)=> 
                item.id === editId ? {...item, ...newTodo} : item)
            );
            setEditId(null);
            setNewTodo({
                title: "",
                price: "",
                description: "",
                category: "",
                rating: "",
                image: ""
            })
        }
    } catch (error) {
      console.log(error)
    }
}
    //handleSubmit
    const handleSubmit = (e) => {
        e.preventDefault();
        if(editId){
            updateData();
        }else{
            addData();
        }
    }
    return (
        <section>
            <CContainer fluid>
                  <form onSubmit={handleSubmit} className="flex flex-col mx-auto w-[600px] mb-10 bg-[#f5f4f4] shadow-2xl py-3 px-6 rounded-[10px] border-b-2 border-blue-600">
                      <div>
                          <input type="text" name="title" value={newTodo.title} placeholder="Enter The Title" className="outline-0 border-b-2 border-b-blue-600 pt-4 w-full py-3" onChange={handleChange}/>
                      </div>
                      <div>
                          <input type="number" name="price" className="outline-0 border-b-2 border-b-blue-600 pt-4 w-full py-3" value={newTodo.price} placeholder="Enter The price" onChange={handleChange}/>
                      </div>
                      <div>
                          <input type="category" name="category" className="outline-0 border-b-2 border-b-blue-600 pt-4 w-full py-3" value={newTodo.category} placeholder="Enter The category" onChange={handleChange}/>
                      </div>
                      <div>
                          <textarea name="description" className="outline-0 border-b-2 border-b-blue-600 pt-4 w-full py-3" rows="4" cols="50" value={newTodo.description} placeholder="Enter Your Describe" onChange={handleChange}></textarea>
                      </div>
                      <div>
                          <input type="number" name="rating" className="outline-0 border-b-2 border-b-blue-600 pt-4 w-full py-3" value={newTodo.rating} placeholder="Enter The rating" onChange={handleChange}/>
                      </div>
                      <div>
                          <input type="text" name="image" className="outline-0 border-b-2 border-b-blue-600 pt-4 w-full py-3" value={newTodo.image} placeholder="Enter The image" onChange={handleChange}/>
                      </div>
                      <div>
                        <button type="submit" className={`${editId ? "bg-yellow-600" : "bg-blue-600"}
                        text-white py-[10px] px-[25px] mt-3 outline-0`}>{editId ? "Update" : "Add"}</button>
                      </div>
                  </form>
            </CContainer>
        </section>
    )
}