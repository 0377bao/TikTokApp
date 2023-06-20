import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Explore.module.scss';
import { HeartRegularIcon, PlayNoBGIcon } from '~/components/Icons';
import { formatNumber, handleHightlightContent } from '~/handleLogicLocal';
import Image from '~/components/Image';

const cx = classNames.bind(styles);

function ExploreItem({ data, index, onClick }) {
    return (
        <div className="col l-4">
            <div className={cx('explore-item-wrapper')} onClick={() => onClick(index)}>
                <div className={cx('explore-item-groupvideo')}>
                    <video className={cx('explore-item-video')} src={data.video} />
                    <div className={cx('expplore-item-view')}>
                        <PlayNoBGIcon width="2rem" height="2rem" />
                        <span>{formatNumber(data.view)}</span>
                    </div>
                </div>
                <div className={cx('explore-item-content')}>
                    {handleHightlightContent(data.content).map((item, index) => {
                        return item.startsWith('@') || item.startsWith('#') ? (
                            <span key={index} className={cx('contentHighlight')}>
                                {item}
                            </span>
                        ) : (
                            item
                        );
                    })}
                </div>
                <div className={cx('explore-item-info')}>
                    <div className={cx('explore-item-brand')}>
                        <Image className={cx('explore-item-avt')} src={data.avatar} />
                        <span className={cx('explore-item-name')}>{data.nickname}</span>
                    </div>

                    <div className={cx('explore-item-likes')}>
                        <HeartRegularIcon />
                        <span className={cx('explore-item-like')}>{formatNumber(data.like)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

ExploreItem.propTypes = {
    data: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default ExploreItem;
