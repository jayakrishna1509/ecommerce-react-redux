import React, { useContext } from 'react'
import { Link, useNavigate } from "react-router-dom";
import myContext from '../../context/myContext';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth,fireDB } from "../../firebase/FirebaseConfig";
import { Timestamp,addDoc,collection } from 'firebase/firestore';
import Loader from '../../components/loader/Loader';


const SignUp = () => {
    const context = useContext(myContext);
    const {loading,setLoading} = context

    const navigate = useNavigate();

    const[userSignup,setUserSignup] = useState({
        name : "",
        email : "",
        password : "",
        role : "user"
    });
        
    const userSignupFunction = async() =>{
        if(userSignup.name == "" || userSignup.email == "" || userSignup.password == ""){
            return toast.error("All Fields are Required");
        }
        setLoading(true);
        try {
            const users = await createUserWithEmailAndPassword(auth, userSignup.email,userSignup.password)

            const user ={
                name:userSignup.name,
                email:users.user.email,
                uid:users.user.uid,
                role:userSignup.role,
                time:Timestamp.now(),
                date:new Date().toLocaleString(
                    "en-US",
                    {
                        month:"short",
                        day:"2-digit",
                        year:"numeric",
                    }
                )
            }

            const userRefrence = collection(fireDB,"user");

            addDoc(userRefrence,user)

            setUserSignup({
                name:"",
                email:"",
                password:""
            })

            toast.success("Sign Up Successfully")
            setLoading(false);
            navigate("/signin")

        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    return (
        <div className='flex justify-center items-center min-h-screen px-4 py-8' style={{backgroundColor: '#1d4ed8'}}>
            {loading && <Loader/>}
            {/* Signup Form  */}
            <div className="login_Form bg-white px-5 sm:px-6 md:px-8 py-6 md:py-7 border border-gray-200 rounded-xl shadow-lg w-full max-w-sm">

                {/* Top Heading  */}
                <div className="mb-5">
                    <h2 className='text-center text-2xl md:text-3xl font-bold' style={{color: '#1d4ed8'}}>
                        Sign Up
                    </h2>
                </div>

                <form onSubmit={(e) => { e.preventDefault(); userSignupFunction(); }}>
                    {/* Input One  */}
                    <div className="mb-3">
                        <label className='block text-black font-medium mb-1.5 text-sm'>Full Name</label>
                        <input
                            type="text"
                            placeholder='Enter Your Name'
                            value={userSignup.name}
                            onChange={(e)=>{
                                setUserSignup({...userSignup,name:e.target.value})
                            }}
                            autoComplete="name"
                            className='bg-white border-2 border-black px-3 py-2 w-full rounded-md outline-none placeholder-black text-black transition-all duration-200 text-sm'
                        />
                    </div>

                    {/* Input Two  */}
                    <div className="mb-3">
                        <label className='block text-black font-medium mb-1.5 text-sm'>Email Address</label>
                        <input
                            type="email"
                            placeholder='Enter Your Email'
                            value={userSignup.email}
                            onChange={(e)=>{
                                setUserSignup({...userSignup,email:e.target.value})
                            }}
                            autoComplete="email"
                            className='bg-white border-2 border-black px-3 py-2 w-full rounded-md outline-none placeholder-black text-black transition-all duration-200 text-sm'
                        />
                    </div>

                    {/* Input Three  */}
                    <div className="mb-4">
                        <label className='block text-black font-medium mb-1.5 text-sm'>Password</label>
                        <input
                            type="password"
                            placeholder='Enter Your Password'
                            value={userSignup.password}
                            onChange={(e)=>{
                                setUserSignup({...userSignup,password:e.target.value})
                            }}
                            autoComplete="new-password"
                            className='bg-white border-2 border-black px-3 py-2 w-full rounded-md outline-none placeholder-black text-black transition-all duration-200 text-sm'
                        />
                    </div>

                    {/* Signup Button  */}
                    <div className="mb-4">
                        <button
                            type='submit'
                            className='w-full text-white text-center py-2.5 font-semibold rounded-md shadow-md hover:shadow-lg transition-all duration-200 text-sm'
                            style={{backgroundColor: '#1d4ed8'}}
                            onMouseEnter={(e) => e.target.style.backgroundColor = '#1e40af'}
                            onMouseLeave={(e) => e.target.style.backgroundColor = '#1d4ed8'}
                        >
                            Sign Up
                        </button>
                    </div>
                </form>

                <div className='text-center'>
                    <h2 className='text-gray-700 text-xs'>Already have an Account? <Link className='font-semibold hover:underline transition-all' style={{color: '#1d4ed8'}} to={'/signin'}>Sign In</Link></h2>
                </div>

            </div>
        </div>
    );
}

export default SignUp;





