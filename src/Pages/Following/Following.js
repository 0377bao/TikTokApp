import classNames from 'classnames/bind';
import { createContext, useCallback, useEffect, useState } from 'react';
import styles from './Following.module.scss';
import ContentItem from '~/components/ContentItem/ContentItem';
import videos from '~/assets/videos/following';
import SingleVideo from '../SingleVideo/SingleVideo';

const cx = classNames.bind(styles);

const LIST_VIDEO = [
    {
        full_name: 'Vienef',
        nickname: '_vie02',
        avatar: 'https://p16-sign-useast2a.tiktokcdn.com/tos-useast2a-avt-0068-giso/132e08bd2de874f988d7596021963a1a~c5_100x100.jpeg?x-expires=1687399200&x-signature=csauGwyX3FB3o%2FvfhPjQKzA3aPc%3D',
        tick: false,
        content: '',
        sound: 'nhạc nền - zzzzzziii - zzzzziii',
        like: 15100,
        comment: 43,
        favourite: 1230,
        share: 59,
        isCapcut: false,
        video: videos.video1,
        following: true,
        id_video: 1,
    },
    {
        full_name: 'Williams [HL] 🖤',
        nickname: 'williams_161121',
        avatar: 'https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/f5743489438f5a72b37de4f18a2cb1fc~c5_100x100.jpeg?x-expires=1687399200&x-signature=5FnNszcRq%2F0RdrNnbDOoJIWxjgY%3D',
        tick: false,
        content:
            '(Song: Giày cao gót màu đỏ) Bài hát Trung mà bạn yêu thích nhất? #nhactrung #lyrics #nhenhang #nhactrunghaynhat #nhactamtrang #chill',
        sound: 'nhạc nền - Williams 🖤 - Williams [HL] 🖤',
        like: 276300,
        comment: 4230,
        favourite: 38800,
        share: 1438,
        isCapcut: true,
        video: videos.video2,
        following: true,
        id_video: 2,
    },
    {
        full_name: 'nhímm mm',
        nickname: 'tuongnhi06',
        avatar: 'https://p16-sign-useast2a.tiktokcdn.com/tos-useast2a-avt-0068-giso/a6d7da850695aa5b88f072649c9f6ff1~c5_100x100.jpeg?x-expires=1687399200&x-signature=bU1OjNS4fBmYRIPoTQUxJl9anfY%3D',
        tick: false,
        content: 'xinhh hongg #fypシ #ChiYeuMinhAnh',
        sound: 'nhạc nền - Trường Nguyễn ⚜️',
        like: 372000,
        comment: 2512,
        favourite: 18200,
        share: 1090,
        isCapcut: false,
        video: videos.video3,
        following: true,
        id_video: 3,
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
        document.title = 'Following - Watch videos from creators you follow | Tiktok clone by Quốc Bảo';
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
