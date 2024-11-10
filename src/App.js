import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/Header/NavBar';
import Footer from './components/Footer/Footer';
import './App.css';

// Import Pages
import AdminLanding from './frontPages/AdminDataViewer/AdminPage/AdminMain';
import AdminLogin from './frontPages/AdminDataViewer/landing-adminPage';
import UpdateTracking from './frontPages/AdminDataViewer/AdminComponents/sidebar/UpdateTrackingData';
import CustomerLists from './frontPages/AdminDataViewer/AdminComponents/sidebar/DataViewer';
import UpdatePage from './frontPages/AdminDataViewer/AdminComponents/sidebar/UpdatePage';
import UpdateTrackingStatus from './frontPages/AdminDataViewer/AdminComponents/sidebar/UpdateTrackingStatus';
import CreateTrackingData from './frontPages/AdminDataViewer/AdminComponents/sidebar/CreateTrackingData';
import TrackingTable from './frontPages/AdminDataViewer/AdminComponents/sidebar/BulkUpdateTracking';

// Theme
import { ThemeProvider } from '@mui/material/styles';
import theme from './components/theme/colorTheme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <NavBar />
        <div className="App">
          <Routes>
            {/* Admin Login Route */}
            <Route path="/login-admin" element={<AdminLogin />} />
            
            {/* Admin Dashboard Routes */}
            <Route path="/" element={<AdminLanding />}>
              <Route index element={<CreateTrackingData />} /> {/* Default content for Admin Landing */}
              <Route path="add-customer" element={<CreateTrackingData />} />
              <Route path="update-tracking" element={<UpdateTracking />} />
              <Route path="customer-lists" element={<CustomerLists />} />
              <Route path="update-page" element={<UpdatePage />} />
              <Route path="update-status" element={<UpdateTrackingStatus />} />
              <Route path="sample" element={<TrackingTable /> } />
            </Route>
          </Routes>
        </div>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;
