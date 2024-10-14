import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/Header/NavBar.js';
import Footer from './components/Footer/Footer.js';
import './App.css';
import AdminLanding from './frontPages/AdminDataViewer/AdminPage/AdminMain.js';
import AdminLogin from './frontPages/AdminDataViewer/landing-adminPage.js';
import AddCustomer from './frontPages/AdminDataViewer/AdminComponents/sidebar/DataComponents/CreateData.js';
import UpdateTracking from './frontPages/AdminDataViewer/AdminComponents/sidebar/UpdateTrackingData.js';
import CustomerLists from './frontPages/AdminDataViewer/AdminComponents/sidebar/DataViewer.js';
import UpdatePage from './frontPages/AdminDataViewer/AdminComponents/sidebar/UpdatePage.js';
import UpdateTrackingStatus from './frontPages/AdminDataViewer/AdminComponents/sidebar/UpdateTrackingStatus.js'
import { ThemeProvider } from '@mui/material/styles/index.js';
import theme from './components/theme/colorTheme.js'

function App() {
  return (
    <ThemeProvider theme={theme}> 
    <Router>
      <NavBar />
      <div className="App">
        <Routes>
          <Route path="/login-admin" element={<AdminLogin/>} />
            <Route path="/" element={<AdminLanding />}>
            <Route path="add-customer" element={<AddCustomer />} />
            <Route path="update-tracking" element={<UpdateTracking />} />
            <Route path="customer-lists" element={<CustomerLists />} />
            <Route path="update-page" element={<UpdatePage />} />
            <Route path="update-status" element={<UpdateTrackingStatus />} />
          </Route>
        </Routes>
        <Footer />
      </div>
    </Router>
    </ThemeProvider>
  );
}

export default App;
