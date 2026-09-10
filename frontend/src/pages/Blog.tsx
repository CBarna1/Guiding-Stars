import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Reveal from '../components/Reveal';
import ScrollProgress from '../components/ScrollProgress';
import ImageWithSkeleton from '../components/ImageWithSkeleton';
import { SEOHelmet } from '../hooks/useSEO';
import api from '../services/api';

interface BlogPostSummary {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  cover_image: string | null;
  author: string | null;
  published_at: string;
}

const Blog = () => {
  const [posts, setPosts] = useState<BlogPostSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/blog')
      .then(res => setPosts(res.data?.data || []))
      .catch(err => console.error('Failed to load blog posts:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-white min-h-screen">
      <SEOHelmet pageName="blog" />
      <ScrollProgress />

      {/* Header */}
      <section className="relative py-20 md:py-28 text-center text-white" style={{ background: 'linear-gradient(135deg, #FF9148 0%, #E8722E 100%)' }}>
        <div className="container mx-auto px-6">
          <h6 className="uppercase text-lg font-semibold tracking-wide mb-3 opacity-90">Blog &amp; Newsletter</h6>
          <h1 className="text-4xl md:text-5xl font-bold">Stories &amp; Updates</h1>
          <p className="mt-4 text-lg opacity-90 max-w-2xl mx-auto">
            News, milestones, and updates from the Guiding Stars community.
          </p>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <div className="h-48 skeleton-shimmer" />
                  <div className="p-6 space-y-3">
                    <div className="h-4 w-3/4 rounded skeleton-shimmer" />
                    <div className="h-3 w-full rounded skeleton-shimmer" />
                    <div className="h-3 w-2/3 rounded skeleton-shimmer" />
                  </div>
                </div>
              ))}
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📰</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Nothing published yet</h2>
              <p className="text-gray-500 max-w-md mx-auto">
                We're working on our first post. Check back soon for news and updates from Guiding Stars.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, idx) => (
                <Reveal key={post.id} delay={idx * 80}>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="group block bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden h-full"
                  >
                    {post.cover_image ? (
                      <ImageWithSkeleton
                        src={post.cover_image}
                        alt={post.title}
                        wrapperClassName="h-48"
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div
                        className="h-48 flex items-center justify-center text-5xl"
                        style={{ background: 'linear-gradient(135deg, #FF914822, #E8722E22)' }}
                      >
                        📰
                      </div>
                    )}
                    <div className="p-6">
                      <p className="text-xs text-gray-400 mb-2 uppercase tracking-wide">
                        {new Date(post.published_at).toLocaleDateString(undefined, { dateStyle: 'long' })}
                        {post.author && ` · ${post.author}`}
                      </p>
                      <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-[#FF9148] transition-colors">
                        {post.title}
                      </h3>
                      {post.excerpt && (
                        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">{post.excerpt}</p>
                      )}
                      <span className="inline-block mt-4 text-sm font-semibold" style={{ color: '#FF9148' }}>
                        Read more →
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
