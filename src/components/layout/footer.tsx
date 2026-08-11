import { Mail, Phone } from "lucide-react";
import { PROFILE } from "@/lib/profile";

const navigation = [
  { label: "Accueil", href: "#accueil" },
  { label: "Projets", href: "#projets" },
  { label: "Expérience", href: "#experience" },
];

export function Footer() {
  return (
    <footer className="border-t bg-background/80 backdrop-blur">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          <div>
            <p className="font-semibold">{PROFILE.name}</p>
            <p className="mt-1 text-sm text-muted-foreground">{PROFILE.title}</p>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              Basé à Madagascar, je conçois des applications complètes du back-end à l'interface finale.
            </p>
          </div>

          <div>
            <p className="mb-3 text-sm font-medium uppercase tracking-wide text-muted-foreground">
              Navigation
            </p>
            <ul className="space-y-2 text-sm">
              {navigation.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="text-muted-foreground transition-colors hover:text-foreground">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-3 text-sm font-medium uppercase tracking-wide text-muted-foreground">
              Contact
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Mail className="h-4 w-4" />
                  {PROFILE.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${PROFILE.phone.replace(/\s+/g, "")}`}
                  className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Phone className="h-4 w-4" />
                  {PROFILE.phone}
                </a>
              </li>
            </ul>
            <div className="mt-4 flex gap-2">
              {PROFILE.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border bg-background text-muted-foreground transition-colors hover:text-foreground"
                >
                  {social.icon === "github" ? (
                    <Mail className="h-4 w-4" />
                  ) : (
                    <Mail className="h-4 w-4" />
                  )}
                </a>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-8 border-t pt-4 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} {PROFILE.name} — Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
