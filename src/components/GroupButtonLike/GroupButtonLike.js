import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './GroupButtonLike.module.scss';
import { useEffect, useState } from 'react';
import { HeartIcon } from '../Icons';

const cx = classNames.bind(styles);

const ItemEffectLike = () => {
    return (
        <div>
            <span className={cx('itemEffectLike--red')}></span>
            <span className={cx('itemEffectLike--red')}></span>
            <span className={cx('itemEffectLike--red')}></span>
            <span className={cx('itemEffectLike--red')}></span>
            <span className={cx('itemEffectLike--blue')}></span>
            <span className={cx('itemEffectLike--blue')}></span>
            <span className={cx('itemEffectLike--blue')}></span>
            <span className={cx('itemEffectLike--blue')}></span>
        </div>
    );
};

function GroupButtonLike({ value, liked, unSetLiked }) {
    const [isLiked, setIsLiked] = useState();

    const handleClickBtnLike = () => {
        setIsLiked(!isLiked);
    };

    useEffect(() => {
        setIsLiked(liked);
    }, [liked]);

    useEffect(() => {
        if (!isLiked) {
            unSetLiked();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLiked]);

    return (
        <button
            className={cx('action-btn', {
                liked: isLiked,
            })}
            onClick={handleClickBtnLike}
        >
            <div className={cx('action-btn-icon')}>
                <HeartIcon />
                {isLiked && <ItemEffectLike />}
            </div>
            <strong>{value}</strong>
        </button>
    );
}

GroupButtonLike.propTypes = {
    value: PropTypes.string.isRequired,
};

export default GroupButtonLike;
