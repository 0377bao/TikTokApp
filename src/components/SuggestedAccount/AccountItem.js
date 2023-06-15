import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';

import styles from './SuggestedAccounts.module.scss';
import Image from '../Image';
import images from '~/assets/images';
import { Wrapper } from '../Popper';
import AccountPreview from './AccountPreview/AccountPreview';

const cx = classNames.bind(styles);

function AccountItem() {
    const renderPreview = (attrs) => (
        <div className={cx('preview')} {...attrs} tabIndex="-1">
            <Wrapper>
                <AccountPreview />
            </Wrapper>
        </div>
    );

    return (
        // fix bug div for tippy warning
        <div>
            <Tippy interactive delay={[800, 0]} offset={[-20, 0]} placement="bottom-start" render={renderPreview}>
                <div className={cx('account-item')}>
                    <Image className={cx('avatar')} src={images.avtUser} alt="" />
                    <div className={cx('item-info')}>
                        <p className={cx('nickname')}>
                            <strong>Baoquochuynh</strong>
                            <FontAwesomeIcon icon={faCheckCircle} className={cx('check')} />
                        </p>
                        <p className={cx('name')}>Huỳnh Quốc Bảo</p>
                    </div>
                </div>
            </Tippy>
        </div>
    );
}

AccountItem.propTypes = {};

export default AccountItem;
