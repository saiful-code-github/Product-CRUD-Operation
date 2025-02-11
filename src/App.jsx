import { useEffect, useState } from 'react'
// import { GetApi } from './API/GetApi'
import './App.css'
import { GetApi2 } from './API/GetApi2';

function App() {
  const [scrollTop, setScrollTop] = useState(false);
  //handleScroll
  const handleScroll = () => {
    window.scrollTo({
      top:0,
      behavior: "smooth"
    })
  }
 
  const scrollToptoBottom = () => {
      const heightHide = 250;
      const ScrollToShow = document.body.scrollTop || document.documentElement.scrollTop;
      setScrollTop(ScrollToShow > heightHide);
  }
   useEffect(()=>{
     window.addEventListener('scroll',scrollToptoBottom);
     return () => window.removeEventListener('scroll', scrollToptoBottom)
   },[])
  return (
    <>
       <h1 className='text-center text-2xl mt-5 font-semibold capitalize underline underline-offset-1 mb-10'>CRUD Operation</h1>
       {/* <GetApi/> */}
       <GetApi2/>
       {scrollTop && (
        <div onClick={handleScroll} className='fixed bottom-[45px] cursor-pointer right-[45px] bg-violet-700 z-50 shadow-2xl text-center py-[15px] px-[15px] rounded-[5px]'>
        <i className='bi bi-arrow-up text-2xl font-black text-white'></i>
        </div>
       )}
    </>
  )
}

export default App
