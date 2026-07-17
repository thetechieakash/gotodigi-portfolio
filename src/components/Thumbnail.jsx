import { useState } from "react";
import { ImageIcon } from "lucide-react";
import storageService from "../appwrite/storageService.js";

export default function Thumbnail({
    fileId,
    alt = "",
    className = "",
}) {
    const [error, setError] = useState(false);

    if (!fileId || error) {
        return (
            <div
                className={`flex items-center justify-center bg-gray-100 dark:bg-zinc-800 ${className}`}
            >
                <div className="text-center text-gray-400 dark:text-gray-500">
                    <ImageIcon className="mx-auto mb-2" size={36} />
                    <p className="text-xs">No Image</p>
                </div>
            </div>
        );
    }

    return (
        <img
            src={storageService.getFileView(fileId)}
            alt={alt}
            onError={() => setError(true)}
            className={`object-cover ${className}`}
        />
    );
}