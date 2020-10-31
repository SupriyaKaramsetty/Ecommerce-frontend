import React from 'react';
import {BrowserRouter , Switch ,Route} from 'react-router-dom';
import Home from './core/Home/Home';
import Signup from './user/Signup/Signup';
import Signin from './user/Signin/Signin';
import Menu from './core/Menu/Menu';
import Countdowntimer from './core/Countdowntimer';
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
import styles from './core/Countdowntimer.css';
import AddComment from './user/AddComment/AddComment';
import ContactUs from './core/ContactUs/ContactUs';
import LiveChat from './admin/LiveChat';

const Routes = () => {
    const currentDate = new Date();
    const year = (currentDate.getMonth() === 11 && currentDate.getDate() > 23) ? currentDate.getFullYear() + 1 : currentDate.getFullYear();
    return (
        <BrowserRouter>
        <Menu />
        <div className={`row ${styles.countdownalign}`}>
        <div className="col-2">
                   
            </div>
            <div className="col-4">
                    <h1 className={styles.title}>Mega Sale Ends in</h1>
            </div>
            <div className="col-4">
                    <Countdowntimer date={`${year}-10-28T00:00:00`}/>
            </div>
            
            
        </div>

        <Switch>
            <Route path='/' exact component={Home}></Route>
            
            <Route path='/shop' exact component={Shop}></Route>
            <Route path='/signup' exact component={Signup}></Route>
            <Route path='/signin' exact component={Signin}></Route>
            <Route path='/contact' exact component={ContactUs}></Route>
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

        <LiveChat license={12317655} group={3} />
        </BrowserRouter>
    );
};

export default Routes;