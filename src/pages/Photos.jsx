import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";

const CloseIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
        />
    </svg>
);

const DownloadIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
        />
    </svg>
);

const PhotoModal = ({ photo, onClose }) => {
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "unset";
        };
    }, []);

    return createPortal(
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-90 p-4"
            style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0 }}
        >
            <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ type: "spring", duration: 0.5 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-5xl w-full aspect-auto bg-zinc-900 rounded-lg overflow-hidden"
            >
                <div className="absolute top-4 right-4 flex gap-2 z-10">
                    <a
                        href={photo.url}
                        download={`photo${photo.id}`}
                        className="p-2 bg-zinc-800 rounded-full hover:bg-zinc-700 transition-colors text-white"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <DownloadIcon />
                    </a>
                    <button
                        onClick={onClose}
                        className="p-2 bg-zinc-800 rounded-full hover:bg-zinc-700 transition-colors text-white"
                    >
                        <CloseIcon />
                    </button>
                </div>
                <div className="w-full h-full flex items-center justify-center">
                    <img
                        src={photo.url}
                        alt={photo.alt}
                        className="max-h-[90vh] object-contain"
                    />
                </div>
            </motion.div>
        </motion.div>,
        document.body
    );
};

const PhotoGrid = () => {
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedPhoto, setSelectedPhoto] = useState(null);

    useEffect(() => {
        const checkImage = (url) => {
            return new Promise((resolve) => {
                const img = new Image();
                img.onload = () => resolve(true);
                img.onerror = () => resolve(false);
                img.src = url;
            });
        };

        const loadPhotos = async () => {
            const photosList = [];
            let consecutiveFailures = 0;
            const MAX_FAILURES = 3; // Stop after 3 consecutive missing photos
            const BATCH_SIZE = 5; // Check 5 photos at a time
            let i = 1;

            while (consecutiveFailures < MAX_FAILURES) {
                const batchPromises = [];

                // Create a batch of promises
                for (
                    let j = 0;
                    j < BATCH_SIZE && consecutiveFailures < MAX_FAILURES;
                    j++
                ) {
                    const num = (i + j).toString().padStart(3, "0");
                    const extensions = ["jpg", "png", "jpeg"];

                    // Create promises for each extension of this photo number
                    const photoPromises = extensions.map((ext) => ({
                        url: `/photos/photo${num}.${ext}`,
                        id: num,
                        promise: checkImage(`/photos/photo${num}.${ext}`),
                    }));

                    batchPromises.push(
                        Promise.any(
                            photoPromises.map(async (p) => {
                                const exists = await p.promise;
                                if (exists)
                                    return {
                                        id: p.id,
                                        url: p.url,
                                        alt: `Photo ${p.id}`,
                                    };
                                throw new Error("Not found");
                            })
                        ).catch(() => null)
                    );
                }

                // Wait for all promises in the batch to resolve
                const results = await Promise.all(batchPromises);

                // Process results
                let batchHasValidPhoto = false;
                results.forEach((result) => {
                    if (result) {
                        batchHasValidPhoto = true;
                        consecutiveFailures = 0;
                        photosList.push(result);
                    } else {
                        if (!batchHasValidPhoto) consecutiveFailures++;
                    }
                });

                i += BATCH_SIZE;

                // Optional: Set a hard limit
                if (i > 50) break; // Maximum of 50 photos
            }

            // Sort photos in reverse order (newest first)
            const sortedPhotos = photosList.sort(
                (a, b) => parseInt(b.id) - parseInt(a.id)
            );
            setPhotos(sortedPhotos);
            setLoading(false);
        };

        loadPhotos();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-zinc-900 -mt-10 px-4 py-12">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-4xl font-bold text-zinc-50 mb-8">
                        Photos
                    </h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        <div className="aspect-square bg-zinc-800 rounded-lg animate-pulse" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-900 -mt-10 px-4 py-12">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold text-zinc-50 mb-8">Photos</h1>

                {photos.length === 0 ? (
                    <p className="text-zinc-400 text-center py-12">
                        No photos found in the photos directory.
                    </p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {photos.map((photo) => (
                            <motion.div
                                key={photo.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                whileHover={{
                                    scale: 1.02,
                                    transition: { duration: 0.2 },
                                }}
                                onClick={() => setSelectedPhoto(photo)}
                                className="relative aspect-square group cursor-pointer"
                            >
                                <img
                                    src={photo.url}
                                    alt={photo.alt}
                                    className="w-full h-full object-cover rounded-lg"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 rounded-lg" />
                            </motion.div>
                        ))}
                    </div>
                )}

                <AnimatePresence>
                    {selectedPhoto && (
                        <PhotoModal
                            photo={selectedPhoto}
                            onClose={() => setSelectedPhoto(null)}
                        />
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default PhotoGrid;
