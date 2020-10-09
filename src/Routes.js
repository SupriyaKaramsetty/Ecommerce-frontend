import React from 'react';
import {BrowserRouter , Switch ,Route} from 'react-router-dom';
import Home from './core/Home/Home';
import Signup from './user/Signup/Signup';
import Signin from './user/Signin/Signin';
import Menu from './core/Menu/Menu';
import Products from './core/Products/Products';
import Shop from './core/Shop/Shop';
import PrivateRoute from './auth/PrivateRoute'
import Dashboard from './user/UserDashboard/UserDashboard';
import AdminRoute from './auth/AdminRoute';
import AdminDashboard from './user/AdminDashboard/AdminDashboard';
import AddCategory from './admin/AddCategory/AddCategory';
import AddBrand from './admin/AddBrand/AddBrand';
import AddPersonalCare from './admin/AddPersonalCare/AddPersonalCare';
import AddProduct from './admin/AddProduct/AddProduct';
import Orders from './admin/Orders/Orders';
import Cart from './core/Cart/Cart';
import Profile from './user/Profile';
import Product from './core/Product/Product';


const Routes = () => {
    return (
        <BrowserRouter>
        <Menu />
        <Switch>
            <Route path='/' exact component={Home}></Route>
            <Route path='/productsList' exact component={Products}></Route>
            <Route path='/shop' exact component={Shop}></Route>
            <Route path='/signup' exact component={Signup}></Route>
            <Route path='/signin' exact component={Signin}></Route>
            
            <PrivateRoute path='/user/dashboard' exact component={Dashboard} /> 
            <AdminRoute path='/admin/dashboard' exact component={AdminDashboard} /> 
            <AdminRoute path='/create/category' exact component={AddCategory} /> 
            <AdminRoute path='/create/brand' exact component={AddBrand} /> 
            <AdminRoute path='/create/pc' exact component={AddPersonalCare} />
            <AdminRoute path='/create/product' exact component={AddProduct} />
            <AdminRoute path='/admin/orders' exact component={Orders} />
            <PrivateRoute path="/profile/:userId" exact component={Profile} />
            <Route path="/product/:productId" exact component={Product} />
            <Route path='/cart' exact component={Cart}></Route>
        </Switch>
        </BrowserRouter>
    );
};

export default Routes;