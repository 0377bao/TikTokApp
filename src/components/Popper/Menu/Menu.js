import PropTypes from 'prop-types';
import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import { Wrapper as PoperWrapper } from '~/components/Popper';
import MenuItem from './MenuItem';
import Header from './Header';
import { useCallback, useState } from 'react';

const cx = classNames.bind(styles);

const defaultFn = () => {};

function Menu({
    children,
    items = [],
    hideOnClick = false,
    onChange = defaultFn,
    placement = 'bottom-end',
    offset = [12, 8],
}) {
    const [history, setHistory] = useState([{ data: items }]);
    const current = history[history.length - 1];

    const handleComeBackHistory = useCallback(() => {
        setHistory((prev) => prev.slice(0, prev.length - 1));
    });

    const handleRenderitem = () => {
        return current.data.map((item, index) => {
            const isParent = !!item.children;

            return (
                <MenuItem
                    onClick={() => {
                        if (isParent) {
                            setHistory((prev) => [...prev, item.children]);
                        } else {
                            onChange(item);
                        }
                    }}
                    data={item}
                    key={index}
                />
            );
        });
    };

    return (
        <Tippy
            hideOnClick={hideOnClick}
            delay={[0, 600]}
            offset={offset}
            interactive
            placement={placement}
            render={(attrs) => (
                <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
                    <PoperWrapper className={cx('menu-popper')}>
                        {history.length > 1 && <Header title={current.title} onHeader={handleComeBackHistory} />}
                        <div className={cx('menu-body')}>{handleRenderitem()}</div>
                    </PoperWrapper>
                </div>
            )}
            onHidden={() => setHistory((prev) => prev.slice(0, 1))}
        >
            {children}
        </Tippy>
    );
}

Menu.propTypes = {
    children: PropTypes.node.isRequired,
    items: PropTypes.array,
    hideOnClick: PropTypes.bool,
    onChange: PropTypes.func,
};

export default Menu;
