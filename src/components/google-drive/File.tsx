import { faFile } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function File({ file }: any) {
  return (
    <a
      href={file.url}
      target="_blank"
      className="btn btn-outline-dark text-truncate w-100"
    >
      <FontAwesomeIcon icon={faFile} style={{ marginRight: '0.5rem' }} />
      {file.name}
      <div>
        <img src={`${file.url}`} alt="W3Schools.com" className="file-image" />
      </div>
    </a>
  );
}

export default File;
