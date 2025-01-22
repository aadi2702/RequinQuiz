// generate-sitemap.js
const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');

const routes = [
  { path: '/', changefreq: 'daily', priority: 1.0 },
  { path: '/home', changefreq: 'daily', priority: 1.0 },
  { path: '/about', changefreq: 'monthly', priority: 0.7 },
  { path: '/aboutus', changefreq: 'monthly', priority: 0.7 },
  { path: '/contact', changefreq: 'monthly', priority: 0.7 },
  { path: '/projects', changefreq: 'weekly', priority: 0.8 },
  { path: '/blog', changefreq: 'weekly', priority: 0.8 },
  { path: '/blog/:uid', changefreq: 'weekly', priority: 0.8 },
  { path: '/web-development', changefreq: 'monthly', priority: 0.7 },
  { path: '/mobile-development', changefreq: 'monthly', priority: 0.7 },
  { path: '/software-solutions', changefreq: 'monthly', priority: 0.7 },
  { path: '/academic-solutions', changefreq: 'monthly', priority: 0.6 },
  { path: '/cloud-solutions', changefreq: 'monthly', priority: 0.7 },
  { path: '/digital-solutions', changefreq: 'monthly', priority: 0.6 },
  { path: '/life-at-requin', changefreq: 'monthly', priority: 0.5 },
  { path: '/careers', changefreq: 'monthly', priority: 0.7 },
  { path: '/career', changefreq: 'monthly', priority: 0.7 },
  { path: '/services', changefreq: 'monthly', priority: 0.7 },
  { path: '/termsandconditions', changefreq: 'yearly', priority: 0.5 },
  { path: '/faqs', changefreq: 'monthly', priority: 0.6 }
];

async function generateSitemap() {
  const sitemapStream = new SitemapStream({ hostname: 'https://requingroup.com' });
  const writeStream = createWriteStream('./public/sitemap.xml');

  sitemapStream.pipe(writeStream);

  routes.forEach(route => {
    sitemapStream.write({ url: route.path, changefreq: route.changefreq, priority: route.priority });
  });

  sitemapStream.end();

  await streamToPromise(sitemapStream);
}

generateSitemap().then(() => {
  console.log('Sitemap generated successfully!');
}).catch(err => {
  console.error('Error generating sitemap:', err);
});
