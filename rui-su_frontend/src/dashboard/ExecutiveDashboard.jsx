import { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { Line, AreaChart, Area, PieChart as RechartsPieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart } from 'recharts';
import { Users, AlertTriangle, TrendingUp, Search, Settings, Calendar, MapPin, Activity, Database, FileText, Play, Pause, Download, BarChart3, Network, Target, Clock, Wifi, ExternalLink, Map} from 'lucide-react';
import SideNavigation from './SideNavigation';
import ReportsPage from './ReportsPage';
import SettingsPage from '../pages/SettingsPage';
import PlatformAnalysisPage from './PlatformAnalysisPage'
import InteractiveMap from '../InteractiveMapLeaflet';

const ExecutiveDashboard = ({ user, onLogout, onAnalystClick }) => {
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [realTimeData, setRealTimeData] = useState({
    totalContent: 2480000,
    activeThreats: 23,
    accuracy: 94.2,
    platforms: 5,
    lastUpdate: new Date()
  });

  const [selectedTimeframe, setSelectedTimeframe] = useState('24h');
  const [isLive, setIsLive] = useState(true);
  const [connectionStatus] = useState('connected');

  // Mock real-time data updates
  useEffect(() => {
    if (!isLive) return;
    
    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        ...prev,
        totalContent: prev.totalContent + Math.floor(Math.random() * 100),
        activeThreats: Math.max(0, prev.activeThreats + (Math.random() > 0.7 ? 1 : -1)),
        accuracy: Math.min(100, Math.max(90, prev.accuracy + (Math.random() - 0.5) * 0.2)),
        lastUpdate: new Date()
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, [isLive]);

  // Mock chart data
  const threatTrendData = [
    { time: '00:00', threats: 15, misinformation: 8, hate_speech: 7 },
    { time: '04:00', threats: 12, misinformation: 6, hate_speech: 6 },
    { time: '08:00', threats: 18, misinformation: 11, hate_speech: 7 },
    { time: '12:00', threats: 25, misinformation: 15, hate_speech: 10 },
    { time: '16:00', threats: 31, misinformation: 18, hate_speech: 13 },
    { time: '20:00', threats: 23, misinformation: 12, hate_speech: 11 },
    { time: '24:00', threats: 23, misinformation: 13, hate_speech: 10 }
  ];

  const platformData = [
    { name: 'Facebook', threats: 35, color: '#1877F2' },
    { name: 'X (Twitter)', threats: 28, color: '#000000' },
    { name: 'TikTok', threats: 18, color: '#FE2C55' },
    { name: 'Instagram', threats: 15, color: '#E4405F' },
    { name: 'Reddit', threats: 12, color: '#FF4500' }
  ];

  const geographicData = [
    { region: 'Centre Region', threats: 45, population: 4.1, severity: 'high' },
    { region: 'Littoral Region', threats: 38, population: 3.2, severity: 'high' },
    { region: 'West Region', threats: 22, population: 1.9, severity: 'medium' },
    { region: 'Northwest Region', threats: 18, population: 2.0, severity: 'medium' },
    { region: 'Southwest Region', threats: 15, population: 1.5, severity: 'low' },
    { region: 'Far North Region', threats: 28, population: 4.0, severity: 'high' },
    { region: 'North Region', threats: 12, population: 2.4, severity: 'low' },
    { region: 'Adamawa Region', threats: 8, population: 1.1, severity: 'low' },
    { region: 'East Region', threats: 6, population: 0.8, severity: 'low' },
    { region: 'South Region', threats: 10, population: 0.7, severity: 'low' }
  ];

  const recentAlerts = [
    {
      id: 1,
      type: 'misinformation',
      severity: 'critical',
      title: 'False Election Information Spreading',
      platform: 'Facebook',
      location: 'Douala, Cameroon',
      time: '2 minutes ago',
      engagement: 1250,
      status: 'active'
    },
    {
      id: 2,
      type: 'hate_speech',
      severity: 'high',
      title: 'Ethnic Tension Content Detected',
      platform: 'WhatsApp',
      location: 'Yaoundé, Cameroon',
      time: '8 minutes ago',
      engagement: 890,
      status: 'investigating'
    },
    {
      id: 3,
      type: 'misinformation',
      severity: 'medium',
      title: 'Health Misinformation Campaign',
      platform: 'Twitter/X',
      location: 'Lagos, Nigeria',
      time: '15 minutes ago',
      engagement: 2100,
      status: 'resolved'
    }
  ];

  const ContentMonitoringFeed = () => (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold flex items-center gap-2" style={{ color: colors.text }}>
          <Activity className="w-5 h-5" style={{ color: colors.primary }} />
          Live Content Monitoring
        </h3>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isLive ? 'animate-pulse' : ''}`} style={{ backgroundColor: isLive ? colors.success : colors.textMuted }}></div>
          <span className="text-sm" style={{ color: colors.textSecondary }}>{isLive ? 'Live' : 'Paused'}</span>
          <Button variant="ghost" size="sm" onClick={() => setIsLive(!isLive)}>
            {isLive ? <Pause size={16} /> : <Play size={16} />}
          </Button>
        </div>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {recentAlerts.map(alert => (
          <div 
            key={alert.id} 
            className="border rounded-lg p-4 transition-all duration-200 hover:scale-[1.02]"
            style={{ 
              borderColor: colors.border,
              backgroundColor: colors.bgCard
            }}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge 
                    variant={alert.severity === 'critical' ? 'danger' : alert.severity === 'high' ? 'warning' : 'default'}
                    size="sm"
                  >
                    {alert.severity}
                  </Badge>
                  <Badge variant="default" size="sm">{alert.type.replace('_', ' ')}</Badge>
                  <span className="text-xs" style={{ color: colors.textMuted }}>{alert.platform}</span>
                </div>
                
                <h4 className="font-medium mb-1" style={{ color: colors.text }}>{alert.title}</h4>
                
                <div className="flex items-center gap-4 text-sm" style={{ color: colors.textSecondary }}>
                  <span className="flex items-center gap-1">
                    <MapPin size={12} />
                    {alert.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users size={12} />
                    {alert.engagement.toLocaleString()} engaged
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    {alert.time}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={onAnalystClick}>
                  <Search size={14} />
                  Analyze
                </Button>
                <Badge 
                  variant={
                    alert.status === 'active' ? 'danger' : 
                    alert.status === 'investigating' ? 'warning' : 'success'
                  }
                  size="sm"
                >
                  {alert.status}
                </Badge>
                <Button variant="ghost" size="sm">
                  <ExternalLink size={14} />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );

  const GeographicIntelligence = () => (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-6 flex items-center gap-2" style={{ color: colors.text }}>
          <Map className="w-5 h-5" style={{ color: colors.secondary }} />
          Interactive Threat Map
        </h3>
        
        <div className="mb-6">
          <InteractiveMap theme={colors} />
        </div>
      </Card>
      
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-6 flex items-center gap-2" style={{ color: colors.text }}>
          <Map className="w-5 h-5" style={{ color: colors.secondary }} />
          Regional Intelligence
        </h3>
        
        <div className="space-y-4">
          {geographicData.map((region, index) => (
            <div 
              key={region.region} 
              className="flex items-center justify-between p-3 rounded-lg transition-all duration-200 hover:scale-[1.02]"
              style={{ backgroundColor: colors.bgTertiary }}
            >
              <div className="flex items-center gap-3">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ 
                    backgroundColor: region.severity === 'high' ? colors.danger :
                                     region.severity === 'medium' ? colors.warning : colors.success
                  }}
                ></div>
                <div>
                  <div className="font-medium" style={{ color: colors.text }}>{region.region}</div>
                  <div className="text-sm" style={{ color: colors.textSecondary }}>{region.population}M population</div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="font-bold" style={{ color: colors.text }}>{region.threats}</div>
                <div className="text-xs" style={{ color: colors.textMuted }}>active threats</div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );

  const renderTabContent = () => {
    switch(activeTab) {
      case 'dashboard':
        return (
          <>
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card 
                className="p-6 transition-all duration-300 hover:scale-105" 
                glow
                style={{ 
                  background: `linear-gradient(135deg, ${colors.primary}20 0%, ${colors.primary}10 100%)`,
                  borderColor: `${colors.primary}30`
                }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium" style={{ color: colors.primary }}>Total Content Monitored</p>
                    <p className="text-3xl font-bold mt-1" style={{ color: colors.text }}>
                      {(realTimeData.totalContent / 1000000).toFixed(2)}M
                    </p>
                    <p className="text-xs mt-1" style={{ color: colors.primary }}>
                      +{Math.floor(Math.random() * 50 + 20)}K today
                    </p>
                  </div>
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${colors.primary}20` }}
                  >
                    <Database className="w-6 h-6" style={{ color: colors.primary }} />
                  </div>
                </div>
              </Card>

              <Card 
                className="p-6 transition-all duration-300 hover:scale-105" 
                glow
                style={{ 
                  background: `linear-gradient(135deg, ${colors.danger}20 0%, ${colors.danger}10 100%)`,
                  borderColor: `${colors.danger}30`
                }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium" style={{ color: colors.danger }}>Active Threats</p>
                    <p className="text-3xl font-bold mt-1" style={{ color: colors.text }}>{realTimeData.activeThreats}</p>
                    <p className="text-xs mt-1" style={{ color: colors.danger }}>
                      {Math.random() > 0.5 ? '+2' : '-1'} from yesterday
                    </p>
                  </div>
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${colors.danger}20` }}
                  >
                    <AlertTriangle className="w-6 h-6" style={{ color: colors.danger }} />
                  </div>
                </div>
              </Card>

              <Card 
                className="p-6 transition-all duration-300 hover:scale-105" 
                glow
                style={{ 
                  background: `linear-gradient(135deg, ${colors.success}20 0%, ${colors.success}10 100%)`,
                  borderColor: `${colors.success}30`
                }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium" style={{ color: colors.success }}>Detection Accuracy</p>
                    <p className="text-3xl font-bold mt-1" style={{ color: colors.text }}>{realTimeData.accuracy.toFixed(1)}%</p>
                    <p className="text-xs mt-1" style={{ color: colors.success }}>
                      +0.3% this week
                    </p>
                  </div>
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${colors.success}20` }}
                  >
                    <Target className="w-6 h-6" style={{ color: colors.success }} />
                  </div>
                </div>
              </Card>

              <Card 
                className="p-6 transition-all duration-300 hover:scale-105" 
                glow
                style={{ 
                  background: `linear-gradient(135deg, ${colors.secondary}20 0%, ${colors.secondary}10 100%)`,
                  borderColor: `${colors.secondary}30`
                }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium" style={{ color: colors.secondary }}>Platforms Monitored</p>
                    <p className="text-3xl font-bold mt-1" style={{ color: colors.text }}>{realTimeData.platforms}</p>
                    <p className="text-xs mt-1" style={{ color: colors.secondary }}>
                      All systems operational
                    </p>
                  </div>
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${colors.secondary}20` }}
                  >
                    <Network className="w-6 h-6" style={{ color: colors.secondary }} />
                  </div>
                </div>
              </Card>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Threat Trends */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold" style={{ color: colors.text }}>Threat Trends (24h)</h3>
                  <div className="flex gap-2">
                    {['6h', '24h', '7d', '30d'].map(period => (
                      <Button
                        key={period}
                        variant={selectedTimeframe === period ? 'primary' : 'ghost'}
                        size="sm"
                        onClick={() => setSelectedTimeframe(period)}
                      >
                        {period}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <ResponsiveContainer width="100%" height={300}>
                  <ComposedChart data={threatTrendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={colors.border} />
                    <XAxis dataKey="time" stroke={colors.textSecondary} />
                    <YAxis stroke={colors.textSecondary} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: colors.bgCard, 
                        border: `1px solid ${colors.border}`,
                        borderRadius: '8px',
                        color: colors.text
                      }}
                    />
                    <Area type="monotone" dataKey="threats" stackId="1" stroke={colors.danger} fill={colors.danger} fillOpacity={0.2} />
                    <Line type="monotone" dataKey="misinformation" stroke={colors.warning} strokeWidth={2} />
                    <Line type="monotone" dataKey="hate_speech" stroke={colors.secondary} strokeWidth={2} />
                  </ComposedChart>
                </ResponsiveContainer>
              </Card>

              {/* Platform Distribution */}
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-6" style={{ color: colors.text }}>Platform Distribution</h3>
                
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Pie
                      dataKey="threats"
                      data={platformData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label={({ name, value }) => `${name}: ${value}`}
                    >
                      {platformData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: colors.bgCard, 
                        border: `1px solid ${colors.border}`,
                        borderRadius: '8px',
                        color: colors.text
                      }}
                    />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </Card>
            </div>

            {/* Trending & Emergency Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Trending Topics */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold flex items-center gap-2" style={{ color: colors.text }}>
                    <TrendingUp className="w-5 h-5" style={{ color: colors.warning }} />
                    Trending Topics
                  </h3>
                  <Badge variant="warning" size="sm">Live</Badge>
                </div>
                
                <div className="space-y-4">
                  {[
                    { topic: "Election Misinformation", mentions: 1247, trend: "+23%", severity: "high", platform: "Facebook" },
                    { topic: "COVID-19 Vaccine Claims", mentions: 892, trend: "+15%", severity: "medium", platform: "Twitter" },
                    { topic: "Economic Conspiracy", mentions: 634, trend: "+8%", severity: "medium", platform: "WhatsApp" },
                    { topic: "Ethnic Tensions", mentions: 423, trend: "+45%", severity: "critical", platform: "TikTok" },
                    { topic: "Government Policies", mentions: 312, trend: "-5%", severity: "low", platform: "Instagram" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg transition-all duration-200 hover:scale-105" 
                         style={{ backgroundColor: colors.bgTertiary, border: `1px solid ${colors.border}` }}>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium" style={{ color: colors.text }}>{item.topic}</span>
                          <Badge 
                            variant={item.severity === 'critical' ? 'danger' : item.severity === 'high' ? 'warning' : item.severity === 'medium' ? 'primary' : 'success'} 
                            size="sm"
                          >
                            {item.severity}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <span style={{ color: colors.textSecondary }}>{item.mentions} mentions</span>
                          <span style={{ color: colors.textMuted }}>on {item.platform}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`font-semibold ${item.trend.startsWith('+') ? 'text-red-500' : 'text-green-500'}`}>
                          {item.trend}
                        </div>
                        <div className="text-xs" style={{ color: colors.textMuted }}>24h</div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 pt-4 border-t" style={{ borderColor: colors.border }}>
                  <Button variant="ghost" size="sm" className="w-full">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    View All Trending Topics
                  </Button>
                </div>
              </Card>

              {/* Emergency Alerts */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold flex items-center gap-2" style={{ color: colors.text }}>
                    <AlertTriangle className="w-5 h-5" style={{ color: colors.danger }} />
                    Emergency Alerts
                  </h3>
                  <Badge variant="danger" size="sm">3 Active</Badge>
                </div>
                
                <div className="space-y-4">
                  {[
                    { 
                      id: "EMG-001", 
                      title: "Mass Disinformation Campaign", 
                      description: "Coordinated spread of false election information across multiple platforms",
                      severity: "critical", 
                      time: "2 min ago",
                      location: "Yaoundé, Centre",
                      status: "investigating"
                    },
                    { 
                      id: "EMG-002", 
                      title: "Hate Speech Surge", 
                      description: "Significant increase in ethnic hate speech following political announcement",
                      severity: "high", 
                      time: "15 min ago",
                      location: "Douala, Littoral",
                      status: "monitoring"
                    },
                    { 
                      id: "EMG-003", 
                      title: "Viral Fake News", 
                      description: "False health information spreading rapidly on WhatsApp groups",
                      severity: "medium", 
                      time: "1 hour ago",
                      location: "Bamenda, Nord-Ouest",
                      status: "contained"
                    }
                  ].map((alert, index) => (
                    <div key={index} className="p-4 rounded-lg border-l-4 transition-all duration-200 hover:scale-105" 
                         style={{ 
                           backgroundColor: colors.bgTertiary, 
                           border: `1px solid ${colors.border}`,
                           borderLeftColor: alert.severity === 'critical' ? colors.danger : alert.severity === 'high' ? colors.warning : colors.primary
                         }}>
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm" style={{ color: colors.textMuted }}>{alert.id}</span>
                          <Badge 
                            variant={alert.severity === 'critical' ? 'danger' : alert.severity === 'high' ? 'warning' : 'primary'} 
                            size="sm"
                          >
                            {alert.severity}
                          </Badge>
                        </div>
                        <span className="text-xs" style={{ color: colors.textMuted }}>{alert.time}</span>
                      </div>
                      
                      <h4 className="font-medium mb-1" style={{ color: colors.text }}>{alert.title}</h4>
                      <p className="text-sm mb-2" style={{ color: colors.textSecondary }}>{alert.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-xs" style={{ color: colors.textMuted }}>
                          <MapPin className="w-3 h-3" />
                          {alert.location}
                        </div>
                        <Badge 
                          variant={alert.status === 'investigating' ? 'warning' : alert.status === 'monitoring' ? 'primary' : 'success'} 
                          size="sm"
                        >
                          {alert.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 pt-4 border-t" style={{ borderColor: colors.border }}>
                  <Button variant="danger" size="sm" className="w-full">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    View Emergency Dashboard
                  </Button>
                </div>
              </Card>
            </div>

            {/* Lower Section: Live Feed & Geographic Intelligence */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                {ContentMonitoringFeed()}
              </div>
              <div>
                <GeographicIntelligence />
              </div>
            </div>
          </>
        );
      
      case 'monitoring':
        return (
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-2xl font-semibold mb-4" style={{ color: colors.text }}>Live Content Monitoring</h3>
              <p style={{ color: colors.textSecondary }}>Real-time content analysis and threat detection across all monitored platforms.</p>
            </Card>
            {ContentMonitoringFeed()}
          </div>
        );
      
      case 'analytics':
        return (
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-2xl font-semibold mb-4" style={{ color: colors.text }}>Advanced Analytics</h3>
              <p style={{ color: colors.textSecondary }}>Deep insights and trend analysis for strategic decision making.</p>
            </Card>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h4 className="text-lg font-semibold mb-4" style={{ color: colors.text }}>Threat Pattern Analysis</h4>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={threatTrendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={colors.border} />
                    <XAxis dataKey="time" stroke={colors.textSecondary} />
                    <YAxis stroke={colors.textSecondary} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: colors.bgCard, 
                        border: `1px solid ${colors.border}`, 
                        borderRadius: '8px',
                        color: colors.text
                      }} 
                    />
                    <Area type="monotone" dataKey="threats" stroke={colors.primary} fill={colors.primary} fillOpacity={0.6} />
                  </AreaChart>
                </ResponsiveContainer>
              </Card>
              
              <Card className="p-6">
                <h4 className="text-lg font-semibold mb-4" style={{ color: colors.text }}>Geographic Distribution</h4>
                <GeographicIntelligence />
              </Card>
            </div>
          </div>
        );
      
      case 'geographic':
        return (
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-2xl font-semibold mb-4" style={{ color: colors.text }}>Geographic Intelligence</h3>
              <p style={{ color: colors.textSecondary }}>Regional analysis and geospatial threat mapping.</p>
            </Card>
            <GeographicIntelligence />
          </div>
        );
      
      case 'platforms':
        return <PlatformAnalysisPage />;
      
      case 'reports':
        return <ReportsPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return null;
    }
  };

  return (
    <div 
      className="min-h-screen transition-all duration-500"
      style={{ backgroundColor: colors.bg }}
    >
      <SideNavigation activeTab={activeTab} setActiveTab={setActiveTab} onLogout={onLogout} onAnalystClick={onAnalystClick} />
      
      <div className="ml-64 pt-16">
        {/* Header */}
        <div 
          className="backdrop-blur-sm border-b px-6 py-4 transition-all duration-300"
          style={{ 
            backgroundColor: colors.navBg,
            borderColor: colors.navBorder 
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-3" style={{ color: colors.text }}>
                <div 
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: colors.gradientPrimary }}
                >
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                {activeTab === 'dashboard' ? 'Executive Dashboard' :
                 activeTab === 'monitoring' ? 'Live Monitoring' :
                 activeTab === 'analytics' ? 'Advanced Analytics' :
                 activeTab === 'geographic' ? 'Geographic Intelligence' :
                 activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
              </h1>
              <p className="mt-1" style={{ color: colors.textSecondary }}>
                Real-time misinformation and hate speech monitoring
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm">
                <div 
                  className={`w-2 h-2 rounded-full ${connectionStatus === 'connected' ? 'animate-pulse' : ''}`}
                  style={{ backgroundColor: connectionStatus === 'connected' ? colors.success : colors.danger }}
                ></div>
                <span style={{ color: colors.textSecondary }}>
                  {connectionStatus === 'connected' ? 'Connected' : 'Disconnected'}
                </span>
                <Wifi size={16} style={{ color: colors.textSecondary }} />
              </div>
              
              <div className="text-xs" style={{ color: colors.textMuted }}>
                Last updated: {realTimeData.lastUpdate.toLocaleTimeString()}
              </div>
              
              <Button variant="ghost" size="sm">
                <Settings size={16} />
              </Button>
            </div>
          </div>
        </div>

        <div className="px-6 py-8">
          {renderTabContent()}

          {/* Quick Actions - Only show on dashboard */}
          {activeTab === 'dashboard' && (
            <Card className="p-6 mt-6">
              <h3 className="text-xl font-semibold mb-4" style={{ color: colors.text }}>Quick Actions</h3>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary" icon={Search} onClick={onAnalystClick}>
                  Open Analyst Workstation
                </Button>
                <Button variant="primary" icon={Download}>Export Report</Button>
                <Button variant="secondary" icon={Settings}>Configure Alerts</Button>
                <Button variant="secondary" icon={Calendar}>Schedule Analysis</Button>
                <Button variant="ghost" icon={FileText}>View Detailed Reports</Button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExecutiveDashboard