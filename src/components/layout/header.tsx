"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Briefcase, FolderKanban, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { ProfileModal } from "../profile-modal";
import { Home, Search, User, Settings } from "lucide-react";
import HamburgerMenuOverlay from "../lightswind/hamburger-menu-overlay";



const menuItems = [
    { label: "Accueil", icon: <Home size={20} />, href: "#accueil" },
    { label: "Projets", icon: <FolderKanban size={20} />, href: "#projets" },
    { label: "Expérience", icon: <Briefcase size={20} />, href: "#experience" },
];
export function Header() {
    const { theme, setTheme } = useTheme();

    return (
        <header className="fixed top-0 left-0 right-0 z-10 border-b bg-background/80 backdrop-blur">
            <div className="mx-auto flex w-full max-w-6xl items-center justify-between md:px-6 py-3">
                <div className="flex items-center gap-3 sm:hidden">
                    <HamburgerMenuOverlay
                        items={menuItems}
                        buttonTop="30px"
                        buttonLeft="30px"
                        buttonColor="#10b981"
                        overlayBackground="#10b981"
                    />
                </div>
                <div className="flex items-center gap-3 hidden sm:flex">

                    <ProfileModal>
                        <Avatar className="h-9 w-9">
                            <AvatarImage src="/icon.png" alt="Rivo Andriharisoa" />
                            <AvatarFallback className="bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">RA</AvatarFallback>
                        </Avatar>
                    </ProfileModal>
                    <div>
                        <p className="text-sm font-medium leading-none">Rivo Andriharisoa</p>
                        <div className="mt-1 flex items-center gap-1.5">
                            <span className="relative flex h-1.5 w-1.5">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            </span>
                            <Badge variant="secondary" className="text-xs font-normal">
                                Développeur full-stack web et mobile
                            </Badge>
                        </div>
                    </div>
                </div>

                <Button variant="ghost" size="icon-lg" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label="Changer de thème" className="mr-4">
                    <Sun className="h-4 w-4 dark:hidden" />
                    <Moon className="hidden h-4 w-4 dark:block" />
                </Button>
                {/* // Custom positioning and styling */}

            </div>
        </header>
    );
}