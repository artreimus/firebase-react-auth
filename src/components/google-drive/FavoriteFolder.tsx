import React from 'react';
import { database } from '../../firebase';

function FavoriteFolder({ folder }: any) {
  function favoriteFile() {
    database.folders.doc(folder.id).update({
      createdAt: database.getCurrentTimeStamps(),
      isFavorite: !folder.isFavorite,
    });
  }

  return (
    <button onClick={favoriteFile} className="item_menu_button">
      {folder.isFavorite ? 'Unfavorite' : 'Favorite'}
    </button>
  );
}

export default FavoriteFolder;
