import {
  BrowserRouter,
  HashRouter,
  Routes,
  Route,
  Navigate,
  useNavigate
} from 'react-router-dom';

import { Capacitor } from '@capacitor/core';
import { App as CapacitorApp } from '@capacitor/app';

import React, { useState, useEffect } from 'react';

import Login from './components/login';
import UserLogin from './components/UserLogin';
import UserRegistration from './components/UserRegistration';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/Dashboard';
import RegistrationSuccess from './components/RegistrationSuccess';
import SuperAdminLogin from './components/SuperAdminLogin';
import SuperAdminDashboard from './components/SuperAdminDashboard';
import RegistrationFailed from './components/RegistrationFailed';
import PaymentReturn from './components/PaymentReturn';

// Handles PhonePe returning to the Android app
function PaymentDeepLinkHandler() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;

    let listenerHandle;
    let active = true;

    const handlePaymentUrl = (urlString) => {
      if (!urlString) return;

      try {
        const url = new URL(urlString);

        const isPaymentReturn =
          url.protocol === 'ptaguser:' &&
          url.hostname === 'payment-return';

        if (isPaymentReturn) {
          const orderId = url.searchParams.get('orderId');

          if (orderId) {
            navigate(
              `/payment-return?orderId=${encodeURIComponent(orderId)}`,
              { replace: true }
            );
          }
        }
      } catch (error) {
        console.error('Invalid payment return URL:', error);
      }
    };

    // Handles return when the app is already running
    CapacitorApp.addListener('appUrlOpen', (event) => {
      handlePaymentUrl(event.url);
    }).then((handle) => {
      if (active) {
        listenerHandle = handle;
      } else {
        handle.remove();
      }
    });

    // Handles return when PhonePe launches the app from a closed state
    CapacitorApp.getLaunchUrl().then((result) => {
      if (active && result?.url) {
        handlePaymentUrl(result.url);
      }
    }).catch((error) => {
      console.error('Could not read launch URL:', error);
    });

    return () => {
      active = false;
      listenerHandle?.remove();
    };
  }, [navigate]);

  return null;
}

function App() {
  const [user, setUser] = useState(null);

  // Hash navigation is used inside the Android app
  const Router = Capacitor.isNativePlatform() ? HashRouter : BrowserRouter;
  const defaultRoute = Capacitor.isNativePlatform()
    ? '/userLogin'
    : '/login';

  const handleLogin = (data) => {
    setUser(data);
  };

  return (
    <Router>
      <PaymentDeepLinkHandler />

      <Routes>
        <Route path="/" element={<Navigate to={defaultRoute} replace />} />

        <Route
          path="/login"
          element={<Login onLogin={handleLogin} />}
        />

        <Route
          path="/userLogin"
          element={<UserLogin onLogin={handleLogin} />}
        />

        <Route
          path="/registrationSuccess"
          element={<RegistrationSuccess />}
        />

        <Route
          path="/registrationFailed"
          element={<RegistrationFailed />}
        />

        <Route
          path="/super-admin/login"
          element={<SuperAdminLogin />}
        />

        <Route
          path="/super-admin/dashboard"
          element={<SuperAdminDashboard user={user} />}
        />

        <Route
          path="/payment-return"
          element={<PaymentReturn />}
        />

        <Route
          path="/register"
          element={
            <UserRegistration
              onRegister={(data) => {
                console.log('Registered:', data);
                setUser(data);
              }}
            />
          }
        />

        <Route
          path="/dashboard"
          element={<AdminDashboard />}
        />

        <Route
          path="/userDashboard"
          element={<UserDashboard user={user} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
