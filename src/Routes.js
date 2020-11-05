import React from 'react';
import {BrowserRouter , Switch ,Route} from 'react-router-dom';
import Home from './core/Home/Home';
import Signup from './user/Signup/Signup';
import Signin from './user/Signin/Signin';
import Menu from './core/Menu/Menu';
import Shop from './core/Shop/Shop';
import PrivateRoute from './auth/PrivateRoute'
import Dashboard from './user/UserDashboard/UserDashboard';
import AdminRoute from './auth/AdminRoute';
import AdminDashboard from './user/AdminDashboard/AdminDashboard';
import AddCategory from './admin/AddCategory/AddCategory';
import AddBrand from './admin/AddBrand/AddBrand';
import AddPersonalCare from './admin/AddPersonalCare/AddPersonalCare';
import AddHair from './admin/AddHair/AddHair';
import AddProduct from './admin/AddProduct/AddProduct';
import Orders from './admin/Orders/Orders';
import Cart from './core/Cart/Cart';
import Profile from './user/Profile';
import Product from './core/Product/Product';
import ManageProducts from './admin/ManageProducts/ManageProducts';
import UpdateProduct from './admin/UpdateProduct/UpdateProduct';
import UpdateCategory from './admin/updateCategory/updateCategory';
import AddComment from './user/AddComment/AddComment';
import ContactUs from './core/ContactUs/ContactUs';
// import LiveChat from './admin/LiveChat';
import ForgotPassword from './user/ForgotPassword';
import ResetPassword from './user/ResetPassword';
import CustomChatbot from './core/ChatBot/CustomChatbot';

const Routes = () => {
    
    return (
        <BrowserRouter>
        <Menu />
      
        
             

        <Switch>
            <Route path='/' exact component={Home}></Route>
            <Route path='/shop' exact component={Shop}></Route>
            <Route path='/signup' exact component={Signup}></Route>
            <Route path='/signin' exact component={Signin}></Route>
            <Route path='/forgotpassword' exact component={ForgotPassword}></Route>
            <Route path='/contact' exact component={ContactUs}></Route>
            <Route path="/reset-password/:resetPasswordToken" exact component={ResetPassword} />
            <PrivateRoute path='/user/dashboard' exact component={Dashboard} /> 
            <AdminRoute path='/admin/dashboard' exact component={AdminDashboard} /> 
            <AdminRoute path='/create/category' exact component={AddCategory} /> 
            <AdminRoute path='/create/brand' exact component={AddBrand} /> 
            <AdminRoute path='/create/pc' exact component={AddPersonalCare} />
            <AdminRoute path='/create/hair' exact component={AddHair} />
            <AdminRoute path='/create/product' exact component={AddProduct} />
            <AdminRoute path='/admin/orders' exact component={Orders} />
            <PrivateRoute path="/profile/:userId" exact component={Profile} />
            <Route path="/product/:productId" exact component={Product} />
            <Route path='/cart' exact component={Cart}></Route>
            <Route path='/write/review' exact component={AddComment}></Route>
            <PrivateRoute path="/admin/products" exact component={ManageProducts} />
                <AdminRoute path="/admin/product/update/:productId" exact component={UpdateProduct} />
                <AdminRoute path="/admin/category/update/:categoryId" exact component={UpdateCategory} />
        </Switch>
        <CustomChatbot />
        {/* <LiveChat license={12317655} group={3} /> */}
        </BrowserRouter>
    );
};

export default Routes;