import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Calendar, User, ArrowRight, TrendingUp, Shield, Brain, Globe, MessageSquare, BarChart3 } from 'lucide-react';
import Button from '../ui/Button';
import Card from '../ui/Card';

const BlogPage = () => {
  const { colors } = useTheme();

  const featuredPost = {
    id: 1,
    title: "The Future of AI-Powered Content Moderation: Trends and Innovations for 2025",
    excerpt: "As we advance into 2025, artificial intelligence continues to revolutionize how we approach content moderation and hate speech detection. This comprehensive analysis explores the latest developments in machine learning algorithms, natural language processing, and computer vision technologies that are reshaping the digital safety landscape.",
    author: "Dr. Sarah Chen",
    date: "2024-12-15",
    readTime: "8 min read",
    category: "AI Technology",
    image: "/api/placeholder/800/400",
    featured: true
  };

  const blogPosts = [
    {
      id: 2,
      title: "Understanding the Psychology Behind Online Hate Speech",
      excerpt: "A deep dive into the psychological factors that drive individuals to engage in hate speech online, and how understanding these motivations can help us build better detection systems.",
      author: "Prof. Michael Rodriguez",
      date: "2024-12-12",
      readTime: "6 min read",
      category: "Psychology",
      image: "/api/placeholder/400/250"
    },
    {
      id: 3,
      title: "Building Resilient Communities: Best Practices for Platform Safety",
      excerpt: "Explore proven strategies and methodologies that successful online platforms use to maintain safe, inclusive environments while preserving freedom of expression.",
      author: "Lisa Thompson",
      date: "2024-12-10",
      readTime: "5 min read",
      category: "Community Safety",
      image: "/api/placeholder/400/250"
    },
    {
      id: 4,
      title: "The Role of Machine Learning in Real-Time Content Analysis",
      excerpt: "Technical insights into how advanced machine learning models process and analyze millions of pieces of content in real-time to identify potential threats and harmful material.",
      author: "Alex Kumar",
      date: "2024-12-08",
      readTime: "7 min read",
      category: "Machine Learning",
      image: "/api/placeholder/400/250"
    },
    {
      id: 5,
      title: "Global Perspectives on Digital Rights and Content Moderation",
      excerpt: "An examination of how different cultures and legal frameworks approach the balance between free speech and content moderation across various international jurisdictions.",
      author: "Dr. Elena Vasquez",
      date: "2024-12-05",
      readTime: "9 min read",
      category: "Policy & Law",
      image: "/api/placeholder/400/250"
    },
    {
      id: 6,
      title: "Emerging Threats in Social Media: What to Watch in 2025",
      excerpt: "Identifying and analyzing new forms of online harassment, misinformation campaigns, and coordinated inauthentic behavior that platforms need to prepare for.",
      author: "James Wilson",
      date: "2024-12-03",
      readTime: "6 min read",
      category: "Threat Analysis",
      image: "/api/placeholder/400/250"
    }
  ];

  const categories = [
    { name: "AI Technology", count: 12, icon: Brain },
    { name: "Community Safety", count: 8, icon: Shield },
    { name: "Machine Learning", count: 15, icon: BarChart3 },
    { name: "Psychology", count: 6, icon: MessageSquare },
    { name: "Policy & Law", count: 9, icon: Globe },
    { name: "Threat Analysis", count: 11, icon: TrendingUp }
  ];

  return (
    <div className="min-h-screen pt-20" style={{ backgroundColor: colors.bg }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 
            className="text-5xl font-bold mb-6"
            style={{ color: colors.text }}
          >
            Insights & Analysis
          </h1>
          <p 
            className="text-xl max-w-3xl mx-auto leading-relaxed"
            style={{ color: colors.textMuted }}
          >
            Explore the latest research, trends, and insights in AI-powered content moderation, 
            digital safety, and the evolving landscape of online community protection.
          </p>
        </div>

        {/* Featured Post */}
        <div className="mb-16">
          <Card className="overflow-hidden">
            <div className="lg:flex">
              <div className="lg:w-1/2">
                <img 
                  src={featuredPost.image} 
                  alt={featuredPost.title}
                  className="w-full h-64 lg:h-full object-cover"
                />
              </div>
              <div className="lg:w-1/2 p-8">
                <div className="flex items-center mb-4">
                  <span 
                    className="px-3 py-1 rounded-full text-sm font-medium"
                    style={{ 
                      backgroundColor: colors.primary + '20',
                      color: colors.primary 
                    }}
                  >
                    {featuredPost.category}
                  </span>
                  <span className="ml-2 text-sm" style={{ color: colors.textMuted }}>
                    Featured
                  </span>
                </div>
                <h2 
                  className="text-3xl font-bold mb-4 leading-tight"
                  style={{ color: colors.text }}
                >
                  {featuredPost.title}
                </h2>
                <p 
                  className="text-lg mb-6 leading-relaxed"
                  style={{ color: colors.textMuted }}
                >
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-2" style={{ color: colors.textMuted }} />
                      <span className="text-sm" style={{ color: colors.textMuted }}>
                        {featuredPost.author}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" style={{ color: colors.textMuted }} />
                      <span className="text-sm" style={{ color: colors.textMuted }}>
                        {featuredPost.date}
                      </span>
                    </div>
                    <span className="text-sm" style={{ color: colors.textMuted }}>
                      {featuredPost.readTime}
                    </span>
                  </div>
                  <Button variant="primary" size="sm">
                    Read More
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="lg:flex lg:space-x-12">
          {/* Main Content */}
          <div className="lg:w-2/3">
            <h2 
              className="text-3xl font-bold mb-8"
              style={{ color: colors.text }}
            >
              Latest Articles
            </h2>
            <div className="space-y-8">
              {blogPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="md:flex">
                    <div className="md:w-1/3">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-48 md:h-full object-cover"
                      />
                    </div>
                    <div className="md:w-2/3 p-6">
                      <div className="flex items-center mb-3">
                        <span 
                          className="px-2 py-1 rounded text-xs font-medium"
                          style={{ 
                            backgroundColor: colors.primary + '20',
                            color: colors.primary 
                          }}
                        >
                          {post.category}
                        </span>
                      </div>
                      <h3 
                        className="text-xl font-bold mb-3 leading-tight"
                        style={{ color: colors.text }}
                      >
                        {post.title}
                      </h3>
                      <p 
                        className="mb-4 leading-relaxed"
                        style={{ color: colors.textMuted }}
                      >
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm" style={{ color: colors.textMuted }}>
                          <div className="flex items-center">
                            <User className="w-4 h-4 mr-1" />
                            {post.author}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {post.date}
                          </div>
                          <span>{post.readTime}</span>
                        </div>
                        <Button variant="ghost" size="sm">
                          Read More
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                Load More Articles
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3 mt-12 lg:mt-0">
            {/* Categories */}
            <Card className="mb-8">
              <div className="p-6">
                <h3 
                  className="text-xl font-bold mb-6"
                  style={{ color: colors.text }}
                >
                  Categories
                </h3>
                <div className="space-y-3">
                  {categories.map((category) => (
                    <div 
                      key={category.name}
                      className="flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors"
                      style={{ backgroundColor: colors.bgHover + '50' }}
                    >
                      <div className="flex items-center">
                        <category.icon 
                          className="w-5 h-5 mr-3" 
                          style={{ color: colors.primary }} 
                        />
                        <span style={{ color: colors.text }}>{category.name}</span>
                      </div>
                      <span 
                        className="text-sm px-2 py-1 rounded"
                        style={{ 
                          backgroundColor: colors.primary + '20',
                          color: colors.primary 
                        }}
                      >
                        {category.count}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Newsletter Signup */}
            <Card>
              <div className="p-6">
                <h3 
                  className="text-xl font-bold mb-4"
                  style={{ color: colors.text }}
                >
                  Stay Updated
                </h3>
                <p 
                  className="mb-6"
                  style={{ color: colors.textMuted }}
                >
                  Subscribe to our newsletter for the latest insights on AI, content moderation, and digital safety.
                </p>
                <div className="space-y-4">
                  <input 
                    type="email" 
                    placeholder="Enter your email"
                    className="w-full px-4 py-2 rounded-lg border"
                    style={{ 
                      backgroundColor: colors.bgCard,
                      borderColor: colors.border,
                      color: colors.text 
                    }}
                  />
                  <Button variant="primary" className="w-full">
                    Subscribe
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;

