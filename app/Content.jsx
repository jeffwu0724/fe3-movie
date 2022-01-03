import React from "react";
import {Route, Switch} from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import Index from "../pages/Index";
import Search from "../pages/Search";
import OrderHistory from "../pages/OrderHistory";
import ShoppingCart from "../pages/ShoppingCart";
import MovieDetails from "../pages/MovieDetails";
import SetDiscount from "../pages/SetDiscount";


const Content = () => {
    return (
        <div className="content">
            <Switch>
                <Route path="/login"
                       component={Login}/>
                <Route path="/register"
                       component={Register}/>
                <Route path="/index"
                       component={Index}/>
                <Route path="/search"
                       component={Search}/>
                <Route path="/detail"
                       component={MovieDetails}/>
                <Route path="/orderhistory"
                       component={OrderHistory}/>
                <Route path="/shoppingcart"
                       component={ShoppingCart}/>
                <Route path="/setdiscount"
                       component={SetDiscount}/>
                
                <Route path="/"
                       component={Login}/>
            </Switch>
        </div>
    );
}

export default Content;
