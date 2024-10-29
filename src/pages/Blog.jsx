import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import matter from "gray-matter";

const blogs = ["i-put-google-best-ai-in-an-iphone", "t-minus-40-days"];

const Blog = () => {
    const [blogData, setBlogData] = useState([]);

    useEffect(() => {
        // Load all markdown files and extract metadata
        Promise.all(
            blogs.map(async (slug) => {
                try {
                    const content = await import(`../blogs/${slug}.md`);
                    const mdContent = await fetch(content.default).then((res) =>
                        res.text()
                    );
                    const { data, content: text } = matter(mdContent); // Extract frontmatter and content

                    // Calculate word count
                    const wordCount = text.split(/\s+/g).length;

                    return {
                        slug,
                        wordCount,
                        ...data, // Spread metadata like title, date, image, etc.
                    };
                } catch (error) {
                    console.error(`Error loading blog "${slug}":`, error);
                    return null;
                }
            })
        ).then((results) => {
            const validResults = results.filter((result) => result !== null);
            setBlogData(validResults); // Set blog data to state
        });
    }, []);

    if (blogData.length === 0) {
        return <div>Loading blogs...</div>; // Loading state while fetching blogs
    }

    return (
        <div className="min-h-screen mx-auto max-w-prose bg-zinc-900 px-4 py-12 text-zinc-50">
            <h1 className="text-4xl font-bold mb-8">Blog</h1>
            <div className="space-y-6">
                {blogData.map((blog) => (
                    <div
                        key={blog.slug}
                        className="flex items-start space-x-6 border-b border-zinc-700 pb-4"
                    >
                        {/* Blog Image */}
                        <img
                            src={blog.imgUrl}
                            alt={blog.title}
                            className="w-40 h-28 object-cover rounded-lg"
                        />

                        {/* Blog Metadata */}
                        <div>
                            <h2 className="text-2xl font-semibold">
                                <Link
                                    to={`/blog/${blog.slug}`}
                                    className="hover:underline"
                                >
                                    {blog.title}
                                </Link>
                            </h2>
                            <p className="text-zinc-400">
                                {blog.publishedAt} • {blog.wordCount} words
                            </p>
                            <p className="text-zinc-300 mt-2">{blog.summary}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Blog;
