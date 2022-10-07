import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import DeleteFolder from './DeleteFolder';
import { useState } from 'react';
import FavoriteFolder from './FavoriteFolder';

function Folder({ folder }: any) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function setVisibility() {
    if (!isMenuOpen) {
      return 'hidden';
    }
    return;
  }

  return (
    <>
      <div
        className={isMenuOpen ? 'bg_menu' : 'bg_menu hidden'}
        onClick={() => setIsMenuOpen((prevIsMenuOpen) => !prevIsMenuOpen)}
      ></div>

      <div className="folder_item center_all">
        <div className="item_menu">
          <button
            className="item_btn_menu folder_item_btn_menu"
            onClick={() => setIsMenuOpen((prevIsMenuOpen) => !prevIsMenuOpen)}
          >
            <img src={require(`../../images/menu.png`)} alt="Menu" />
          </button>
          <div className={`item_menu_container_list ${setVisibility()}`}>
            <ul className="item_menu_list">
              <li className="item_menu_list_item">
                <DeleteFolder folderId={folder.id} />
              </li>
              <li className="item_menu_list_item">
                <FavoriteFolder folder={folder} />
              </li>
            </ul>
          </div>
        </div>

        <Link to={`/folder/${folder.id}`} className="folder_item_link link">
          <div className="center_all">
            <FontAwesomeIcon icon={faFolder} className="folder_item_icon" />
          </div>
          <p className="folder_item_name">{folder.name}</p>
        </Link>
      </div>
    </>
  );
}

export default Folder;
