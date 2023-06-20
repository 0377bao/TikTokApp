import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import styles from './DefaultLayout.module.scss';
import { useEffect } from 'react';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    useEffect(() => window.scrollTo(0, 0), [children]);

    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                <Sidebar />
                <div className={cx('content')}>{children}</div>
            </div>
        </div>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DefaultLayout;
