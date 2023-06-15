import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import Menu, { MenuItem } from './Menu';
import config from '~/config';
import {
    HomeIcon,
    HomeActiveIcon,
    DoubleUserIcon,
    DoubleUserActiveIcon,
    CompassIcon,
    CompassActiveIcon,
    CameraIcon,
    CameraActiveIcon,
} from '~/components/Icons';
import SuggestedAccounts from '~/components/SuggestedAccount/SuggestedAccounts';

const cx = classNames.bind(styles);

const optionsBrand = [
    'About',
    'Newsroom',
    'Contact',
    'Careers',
    'ByteDance',
    'TikTok for Good',
    'Advresite',
    'Deverloper',
    'Transperance',
    'TikTok Reward',
    'TikTok Embeds',
    'Help',
    'Safety',
    'Privacy',
    'Creator',
    'Portal',
    'Comuinity',
];

function Sidebar() {
    return (
        <nav className={cx('wrapper')}>
            <Menu>
                <MenuItem
                    title="For your"
                    to={config.routes.root}
                    iconDefault={<HomeIcon />}
                    iconActive={<HomeActiveIcon />}
                />
                <MenuItem
                    title="Following"
                    to={config.routes.following}
                    iconDefault={<DoubleUserIcon />}
                    iconActive={<DoubleUserActiveIcon />}
                />
                <MenuItem
                    title="Explore"
                    to={config.routes.explore}
                    iconDefault={<CompassIcon />}
                    iconActive={<CompassActiveIcon />}
                />
                <MenuItem
                    title="LIVE"
                    to={config.routes.live}
                    iconDefault={<CameraIcon />}
                    iconActive={<CameraActiveIcon />}
                />
            </Menu>
            <SuggestedAccounts label="Suggest Account" />
            <SuggestedAccounts label="Following Account" />
            <div className={cx('brand-info')}>
                {optionsBrand.map((item, index) => (
                    // eslint-disable-next-line jsx-a11y/anchor-is-valid
                    <a key={index} href="#" className={cx('brand-item')}>
                        {item}
                    </a>
                ))}
            </div>

            <span className={cx('tiktok-brand')}>&copy;2023 TikTok</span>
        </nav>
    );
}

export default Sidebar;
