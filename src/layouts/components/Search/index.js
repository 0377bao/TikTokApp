import { useEffect, useRef, useState } from 'react';
import AccountItem from '~/components/AccountItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';
import { faSpinner, faCircleXmark } from '@fortawesome/free-solid-svg-icons';

import * as SearchService from '~/services/searchService';
import styles from './Search.module.scss';
import { Wrapper as PoperWrapper } from '~/components/Popper';
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

        const fetchApi = async () => {
            setShowLoading(true);

            const res = await SearchService.Search(debounce);
            setSearchResult(res.data);

            setShowLoading(false);
        };

        fetchApi();
    }, [debounce]);

    const handleClear = () => {
        setSearchValue('');
        setSearchResult([]);
        searchElement.current.focus();
    };

    const handleChange = (e) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    };

    const handleHideResult = () => setShowResult(false);

    return (
        // Using a wrapper <div> or <span> tag around the reference element solves this by creating a new parentNode context.
        <div>
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
                        onChange={handleChange}
                        onFocus={() => setShowResult(true)}
                    />
                    {!!searchValue && !showLoading && (
                        <button className={cx('close')} onClick={handleClear}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    )}
                    {showLoading && <FontAwesomeIcon className={cx('spiner')} icon={faSpinner} />}
                    <button className={cx('search-btn')} onMouseDown={(e) => e.preventDefault()}>
                        <SearchIcon />
                    </button>
                </div>
            </Tippy>
        </div>
    );
}

export default Search;
