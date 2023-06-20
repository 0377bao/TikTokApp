import classNames from 'classnames/bind';
import styles from './CommentList.module.scss';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Image from '../Image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { HeartRegularIcon, MoreIcon } from '../Icons';
import { formatNumber, handleHightlightContent } from '~/handleLogicLocal';

const cx = classNames.bind(styles);

function CommentItem({ isFeedback = false, avt, nickname, tick = false, creator = false, title, timeago, likes }) {
    return (
        <div className={cx('comment-item', { isFeedback })}>
            <Link to={`/profile/${nickname}`} className={cx('comment-item-avt')}>
                <Image src={avt} />
            </Link>
            <div className={cx('comment-item-content')}>
                <div className={cx('comment-item-brand')}>
                    <span className={cx('comment-item-name')}>{nickname}</span>
                    {tick && <FontAwesomeIcon icon={faCheckCircle} className={cx('comment-item-check')} />}
                    {creator && <span className={cx('comment-item-middot')}>&middot;</span>}
                    {creator && <span className={cx('comment-item-creator')}>Tác giả</span>}
                </div>
                <div className={cx('comment-item-title')}>
                    {handleHightlightContent(title).map((item, index) => {
                        return item.startsWith('@') || item.startsWith('#') ? (
                            <span key={index} className={cx('contentHighlight')}>
                                {item}
                            </span>
                        ) : (
                            item
                        );
                    })}
                </div>
                <div className={cx('comment-item-des')}>
                    <span className={cx('comment-item-time')}>{timeago}</span>
                    <span className={cx('comment-item-btn')}>Reply</span>
                </div>
            </div>
            <div className={cx('comment-item-info')}>
                <MoreIcon className={cx('comment-item-more')} width="2.4rem" height="2.4rem" />
                <div className={cx('comment-item-like')}>
                    <HeartRegularIcon /> <span>{formatNumber(likes)}</span>
                </div>
            </div>
        </div>
    );
}

CommentItem.propTypes = {
    avt: PropTypes.string.isRequired,
    nickname: PropTypes.string.isRequired,
    tick: PropTypes.bool,
    creator: PropTypes.bool,
    title: PropTypes.string.isRequired,
    timeago: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
};

export default CommentItem;
