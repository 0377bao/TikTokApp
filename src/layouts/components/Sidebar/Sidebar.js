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

const cx = classNames.bind(styles);

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
        </nav>
    );
}

export default Sidebar;
