import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './GroupButtonFavourite.module.scss';
import { UncollectIcon } from '../Icons';
import { useState } from 'react';
import { formatNumber } from '~/handleLogicLocal';

const cx = classNames.bind(styles);

function GroupButtonFavourite({ value, className, isSingleVideo }) {
    const [isFavourite, setIsFavourite] = useState(false);

    const handleClickBtnFavourite = () => {
        setIsFavourite(!isFavourite);
    };

    return (
        <button
            className={
                cx('action-btn', {
                    favourited: isFavourite,
                    isSingleVideo,
                }) +
                ' ' +
                className
            }
            onClick={handleClickBtnFavourite}
        >
            <div className={cx('action-btn-icon')}>
                <UncollectIcon />
            </div>
            <strong>{formatNumber(value)}</strong>
        </button>
    );
}

GroupButtonFavourite.propTypes = {
    value: PropTypes.number.isRequired,
};

export default GroupButtonFavourite;
