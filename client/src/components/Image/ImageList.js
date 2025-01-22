// import React, { useEffect, useState } from 'react';
// import client from '../../prismic'; // Adjust the path as per your project structure

// const ImageList = () => {
//     const [blogPosts, setBlogPosts] = useState([]);
//     const [tags, setTags] = useState([]);
//     const [selectedTag, setSelectedTag] = useState(null);
//     const [selectedImages, setSelectedImages] = useState([]);

//     useEffect(() => {
//         const fetchBlogPosts = async () => {
//             try {
//                 const response = await client.getByType('requin3', { pageSize: 5 });

//                 if (response && response.results) {
//                     setBlogPosts(response.results);
//                     extractTags(response.results);
//                     fetchAllImages(response.results); // Fetch all images on initial load for "Show All"
//                 } else {
//                     console.error('Unexpected response format:', response);
//                 }
//             } catch (error) {
//                 console.error('Error fetching blog posts:', error);
//             }
//         };

//         fetchBlogPosts();
//     }, []);

//     const extractTags = (posts) => {
//         const uniqueTags = [
//             ...new Set(
//                 posts.flatMap(post => post.data.tag.map(tagObj => tagObj.text))
//             )
//         ];
//         setTags(uniqueTags);
//     };

//     const fetchAllImages = (posts) => {
//         const allImages = posts.flatMap(post =>
//             Object.keys(post.data)
//                 .filter(key => key.startsWith('image') && post.data[key]?.url)
//                 .map(key => post.data[key].url)
//         );
//         setSelectedImages(allImages);
//     };

//     const handleTagClick = (tag) => {
//         setSelectedTag(tag);

//         if (tag === null) {
//             // Reset to show all images
//             fetchAllImages(blogPosts);
//         } else {
//             // Filter images based on selected tag
//             const filteredImages = blogPosts.flatMap(post => {
//                 if (post.data.tag.some(tagObj => tagObj.text === tag)) {
//                     return Object.keys(post.data)
//                         .filter(key => key.startsWith('image') && post.data[key]?.url)
//                         .map(key => post.data[key].url);
//                 }
//                 return [];
//             });
//             setSelectedImages(filteredImages);
//         }
//     };
    
//     return (
//         <div className="container mx-auto px-4">
//             <h1 className="text-4xl font-display font-bold text-primaryText text-center mb-8 mt-10">Life At Requin</h1>

//             {/* Tag buttons */}
//             <div className="flex flex-wrap justify-center mb-5 overflow-hidden">
//                 <button
//                     onClick={() => setSelectedTag(null)}
//                     className={`m-2 py-2 px-4 text-xs sm:text-sm font-sans cursor-pointer border rounded-lg transition-colors duration-300 ${selectedTag === null ? 'bg-accent text-primaryWhite' : 'text-accent bg-primaryWhite hover:bg-accent hover:text-primaryWhite'
//                         } border-accent`}
//                 >
//                     Show All
//                 </button>
//                 {tags.map((tag) => (
//                     <button
//                         key={tag}
//                         onClick={() => handleTagClick(tag)}
//                         className={`m-2 py-2 px-4 text-xs sm:text-sm font-sans cursor-pointer border rounded-lg transition-colors duration-300 ${selectedTag === tag ? 'bg-accent text-primaryWhite' : 'text-accent bg-primaryWhite hover:bg-accent hover:text-primaryWhite'
//                             } border-accent`}
//                     >
//                         {tag}
//                     </button>
//                 ))}
//             </div>

//             {/* Display Selected Images */}
//             <div className="flex justify-center flex-wrap gap-5 mt-5">
//                 {selectedImages.map((imageUrl, index) => (
//                     <div key={index} className="w-64 border rounded-xl shadow-card text-center bg-primaryWhite p-4 border-lightGray">
//                         <img
//                             src={imageUrl}
//                             alt={`Selected Image ${index + 1}`}
//                             className="w-full h-auto rounded-lg"
//                         />
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default ImageList;

import React, { useEffect, useState } from 'react';
import client from '../../prismic'; // Adjust the path as per your project structure

const ImageList = () => {
    const [blogPosts, setBlogPosts] = useState([]);
    const [tags, setTags] = useState([]);
    const [selectedTag, setSelectedTag] = useState(null);
    const [selectedImages, setSelectedImages] = useState([]);

    useEffect(() => {
        const fetchBlogPosts = async () => {
            try {
                const response = await client.getByType('requin3', { pageSize: 5 });

                if (response && response.results) {
                    setBlogPosts(response.results);
                    extractTags(response.results);
                    fetchAllImages(response.results); // Show all images on initial load
                } else {
                    console.error('Unexpected response format:', response);
                }
            } catch (error) {
                console.error('Error fetching blog posts:', error);
            }
        };

        fetchBlogPosts();
    }, []);

    const extractTags = (posts) => {
        const uniqueTags = [
            ...new Set(
                posts.flatMap(post => post.data.tag.map(tagObj => tagObj.text))
            )
        ];
        setTags(uniqueTags);
    };

    const fetchAllImages = (posts) => {
        const allImages = posts.flatMap(post =>
            Object.keys(post.data)
                .filter(key => key.startsWith('image') && post.data[key]?.url)
                .map(key => post.data[key].url)
        );
        setSelectedImages(allImages);
    };

    const handleTagClick = (tag) => {
        setSelectedTag(tag);

        if (tag === null) {
            // Reset to show all images
            fetchAllImages(blogPosts);
        } else {
            // Filter images based on selected tag
            const filteredImages = blogPosts.flatMap(post => {
                if (post.data.tag.some(tagObj => tagObj.text === tag)) {
                    return Object.keys(post.data)
                        .filter(key => key.startsWith('image') && post.data[key]?.url)
                        .map(key => post.data[key].url);
                }
                return [];
            });
            setSelectedImages(filteredImages);
        }
    };

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-4xl font-display font-bold text-primaryText text-center mb-8 mt-10">Life At Requin</h1>

            {/* Tag buttons */}
            <div className="flex flex-wrap justify-center mb-5 overflow-hidden">
                <button
                    onClick={() => handleTagClick(null)}
                    className={`m-2 py-2 px-4 text-xs sm:text-sm font-sans cursor-pointer border rounded-lg transition-colors duration-300 ${selectedTag === null ? 'bg-accent text-primaryWhite' : 'text-accent bg-primaryWhite hover:bg-accent hover:text-primaryWhite'
                        } border-accent`}
                >
                    Show All
                </button>
                {tags.map((tag) => (
                    <button
                        key={tag}
                        onClick={() => handleTagClick(tag)}
                        className={`m-2 py-2 px-4 text-xs sm:text-sm font-sans cursor-pointer border rounded-lg transition-colors duration-300 ${selectedTag === tag ? 'bg-accent text-primaryWhite' : 'text-accent bg-primaryWhite hover:bg-accent hover:text-primaryWhite'
                            } border-accent`}
                    >
                        {tag}
                    </button>
                ))}
            </div>

            {/* Display Selected Images */}
            <div className="flex justify-center flex-wrap gap-5 mt-5">
                {selectedImages.map((imageUrl, index) => (
                    <div key={index} className="w-64 border rounded-xl shadow-card text-center bg-primaryWhite p-4 border-lightGray">
                        <img
                            src={imageUrl}
                            alt={`Selected Image ${index + 1}`}
                            className="w-full h-auto rounded-lg"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageList;
