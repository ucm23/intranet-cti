import React, { useState } from "react";
import { FaFolder, FaList, FaTh, FaEllipsisH, FaChevronRight, FaPlus, FaUpload } from "react-icons/fa";

const Finder = () => {
    const [viewMode, setViewMode] = useState("tile");
    const [currentPath, setCurrentPath] = useState(["Home"]);
    const [folders, setFolders] = useState([
        { id: 1, name: "Documents", subfolders: 5, files: 20 },
        { id: 2, name: "Images", subfolders: 3, files: 100 },
        { id: 3, name: "Projects", subfolders: 10, files: 50 },
        { id: 4, name: "Archives", subfolders: 2, files: 200 },
        { id: 5, name: "Personal", subfolders: 4, files: 30 },
    ]);

    const toggleViewMode = () => {
        setViewMode(viewMode === "tile" ? "list" : "tile");
    };

    const handleFolderClick = (folderId) => {
        const clickedFolder = folders.find((folder) => folder.id === folderId);
        if (clickedFolder) {
            setCurrentPath([...currentPath, clickedFolder.name]);
        }
        console.log(`Folder ${folderId} clicked`);
        // Implement navigation or content display logic here
    };

    const handleBreadcrumbClick = (index) => {
        setCurrentPath(currentPath.slice(0, index + 1));
    };

    const handleCreateFolder = () => {
        const newFolder = {
            id: folders.length + 1,
            name: `New Folder ${folders.length + 1}`,
            subfolders: 0,
            files: 0,
        };
        setFolders([...folders, newFolder]);
    };

    const handleUploadFiles = () => {
        console.log("Upload files clicked");
        // Implement file upload logic here
    };

    const Breadcrumbs = () => (
        <nav className="flex mb-4" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
                {currentPath.map((path, index) => (
                    <li key={index} className="inline-flex items-center">
                        {index > 0 && (
                            <FaChevronRight className="w-4 h-4 text-gray-400 mx-1" />
                        )}
                        <button
                            onClick={() => handleBreadcrumbClick(index)}
                            className={`inline-flex items-center text-sm font-medium ${index === currentPath.length - 1
                                    ? "text-blue-600"
                                    : "text-gray-700 hover:text-blue-600"
                                }`}
                        >
                            {path}
                        </button>
                    </li>
                ))}
            </ol>
        </nav>
    );

    const TileView = ({ folder }) => (
        <div
            className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow duration-300 cursor-pointer border border-gray-200"
            whileHover={{ scale: 1.02 }}
            onClick={() => handleFolderClick(folder.id)}
        >
            <div className="flex flex-col items-center">
                <FaFolder className="text-4xl text-blue-600 mb-2" />
                <h3 className="text-sm font-semibold mb-1 text-gray-800">{folder.name}</h3>
                <p className="text-xs text-gray-500">
                    {folder.subfolders} subfolders, {folder.files} files
                </p>
            </div>
            <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-600">
                <FaEllipsisH />
            </button>
        </div>
    );

    const ListView = ({ folder }) => (
        <div
            className="bg-white rounded-lg shadow-sm p-3 mb-2 hover:bg-gray-50 transition-colors duration-300 cursor-pointer border border-gray-200"
            whileHover={{ x: 5 }}
            onClick={() => handleFolderClick(folder.id)}
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <FaFolder className="text-xl text-blue-600 mr-3" />
                    <div>
                        <h3 className="text-sm font-semibold text-gray-800">{folder.name}</h3>
                        <p className="text-xs text-gray-500">
                            {folder.subfolders} subfolders, {folder.files} files
                        </p>
                    </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                    <FaEllipsisH />
                </button>
            </div>
        </div>
    );

    return (
        <div className="mx-auto p-3 bg-gray-100 min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold text-gray-800">Content Manager</h1>
                <div className="flex items-center space-x-4">
                    <button
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded flex items-center"
                        onClick={handleCreateFolder}
                    >
                        <FaPlus className="mr-2" /> Create Folder
                    </button>
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center"
                        onClick={handleUploadFiles}
                    >
                        <FaUpload className="mr-2" /> Upload Files
                    </button>
                    <div className="flex items-center bg-white rounded-md shadow-sm">
                        <button
                            className={`p-2 ${viewMode === "tile"
                                    ? "bg-blue-600 text-white"
                                    : "bg-white text-gray-600"
                                } rounded-l-md transition-colors duration-300`}
                            onClick={() => setViewMode("tile")}
                            aria-label="Switch to tile view"
                        >
                            <FaTh />
                        </button>
                        <button
                            className={`p-2 ${viewMode === "list"
                                    ? "bg-blue-600 text-white"
                                    : "bg-white text-gray-600"
                                } rounded-r-md transition-colors duration-300`}
                            onClick={() => setViewMode("list")}
                            aria-label="Switch to list view"
                        >
                            <FaList />
                        </button>
                    </div>
                </div>
            </div>

            <Breadcrumbs />

            <div>
                {folders.length > 0 ? (
                    <div
                        key={viewMode}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {viewMode === "tile" ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                                {folders.map((folder) => (
                                    <TileView key={folder.id} folder={folder} />
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white rounded-lg shadow-sm">
                                {folders.map((folder) => (
                                    <ListView key={folder.id} folder={folder} />
                                ))}
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="text-center py-10 bg-white rounded-lg shadow-sm">
                        <p className="text-xl text-gray-600">No folders found.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Finder;
