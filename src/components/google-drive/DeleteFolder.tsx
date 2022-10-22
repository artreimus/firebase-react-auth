import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { database } from '../../firebase';
import { useFolder } from '../../hooks/useFolder';

function DeleteFolder({ folderId }: { folderId: string }) {
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
      <button
        onClick={() => {
          openModal();
        }}
        className="item_menu_button"
      >
        Delete
      </button>
      <Modal show={open} onHide={closeModal}>
        <Modal.Body>
          <p>Are you sure you want to permanently delete this folder?</p>
          <div className="modal_container_buttons">
            <button
              onClick={() => {
                deleteFolder();
              }}
              className="modal_button"
            >
              <div className="button_container_icon">
                <img
                  src={require(`../../images/confirm.png`)}
                  alt="File Icon"
                />
              </div>
            </button>
            <button
              onClick={() => {
                closeModal();
              }}
              className="modal_button"
            >
              <div className="button_container_icon">
                <img src={require(`../../images/cancel.png`)} alt="File Icon" />
              </div>
            </button>
          </div>
        </Modal.Body>
      </Modal>

      <Modal show={openError} onHide={hideError}>
        <Modal.Body>
          <p>
            Failed to delete folder. Please delete all folders and files in the
            folder before deleting this folder
          </p>
          <button
            onClick={() => {
              hideError();
            }}
            className="modal_button modal_error_button"
          >
            Close
          </button>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default DeleteFolder;
