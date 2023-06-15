import { useEffect } from 'react';

function Live() {
    useEffect(() => {
        document.title = 'TikTok LIVE | TikTok clone by Quốc Bảo';
    }, []);
    return <h2>Live Pages</h2>;
}

export default Live;
