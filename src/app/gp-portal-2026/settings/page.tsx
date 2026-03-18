import { prisma } from "@/lib/db";
import { SettingsForm } from "@/components/forms/SettingsForm";

export default async function SettingsPage() {
    const settings = await prisma.siteSettings.findMany();
    const settingsMap: Record<string, string> = {};
    settings.forEach(s => {
        settingsMap[s.key] = s.value;
    });

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-black tracking-tight text-white mb-2">Site Settings</h2>
                    <p className="text-slate-400">Manage your agency's contact info and global content.</p>
                </div>
            </div>

            <SettingsForm initialSettings={settingsMap} />
        </div>
    );
}
