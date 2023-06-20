import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Explore.module.scss';

const cx = classNames.bind(styles);

function HeaderItem({ icon, title, active = false, onClick }) {
    return (
        <div className={cx('header-item', { active })} onClick={() => onClick(title)}>
            {icon}
            <span className={cx('header-item-title')}>{title}</span>
        </div>
    );
}

HeaderItem.propTypes = {
    icon: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default HeaderItem;
