import React, { useContext, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import myContext from '../../context/myContext';
import toast from 'react-hot-toast';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth,fireDB } from '../../firebase/FirebaseConfig';
import { collection,onSnapshot, QuerySnapshot,query,where } from 'firebase/firestore';
import Loader from '../../components/loader/Loader';

const SignIn = () => {
    const context = useContext(myContext);
    const { loading,setLoading } = context;

    const navigate = useNavigate();

    const [userLogin,setUserLogin] = useState({
        email:"",
        password:""
    });

    const userLoginFunction=async()=>{
        if(userLogin.email == "" || userLogin.password == ""){
           return toast.error("All Fields are Required")
        }
        setLoading(true);

        try {
            const users = await signInWithEmailAndPassword(auth, userLogin.email, userLogin.password);

            console.log(users)

            try {
                const q = query(
                    collection(fireDB,"user"),
                    where('uid','==',users?.user?.uid)
                );
                const data = onSnapshot(q,(QuerySnapshot)=>{
                    let user;
                    QuerySnapshot.forEach((doc)=>user=doc.data());
                    localStorage.setItem("users",JSON.stringify(user));
                    setUserLogin({
                        email:"",
                        password:""
                    })
                    toast.success("Sign In Successfully")
                    setLoading(false);
                    navigate('/user-profile')
                })
                return() => data;
            } catch (error) {
                console.log(error)
                setLoading(false)
            }
        } catch (error) {
            console.log(error)
            setLoading(false)
            
            // Handle specific Firebase auth errors
            if (error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
                toast.error("Wrong Password")
            } else if (error.code === 'auth/user-not-found') {
                toast.error("User Not Found")
            } else if (error.code === 'auth/invalid-email') {
                toast.error("Invalid Email Address")
            } else if (error.code === 'auth/too-many-requests') {
                toast.error("Too Many Attempts. Please Try Again Later")
            } else {
                toast.error("Sign In Failed. Please Try Again")
            }
        }
    }
    return (
        <div className='flex justify-center items-center min-h-screen px-4 py-8' style={{backgroundColor: '#1d4ed8'}}>
            {loading && <Loader/>}
            {/* SignIn Form  */}
            <div className="login_Form bg-white px-5 sm:px-6 md:px-8 py-6 md:py-7 border border-gray-200 rounded-xl shadow-lg w-full max-w-sm">

                {/* Top Heading  */}
                <div className="mb-5">
                    <h2 className='text-center text-2xl md:text-3xl font-bold' style={{color: '#1d4ed8'}}>
                        Sign In
                    </h2>
                </div>

                <form onSubmit={(e) => { e.preventDefault(); userLoginFunction(); }}>
                    {/* Input Two  */}
                    <div className="mb-3">
                        <label className='block text-black font-medium mb-1.5 text-sm'>Email Address</label>
                        <input
                            type="email"
                            placeholder='Enter Your Email'
                            value={userLogin.email}
                            onChange={(e)=>{
                                setUserLogin({...userLogin,email:e.target.value})
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
                            value={userLogin.password}
                            onChange={(e)=>{
                                setUserLogin({...userLogin,password:e.target.value})
                            }}
                            autoComplete="current-password"
                            className='bg-white border-2 border-black px-3 py-2 w-full rounded-md outline-none placeholder-black text-black transition-all duration-200 text-sm'
                        />
                    </div>

                    {/* SignIn Button  */}
                    <div className="mb-4">
                        <button
                            type='submit'
                            className='w-full text-white text-center py-2.5 font-semibold rounded-md shadow-md hover:shadow-lg transition-all duration-200 text-sm'
                            style={{backgroundColor: '#1d4ed8'}}
                            onMouseEnter={(e) => e.target.style.backgroundColor = '#1e40af'}
                            onMouseLeave={(e) => e.target.style.backgroundColor = '#1d4ed8'}
                        >
                            Sign In
                        </button>
                    </div>
                </form>

                <div className='text-center'>
                    <h2 className='text-gray-700 text-xs'>Don't have an Account? <Link className='font-semibold hover:underline transition-all' style={{color: '#1d4ed8'}} to={'/signup'}>Sign Up</Link></h2>
                </div>

            </div>
        </div>
    );
}

export default SignIn;
