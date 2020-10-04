import React from 'react';
import {BrowserRouter , Switch ,Route} from 'react-router-dom';
import Home from './core/Home/Home';
import Signup from './user/Signup/Signup';
import Signin from './user/Signin/Signin';
import Menu from './core/Menu/Menu';
import Products from './core/Products/Products';
import PrivateRoute from './auth/PrivateRoute'
import Dashboard from './user/UserDashboard';
import AdminRoute from './auth/AdminRoute';
import AdminDashboard from './user/AdminDashboard';
import AddCategory from './admin/AddCategory';
import AddProduct from './admin/AddProduct';
const Routes = () => {
    return (
        <BrowserRouter>
        <Menu />
        <Switch>
            <Route path='/' exact component={Home}></Route>
            <Route path='/productsList' exact component={Products}></Route>
            <Route path='/signup' exact component={Signup}></Route>
            <Route path='/signin' exact component={Signin}></Route>
            <PrivateRoute path='/user/dashboard' exact component={Dashboard} /> 
            <AdminRoute path='/admin/dashboard' exact component={AdminDashboard} /> 
            <AdminRoute path='/create/category' exact component={AddCategory} /> 
            <AdminRoute path='/create/product' exact component={AddProduct} />
        </Switch>
        </BrowserRouter>
    );
};

export default Routes;