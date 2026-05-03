import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title: string;
  description?: string;
  jsonLd?: object;
}

export const SEO = ({ title, description, jsonLd }: SEOProps) => {
  const location = useLocation();

  useEffect(() => {
    document.title = `${title} | CivicConnect`;
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription && description) {
      metaDescription.setAttribute('content', description);
    }

    // JSON-LD Structured Data
    const existingScript = document.getElementById('json-ld');
    if (existingScript) {
      existingScript.remove();
    }

    if (jsonLd) {
      const script = document.createElement('script');
      script.id = 'json-ld';
      script.type = 'application/ld+json';
      script.innerHTML = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }

    // Scroll to top on route change if no hash is present
    if (!location.hash) {
      window.scrollTo(0, 0);
    }
  }, [title, description, location.pathname, location.hash]);

  return null;
};
