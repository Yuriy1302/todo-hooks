import React, { useContext } from 'react';

import { FooterContex } from './service-context';

const filters = [
  ['all', 'All'],
  ['active', 'Active'],
  ['finished', 'Completed'],
];

const TaskFilter = () => {
  const { filterState, onFilterStateRename } = useContext(FooterContex);

  const onFilterSelection = (event) => {
    event.preventDefault();
    onFilterStateRename(event.target.name);
  };

  const renderFilterButtons = ([filterName, name], filter) => {
    const classNames = filterName === filter ? 'selected' : '';

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

  return <ul className="filters">{filters.map((el) => renderFilterButtons(el, filterState))}</ul>;
};

export default TaskFilter;
