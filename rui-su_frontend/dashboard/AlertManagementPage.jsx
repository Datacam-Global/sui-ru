import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { 
  Bell, 
  Download, 
  Filter, 
  RotateCcw, 
  Search, 
  AlertTriangle, 
  Flag, 
  CheckCircle, 
  X,
  Clock,
  Users,
  Target,
  TrendingUp,
  Activity,
  Shield,
  Eye,
  Settings,
  BarChart3,
  PieChart,
  Calendar,
  MapPin,
  Zap,
  RefreshCw,
  Play,
  Pause,
  Archive,
  Star,
  MessageSquare,
  ExternalLink,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell
} from 'recharts';

const AlertManagementPage = () => {
  const { colors } = useTheme();
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPlatform, setFilterPlatform] = useState('all');
  const [sortBy, setSortBy] = useState('timestamp');
  const [viewMode, setViewMode] = useState('list'); // list, grid, timeline
  const [isLiveMode, setIsLiveMode] = useState(true);
  const [selectedTimeRange, setSelectedTimeRange] = useState('24h');
  const [expandedAlert, setExpandedAlert] = useState(null);

  // Enhanced alerts data with more comprehensive information
  const alerts = [
    {
      id: 1,
      title: 'High-Risk Misinformation Campaign Detected',
      description: 'Coordinated spread of false information about health policies across multiple platforms',
      severity: 'critical',
      status: 'active',
      platform: 'Facebook',
      timestamp: '2024-06-10 14:32:15',
      affectedUsers: 15420,
      confidence: 96.8,
      tags: ['misinformation', 'health', 'coordinated'],
      location: 'Yaoundé, Centre',
      responseTime: '2 min',
      escalationLevel: 3,
      assignedTo: 'Team Alpha',
      relatedAlerts: [2, 5],
      evidence: ['Screenshot 1', 'URL Analysis', 'Network Graph'],
      priority: 'urgent',
      category: 'misinformation'
    },
    {
      id: 2,
      title: 'Hate Speech Targeting Minority Groups',
      description: 'Increased hate speech activity targeting specific ethnic communities',
      severity: 'high',
      status: 'investigating',
      platform: 'Twitter',
      timestamp: '2024-06-10 13:45:22',
      affectedUsers: 8750,
      confidence: 94.2,
      tags: ['hate-speech', 'ethnic', 'harassment'],
      location: 'Douala, Littoral',
      responseTime: '5 min',
      escalationLevel: 2,
      assignedTo: 'Team Beta',
      relatedAlerts: [1],
      evidence: ['Tweet Archive', 'User Reports'],
      priority: 'high',
      category: 'hate_speech'
    },
    {
      id: 3,
      title: 'Spam Bot Network Activity',
      description: 'Large-scale automated posting detected across multiple accounts',
      severity: 'medium',
      status: 'resolved',
      platform: 'Instagram',
      timestamp: '2024-06-10 12:18:45',
      affectedUsers: 3200,
      confidence: 89.5,
      tags: ['spam', 'bot-network', 'automation'],
      location: 'Bamenda, Nord-Ouest',
      responseTime: '15 min',
      escalationLevel: 1,
      assignedTo: 'Team Gamma',
      relatedAlerts: [],
      evidence: ['Bot Analysis', 'Pattern Recognition'],
      priority: 'medium',
      category: 'spam'
    },
    {
      id: 4,
      title: 'Suspicious Content Sharing Pattern',
      description: 'Unusual sharing patterns detected for potentially harmful content',
      severity: 'low',
      status: 'monitoring',
      platform: 'WhatsApp',
      timestamp: '2024-06-10 11:22:10',
      affectedUsers: 1850,
      confidence: 78.3,
      tags: ['suspicious', 'sharing-pattern', 'monitoring'],
      location: 'Garoua, Nord',
      responseTime: '8 min',
      escalationLevel: 1,
      assignedTo: 'Team Delta',
      relatedAlerts: [],
      evidence: ['Sharing Analysis'],
      priority: 'low',
      category: 'suspicious'
    },
    {
      id: 5,
      title: 'Deepfake Video Distribution',
      description: 'AI-generated fake video content spreading across social platforms',
      severity: 'critical',
      status: 'active',
      platform: 'TikTok',
      timestamp: '2024-06-10 10:55:33',
      affectedUsers: 22100,
      confidence: 98.1,
      tags: ['deepfake', 'video', 'ai-generated'],
      location: 'Bafoussam, Ouest',
      responseTime: '1 min',
      escalationLevel: 3,
      assignedTo: 'Team Alpha',
      relatedAlerts: [1],
      evidence: ['Video Analysis', 'AI Detection Report'],
      priority: 'urgent',
      category: 'deepfake'
    },
    {
      id: 6,
      title: 'Coordinated Harassment Campaign',
      description: 'Multiple accounts targeting individual users with harassment',
      severity: 'high',
      status: 'investigating',
      platform: 'Reddit',
      timestamp: '2024-06-10 09:30:15',
      affectedUsers: 450,
      confidence: 91.7,
      tags: ['harassment', 'coordinated', 'targeting'],
      location: 'Maroua, Extrême-Nord',
      responseTime: '3 min',
      escalationLevel: 2,
      assignedTo: 'Team Beta',
      relatedAlerts: [],
      evidence: ['User Reports', 'Account Analysis'],
      priority: 'high',
      category: 'harassment'
    }
  ];

  // Enhanced alert statistics
  const alertStats = [
    { label: 'Active Alerts', value: '23', change: '+3', color: colors.danger, icon: AlertTriangle },
    { label: 'Resolved Today', value: '47', change: '+12', color: colors.success, icon: CheckCircle },
    { label: 'Under Investigation', value: '8', change: '-2', color: colors.warning, icon: Search },
    { label: 'Average Response Time', value: '4.2 min', change: '-1.3 min', color: colors.primary, icon: Clock },
    { label: 'Critical Threats', value: '5', change: '+2', color: colors.danger, icon: Shield },
    { label: 'Team Efficiency', value: '94.7%', change: '+2.1%', color: colors.success, icon: Target }
  ];

  // Alert trends data for charts
  const alertTrendsData = [
    { time: '00:00', critical: 2, high: 5, medium: 8, low: 12 },
    { time: '04:00', critical: 1, high: 3, medium: 6, low: 9 },
    { time: '08:00', critical: 3, high: 7, medium: 12, low: 15 },
    { time: '12:00', critical: 5, high: 9, medium: 15, low: 18 },
    { time: '16:00', critical: 4, high: 8, medium: 13, low: 16 },
    { time: '20:00', critical: 3, high: 6, medium: 10, low: 14 },
    { time: '24:00', critical: 2, high: 4, medium: 7, low: 11 }
  ];

  // Platform distribution data
  const platformDistribution = [
    { name: 'Facebook', value: 35, color: '#1877F2' },
    { name: 'Twitter', value: 28, color: '#000000' },
    { name: 'TikTok', value: 18, color: '#FE2C55' },
    { name: 'Instagram', value: 12, color: '#E4405F' },
    { name: 'WhatsApp', value: 15, color: '#25D366' },
    { name: 'Reddit', value: 8, color: '#FF4500' }
  ];

  // Response time analytics
  const responseTimeData = [
    { team: 'Team Alpha', avgTime: 2.1, alerts: 15, efficiency: 98 },
    { team: 'Team Beta', avgTime: 3.4, alerts: 12, efficiency: 95 },
    { team: 'Team Gamma', avgTime: 4.8, alerts: 8, efficiency: 92 },
    { team: 'Team Delta', avgTime: 5.2, alerts: 6, efficiency: 89 }
  ];

  // Real-time updates
  useEffect(() => {
    if (!isLiveMode) return;
    
    const interval = setInterval(() => {
      // Simulate real-time updates
    }, 5000);

    return () => clearInterval(interval);
  }, [isLiveMode]);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return colors.danger;
      case 'high': return '#f97316';
      case 'medium': return colors.warning;
      case 'low': return colors.primary;
      default: return colors.textSecondary;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return colors.danger;
      case 'investigating': return colors.warning;
      case 'monitoring': return colors.primary;
      case 'resolved': return colors.success;
      default: return colors.textSecondary;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return colors.danger;
      case 'high': return colors.warning;
      case 'medium': return colors.primary;
      case 'low': return colors.success;
      default: return colors.textSecondary;
    }
  };

  const filteredAlerts = alerts.filter(alert => {
    const severityMatch = filterSeverity === 'all' || alert.severity === filterSeverity;
    const statusMatch = filterStatus === 'all' || alert.status === filterStatus;
    const platformMatch = filterPlatform === 'all' || alert.platform === filterPlatform;
    return severityMatch && statusMatch && platformMatch;
  });

  const handleAlertAction = (alertId, action) => {
    alert(`Performing ${action} on alert ${alertId}`);
  };

  const AlertCard = ({ alert, isExpanded, onToggleExpand }) => (
    <Card className="p-6 hover:scale-[1.01] transition-all duration-200 cursor-pointer border-l-4"
          style={{ borderLeftColor: getSeverityColor(alert.severity) }}
          onClick={() => setSelectedAlert(alert)}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div 
              className="w-3 h-3 rounded-full animate-pulse"
              style={{ backgroundColor: getSeverityColor(alert.severity) }}
            />
            <h3 className="font-semibold text-lg" style={{ color: colors.text }}>{alert.title}</h3>
            <Badge variant={alert.severity === 'critical' ? 'danger' : alert.severity === 'high' ? 'warning' : alert.severity === 'medium' ? 'primary' : 'success'}>
              {alert.severity.toUpperCase()}
            </Badge>
            <Badge variant={alert.status === 'active' ? 'danger' : alert.status === 'investigating' ? 'warning' : alert.status === 'monitoring' ? 'primary' : 'success'}>
              {alert.status.toUpperCase()}
            </Badge>
            <Badge variant="default" size="sm">{alert.priority}</Badge>
          </div>
          
          <p className="mb-3" style={{ color: colors.textSecondary }}>{alert.description}</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
            <div className="flex items-center gap-2">
              <span style={{ color: colors.textMuted }}>📱</span>
              <span style={{ color: colors.text }}>{alert.platform}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" style={{ color: colors.textMuted }} />
              <span style={{ color: colors.text }}>{alert.affectedUsers.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4" style={{ color: colors.textMuted }} />
              <span style={{ color: colors.text }}>{alert.confidence}%</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" style={{ color: colors.textMuted }} />
              <span style={{ color: colors.text }}>{alert.responseTime}</span>
            </div>
          </div>

          {isExpanded && (
            <div className="mt-4 p-4 rounded-lg" style={{ backgroundColor: colors.bgTertiary }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h4 className="font-medium mb-2" style={{ color: colors.text }}>Assignment Details</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span style={{ color: colors.textSecondary }}>Assigned Team:</span>
                      <span style={{ color: colors.text }}>{alert.assignedTo}</span>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ color: colors.textSecondary }}>Escalation Level:</span>
                      <span style={{ color: colors.text }}>Level {alert.escalationLevel}</span>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ color: colors.textSecondary }}>Location:</span>
                      <span style={{ color: colors.text }}>{alert.location}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2" style={{ color: colors.text }}>Evidence & Related</h4>
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm" style={{ color: colors.textSecondary }}>Evidence:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {alert.evidence.map((item, index) => (
                          <Badge key={index} variant="default" size="sm">{item}</Badge>
                        ))}
                      </div>
                    </div>
                    {alert.relatedAlerts.length > 0 && (
                      <div>
                        <span className="text-sm" style={{ color: colors.textSecondary }}>Related Alerts:</span>
                        <div className="flex gap-1 mt-1">
                          {alert.relatedAlerts.map((id, index) => (
                            <Badge key={index} variant="secondary" size="sm">#{id}</Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div className="flex flex-wrap gap-2 mt-3">
            {alert.tags.map((tag, index) => (
              <span key={index} className="px-2 py-1 rounded text-xs"
                    style={{ backgroundColor: colors.bgSecondary, color: colors.textSecondary }}>
                #{tag}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between mt-3">
            <span className="text-xs" style={{ color: colors.textMuted }}>
              {alert.timestamp}
            </span>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onToggleExpand(alert.id);
              }}
            >
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </Button>
          </div>
        </div>
        
        <div className="flex flex-col gap-2 ml-4">
          <Button variant="primary" size="sm" 
                  onClick={(e) => { e.stopPropagation(); handleAlertAction(alert.id, 'investigate'); }}>
            <Search className="w-4 h-4 mr-1" />
            Investigate
          </Button>
          <Button variant="secondary" size="sm"
                  onClick={(e) => { e.stopPropagation(); handleAlertAction(alert.id, 'escalate'); }}>
            <AlertTriangle className="w-4 h-4 mr-1" />
            Escalate
          </Button>
          {alert.status !== 'resolved' && (
            <Button variant="ghost" size="sm"
                    onClick={(e) => { e.stopPropagation(); handleAlertAction(alert.id, 'resolve'); }}>
              <CheckCircle className="w-4 h-4 mr-1" />
              Resolve
            </Button>
          )}
        </div>
      </div>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold" style={{ color: colors.text }}>Advanced Alert Management</h2>
          <p style={{ color: colors.textSecondary }}>Comprehensive threat monitoring, analysis, and response coordination</p>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${isLiveMode ? 'animate-pulse' : ''}`} 
                   style={{ backgroundColor: isLiveMode ? colors.success : colors.textMuted }}></div>
              <span className="text-sm" style={{ color: colors.textSecondary }}>
                {isLiveMode ? 'Live Monitoring' : 'Paused'}
              </span>
            </div>
            <Badge variant="primary">{filteredAlerts.length} Active Alerts</Badge>
          </div>
        </div>
        <div className="flex gap-3">
          <Button 
            variant={isLiveMode ? "primary" : "ghost"} 
            size="sm"
            onClick={() => setIsLiveMode(!isLiveMode)}
          >
            {isLiveMode ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
            {isLiveMode ? 'Pause' : 'Resume'}
          </Button>
          <Button variant="secondary">
            <Bell className="w-4 h-4 mr-2" />
            Configure
          </Button>
          <Button variant="ghost">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Enhanced Alert Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {alertStats.map((stat, index) => (
          <Card key={index} className="p-4 hover:scale-105 transition-transform">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium" style={{ color: stat.color }}>{stat.label}</p>
                <p className="text-xl font-bold mt-1" style={{ color: colors.text }}>{stat.value}</p>
                <p className="text-xs mt-1" style={{ color: stat.color }}>{stat.change}</p>
              </div>
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${stat.color}20` }}
              >
                <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Analytics Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Alert Trends */}
        <Card className="p-6 lg:col-span-2">
          <h3 className="text-xl font-semibold mb-4" style={{ color: colors.text }}>Alert Trends (24h)</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={alertTrendsData}>
                <CartesianGrid strokeDasharray="3 3" stroke={colors.border} />
                <XAxis dataKey="time" stroke={colors.textSecondary} />
                <YAxis stroke={colors.textSecondary} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: colors.bgCard, 
                    border: `1px solid ${colors.border}`,
                    borderRadius: '8px'
                  }}
                />
                <Area type="monotone" dataKey="critical" stackId="1" stroke={colors.danger} fill={colors.danger} fillOpacity={0.8} />
                <Area type="monotone" dataKey="high" stackId="1" stroke="#f97316" fill="#f97316" fillOpacity={0.6} />
                <Area type="monotone" dataKey="medium" stackId="1" stroke={colors.warning} fill={colors.warning} fillOpacity={0.4} />
                <Area type="monotone" dataKey="low" stackId="1" stroke={colors.primary} fill={colors.primary} fillOpacity={0.2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Platform Distribution */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4" style={{ color: colors.text }}>Platform Distribution</h3>
          <div className="h-64 mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={platformDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {platformDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2">
            {platformDistribution.map((platform, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: platform.color }}></div>
                  <span style={{ color: colors.text }}>{platform.name}</span>
                </div>
                <span style={{ color: colors.textSecondary }}>{platform.value} alerts</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Team Performance */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4" style={{ color: colors.text }}>Team Performance & Response Times</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={responseTimeData}>
              <CartesianGrid strokeDasharray="3 3" stroke={colors.border} />
              <XAxis dataKey="team" stroke={colors.textSecondary} />
              <YAxis stroke={colors.textSecondary} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: colors.bgCard, 
                  border: `1px solid ${colors.border}`,
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="avgTime" fill={colors.primary} name="Avg Response Time (min)" />
              <Bar dataKey="alerts" fill={colors.secondary} name="Alerts Handled" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Enhanced Filters and Controls */}
      <Card className="p-6">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="flex flex-wrap gap-4">
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: colors.text }}>Severity</label>
              <select 
                value={filterSeverity} 
                onChange={(e) => setFilterSeverity(e.target.value)}
                className="px-3 py-2 rounded-lg border"
                style={{ 
                  backgroundColor: colors.bgCard, 
                  borderColor: colors.border,
                  color: colors.text 
                }}
              >
                <option value="all">All Severities</option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: colors.text }}>Status</label>
              <select 
                value={filterStatus} 
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 rounded-lg border"
                style={{ 
                  backgroundColor: colors.bgCard, 
                  borderColor: colors.border,
                  color: colors.text 
                }}
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="investigating">Investigating</option>
                <option value="monitoring">Monitoring</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: colors.text }}>Platform</label>
              <select 
                value={filterPlatform} 
                onChange={(e) => setFilterPlatform(e.target.value)}
                className="px-3 py-2 rounded-lg border"
                style={{ 
                  backgroundColor: colors.bgCard, 
                  borderColor: colors.border,
                  color: colors.text 
                }}
              >
                <option value="all">All Platforms</option>
                <option value="Facebook">Facebook</option>
                <option value="Twitter">Twitter</option>
                <option value="Instagram">Instagram</option>
                <option value="TikTok">TikTok</option>
                <option value="WhatsApp">WhatsApp</option>
                <option value="Reddit">Reddit</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: colors.text }}>Sort By</label>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 rounded-lg border"
                style={{ 
                  backgroundColor: colors.bgCard, 
                  borderColor: colors.border,
                  color: colors.text 
                }}
              >
                <option value="timestamp">Latest First</option>
                <option value="severity">Severity</option>
                <option value="confidence">Confidence</option>
                <option value="affected">Affected Users</option>
                <option value="priority">Priority</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: colors.text }}>View Mode</label>
              <select 
                value={viewMode} 
                onChange={(e) => setViewMode(e.target.value)}
                className="px-3 py-2 rounded-lg border"
                style={{ 
                  backgroundColor: colors.bgCard, 
                  borderColor: colors.border,
                  color: colors.text 
                }}
              >
                <option value="list">List View</option>
                <option value="grid">Grid View</option>
                <option value="timeline">Timeline View</option>
              </select>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button variant="ghost" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Advanced
            </Button>
            <Button variant="ghost" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Button variant="ghost" size="sm">
              <Archive className="w-4 h-4 mr-2" />
              Archive
            </Button>
          </div>
        </div>
      </div>

      {/* Enhanced Alerts List */}
      <div className="space-y-4">
        {filteredAlerts.map((alert) => (
          <AlertCard 
            key={alert.id} 
            alert={alert} 
            isExpanded={expandedAlert === alert.id}
            onToggleExpand={(id) => setExpandedAlert(expandedAlert === id ? null : id)}
          />
        ))}
      </div>

      {/* Enhanced Alert Detail Modal */}
      {selectedAlert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold" style={{ color: colors.text }}>{selectedAlert.title}</h2>
                  <p className="mt-2" style={{ color: colors.textSecondary }}>{selectedAlert.description}</p>
                  <div className="flex gap-2 mt-3">
                    <Badge variant={selectedAlert.severity === 'critical' ? 'danger' : selectedAlert.severity === 'high' ? 'warning' : 'primary'}>
                      {selectedAlert.severity.toUpperCase()}
                    </Badge>
                    <Badge variant={selectedAlert.status === 'active' ? 'danger' : selectedAlert.status === 'investigating' ? 'warning' : 'success'}>
                      {selectedAlert.status.toUpperCase()}
                    </Badge>
                    <Badge variant="default">{selectedAlert.priority}</Badge>
                  </div>
                </div>
                <Button variant="ghost" onClick={() => setSelectedAlert(null)}>
                  <X className="w-5 h-5" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <div className="lg:col-span-2">
                  <h3 className="font-semibold mb-3" style={{ color: colors.text }}>Detailed Information</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span style={{ color: colors.textSecondary }}>Platform:</span>
                        <span style={{ color: colors.text }}>{selectedAlert.platform}</span>
                      </div>
                      <div className="flex justify-between">
                        <span style={{ color: colors.textSecondary }}>Confidence:</span>
                        <span style={{ color: colors.text }}>{selectedAlert.confidence}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span style={{ color: colors.textSecondary }}>Affected Users:</span>
                        <span style={{ color: colors.text }}>{selectedAlert.affectedUsers.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span style={{ color: colors.textSecondary }}>Response Time:</span>
                        <span style={{ color: colors.text }}>{selectedAlert.responseTime}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span style={{ color: colors.textSecondary }}>Location:</span>
                        <span style={{ color: colors.text }}>{selectedAlert.location}</span>
                      </div>
                      <div className="flex justify-between">
                        <span style={{ color: colors.textSecondary }}>Assigned Team:</span>
                        <span style={{ color: colors.text }}>{selectedAlert.assignedTo}</span>
                      </div>
                      <div className="flex justify-between">
                        <span style={{ color: colors.textSecondary }}>Escalation Level:</span>
                        <span style={{ color: colors.text }}>Level {selectedAlert.escalationLevel}</span>
                      </div>
                      <div className="flex justify-between">
                        <span style={{ color: colors.textSecondary }}>Timestamp:</span>
                        <span style={{ color: colors.text }}>{selectedAlert.timestamp}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h4 className="font-medium mb-3" style={{ color: colors.text }}>Evidence & Documentation</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedAlert.evidence.map((item, index) => (
                        <Button key={index} variant="ghost" size="sm" className="justify-start">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          {item}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {selectedAlert.relatedAlerts.length > 0 && (
                    <div className="mt-6">
                      <h4 className="font-medium mb-3" style={{ color: colors.text }}>Related Alerts</h4>
                      <div className="flex gap-2">
                        {selectedAlert.relatedAlerts.map((id, index) => (
                          <Badge key={index} variant="secondary">Alert #{id}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                <div>
                  <h3 className="font-semibold mb-3" style={{ color: colors.text }}>Quick Actions</h3>
                  <div className="space-y-3">
                    <Button variant="primary" className="w-full">
                      <Search className="w-4 h-4 mr-2" />
                      Start Investigation
                    </Button>
                    <Button variant="secondary" className="w-full">
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      Escalate Alert
                    </Button>
                    <Button variant="ghost" className="w-full">
                      <Flag className="w-4 h-4 mr-2" />
                      Flag for Review
                    </Button>
                    <Button variant="ghost" className="w-full">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Add Comment
                    </Button>
                    <Button variant="ghost" className="w-full">
                      <Star className="w-4 h-4 mr-2" />
                      Mark Important
                    </Button>
                    <Button variant="success" className="w-full">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Mark Resolved
                    </Button>
                  </div>

                  <div className="mt-6">
                    <h4 className="font-medium mb-3" style={{ color: colors.text }}>Assignment</h4>
                    <div className="space-y-2">
                      <select className="w-full px-3 py-2 rounded-lg border"
                              style={{ 
                                backgroundColor: colors.bgCard, 
                                borderColor: colors.border,
                                color: colors.text 
                              }}>
                        <option>Team Alpha</option>
                        <option>Team Beta</option>
                        <option>Team Gamma</option>
                        <option>Team Delta</option>
                      </select>
                      <Button variant="primary" size="sm" className="w-full">
                        Reassign
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-3" style={{ color: colors.text }}>Tags & Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedAlert.tags.map((tag, index) => (
                    <span key={index} className="px-3 py-1 rounded-full text-sm"
                          style={{ backgroundColor: colors.primary + '20', color: colors.primary }}>
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Enhanced Quick Actions */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4" style={{ color: colors.text }}>Alert Management Tools</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          <Button variant="primary" className="flex-col h-20">
            <Zap className="w-6 h-6 mb-1" />
            <span className="text-xs">Bulk Actions</span>
          </Button>
          <Button variant="secondary" className="flex-col h-20">
            <Settings className="w-6 h-6 mb-1" />
            <span className="text-xs">Configure Rules</span>
          </Button>
          <Button variant="ghost" className="flex-col h-20">
            <BarChart3 className="w-6 h-6 mb-1" />
            <span className="text-xs">Analytics</span>
          </Button>
          <Button variant="ghost" className="flex-col h-20">
            <Calendar className="w-6 h-6 mb-1" />
            <span className="text-xs">Schedule Report</span>
          </Button>
          <Button variant="ghost" className="flex-col h-20">
            <Archive className="w-6 h-6 mb-1" />
            <span className="text-xs">Archive Old</span>
          </Button>
          <Button variant="ghost" className="flex-col h-20">
            <Download className="w-6 h-6 mb-1" />
            <span className="text-xs">Export Data</span>
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default AlertManagementPage;

