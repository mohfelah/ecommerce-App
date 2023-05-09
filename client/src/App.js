
import './App.css';
import {Routes,Route} from 'react-router-dom'
import HomePage from './components/pages/HomePage';
import About from './components/pages/About';
import Contact from './components/pages/Contact';
import Policy from './components/pages/Policy';
import PageNonFound from './components/pages/PageNonFound';
import Register from './components/pages/Auth/Register';
import Login from './components/pages/Auth/Login';
import Dashboard from './components/pages/user/Dashboard';
import PrivateRoute from './components/Routes/Private';
import ForgotPassword from './components/pages/Auth/ForgotPassword';
import AdminRoute from './components/Routes/AdminRoute';
import AdminDashboard from './components/pages/Admin/AdminDashboard';
import CreateCategory from './components/pages/Admin/CreateCategory';
import CreateProduct from './components/pages/Admin/CreateProduct';
import Profile from './components/pages/user/Profile';
import Orders from './components/pages/user/Orders';
import Products from './components/pages/Admin/Products';
import UpdateProduct from './components/pages/Admin/UpdateProduct';
import Search from './components/pages/Search';
import ProductDetails from './components/pages/ProductDetails';
import CartPage from './components/pages/CartPage';

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element ={<HomePage/>} />
      <Route path="/product/:slug" element={<ProductDetails />} />
      <Route path='/search' element ={<Search/>} />
      <Route path='/cart' element ={<CartPage/>} />
      <Route path ="/dashboard" element={<PrivateRoute/>} >
        <Route path='user' element={<Dashboard/>} />
        <Route path='user/orders' element={<Orders/>} />
        <Route path='user/profile' element={<Profile/>} />
      </Route>
      <Route path ="/dashboard" element={<AdminRoute/>} >
        <Route path='admin' element={<AdminDashboard/>} />
        <Route path='admin/create-category' element={<CreateCategory/>} />
        <Route path='admin/create-product' element={<CreateProduct/>} />
        <Route path="admin/product/:slug" element={<UpdateProduct />} />
        <Route path="admin/products" element={<Products />} />
      </Route>
      <Route path='/register' element ={<Register/>} />
      <Route path='/login' element ={<Login/>} />
      <Route path='/forgotPassword' element ={<ForgotPassword/>} />
      <Route path='/about' element ={<About/>} />
      <Route path='/contact' element ={<Contact/>} />
      <Route path='/policy' element ={<Policy/>} />
      <Route path='*' element ={<PageNonFound/>} />
    </Routes>   
    </>
  );
}

export default App;
