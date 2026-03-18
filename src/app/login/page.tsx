"use client";

import React, { useState } from 'react';
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Lock, User, AlertCircle, KeyRound } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useState("");
    const [show2FA, setShow2FA] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const result = await signIn("credentials", {
                username,
                password,
                token,
                redirect: false,
            });

            if (result?.error) {
                if (result.error === "2FA token required") {
                    setShow2FA(true);
                    setError("Please enter your 2FA code from your authenticator app.");
                } else {
                    setError(result.error);
                }
            } else {
                router.push("/gp-portal-2026");
                router.refresh();
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
            <div className="w-full max-w-md relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-3xl blur opacity-25" />

                <div className="relative bg-slate-900 border border-white/10 p-8 rounded-3xl backdrop-blur-xl">
                    <div className="text-center mb-10">
                        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-primary/20">
                            <Lock className="w-8 h-8 text-primary" />
                        </div>
                        <h1 className="text-2xl font-bold text-white">Admin Login</h1>
                        <p className="text-slate-400 mt-2">Enter your credentials to manage GP Tour</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-400 text-sm">
                            <AlertCircle className="w-5 h-5 flex-shrink-0" />
                            <p>{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300 ml-1">Username</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-primary transition-colors">
                                    <User className="w-5 h-5" />
                                </div>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="block w-full pl-11 pr-4 py-4 bg-slate-950/50 border border-white/10 rounded-2xl text-white outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all placeholder:text-slate-600"
                                    placeholder="Username"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300 ml-1">Password</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-primary transition-colors">
                                    <Lock className="w-5 h-5" />
                                </div>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full pl-11 pr-4 py-4 bg-slate-950/50 border border-white/10 rounded-2xl text-white outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all placeholder:text-slate-600"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        {show2FA && (
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300 ml-1 flex items-center gap-2">
                                    <KeyRound className="w-4 h-4 text-primary" />
                                    Authenticator Code
                                </label>
                                <input
                                    type="text"
                                    value={token}
                                    maxLength={6}
                                    onChange={(e) => setToken(e.target.value)}
                                    className="block w-full px-4 py-4 bg-slate-950/50 border border-primary/30 rounded-2xl text-white outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all placeholder:text-slate-600 text-center tracking-widest text-lg"
                                    placeholder="000000"
                                    autoFocus
                                />
                            </div>
                        )}

                        <Button
                            type="submit"
                            className="w-full py-4 rounded-2xl font-bold tracking-wide"
                            disabled={loading}
                        >
                            {loading ? "Authenticating..." : "Sign In"}
                        </Button>

                        <div className="flex flex-col gap-3 mt-4">
                            {!show2FA && (
                                <p className="text-center text-slate-600 text-xs">
                                    Have a 2FA code?{" "}
                                    <button
                                        type="button"
                                        onClick={() => setShow2FA(true)}
                                        className="text-primary hover:underline"
                                    >
                                        Enter it here
                                    </button>
                                </p>
                            )}
                            <p className="text-center text-slate-500 text-xs mt-2 font-bold uppercase tracking-widest leading-relaxed">
                                Don't have an account? <br/>
                                <a href="/register" className="text-primary hover:text-white transition-colors">
                                    Register as Admin
                                </a>
                            </p>
                            <p className="text-center text-slate-600 text-[10px] mt-2">
                                <a href="/forgot-password" className="text-slate-500 hover:text-white transition-colors uppercase tracking-tighter">
                                    Forgot Password?
                                </a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
