import classNames from 'classnames/bind';
import styles from './CommentList.module.scss';
import PropTypes from 'prop-types';
import CommentItem from './CommentItem';
import { ArrowIcon } from '../Icons';
import { useState } from 'react';

const cx = classNames.bind(styles);

function CommentList({ comment }) {
    const [showFeedback, setShowFeedback] = useState(false);
    return (
        <div key={comment.id} className={cx('comment-list')}>
            <CommentItem
                avt={comment.avt}
                nickname={comment.nickname}
                tick={comment.tick}
                creator={comment.creator}
                title={comment.title}
                timeago={comment.timeago}
                likes={comment.like}
            />
            {comment.feedback && (
                <>
                    {!showFeedback && (
                        <span className={cx('btn-show-all')} onClick={() => setShowFeedback(true)}>
                            View more replices ({comment.feedback.length}){' '}
                            <ArrowIcon className={cx('btn-arrow-up')} width="1.4rem" height="1.4rem" />
                        </span>
                    )}
                    {showFeedback && (
                        <>
                            <div className={cx('comment-feedback')}>
                                {comment.feedback.map((feedback, index) => (
                                    <CommentItem
                                        isFeedback
                                        key={index}
                                        avt={feedback.avt}
                                        nickname={feedback.nickname}
                                        tick={feedback.tick}
                                        creator={feedback.creator}
                                        title={feedback.title}
                                        timeago={feedback.timeago}
                                        likes={feedback.like}
                                    />
                                ))}
                            </div>
                            <span className={cx('btn-hide')} onClick={() => setShowFeedback(false)}>
                                Hide
                                <ArrowIcon className={cx('btn-arrow-down')} width="1.4rem" height="1.4rem" />
                            </span>
                        </>
                    )}
                </>
            )}
        </div>
    );
}

CommentList.propTypes = {
    comment: PropTypes.object.isRequired,
};

export default CommentList;
