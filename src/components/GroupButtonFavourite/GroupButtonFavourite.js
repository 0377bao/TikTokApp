import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './GroupButtonFavourite.module.scss';
import { UncollectIcon } from '../Icons';
import { useState } from 'react';

const cx = classNames.bind(styles);

function GroupButtonFavourite({ value }) {
    const [isFavourite, setIsFavourite] = useState(false);

    const handleClickBtnFavourite = () => {
        setIsFavourite(!isFavourite);
    };

    return (
        <button
            className={cx('action-btn', {
                favourited: isFavourite,
            })}
            onClick={handleClickBtnFavourite}
        >
            <div className={cx('action-btn-icon')}>
                <UncollectIcon />
            </div>
            <strong>{value}</strong>
        </button>
    );
}

GroupButtonFavourite.propTypes = {
    value: PropTypes.string.isRequired,
};

export default GroupButtonFavourite;
