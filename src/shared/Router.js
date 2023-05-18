import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from '../Components/Main';
import Test from '../Pages/DetailPage';
import LoginForm from '../Pages/LogIn';
import Register from '../Pages/Register';


const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/LogIn" element={<LoginForm />} />
        <Route path="/register" element={<Register />} />
        <Route path=":id" element={<Test />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router;