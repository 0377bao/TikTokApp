import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import TippyTooltip from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import styles from './Header.module.scss';
import images from '~/assets/images';
import Button from '~/components/Button';
import Menu from '~/components/Popper/Menu';
import {
    CircleQuestionIcon,
    GearIcon,
    KeyboardIcon,
    LanguageIcon,
    MailboxIcon,
    MessengerIcon,
    SignOutIcon,
    TiktokCoinsIcon,
    UploadIcon,
    UserIcon,
} from '~/components/Icons';
import Image from '~/components/Image';
import Search from '../Search';
import routes from '~/config/routes';

const cx = classNames.bind(styles);
const MENU_ITEMS = [
    {
        icon: <LanguageIcon />,
        title: 'Tiếng Việt',
        children: {
            title: 'Language',
            data: [
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
            ],
        },
    },
    {
        icon: <CircleQuestionIcon />,
        title: 'Feedback and hepls',
        to: '/feedback',
    },
    {
        icon: <KeyboardIcon />,
        title: 'Keyboard shortcuts',
    },
];

function Header() {
    const currentUser = true;

    const userMenu = [
        {
            icon: <UserIcon />,
            title: 'View profile',
            to: '/profile',
        },
        {
            icon: <TiktokCoinsIcon />,
            title: 'Get coins',
            to: '/getcoins',
        },
        {
            icon: <GearIcon />,
            title: 'Settings',
            to: '/settings',
        },
        ...MENU_ITEMS,
        {
            icon: <SignOutIcon />,
            title: 'Log out',
            type: 'border-top',
        },
    ];

    //handle logic
    const handleMenuOnchange = (item) => {
        console.log(item);
    };

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Link to={routes.root} className={cx('logo')}>
                    <img src={images.logo} alt="Tiktok" />
                </Link>

                <Search />

                <div className={cx('actions')}>
                    {currentUser ? (
                        <>
                            <TippyTooltip content="Upload video" placement="bottom" animation="scale">
                                <button className={cx('action-btn')}>
                                    <UploadIcon />
                                </button>
                            </TippyTooltip>
                            <TippyTooltip content="Messenger" placement="bottom" animation="scale">
                                <button className={cx('action-btn')}>
                                    <MessengerIcon />
                                </button>
                            </TippyTooltip>
                            <TippyTooltip content="Notification" placement="bottom" animation="scale">
                                <button className={cx('action-btn', 'action-btn--notify')}>
                                    <MailboxIcon />
                                    <span className={cx('label-notify')}>23</span>
                                </button>
                            </TippyTooltip>
                        </>
                    ) : (
                        <>
                            <Button text>Upload</Button>
                            <Button primary>Log in</Button>
                        </>
                    )}

                    <Menu items={currentUser ? userMenu : MENU_ITEMS} onChange={handleMenuOnchange}>
                        {currentUser ? (
                            <Image className={cx('action-avt')} src={images.avtUser} alt="Huynh Quoc Bao"></Image>
                        ) : (
                            <button className={cx('more-icon')}>
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </button>
                        )}
                    </Menu>
                </div>
            </div>
        </header>
    );
}

export default Header;
