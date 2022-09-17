import { FormEvent, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderPlus } from '@fortawesome/free-solid-svg-icons';
import { database } from '../../firebase';
import { useAuth } from '../../contexts/AuthContext';
import { ROOT_FOLDER, useFolder } from '../../hooks/useFolder';
import { useParams } from 'react-router-dom';

function AddFolderButton({ currentFolder }: any) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const { currentUser }: any = useAuth();
  const { folderId } = useParams();
  const { childFolders }: any = useFolder(folderId);

  function openModal() {
    setOpen(true);
  }

  function closeModal() {
    setOpen(false);
  }

  let folderName: string;

  function updateFilename() {
    let folderNumber = 1;
    folderName = name;

    childFolders.forEach((childFolder: any) => {
      if (childFolder.name === folderName) {
        folderName = `${name} (${folderNumber++})`;
      }
    });
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (currentFolder == null) return;

    updateFilename();

    const path = [...currentFolder.path];
    if (currentFolder !== ROOT_FOLDER) {
      path.push({ name: currentFolder.name, id: currentFolder.id });
    }
    // Create a folder in the database
    database.folders.add({
      name: folderName,
      parentId: currentFolder.id,
      userId: currentUser.uid,
      path: path,
      createdAt: database.getCurrentTimeStamps(),
    });

    setName('');
    closeModal();
  }

  return (
    <>
      <Button onClick={openModal} variant="outline-success" size="sm">
        <FontAwesomeIcon icon={faFolderPlus} />
      </Button>
      <Modal show={open} onHide={closeModal}>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Folder Name</Form.Label>
              <Form.Control
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Close
            </Button>

            <Button variant="success" type="submit">
              Add Folder
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default AddFolderButton;
