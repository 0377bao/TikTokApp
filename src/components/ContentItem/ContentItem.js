import { memo, useCallback, useState } from 'react';
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
    LinkIcon,
    MessengerBgIcon,
    NoteMusicIcon,
    PhoneIcon,
    ShareIcon,
} from '../Icons';
import Menu from '../Popper/Menu';
import images from '~/assets/images';
import GroupVideo from '../GroupVideo';
import GroupButtonLike from '../GroupButtonLike/GroupButtonLike';
import GroupButtonFavourite from '../GroupButtonFavourite/GroupButtonFavourite';
import PostContent from '../PostContent/PostContent';
import { formatNumber } from '~/handleLogicLocal';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

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

function ContentItem({ data, index, isMuted, setMuted, unMuted, setIndexSingleVideo, thisVideoIsSingleVideo }) {
    const [isLiked, setIsLiked] = useState(false);
    const history = useNavigate();

    // chỉ dùng usecallback cho setlike để tránh render lại video vì video nặng
    const setLiked = useCallback(() => {
        setIsLiked(true);
    }, []);

    const unSetLiked = () => {
        setIsLiked(false);
    };

    const onChangeShareItem = (e) => {
        console.log(e);
    };

    return (
        <div className={cx('wrapper')} id={`content-item-id${index}`}>
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

                        <PostContent>{data.content}</PostContent>

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
                        {data.following ? (
                            <Button className={cx('button-btn')} following>
                                Following
                            </Button>
                        ) : (
                            <Button className={cx('button-btn')} outline>
                                Follow
                            </Button>
                        )}
                    </div>
                </div>
                <div className={cx('body')}>
                    <GroupVideo
                        data={data}
                        index={index}
                        isMuted={isMuted}
                        unMuted={unMuted}
                        setMuted={setMuted}
                        setLiked={setLiked}
                        setIndexSingleVideo={setIndexSingleVideo}
                        thisVideoIsSingleVideo={thisVideoIsSingleVideo}
                    />
                    <div className={cx('actions')}>
                        <GroupButtonLike value={data.like} liked={isLiked} unSetLiked={unSetLiked} />
                        <button
                            className={cx('action-btn')}
                            onClick={() => {
                                setIndexSingleVideo(index);
                            }}
                        >
                            <div className={cx('action-btn-icon')}>
                                <ChatIcon />
                            </div>
                            <strong>{formatNumber(data.comment)}</strong>
                        </button>
                        <GroupButtonFavourite value={data.favourite} />
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
