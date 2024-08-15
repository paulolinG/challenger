import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider, Router } from 'react-router-dom';
import { useState } from 'react';
import RootLayout from './layouts/RootLayout';
import './App.css'
import WelcomeLayout from './layouts/WelcomeLayout';
import MainNavbar from './components/MainNavbar';
import Home from './layouts/Home';
import Test from './layouts/test';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<MainNavbar />}>
        <Route path="/Home" element={<Home />}></Route>
      </Route>
      <Route path="/auth-success" element={<WelcomeLayout />} />
      <Route path="IdealDay" element={<Test />} />
    </Route>
  )
) 

function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App