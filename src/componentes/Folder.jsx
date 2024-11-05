import React, { useState } from 'react';
import { FaFolder, FaFolderOpen, FaFile } from 'react-icons/fa'; // Import icons
import File from './File';

const Folder = ({ folder, toggleFolder }) => {
  return (
    <div style={{ paddingLeft: '20px' }}>
      <div onClick={() => toggleFolder(folder.id)} style={{ display: 'flex', flexDirection: 'row' }}>
        {folder.isOpen ? <FaFolderOpen /> : <FaFolder />} {folder.name}
      </div>
      {folder.isOpen && folder.children && (
        <div>
          {folder.children.map((child) =>
            child.type === 'folder' ? (
              <Folder key={child.id} folder={child} toggleFolder={toggleFolder} />
            ) : (
              <File key={child.id} file={child} />
            )
          )}
        </div>
      )}
    </div>
  );
};

export default Folder;