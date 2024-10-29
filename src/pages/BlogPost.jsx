import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import matter from "gray-matter";
import remarkGfm from "remark-gfm"; // GitHub-flavored Markdown

const importBlog = async (slug) => {
    try {
        const content = await import(`../blogs/${slug}.md`);
        return fetch(content.default).then((res) => res.text());
    } catch (error) {
        console.error("Blog not found:", error);
        return null;
    }
};

const BlogPost = () => {
    const { slug } = useParams();
    const [content, setContent] = useState("");
    const [metadata, setMetadata] = useState({});

    useEffect(() => {
        importBlog(slug).then((mdContent) => {
            if (mdContent) {
                const parsedContent = matter(mdContent);
                setContent(parsedContent.content);
                setMetadata(parsedContent.data);
            }
        });
    }, [slug]);

    if (!content) {
        return (
            <div className="min-h-screen bg-zinc-900 px-4 py-12 text-zinc-50">
                Blog not found
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-900 px-4 py-12 text-zinc-50">
            <div className="mx-auto max-w-prose">
                <h1 className="text-4xl font-bold mb-4">{metadata.title}</h1>
                <p className="text-zinc-400 mb-2">{metadata.publishedAt}</p>
                {metadata.imgUrl && (
                    <img
                        src={metadata.imgUrl}
                        alt={metadata.title}
                        className="mb-8 w-full"
                    />
                )}

                <ReactMarkdown
                    remarkPlugins={[remarkGfm]} // Enable GitHub-flavored markdown features
                    children={content}
                    components={{
                        h1: ({ node, ...props }) => (
                            <h1
                                className="text-4xl font-bold mb-4"
                                {...props}
                            />
                        ),
                        h2: ({ node, ...props }) => (
                            <h2
                                className="text-3xl font-semibold mb-4"
                                {...props}
                            />
                        ),
                        p: ({ node, ...props }) => (
                            <p
                                className="mb-4 text-zinc-300 leading-relaxed"
                                {...props}
                            />
                        ),
                        a: ({ href, children, ...props }) => (
                            <a
                                href={href}
                                className="text-blue-500 hover:underline"
                                target="_blank"
                                rel="noopener noreferrer"
                                {...props}
                            >
                                {children}
                            </a>
                        ),
                        blockquote: ({ node, ...props }) => (
                            <blockquote
                                className="border-l-4 pl-4 italic text-zinc-400 border-zinc-600 mb-4"
                                {...props}
                            />
                        ),
                        ul: ({ children }) => (
                            <ul className="list-disc list-inside mb-4">
                                {children}
                            </ul>
                        ),
                        ol: ({ children }) => (
                            <ol className="list-decimal list-inside mb-4">
                                {children}
                            </ol>
                        ),
                        code({ node, inline, className, children, ...props }) {
                            const match = /language-(\w+)/.exec(
                                className || ""
                            );
                            return !inline && match ? (
                                <SyntaxHighlighter
                                    style={materialDark}
                                    language={match[1]}
                                    children={String(children).replace(
                                        /\n$/,
                                        ""
                                    )}
                                    {...props}
                                />
                            ) : (
                                <code
                                    className={`bg-zinc-700 p-1 rounded font-semibold ${className}`}
                                    {...props}
                                >
                                    {children}
                                </code>
                            );
                        },
                        br: () => <br className="my-4" />, // Adjust line breaks with margin
                    }}
                />
            </div>
        </div>
    );
};

export default BlogPost;
