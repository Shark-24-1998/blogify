export function generateSeo({
  title = 'Tech Blog | Stay updated with the latest in web development',
  description = 'Explore insightful articles on Next.js, React, and modern web development trends. Stay current with best practices and expert advice.',
  images = [
    {
      url: '/blog_cover.png',
      width: 1200,
      height: 630,
      alt: 'Tech Blog Cover'
    }
  ],
  siteName = 'DevBlog',
  metadataBase = new URL("https://multilang-nine.vercel.app/en"),
  type = 'article',
  locale = 'en_US'
} = {}) {
  return {
    title: {
      default: title,
      template: `%s - ${title.split('|')[0].trim()}`
    },
    description,
    metadataBase,
    openGraph: {
      title,
      description,
      images,
      type,
      siteName,
      locale
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images
    }
  };
}

// ✅ Add this helper
export function getClientSeoData() {
  const {
    title: { default: title },
    description,
    openGraph
  } = generateSeo();

  const image = openGraph.images?.[0]?.url || "";
  const alt = openGraph.images?.[0]?.alt || "";

  return { title, description, image, alt };
}
