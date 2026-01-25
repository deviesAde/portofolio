export default function robots() {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: "/private/",
        },
        sitemap: "https://portofolio-devies-ade.vercel.app/sitemap.xml",
    };
}
