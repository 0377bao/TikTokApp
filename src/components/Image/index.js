import { forwardRef, useState } from 'react';
import classNames from 'classnames';
import styles from './Image.module.scss';
import images from '~/assets/images';

function Image({ className, alt, src, ...props }, ref) {
    const [fallBack, setFellBack] = useState('');

    const handleError = () => {
        setFellBack(images.noImg);
    };

    return (
        <img
            src={fallBack || src}
            ref={ref}
            className={classNames(styles.wrapper, className)}
            {...props}
            alt={alt}
            onError={handleError}
        />
    );
}

export default forwardRef(Image);
