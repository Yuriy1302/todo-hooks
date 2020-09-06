import React, { useContext } from 'react';
import { FooterContex } from './App';

/* import PropTypes from 'prop-types'; */

const filters = [
  ['all', 'All'],
  ['active', 'Active'],
  ['finished', 'Completed'],
];

const TaskFilter = (props) => {

  const { filterState, onFilterStateRename } = useContext(FooterContex);
  
  const onFilterSelection = (event) => {
    event.preventDefault();
    onFilterStateRename(event.target.name);
  };

  const renderFilterButtons = ([filterName, name], filterState) => {
    const classNames = filterName === filterState ? 'selected' : '';
    
    return (
      <li key={filterName}>
        <button
          type="button"
          className={classNames}
          name={filterName}
          data-test={`task-filter-${filterName}`}
          onClick={onFilterSelection}
        >
          {name}
        </button>
      </li>
    );
  };

  return (
    <ul className="filters">
      {filters.map((el) => renderFilterButtons(el, filterState))}
    </ul>
  );
  
}

/* Filter.propTypes = {
  filterState: PropTypes.string.isRequired,
  onFilterNameChange: PropTypes.func.isRequired,
}; */

export default TaskFilter;