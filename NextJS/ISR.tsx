/*
ISR means Incremental Static Regeneration.

It is a technique to update static pages without rebuilding the entire site.
It ensure proper caching of pages and also ensure proper SEO.
It reduces the server load by serving pre rendered static pages for most of the time.
Example: handle large amount of content pages like blog posts, product pages, etc.

How ISR Works in Next.js:
1 - Request Phase:
 - i - User requests a page
 - ii - Server checks if the page is in the cache
 - iii - If not, the page is generated on the fly
 - iv - The page is cached for a short period of time
 - v - The page is served from the cache
2 - Client Phase:
 - i - Browser receives the page
 - ii - The page is displayed
*/

import React from "react";
import type { GetStaticPaths, GetStaticProps } from "next";

interface Post {
  id: string;
  title: string;
  content: string;
}

interface Props {
  post: Post;
}

// fetches paths for all the pages that need to be prerendered
// and adds a id parameter to the path
export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await fetch("https://api.vercel.app/blog").then((res) =>
    res.json()
  );
  const paths = posts.map((post: Post) => ({
    params: { id: String(post.id) },
  }));

  // We'll prerender only these paths at build time.
  // { fallback: 'blocking' } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: false };
};

// fetches the data for the specific page.
// If the page is not in the cache, it will be generated on the fly.
export const getStaticProps: GetStaticProps<Props> = async ({
  params,
}: {
  params: { id: string };
}) => {
  const post = await fetch(`https://api.vercel.app/blog/${params.id}`).then(
    (res) => res.json()
  );

  return {
    props: { post },
    // Next.js will invalidate the cache when a
    // request comes in, at most once every 60 seconds.
    revalidate: 60,
  };
};

export default function Page({ post }: Props) {
  return (
    <main>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </main>
  );
}

/*
How the example works?

1. During next build, all known blog posts are generated (there are 25 in this example)
2. All requests made to these pages (e.g. /blog/1) are cached and instantaneous
3. After 60 seconds has passed, the next request will still show the cached (stale) page
4. The cache is invalidated and a new version of the page begins generating in the background
5. Once generated successfully, Next.js will display and cache the updated page
6. If /blog/26 is requested, Next.js will generate and cache this page on-demand

*/

// Revalidate is a configuration option in Next.js that determines
//how frequently a page should be regenerated in the background.
// It's measured in seconds and is a key part of Incremental Static Regeneration (ISR).
