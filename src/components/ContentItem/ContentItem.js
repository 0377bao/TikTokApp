import { memo, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './ContentItem.module.scss';
import Image from '../Image';
import Button from '../Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import {
    ChatIcon,
    CoppyIcon,
    FacebookIcon,
    HeartIcon,
    LinkIcon,
    MessengerBgIcon,
    MutedIcon,
    NoteMusicIcon,
    PauseIcon,
    PhoneIcon,
    PlayIcon,
    ShareIcon,
    UnMutedIcon,
    UncollectIcon,
} from '../Icons';
import Menu from '../Popper/Menu';
import { useElementOnScreen } from '~/hooks';
import images from '~/assets/images';
import textElemts from '~/convertElementToText';
import handleHightlightContent from '~/handleLogicLocal/handleHightlightContent';

const cx = classNames.bind(styles);

const ItemEffectLike = () => {
    return (
        <div>
            <span className={cx('itemEffectLike--red')}></span>
            <span className={cx('itemEffectLike--red')}></span>
            <span className={cx('itemEffectLike--red')}></span>
            <span className={cx('itemEffectLike--red')}></span>
            <span className={cx('itemEffectLike--blue')}></span>
            <span className={cx('itemEffectLike--blue')}></span>
            <span className={cx('itemEffectLike--blue')}></span>
            <span className={cx('itemEffectLike--blue')}></span>
        </div>
    );
};

const SHARE_ITEMS = [
    {
        icon: <LinkIcon />,
        title: 'Embid',
        type: 'Embid',
    },
    {
        icon: <MessengerBgIcon />,
        title: 'Send to friends',
        type: 'Send to friends',
    },
    {
        icon: <FacebookIcon />,
        title: 'Share to Facebook',
        type: 'Share to Facebook',
    },
    {
        icon: <PhoneIcon />,
        title: 'Share to WhatsApp',
        type: 'Share to WhatsApp',
    },
    {
        icon: <CoppyIcon />,
        title: 'Coppy link',
        type: 'Coppy link',
    },
];

