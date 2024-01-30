import React, { useEffect, useState } from 'react';
import Loading from './Loading';

const WithLoading = (WrappedComponent) => {
    return function WithLoadingComponent(props) {
        const [isLoading, setIsLoading] = useState(true);

        useEffect(() => {
            const timer = setTimeout(() => {
                setIsLoading(false);
            }, 1000);

            return () => clearTimeout(timer);
        }, []);

        if (isLoading) {
            return <Loading />;
        }

        return <WrappedComponent {...props} />;
    }
}

export default WithLoading;
