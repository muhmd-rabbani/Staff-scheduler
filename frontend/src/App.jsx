import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './Components/Login'
import 'bootstrap/dist/css/bootstrap.min.css';
import ManageManeger from './Components/Admin/ManageManeger'
import Managestaff from './Components/manager/Managestaff'
import Addmanager from './Components/Admin/Addmanager'
import Addstaff from './Components/manager/Addstaff'
import { Route, Routes } from 'react-router-dom'
import Manageshift from './Components/manager/Manageshift'
import Addshift from './Components/manager/Addshift'
import Viewstaff from './Components/Admin/Viewstaff'
import Viewshift from './Components/Admin/Viewshift'
import Viewcomplaint from './Components/Admin/Viewcomplaint'
import Response from './Components/manager/Response'
import Dashboard from './Components/Admin/Dashboard'
import Managerdashboard from './Components/manager/Managerdashboard'
import Managedepartment from './Components/Admin/Managedepartment'
import Attendance from './Components/Admin/Attendance'
function App() {

  return (
    <>
      
      <Routes>
        <Route path='/' element={<Login></Login>}></Route>
        <Route path='/managemanager' element={<ManageManeger></ManageManeger>}></Route>
        <Route path='/managestaff' element={<Managestaff></Managestaff>}></Route>
        <Route path='/addmanager' element={<Addmanager></Addmanager>}></Route>
        <Route path='/addstaff' element={<Addstaff></Addstaff>}></Route>
        <Route path='/manageshift' element={<Manageshift></Manageshift>}></Route>
        <Route path='/addshift' element={<Addshift></Addshift>}></Route>
        <Route path='/viewstaff' element={<Viewstaff></Viewstaff>}></Route>
        <Route path='/viewshift' element={<Viewshift></Viewshift>}></Route>
        <Route path='/viewcomplaint' element={<Viewcomplaint></Viewcomplaint>}></Route>
        <Route path='/response'element={<Response></Response>}></Route>
        <Route path='/dashboard' element={<Dashboard></Dashboard>}></Route>
        <Route path='/dashboardm' element={<Managerdashboard/>}></Route>
        <Route path='/managedepartment' element={<Managedepartment></Managedepartment>}></Route>
        <Route path='/attendance' element={<Attendance></Attendance>}></Route>
      </Routes>

    </>
  )
}

export default App
