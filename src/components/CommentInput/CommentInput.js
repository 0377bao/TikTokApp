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
    const [rowInput, setRowInput] = useState(17);
    const btnPostRef = useRef();
    const inputRef = useRef();
    const inputRefHeight = useRef();

    const handleOnchangeInput = (e) => {
        const valueChange = e.target.value;
        if (valueChange.length <= 150) {
            setValue(valueChange);
        }
    };

    useEffect(() => {
        if (!!value.trim()) {
            btnPostRef.current.classList.add(cx('active'));
        } else {
            btnPostRef.current.classList.remove(cx('active'));
        }

        const heightValue = inputRefHeight.current.scrollHeight;

        if (heightValue != rowInput) {
            inputRef.current.style.height = heightValue + 'px';
            setRowInput(heightValue);
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
                    <textarea
                        ref={inputRefHeight}
                        rows="1"
                        className={cx('input-area', 'input-height')}
                        value={value}
                        onChange={() => {}}
                    ></textarea>
                    {rowInput > 17 && <span className={cx('limit-text')}>{value.length}/150</span>}
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
