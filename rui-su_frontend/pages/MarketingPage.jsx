import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { 
  Briefcase, 
  TrendingUp, 
  Users, 
  Target, 
  BarChart3, 
  Shield, 
  CheckCircle, 
  Star,
  ArrowRight,
  Building,
  Lightbulb,
  Zap,
  Globe,
  MessageSquare,
  Phone,
  Mail,
  Github,
  Chrome
} from 'lucide-react';

const MarketingPage = () => {
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPlan, setSelectedPlan] = useState('professional');

  const services = [
    {
      icon: TrendingUp,
      title: "Business Analysis & Strategy",
      description: "Comprehensive analysis of your business model, market position, and growth opportunities with AI-powered insights.",
      features: ["Market Analysis", "Competitor Research", "Growth Strategy", "Risk Assessment"]
    },
    {
      icon: Target,
      title: "Advertising & Marketing",
      description: "Data-driven advertising strategies to maximize ROI and reach your target audience effectively.",
      features: ["Campaign Optimization", "Audience Targeting", "Content Strategy", "Performance Analytics"]
    },
    {
      icon: Users,
      title: "Customer Acquisition",
      description: "Proven strategies to attract, convert, and retain customers using advanced analytics and AI insights.",
      features: ["Lead Generation", "Conversion Optimization", "Customer Journey Mapping", "Retention Strategies"]
    },
    {
      icon: Lightbulb,
      title: "Problem Solving & Innovation",
      description: "Identify business challenges and implement innovative solutions powered by AI and data analytics.",
      features: ["Problem Identification", "Solution Design", "Implementation Support", "Performance Monitoring"]
    }
  ];

  const pricingPlans = [
    {
      id: 'starter',
      name: 'Starter',
      price: '$299',
      period: '/month',
      description: 'Perfect for small businesses getting started',
      features: [
        'Basic business analysis',
        'Monthly strategy consultation',
        'Email support',
        'Basic reporting',
        'Up to 3 campaigns'
      ],
      popular: false
    },
    {
      id: 'professional',
      name: 'Professional',
      price: '$799',
      period: '/month',
      description: 'Ideal for growing businesses',
      features: [
        'Comprehensive business analysis',
        'Weekly strategy sessions',
        'Priority support',
        'Advanced analytics',
        'Unlimited campaigns',
        'Custom solutions',
        'Dedicated account manager'
      ],
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: '$1,999',
      period: '/month',
      description: 'For large organizations',
      features: [
        'Full-scale business transformation',
        'Daily consultation access',
        '24/7 premium support',
        'AI-powered insights',
        'Custom integrations',
        'White-label solutions',
        'Executive advisory board'
      ],
      popular: false
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      company: "TechStart Inc.",
      role: "CEO",
      content: "Sui-Ru's marketing insights helped us increase our customer acquisition by 340% in just 6 months.",
      rating: 5
    },
    {
      name: "Michael Rodriguez",
      company: "Global Dynamics",
      role: "Marketing Director",
      content: "The AI-powered analysis revealed opportunities we never knew existed. ROI improved by 250%.",
      rating: 5
    },
    {
      name: "Emily Watson",
      company: "Innovation Labs",
      role: "Founder",
      content: "Their problem-solving approach transformed our business model. We're now market leaders.",
      rating: 5
    }
  ];

  const stats = [
    { label: "Businesses Served", value: "2,500+", icon: Building },
    { label: "Average ROI Increase", value: "285%", icon: TrendingUp },
    { label: "Success Rate", value: "94%", icon: Target },
    { label: "Expert Consultants", value: "150+", icon: Users }
  ];

  return (
    <div className="min-h-screen pt-16" style={{ backgroundColor: colors.bg }}>
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-cyan-600/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Transform Your Business
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto" style={{ color: colors.textSecondary }}>
              Leverage AI-powered insights and expert consultation to accelerate growth, optimize operations, and dominate your market.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="primary" 
                size="lg"
                className="text-lg px-8 py-4"
                onClick={() => setActiveTab('signup')}
              >
                Start Your Transformation
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                variant="ghost" 
                size="lg"
                className="text-lg px-8 py-4"
                onClick={() => setActiveTab('demo')}
              >
                Schedule Demo
                <Phone className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="p-6 text-center">
                <stat.icon className="w-8 h-8 mx-auto mb-4" style={{ color: colors.primary }} />
                <div className="text-3xl font-bold mb-2" style={{ color: colors.text }}>{stat.value}</div>
                <div className="text-sm" style={{ color: colors.textSecondary }}>{stat.label}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4" style={{ color: colors.text }}>
              Expert Business Services
            </h2>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: colors.textSecondary }}>
              Our AI-powered platform combined with expert consultation delivers measurable results for your business.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="p-8 hover:scale-105 transition-transform duration-300">
                <service.icon className="w-12 h-12 mb-6" style={{ color: colors.primary }} />
                <h3 className="text-2xl font-bold mb-4" style={{ color: colors.text }}>
                  {service.title}
                </h3>
                <p className="text-lg mb-6" style={{ color: colors.textSecondary }}>
                  {service.description}
                </p>
                <div className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-3" style={{ color: colors.success }} />
                      <span style={{ color: colors.text }}>{feature}</span>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20" style={{ backgroundColor: colors.bgSecondary }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4" style={{ color: colors.text }}>
              Choose Your Growth Plan
            </h2>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: colors.textSecondary }}>
              Flexible pricing options designed to scale with your business needs.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan) => (
              <Card 
                key={plan.id} 
                className={`p-8 relative ${plan.popular ? 'ring-2 ring-blue-500 scale-105' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2" style={{ color: colors.text }}>
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline justify-center mb-4">
                    <span className="text-4xl font-bold" style={{ color: colors.text }}>
                      {plan.price}
                    </span>
                    <span className="text-lg" style={{ color: colors.textSecondary }}>
                      {plan.period}
                    </span>
                  </div>
                  <p style={{ color: colors.textSecondary }}>{plan.description}</p>
                </div>
                
                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-3" style={{ color: colors.success }} />
                      <span style={{ color: colors.text }}>{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Button 
                  variant={plan.popular ? "primary" : "ghost"}
                  className="w-full"
                  onClick={() => {
                    setSelectedPlan(plan.id);
                    setActiveTab('signup');
                  }}
                >
                  Get Started
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4" style={{ color: colors.text }}>
              Success Stories
            </h2>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: colors.textSecondary }}>
              See how businesses like yours have transformed with our expert guidance.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-8">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" style={{ color: colors.warning }} />
                  ))}
                </div>
                <p className="text-lg mb-6 italic" style={{ color: colors.text }}>
                  "{testimonial.content}"
                </p>
                <div>
                  <div className="font-bold" style={{ color: colors.text }}>{testimonial.name}</div>
                  <div style={{ color: colors.textSecondary }}>
                    {testimonial.role} at {testimonial.company}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6 text-white">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Join thousands of successful businesses that have accelerated their growth with our AI-powered insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="secondary" 
              size="lg"
              className="text-lg px-8 py-4"
              onClick={() => setActiveTab('signup')}
            >
              Start Free Consultation
              <MessageSquare className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              variant="ghost" 
              size="lg"
              className="text-lg px-8 py-4 text-white border-white hover:bg-white hover:text-gray-900"
              onClick={() => setActiveTab('contact')}
            >
              Contact Sales
              <Phone className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Auth Modal/Section */}
      {activeTab === 'signup' && (
        <section className="py-20" style={{ backgroundColor: colors.bgSecondary }}>
          <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2" style={{ color: colors.text }}>
                  Get Started Today
                </h3>
                <p style={{ color: colors.textSecondary }}>
                  Create your account and begin your business transformation
                </p>
              </div>
              
              <div className="space-y-4">
                <Button 
                  variant="ghost" 
                  className="w-full flex items-center justify-center border"
                  style={{ borderColor: colors.border }}
                >
                  <Chrome className="w-5 h-5 mr-3" />
                  Sign up with Google
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full flex items-center justify-center border"
                  style={{ borderColor: colors.border }}
                >
                  <Github className="w-5 h-5 mr-3" />
                  Sign up with GitHub
                </Button>
                
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t" style={{ borderColor: colors.border }}></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2" style={{ backgroundColor: colors.bgCard, color: colors.textSecondary }}>
                      Or continue with email
                    </span>
                  </div>
                </div>
                
                <form className="space-y-4">
                  <input
                    type="text"
                    placeholder="Company Name"
                    className="w-full px-4 py-3 rounded-lg border"
                    style={{ 
                      backgroundColor: colors.bgCard, 
                      borderColor: colors.border,
                      color: colors.text 
                    }}
                  />
                  <input
                    type="email"
                    placeholder="Business Email"
                    className="w-full px-4 py-3 rounded-lg border"
                    style={{ 
                      backgroundColor: colors.bgCard, 
                      borderColor: colors.border,
                      color: colors.text 
                    }}
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full px-4 py-3 rounded-lg border"
                    style={{ 
                      backgroundColor: colors.bgCard, 
                      borderColor: colors.border,
                      color: colors.text 
                    }}
                  />
                  <select
                    className="w-full px-4 py-3 rounded-lg border"
                    style={{ 
                      backgroundColor: colors.bgCard, 
                      borderColor: colors.border,
                      color: colors.text 
                    }}
                    defaultValue={selectedPlan}
                  >
                    <option value="starter">Starter Plan - $299/month</option>
                    <option value="professional">Professional Plan - $799/month</option>
                    <option value="enterprise">Enterprise Plan - $1,999/month</option>
                  </select>
                  
                  <Button variant="primary" className="w-full">
                    Create Account & Start Trial
                  </Button>
                </form>
                
                <p className="text-center text-sm" style={{ color: colors.textSecondary }}>
                  Already have an account?{' '}
                  <button 
                    className="font-medium hover:underline"
                    style={{ color: colors.primary }}
                    onClick={() => setActiveTab('login')}
                  >
                    Sign in
                  </button>
                </p>
              </div>
            </Card>
          </div>
        </section>
      )}

      {activeTab === 'login' && (
        <section className="py-20" style={{ backgroundColor: colors.bgSecondary }}>
          <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2" style={{ color: colors.text }}>
                  Welcome Back
                </h3>
                <p style={{ color: colors.textSecondary }}>
                  Sign in to your business account
                </p>
              </div>
              
              <div className="space-y-4">
                <Button 
                  variant="ghost" 
                  className="w-full flex items-center justify-center border"
                  style={{ borderColor: colors.border }}
                >
                  <Chrome className="w-5 h-5 mr-3" />
                  Sign in with Google
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full flex items-center justify-center border"
                  style={{ borderColor: colors.border }}
                >
                  <Github className="w-5 h-5 mr-3" />
                  Sign in with GitHub
                </Button>
                
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t" style={{ borderColor: colors.border }}></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2" style={{ backgroundColor: colors.bgCard, color: colors.textSecondary }}>
                      Or continue with email
                    </span>
                  </div>
                </div>
                
                <form className="space-y-4">
                  <input
                    type="email"
                    placeholder="Business Email"
                    className="w-full px-4 py-3 rounded-lg border"
                    style={{ 
                      backgroundColor: colors.bgCard, 
                      borderColor: colors.border,
                      color: colors.text 
                    }}
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full px-4 py-3 rounded-lg border"
                    style={{ 
                      backgroundColor: colors.bgCard, 
                      borderColor: colors.border,
                      color: colors.text 
                    }}
                  />
                  
                  <Button variant="primary" className="w-full">
                    Sign In
                  </Button>
                </form>
                
                <p className="text-center text-sm" style={{ color: colors.textSecondary }}>
                  Don't have an account?{' '}
                  <button 
                    className="font-medium hover:underline"
                    style={{ color: colors.primary }}
                    onClick={() => setActiveTab('signup')}
                  >
                    Sign up
                  </button>
                </p>
              </div>
            </Card>
          </div>
        </section>
      )}
    </div>
  );
};

export default MarketingPage;

