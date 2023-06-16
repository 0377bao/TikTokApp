import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './GroupVideo.module.scss';
import { MutedIcon, PauseIcon, PlayIcon, UnMutedIcon } from '../Icons';
import { memo, useEffect, useRef, useState } from 'react';
import textElemts from '~/convertElementToText';
import { useNavigate } from 'react-router-dom';
import { useElementOnScreen } from '~/hooks';

const cx = classNames.bind(styles);

function GroupVideo({ data, isMuted, unMuted, setMuted, setLiked }) {
    const history = useNavigate();
    const videoRef = useRef();
    const groupVideoRef = useRef();
    const [playing, setPlaying] = useState(false);
    // phần biến cho hiệu ứng clickvideo
    let clickVideoCount = useRef(0);
    let clickVideoTimeOut = useRef();
    let canSingleClickVideo = useRef(true);
    let canSingleClickVideoTimeout = useRef();

    const handleOnclickOptionVideo = () => {
        if (!playing) {
            videoRef.current.play();
            setPlaying(!playing);
        } else {
            videoRef.current.pause();
            setPlaying(!playing);
        }
    };

    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.7,
    };
    const isVisibile = useElementOnScreen(options, videoRef);

    useEffect(() => {
        if (isVisibile) {
            if (!playing) {
                videoRef.current.play();
                setPlaying(true);
            }
        } else {
            if (playing) {
                videoRef.current.pause();
                setPlaying(false);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isVisibile]);

    const handleDbClickVideo = (e) => {
        const svg = document.createElement('svg');
        const classes = cx('heartEffect');
        const x = e.nativeEvent.offsetX;
        const y = e.nativeEvent.offsetY;
        const rotate = Math.floor(Math.random() * 20 - 10);
        svg.innerHTML = textElemts.heartPath(classes, x, y, rotate);

        groupVideoRef.current.appendChild(svg);
        setLiked();

        setTimeout(() => {
            groupVideoRef.current && groupVideoRef.current.removeChild(svg);
        }, 10000);
    };

    const handleClickVideo = (e) => {
        clickVideoCount.current++;
        clearTimeout(clickVideoTimeOut.current);
        if (clickVideoCount.current === 2) {
            clearTimeout(canSingleClickVideoTimeout.current);
            handleDbClickVideo(e);
            clickVideoCount.current = 0;
            canSingleClickVideo.current = false;
            canSingleClickVideoTimeout.current = setTimeout(() => {
                canSingleClickVideo.current = true;
                clickVideoCount.current = 0;
            }, 1000);
        } else {
            if (clickVideoCount.current === 1 && canSingleClickVideo.current) {
                clickVideoTimeOut.current = setTimeout(() => {
                    clickVideoCount.current = 0;
                    history(`/video/@${data.nickname}/${data.id_video}`);
                }, 300);
            }
        }
    };

    return (
        <div className={cx('group-video')} ref={groupVideoRef}>
            <video
                muted={isMuted}
                className={cx('video', 'ispause')}
                ref={videoRef}
                src={data.video}
                loop
                onClick={handleClickVideo}
                onPlay={() => videoRef.current.classList.replace(cx('ispause'), cx('isplay'))}
                onPause={() => videoRef.current.classList.replace(cx('isplay'), cx('ispause'))}
            />
            {isMuted && <MutedIcon className={cx('mutedicon')} onClick={unMuted} />}
            {!isMuted && <UnMutedIcon className={cx('mutedicon')} onClick={setMuted} />}

            <PauseIcon className={cx('pauseicon')} onClick={handleOnclickOptionVideo} />
            <PlayIcon className={cx('playicon')} onClick={handleOnclickOptionVideo} />
        </div>
    );
}

GroupVideo.propTypes = {
    data: PropTypes.object.isRequired,
    isMuted: PropTypes.bool.isRequired,
    unMuted: PropTypes.func.isRequired,
    setMuted: PropTypes.func.isRequired,
};

export default memo(GroupVideo);