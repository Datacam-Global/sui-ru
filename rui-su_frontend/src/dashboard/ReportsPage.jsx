import React, { useState } from 'react';
import Card from '../components/ui/Card';
import { Download, Calendar, Clock, FileText, Settings } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import Button from '../components/ui/Button';



const ReportsPage = () => {
  const { colors } = useTheme();
  const [selectedReport, setSelectedReport] = useState('summary');
  const [dateRange, setDateRange] = useState('7d');
  const [reportFormat, setReportFormat] = useState('pdf');

  const reportTypes = [
    { id: 'summary', name: 'Executive Summary', description: 'High-level overview of threats and system performance' },
    { id: 'detailed', name: 'Detailed Analysis', description: 'Comprehensive breakdown of all detected threats' },
    { id: 'platform', name: 'Platform-specific', description: 'Individual reports for each monitored platform' },
    { id: 'geographic', name: 'Geographic Analysis', description: 'Regional threat distribution and patterns' },
    { id: 'trend', name: 'Trend Analysis', description: 'Historical trends and predictive insights' }
  ];

  const recentReports = [
    { id: 1, name: 'Weekly Threat Summary', type: 'Executive Summary', date: '2024-06-10', status: 'completed', size: '2.4 MB' },
    { id: 2, name: 'Facebook Deep Dive', type: 'Platform Analysis', date: '2024-06-09', status: 'completed', size: '5.7 MB' },
    { id: 3, name: 'Regional Threat Map', type: 'Geographic Analysis', date: '2024-06-08', status: 'completed', size: '3.1 MB' },
    { id: 4, name: 'Monthly Trend Report', type: 'Trend Analysis', date: '2024-06-07', status: 'processing', size: '- MB' },
    { id: 5, name: 'Instagram Content Analysis', type: 'Platform Analysis', date: '2024-06-06', status: 'completed', size: '4.2 MB' }
  ];

  const reportMetrics = [
    { label: 'Total Reports Generated', value: '1,247', change: '+12%', color: colors.primary },
    { label: 'Average Processing Time', value: '3.2 min', change: '-8%', color: colors.success },
    { label: 'Reports Downloaded', value: '892', change: '+24%', color: colors.secondary },
    { label: 'Automated Reports', value: '156', change: '+45%', color: colors.warning }
  ];

  const generateReport = () => {
    // Simulate report generation
    alert(`Generating ${reportTypes.find(r => r.id === selectedReport)?.name} report for ${dateRange} in ${reportFormat.toUpperCase()} format...`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold" style={{ color: colors.text }}>Reports & Analytics</h2>
          <p style={{ color: colors.textSecondary }}>Generate and manage comprehensive threat analysis reports</p>
        </div>
        <Button variant="primary" icon={Download} onClick={generateReport}>
          Generate New Report
        </Button>
      </div>

      {/* Report Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {reportMetrics.map((metric, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium" style={{ color: metric.color }}>{metric.label}</p>
                <p className="text-2xl font-bold mt-1" style={{ color: colors.text }}>{metric.value}</p>
                <p className="text-xs mt-1" style={{ color: metric.color }}>{metric.change} from last period</p>
              </div>
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${metric.color}20` }}
              >
                <FileText className="w-6 h-6" style={{ color: metric.color }} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Report Generation */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-6" style={{ color: colors.text }}>Generate Custom Report</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
            </select>
          </div>
        </div>
      </Card>

      {/* Recent Reports */}
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold" style={{ color: colors.text }}>Recent Reports</h3>
          <Button variant="ghost" icon={Calendar}>View All Reports</Button>
        </div>
        <div className="space-y-4">
          {recentReports.map((report) => (
            <div key={report.id} className="flex items-center justify-between p-4 rounded-lg border"
                 style={{ backgroundColor: colors.bgSecondary, borderColor: colors.border }}>
              <div className="flex items-center gap-4">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: colors.primary + '20' }}
                >
                  <FileText className="w-5 h-5" style={{ color: colors.primary }} />
                </div>
                <div>
                  <h4 className="font-semibold" style={{ color: colors.text }}>{report.name}</h4>
                  <p className="text-sm" style={{ color: colors.textSecondary }}>
                    {report.type} • {report.date} • {report.size}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span 
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    report.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {report.status === 'completed' ? 'Completed' : 'Processing'}
                </span>
                {report.status === 'completed' && (
                  <Button variant="ghost" size="sm" icon={Download}>Download</Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Report Templates */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-6" style={{ color: colors.text }}>Report Templates</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              <p className="text-sm" style={{ color: colors.textSecondary }}>{template.description}</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-xs" style={{ color: colors.textMuted }}>Template</span>
                <Button variant="ghost" size="sm">Use Template</Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Scheduled Reports */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-6" style={{ color: colors.text }}>Scheduled Reports</h3>
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
                <p className="text-sm" style={{ color: colors.textSecondary }}>Every Monday at 9:00 AM</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">Active</span>
              <Button variant="ghost" size="sm" icon={Settings}>Configure</Button>
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
                <p className="text-sm" style={{ color: colors.textSecondary }}>First day of each month at 8:00 AM</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Paused</span>
              <Button variant="ghost" size="sm" icon={Settings}>Configure</Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ReportsPage