import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsRefreshing } from './redux/auth/selectors';
import { selectIsLoading } from './redux/transactions/selectors';
import { refreshUserThunk } from './redux/auth/operations';
import Loader from './components/Loader/Loader';
import { lazy } from 'react';
import RegistrationPage from './pages/RegistrationPage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard/Dashboard';
import NotFound from './pages/NotFound/NotFound';
import HomeTab from './components/HomeTab/HomeTab';

const CurrencyTab = lazy(() => import('./components/CurrencyTab/CurrencyTab'));
// const HomeTab = lazy(() => import('enter path here'));
// const StatisticsTab = lazy(() => import('enter path here'));

function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  const isLoading = useSelector(selectIsLoading);
  useEffect(() => {
    dispatch(refreshUserThunk());
  }, [dispatch]);
  return (
    <>
      {(isLoading || isRefreshing) && <Loader />}

      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route index element={<HomeTab />} />
          <Route path="statistics" element={<p>StatisticsTab</p>} />
          <Route path="currency" element={<CurrencyTab />} />
        </Route>

        <Route
          path="/register"
          element={
            <PublicRoute>
              <RegistrationPage />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
