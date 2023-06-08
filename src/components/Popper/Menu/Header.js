import Button from '~/components/Button';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Header({ title, onHeader }) {
    return (
        <header className={cx('header')}>
            <Button className={cx('header-btn')} onClick={onHeader}>
                <FontAwesomeIcon icon={faChevronLeft} />
            </Button>
            <h4 className={cx('header-title')}>{title}</h4>
        </header>
    );
}

export default Header;
