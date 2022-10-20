import React from 'react';

interface PropType {
  fileName: string;
  userId: string;
  fileUrl: string;
}

function DownloadFile({ fileName, userId, fileUrl }: PropType) {
  return (
    <button className="item_menu_button">
      <a
        href={fileUrl}
        target="_blank"
        rel="noreferrer"
        className="link link_dl"
      >
        Download
      </a>
    </button>
  );
}

export default DownloadFile;
