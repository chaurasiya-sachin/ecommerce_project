import React, { useEffect, useState } from 'react'
import MyContext from './myContext'
import { toast } from 'react-toastify';
import {fireDb} from '../../firebase/FirebaseConfig'
import { Timestamp,addDoc,collection,onSnapshot,orderBy,query,deleteDoc,doc,setDoc } from 'firebase/firestore';

const MyState = (props) => {
    const [mode,setMode] = useState('light');
    const [loading,setLoading] = useState(false)

    const toggleMode = ()=>{
      if(mode === 'light'){
        setMode('dark');
        document.body.style.backgroundColor='rgba(17,24,39)'
      }else{
        setMode('light');
        document.body.style.backgroundColor='white';
      }
    }

    // product
    const [products,setProducts] = useState({
      title:null,
      price:null,
      imageUrl:null,
      category:null,
      description:null,
      time:Timestamp.now(),
      date:new Date().toLocaleString(
        'en-US',{
          month:'short',
          day:'2-digit',
          year:'numeric'
        }
      )
    })

    // add product section

    const addProduct = async ()=>{
      if(products.title ==null ||
        products.price == null ||
        products.imageUrl == null ||
        products.category== null ||
        products.description == null
      ){
        return toast.error('Please fill all fields')
      }

      const productRef = collection(fireDb,"products")
      setLoading(true)  
      try{
        await addDoc(productRef,products)
        toast.success('Product Add successfully')
        getProductData()
        closeModal()
        setLoading(false)
      }catch(error){
        console.log(error);
        setLoading(false)
        
      }
      // Reset the form inputs after adding the product
      setProducts({
        title: "",
  price: "",
  imageUrl: "",
  category: "",
  description: "",
  time: Timestamp.now(),
  date: new Date().toLocaleString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
      })
    })
    }

    const [product,setProduct] = useState([]);

    // get product
    const getProductData = async ()=>{
      setLoading(true);
      try{
        const q = query(
          collection(fireDb,'products'),
          orderBy('time'),
        );
        const data = onSnapshot(q,(QuerySnapshot)=>{
          let productsArray = [];
          QuerySnapshot.forEach((doc)=>{
            productsArray.push({
              ...doc.data(),id:doc.id 
            });
          });
            setProduct(productsArray)
            setLoading(false);
        });
        return ()=>data;
      }catch(error){
        console.log(error);
        setLoading(false)
      }
    }
    useEffect(()=>{
      getProductData();
    },[]);

    // update product
    const edithandle = (item) =>{
      setProducts(item)
    }

    const updateProduct = async () =>{
      setLoading(true)
      try{
        await setDoc(doc(fireDb,"products",products.id),products);
        toast.success("Product Updated successfully!! ")
        getProductData();
        setLoading(false);
        window.location.href='/dashboard'
      }catch(error){
        console.log(error);
        setLoading(false)
      }
      setProducts("")
    }

    // delete product
    const deleteProduct = async (item) =>{
      try{
        setLoading(true)
        await deleteDoc(doc(fireDb,"products",item.id));
        toast.success('product deleted successfully!!')
        setLoading(false);
        getProductData()
      }catch(error){
        console.log(error);
        setLoading(false)
      }
    }

    const [searchkey, setSearchkey] = useState('')
  const [filterType, setFilterType] = useState('')
  const [filterPrice, setFilterPrice] = useState('')

  return (
    <MyContext.Provider value={{mode,toggleMode,loading,setLoading,products,product,setProducts,addProduct,edithandle,updateProduct,deleteProduct,searchkey,setSearchkey,filterType,setFilterType,filterPrice,setFilterPrice}}>
        {props.children}
    </MyContext.Provider>
  )
}

export default MyState
