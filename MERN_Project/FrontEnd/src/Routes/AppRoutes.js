import React from 'react'
import { Route, Routes } from "react-router";
import PageNotFound from "../Components/Pages/PageNotFound";
import About from '../Components/Pages/About';
import Dashboard from '../Components/Pages/Dashboard';
import Category from '../Components/Pages/Category';
import Product from '../Components/Pages/Product';
import SalesComponent from '../Components/Pages/Sales';

const Contact = (params) => {
    return <h1>Contact Component Renderer</h1>
}

export default function AppRoutes() {
    return (
        <Routes>
            <Route exact path="/" element={<Dashboard />} />
            <Route path="/home" element={<Dashboard />} />
            <Route path="/category" element={<Category />} />
            <Route path="/product" element={<Product />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/sales" element={<SalesComponent />} />
            {/* Page Not Found */}
            <Route exact path="*" element={<PageNotFound />} />
        </Routes>
    )
}

