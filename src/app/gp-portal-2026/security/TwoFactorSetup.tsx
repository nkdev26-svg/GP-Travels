"use client";

import { useState } from "react";
import { enable2FA, disable2FA } from "./actions";
import { Button } from "@/components/ui/Button";
import QRCode from "react-qr-code";
import { Shield, ShieldAlert, ShieldCheck, CheckCircle } from "lucide-react";

interface TwoFactorSetupProps {
    is2FAEnabled: boolean;
    initialUri: string | null;    // The otpauth:// URI for QR code
    rawSecret: string | null;     // The raw base32 secret to verify against
}

export function TwoFactorSetup({ is2FAEnabled, initialUri, rawSecret }: TwoFactorSetupProps) {
    const [enabled, setEnabled] = useState(is2FAEnabled);
    const [token, setToken] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const handleEnable = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!rawSecret) return;
        setLoading(true);
        setError("");
        setSuccess("");
        try {
            await enable2FA(rawSecret, token);
            setEnabled(true);
            setSuccess("Two-Factor Authentication has been enabled successfully! You will now need your authenticator app every time you log in.");
        } catch (err: any) {
            setError(err.message || "Invalid code. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleDisable = async () => {
        if (!confirm("Are you sure you want to disable 2FA? Your account will be less secure.")) return;
        setLoading(true);
        setError("");
        setSuccess("");
        try {
            await disable2FA();
            setEnabled(false);
            setSuccess("Two-Factor Authentication has been disabled.");
        } catch (err: any) {
            setError(err.message || "Failed to disable 2FA. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-xl space-y-6">
            {/* Status Banner */}
            <div className={`p-4 rounded-2xl flex items-center gap-3 border text-sm ${enabled
                ? "bg-green-500/10 border-green-500/20 text-green-400"
                : "bg-yellow-500/10 border-yellow-500/20 text-yellow-400"
                }`}>
                {enabled ? <ShieldCheck className="w-5 h-5 flex-shrink-0" /> : <ShieldAlert className="w-5 h-5 flex-shrink-0" />}
                <span>
                    {enabled
                        ? "Two-Factor Authentication is currently ENABLED. Your account has extra protection."
                        : "Two-Factor Authentication is currently DISABLED. We recommend enabling it."
                    }
                </span>
            </div>

            {/* Success Message */}
            {success && (
                <div className="p-4 rounded-2xl flex items-start gap-3 bg-green-500/10 border border-green-500/20 text-green-400 text-sm">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <p>{success}</p>
                </div>
            )}

            {/* Error Message */}
            {error && (
                <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                    {error}
                </div>
            )}

            {/* --- 2FA ENABLED VIEW --- */}
            {enabled && (
                <div className="bg-slate-900/50 border border-white/5 rounded-3xl p-8 space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                            <Shield className="w-6 h-6 text-green-400" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-white">2FA is Active</h3>
                            <p className="text-slate-400 text-sm">Your admin account is secured with an authenticator app.</p>
                        </div>
                    </div>

                    <div className="border-t border-white/5 pt-6">
                        <p className="text-slate-400 text-sm mb-4">
                            If you want to switch authenticator apps or disable 2FA, you can turn it off below. You will need to re-scan a new QR code to re-enable.
                        </p>
                        <Button
                            onClick={handleDisable}
                            disabled={loading}
                            className="bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 hover:text-red-300 font-semibold px-6 py-3 rounded-xl transition-all"
                        >
                            {loading ? "Disabling..." : "Disable 2FA"}
                        </Button>
                    </div>
                </div>
            )}

            {/* --- 2FA SETUP VIEW --- */}
            {!enabled && initialUri && rawSecret && (
                <div className="bg-slate-900/50 border border-white/5 rounded-3xl p-8 space-y-8">
                    <div>
                        <h3 className="text-lg font-bold text-white mb-1">Set Up 2FA</h3>
                        <p className="text-slate-400 text-sm">
                            Follow these steps to enable two-factor authentication:
                        </p>
                    </div>

                    <div className="space-y-6">
                        {/* Step 1 */}
                        <div className="flex gap-4">
                            <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 text-primary font-bold flex items-center justify-center flex-shrink-0 text-sm">1</div>
                            <div>
                                <p className="text-white font-medium text-sm">Install an authenticator app</p>
                                <p className="text-slate-500 text-xs mt-1">Download <strong className="text-slate-400">Google Authenticator</strong> or <strong className="text-slate-400">Authy</strong> on your phone.</p>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="flex gap-4">
                            <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 text-primary font-bold flex items-center justify-center flex-shrink-0 text-sm">2</div>
                            <div className="w-full">
                                <p className="text-white font-medium text-sm mb-4">Scan this QR code with your authenticator app</p>
                                <div className="bg-slate-100 p-4 rounded-2xl inline-block shadow-xl ring-4 ring-primary/20">
                                    <QRCode value={initialUri} size={180} />
                                </div>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="flex gap-4">
                            <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 text-primary font-bold flex items-center justify-center flex-shrink-0 text-sm">3</div>
                            <div className="w-full">
                                <p className="text-white font-medium text-sm mb-3">Enter the 6-digit code to confirm and activate</p>
                                <form onSubmit={handleEnable} className="space-y-3">
                                    <input
                                        type="text"
                                        inputMode="numeric"
                                        placeholder="000000"
                                        value={token}
                                        onChange={(e) => setToken(e.target.value.replace(/\D/g, "").slice(0, 6))}
                                        maxLength={6}
                                        required
                                        className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-slate-600 outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all tracking-[0.5em] text-center text-2xl font-mono"
                                    />
                                    <Button
                                        type="submit"
                                        disabled={loading || token.length !== 6}
                                        className="w-full py-3 font-bold"
                                    >
                                        {loading ? "Verifying & Enabling..." : "Verify & Enable 2FA"}
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
