import React from "react";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { FiArrowDown, FiMail, FiMapPin } from "react-icons/fi";
import { SiGithub, SiSubstack, SiInstagram, SiLinkedin } from "react-icons/si";

const Home = () => {
    return (
        <div className="min-h-screen bg-zinc-900 -mt-10 px-4 py-12 text-zinc-50">
            <motion.div
                initial="initial"
                animate="animate"
                transition={{
                    staggerChildren: 0.05,
                }}
                className="mx-auto grid max-w-4xl grid-flow-dense grid-cols-12 gap-4"
            >
                <HeaderBlock />
                <SocialsBlock />
                <AboutBlock />
                <LocationBlock />
                <EmailListBlock />
            </motion.div>
            <Footer />
        </div>
    );
};

const Block = ({ className, ...rest }) => {
    return (
        <motion.div
            variants={{
                initial: {
                    scale: 0.5,
                    y: 50,
                    opacity: 0,
                },
                animate: {
                    scale: 1,
                    y: 0,
                    opacity: 1,
                },
            }}
            transition={{
                type: "spring",
                mass: 3,
                stiffness: 400,
                damping: 50,
            }}
            className={twMerge(
                "col-span-4 rounded-lg border border-zinc-700 bg-zinc-800 p-6",
                className
            )}
            {...rest}
        />
    );
};

const HeaderBlock = () => (
    <Block className="col-span-12 row-span-2 md:col-span-6">
        <img
            src="https://i.imgur.com/msiG09p.png"
            alt="avatar"
            className="mb-4 size-24 rounded-full"
        />
        <h1 className="mb-12 text-4xl font-medium leading-tight">
            Hi, I'm Bhav.{" "}
            <span className="text-zinc-400">I like making cool sh*t.</span>
        </h1>
        <a
            href="mailto:hi@whybhav.in"
            className="flex items-center gap-1 text-red-300 hover:underline"
        >
            Download Resume <FiArrowDown />
        </a>
    </Block>
);

const SocialsBlock = () => (
    <>
        <Block
            whileHover={{
                rotate: "-2.5deg",
                scale: 1.1,
            }}
            className="col-span-6 bg-green-600 md:col-span-3"
        >
            <a
                href="https://github.com/codebhav"
                className="grid h-full place-content-center text-3xl text-white"
            >
                <SiGithub />
            </a>
        </Block>
        <Block
            whileHover={{
                rotate: "2.5deg",
                scale: 1.1,
            }}
            className="col-span-6 bg-blue-500 md:col-span-3"
        >
            <a
                href="https://linkedin.com/in/whybhav/"
                className="grid h-full place-content-center text-3xl text-white"
            >
                <SiLinkedin />
            </a>
        </Block>

        <Block
            whileHover={{
                rotate: "-2.5deg",
                scale: 1.1,
            }}
            className="col-span-6 bg-orange-600 md:col-span-3"
        >
            <a
                href="https://whybhav.substack.com/"
                className="grid h-full place-content-center text-3xl text-white"
            >
                <SiSubstack />
            </a>
        </Block>
        <Block
            whileHover={{
                rotate: "2.5deg",
                scale: 1.1,
            }}
            className="col-span-6 bg-rose-500 md:col-span-3"
        >
            <a
                href="https://instagram.com/reallywhybhav"
                className="grid h-full place-content-center text-3xl text-white"
            >
                <SiInstagram />
            </a>
        </Block>
    </>
);

const AboutBlock = () => (
    <Block className="col-span-12 text-3xl leading-snug">
        <p>
            My passion is building cool stuff.{" "}
            <span className="text-zinc-400">
                I build primarily with React and Tailwind CSS. I'm currently
                pursing a Master's degree in Computer Science from Stevens
                Institute of Technology.
            </span>
        </p>
    </Block>
);

const LocationBlock = () => (
    <Block className="col-span-12 flex flex-col items-center gap-4 md:col-span-3">
        <FiMapPin className="text-3xl" />
        <p className="text-center text-lg text-zinc-400">NJ, USA</p>
    </Block>
);

const EmailListBlock = () => (
    <Block className="col-span-12 md:col-span-9">
        <p className="mb-3 text-lg">Subscribe to my weekly newsletter</p>
        <form
            onSubmit={(e) => e.preventDefault()}
            className="flex items-center gap-2"
        >
            <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded border border-zinc-700 bg-zinc-800 px-3 py-1.5 transition-colors focus:border-red-300 focus:outline-0"
            />
            <button
                type="submit"
                className="flex items-center gap-2 whitespace-nowrap rounded bg-zinc-50 px-3 py-2 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-300"
            >
                <FiMail /> Join the list
            </button>
        </form>
    </Block>
);

const Footer = () => {
    return (
        <footer className="mt-12">
            <p className="text-center text-zinc-400">
                Made with ❤️ by{" "}
                <a href="#" className="text-red-300 hover:underline">
                    @whybhav
                </a>
            </p>
        </footer>
    );
};

export default Home;
