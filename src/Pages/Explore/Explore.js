import { useEffect } from 'react';

function Explore() {
    useEffect(() => {
        document.title = 'Explore - Find your favourite videos on TikTok clone by Quốc Bảo';
    }, []);
    return <h2>Explore Pages</h2>;
}

export default Explore;
