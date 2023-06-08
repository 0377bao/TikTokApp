import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import { Wrapper as PoperWrapper } from '~/components/Popper';
import MenuItem from './MenuItem';
import Header from './Header';
import { useCallback, useState } from 'react';

const cx = classNames.bind(styles);

function Menu({ children, items = [] }) {
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
            delay={[0, 600]}
            interactive
            placement="bottom-end"
            render={(attrs) => (
                <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
                    <PoperWrapper className={cx('menu-popper')}>
                        {history.length > 1 && <Header title={current.title} onHeader={handleComeBackHistory} />}
                        {handleRenderitem()}
                    </PoperWrapper>
                </div>
            )}
            onHidden={() => setHistory((prev) => prev.slice(0, 1))}
        >
            {children}
        </Tippy>
    );
}

export default Menu;
