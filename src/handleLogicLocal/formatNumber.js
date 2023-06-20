import PropTypes from 'prop-types';

function formatNumber(content) {
    let result;
    if (content >= 1000000) {
        const division = content / 1000000;
        if (Number.isInteger(division)) {
            result = division.toFixed(0) + 'M';
        } else {
            result = division.toFixed(1) + 'M';
        }
    } else if (content >= 10000) {
        const division = content / 1000;
        if (Number.isInteger(division)) {
            result = division.toFixed(0) + 'K';
        } else {
            result = division.toFixed(1) + 'K';
        }
    } else {
        result = content;
    }
    return result;
}

formatNumber.propTypes = {
    content: PropTypes.number.isRequired,
};

export default formatNumber;
