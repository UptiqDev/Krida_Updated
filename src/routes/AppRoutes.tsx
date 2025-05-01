import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '@/components/ProtectedRoute';
import HomePage from '@/pages/Home';
import LoginPage from '@/pages/Login';
import NotFound from '@/pages/NotFound';
import OnboardUniversityPage from '@/pages/OnboardUniversity';
import TokenCreationPage from '@/pages/TokenCreation';
import UniversityDetailsPage from '@/pages/university/UniversityDetailsPage';

const AppRoutes = () => (
    <Routes>
        <Route
            path='/'
            element={<LoginPage />}
        />
        <Route
            path='/home'
            element={
                <ProtectedRoute>
                    <HomePage />
                </ProtectedRoute>
            }
        />
        <Route
            path='/onboard-university'
            element={
                <ProtectedRoute>
                    <OnboardUniversityPage />
                </ProtectedRoute>
            }
        />
        <Route
            path='/university/:id'
            element={
                <ProtectedRoute>
                    <UniversityDetailsPage />
                </ProtectedRoute>
            }
        />
        <Route
            path='/university/:id/create-token'
            element={
                <ProtectedRoute>
                    <TokenCreationPage />
                </ProtectedRoute>
            }
        />
        <Route
            path='*'
            element={<NotFound />}
        />
    </Routes>
);

export default AppRoutes;