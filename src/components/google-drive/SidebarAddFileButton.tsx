import { faFileUpload } from '@fortawesome/free-solid-svg-icons';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useProvideContext } from '../../contexts/Context';
import { storage, database } from '../../firebase';
import { ROOT_FOLDER, useFolder } from '../../hooks/useFolder';
import { UUID } from 'uuid-generator-ts';
import { Modal, ProgressBar, Toast, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

function SidebarAddFileButton() {
  const [uploadingFiles, setUploadingFiles] = useState<any>([]);
  const [open, setOpen] = useState(false);
  const [originalFile, setOriginalFile] = useState<File>();
  const { folderId } = useParams();
  const { childFiles, folder }: any = useFolder(folderId);
  const { currentUser }: any = useProvideContext();

  let fileName = '';
  let isFileExisting = false;

  function openModal() {
    setOpen(true);
  }

  function closeModal() {
    setOpen(false);
    isFileExisting = false;
  }

  function createCopyOfFile(e: any) {
    const file: any = e.target.files![0];
    return new File([file], file.name, { type: file.type });
  }

  function updateFilename(file: any) {
    fileName = file.name;
    if (folder == null || file == null) return;

    let fileNumber = 1;

    if (childFiles.length > 0) {
      childFiles.forEach((childFile: any) => {
        if (childFile.name === fileName) {
          fileName = `${file.name} (${fileNumber++})`;
        }
      });
    }

    Object.defineProperty(file, 'name', {
      writable: true,
      value: fileName,
    });

    return file;
  }

  function checkIfFileExist(e: any) {
    const file: any = e.target.files![0];
    if (folder == null || file == null) return;

    if (childFiles.length > 0) {
      childFiles.forEach((childFile: any) => {
        if (childFile.name === file.name) {
          isFileExisting = true;
        }
      });
    }

    !isFileExisting && handleUpload(file);
    isFileExisting && openModal();
  }

  function handleUpload(file: any) {
    if (folder == null || file == null) return;

    const id = new UUID();

    setUploadingFiles((prevUploadingFiles: any) => {
      return [
        ...prevUploadingFiles,
        { id: id, name: file.name, progress: 0, error: false },
      ];
    });

    const filePath: string =
      folder === ROOT_FOLDER
        ? `${folder.path.join('/')}/${file.name}`
        : `${folder.path.join('/')}/${folder.name}/${file.name}`;

    const uploadTask = storage
      .ref(`/files/${currentUser.uid}/${filePath}`) // upload directory
      .put(file);

    // 1st param - when state are changing / finish uploading / error
    // 2nd param - upload progress
    // 3rd param - on error
    // 4th param - once the function finishes completely

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = snapshot.bytesTransferred / snapshot.totalBytes;

        setUploadingFiles((prevUploadingFiles: any) => {
          return prevUploadingFiles.map((uploadFile: any) => {
            if (uploadFile.id === id) {
              return { ...uploadFile, progress: progress };
            }
            return uploadFile;
          });
        });
      },
      () => {
        // Handle errors when uploading
        setUploadingFiles((prevUploadingFiles: any) => {
          return prevUploadingFiles.map((uploadFile: any) => {
            if (uploadFile.id === id) {
              return { ...uploadFile, error: true };
            }
            return uploadFile;
          });
        });
      },
      () => {
        // Once file finishes uploading
        setTimeout(() => {
          setUploadingFiles((prevUploadingFiles: any) => {
            return prevUploadingFiles.filter((uploadFile: any) => {
              return uploadFile.id !== id;
            });
          });
        }, 3000);

        uploadTask.snapshot.ref.getDownloadURL().then((url) => {
          // avoid duplication of files
          database.files
            .where('name', '==', file.name)
            .where('userId', '==', currentUser.uid)
            .where('folderId', '==', folder.id)
            .get()
            .then((existingFiles) => {
              const existingFile = existingFiles.docs[0];
              if (existingFile) {
                existingFile.ref.update({ url: url });
              } else {
                database.files.add({
                  url: url,
                  name: file.name,
                  size: file.size,
                  createdAt: database.getCurrentTimeStamps(),
                  folderId: folder.id,
                  userId: currentUser.uid,
                  isFavorite: false,
                });
              }
            });
        });
      }
    );
  }

  return (
    <>
      <label className="sidebar_btn ">
        Upload File
        <input
          type="file"
          onChange={(e) => {
            setOriginalFile(createCopyOfFile(e));
            checkIfFileExist(e);
          }}
          style={{ opacity: 0, position: 'absolute', left: '-9999px' }}
        />
      </label>
      {uploadingFiles.length > 0 &&
        ReactDOM.createPortal(
          <div
            style={{
              position: 'absolute',
              bottom: '1rem',
              right: '1rem',
              maxWidth: '250px',
            }}
          >
            {uploadingFiles.map((file: any) => {
              return (
                <Toast
                  key={file.id}
                  onClose={() => {
                    setUploadingFiles((prevUploadingFiles: any) => {
                      return prevUploadingFiles.filter((uploadingFile: any) => {
                        return uploadingFile.id !== file.id;
                      });
                    });
                  }}
                >
                  <Toast.Header
                    closeButton={file.error}
                    className="text-truncate w-100 d-block"
                  >
                    {file.name}
                  </Toast.Header>
                  <Toast.Body>
                    <ProgressBar
                      animated={file.error}
                      variant={file.error ? 'danger' : 'primary'}
                      now={file.error ? 100 : file.progress * 100}
                      label={
                        file.error
                          ? 'Error'
                          : `${Math.round(file.progress * 100)}%`
                      }
                    />
                  </Toast.Body>
                </Toast>
              );
            })}
          </div>,
          document.body
        )}

      <Modal show={open} onHide={closeModal}>
        <Modal.Body>
          <p>File already Exist. What do you want to do?</p>
          <Button
            variant="secondary"
            onClick={() => {
              handleUpload(updateFilename(originalFile));
              closeModal();
            }}
          >
            Change Filename
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              handleUpload(originalFile);
              closeModal();
            }}
          >
            Replace File
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default SidebarAddFileButton;
