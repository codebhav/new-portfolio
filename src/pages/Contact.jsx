import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

const Terminal = () => {
    const [step, setStep] = useState(0);
    const [form, setForm] = useState({
        email: "",
        name: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [currentInput, setCurrentInput] = useState("");
    const [error, setError] = useState("");

    const validateEmail = (email) => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    };

    const handleKeyPress = async (e) => {
        if (e.key !== "Enter") return;

        if (!currentInput.trim()) return;

        if (step === 0) {
            if (!validateEmail(currentInput)) {
                setError("Please enter a valid email address");
                return;
            }
            setError("");
            setForm((prev) => ({ ...prev, email: currentInput }));
            setStep(1);
        } else if (step === 1) {
            setForm((prev) => ({ ...prev, name: currentInput }));
            setStep(2);
        } else if (step === 2) {
            setForm((prev) => ({ ...prev, message: currentInput }));
            setIsSubmitting(true);

            try {
                await emailjs.send(
                    "service_lxock5n",
                    "template_gnhf8xb",
                    {
                        from_name: form.name,
                        to_name: "whybhav",
                        from_email: form.email,
                        to_email: "hi@whybhav.in",
                        message: currentInput,
                    },
                    "ZlPFXlxrMndDgdYG_"
                );
                setStep(3);
            } catch (error) {
                console.error(error);
                setStep(4);
            } finally {
                setIsSubmitting(false);
            }
        }
        setCurrentInput("");
    };

    return (
        <div className="min-h-screen bg-zinc-900 -mt-10 px-4 py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl mx-auto mt-20 rounded-lg overflow-hidden bg-[#1c1c1c] text-zinc-200"
            >
                {/* Terminal Header */}
                <div className="bg-[#2d2d2d] px-4 py-2 flex items-center">
                    <div className="flex gap-1.5 absolute">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="flex-1 text-center text-sm text-zinc-400">
                        hi@whybhav.in
                    </div>
                </div>

                {/* Terminal Content */}
                <div className="p-4 font-mono text-sm min-h-[280px]">
                    <div className="mb-4">$ ./initiating_conversation.sh</div>
                    <div className="border-t border-zinc-800 my-4"></div>

                    <div className="space-y-2">
                        {step >= 0 && (
                            <div className="flex gap-2">
                                <span className="text-zinc-500">
                                    To start, could you share
                                </span>
                                <span className="text-blue-400">
                                    your email?
                                </span>
                            </div>
                        )}
                        {error && <div className="text-red-400">✗ {error}</div>}
                        {form.email && (
                            <div className="flex gap-2 text-emerald-400">
                                <span>✓</span>
                                <span>{form.email}</span>
                            </div>
                        )}

                        {step >= 1 && (
                            <div className="flex gap-2">
                                <span className="text-zinc-500">
                                    Awesome! And what's
                                </span>
                                <span className="text-blue-400">
                                    your name?
                                </span>
                            </div>
                        )}
                        {form.name && (
                            <div className="flex gap-2 text-emerald-400">
                                <span>✓</span>
                                <span>{form.name}</span>
                            </div>
                        )}

                        {step >= 2 && !isSubmitting && step < 3 && (
                            <div className="flex gap-2">
                                <span className="text-zinc-500">
                                    Perfect, and how can I help you?
                                </span>
                            </div>
                        )}

                        {step < 3 && (
                            <div className="flex gap-2">
                                <span className="text-blue-400">→</span>
                                <input
                                    type="text"
                                    value={currentInput}
                                    onChange={(e) => {
                                        setCurrentInput(e.target.value);
                                        if (step === 0) setError("");
                                    }}
                                    onKeyPress={handleKeyPress}
                                    className="flex-1 bg-transparent outline-none"
                                    placeholder={
                                        isSubmitting ? "Sending..." : ""
                                    }
                                    disabled={isSubmitting}
                                    autoFocus
                                />
                            </div>
                        )}

                        {step === 3 && (
                            <div className="text-emerald-400">
                                Message sent successfully! Thanks for reaching
                                out! ✨
                            </div>
                        )}

                        {step === 4 && (
                            <div className="text-red-400">
                                Error sending message. Please try again. 😔
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Terminal;
