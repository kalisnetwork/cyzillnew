import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { AiOutlineClose } from 'react-icons/ai';
import { app } from '../../../../firebase.js';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { useSelector } from 'react-redux';

const Media = ({ formData, saveFormData }) => {
    const [media, setMedia] = useState([]);
    const { currentUser } = useSelector(state => state.user)
    const username = currentUser?.others?.username || currentUser?.username

    useEffect(() => {
        const urls = media.map(file => file.url);
        saveFormData({ ...formData, photos: urls });
    }, [media]);


    const onDrop = useCallback(async (acceptedFiles) => {
        const storage = getStorage(app);

        const filePromises = acceptedFiles.map(async (file) => {
            let folder = '';
            if (file.type.startsWith('image/')) {
                folder = 'images';
            } else if (file.type.startsWith('video/')) {
                folder = 'videos';
            }
            const filePath = `users/${username}/media/${folder}/${file.name}`;
            const storageRef = ref(storage, filePath);
            await uploadBytes(storageRef, file);
            const url = await getDownloadURL(storageRef);
            return { url, path: filePath, type: folder };
        });
        try {
            const files = await Promise.all(filePromises);
            setMedia((prevMedia) => [...prevMedia, ...files]);
        } catch (error) {
            console.error('Error uploading file:', error.message);
        }
    }, [media]);


    const removeFile = (index) => {
        const file = media[index];
        const storage = getStorage(app);
        const fileRef = ref(storage, file.path);
        deleteObject(fileRef).then(() => {
            console.log('File deleted successfully');
            const newMedia = [...media];
            newMedia.splice(index, 1);
            setMedia(newMedia);
        }).catch((error) => {
            console.error('Error deleting file:', error.message);
        });
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <div className="mx-auto p-6">
            <h2 className="text-2xl font-semibold mb-4">Upload your files</h2>
            <div className="flex mb-4">
                <div className="w-1/2 pr-2">
                    <label className="block mb-1 font-medium">Upload Files</label>
                    <div {...getRootProps()} className="">
                        <input {...getInputProps()} />
                        {isDragActive ? <p className=''>Drop the files here ...</p> : <div><p className='text-md text-gray-500'>PNG, JPG, JPEG, MP4, WebM up to 20MB</p></div>}
                    </div>
                </div>
                <div className="w-1/2 pl-2 border border-gray-400 overflow-auto" style={{ maxHeight: '300px' }}>
                    {media.filter(file => file.type === 'images').map((file, index) => (
                        <div key={index} className="mb-2 relative">
                            <img src={file.url} alt={`Image ${index}`} className="w-full h-32 object-cover" />
                            <AiOutlineClose className="absolute top-0 right-0 m-1 cursor-pointer text-white bg-red-600 " onClick={() => removeFile(index)} />
                        </div>
                    ))}
                    {media.filter(file => file.type === 'videos').map((file, index) => (
                        <div key={index} className="mb-2 relative">
                            <video src={file.url} alt={`Video ${index}`} className="w-full h-32 object-cover" controls />
                            <AiOutlineClose className="absolute top-0 right-0 m-1 cursor-pointer text-white bg-red-600 " onClick={() => removeFile(index)} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

};

export default Media;
