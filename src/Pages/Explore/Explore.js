import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import styles from './Explore.module.scss';
import HeaderItem from './HeaderItem';
import { BasketballIcon, EntertainmentIcon, FilmIcon, MicroIcon } from '~/components/Icons';
import videos from '~/assets/videos/explore';
import ExploreItem from './ExploreItem';
import SingleVideo from '../SingleVideo/SingleVideo';

const cx = classNames.bind(styles);

const LIST_CATEGORY = [
    {
        icon: <MicroIcon />,
        title: 'Dance and Music',
    },
    {
        icon: <BasketballIcon />,
        title: 'Sports',
    },
    {
        icon: <EntertainmentIcon />,
        title: 'Entertainment',
    },
    {
        icon: <FilmIcon />,
        title: 'Comedy and Drama',
    },
];

const LIST_VIDEO = [
    {
        full_name: 'OgeNus 🌊',
        nickname: 'ogenus_189',
        avatar: 'https://p16-sign-useast2a.tiktokcdn.com/tos-useast2a-avt-0068-giso/dfd6c98ed6b384add2795c941b2a53f5~c5_100x100.jpeg?x-expires=1687417200&x-signature=gt4E%2B0S5fqxLms%2BQ4T6naMrdlRI%3D',
        tick: false,
        content:
            'Chào mọi người! Đây là con đường tôi chọn. Đây là đam mê của tôi. Và cho tôi biết nếu như bạn thích bài hát này 🔥#tiktokgiaitri #ogenus #rapviet #rapvietmua3 #vieon #nhachaymoingay',
        sound: 'nhạc nền - OgeNus 🌊',
        view: 300000,
        like: 22400,
        comment: 404,
        favourite: 509,
        share: 50,
        isCapcut: false,
        video: videos.video1,
        id_video: 1,
    },
    {
        full_name: 'Yumin',
        nickname: 'jsminiee',
        avatar: 'https://p16-sign-useast2a.tiktokcdn.com/tos-useast2a-avt-0068-giso/a91e6206361ff800702acfa5b195e73b~c5_100x100.jpeg?x-expires=1687417200&x-signature=4UGXjeJEaNv7JINdnyo%2F%2FGYOTNg%3D',
        tick: false,
        content: '',
        sound: 'nhạc nền - Yumin',
        view: 300000,
        like: 27100,
        comment: 45,
        favourite: 1488,
        share: 38,
        isCapcut: false,
        video: videos.video2,
        id_video: 2,
    },
    {
        full_name: '10000%🎀',
        nickname: 'bundaunuocmamhh',
        avatar: 'https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/d5300c2b7f6714717ae82440e93698be~c5_100x100.jpeg?x-expires=1687417200&x-signature=qFXUXij%2FotCeGEvcIyLASPLownE%3D',
        tick: false,
        content: 'Trời hôm nay tắt nắng rồii#xhuongtiktok #outfit #ootd #outfitideas #MẫuTrendCapCut',
        sound: 'nhạc nền - 10000%🎀',
        view: 357000,
        like: 32500,
        comment: 45,
        favourite: 1488,
        share: 38,
        isCapcut: true,
        video: videos.video3,
        id_video: 3,
    },
    {
        full_name: 'Zika_hila🧚🏿‍♀️',
        nickname: 'zixinhdep',
        avatar: 'https://p16-sign-useast2a.tiktokcdn.com/tos-useast2a-avt-0068-giso/0c086c2bf834b6fb9984a62710e04ed9~c5_100x100.jpeg?x-expires=1687417200&x-signature=Qg4yqgyVLA2fyodGpvMt3Uy%2BXLo%3D',
        tick: false,
        content: 'Up cho đỡ phí🥹 #stormick',
        sound: 'nhạc nền - minh hang',
        view: 4000000,
        like: 337000,
        comment: 1210,
        favourite: 10600,
        share: 38,
        isCapcut: false,
        video: videos.video4,
        id_video: 4,
    },
    {
        full_name: 'Tú Thanh Đồng 小公主',
        nickname: 'tuthanhdong',
        avatar: 'https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/612b0cf392522cdd3b8ec9fe4dd8758b~c5_100x100.jpeg?x-expires=1687417200&x-signature=eJfuQOQvnF5bfTvlpbvb54M3kUo%3D',
        tick: false,
        content: 'Lênh đênh quáa #fyp #fypシ #tuthanhdong',
        sound: 'nhạc nền - Tú Thanh Đồng 小公主',
        view: 51000,
        like: 5044,
        comment: 18,
        favourite: 209,
        share: 38,
        isCapcut: true,
        video: videos.video5,
        id_video: 5,
    },
    {
        full_name: 'Quỳnh Như',
        nickname: 'quynhnhuuqn12',
        avatar: 'https://p16-sign-useast2a.tiktokcdn.com/tos-useast2a-avt-0068-giso/b5c33962dd27b2b1d658d6fcce1f271c~c5_100x100.jpeg?x-expires=1687417200&x-signature=1FZ0TbR724yNlmtgbDGR2sQ%2BAiM%3D',
        tick: false,
        content: '',
        sound: 'nhạc nền - _kh_huyen02_',
        view: 51000,
        like: 5044,
        comment: 18,
        favourite: 209,
        share: 38,
        isCapcut: false,
        video: videos.video6,
        id_video: 6,
    },
];

function Explore() {
    const [category, setCategory] = useState('Dance and Music');
    const [indexSingleVideo, setIndexSingleVideo] = useState(-1);
    const headerRef = useRef();
    const containerRef = useRef();
    let lastScroll = useRef(0);

    const handleHerderItemOnclick = (active) => {
        setCategory(active);
    };

    const handleWindownOnscroll = () => {
        if (lastScroll > window.scrollY) {
            headerRef.current.style.top = '60px';
        } else if (window.scrollY >= 150) {
            headerRef.current.style.top = '-24px';
        } else if (window.scrollY === 0) {
            headerRef.current.style.top = '60px';
        }
        lastScroll = window.scrollY;
    };

    useEffect(() => {
        window.addEventListener('scroll', handleWindownOnscroll);
        return () => window.removeEventListener('scroll', handleWindownOnscroll);
    });

    useEffect(() => {
        document.title = 'Explore - Find your favourite videos on TikTok clone by Quốc Bảo';
    }, []);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')} ref={headerRef}>
                {LIST_CATEGORY.map((item, index) => (
                    <HeaderItem
                        key={index}
                        icon={item.icon}
                        title={item.title}
                        active={category === item.title}
                        onClick={handleHerderItemOnclick}
                    />
                ))}
            </div>
            <div className={cx('container')} ref={containerRef}>
                <div className="row">
                    {LIST_VIDEO.map((item, index) => (
                        <ExploreItem key={index} data={item} index={index} onClick={setIndexSingleVideo} />
                    ))}
                </div>
            </div>
            {indexSingleVideo !== -1 && (
                <SingleVideo
                    data={LIST_VIDEO[indexSingleVideo]}
                    isStart={indexSingleVideo === 0}
                    isEnd={indexSingleVideo + 1 === LIST_VIDEO.length}
                    setIndexSingleVideo={setIndexSingleVideo}
                    index={indexSingleVideo}
                />
            )}
        </div>
    );
}

export default Explore;
