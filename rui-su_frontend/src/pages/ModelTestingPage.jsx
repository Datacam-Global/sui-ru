import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { Loader2, Send, AlertTriangle, CheckCircle, XCircle, Brain, Clock, Zap, Play, Pause, RefreshCw, Globe, MessageCircle, Heart, Share, Flag } from 'lucide-react';
import { detectHateSpeech } from '../services/apiService';

const ModelTestingPage = () => {
  const { colors } = useTheme();
  const [inputText, setInputText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [error, setError] = useState(null);
  const [isSimulationRunning, setIsSimulationRunning] = useState(false);
  const [socialMediaPosts, setSocialMediaPosts] = useState([]);
  const [simulationSpeed, setSimulationSpeed] = useState(3000); // 3 seconds between posts
  const [analyzedPosts, setAnalyzedPosts] = useState({});

  // Mock social media posts data
  const mockSocialMediaPosts = [
    {
      id: 1,
      content: "Just had the best coffee ever! ☕️ Love this community!",
      poster: {
        username: "coffee_lover_42",
        displayName: "Sarah Johnson",
        avatar: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E%3C/svg%3E",
        verified: true,
        followers: 12400,
        location: "Seattle, WA",
        joinDate: "2020-03-15"
      },
      platform: "Twitter",
      timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 minutes ago
      likes: 23,
      shares: 5,
      comments: 8,
      isHateSpeech: false,
      isMisinformation: false,
      category: "positive"
    },
    {
      id: 2,
      content: "All Muslims are terrorists and should be eliminated from our country. This is the truth!",
      poster: {
        username: "truth_seeker_88",
        displayName: "John Smith",
        avatar: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E%3C/svg%3E",
        verified: false,
        followers: 1200,
        location: "Unknown",
        joinDate: "2023-08-22"
      },
      platform: "Twitter",
      timestamp: new Date(Date.now() - 1000 * 60 * 3).toISOString(), // 3 minutes ago
      likes: 45,
      shares: 12,
      comments: 67,
      isHateSpeech: true,
      isMisinformation: true,
      category: "hate_speech"
    },
    {
      id: 3,
      content: "BREAKING: Scientists discover that drinking hot water with lemon cures cancer in 24 hours! Share this with everyone you know!",
      poster: {
        username: "health_guru_2024",
        displayName: "Dr. Wellness",
        avatar: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E%3C/svg%3E",
        verified: false,
        followers: 8900,
        location: "Los Angeles, CA",
        joinDate: "2022-11-10"
      },
      platform: "Facebook",
      timestamp: new Date(Date.now() - 1000 * 60 * 2).toISOString(), // 2 minutes ago
      likes: 156,
      shares: 89,
      comments: 34,
      isHateSpeech: false,
      isMisinformation: true,
      category: "misinformation"
    },
    {
      id: 4,
      content: "Happy birthday to my amazing sister! 🎉 You're the best person I know and I'm so lucky to have you in my life!",
      poster: {
        username: "sister_love_99",
        displayName: "Emma Wilson",
        avatar: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E%3C/svg%3E",
        verified: true,
        followers: 5600,
        location: "Austin, TX",
        joinDate: "2019-06-12"
      },
      platform: "Instagram",
      timestamp: new Date(Date.now() - 1000 * 60 * 1).toISOString(), // 1 minute ago
      likes: 89,
      shares: 12,
      comments: 23,
      isHateSpeech: false,
      isMisinformation: false,
      category: "positive"
    },
    {
      id: 5,
      content: "The government is hiding aliens in Area 51 and they're controlling our minds with 5G! Wake up sheeple!",
      poster: {
        username: "truth_bringer_777",
        displayName: "Mike Conspiracy",
        avatar: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E%3C/svg%3E",
        verified: false,
        followers: 3400,
        location: "Phoenix, AZ",
        joinDate: "2021-04-18"
      },
      platform: "Twitter",
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 seconds ago
      likes: 23,
      shares: 45,
      comments: 78,
      isHateSpeech: false,
      isMisinformation: true,
      category: "conspiracy"
    },
    {
      id: 6,
      content: "We need to kill all the liberals and take back our country! No more mercy!",
      poster: {
        username: "patriot_warrior",
        displayName: "Robert Strong",
        avatar: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E%3C/svg%3E",
        verified: false,
        followers: 2100,
        location: "Unknown",
        joinDate: "2023-12-01"
      },
      platform: "Facebook",
      timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 seconds ago
      likes: 67,
      shares: 23,
      comments: 89,
      isHateSpeech: true,
      isMisinformation: false,
      category: "hate_speech"
    },
    {
      id: 7,
      content: "Just finished reading an amazing book about climate change solutions. We can make a difference together! 🌱",
      poster: {
        username: "eco_warrior_2024",
        displayName: "Lisa Chen",
        avatar: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E%3C/svg%3E",
        verified: true,
        followers: 7800,
        location: "Portland, OR",
        joinDate: "2021-02-14"
      },
      platform: "LinkedIn",
      timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(), // 45 seconds ago
      likes: 34,
      shares: 8,
      comments: 12,
      isHateSpeech: false,
      isMisinformation: false,
      category: "positive"
    },
    {
      id: 8,
      content: "All Jews control the media and banks! They're plotting against us!",
      poster: {
        username: "real_truth_999",
        displayName: "Anonymous User",
        avatar: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E%3C/svg%3E",
        verified: false,
        followers: 450,
        location: "Unknown",
        joinDate: "2024-01-15"
      },
      platform: "Twitter",
      timestamp: new Date(Date.now() - 1000 * 60 * 10).toISOString(), // 10 seconds ago
      likes: 12,
      shares: 3,
      comments: 45,
      isHateSpeech: true,
      isMisinformation: true,
      category: "hate_speech"
    },
    {
      id: 9,
      content: "Amazing sunset tonight! Nature is truly beautiful and healing. Grateful for moments like this ✨",
      poster: {
        username: "nature_lover_88",
        displayName: "David Park",
        avatar: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E%3C/svg%3E",
        verified: false,
        followers: 3200,
        location: "Denver, CO",
        joinDate: "2020-09-22"
      },
      platform: "Instagram",
      timestamp: new Date(Date.now() - 1000 * 60 * 20).toISOString(), // 20 seconds ago
      likes: 67,
      shares: 15,
      comments: 9,
      isHateSpeech: false,
      isMisinformation: false,
      category: "positive"
    },
    {
      id: 10,
      content: "The deep state is using vaccines to implant microchips! Don't trust the mainstream media!",
      poster: {
        username: "freedom_fighter_2024",
        displayName: "Patricia Liberty",
        avatar: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E%3C/svg%3E",
        verified: false,
        followers: 1800,
        location: "Nashville, TN",
        joinDate: "2023-05-10"
      },
      platform: "Facebook",
      timestamp: new Date(Date.now() - 1000 * 60 * 8).toISOString(), // 8 seconds ago
      likes: 89,
      shares: 156,
      comments: 234,
      isHateSpeech: false,
      isMisinformation: true,
      category: "conspiracy"
    }
  ];

  // Start simulation
  const startSimulation = () => {
    setIsSimulationRunning(true);
    setSocialMediaPosts([]);
    setAnalyzedPosts({});
    
    // Add posts one by one with delays
    mockSocialMediaPosts.forEach((post, index) => {
      setTimeout(() => {
        setSocialMediaPosts(prev => [post, ...prev]);
        
        // Automatically analyze the post after it appears
        setTimeout(() => {
          analyzePost(post);
        }, 1000); // Analyze 1 second after post appears
      }, index * simulationSpeed);
    });
  };

  // Stop simulation
  const stopSimulation = () => {
    setIsSimulationRunning(false);
  };

  // Reset simulation
  const resetSimulation = () => {
    setIsSimulationRunning(false);
    setSocialMediaPosts([]);
    setAnalyzedPosts({});
  };

  // Analyze a single post
  const analyzePost = async (post) => {
    try {
      const response = await detectHateSpeech(post.content);
      if (response.success) {
        setAnalyzedPosts(prev => ({
          ...prev,
          [post.id]: response.data
        }));
      }
    } catch (error) {
      console.error('Error analyzing post:', error);
    }
  };

  // API call to hate speech detection service
  const handleAnalyze = async () => {
    if (!inputText.trim()) return;
    
    setIsAnalyzing(true);
    setError(null);
    
    try {
      const response = await detectHateSpeech(inputText);
      
      if (response.success) {
        setAnalysisResult(response.data);
      } else {
        setError(response.error || 'Analysis failed. Please try again.');
      }
    } catch (err) {
      setError('Analysis failed. Please try again.');
    } finally {
      setIsAnalyzing(false);
    };
  };

  const getSeverityIcon = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'high': return <AlertTriangle className="w-5 h-5" />;
      case 'medium': return <AlertTriangle className="w-5 h-5" />;
      case 'low': return <CheckCircle className="w-5 h-5" />;
      default: return <CheckCircle className="w-5 h-5" />;
    }
  };

  const getHateSpeechIcon = (isHateSpeech) => {
    return isHateSpeech ? 
      <XCircle className="w-6 h-6" style={{ color: colors.error }} /> : 
      <CheckCircle className="w-6 h-6" style={{ color: colors.success }} />;
  };

  const getCategoryBadge = (category) => {
    const variants = {
      'hate_speech': 'danger',
      'misinformation': 'warning',
      'conspiracy': 'warning',
      'positive': 'success'
    };
    
    const labels = {
      'hate_speech': 'Hate Speech',
      'misinformation': 'Misinformation',
      'conspiracy': 'Conspiracy',
      'positive': 'Safe Content'
    };
    
    return <Badge variant={variants[category]} size="sm">{labels[category]}</Badge>;
  };

  const getPlatformIcon = (platform) => {
    const icons = {
      'Twitter': '🐦',
      'Facebook': '📘',
      'Instagram': '📷',
      'LinkedIn': '💼'
    };
    return icons[platform] || '🌐';
  };

  return (
    <div className="pt-20 min-h-screen" style={{ backgroundColor: colors.bg }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4" style={{ color: colors.text }}>
            Hate Speech Detection Model Testing
          </h1>
          <p className="text-xl" style={{ color: colors.textSecondary }}>
            Test our AI-powered hate speech detection model with your own text content and real-time social media simulation
          </p>
        </div>

        {/* Social Media Simulation Section */}
        <Card className="p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2" style={{ color: colors.text }}>
            <Globe className="w-6 h-6" style={{ color: colors.primary }} />
            Real-Time Social Media Post Simulation
          </h2>
          
          <div className="flex items-center gap-4 mb-6">
            <Button 
              variant="primary" 
              onClick={startSimulation}
              disabled={isSimulationRunning}
              className="flex items-center gap-2"
            >
              <Play className="w-4 h-4" />
              Start Simulation
            </Button>
            
            <Button 
              variant="secondary" 
              onClick={stopSimulation}
              disabled={!isSimulationRunning}
              className="flex items-center gap-2"
            >
              <Pause className="w-4 h-4" />
              Pause
            </Button>
            
            <Button 
              variant="outline" 
              onClick={resetSimulation}
              className="flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Reset
            </Button>
            
            <div className="flex items-center gap-2">
              <span className="text-sm" style={{ color: colors.textSecondary }}>Speed:</span>
              <select 
                value={simulationSpeed}
                onChange={(e) => setSimulationSpeed(Number(e.target.value))}
                className="px-3 py-1 border rounded text-sm"
                style={{ 
                  backgroundColor: colors.bgSecondary,
                  borderColor: colors.border,
                  color: colors.text
                }}
              >
                <option value={1000}>Fast (1s)</option>
                <option value={3000}>Normal (3s)</option>
                <option value={5000}>Slow (5s)</option>
              </select>
            </div>
          </div>

          <div className="text-sm" style={{ color: colors.textSecondary }}>
            <p>This simulation generates mock social media posts in real-time to demonstrate our AI model's ability to detect hate speech and misinformation.</p>
          </div>
        </Card>

        {/* Live Posts Feed */}
        {socialMediaPosts.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2" style={{ color: colors.text }}>
              <MessageCircle className="w-5 h-5" style={{ color: colors.secondary }} />
              Live Posts Feed
            </h3>
            
            {/* Real-time Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold" style={{ color: colors.primary }}>
                  {socialMediaPosts.length}
                </div>
                <div className="text-sm" style={{ color: colors.textSecondary }}>
                  Total Posts
                </div>
              </Card>
              
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold" style={{ color: colors.error }}>
                  {socialMediaPosts.filter(post => post.isHateSpeech).length}
                </div>
                <div className="text-sm" style={{ color: colors.textSecondary }}>
                  Hate Speech
                </div>
              </Card>
              
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold" style={{ color: colors.warning }}>
                  {socialMediaPosts.filter(post => post.isMisinformation).length}
                </div>
                <div className="text-sm" style={{ color: colors.textSecondary }}>
                  Misinformation
                </div>
              </Card>
              
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold" style={{ color: colors.success }}>
                  {socialMediaPosts.filter(post => !post.isHateSpeech && !post.isMisinformation).length}
                </div>
                <div className="text-sm" style={{ color: colors.textSecondary }}>
                  Safe Content
                </div>
              </Card>
            </div>
            
            <div className="space-y-4">
              {socialMediaPosts.map((post) => (
                <Card key={post.id} className="p-4">
                  <div className="flex items-start gap-3">
                    {/* Poster Avatar */}
                    <img 
                      src={post.poster.avatar} 
                      alt={post.poster.displayName}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    
                    <div className="flex-1">
                      {/* Poster Info */}
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-semibold" style={{ color: colors.text }}>
                          {post.poster.displayName}
                        </span>
                        {post.poster.verified && (
                          <Badge variant="success" size="sm">✓ Verified</Badge>
                        )}
                        <span className="text-sm" style={{ color: colors.textSecondary }}>
                          @{post.poster.username}
                        </span>
                        <span className="text-sm" style={{ color: colors.textSecondary }}>
                          {getPlatformIcon(post.platform)}
                        </span>
                      </div>
                      
                      {/* Post Content */}
                      <p className="mb-3" style={{ color: colors.text }}>
                        {post.content}
                      </p>
                      
                      {/* Post Metadata */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm" style={{ color: colors.textSecondary }}>
                          <span className="flex items-center gap-1">
                            <Heart className="w-4 h-4" />
                            {post.likes}
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageCircle className="w-4 h-4" />
                            {post.comments}
                          </span>
                          <span className="flex items-center gap-1">
                            <Share className="w-4 h-4" />
                            {post.shares}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {new Date(post.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {getCategoryBadge(post.category)}
                          {(post.isHateSpeech || post.isMisinformation) && (
                            <Badge variant="danger" size="sm">
                              <Flag className="w-3 h-3 mr-1" />
                              Flagged
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      {/* Poster Details */}
                      <div className="mt-3 p-3 rounded-lg text-sm" style={{ backgroundColor: colors.bgSecondary }}>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <span style={{ color: colors.textSecondary }}>Followers:</span>
                            <span className="ml-2 font-medium" style={{ color: colors.text }}>
                              {post.poster.followers.toLocaleString()}
                            </span>
                          </div>
                          <div>
                            <span style={{ color: colors.textSecondary }}>Location:</span>
                            <span className="ml-2 font-medium" style={{ color: colors.text }}>
                              {post.poster.location}
                            </span>
                          </div>
                          <div>
                            <span style={{ color: colors.textSecondary }}>Joined:</span>
                            <span className="ml-2 font-medium" style={{ color: colors.text }}>
                              {new Date(post.poster.joinDate).toLocaleDateString()}
                            </span>
                          </div>
                          <div>
                            <span style={{ color: colors.textSecondary }}>Platform:</span>
                            <span className="ml-2 font-medium" style={{ color: colors.text }}>
                              {post.platform}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Real-time Analysis Results */}
                      {analyzedPosts[post.id] && (
                        <div className="mt-3 p-3 rounded-lg border-l-4" style={{ 
                          backgroundColor: colors.bgSecondary,
                          borderLeftColor: analyzedPosts[post.id].is_hate_speech ? colors.error : 
                                          analyzedPosts[post.id].is_misinformation ? colors.warning : colors.success
                        }}>
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-sm font-medium" style={{ color: colors.text }}>
                              AI Analysis Results
                            </h4>
                            <div className="flex items-center gap-2">
                              {getHateSpeechIcon(analyzedPosts[post.id].is_hate_speech)}
                              <span className="text-xs font-medium" style={{ color: colors.textSecondary }}>
                                {analyzedPosts[post.id].is_hate_speech ? 'Hate Speech Detected' : 
                                 analyzedPosts[post.id].is_misinformation ? 'Misinformation Detected' : 'Safe Content'}
                              </span>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-3 gap-2 text-xs">
                            <div className="text-center">
                              <div className="font-bold" style={{ color: colors.primary }}>
                                {(analyzedPosts[post.id].confidence * 100).toFixed(0)}%
                              </div>
                              <div style={{ color: colors.textSecondary }}>Confidence</div>
                            </div>
                            <div className="text-center">
                              <div className="font-bold capitalize" style={{ color: colors.text }}>
                                {analyzedPosts[post.id].severity}
                              </div>
                              <div style={{ color: colors.textSecondary }}>Severity</div>
                            </div>
                            <div className="text-center">
                              <div className="font-bold" style={{ color: colors.secondary }}>
                                {analyzedPosts[post.id].risk_score}
                              </div>
                              <div style={{ color: colors.textSecondary }}>Risk Score</div>
                            </div>
                          </div>
                          
                          {analyzedPosts[post.id].detected_keywords && analyzedPosts[post.id].detected_keywords.length > 0 && (
                            <div className="mt-2">
                              <div className="text-xs mb-1" style={{ color: colors.textSecondary }}>
                                Detected Keywords:
                              </div>
                              <div className="flex flex-wrap gap-1">
                                {analyzedPosts[post.id].detected_keywords.map((keyword, idx) => (
                                  <Badge key={idx} variant="danger" size="xs">
                                    {keyword}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Analysis Loading State */}
                      {!analyzedPosts[post.id] && (
                        <div className="mt-3 p-3 rounded-lg" style={{ backgroundColor: colors.bgSecondary }}>
                          <div className="flex items-center gap-2">
                            <Loader2 className="w-4 h-4 animate-spin" style={{ color: colors.primary }} />
                            <span className="text-sm" style={{ color: colors.textSecondary }}>
                              Analyzing content...
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2" style={{ color: colors.text }}>
              <Brain className="w-6 h-6" style={{ color: colors.primary }} />
              Input Text for Analysis
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>
                  Enter your text post here:
                </label>
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Paste or type the text content you want to analyze..."
                  className="w-full h-32 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  style={{
                    backgroundColor: colors.bgSecondary,
                    borderColor: colors.border,
                    color: colors.text
                  }}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm" style={{ color: colors.textSecondary }}>
                  {inputText.length} characters
                </span>
                <Button 
                  variant="primary" 
                  onClick={handleAnalyze}
                  disabled={!inputText.trim() || isAnalyzing}
                  className="flex items-center gap-2"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Analyze Text
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Sample Texts */}
            <div className="mt-6">
              <h3 className="text-sm font-medium mb-3" style={{ color: colors.textSecondary }}>
                Try these sample texts:
              </h3>
              <div className="space-y-2">
                {[
                  "All Muslims are terrorists.",
                  "I love this community and everyone in it!",
                  "We should eliminate all people who disagree with us.",
                  "Let's work together to build a better future."
                ].map((sample, index) => (
                  <button
                    key={index}
                    onClick={() => setInputText(sample)}
                    className="block w-full text-left text-sm p-2 rounded border transition-colors hover:bg-blue-50 dark:hover:bg-blue-900/20"
                    style={{ 
                      borderColor: colors.border,
                      color: colors.textSecondary
                    }}
                  >
                    {sample}
                  </button>
                ))}
              </div>
            </div>
          </Card>

          {/* Results Section */}
          <div className="space-y-6">
            {isAnalyzing && (
              <Card className="p-6 text-center">
                <Loader2 className="w-12 h-12 mx-auto mb-4 animate-spin" style={{ color: colors.primary }} />
                <h3 className="text-lg font-medium mb-2" style={{ color: colors.text }}>
                  Analyzing your text...
                </h3>
                <p style={{ color: colors.textSecondary }}>
                  Our AI model is processing your content
                </p>
              </Card>
            )}

            {error && (
              <Card className="p-6 border-red-200 bg-red-50 dark:bg-red-900/20">
                <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                  <AlertTriangle className="w-5 h-5" />
                  <span className="font-medium">Error</span>
                </div>
                <p className="mt-2 text-red-600 dark:text-red-400">{error}</p>
              </Card>
            )}

            {analysisResult && (
              <>
                {/* Main Result Card */}
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold" style={{ color: colors.text }}>
                      Analysis Results
                    </h3>
                    <div className="flex items-center gap-2">
                      {getHateSpeechIcon(analysisResult.is_hate_speech)}
                      <span className="font-medium" style={{ color: colors.text }}>
                        {analysisResult.is_hate_speech ? 'Hate Speech Detected' : 'Safe Content'}
                      </span>
                    </div>
                  </div>

                  {/* Confidence and Severity */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center p-3 rounded-lg" style={{ backgroundColor: colors.bgSecondary }}>
                      <div className="text-2xl font-bold" style={{ color: colors.primary }}>
                        {(analysisResult.confidence * 100).toFixed(1)}%
                      </div>
                      <div className="text-sm" style={{ color: colors.textSecondary }}>
                        Confidence
                      </div>
                    </div>
                    <div className="text-center p-3 rounded-lg" style={{ backgroundColor: colors.bgSecondary }}>
                      <div className="flex items-center justify-center gap-2">
                        {getSeverityIcon(analysisResult.severity)}
                        <span className="text-lg font-semibold capitalize" style={{ color: colors.text }}>
                          {analysisResult.severity}
                        </span>
                      </div>
                      <div className="text-sm" style={{ color: colors.textSecondary }}>
                        Severity
                      </div>
                    </div>
                  </div>

                  {/* Detected Keywords */}
                  {analysisResult.detected_keywords && analysisResult.detected_keywords.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium mb-2" style={{ color: colors.textSecondary }}>
                        Detected Keywords:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {analysisResult.detected_keywords.map((keyword, index) => (
                          <Badge key={index} variant="danger" size="sm">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Explanation */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium mb-2" style={{ color: colors.textSecondary }}>
                      Analysis Explanation:
                    </h4>
                    <p className="text-sm" style={{ color: colors.text }}>
                      {analysisResult.explanation}
                    </p>
                  </div>

                  {/* Technical Details */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span style={{ color: colors.textSecondary }}>Model:</span>
                      <span className="ml-2 font-medium" style={{ color: colors.text }}>
                        {analysisResult.category}
                      </span>
                    </div>
                    <div>
                      <span style={{ color: colors.textSecondary }}>Processing Time:</span>
                      <span className="ml-2 font-medium" style={{ color: colors.text }}>
                        {analysisResult.processing_time_ms}ms
                      </span>
                    </div>
                  </div>
                </Card>

                {/* Raw JSON Response */}
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2" style={{ color: colors.text }}>
                    <Zap className="w-5 h-5" style={{ color: colors.secondary }} />
                    Raw Model Response
                  </h3>
                  <div 
                    className="p-4 rounded-lg text-sm font-mono overflow-x-auto"
                    style={{ 
                      backgroundColor: colors.bgSecondary,
                      border: `1px solid ${colors.border}`
                    }}
                  >
                    <pre style={{ color: colors.text }}>
                      {JSON.stringify(analysisResult, null, 2)}
                    </pre>
                  </div>
                </Card>
              </>
            )}
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-12 text-center">
          <p className="text-sm" style={{ color: colors.textMuted }}>
            This interface demonstrates our hate speech detection model's capabilities with real-time social media simulation. 
            The model analyzes text content and provides confidence scores, severity levels, 
            and detailed explanations for its classifications.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ModelTestingPage;
