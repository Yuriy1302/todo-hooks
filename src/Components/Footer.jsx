import React, { useContext } from 'react';

import TaskFilter from './TaskFilter';

import { FooterContex } from './service-context';

const Footer = () => {
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

export default Footer;
