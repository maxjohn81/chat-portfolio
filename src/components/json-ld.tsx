export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Rivo Andriharisoa",
    jobTitle: "Développeur full-stack web et mobile",
    url: "https://rivo-andriharisoa-site.vercel.app",
    image: "https://rivo-andriharisoa-site.vercel.app/icon.png",
    sameAs: [
      "https://www.linkedin.com/in/andriharisoa-rivo",
      "https://github.com/maxjohn81",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}