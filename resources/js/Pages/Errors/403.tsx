import React from 'react';
import { Link } from '@inertiajs/react';

const Error403: React.FC = () => {
    return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
            <h1>403 - Forbidden</h1>
            <p>You do not have permission to access this page.</p>
            <Link href="/" style={{ color: 'blue', textDecoration: 'underline' }}>
                Go back to homepage
            </Link>
        </div>
    );
};

export default Error403;
