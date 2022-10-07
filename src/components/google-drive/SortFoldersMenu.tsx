import React, { useState } from 'react';
import { useProvideContext } from '../../contexts/Context';

function SortFoldersMenu() {
  const { setFolderSortType, folderSortType }: any = useProvideContext();

  const [isSortOpen, setIsSortOpen] = useState(false);

  function setItemStyle(type: string, order: string) {
    const styleSelected = { color: '#000000' };
    const styleNonSelected = { color: '#959595' };

    if (type === 'date') {
      if (order === 'asc') {
        return folderSortType.type === 'date' && folderSortType.order === 'asc'
          ? styleSelected
          : styleNonSelected;
      } else if (order === 'desc') {
        return folderSortType.type === 'date' && folderSortType.order === 'desc'
          ? styleSelected
          : styleNonSelected;
      }
    }

    if (type === 'name') {
      if (order === 'asc') {
        return folderSortType.type === 'name' && folderSortType.order === 'asc'
          ? styleSelected
          : styleNonSelected;
      } else if (order === 'desc') {
        return folderSortType.type === 'name' && folderSortType.order === 'desc'
          ? styleSelected
          : styleNonSelected;
      }
    }
  }

  function toggleVisibility() {
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
      <div
        className={isSortOpen ? 'bg_menu' : 'bg_menu hidden'}
        onClick={toggleVisibility}
      ></div>
      <div className="sort">
        <button className="sort_toggle center_all" onClick={toggleVisibility}>
          Sort
          <div className="center_all">
            <img
              src={require(`../../images/sort-menu.png`)}
              alt="Pandora's Cloud Logo"
            />
          </div>
        </button>
        <div className={setVisibility()}>
          <ul className="sort_list">
            <li
              className="sort_list_item"
              onClick={() => setFolderSortType({ type: 'name', order: 'asc' })}
              style={setItemStyle('name', 'asc')}
            >
              A to Z
            </li>
            <li
              className="sort_list_item"
              onClick={() => setFolderSortType({ type: 'name', order: 'desc' })}
              style={setItemStyle('name', 'desc')}
            >
              Z to A
            </li>
            <li
              className="sort_list_item"
              onClick={() => setFolderSortType({ type: 'date', order: 'asc' })}
              style={setItemStyle('date', 'asc')}
            >
              Last Updated
            </li>
            <li
              className="sort_list_item"
              onClick={() => setFolderSortType({ type: 'date', order: 'desc' })}
              style={setItemStyle('date', 'desc')}
            >
              Recently Updated
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default SortFoldersMenu;
