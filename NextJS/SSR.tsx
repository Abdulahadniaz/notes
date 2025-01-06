import React from "react";
/*
SSR means Server Side Rendering.
It is a technique in which html is generated on each request.

How SSR Works in Next.js:
1 - Request Phase:
 - i - User requests a page
 - ii - Server receives the request
 - iii - Next.js executes the page code
 - iv - Data is fetched if needed
 - v - HTML is generated with the data
 - vi - Complete HTML is sent to client
2 - Client Phase:
 - i - Browser receives HTML and displays non-interactive page
 - ii - React hydrates the page making it interactive
 - iii - JavaScript bundles are loaded and executed
*/

// Old way of doing SSR
// This is a Server-Side Rendered page
function OldSSRPage({ data }) {
  return (
    <div>
      <h1>Server-side Rendered Content</h1>
      <p>Data from server: {data.message}</p>
    </div>
  );
}

// This function runs on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch("https://api.example.com/data");
  const data = await res.json();

  // Pass data to the page via props
  return {
    props: {
      data,
    },
  };
}

// Alternative Using App Router (Modern Approach):
// Server Component (SSR by default)
async function NewSSRPage() {
  // This fetch happens on the server for every request
  const res = await fetch("https://api.example.com/data", {
    cache: "no-store", // Ensures fresh data on every request
  });
  const data = await res.json();

  return (
    <div>
      <h1>Server-side Rendered Content</h1>
      <p>Data from server: {data.message}</p>
    </div>
  );
}

/*
Consider these things:

1. Performance: SSR can be slower than static generation because the server must generate pages on every request.
2. Server Load: Higher server load compared to static pages as computation happens per request.
3. TTFB (Time To First Byte): May be slower than static pages as content must be generated before sending.
4. Caching: Consider implementing caching strategies if data doesn't need to be 100% real-time.
5. Cost: May be more expensive due to increased server computation requirements.
*/

// Some examples of pages that are server-side rendered:

/*

async function DashboardPage() {
  const analytics = await fetchRealTimeAnalytics()
  const userActivity = await fetchLatestActivity()
  
  return (
    <Dashboard 
      analytics={analytics}
      userActivity={userActivity}
    />
  )
}

async function ProfilePage() {
  const user = await getCurrentUser();
  const recommendations = await getPersonalizedContent(user.id);

  return <UserProfile userData={user} recommendations={recommendations} />;
}
*/

/*
When to avoid SSR:
1 - Static Content: Blog posts, documentation, marketing pages
2 - Rarely Updated Data: Company information, terms of service
3 - Public, Non-Interactive Pages: About pages, contact information
4 - Content that can be Cached: Product catalogs with infrequent updates
*/
