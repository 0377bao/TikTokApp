import PropTypes from 'prop-types';
import Button from '~/components/Button';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

function MenuItem({ data, onClick }) {
    return (
        <Button
            className={cx('menu-item', {
                [data.type]: data.type,
            })}
            onClick={onClick}
            leftIcon={data.icon}
            to={data.to}
        >
            {data.title}
        </Button>
    );
}

MenuItem.propTypes = {
    data: PropTypes.object.isRequired,
    onclick: PropTypes.func,
};

export default MenuItem;
