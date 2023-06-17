import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './PostContent.module.scss';
import Button from '../Button/Button';
import { useEffect, useRef } from 'react';
import handleHightlightContent from '~/handleLogicLocal/handleHightlightContent';

const cx = classNames.bind(styles);

function PostContent({ children, className }) {
    const contentPost = useRef();

    useEffect(() => {
        const height = contentPost.current.clientHeight;
        if (height > 90) {
            contentPost.current.classList.add(cx('ismore'));
        }
    }, []);

    return (
        <div className={cx('content-des', { className })} ref={contentPost}>
            <Button
                className={cx('content-des--more', 'more')}
                onClick={() => contentPost.current.classList.replace(cx('ismore'), cx('isless'))}
            >
                More
            </Button>
            <Button
                className={cx('content-des--more', 'less')}
                onClick={() => contentPost.current.classList.replace(cx('isless'), cx('ismore'))}
            >
                Less
            </Button>
            <div className={cx('group-content')}>
                {handleHightlightContent(children).map((item, index) => {
                    return item.startsWith('@') || item.startsWith('#') ? (
                        <span key={index} className={cx('contentHighlight')}>
                            {item}
                        </span>
                    ) : (
                        item
                    );
                })}
            </div>
        </div>
    );
}

PostContent.propTypes = {
    children: PropTypes.string.isRequired,
};

export default PostContent;
