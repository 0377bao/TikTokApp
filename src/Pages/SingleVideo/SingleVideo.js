/* eslint-disable jsx-a11y/anchor-is-valid */
import { useCallback, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import TippyTooltip from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';

import styles from './SingleVideo.module.scss';
import GroupVideo from '~/components/GroupVideo';
import videos from '~/assets/videos';
import Button from '~/components/Button';
import {
    ArrowIcon,
    ChatIcon,
    CloseIcon,
    FacebookIcon,
    LinkIcon,
    MessengerBgIcon,
    NoteMusicIcon,
    PhoneIcon,
    ShareIcon,
} from '~/components/Icons';
import images from '~/assets/images';
import Image from '~/components/Image/Image';
import PostContent from '~/components/PostContent/PostContent';
import GroupButtonLike from '~/components/GroupButtonLike/GroupButtonLike';
import GroupButtonFavourite from '~/components/GroupButtonFavourite/GroupButtonFavourite';
import CommentInput from '~/components/CommentInput/CommentInput';

const cx = classNames.bind(styles);

function SingleVideo() {
    const [isMuted, setIsMuted] = useState(true);
    const backGroundVideoRef = useRef();
    const [isLiked, setIsLiked] = useState(false);

    // chỉ dùng usecallback cho setlike để tránh render lại video vì video nặng
    const setLiked = useCallback(() => {
        setIsLiked(true);
    }, []);

    const unSetLiked = () => {
        setIsLiked(false);
    };

    const setMuted = useCallback(() => {
        setIsMuted(true);
    }, []);

    const unMuted = useCallback(() => {
        setIsMuted(false);
    }, []);

    const setBackgroundSingleVideo = useCallback((url) => {
        backGroundVideoRef.current.style.background = `url(${url}) no-repeat center /cover`;
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div ref={backGroundVideoRef} className={cx('container')}>
                <div className={cx('background')}></div>
                <GroupVideo
                    data={{ video: videos.video3 }}
                    isMuted={isMuted}
                    setMuted={setMuted}
                    unMuted={unMuted}
                    setLiked={setLiked}
                    isSingleVideo
                    setBackgroundSingleVideo={setBackgroundSingleVideo}
                />
                <div className={cx('action')}>
                    <Link to="/" className={cx('up-btn')}>
                        <ArrowIcon />
                    </Link>
                    <Link to="/" className={cx('down-btn')}>
                        <ArrowIcon />
                    </Link>
                </div>
                <a
                    onClick={() => {
                        window.history.back();
                    }}
                    className={cx('close-btn')}
                >
                    <CloseIcon />
                </a>

                <Image className={cx('logo-tiktok')} src={images.logotiktok} />
            </div>
            <div className={cx('content')}>
                <div className={cx('info')}>
                    <div className={cx('info-brand')}>
                        <div className={cx('info-author')}>
                            <Image className={cx('info-author-img')} src={images.avtUser} />
                            <div className={cx('info-author-des')}>
                                <div className={cx('info-author-name')}>
                                    <span>hynstyle</span>
                                    <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
                                </div>
                                <div className={cx('info-author-time')}>
                                    <span>Huynh quoc bao</span>
                                    <span style={{ margin: '0px 4px' }}>&middot;</span>
                                    <p>4-27</p>
                                </div>
                            </div>
                        </div>
                        <div className={cx('info-btnFl')}>
                            <Button outline>Follow</Button>
                        </div>
                    </div>

                    <div className={cx('info-contentpost')}>
                        <PostContent>nhạc ngắn theee #vacaiket #nhanvatchinh #xuhuong2023 #fyp</PostContent>
                    </div>

                    {/* <div className={cx('info-capcut')}>
                        <div className={cx('capcut')}>
                            <img className={cx('capcut-logo')} src={images.capCutLogo} alt="Logo" />
                            <p className={cx('capcut-content')}>CapCut | Edit like a pro</p>
                        </div>
                    </div> */}

                    <div className={cx('info-sound')}>
                        <NoteMusicIcon className={cx('sound-icon')} width="16" height="16" />
                        <span className={cx('name-sound')}>Nhạc nền - Quốc Bảo</span>
                    </div>

                    <div className={cx('info-action')}>
                        <div className={cx('info-action-btn')}>
                            <div className={cx('info-action-left')}>
                                <GroupButtonLike
                                    className={cx('action-btn')}
                                    value="58.5k"
                                    isSingleVideo
                                    liked={isLiked}
                                    unSetLiked={unSetLiked}
                                />
                                <button className={cx('action-btn')}>
                                    <div className={cx('action-btn-icon')}>
                                        <ChatIcon />
                                    </div>
                                    <strong>15</strong>
                                </button>
                                <GroupButtonFavourite className={cx('action-btn')} value="2016" isSingleVideo />
                            </div>
                            <div className={cx('info-action-right')}>
                                <TippyTooltip content="Embed" animation="scale">
                                    <button style={{ background: 'transparent' }}>
                                        <LinkIcon width="2.4rem" height="2.4rem" />
                                    </button>
                                </TippyTooltip>
                                <TippyTooltip content="Send to friends" animation="scale">
                                    <button style={{ background: 'transparent' }}>
                                        <MessengerBgIcon width="2.4rem" height="2.4rem" />
                                    </button>
                                </TippyTooltip>
                                <TippyTooltip content="Share to Facebook" animation="scale">
                                    <button style={{ background: 'transparent' }}>
                                        <FacebookIcon width="2.4rem" height="2.4rem" />
                                    </button>
                                </TippyTooltip>
                                <TippyTooltip content="Share to WhatsApp" animation="scale">
                                    <button style={{ background: 'transparent' }}>
                                        <PhoneIcon width="2.4rem" height="2.4rem" />
                                    </button>
                                </TippyTooltip>
                                <ShareIcon width="2.4rem" height="2.4rem" className={cx('share-icon')} />
                            </div>
                        </div>
                        <div className={cx('info-action-link')}>
                            <p className={cx('info-action-linktext')}>
                                https://www.tiktok.com/@lphuong.trinh/video/7221911611680754971?is_from_webapp=1&sender_device=pc&web_id=7089226156663342593
                            </p>
                            <button className={cx('info-action-linkbtn')}>Copy link</button>
                        </div>
                    </div>
                </div>
                <div className={cx('comment')}>
                    <div className={cx('comment-list')}></div>
                    <div className={cx('comment-input')}>
                        <CommentInput />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SingleVideo;
