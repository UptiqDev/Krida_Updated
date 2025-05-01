import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const NotFound = () => {
    const location = useLocation();

    useEffect(() => {
        console.error('404 Error: User attempted to access non-existent route:', location.pathname);
    }, [location.pathname]);

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-50'>
            <div className='text-center max-w-md'>
                <h1 className='text-6xl font-bold mb-6 text-krida-gold'>404</h1>
                <p className='text-2xl text-gray-700 mb-6'>Page Not Found</p>
                <p className='text-gray-500 mb-8'>
                    Sorry, the page you're looking for doesn't exist or has been moved.
                </p>
                <Link to='/'>
                    <Button className='bg-krida-dark hover:bg-krida-dark/90'>Return to Home</Button>
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
