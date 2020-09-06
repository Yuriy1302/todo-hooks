import React, { useContext } from 'react';
// import PropTypes from 'prop-types';

import TaskFilter from './TaskFilter';

import { FooterContex } from './App';

const Footer = (props) => {
  
  const { countItems, onClearCompleted } = useContext(FooterContex);
  
  return (
    <footer className="footer">
      <span className="todo-count">{countItems} items left</span>
      <TaskFilter />
      <button type="button" className="clear-completed" onClick={onClearCompleted}>
        Clear completed
      </button>
    </footer>
  );
};

/* Footer.propTypes = {
  countItems: PropTypes.number.isRequired,
  filterState: PropTypes.string.isRequired,
  onFilterNameChange: PropTypes.func.isRequired,
  onClearCompleted: PropTypes.func.isRequired,
}; */

export default Footer;