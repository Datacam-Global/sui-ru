import React, { useState, useEffect } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { 
  Download, 
  Calendar, 
  Clock, 
  FileText, 
  Settings, 
  Plus,
  Search,
  Filter,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Archive,
  Star,
  CheckCircle,
  AlertCircle,
  XCircle,
  RefreshCw,
  Upload,
  Send,
  Users,
  BarChart3,
  PieChart,
  TrendingUp,
  Activity,
  Target,
  Zap,
  Flag,
  MessageSquare,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
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

const ReportsPage = () => {
  const { colors } = useTheme();
  const [selectedReport, setSelectedReport] = useState('summary');
  const [dateRange, setDateRange] = useState('7d');
  const [reportFormat, setReportFormat] = useState('pdf');
  const [activeTab, setActiveTab] = useState('generate'); // generate, queue, scheduled, analytics
  const [queueFilter, setQueueFilter] = useState('all');
  const [selectedReports, setSelectedReports] = useState([]);
  const [expandedReport, setExpandedReport] = useState(null);

  const reportTypes = [
    { id: 'summary', name: 'Executive Summary', description: 'High-level overview of threats and system performance', estimatedTime: '2-3 min' },
    { id: 'detailed', name: 'Detailed Analysis', description: 'Comprehensive breakdown of all detected threats', estimatedTime: '5-8 min' },
    { id: 'platform', name: 'Platform-specific', description: 'Individual reports for each monitored platform', estimatedTime: '3-5 min' },
    { id: 'geographic', name: 'Geographic Analysis', description: 'Regional threat distribution and patterns', estimatedTime: '4-6 min' },
    { id: 'trend', name: 'Trend Analysis', description: 'Historical trends and predictive insights', estimatedTime: '6-10 min' },
    { id: 'custom', name: 'Custom Report', description: 'Build your own report with selected metrics', estimatedTime: '3-15 min' }
  ];

  // Enhanced report queue with comprehensive data
  const reportQueue = [
    {
      id: 'RPT-001',
      name: 'Weekly Executive Summary',
      type: 'Executive Summary',
      requestedBy: 'John Doe',
      requestedAt: '2024-06-10 14:30:00',
      status: 'processing',
      progress: 75,
      priority: 'high',
      estimatedCompletion: '2024-06-10 14:45:00',
      parameters: { dateRange: '7d', format: 'pdf', platforms: ['all'] },
      size: '2.4 MB',
      category: 'executive'
    },
    {
      id: 'RPT-002',
      name: 'Facebook Deep Dive Analysis',
      type: 'Platform Analysis',
      requestedBy: 'Jane Smith',
      requestedAt: '2024-06-10 14:15:00',
      status: 'queued',
      progress: 0,
      priority: 'medium',
      estimatedCompletion: '2024-06-10 15:00:00',
      parameters: { dateRange: '30d', format: 'excel', platforms: ['Facebook'] },
      size: '5.7 MB',
      category: 'platform'
    },
    {
      id: 'RPT-003',
      name: 'Regional Threat Distribution',
      type: 'Geographic Analysis',
      requestedBy: 'Mike Johnson',
      requestedAt: '2024-06-10 13:45:00',
      status: 'completed',
      progress: 100,
      priority: 'low',
      estimatedCompletion: '2024-06-10 14:00:00',
      parameters: { dateRange: '24h', format: 'pdf', regions: ['all'] },
      size: '3.1 MB',
      category: 'geographic'
    },
    {
      id: 'RPT-004',
      name: 'Monthly Trend Analysis',
      type: 'Trend Analysis',
      requestedBy: 'Sarah Wilson',
      requestedAt: '2024-06-10 13:30:00',
      status: 'failed',
      progress: 0,
      priority: 'high',
      estimatedCompletion: '2024-06-10 14:30:00',
      parameters: { dateRange: '90d', format: 'pdf', metrics: ['all'] },
      size: '8.2 MB',
      category: 'analytics',
      errorMessage: 'Data source temporarily unavailable'
    },
    {
      id: 'RPT-005',
      name: 'Instagram Content Analysis',
      type: 'Platform Analysis',
      requestedBy: 'David Brown',
      requestedAt: '2024-06-10 13:00:00',
      status: 'completed',
      progress: 100,
      priority: 'medium',
      estimatedCompletion: '2024-06-10 13:30:00',
      parameters: { dateRange: '14d', format: 'csv', platforms: ['Instagram'] },
      size: '4.2 MB',
      category: 'platform'
    },
    {
      id: 'RPT-006',
      name: 'Emergency Threat Assessment',
      type: 'Custom Report',
      requestedBy: 'Admin User',
      requestedAt: '2024-06-10 12:45:00',
      status: 'processing',
      progress: 45,
      priority: 'urgent',
      estimatedCompletion: '2024-06-10 13:15:00',
      parameters: { dateRange: '6h', format: 'pdf', severity: ['critical', 'high'] },
      size: '1.8 MB',
      category: 'emergency'
    }
  ];

  // Enhanced report metrics
  const reportMetrics = [
    { label: 'Total Reports Generated', value: '1,247', change: '+12%', color: colors.primary, icon: FileText },
    { label: 'Reports in Queue', value: '8', change: '+3', color: colors.warning, icon: Clock },
    { label: 'Average Processing Time', value: '4.2 min', change: '-8%', color: colors.success, icon: Activity },
    { label: 'Reports Downloaded', value: '892', change: '+24%', color: colors.secondary, icon: Download },
    { label: 'Automated Reports', value: '156', change: '+45%', color: colors.primary, icon: RefreshCw },
    { label: 'Failed Reports', value: '12', change: '-15%', color: colors.danger, icon: XCircle }
  ];

  // Queue analytics data
  const queueAnalytics = [
    { time: '00:00', queued: 2, processing: 1, completed: 8 },
    { time: '04:00', queued: 1, processing: 0, completed: 12 },
    { time: '08:00', queued: 5, processing: 2, completed: 15 },
    { time: '12:00', queued: 8, processing: 3, completed: 22 },
    { time: '16:00', queued: 6, processing: 2, completed: 18 },
    { time: '20:00', queued: 4, processing: 1, completed: 14 },
    { time: '24:00', queued: 3, processing: 1, completed: 10 }
  ];

  // Report type distribution
  const reportTypeDistribution = [
    { name: 'Executive', value: 35, color: colors.primary },
    { name: 'Platform', value: 28, color: colors.secondary },
    { name: 'Geographic', value: 18, color: colors.success },
    { name: 'Trend', value: 12, color: colors.warning },
    { name: 'Custom', value: 7, color: colors.danger }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return colors.success;
      case 'processing': return colors.primary;
      case 'queued': return colors.warning;
      case 'failed': return colors.danger;
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

  const filteredQueue = reportQueue.filter(report => {
    if (queueFilter === 'all') return true;
    return report.status === queueFilter;
  });

  const generateReport = () => {
    const reportType = reportTypes.find(r => r.id === selectedReport);
    alert(`Generating ${reportType?.name} report for ${dateRange} in ${reportFormat.toUpperCase()} format...`);
  };

  const handleBulkAction = (action) => {
    if (selectedReports.length === 0) {
      alert('Please select reports first');
      return;
    }
    alert(`Performing ${action} on ${selectedReports.length} selected reports`);
  };

  const ReportQueueCard = ({ report, isExpanded, onToggleExpand }) => (
    <Card className="p-4 hover:scale-[1.01] transition-all duration-200 border-l-4"
          style={{ borderLeftColor: getPriorityColor(report.priority) }}>
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3 flex-1">
          <input
            type="checkbox"
            checked={selectedReports.includes(report.id)}
            onChange={(e) => {
              if (e.target.checked) {
                setSelectedReports([...selectedReports, report.id]);
              } else {
                setSelectedReports(selectedReports.filter(id => id !== report.id));
              }
            }}
            className="mt-1"
          />
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="font-semibold" style={{ color: colors.text }}>{report.name}</h3>
              <Badge variant={report.status === 'completed' ? 'success' : report.status === 'processing' ? 'primary' : report.status === 'failed' ? 'danger' : 'warning'}>
                {report.status.toUpperCase()}
              </Badge>
              <Badge variant={report.priority === 'urgent' ? 'danger' : report.priority === 'high' ? 'warning' : 'default'} size="sm">
                {report.priority}
              </Badge>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
              <div>
                <span style={{ color: colors.textSecondary }}>ID:</span>
                <span style={{ color: colors.text }} className="ml-1">{report.id}</span>
              </div>
              <div>
                <span style={{ color: colors.textSecondary }}>Requested by:</span>
                <span style={{ color: colors.text }} className="ml-1">{report.requestedBy}</span>
              </div>
              <div>
                <span style={{ color: colors.textSecondary }}>Size:</span>
                <span style={{ color: colors.text }} className="ml-1">{report.size}</span>
              </div>
              <div>
                <span style={{ color: colors.textSecondary }}>Type:</span>
                <span style={{ color: colors.text }} className="ml-1">{report.type}</span>
              </div>
            </div>

            {report.status === 'processing' && (
              <div className="mb-3">
                <div className="flex justify-between text-sm mb-1">
                  <span style={{ color: colors.textSecondary }}>Progress</span>
                  <span style={{ color: colors.text }}>{report.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full transition-all duration-300"
                    style={{ 
                      width: `${report.progress}%`,
                      backgroundColor: colors.primary 
                    }}
                  />
                </div>
              </div>
            )}

            {report.status === 'failed' && (
              <div className="mb-3 p-2 rounded" style={{ backgroundColor: colors.danger + '20' }}>
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" style={{ color: colors.danger }} />
                  <span className="text-sm" style={{ color: colors.danger }}>
                    Error: {report.errorMessage}
                  </span>
                </div>
              </div>
            )}

            {isExpanded && (
              <div className="mt-4 p-3 rounded-lg" style={{ backgroundColor: colors.bgTertiary }}>
                <h4 className="font-medium mb-2" style={{ color: colors.text }}>Report Parameters</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span style={{ color: colors.textSecondary }}>Date Range:</span>
                    <span style={{ color: colors.text }} className="ml-1">{report.parameters.dateRange}</span>
                  </div>
                  <div>
                    <span style={{ color: colors.textSecondary }}>Format:</span>
                    <span style={{ color: colors.text }} className="ml-1">{report.parameters.format.toUpperCase()}</span>
                  </div>
                  <div>
                    <span style={{ color: colors.textSecondary }}>Requested:</span>
                    <span style={{ color: colors.text }} className="ml-1">{report.requestedAt}</span>
                  </div>
                  <div>
                    <span style={{ color: colors.textSecondary }}>ETA:</span>
                    <span style={{ color: colors.text }} className="ml-1">{report.estimatedCompletion}</span>
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-2 text-xs" style={{ color: colors.textMuted }}>
                <Clock className="w-3 h-3" />
                {report.requestedAt}
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => onToggleExpand(report.id)}
              >
                {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col gap-2 ml-4">
          {report.status === 'completed' && (
            <Button variant="primary" size="sm">
              <Download className="w-4 h-4 mr-1" />
              Download
            </Button>
          )}
          {report.status === 'failed' && (
            <Button variant="secondary" size="sm">
              <RotateCcw className="w-4 h-4 mr-1" />
              Retry
            </Button>
          )}
          {(report.status === 'queued' || report.status === 'processing') && (
            <Button variant="ghost" size="sm">
              <XCircle className="w-4 h-4 mr-1" />
              Cancel
            </Button>
          )}
          <Button variant="ghost" size="sm">
            <MoreVertical className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold" style={{ color: colors.text }}>Advanced Reports & Analytics</h2>
          <p style={{ color: colors.textSecondary }}>Generate, manage, and analyze comprehensive threat intelligence reports</p>
          <div className="flex items-center gap-4 mt-2">
            <Badge variant="primary">{reportQueue.filter(r => r.status === 'processing').length} Processing</Badge>
            <Badge variant="warning">{reportQueue.filter(r => r.status === 'queued').length} Queued</Badge>
            <Badge variant="success">{reportQueue.filter(r => r.status === 'completed').length} Completed Today</Badge>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary">
            <Upload className="w-4 h-4 mr-2" />
            Import Template
          </Button>
          <Button variant="primary" onClick={generateReport}>
            <Plus className="w-4 h-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Enhanced Report Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {reportMetrics.map((metric, index) => (
          <Card key={index} className="p-4 hover:scale-105 transition-transform">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium" style={{ color: metric.color }}>{metric.label}</p>
                <p className="text-xl font-bold mt-1" style={{ color: colors.text }}>{metric.value}</p>
                <p className="text-xs mt-1" style={{ color: metric.color }}>{metric.change}</p>
              </div>
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${metric.color}20` }}
              >
                <metric.icon className="w-5 h-5" style={{ color: metric.color }} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Tab Navigation */}
      <Card className="p-1">
        <div className="flex gap-1">
          {[
            { id: 'generate', label: 'Generate Reports', icon: Plus },
            { id: 'queue', label: 'Report Queue', icon: Clock },
            { id: 'scheduled', label: 'Scheduled Reports', icon: Calendar },
            { id: 'analytics', label: 'Analytics', icon: BarChart3 }
          ].map(tab => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? 'primary' : 'ghost'}
              onClick={() => setActiveTab(tab.id)}
              className="flex-1"
            >
              <tab.icon className="w-4 h-4 mr-2" />
              {tab.label}
            </Button>
          ))}
        </div>
      </Card>

      {/* Tab Content */}
      {activeTab === 'generate' && (
        <>
          {/* Report Generation */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-6" style={{ color: colors.text }}>Generate Custom Report</h3>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>Report Type</label>
                <select 
                  value={selectedReport} 
                  onChange={(e) => setSelectedReport(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border"
                  style={{ 
                    backgroundColor: colors.bgCard, 
                    borderColor: colors.border,
                    color: colors.text 
                  }}
                >
                  {reportTypes.map(type => (
                    <option key={type.id} value={type.id}>{type.name}</option>
                  ))}
                </select>
                <p className="text-sm mt-2" style={{ color: colors.textSecondary }}>
                  {reportTypes.find(r => r.id === selectedReport)?.description}
                </p>
                <p className="text-xs mt-1" style={{ color: colors.textMuted }}>
                  Est. time: {reportTypes.find(r => r.id === selectedReport)?.estimatedTime}
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>Date Range</label>
                <select 
                  value={dateRange} 
                  onChange={(e) => setDateRange(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border"
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
                  <option value="custom">Custom Range</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>Format</label>
                <select 
                  value={reportFormat} 
                  onChange={(e) => setReportFormat(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border"
                  style={{ 
                    backgroundColor: colors.bgCard, 
                    borderColor: colors.border,
                    color: colors.text 
                  }}
                >
                  <option value="pdf">PDF Document</option>
                  <option value="excel">Excel Spreadsheet</option>
                  <option value="csv">CSV Data</option>
                  <option value="json">JSON Data</option>
                  <option value="powerpoint">PowerPoint Presentation</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>Priority</label>
                <select 
                  className="w-full px-4 py-2 rounded-lg border"
                  style={{ 
                    backgroundColor: colors.bgCard, 
                    borderColor: colors.border,
                    color: colors.text 
                  }}
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <Button variant="primary" onClick={generateReport}>
                <Send className="w-4 h-4 mr-2" />
                Generate & Queue Report
              </Button>
              <Button variant="secondary">
                <Eye className="w-4 h-4 mr-2" />
                Preview Configuration
              </Button>
              <Button variant="ghost">
                <Star className="w-4 h-4 mr-2" />
                Save as Template
              </Button>
            </div>
          </Card>

          {/* Report Templates */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-6" style={{ color: colors.text }}>Quick Templates</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {reportTypes.map((template) => (
                <div key={template.id} className="p-4 rounded-lg border cursor-pointer hover:scale-105 transition-transform"
                     style={{ backgroundColor: colors.bgCard, borderColor: colors.border }}
                     onClick={() => setSelectedReport(template.id)}>
                  <div className="flex items-center gap-3 mb-3">
                    <div 
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: colors.primary + '20' }}
                    >
                      <FileText className="w-4 h-4" style={{ color: colors.primary }} />
                    </div>
                    <h4 className="font-semibold" style={{ color: colors.text }}>{template.name}</h4>
                  </div>
                  <p className="text-sm mb-2" style={{ color: colors.textSecondary }}>{template.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs" style={{ color: colors.textMuted }}>{template.estimatedTime}</span>
                    <Button variant="ghost" size="sm">Use Template</Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </>
      )}

      {activeTab === 'queue' && (
        <>
          {/* Queue Management Controls */}
          <Card className="p-6">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              <div className="flex flex-wrap gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: colors.text }}>Filter by Status</label>
                  <select 
                    value={queueFilter} 
                    onChange={(e) => setQueueFilter(e.target.value)}
                    className="px-3 py-2 rounded-lg border"
                    style={{ 
                      backgroundColor: colors.bgCard, 
                      borderColor: colors.border,
                      color: colors.text 
                    }}
                  >
                    <option value="all">All Reports</option>
                    <option value="queued">Queued</option>
                    <option value="processing">Processing</option>
                    <option value="completed">Completed</option>
                    <option value="failed">Failed</option>
                  </select>
                </div>
                
                <div className="flex items-end gap-2">
                  <Button variant="ghost" size="sm">
                    <Search className="w-4 h-4 mr-2" />
                    Search
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Advanced Filter
                  </Button>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button 
                  variant="secondary" 
                  size="sm"
                  onClick={() => handleBulkAction('download')}
                  disabled={selectedReports.length === 0}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Bulk Download
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleBulkAction('cancel')}
                  disabled={selectedReports.length === 0}
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Cancel Selected
                </Button>
                <Button variant="ghost" size="sm">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh
                </Button>
              </div>
            </div>
          </Card>

          {/* Report Queue List */}
          <div className="space-y-4">
            {filteredQueue.map((report) => (
              <ReportQueueCard 
                key={report.id} 
                report={report} 
                isExpanded={expandedReport === report.id}
                onToggleExpand={(id) => setExpandedReport(expandedReport === id ? null : id)}
              />
            ))}
          </div>
        </>
      )}

      {activeTab === 'scheduled' && (
        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold" style={{ color: colors.text }}>Scheduled Reports</h3>
            <Button variant="primary">
              <Plus className="w-4 h-4 mr-2" />
              Add Schedule
            </Button>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg"
                 style={{ backgroundColor: colors.bgSecondary }}>
              <div className="flex items-center gap-4">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: colors.success + '20' }}
                >
                  <Clock className="w-5 h-5" style={{ color: colors.success }} />
                </div>
                <div>
                  <h4 className="font-semibold" style={{ color: colors.text }}>Weekly Executive Summary</h4>
                  <p className="text-sm" style={{ color: colors.textSecondary }}>Every Monday at 9:00 AM • PDF Format</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="success">Active</Badge>
                <Button variant="ghost" size="sm">
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 rounded-lg"
                 style={{ backgroundColor: colors.bgSecondary }}>
              <div className="flex items-center gap-4">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: colors.warning + '20' }}
                >
                  <Clock className="w-5 h-5" style={{ color: colors.warning }} />
                </div>
                <div>
                  <h4 className="font-semibold" style={{ color: colors.text }}>Monthly Trend Analysis</h4>
                  <p className="text-sm" style={{ color: colors.textSecondary }}>First day of each month at 8:00 AM • Excel Format</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="warning">Paused</Badge>
                <Button variant="ghost" size="sm">
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg"
                 style={{ backgroundColor: colors.bgSecondary }}>
              <div className="flex items-center gap-4">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: colors.primary + '20' }}
                >
                  <Clock className="w-5 h-5" style={{ color: colors.primary }} />
                </div>
                <div>
                  <h4 className="font-semibold" style={{ color: colors.text }}>Daily Platform Summary</h4>
                  <p className="text-sm" style={{ color: colors.textSecondary }}>Every day at 6:00 AM • CSV Format</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="primary">Active</Badge>
                <Button variant="ghost" size="sm">
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </Card>
      )}

      {activeTab === 'analytics' && (
        <>
          {/* Queue Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4" style={{ color: colors.text }}>Queue Activity (24h)</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={queueAnalytics}>
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
                    <Area type="monotone" dataKey="completed" stackId="1" stroke={colors.success} fill={colors.success} fillOpacity={0.8} />
                    <Area type="monotone" dataKey="processing" stackId="1" stroke={colors.primary} fill={colors.primary} fillOpacity={0.6} />
                    <Area type="monotone" dataKey="queued" stackId="1" stroke={colors.warning} fill={colors.warning} fillOpacity={0.4} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4" style={{ color: colors.text }}>Report Type Distribution</h3>
              <div className="h-64 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={reportTypeDistribution}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {reportTypeDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2">
                {reportTypeDistribution.map((type, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: type.color }}></div>
                      <span style={{ color: colors.text }}>{type.name}</span>
                    </div>
                    <span style={{ color: colors.textSecondary }}>{type.value} reports</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Performance Metrics */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4" style={{ color: colors.text }}>Performance Metrics</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold" style={{ color: colors.primary }}>94.7%</div>
                <div className="text-sm" style={{ color: colors.textSecondary }}>Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold" style={{ color: colors.success }}>4.2 min</div>
                <div className="text-sm" style={{ color: colors.textSecondary }}>Avg Processing Time</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold" style={{ color: colors.warning }}>2.1</div>
                <div className="text-sm" style={{ color: colors.textSecondary }}>Avg Queue Length</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold" style={{ color: colors.secondary }}>156</div>
                <div className="text-sm" style={{ color: colors.textSecondary }}>Reports Today</div>
              </div>
            </div>
          </Card>
        </>
      )}
    </div>
  );
};

export default ReportsPage;

