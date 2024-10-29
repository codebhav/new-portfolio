import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

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

    return (
        <ul
            onMouseLeave={() => {
                setPosition((pv) => ({
                    ...pv,
                    opacity: 0,
                }));
            }}
            className="relative mx-auto flex w-fit rounded-full border-2 border-zinc-400 bg-zinc-800 p-1"
        >
            <Tab to="/" setPosition={setPosition}>
                Home
            </Tab>
            {/* <Tab to="/projects" setPosition={setPosition}>
                Projects
            </Tab> */}
            <Tab to="/blog" setPosition={setPosition}>
                Blog
            </Tab>
            <Tab to="/photos" setPosition={setPosition}>
                Photos
            </Tab>
            <Tab to="/contact" setPosition={setPosition}>
                Contact
            </Tab>

            <Cursor position={position} />
        </ul>
    );
};

const Tab = ({ children, setPosition, to }) => {
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
            }}
            className="relative z-10 block cursor-pointer px-3 py-1.5 text-xs uppercase text-white mix-blend-difference md:px-5 md:py-2 md:text-base"
        >
            {/* Use the Link component for routing */}
            <Link to={to}>{children}</Link>
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