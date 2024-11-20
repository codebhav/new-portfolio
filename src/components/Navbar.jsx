import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="bg-zinc-900 py-10">
            <SlideTabs />
        </div>
    );
};

const SlideTabs = () => {
    const [position, setPosition] = useState({
        left: 0,
        width: 0,
        opacity: 0,
    });
    const [activeTab, setActiveTab] = useState(null);
    const navigate = useNavigate();

    const handleMouseLeave = () => {
        setPosition((pv) => ({
            ...pv,
            opacity: 0,
        }));
        setActiveTab(null);
    };

    const handleClick = () => {
        if (activeTab) {
            navigate(activeTab);
        }
    };

    return (
        <ul
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
            className="relative mx-auto flex w-fit rounded-full border-2 border-zinc-400 bg-zinc-800 p-1"
        >
            <Tab to="/" setPosition={setPosition} setActiveTab={setActiveTab}>
                Home
            </Tab>
            <Tab
                to="/blog"
                setPosition={setPosition}
                setActiveTab={setActiveTab}
            >
                Blog
            </Tab>
            <Tab
                to="/photos"
                setPosition={setPosition}
                setActiveTab={setActiveTab}
            >
                Photos
            </Tab>
            <Tab
                to="/contact"
                setPosition={setPosition}
                setActiveTab={setActiveTab}
            >
                Contact
            </Tab>

            <Cursor position={position} />
        </ul>
    );
};

const Tab = ({ children, setPosition, setActiveTab, to }) => {
    const ref = useRef(null);

    return (
        <li
            ref={ref}
            onMouseEnter={() => {
                if (!ref?.current) return;

                const { width } = ref.current.getBoundingClientRect();

                setPosition({
                    left: ref.current.offsetLeft,
                    width,
                    opacity: 1,
                });
                setActiveTab(to);
            }}
            className="relative z-10 block cursor-pointer px-3 py-1.5 text-xs uppercase text-white mix-blend-difference md:px-5 md:py-2 md:text-base"
        >
            {children}
        </li>
    );
};

const Cursor = ({ position }) => {
    return (
        <motion.li
            animate={{
                ...position,
            }}
            className="absolute z-0 h-7 rounded-full bg-white md:h-10"
        />
    );
};

export default Navbar;
