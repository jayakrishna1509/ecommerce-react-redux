import React, { useEffect, useState } from 'react'
import MyContext from './myContext'
import { collection, deleteDoc, doc, onSnapshot, orderBy, query, QuerySnapshot } from 'firebase/firestore';
import { fireDB } from '../firebase/FirebaseConfig';
import toast from 'react-hot-toast';
const myState = ({children}) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [loading,setLoading] = useState(false);

    
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [getAllProduct,setGetAllProduct] = useState([]);

    const getAllProductFunction = async () =>{
      setLoading(true);

      try {
        const q=query(
          collection(fireDB,"product"),
          orderBy("time")
        );
        const data = onSnapshot(q,(QuerySnapshot) => {
          let productArray = [];
          QuerySnapshot.forEach((doc)=>{
            productArray.push({...doc.data(),id:doc.id});
          });
          setGetAllProduct(productArray)
          setLoading(false);
        })
        return () =>data
      } catch (error) {
        console.log(error)
        setLoading(false)
        
      }
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [getAllOrder , setGetAllOrder] = useState([]);

    const getAllOrderFunction = async()=>{
      setLoading(true);
      try {
        const q = query(
          collection(fireDB,"order"),
          orderBy('time')
        );
        const data = onSnapshot(q,(QuerySnapshot) => {
          let orderArray = [];
          QuerySnapshot.forEach((doc)=>{
            orderArray.push({...doc.data(),id:doc.id});
          });
          setGetAllOrder(orderArray);
          setLoading(false)
        })
        return () => data
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }

    // console.log(getAllOrder)

    const orderDelete = async(id)=>{
      setLoading(true);
      try {
        await deleteDoc(doc(fireDB,"order",id));
        toast.success("Order Deleted Successfully");
        getAllOrderFunction();
        setLoading(false);
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }


    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [getAllUser,setGetAllUser] = useState([]);

    const getAllUserFunction =async()=>{
      setLoading(true);
      try {
        const q = query(
          collection(fireDB,"user"),
          orderBy("time")
        );
        const data = onSnapshot(q,(QuerySnapshot)=>{
          let userArray = [];
          QuerySnapshot.forEach((doc) =>{
            userArray.push({...doc.data(),id:doc.id});
          });
          setGetAllUser(userArray);
          setLoading(false);
        })
        return()=>data;
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(()=>{
      getAllProductFunction();
      getAllOrderFunction();
      getAllUserFunction();
    },[])

  return (
    <MyContext.Provider value={{
        loading,
        setLoading,
        getAllProduct,
        getAllProductFunction,
        getAllOrder,
        orderDelete,
        getAllUser
    }}>
      {children}
    </MyContext.Provider>
  )
}

export default myState
