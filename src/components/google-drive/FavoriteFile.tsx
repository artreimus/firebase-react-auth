import React from 'react';
import { database } from '../../firebase';

function FavoriteFile({ file }: any) {
  function favoriteFile() {
    database.files.doc(file.id).update({
      createdAt: database.getCurrentTimeStamps(),
      isFavorite: !file.isFavorite,
    });
  }

  return (
    <button onClick={favoriteFile} className="item_menu_button">
      {file.isFavorite ? 'Unfavorite' : 'Favorite'}
    </button>
  );
}

export default FavoriteFile;
