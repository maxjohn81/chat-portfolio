"use client";

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PROFILE } from "@/lib/profile";
import { Phone, Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const SOCIAL_ICONS = { github: FaGithub, linkedin: FaLinkedin };

interface Props {
    children: React.ReactNode;
}

export function ProfileModal({ children }: Props) {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger >
                <button className="cursor-pointer rounded-full transition-transform hover:scale-105 active:scale-95">
                    {children}
                </button>
            </DialogTrigger>

            <DialogContent className="max-w-sm overflow-hidden p-0 gap-0">
                {/* Bandeau coloré en fond, façon carte de visite */}
                <div className="h-20 bg-gradient-to-r from-blue-500 to-violet-500" />

                <div className="flex flex-col items-center px-6 pb-6 -mt-10">
                    <Avatar className="h-20 w-20 border-4 border-background shadow-md">
                        <AvatarImage src={PROFILE.avatar} alt={PROFILE.name} />
                        <AvatarFallback className="bg-blue-100 text-lg text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                            RA
                        </AvatarFallback>
                    </Avatar>

                    <h2 className="mt-3 text-base font-semibold">{PROFILE.name}</h2>
                    <p className="text-sm text-muted-foreground">{PROFILE.title}</p>

                    <p className="mt-4 text-center text-sm leading-relaxed text-muted-foreground">
                        {PROFILE.bio}
                    </p>

                    <div className="mt-5 w-full space-y-1 border-t pt-4">
                        <a
                            href={`tel:${PROFILE.phone.replace(/\s/g, "")}`}
                            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-muted"
                        >
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span>{PROFILE.phone}</span>
                        </a>

                        <a
                            href={`mailto:${PROFILE.email}`}
                            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-muted"
                        >
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <span>{PROFILE.email}</span>
                        </a>

                        {PROFILE.socials.map((social) => {
                            const Icon = SOCIAL_ICONS[social.icon];
                            return (
                                <a
                                    key={social.label}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-muted"
                                >
                                    <Icon className="h-4 w-4 text-muted-foreground" />
                                    <span>{social.label}</span>
                                </a>
                            );
                        })}
                    </div>
                </div>
            </DialogContent>
        </Dialog >
    );
}