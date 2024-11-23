import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/Header/NavBar';
import Footer from './components/Footer/Footer';
import './App.css';

import { AuthProvider } from './context/AuthContext'; // Import the Auth context
import ProtectedRoute from './utils/ProtectedRoute'; // Import the ProtectedRoute component

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
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <Router>
          <NavBar />
          <div className="App">
            <Routes>
              {/* Public Route */}
              <Route path="/login-admin" element={<AdminLogin />} />

              {/* Protected Routes for Admin */}
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <AdminLanding />
                  </ProtectedRoute>
                }
              >
                {/* Nested Admin Dashboard Routes */}
                <Route index element={<CreateTrackingData />} /> {/* Default route for /admin */}
                <Route path="add-customer" element={<CreateTrackingData />} /> {/* /admin/add-customer */}
                <Route path="update-tracking" element={<UpdateTracking />} /> {/* /admin/update-tracking */}
                <Route path="customer-lists" element={<CustomerLists />} /> {/* /admin/customer-lists */}
                <Route path="update-page" element={<UpdatePage />} /> {/* /admin/update-page */}
                <Route path="tracking-status" element={<UpdateTrackingStatus />} /> {/* /admin/update-status */}
                <Route path="skibs" element={<TrackingTable />} /> {/* /admin/sample */}
              </Route>
            </Routes>
          </div>
          <Footer />
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
