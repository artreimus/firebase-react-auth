import { faFileUpload } from '@fortawesome/free-solid-svg-icons';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { storage, database } from '../../firebase';
import { ROOT_FOLDER } from '../../hooks/useFolder';
import { UUID } from 'uuid-generator-ts';
import { ProgressBar, Toast } from 'react-bootstrap';

function AddFileButton({ currentFolder }: any) {
  const [uploadingFiles, setUploadingFiles] = useState<any>([]);

  const { currentUser }: any = useAuth();

  function handleUpload(e: any) {
    const file: any = e.target.files![0];
    if (currentFolder == null || file == null) return;

    const id = new UUID();

    setUploadingFiles((prevUploadingFiles: any) => {
      return [
        ...prevUploadingFiles,
        { id: id, name: file.name, progress: 0, error: false },
      ];
    });

    const filePath: string =
      currentFolder === ROOT_FOLDER
        ? `${currentFolder.path.join('/')}/${file.name}`
        : `${currentFolder.path.join('/')}/${currentFolder.name}/${file.name}`;

    console.log(currentFolder.path.length);
    console.log(filePath);

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
            .where('folderId', '==', currentFolder.id)
            .get()
            .then((existingFiles) => {
              const existingFile = existingFiles.docs[0];
              if (existingFile) {
                existingFile.ref.update({ url: url });
              } else {
                database.files.add({
                  url: url,
                  name: file.name,
                  createdAt: database.getCurrentTimeStamps(),
                  folderId: currentFolder.id,
                  userId: currentUser.uid,
                });
              }
            });
        });
      }
    );
  }

  return (
    <>
      <label
        className="btn btn-outline-success btn-sm"
        style={{ marginRight: '0.5rem' }}
      >
        <FontAwesomeIcon icon={faFileUpload} />
        <input
          type="file"
          onChange={handleUpload}
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
    </>
  );
}

export default AddFileButton;
