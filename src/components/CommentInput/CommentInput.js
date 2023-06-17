import classNames from 'classnames/bind';
import styles from './CommentInput.module.scss';
import TippyTooltip from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';
import { ACongIcon, FaceSmileIcon } from '../Icons';
import { useEffect, useRef, useState } from 'react';

const cx = classNames.bind(styles);

function CommentInput() {
    const [value, setValue] = useState('');
    const [rowInput, setRowInput] = useState(0);
    const btnPostRef = useRef();
    const inputRef = useRef();

    const handleOnchangeInput = (e) => {
        const valueChange = e.target.value;
        if (valueChange.length <= 150) {
            setValue(valueChange);
        }
        const span = document.createElement('span');
        span.style.visibility = 'hidden';
        span.style.position = 'absolute';
        span.style.whiteSpace = 'nowrap';
        span.style.fontSize = '1.4rem';
        span.style.fontWeight = '400';
        span.innerText = valueChange;

        document.body.appendChild(span);

        const width = span.clientWidth;
        const widthInput = inputRef.current.clientWidth - 21;
        const widthTimes = Math.floor(width / (widthInput + 1));
        document.body.removeChild(span);

        if (widthTimes != rowInput) {
            inputRef.current.style.height = 17 * (widthTimes + 1) + 'px';
            setRowInput(widthTimes);
        }
    };

    useEffect(() => {
        if (!!value.trim()) {
            btnPostRef.current.classList.add(cx('active'));
        } else {
            btnPostRef.current.classList.remove(cx('active'));
        }
    }, [value]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('group-input')}>
                <div className={cx('input-area-group')}>
                    <textarea
                        ref={inputRef}
                        rows="1"
                        className={cx('input-area')}
                        placeholder="Add comment..."
                        value={value}
                        onChange={handleOnchangeInput}
                    ></textarea>
                    {rowInput > 0 && <span className={cx('limit-text')}>{value.length}/150</span>}
                </div>
                <TippyTooltip content='"@" a user to tag them in your comments' animation="scale">
                    <span style={{ height: '40px' }}>
                        <ACongIcon />
                    </span>
                </TippyTooltip>
                <TippyTooltip content="Click to add emojis" animation="scale">
                    <span style={{ height: '40px' }}>
                        <FaceSmileIcon />
                    </span>
                </TippyTooltip>
            </div>
            <button ref={btnPostRef} className={cx('btn-post')}>
                Post
            </button>
        </div>
    );
}

export default CommentInput;
