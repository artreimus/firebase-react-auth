import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { database } from '../../firebase';
import { useFolder } from '../../hooks/useFolder';

function DeleteFolder({ folderId }: any) {
  const [open, setOpen] = useState(false);
  const [openError, setOpenError] = useState(false);

  const { childFolders, childFiles }: any = useFolder(folderId);

  function openModal() {
    setOpen(true);
  }

  function closeModal() {
    setOpen(false);
  }

  function showError() {
    setOpenError(true);
  }

  function hideError() {
    setOpenError(false);
  }

  function deleteFolder() {
    closeModal();

    if (childFolders.length > 0 || childFiles.length > 0) {
      console.log('not safe to delete');
      showError();
      return;
    }

    database.folders
      .doc(folderId)
      .delete()
      .then(() => {
        console.log('Folder deleted');
      })
      .catch(() => console.log('Failed to delete folder'));
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
          <p>Are you sure you want to delete the folder?</p>
          <Button
            variant="secondary"
            onClick={() => {
              deleteFolder();
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
          <p>Cannot delete folder</p>
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

export default DeleteFolder;