function ContentItem({ data, isMuted, setMuted, unMuted }) {
    const history = useNavigate();
    const videoRef = useRef();
    const contentPost = useRef();
    const groupVideoRef = useRef();
    const [isLiked, setIsLiked] = useState(false);
    const [isFavourite, setIsFavourite] = useState(false);
    // phần biến cho hiệu ứng clickvideo
    let clickVideoCount = useRef(0);
    let clickVideoTimeOut = useRef();
    let canSingleClickVideo = useRef(true);
    let canSingleClickVideoTimeout = useRef();

    const handleOnclickOptionVideo = () => {
        if (!playing) {
            videoRef.current.play();
            setPlaying(!playing);
        } else {
            videoRef.current.pause();
            setPlaying(!playing);
        }
    };

    const handleClickBtnLike = () => {
        setIsLiked(!isLiked);
    };

    const handleClickBtnFavourite = () => {
        setIsFavourite(!isFavourite);
    };

    const [playing, setPlaying] = useState(false);

    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.6,
    };
    const isVisibile = useElementOnScreen(options, videoRef);

    useEffect(() => {
        if (isVisibile) {
            if (!playing) {
                videoRef.current.play();
                setPlaying(true);
            }
        } else {
            if (playing) {
                videoRef.current.pause();
                setPlaying(false);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isVisibile]);

    // xử lý khi click vào video 1 hay 2 lần

    const handleDbClickVideo = (e) => {
        const svg = document.createElement('svg');
        const classes = cx('heartEffect');
        const x = e.nativeEvent.offsetX;
        const y = e.nativeEvent.offsetY;
        const rotate = Math.floor(Math.random() * 20 - 10);
        svg.innerHTML = textElemts.heartPath(classes, x, y, rotate);

        groupVideoRef.current.appendChild(svg);
        setIsLiked(true);

        setTimeout(() => {
            groupVideoRef.current && groupVideoRef.current.removeChild(svg);
        }, 10000);
    };

    const handleClickVideo = (e) => {
        clickVideoCount.current++;
        clearTimeout(clickVideoTimeOut.current);
        if (clickVideoCount.current === 2) {
            clearTimeout(canSingleClickVideoTimeout.current);
            handleDbClickVideo(e);
            clickVideoCount.current = 0;
            canSingleClickVideo.current = false;
            canSingleClickVideoTimeout.current = setTimeout(() => {
                canSingleClickVideo.current = true;
                clickVideoCount.current = 0;
            }, 1000);
        } else {
            if (clickVideoCount.current === 1 && canSingleClickVideo.current) {
                clickVideoTimeOut.current = setTimeout(() => {
                    clickVideoCount.current = 0;
                    history(`/video/@${data.nickname}/${data.id_video}`);
                }, 300);
            }
        }
    };

    const onChangeShareItem = (e) => {
        console.log(e);
    };

    useEffect(() => {
        const height = contentPost.current.clientHeight;
        if (height > 90) {
            contentPost.current.classList.add(cx('ismore'));
        }
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('avatar')}>
                <Image src={data.avatar} alt="Avatar" className={cx('avt-img')} />
            </div>
            <div className={cx('content')}>
                <div className={cx('header')}>
                    <div className={cx('des')}>
                        <div className={cx('author')}>
                            <h3 className={cx('nickname')}>{data.nickname}</h3>
                            {data.tick && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />}
                            <h4 className={cx('fullname')}>{data.full_name}</h4>
                        </div>
                        <div className={cx('content-des')} ref={contentPost}>
                            <Button
                                className={cx('content-des--more', 'more')}
                                onClick={() => contentPost.current.classList.replace(cx('ismore'), cx('isless'))}
                            >
                                More
                            </Button>
                            <Button
                                className={cx('content-des--more', 'less')}
                                onClick={() => contentPost.current.classList.replace(cx('isless'), cx('ismore'))}
                            >
                                Less
                            </Button>
                            <div className={cx('group-content')}>
                                {handleHightlightContent(data.content).map((item, index) => {
                                    return item.startsWith('@') || item.startsWith('#') ? (
                                        <span key={index} className={cx('contentHighlight')}>
                                            {item}
                                        </span>
                                    ) : (
                                        item
                                    );
                                })}
                            </div>
                        </div>

                        {data.isCapcut && (
                            <div className={cx('capcut')}>
                                <img className={cx('capcut-logo')} src={images.capCutLogo} alt="Logo" />
                                <p className={cx('capcut-content')}>CapCut | Edit like a pro</p>
                            </div>
                        )}

                        <div className={cx('sound')}>
                            <NoteMusicIcon className={cx('sound-icon')} width="16" height="16" />
                            <span className={cx('name-sound')}>{data.sound}</span>
                        </div>
                    </div>
                    <div className={cx('button')}>
                        <Button className={cx('button-btn')} outline>
                            Follow
                        </Button>
                    </div>
                </div>
                <div className={cx('body')}>
                    <div className={cx('group-video')} ref={groupVideoRef}>
                        <video
                            muted={isMuted}
                            className={cx('video', 'ispause')}
                            ref={videoRef}
                            src={data.video}
                            loop
                            onClick={handleClickVideo}
                            onPlay={() => videoRef.current.classList.replace(cx('ispause'), cx('isplay'))}
                            onPause={() => videoRef.current.classList.replace(cx('isplay'), cx('ispause'))}
                        />
                        {isMuted && <MutedIcon className={cx('mutedicon')} onClick={unMuted} />}
                        {!isMuted && <UnMutedIcon className={cx('mutedicon')} onClick={setMuted} />}

                        <PauseIcon className={cx('pauseicon')} onClick={handleOnclickOptionVideo} />
                        <PlayIcon className={cx('playicon')} onClick={handleOnclickOptionVideo} />
                    </div>
                    <div className={cx('actions')}>
                        <button
                            className={cx('action-btn', {
                                liked: isLiked,
                            })}
                            onClick={handleClickBtnLike}
                        >
                            <div className={cx('action-btn-icon')}>
                                <HeartIcon />
                                {isLiked && <ItemEffectLike />}
                            </div>
                            <strong>{data.like}</strong>
                        </button>
                        <button className={cx('action-btn')}>
                            <div className={cx('action-btn-icon')}>
                                <ChatIcon />
                            </div>
                            <strong>{data.comment}</strong>
                        </button>
                        <button
                            className={cx('action-btn', {
                                favourited: isFavourite,
                            })}
                            onClick={handleClickBtnFavourite}
                        >
                            <div className={cx('action-btn-icon')}>
                                <UncollectIcon />
                            </div>
                            <strong>{data.favourite}</strong>
                        </button>
                        <Menu items={SHARE_ITEMS} placement="top-start" offset={[-10, -5]} onChange={onChangeShareItem}>
                            <button className={cx('action-btn')}>
                                <div className={cx('action-btn-icon')}>
                                    <ShareIcon />
                                </div>
                                <strong>{data.share}</strong>
                            </button>
                        </Menu>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default memo(ContentItem);
