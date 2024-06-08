const { SitemapStream, streamToPromise } = require("sitemap");
const { createWriteStream } = require("fs");
const { resolve } = require("path");

// List your URLs here
const links = [
  { url: "/", changefreq: "daily", priority: 1.0 },
  { url: "/workouts", changefreq: "weekly", priority: 0.8 },
  // Add more URLs as needed
];

const sitemapPath = resolve(__dirname, "frontend/build/sitemap.xml");

(async () => {
  const sitemapStream = new SitemapStream({
    hostname: "https://your-app-name.herokuapp.com",
  });

  const writeStream = createWriteStream(sitemapPath);
  sitemapStream.pipe(writeStream);

  for (const link of links) {
    sitemapStream.write(link);
  }

  sitemapStream.end();

  await streamToPromise(sitemapStream)
    .then(() => {
      console.log("Sitemap created successfully");
    })
    .catch((err) => {
      console.error("Error creating sitemap:", err);
    });
})();
