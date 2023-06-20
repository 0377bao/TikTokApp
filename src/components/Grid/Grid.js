import PropTypes from 'prop-types';
import './Grid.css';

function Grid({ children }) {
    return children;
}

Grid.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Grid;
