import React from 'react'
import {Routes,Route} from "react-router-dom"
import HomePage from './pages/home/HomePage'
import NoPage from './pages/noPage/NoPage'
import ProductInfo from './pages/productInfo/ProductInfo'
import ScrollTop from './components/scrollTop/ScrollTop'
import CartPage from './pages/cart/CartPage'
import AllProducts from './pages/allproducts/AllProducts'
import SignUp from './pages/registration/SignUp'
import SignIn from './pages/registration/SignIn'
import UserProfile from './pages/user/UserProfile'
import MyState from './context/myState'
import { Toaster } from 'react-hot-toast'
import { ProtectedRouteForUser } from './protectedRoute/ProtectedRouteForUser'
import CategoryPage from './pages/category/CategoryPage'
import Wishlist from './pages/wishlist/Wishlist'
import OrderSummary from './pages/order/OrderSummary'


const App = () => {
  return (
    <MyState >
      <ScrollTop/>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="*" element={<NoPage/>}/>
        <Route path="/productInfo/:id" element={<ProductInfo/>}/>
        <Route path="/cart" element={<CartPage/>}/>
        <Route path="/wishlist" element={<Wishlist/>}/>
        <Route path="/order/:id" element={<OrderSummary/>}/>
        <Route path="/allproducts" element={<AllProducts/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/signin" element={<SignIn/>}/>
        <Route path="/category/:categoryname" element={<CategoryPage/>}/>
        <Route path="/user-profile" element={
          <ProtectedRouteForUser>
            <UserProfile/>
          </ProtectedRouteForUser>
        }/>
        
      </Routes>
      <Toaster/>
    </MyState>
  )
}

export default App
 