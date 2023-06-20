import PropTypes from 'prop-types';

function handleHightlightContent(content) {
    return content.split(/(?=[@# ])/);
}

handleHightlightContent.propTypes = {
    content: PropTypes.string.isRequired,
};

export default handleHightlightContent;
