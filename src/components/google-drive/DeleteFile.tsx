import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { database } from '../../firebase';
import { useParams } from 'react-router-dom';
import { ROOT_FOLDER, useFolder } from '../../hooks/useFolder';
import { storage } from '../../firebase';

function DeleteFile({ fileId, fileName, userId }: any) {
  const [open, setOpen] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { folderId } = useParams();
  const { folder }: any = useFolder(folderId);

  function openModal() {
    setOpen(true);
  }

  function closeModal() {
    setOpen(false);
  }

  function showError(e: any) {
    setErrorMessage(e);
    setOpenError(true);
  }

  function hideError() {
    setOpenError(false);
  }

  function deleteFile() {
    closeModal();

    const filePath: string =
      folder === ROOT_FOLDER
        ? `files/${userId}${folder.path.join('/')}/${fileName}`
        : `files/${userId}${folder.path.join('/')}/${folder.name}/${fileName}`;
    console.log(filePath);

    const storageRef = storage.ref();
    const fileRef = storageRef.child(filePath);

    fileRef
      .delete()
      .then(() => {
        console.log('File deleted successfully in storage');
        database.files
          .doc(fileId)
          .delete()
          .then(() => {
            console.log('Successfully deleted in database!');
          })
          .catch(() => showError('Failed to delete from Furebase Database'));
      })
      .catch(() => showError('Failed to delete from Firebase Storage'));
  }

  return (
    <>
      <Button
        variant="secondary"
        onClick={() => {
          openModal();
        }}
      >
        <p></p>
      </Button>

      <Modal show={open} onHide={closeModal}>
        <Modal.Body>
          <p>Are you sure you want to delete the file?</p>
          <Button
            variant="secondary"
            onClick={() => {
              deleteFile();
            }}
          >
            Yes
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              closeModal();
            }}
          >
            Cancel
          </Button>
        </Modal.Body>
      </Modal>

      <Modal show={openError} onHide={hideError}>
        <Modal.Body>
          <p>{errorMessage}</p>
          <Button
            variant="danger"
            onClick={() => {
              hideError();
            }}
          >
            Okay
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default DeleteFile;
