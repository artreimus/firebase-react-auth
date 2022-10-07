import React from 'react';
import { ROOT_FOLDER } from '../../hooks/useFolder';
import { Link } from 'react-router-dom';
import { useProvideContext } from '../../contexts/Context';

function FolderBreadcrumbs({ currentFolder }: any) {
  const { currentPage }: any = useProvideContext();

  let path = currentFolder === ROOT_FOLDER ? [] : [ROOT_FOLDER];
  if (currentFolder) {
    path = [...path, ...currentFolder.path];
  }

  return (
    <div className="breadcrumb">
      {path.map((folder, index) => {
        return (
          <div key={folder.id} className="breadcrumb_container_item center_all">
            <Link
              to={folder.id ? `/folder/${folder.id}` : `/${currentPage}`}
              className="breadcrumb_item link"
            >
              {folder.name}
            </Link>
            <div className="center_all breadcrumb_icon">
              <img
                src={require(`../../images/chevron-forward.png`)}
                alt="Pandora's Cloud Logo"
              />
            </div>
          </div>
        );
      })}
      {currentFolder && (
        <p className="breadcrumb_item_active center_all">
          {currentFolder.name}
        </p>
      )}
    </div>
  );
}

export default FolderBreadcrumbs;
