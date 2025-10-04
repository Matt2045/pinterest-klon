import React from 'react';
import {loginWithGoogle} from "../../../appwrite/auth";
import {account} from "../../../appwrite/client";
import {redirect} from "react-router";


const SignIn = () => {

        return (
            <div className="relative w-full h-screen overflow-hidden">
                {/* Hintergrund-Video oder Bild */}
                <video
                    autoPlay
                    loop
                    muted
                    className="absolute inset-0 object-cover w-full h-full"
                >
                    <source src="/bg.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>

                {/* Alternativ statisches Bild */}
                {/* <img src="/bg.jpg" alt="Background" className="absolute inset-0 object-cover w-full h-full" /> */}

                {/* Overlay für Glassmorphism */}
                <div className="absolute inset-0 bg-black/30 backdrop-blur-md" />

                {/* Login-Box */}
                <div className="relative z-10 flex items-center justify-center h-full">
                    <div className="glass p-8 w-96 max-w-full text-white">
                        <h2 className="text-2xl font-semibold mb-6 text-center">Willkommen zurück</h2>

                        {/* Dummy Inputs */}
                        <input
                            type="email"
                            placeholder="E-Mail"
                            className="w-full px-4 py-2 mb-4 rounded bg-white/10 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                        />
                        <input
                            type="password"
                            placeholder="Passwort"
                            className="w-full px-4 py-2 mb-6 rounded bg-white/10 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                        />

                        <button className="w-full py-2 bg-white/20 hover:bg-white/30 transition rounded text-white font-semibold">
                            Login
                        </button>

                        <p className="text-center text-sm mt-4 text-white/70">oder</p>

                        {/* Später: Google-Login mit Appwrite */}
                        <button className="mt-4 w-full py-2 bg-white text-black font-semibold rounded hover:bg-gray-200 transition" onClick={loginWithGoogle}>
                            Mit Google anmelden
                        </button>
                    </div>
                </div>
            </div>
        )
};

export default SignIn;