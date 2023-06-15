import { useEffect } from 'react';

function Following() {
    useEffect(() => {
        document.title = 'Following - Watch videos from creators you follow | Tiktok clone by Quốc Bảo';
    }, []);
    return <h2>Following Pages</h2>;
}

export default Following;
