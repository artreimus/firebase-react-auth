import React from 'react';

function DownloadFile({ fileName, userId, fileUrl }: any) {
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
