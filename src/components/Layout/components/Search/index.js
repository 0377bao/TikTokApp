import AccountItem from '~/components/AccountItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import TippyTooltip from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';
import { faSpinner, faCircleXmark } from '@fortawesome/free-solid-svg-icons';

import styles from './Search.module.scss';
import { Wrapper as PoperWrapper } from '~/components/Popper';
import { useEffect, useRef, useState } from 'react';
import { SearchIcon } from '~/components/Icons';
import { useDebounce } from '~/hooks';

const cx = classNames.bind(styles);

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(true);
    const [showLoading, setShowLoading] = useState(false);

    const debounce = useDebounce(searchValue, 500);
    const searchElement = useRef();

    useEffect(() => {
        if (!debounce.trim()) {
            setSearchResult([]);
            return;
        }

        setShowLoading(true);

        fetch(`https://tiktok.fullstack.edu.vn/api/users/search?q=${encodeURIComponent(debounce)}&type=less`)
            .then((res) => res.json())
            .then((json) => {
                setSearchResult(json.data);
                setShowLoading(false);
            })
            .catch(() => {
                setShowLoading(false);
            });
    }, [debounce]);

    const handleClear = () => {
        setSearchValue('');
        setSearchResult([]);
        searchElement.current.focus();
    };

    const handleHideResult = () => setShowResult(false);

    return (
        <Tippy
            // Có thể selec được items
            interactive
            // xét ẩn hiện của tippy
            visible={searchResult.length > 0 && showResult}
            // render ra component của phần tử hover
            render={(attrs) => (
                <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                    <PoperWrapper>
                        <h4 className={cx('search-title')}>Account</h4>
                        {searchResult.map((item) => (
                            <AccountItem data={item} key={item.id} />
                        ))}
                    </PoperWrapper>
                </div>
            )}
            onClickOutside={handleHideResult}
        >
            <div className={cx('search')}>
                <input
                    ref={searchElement}
                    placeholder="Search account and videos"
                    spellCheck={false}
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onFocus={() => setShowResult(true)}
                />
                {!!searchValue && !showLoading && (
                    <button className={cx('close')} onClick={handleClear}>
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                )}
                {showLoading && <FontAwesomeIcon className={cx('spiner')} icon={faSpinner} />}
                <TippyTooltip animation="scale" content="Tìm kiếm">
                    <button className={cx('search-btn')}>
                        <SearchIcon />
                    </button>
                </TippyTooltip>
            </div>
        </Tippy>
    );
}

export default Search;
