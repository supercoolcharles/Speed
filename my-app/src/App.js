import React from "react";
import Home from "./pages/Home";
import SEPractice from "./pages/SE-Practice";
import SubmitArticle from "./pages/Submit-Article"; 
import CheckArticle from "./pages/Check-Article"; 
import NotFoundPage from "./pages/404";
import {
  Route,
  Routes,
  NavLink,
  useRoutes,
  Redirect,
  BrowserRouter as Router
 } from "react-router-dom";
 
const App = () => {
  const routes = useRoutes([
    { path: '/', element: <Home /> },
    { path: '/SEPractice', element: <SEPractice /> },
    { path: '/SubmitArticle', element: <SubmitArticle /> },
    { path: '/CheckArticle', element: <CheckArticle /> },
    { path: '/*', element: <NotFoundPage /> ,redirectTo: '/404'}
  ]);
 return (
 <div>
 <h1>Software Engineering Practice Evidence Repository (SEPER)</h1>
 <ul className="header">
  <li><NavLink exact="true" to = "/">Home</NavLink></li>
  <li><NavLink to = "/SEPractice">Select the Practice</NavLink></li>
  <li><NavLink to = "/SubmitArticle">Submit an Article</NavLink></li>
  <li><NavLink to = "/CheckArticle">Check Article</NavLink></li>
 </ul>
 <div className="content">
  {routes}
 </div>
 </div>
 );
}
export default App;