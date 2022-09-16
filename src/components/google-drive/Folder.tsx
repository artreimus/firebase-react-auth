import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Folder({ folder }: any) {
  const [isHover, setIsHover] = useState(false);

  function handleMouseEnter() {
    setIsHover(true);
  }

  function handleMouseLeave() {
    setIsHover(false);
  }

  return (
    <Button variant="outline-dark" className="text-truncate w-100">
      <Link
        to={`/folder/${folder.id}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ textDecoration: 'none', color: isHover ? 'white' : 'black' }}
      >
        <FontAwesomeIcon
          icon={faFolder}
          className="mr-2"
          style={{ marginRight: '.5em' }}
        />
        {folder.name}
      </Link>
    </Button>
  );
}

export default Folder;
