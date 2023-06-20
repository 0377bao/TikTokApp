import classNames from 'classnames/bind';
import { createContext, useCallback, useEffect, useState } from 'react';
import styles from './Home.module.scss';
import ContentItem from '~/components/ContentItem/ContentItem';
import videos from '~/assets/videos/homes';
import SingleVideo from '../SingleVideo/SingleVideo';

const cx = classNames.bind(styles);

const LIST_VIDEO = [
    {
        full_name: 'Huỳnh Quốc Bảo',
        nickname: 'QuocBao02',
        avatar: 'https://scontent.fdad3-4.fna.fbcdn.net/v/t39.30808-6/287718621_1440789403018664_5883987277709497311_n.jpg?_nc_cat=104&cb=99be929b-59f725be&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=Ww_wDLCw-F0AX-eScSp&_nc_ht=scontent.fdad3-4.fna&oh=00_AfC7Fez50hUKUhLTIPN_uUAV4_Ro_hTfG4_7-taTTq0Nkg&oe=648DF8DA',
        tick: true,
        content: 'Hơi mệt 😢 @nguyenlinh',
        sound: 'Nhạc nền - Huỳnh Quốc Bảo',
        like: 1151000,
        comment: 10100,
        favourite: 2000,
        share: 50,
        isCapcut: true,
        video: videos.video1,
        following: true,
        id_video: 1,
    },
    {
        full_name: 'em Ngẹc 🤍',
        nickname: 'dagngoc03dagngoc03',
        avatar: 'https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/178a86f7d7e9bbb3b731f1b843da7b88~c5_100x100.jpeg?x-expires=1686819600&x-signature=E8GWgobGAySFsYZCW8FfDk3Zrp0%3D',
        tick: false,
        content: 'Oke anh #xuhuong',
        sound: 'Nhạc nền - em Ngẹc 🤍',
        like: 10200,
        comment: 800,
        favourite: 200,
        share: 50,
        video: videos.video3,
        id_video: 2,
    },
    {
        full_name: '4AM HAIRSTUDIO',
        nickname: '4am.hairstudio4am.hairstudio',
        avatar: 'https://p9-sign-sg.tiktokcdn.com/aweme/100x100/tos-alisg-avt-0068/dc0cf187a0657cfdf39b126297b89f80.jpeg?x-expires=1686819600&x-signature=873KvyqYR6Gnww4ypdVtJ09d54U%3D',
        tick: false,
        content: 'Biến hình kiểu tóc con bạch tuộc cho ido😂 #xuhuong',
        sound: 'Nhạc nền - Huỳnh Quốc Bảo',
        like: 12200,
        comment: 1000,
        favourite: 200,
        share: 50,
        video: videos.video2,
        id_video: 3,
    },
    {
        full_name: 'HuyềnTrang🤍',
        nickname: 'hntrg.__hntrg.__',
        avatar: 'https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/b1357e4483fe77378cf303de0891003e~c5_100x100.jpeg?x-expires=1686819600&x-signature=V5thuD1mxb3KzxmGZ96T8fwuDCg%3D',
        tick: true,
        content:
            '“Nếu anh ấy không quan tâm bạn thì bạn cũng đừng buồn, vì nếu bạn buồn thì nhiều anh khác lại không vui. #xuhuong',
        sound: 'Nhạc nền - Thợ lặng Tcong',
        like: 19500,
        comment: 42,
        favourite: 200,
        share: 50,
        isCapcut: true,
        video: videos.video4,
        id_video: 4,
    },
    {
        full_name: 'nguyenngocmeow',
        nickname: 'embemeo07embemeo07',
        avatar: 'https://p16-sign-useast2a.tiktokcdn.com/tos-useast2a-avt-0068-giso/3d0e6133c3cc3c190e71aac62b19c128~c5_100x100.jpeg?x-expires=1686819600&x-signature=EjZ%2BopLnarFeg%2BUg%2BRjnhYkrUMs%3D',
        tick: false,
        content: 'Đã cố gắng hớt sức 🥺 #xuhuong',
        sound: 'Nhạc nền - Trung Phú',
        like: 5890,
        comment: 1000,
        favourite: 200,
        share: 50,
        isCapcut: true,
        video: videos.video5,
        id_video: 5,
    },
    {
        full_name: '𝓩𝓮𝓵𝓭𝓪 🌷',
        nickname: 'zelda247',
        avatar: 'https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/29748dad33dd0dc96382bc43db0f5c3f~c5_100x100.jpeg?x-expires=1686974400&x-signature=l1gvIv2YknLrWsDWjpcIqrgwwPI%3D',
        tick: false,
        content: 'Slay slay quá✨ @hi #viral #xuhuong #fypシ #fashion #moingaymotoutfit #phoidoxinh',
        sound: 'nhạc nền - 𝓩𝓮𝓵𝓭𝓪 🌷',
        like: 11400,
        comment: 28,
        favourite: 925,
        share: 10,
        isCapcut: false,
        video: videos.video6,
        id_video: 6,
    },
    {
        full_name: 'Chii Lii 🌷',
        nickname: 'clyz.09',
        avatar: 'https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/753a1629b294b41516ad66a1130cba65~c5_100x100.jpeg?x-expires=1686974400&x-signature=OtP9t11en8t3%2FMM6GMy%2FgyzM9Kc%3D',
        tick: false,
        content: 'Đêm khuya bên ngoài nạnh nắm #fyp #xuhuongtiktok',
        sound: 'nhạc nền - Trần Văn Huy 🐉 🔧',
        like: 106400,
        comment: 329,
        favourite: 3980,
        share: 10,
        isCapcut: false,
        video: videos.video7,
        id_video: 7,
    },
];

const dataSingleVideo = createContext();

function Home() {
    const [isMuted, setIsMuted] = useState(true);
    const [indexSingleVideo, setIndexSingleVideo] = useState(-1);

    const setMuted = useCallback(() => {
        setIsMuted(true);
    }, []);

    const unMuted = useCallback(() => {
        setIsMuted(false);
    }, []);

    useEffect(() => {
        document.title = 'TikTok - Make Your Day';
    }, []);

    return (
        <dataSingleVideo.Provider value={1}>
            <div className={cx('wrapper')}>
                {LIST_VIDEO.map((item, index) => (
                    <ContentItem
                        key={index}
                        data={item}
                        index={index}
                        isMuted={isMuted}
                        setMuted={setMuted}
                        unMuted={unMuted}
                        setIndexSingleVideo={setIndexSingleVideo}
                        thisVideoIsSingleVideo={indexSingleVideo !== -1}
                    />
                ))}
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
        </dataSingleVideo.Provider>
    );
}

export { dataSingleVideo };
export default Home;
