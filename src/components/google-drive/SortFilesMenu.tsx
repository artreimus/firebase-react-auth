import React, { useState } from 'react';
import { useProvideContext } from '../../contexts/Context';

function SortFilesMenu() {
  const { setFileSortType, fileSortType }: any = useProvideContext();
  const [isSortOpen, setIsSortOpen] = useState(false);

  function setItemStyle(type: string, order: string) {
    const styleSelected = { color: '#000000' };
    const styleNonSelected = { color: '#959595' };

    if (type === 'date') {
      if (order === 'asc') {
        return fileSortType.type === 'date' && fileSortType.order === 'asc'
          ? styleSelected
          : styleNonSelected;
      } else if (order === 'desc') {
        return fileSortType.type === 'date' && fileSortType.order === 'desc'
          ? styleSelected
          : styleNonSelected;
      }
    }

    if (type === 'name') {
      if (order === 'asc') {
        return fileSortType.type === 'name' && fileSortType.order === 'asc'
          ? styleSelected
          : styleNonSelected;
      } else if (order === 'desc') {
        return fileSortType.type === 'name' && fileSortType.order === 'desc'
          ? styleSelected
          : styleNonSelected;
      }
    }

    if (type === 'size') {
      if (order === 'asc') {
        return fileSortType.type === 'size' && fileSortType.order === 'asc'
          ? styleSelected
          : styleNonSelected;
      } else if (order === 'desc') {
        return fileSortType.type === 'size' && fileSortType.order === 'desc'
          ? styleSelected
          : styleNonSelected;
      }
    }
  }

  function toggleMenu() {
    setIsSortOpen((prevIsSortOpen) => !prevIsSortOpen);
  }

  function setVisibility() {
    if (isSortOpen) {
      return 'sort_container_list';
    }
    return 'sort_container_list hidden';
  }

  return (
    <>
      <div className="sort">
        <div
          className={isSortOpen ? 'bg_menu' : 'bg_menu hidden'}
          onClick={toggleMenu}
        ></div>
        <button className="sort_toggle center_all" onClick={toggleMenu}>
          Sort
          <div className="center_all">
            <img src={require(`../../images/sort-menu.png`)} alt="sort icon" />
          </div>
        </button>
        <div className={setVisibility()}>
          <ul className="sort_list">
            <li
              className="sort_list_item"
              onClick={() => setFileSortType({ type: 'name', order: 'asc' })}
              style={setItemStyle('name', 'asc')}
            >
              A to Z
            </li>
            <li
              className="sort_list_item"
              onClick={() => setFileSortType({ type: 'name', order: 'desc' })}
              style={setItemStyle('name', 'desc')}
            >
              Z to A
            </li>
            <li
              className="sort_list_item"
              onClick={() => setFileSortType({ type: 'date', order: 'desc' })}
              style={setItemStyle('date', 'desc')}
            >
              Recent
            </li>
            <li
              className="sort_list_item"
              onClick={() => setFileSortType({ type: 'date', order: 'asc' })}
              style={setItemStyle('date', 'asc')}
            >
              Oldest
            </li>

            <li
              className="sort_list_item"
              onClick={() => setFileSortType({ type: 'size', order: 'asc' })}
              style={setItemStyle('size', 'asc')}
            >
              Size Asc
            </li>
            <li
              className="sort_list_item"
              onClick={() => setFileSortType({ type: 'size', order: 'desc' })}
              style={setItemStyle('size', 'desc')}
            >
              Size Desc
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default SortFilesMenu;
