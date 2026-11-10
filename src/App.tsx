import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import AppRoutes from './router/AppRoutes';
import ToastContainer from './components/ui/ToastContainer';

export const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <ToastContainer />
        <AppRoutes />
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default App;
