import { useState } from 'react';
import DeleteFile from './DeleteFile';
import DownloadFile from './DownloadFile';
import FavoriteFile from './FavoriteFile';

function File({ file }: any) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function setVisibility() {
    if (!isMenuOpen) {
      return 'hidden';
    }
    return;
  }

  function getDate() {
    if (!file.createdAt) return;

    let dateCreated: Date = file.createdAt.toDate();

    var months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    let selectedMonthName: string = months[dateCreated.getMonth()];

    return `${selectedMonthName} ${dateCreated.getDate()}, ${dateCreated.getFullYear()}`;
  }

  function getFileExtension(filename: string) {
    const extension = filename.substring(
      filename.lastIndexOf('.') + 1,
      filename.length
    );
    return extension;
  }

  function getFileCategory(filename: string) {
    let fileExtension: string = getFileExtension(filename).toLowerCase();

    let categories = [
      'image',
      'video',
      'audio',
      'doc',
      'excel',
      'ppt',
      'pdf',
      'txt',
      'code',
      'compressed',
      'fonts',
      'unknown',
    ];

    let extensions = [
      ['jpeg', 'jpg', 'gif', 'tiff', 'psd', 'raw', 'svg', 'png'],
      ['mp4', 'mov', 'wmv', 'avi', 'mkv', 'flv', 'webm'],
      ['mp3', 'mpa', 'wav', 'aif', 'cda', 'mid', 'midi', 'ogg', 'wma', 'wpl'],
      ['doc', 'docx', 'wpd', 'odt'],
      ['xls', 'xlsx', 'csv', 'xlsm', 'ods'],
      ['ppt', 'pptx'],
      ['pdf'],
      ['txt', 'tex', 'rtf'],
      [
        'c',
        'php',
        'js',
        'ts',
        'css',
        '.py',
        'rss',
        'html',
        'asp',
        'aspx',
        'sh',
        'swift',
        'vb',
        'java',
        'h',
        'cs',
        'cpp',
        'class',
        'cgi',
        'pl',
      ],
      ['7z', 'arj', 'deb', 'pkg', 'rar', 'rpm', 'z', 'zip'],
      ['fnt', 'fon', 'otf', 'ttf'],
    ];

    let i = 0;
    for (i; i < extensions.length; i++) {
      if (extensions[i].includes(fileExtension)) {
        break;
      }
    }
    return categories[i];
  }

  function formatBytes(bytes: number, decimals: number = 2) {
    if (!+bytes) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  }

  return (
    <>
      <div className="file_item">
        <div
          className={isMenuOpen ? 'bg_menu' : 'bg_menu hidden'}
          onClick={() => setIsMenuOpen(false)}
        ></div>
        <div className="file_container_icon ">
          <img
            src={require(`../../images/file-icons/${getFileCategory(
              file.name
            )}.png`)}
            alt="File Icon"
          />
        </div>
        <div className="file_item_container_primary">
          <p className="file_name">{file.name}</p>

          <div className="file_item_container_secondary">
            <p className="file_date">{getDate()}</p>
            <div className="circle"></div>
            <p className="file_size">{formatBytes(file.size)}</p>
          </div>
        </div>
        <div className="item_menu">
          <button
            className="item_btn_menu"
            onClick={() => setIsMenuOpen((prevIsMenuOpen) => !prevIsMenuOpen)}
          >
            <img src={require(`../../images/menu.png`)} alt="Menu" />
          </button>
          <div className={`item_menu_container_list ${setVisibility()}`}>
            <ul className="item_menu_list">
              <li className="item_menu_list_item">
                <DeleteFile
                  fileId={file.id}
                  fileName={file.name}
                  userId={file.userId}
                  fileFolderId={file.folderId}
                />
              </li>
              <li className="item_menu_list_item">
                <DownloadFile
                  fileName={file.name}
                  userId={file.userId}
                  fileUrl={file.url}
                />
              </li>
              <li className="item_menu_list_item">
                <FavoriteFile file={file} />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default File;
