import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Photos from "./pages/Photos";
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar";

const App = () => {
    const location = useLocation(); // Get current location from BrowserRouter

    return (
        <div>
            {/* Render Navbar at the top */}
            <Navbar />

            <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                    <Route
                        path="/"
                        element={
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <Home />
                            </motion.div>
                        }
                    />
                    <Route
                        path="/blog"
                        element={
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{ duration: 0.5 }}
                            >
                                <Blog />
                            </motion.div>
                        }
                    />
                    <Route
                        path="/blog/:slug" // Dynamic route for blog post
                        element={
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{ duration: 0.5 }}
                            >
                                <BlogPost /> {/* Render individual blog post */}
                            </motion.div>
                        }
                    />
                    <Route
                        path="/photos"
                        element={
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <Photos />
                            </motion.div>
                        }
                    />
                    <Route
                        path="/contact"
                        element={
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <Contact />
                            </motion.div>
                        }
                    />
                </Routes>
            </AnimatePresence>
        </div>
    );
};

export default App;
