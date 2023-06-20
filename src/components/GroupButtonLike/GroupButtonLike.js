import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './GroupButtonLike.module.scss';
import { useEffect, useState } from 'react';
import { HeartIcon } from '../Icons';
import { formatNumber } from '~/handleLogicLocal';

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

const defaultFn = () => {};

function GroupButtonLike({ value, className, liked, unSetLiked = defaultFn, isSingleVideo }) {
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
            className={
                cx('action-btn', {
                    liked: isLiked,
                    isSingleVideo,
                }) +
                ' ' +
                className
            }
            onClick={handleClickBtnLike}
        >
            <div className={cx('action-btn-icon')}>
                <HeartIcon />
                {isLiked && <ItemEffectLike />}
            </div>
            <strong>{formatNumber(value)}</strong>
        </button>
    );
}

GroupButtonLike.propTypes = {
    value: PropTypes.number.isRequired,
};

export default GroupButtonLike;
