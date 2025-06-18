import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { 
  Monitor, 
  TrendingUp, 
  Users, 
  Activity, 
  BarChart3, 
  PieChart, 
  Target, 
  Clock, 
  Globe, 
  Shield,
  AlertTriangle,
  CheckCircle,
  Eye,
  MessageSquare,
  Share2,
  Heart,
  Filter,
  Download,
  RefreshCw,
  Zap
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  BarChart,
  Bar,
  ComposedChart,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ScatterChart,
  Scatter
} from 'recharts';

const PlatformAnalysisPage = () => {
  const { colors } = useTheme();
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [timeRange, setTimeRange] = useState('7d');
  const [isLiveData, setIsLiveData] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Enhanced platform data with more metrics
  const platformData = [
    { 
      name: 'Facebook', 
      threats: 45, 
      posts: 125000, 
      accuracy: 96.2, 
      color: '#1877F2',
      users: 2800000,
      engagement: 89.5,
      responseTime: 1.2,
      falsePositives: 3.8,
      coverage: 94.2
    },
    { 
      name: 'X (Twitter)', 
      threats: 32, 
      posts: 89000, 
      accuracy: 94.8, 
      color: '#000000',
      users: 1200000,
      engagement: 76.3,
      responseTime: 0.8,
      falsePositives: 5.2,
      coverage: 91.7
    },
    { 
      name: 'Instagram', 
      threats: 28, 
      posts: 67000, 
      accuracy: 95.1, 
      color: '#E4405F',
      users: 1800000,
      engagement: 92.1,
      responseTime: 1.5,
      falsePositives: 4.9,
      coverage: 88.3
    },
    { 
      name: 'TikTok', 
      threats: 23, 
      posts: 78000, 
      accuracy: 93.7, 
      color: '#FE2C55',
      users: 950000,
      engagement: 95.8,
      responseTime: 2.1,
      falsePositives: 6.3,
      coverage: 85.9
    },
    { 
      name: 'Reddit', 
      threats: 15, 
      posts: 34000, 
      accuracy: 96.8, 
      color: '#FF4500',
      users: 450000,
      engagement: 67.4,
      responseTime: 0.9,
      falsePositives: 3.1,
      coverage: 92.6
    },
    { 
      name: 'WhatsApp', 
      threats: 38, 
      posts: 156000, 
      accuracy: 91.3, 
      color: '#25D366',
      users: 3200000,
      engagement: 98.2,
      responseTime: 3.2,
      falsePositives: 8.7,
      coverage: 76.4
    }
  ];

  // Enhanced threat trend data
  const threatTrendData = [
    { date: '2024-06-04', Facebook: 42, 'X (Twitter)': 35, Instagram: 25, TikTok: 28, Reddit: 12, WhatsApp: 41 },
    { date: '2024-06-05', Facebook: 38, 'X (Twitter)': 29, Instagram: 31, TikTok: 25, Reddit: 15, WhatsApp: 45 },
    { date: '2024-06-06', Facebook: 51, 'X (Twitter)': 41, Instagram: 28, TikTok: 32, Reddit: 18, WhatsApp: 52 },
    { date: '2024-06-07', Facebook: 47, 'X (Twitter)': 33, Instagram: 26, TikTok: 29, Reddit: 14, WhatsApp: 48 },
    { date: '2024-06-08', Facebook: 43, 'X (Twitter)': 37, Instagram: 29, TikTok: 26, Reddit: 16, WhatsApp: 44 },
    { date: '2024-06-09', Facebook: 49, 'X (Twitter)': 31, Instagram: 32, TikTok: 24, Reddit: 13, WhatsApp: 51 },
    { date: '2024-06-10', Facebook: 45, 'X (Twitter)': 32, Instagram: 28, TikTok: 23, Reddit: 15, WhatsApp: 38 }
  ];

  // Enhanced content type data
  const contentTypeData = [
    { name: 'Misinformation', value: 45, color: '#ef4444', trend: '+12%' },
    { name: 'Hate Speech', value: 32, color: '#f97316', trend: '+8%' },
    { name: 'Spam', value: 15, color: '#eab308', trend: '-3%' },
    { name: 'Harassment', value: 8, color: '#8b5cf6', trend: '+15%' },
    { name: 'Scams', value: 12, color: '#06b6d4', trend: '+22%' },
    { name: 'Extremism', value: 6, color: '#dc2626', trend: '+5%' }
  ];

  // Hourly activity data
  const hourlyActivityData = [
    { hour: '00:00', threats: 12, posts: 8500 },
    { hour: '02:00', threats: 8, posts: 5200 },
    { hour: '04:00', threats: 6, posts: 3800 },
    { hour: '06:00', threats: 15, posts: 12000 },
    { hour: '08:00', threats: 28, posts: 18500 },
    { hour: '10:00', threats: 35, posts: 22000 },
    { hour: '12:00', threats: 42, posts: 28000 },
    { hour: '14:00', threats: 38, posts: 25500 },
    { hour: '16:00', threats: 45, posts: 31000 },
    { hour: '18:00', threats: 52, posts: 35000 },
    { hour: '20:00', threats: 48, posts: 32000 },
    { hour: '22:00', threats: 32, posts: 24000 }
  ];

  // Geographic distribution data
  const geographicData = [
    { region: 'Centre', threats: 45, population: 4.1, severity: 'high', growth: '+15%' },
    { region: 'Littoral', threats: 38, population: 3.2, severity: 'high', growth: '+8%' },
    { region: 'West', threats: 22, population: 1.9, severity: 'medium', growth: '+3%' },
    { region: 'Northwest', threats: 18, population: 2.0, severity: 'medium', growth: '+12%' },
    { region: 'Southwest', threats: 15, population: 1.5, severity: 'low', growth: '-2%' },
    { region: 'Far North', threats: 28, population: 4.0, severity: 'high', growth: '+18%' },
    { region: 'North', threats: 12, population: 2.4, severity: 'low', growth: '+5%' },
    { region: 'Adamawa', threats: 8, population: 1.1, severity: 'low', growth: '+1%' },
    { region: 'East', threats: 6, population: 0.8, severity: 'low', growth: '-1%' },
    { region: 'South', threats: 10, population: 0.7, severity: 'low', growth: '+2%' }
  ];

  // Performance metrics radar data
  const performanceRadarData = [
    { metric: 'Accuracy', Facebook: 96, Twitter: 95, Instagram: 95, TikTok: 94, Reddit: 97, WhatsApp: 91 },
    { metric: 'Speed', Facebook: 88, Twitter: 92, Instagram: 85, TikTok: 78, Reddit: 91, WhatsApp: 68 },
    { metric: 'Coverage', Facebook: 94, Twitter: 92, Instagram: 88, TikTok: 86, Reddit: 93, WhatsApp: 76 },
    { metric: 'Reliability', Facebook: 92, Twitter: 89, Instagram: 91, TikTok: 87, Reddit: 95, WhatsApp: 82 }
  ];

  // Engagement vs Threat correlation data
  const engagementThreatData = [
    { engagement: 1000, threats: 2, platform: 'Reddit' },
    { engagement: 5000, threats: 8, platform: 'Twitter' },
    { engagement: 12000, threats: 15, platform: 'Instagram' },
    { engagement: 25000, threats: 28, platform: 'TikTok' },
    { engagement: 35000, threats: 32, platform: 'Facebook' },
    { engagement: 45000, threats: 38, platform: 'WhatsApp' }
  ];

  // Real-time updates
  useEffect(() => {
    if (!isLiveData) return;
    
    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, 5000);

    return () => clearInterval(interval);
  }, [isLiveData]);

  return (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold" style={{ color: colors.text }}>Advanced Platform Analytics</h2>
          <p style={{ color: colors.textSecondary }}>Comprehensive real-time analysis across all monitored platforms</p>
          <div className="flex items-center gap-2 mt-2">
            <div className={`w-2 h-2 rounded-full ${isLiveData ? 'animate-pulse' : ''}`} 
                 style={{ backgroundColor: isLiveData ? colors.success : colors.textMuted }}></div>
            <span className="text-sm" style={{ color: colors.textSecondary }}>
              Last updated: {lastUpdate.toLocaleTimeString()}
            </span>
          </div>
        </div>
        <div className="flex gap-3">
          <Button 
            variant={isLiveData ? "primary" : "ghost"} 
            size="sm"
            onClick={() => setIsLiveData(!isLiveData)}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isLiveData ? 'animate-spin' : ''}`} />
            {isLiveData ? 'Live' : 'Paused'}
          </Button>
          <select 
            value={selectedPlatform} 
            onChange={(e) => setSelectedPlatform(e.target.value)}
            className="px-4 py-2 rounded-lg border"
            style={{ 
              backgroundColor: colors.bgCard, 
              borderColor: colors.border,
              color: colors.text 
            }}
          >
            <option value="all">All Platforms</option>
            <option value="facebook">Facebook</option>
            <option value="twitter">X (Twitter)</option>
            <option value="instagram">Instagram</option>
            <option value="tiktok">TikTok</option>
            <option value="reddit">Reddit</option>
            <option value="whatsapp">WhatsApp</option>
          </select>
          <select 
            value={timeRange} 
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 rounded-lg border"
            style={{ 
              backgroundColor: colors.bgCard, 
              borderColor: colors.border,
              color: colors.text 
            }}
          >
            <option value="1h">Last Hour</option>
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
          </select>
          <Button variant="ghost" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold" style={{ color: colors.primary }}>
            {platformData.reduce((sum, p) => sum + p.posts, 0).toLocaleString()}
          </div>
          <div className="text-sm" style={{ color: colors.textSecondary }}>Total Posts</div>
          <div className="text-xs text-green-500">+12.5%</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold" style={{ color: colors.danger }}>
            {platformData.reduce((sum, p) => sum + p.threats, 0)}
          </div>
          <div className="text-sm" style={{ color: colors.textSecondary }}>Active Threats</div>
          <div className="text-xs text-red-500">+8.3%</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold" style={{ color: colors.success }}>
            {(platformData.reduce((sum, p) => sum + p.accuracy, 0) / platformData.length).toFixed(1)}%
          </div>
          <div className="text-sm" style={{ color: colors.textSecondary }}>Avg Accuracy</div>
          <div className="text-xs text-green-500">+0.7%</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold" style={{ color: colors.secondary }}>
            {(platformData.reduce((sum, p) => sum + p.users, 0) / 1000000).toFixed(1)}M
          </div>
          <div className="text-sm" style={{ color: colors.textSecondary }}>Users Monitored</div>
          <div className="text-xs text-blue-500">+15.2%</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold" style={{ color: colors.warning }}>
            {(platformData.reduce((sum, p) => sum + p.responseTime, 0) / platformData.length).toFixed(1)}s
          </div>
          <div className="text-sm" style={{ color: colors.textSecondary }}>Avg Response</div>
          <div className="text-xs text-green-500">-0.3s</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold" style={{ color: colors.primary }}>
            {(platformData.reduce((sum, p) => sum + p.coverage, 0) / platformData.length).toFixed(1)}%
          </div>
          <div className="text-sm" style={{ color: colors.textSecondary }}>Coverage</div>
          <div className="text-xs text-green-500">+2.1%</div>
        </Card>
      </div>

      {/* Enhanced Platform Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {platformData.map((platform) => (
          <Card key={platform.name} className="p-6 hover:scale-105 transition-transform">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: platform.color + '20' }}
                >
                  <Monitor className="w-6 h-6" style={{ color: platform.color }} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg" style={{ color: colors.text }}>{platform.name}</h3>
                  <p className="text-sm" style={{ color: colors.textSecondary }}>
                    {platform.users.toLocaleString()} users
                  </p>
                </div>
              </div>
              <Badge variant={platform.threats > 30 ? 'danger' : platform.threats > 20 ? 'warning' : 'success'}>
                {platform.threats > 30 ? 'High Risk' : platform.threats > 20 ? 'Medium Risk' : 'Low Risk'}
              </Badge>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center p-3 rounded-lg" style={{ backgroundColor: colors.bgTertiary }}>
                <div className="text-xl font-bold" style={{ color: colors.danger }}>{platform.threats}</div>
                <div className="text-xs" style={{ color: colors.textSecondary }}>Threats</div>
              </div>
              <div className="text-center p-3 rounded-lg" style={{ backgroundColor: colors.bgTertiary }}>
                <div className="text-xl font-bold" style={{ color: colors.primary }}>{platform.posts.toLocaleString()}</div>
                <div className="text-xs" style={{ color: colors.textSecondary }}>Posts</div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm" style={{ color: colors.textSecondary }}>Detection Accuracy</span>
                <span className="font-semibold" style={{ color: colors.success }}>
                  {platform.accuracy}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="h-2 rounded-full transition-all duration-300"
                  style={{ 
                    width: `${platform.accuracy}%`,
                    backgroundColor: colors.success 
                  }}
                />
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm" style={{ color: colors.textSecondary }}>Response Time</span>
                <span className="font-semibold" style={{ color: colors.primary }}>
                  {platform.responseTime}s
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm" style={{ color: colors.textSecondary }}>False Positives</span>
                <span className="font-semibold" style={{ color: colors.warning }}>
                  {platform.falsePositives}%
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Threat Trends Chart */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4" style={{ color: colors.text }}>
            Threat Detection Trends
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={threatTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke={colors.border} />
                <XAxis dataKey="date" stroke={colors.textSecondary} />
                <YAxis stroke={colors.textSecondary} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: colors.bgCard, 
                    border: `1px solid ${colors.border}`,
                    borderRadius: '8px'
                  }}
                />
                <Line type="monotone" dataKey="Facebook" stroke="#1877F2" strokeWidth={2} />
                <Line type="monotone" dataKey="X (Twitter)" stroke="#000000" strokeWidth={2} />
                <Line type="monotone" dataKey="Instagram" stroke="#E4405F" strokeWidth={2} />
                <Line type="monotone" dataKey="TikTok" stroke="#FE2C55" strokeWidth={2} />
                <Line type="monotone" dataKey="Reddit" stroke="#FF4500" strokeWidth={2} />
                <Line type="monotone" dataKey="WhatsApp" stroke="#25D366" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Hourly Activity Pattern */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4" style={{ color: colors.text }}>
            24-Hour Activity Pattern
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={hourlyActivityData}>
                <CartesianGrid strokeDasharray="3 3" stroke={colors.border} />
                <XAxis dataKey="hour" stroke={colors.textSecondary} />
                <YAxis yAxisId="left" stroke={colors.textSecondary} />
                <YAxis yAxisId="right" orientation="right" stroke={colors.textSecondary} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: colors.bgCard, 
                    border: `1px solid ${colors.border}`,
                    borderRadius: '8px'
                  }}
                />
                <Bar yAxisId="left" dataKey="posts" fill={colors.primary} fillOpacity={0.6} />
                <Line yAxisId="right" type="monotone" dataKey="threats" stroke={colors.danger} strokeWidth={3} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Content Analysis Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Content Type Distribution */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4" style={{ color: colors.text }}>
            Threat Type Distribution
          </h3>
          <div className="h-64 mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={contentTypeData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {contentTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2">
            {contentTypeData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm" style={{ color: colors.text }}>{item.name}</span>
                </div>
                <span className={`text-sm font-medium ${item.trend.startsWith('+') ? 'text-red-500' : 'text-green-500'}`}>
                  {item.trend}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Geographic Distribution */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4" style={{ color: colors.text }}>
            Regional Threat Distribution
          </h3>
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {geographicData.map((region, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg" 
                   style={{ backgroundColor: colors.bgTertiary }}>
                <div className="flex items-center gap-3">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ 
                      backgroundColor: region.severity === 'high' ? colors.danger :
                                       region.severity === 'medium' ? colors.warning : colors.success
                    }}
                  />
                  <div>
                    <div className="font-medium" style={{ color: colors.text }}>{region.region}</div>
                    <div className="text-xs" style={{ color: colors.textSecondary }}>{region.population}M pop</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold" style={{ color: colors.text }}>{region.threats}</div>
                  <div className={`text-xs ${region.growth.startsWith('+') ? 'text-red-500' : 'text-green-500'}`}>
                    {region.growth}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Performance Radar */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4" style={{ color: colors.text }}>
            Platform Performance Radar
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={performanceRadarData}>
                <PolarGrid stroke={colors.border} />
                <PolarAngleAxis dataKey="metric" tick={{ fill: colors.textSecondary }} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: colors.textSecondary }} />
                <Radar name="Facebook" dataKey="Facebook" stroke="#1877F2" fill="#1877F2" fillOpacity={0.1} />
                <Radar name="Twitter" dataKey="Twitter" stroke="#000000" fill="#000000" fillOpacity={0.1} />
                <Radar name="Instagram" dataKey="Instagram" stroke="#E4405F" fill="#E4405F" fillOpacity={0.1} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Advanced Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Engagement vs Threat Correlation */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4" style={{ color: colors.text }}>
            Engagement vs Threat Correlation
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart data={engagementThreatData}>
                <CartesianGrid strokeDasharray="3 3" stroke={colors.border} />
                <XAxis dataKey="engagement" stroke={colors.textSecondary} />
                <YAxis dataKey="threats" stroke={colors.textSecondary} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: colors.bgCard, 
                    border: `1px solid ${colors.border}`,
                    borderRadius: '8px'
                  }}
                  formatter={(value, name) => [value, name === 'threats' ? 'Threats' : 'Engagement']}
                />
                <Scatter dataKey="threats" fill={colors.primary} />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Real-time Monitoring Status */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4" style={{ color: colors.text }}>
            System Health & Performance
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 rounded-lg" style={{ backgroundColor: colors.bgTertiary }}>
                <div className="flex items-center justify-center mb-2">
                  <CheckCircle className="w-5 h-5 mr-2" style={{ color: colors.success }} />
                  <span style={{ color: colors.text }}>System Status</span>
                </div>
                <div className="text-sm font-medium" style={{ color: colors.success }}>All Systems Operational</div>
              </div>
              <div className="text-center p-4 rounded-lg" style={{ backgroundColor: colors.bgTertiary }}>
                <div className="flex items-center justify-center mb-2">
                  <Activity className="w-5 h-5 mr-2" style={{ color: colors.primary }} />
                  <span style={{ color: colors.text }}>Uptime</span>
                </div>
                <div className="text-sm font-medium" style={{ color: colors.primary }}>99.97%</div>
              </div>
            </div>
            
            <div className="space-y-3">
              {platformData.slice(0, 4).map((platform) => (
                <div key={platform.name} className="flex items-center justify-between p-3 rounded-lg" 
                     style={{ backgroundColor: colors.bgSecondary }}>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span style={{ color: colors.text }}>{platform.name}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm" style={{ color: colors.textSecondary }}>
                      {platform.responseTime}s
                    </span>
                    <Badge variant="success" size="sm">Online</Badge>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t" style={{ borderColor: colors.border }}>
              <div className="flex items-center justify-between">
                <span style={{ color: colors.text }}>Processing Rate</span>
                <span className="font-semibold" style={{ color: colors.primary }}>
                  {Math.floor(Math.random() * 500 + 1200)}/min
                </span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Action Buttons */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold" style={{ color: colors.text }}>Quick Actions</h3>
          <div className="flex gap-3">
            <Button variant="primary">
              <Zap className="w-4 h-4 mr-2" />
              Generate Report
            </Button>
            <Button variant="secondary">
              <Filter className="w-4 h-4 mr-2" />
              Advanced Filters
            </Button>
            <Button variant="ghost">
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PlatformAnalysisPage;

