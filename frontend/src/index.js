import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Home from './datavidApp/Home';
import Members from './datavidApp/Members';
import UpcomingBirthdays from './datavidApp/UpcomingBirthdays';
import Header from './datavidApp/Header';
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import MemberDetails from './datavidApp/MemberDetails';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    
  <BrowserRouter>
    <Header />
    <Routes>
      <Route path='/' element={<Navigate to='/home' />}></Route>
      <Route path='/home' exact element={<Home />}></Route>
      <Route path='/members' exact element={<Members />}></Route>
      <Route path='/upcomingBirthdays' exact element={<UpcomingBirthdays />}></Route>
      <Route path='/memberInfo/:id' exact element={<MemberDetails />}></Route>
    </Routes>
  </BrowserRouter> 

</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
