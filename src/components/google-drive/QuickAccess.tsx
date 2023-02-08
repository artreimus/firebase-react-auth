import Navbar from './Navbar';
import AddFolderButton from './AddFolderButton';
import AddFileButton from './AddFileButton';
import { useFolder } from '../../hooks/useFolder';
import Folder from './Folder';
import { useParams } from 'react-router-dom';
import FolderBreadcrumbs from './FolderBreadcrumbs';
import File from './File';
import { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import { useProvideContext } from '../../contexts/Context';
import SortFoldersMenu from './SortFoldersMenu';
import SortFilesMenu from './SortFilesMenu';

function QuickAccess() {
  const { folderId } = useParams();
  const { folder, allFolders, allFiles }: any = useFolder(folderId);
  const { fileSortType, folderSortType, setCurrentPage }: any =
    useProvideContext();
  const [windowSize, setWindowSize] = useState(getWindowSize());

  useEffect(() => {
    setCurrentPage('quick-access');

    const handleWindowResize = () => {
      setWindowSize(getWindowSize());
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  function getWindowSize() {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
  }

  function sortItems(
    files: any,
    sortTypeParam: { type: string; order: string }
  ) {
    if (!files) return;

    if (sortTypeParam.type === 'name') {
      return files.sort((a: any, b: any) => {
        let fa = a.name;
        let fb = b.name;

        if (fa < fb) {
          return sortTypeParam.order === 'asc' ? -1 : 1;
        }

        if (fa > fb) {
          return sortTypeParam.order === 'asc' ? 1 : -1;
        }
        return 0;
      });
    } else if (sortTypeParam.type === 'date') {
      return files.sort((a: any, b: any) => {
        if (a.createdAt === null || b.createdAt === null) {
          return sortTypeParam.order === 'asc' ? -1 : 1;
        }
        return sortTypeParam.order === 'asc'
          ? a.createdAt.seconds - b.createdAt.seconds
          : b.createdAt.seconds - a.createdAt.seconds;
      });
    } else if (sortTypeParam.type === 'size') {
      return files.sort((a: any, b: any) => {
        return sortTypeParam.order === 'asc'
          ? a.size - b.size
          : b.size - a.size;
      });
    }
  }

  return (
    <>
      <Navbar />
      <div className="dashboard_container_main">
        <Sidebar windowWidth={windowSize.innerWidth} />

        <main className="dashboard_section">
          <FolderBreadcrumbs currentFolder={folder} />
          <section className="section_folders">
            <div className="dashboard_container_header">
              <h2 className="dashboard_header_title">All Folders</h2>
              <AddFolderButton currentFolder={folder} />
              <SortFoldersMenu />
            </div>
            <hr className="dashboard_header_divider"></hr>
            <div className="folders_container">
              {(allFolders ? allFolders.length > 0 : false) &&
                sortItems(allFolders, folderSortType).map(
                  (childFolder: any) => (
                    <Folder folder={childFolder} key={childFolder.id} />
                  )
                )}
            </div>
          </section>

          <section className="section_files">
            <div className="dashboard_container_header">
              <h2 className="dashboard_header_title">All Files</h2>
              <AddFileButton />
              <SortFilesMenu />
            </div>
            <hr className="dashboard_header_divider"></hr>

            {(folder ? folder.name : 'error') === 'Root' &&
              (allFiles ? allFiles.length > 0 : false) && (
                <div className="files_container">
                  {sortItems(allFiles, fileSortType).map((file: any) => (
                    <File file={file} key={file.id} />
                  ))}
                </div>
              )}
          </section>
        </main>
      </div>
    </>
  );
}

export default QuickAccess;
