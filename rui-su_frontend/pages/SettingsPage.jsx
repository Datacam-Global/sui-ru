import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { 
  Save, 
  Download, 
  Trash2, 
  Key, 
  Shield, 
  Activity,
  User,
  Bell,
  Globe,
  Database,
  Lock,
  Eye,
  EyeOff,
  Smartphone,
  Mail,
  MessageSquare,
  Palette,
  Monitor,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  Wifi,
  WifiOff,
  RefreshCw,
  Settings,
  Filter,
  BarChart3,
  Clock,
  Calendar,
  MapPin,
  Languages,
  Zap,
  HardDrive,
  Cloud,
  FileText,
  Image,
  Video,
  Mic,
  Camera,
  Headphones,
  Keyboard,
  Mouse,
  Printer,
  Bluetooth,
  Usb,
  Server,
  Network,
  Cpu,
  MemoryStick,
  Battery,
  Power,
  Thermometer,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Info,
  Plus,
  Minus,
  Edit,
  Copy,
  Share,
  ExternalLink,
  Upload,
  Folder,
  Archive,
  Star,
  Heart,
  Flag,
  Tag,
  Search,
  SortAsc,
  SortDesc,
  Grid,
  List,
  MoreVertical,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Sliders
} from 'lucide-react';

const SettingsPage = () => {
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = useState('general');
  const [expandedSections, setExpandedSections] = useState({});
  
  // General Settings
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [theme, setTheme] = useState("dark");
  const [language, setLanguage] = useState("en");
  const [timezone, setTimezone] = useState("Africa/Douala");
  const [dateFormat, setDateFormat] = useState("DD/MM/YYYY");
  const [timeFormat, setTimeFormat] = useState("24h");
  const [autoSave, setAutoSave] = useState(true);
  const [compactMode, setCompactMode] = useState(false);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  // Privacy & Security Settings
  const [dataRetention, setDataRetention] = useState("90_days");
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState("30_minutes");
  const [loginNotifications, setLoginNotifications] = useState(true);
  const [dataSharing, setDataSharing] = useState(false);
  const [analyticsTracking, setAnalyticsTracking] = useState(true);
  const [cookiesEnabled, setCookiesEnabled] = useState(true);
  const [encryptionLevel, setEncryptionLevel] = useState("high");
  
  // Notification Settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [alertSounds, setAlertSounds] = useState(true);
  const [criticalAlerts, setCriticalAlerts] = useState(true);
  const [weeklyReports, setWeeklyReports] = useState(true);
  const [systemUpdates, setSystemUpdates] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);
  
  // AI & Detection Settings
  const [aiSensitivity, setAiSensitivity] = useState("medium");
  const [autoEscalation, setAutoEscalation] = useState(true);
  const [realTimeScanning, setRealTimeScanning] = useState(true);
  const [batchProcessing, setBatchProcessing] = useState(false);
  const [confidenceThreshold, setConfidenceThreshold] = useState(85);
  const [languageDetection, setLanguageDetection] = useState(true);
  const [imageAnalysis, setImageAnalysis] = useState(true);
  const [videoAnalysis, setVideoAnalysis] = useState(false);
  const [audioAnalysis, setAudioAnalysis] = useState(false);
  
  // Performance Settings
  const [cacheEnabled, setCacheEnabled] = useState(true);
  const [compressionEnabled, setCompressionEnabled] = useState(true);
  const [lazyLoading, setLazyLoading] = useState(true);
  const [backgroundSync, setBackgroundSync] = useState(true);
  const [offlineMode, setOfflineMode] = useState(false);
  const [maxConcurrentTasks, setMaxConcurrentTasks] = useState(5);
  const [memoryLimit, setMemoryLimit] = useState("2GB");
  const [networkOptimization, setNetworkOptimization] = useState(true);

  const settingsTabs = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'account', label: 'Account', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'ai', label: 'AI & Detection', icon: Zap },
    { id: 'performance', label: 'Performance', icon: Cpu },
    { id: 'privacy', label: 'Privacy', icon: Lock },
    { id: 'integrations', label: 'Integrations', icon: Network },
    { id: 'advanced', label: 'Advanced', icon: Sliders }
  ];

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const handleSaveSettings = () => {
    alert("Settings saved successfully!");
  };

  const handleResetSettings = () => {
    if (confirm("Are you sure you want to reset all settings to default?")) {
      alert("Settings reset to default values!");
    }
  };

  const handleExportSettings = () => {
    alert("Settings exported successfully!");
  };

  const handleImportSettings = () => {
    alert("Settings import functionality would open file picker here");
  };

  const SettingSection = ({ title, children, collapsible = false, defaultExpanded = true }) => {
    const [isExpanded, setIsExpanded] = useState(defaultExpanded);
    
    return (
      <div className="mb-6">
        <div 
          className={`flex items-center justify-between mb-4 ${collapsible ? 'cursor-pointer' : ''}`}
          onClick={() => collapsible && setIsExpanded(!isExpanded)}
        >
          <h4 className="text-lg font-semibold" style={{ color: colors.text }}>{title}</h4>
          {collapsible && (
            <Button variant="ghost" size="sm">
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </Button>
          )}
        </div>
        {(!collapsible || isExpanded) && (
          <div className="space-y-4">
            {children}
          </div>
        )}
      </div>
    );
  };

  const ToggleSetting = ({ label, description, value, onChange, icon: Icon }) => (
    <div className="flex items-center justify-between p-4 rounded-lg" style={{ backgroundColor: colors.bgSecondary }}>
      <div className="flex items-center gap-3">
        {Icon && (
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: colors.primary + '20' }}>
            <Icon className="w-4 h-4" style={{ color: colors.primary }} />
          </div>
        )}
        <div>
          <div className="font-medium" style={{ color: colors.text }}>{label}</div>
          {description && <div className="text-sm" style={{ color: colors.textSecondary }}>{description}</div>}
        </div>
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only peer"
        />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
      </label>
    </div>
  );

  const SelectSetting = ({ label, description, value, onChange, options, icon: Icon }) => (
    <div className="p-4 rounded-lg" style={{ backgroundColor: colors.bgSecondary }}>
      <div className="flex items-center gap-3 mb-2">
        {Icon && (
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: colors.primary + '20' }}>
            <Icon className="w-4 h-4" style={{ color: colors.primary }} />
          </div>
        )}
        <div>
          <label className="font-medium" style={{ color: colors.text }}>{label}</label>
          {description && <div className="text-sm" style={{ color: colors.textSecondary }}>{description}</div>}
        </div>
      </div>
      <select 
        value={value} 
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2 rounded-lg border"
        style={{ 
          backgroundColor: colors.bgCard, 
          borderColor: colors.border,
          color: colors.text 
        }}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  );

  const SliderSetting = ({ label, description, value, onChange, min, max, step = 1, unit = '', icon: Icon }) => (
    <div className="p-4 rounded-lg" style={{ backgroundColor: colors.bgSecondary }}>
      <div className="flex items-center gap-3 mb-2">
        {Icon && (
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: colors.primary + '20' }}>
            <Icon className="w-4 h-4" style={{ color: colors.primary }} />
          </div>
        )}
        <div className="flex-1">
          <label className="font-medium" style={{ color: colors.text }}>{label}</label>
          {description && <div className="text-sm" style={{ color: colors.textSecondary }}>{description}</div>}
        </div>
        <div className="text-lg font-semibold" style={{ color: colors.primary }}>
          {value}{unit}
        </div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
        style={{ accentColor: colors.primary }}
      />
      <div className="flex justify-between text-xs mt-1" style={{ color: colors.textMuted }}>
        <span>{min}{unit}</span>
        <span>{max}{unit}</span>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold" style={{ color: colors.text }}>Advanced Settings</h2>
          <p style={{ color: colors.textSecondary }}>Comprehensive system configuration and preferences management</p>
          <div className="flex items-center gap-4 mt-2">
            <Badge variant="primary">9 Categories</Badge>
            <Badge variant="secondary">Auto-save enabled</Badge>
            <Badge variant="success">All systems operational</Badge>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="ghost" onClick={handleImportSettings}>
            <Upload className="w-4 h-4 mr-2" />
            Import
          </Button>
          <Button variant="ghost" onClick={handleExportSettings}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="secondary" onClick={handleResetSettings}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          <Button variant="primary" onClick={handleSaveSettings}>
            <Save className="w-4 h-4 mr-2" />
            Save All
          </Button>
        </div>
      </div>

      {/* Settings Navigation */}
      <Card className="p-1">
        <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-1">
          {settingsTabs.map(tab => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? 'primary' : 'ghost'}
              onClick={() => setActiveTab(tab.id)}
              className="flex-col h-16 text-xs"
            >
              <tab.icon className="w-5 h-5 mb-1" />
              {tab.label}
            </Button>
          ))}
        </div>
      </Card>

      {/* Settings Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {activeTab === 'general' && (
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-6" style={{ color: colors.text }}>General Settings</h3>
              
              <SettingSection title="Appearance & Theme">
                <SelectSetting
                  label="Theme"
                  description="Choose your preferred color scheme"
                  value={theme}
                  onChange={setTheme}
                  icon={theme === 'dark' ? Moon : Sun}
                  options={[
                    { value: 'dark', label: 'Dark Theme' },
                    { value: 'light', label: 'Light Theme' },
                    { value: 'auto', label: 'Auto (System)' },
                    { value: 'custom', label: 'Custom Theme' }
                  ]}
                />
                <ToggleSetting
                  label="Compact Mode"
                  description="Reduce spacing and padding for more content"
                  value={compactMode}
                  onChange={setCompactMode}
                  icon={Grid}
                />
                <ToggleSetting
                  label="Animations"
                  description="Enable smooth transitions and animations"
                  value={animationsEnabled}
                  onChange={setAnimationsEnabled}
                  icon={Zap}
                />
              </SettingSection>

              <SettingSection title="Language & Region">
                <SelectSetting
                  label="Language"
                  description="Select your preferred language"
                  value={language}
                  onChange={setLanguage}
                  icon={Languages}
                  options={[
                    { value: 'en', label: 'English' },
                    { value: 'fr', label: 'Français' },
                    { value: 'es', label: 'Español' },
                    { value: 'de', label: 'Deutsch' },
                    { value: 'pt', label: 'Português' },
                    { value: 'ar', label: 'العربية' }
                  ]}
                />
                <SelectSetting
                  label="Timezone"
                  description="Your local timezone for accurate timestamps"
                  value={timezone}
                  onChange={setTimezone}
                  icon={Globe}
                  options={[
                    { value: 'Africa/Douala', label: 'Africa/Douala (WAT)' },
                    { value: 'Africa/Lagos', label: 'Africa/Lagos (WAT)' },
                    { value: 'Europe/London', label: 'Europe/London (GMT)' },
                    { value: 'Europe/Paris', label: 'Europe/Paris (CET)' },
                    { value: 'America/New_York', label: 'America/New_York (EST)' },
                    { value: 'Asia/Tokyo', label: 'Asia/Tokyo (JST)' }
                  ]}
                />
                <SelectSetting
                  label="Date Format"
                  description="How dates are displayed throughout the system"
                  value={dateFormat}
                  onChange={setDateFormat}
                  icon={Calendar}
                  options={[
                    { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY' },
                    { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY' },
                    { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD' },
                    { value: 'DD MMM YYYY', label: 'DD MMM YYYY' }
                  ]}
                />
                <SelectSetting
                  label="Time Format"
                  description="12-hour or 24-hour time display"
                  value={timeFormat}
                  onChange={setTimeFormat}
                  icon={Clock}
                  options={[
                    { value: '24h', label: '24-hour (14:30)' },
                    { value: '12h', label: '12-hour (2:30 PM)' }
                  ]}
                />
              </SettingSection>

              <SettingSection title="System Behavior">
                <ToggleSetting
                  label="Auto-save"
                  description="Automatically save changes as you make them"
                  value={autoSave}
                  onChange={setAutoSave}
                  icon={Save}
                />
                <ToggleSetting
                  label="Sound Effects"
                  description="Play sounds for notifications and interactions"
                  value={soundEnabled}
                  onChange={setSoundEnabled}
                  icon={soundEnabled ? Volume2 : VolumeX}
                />
              </SettingSection>
            </Card>
          )}

          {activeTab === 'account' && (
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-6" style={{ color: colors.text }}>Account Settings</h3>
              
              <SettingSection title="Profile Information">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>Full Name</label>
                    <input
                      type="text"
                      defaultValue="John Doe"
                      className="w-full px-4 py-2 rounded-lg border"
                      style={{ 
                        backgroundColor: colors.bgCard, 
                        borderColor: colors.border,
                        color: colors.text 
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>Email Address</label>
                    <input
                      type="email"
                      defaultValue="john.doe@example.com"
                      className="w-full px-4 py-2 rounded-lg border"
                      style={{ 
                        backgroundColor: colors.bgCard, 
                        borderColor: colors.border,
                        color: colors.text 
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>Phone Number</label>
                    <input
                      type="tel"
                      defaultValue="+237 XXX XXX XXX"
                      className="w-full px-4 py-2 rounded-lg border"
                      style={{ 
                        backgroundColor: colors.bgCard, 
                        borderColor: colors.border,
                        color: colors.text 
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>Organization</label>
                    <input
                      type="text"
                      defaultValue="Sui-Ru MHSMS"
                      className="w-full px-4 py-2 rounded-lg border"
                      style={{ 
                        backgroundColor: colors.bgCard, 
                        borderColor: colors.border,
                        color: colors.text 
                      }}
                    />
                  </div>
                </div>
              </SettingSection>

              <SettingSection title="Account Actions">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="secondary" className="justify-start">
                    <Key className="w-4 h-4 mr-2" />
                    Change Password
                  </Button>
                  <Button variant="secondary" className="justify-start">
                    <Download className="w-4 h-4 mr-2" />
                    Export Account Data
                  </Button>
                  <Button variant="secondary" className="justify-start">
                    <Archive className="w-4 h-4 mr-2" />
                    Archive Account
                  </Button>
                  <Button variant="danger" className="justify-start">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Account
                  </Button>
                </div>
              </SettingSection>
            </Card>
          )}

          {activeTab === 'security' && (
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-6" style={{ color: colors.text }}>Security Settings</h3>
              
              <SettingSection title="Authentication">
                <ToggleSetting
                  label="Two-Factor Authentication"
                  description="Add an extra layer of security to your account"
                  value={twoFactorEnabled}
                  onChange={setTwoFactorEnabled}
                  icon={Shield}
                />
                <SelectSetting
                  label="Session Timeout"
                  description="Automatically log out after inactivity"
                  value={sessionTimeout}
                  onChange={setSessionTimeout}
                  icon={Clock}
                  options={[
                    { value: '15_minutes', label: '15 minutes' },
                    { value: '30_minutes', label: '30 minutes' },
                    { value: '1_hour', label: '1 hour' },
                    { value: '4_hours', label: '4 hours' },
                    { value: 'never', label: 'Never' }
                  ]}
                />
                <ToggleSetting
                  label="Login Notifications"
                  description="Get notified when someone logs into your account"
                  value={loginNotifications}
                  onChange={setLoginNotifications}
                  icon={Bell}
                />
              </SettingSection>

              <SettingSection title="Data Protection">
                <SelectSetting
                  label="Encryption Level"
                  description="Level of encryption for your data"
                  value={encryptionLevel}
                  onChange={setEncryptionLevel}
                  icon={Lock}
                  options={[
                    { value: 'standard', label: 'Standard (AES-128)' },
                    { value: 'high', label: 'High (AES-256)' },
                    { value: 'maximum', label: 'Maximum (AES-256 + RSA)' }
                  ]}
                />
                <SelectSetting
                  label="Data Retention"
                  description="How long to keep your data"
                  value={dataRetention}
                  onChange={setDataRetention}
                  icon={Database}
                  options={[
                    { value: '30_days', label: '30 Days' },
                    { value: '90_days', label: '90 Days' },
                    { value: '1_year', label: '1 Year' },
                    { value: '3_years', label: '3 Years' },
                    { value: 'indefinite', label: 'Indefinite' }
                  ]}
                />
              </SettingSection>

              <SettingSection title="Security Actions">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="secondary" className="justify-start">
                    <Activity className="w-4 h-4 mr-2" />
                    View Login Activity
                  </Button>
                  <Button variant="secondary" className="justify-start">
                    <Smartphone className="w-4 h-4 mr-2" />
                    Manage Devices
                  </Button>
                  <Button variant="secondary" className="justify-start">
                    <Key className="w-4 h-4 mr-2" />
                    API Keys
                  </Button>
                  <Button variant="secondary" className="justify-start">
                    <Shield className="w-4 h-4 mr-2" />
                    Security Audit
                  </Button>
                </div>
              </SettingSection>
            </Card>
          )}

          {activeTab === 'notifications' && (
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-6" style={{ color: colors.text }}>Notification Settings</h3>
              
              <SettingSection title="Delivery Methods">
                <ToggleSetting
                  label="Email Notifications"
                  description="Receive notifications via email"
                  value={emailNotifications}
                  onChange={setEmailNotifications}
                  icon={Mail}
                />
                <ToggleSetting
                  label="Push Notifications"
                  description="Browser and mobile push notifications"
                  value={pushNotifications}
                  onChange={setPushNotifications}
                  icon={Bell}
                />
                <ToggleSetting
                  label="SMS Notifications"
                  description="Text message notifications for critical alerts"
                  value={smsNotifications}
                  onChange={setSmsNotifications}
                  icon={MessageSquare}
                />
                <ToggleSetting
                  label="Alert Sounds"
                  description="Play sounds for important notifications"
                  value={alertSounds}
                  onChange={setAlertSounds}
                  icon={Volume2}
                />
              </SettingSection>

              <SettingSection title="Notification Types">
                <ToggleSetting
                  label="Critical Security Alerts"
                  description="High-priority security threats and breaches"
                  value={criticalAlerts}
                  onChange={setCriticalAlerts}
                  icon={AlertTriangle}
                />
                <ToggleSetting
                  label="Weekly Reports"
                  description="Summary reports delivered weekly"
                  value={weeklyReports}
                  onChange={setWeeklyReports}
                  icon={FileText}
                />
                <ToggleSetting
                  label="System Updates"
                  description="Notifications about system maintenance and updates"
                  value={systemUpdates}
                  onChange={setSystemUpdates}
                  icon={RefreshCw}
                />
                <ToggleSetting
                  label="Marketing Communications"
                  description="Product updates and promotional content"
                  value={marketingEmails}
                  onChange={setMarketingEmails}
                  icon={Star}
                />
              </SettingSection>
            </Card>
          )}

          {activeTab === 'ai' && (
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-6" style={{ color: colors.text }}>AI & Detection Settings</h3>
              
              <SettingSection title="Detection Configuration">
                <SelectSetting
                  label="AI Sensitivity"
                  description="How sensitive the AI should be to potential threats"
                  value={aiSensitivity}
                  onChange={setAiSensitivity}
                  icon={Zap}
                  options={[
                    { value: 'low', label: 'Low - Fewer false positives' },
                    { value: 'medium', label: 'Medium - Balanced approach' },
                    { value: 'high', label: 'High - Maximum detection' },
                    { value: 'custom', label: 'Custom - Manual configuration' }
                  ]}
                />
                <SliderSetting
                  label="Confidence Threshold"
                  description="Minimum confidence level for threat detection"
                  value={confidenceThreshold}
                  onChange={setConfidenceThreshold}
                  min={50}
                  max={99}
                  unit="%"
                  icon={Target}
                />
                <ToggleSetting
                  label="Auto-escalation"
                  description="Automatically escalate high-confidence threats"
                  value={autoEscalation}
                  onChange={setAutoEscalation}
                  icon={TrendingUp}
                />
              </SettingSection>

              <SettingSection title="Processing Options">
                <ToggleSetting
                  label="Real-time Scanning"
                  description="Scan content as it's posted (higher resource usage)"
                  value={realTimeScanning}
                  onChange={setRealTimeScanning}
                  icon={Activity}
                />
                <ToggleSetting
                  label="Batch Processing"
                  description="Process content in batches (lower resource usage)"
                  value={batchProcessing}
                  onChange={setBatchProcessing}
                  icon={Database}
                />
                <ToggleSetting
                  label="Language Detection"
                  description="Automatically detect content language"
                  value={languageDetection}
                  onChange={setLanguageDetection}
                  icon={Languages}
                />
              </SettingSection>

              <SettingSection title="Media Analysis">
                <ToggleSetting
                  label="Image Analysis"
                  description="Analyze images for harmful content"
                  value={imageAnalysis}
                  onChange={setImageAnalysis}
                  icon={Image}
                />
                <ToggleSetting
                  label="Video Analysis"
                  description="Analyze video content (requires additional resources)"
                  value={videoAnalysis}
                  onChange={setVideoAnalysis}
                  icon={Video}
                />
                <ToggleSetting
                  label="Audio Analysis"
                  description="Analyze audio content for threats"
                  value={audioAnalysis}
                  onChange={setAudioAnalysis}
                  icon={Mic}
                />
              </SettingSection>
            </Card>
          )}

          {activeTab === 'performance' && (
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-6" style={{ color: colors.text }}>Performance Settings</h3>
              
              <SettingSection title="System Optimization">
                <ToggleSetting
                  label="Cache Enabled"
                  description="Cache frequently accessed data for faster loading"
                  value={cacheEnabled}
                  onChange={setCacheEnabled}
                  icon={HardDrive}
                />
                <ToggleSetting
                  label="Compression"
                  description="Compress data to reduce bandwidth usage"
                  value={compressionEnabled}
                  onChange={setCompressionEnabled}
                  icon={Archive}
                />
                <ToggleSetting
                  label="Lazy Loading"
                  description="Load content as needed to improve initial load times"
                  value={lazyLoading}
                  onChange={setLazyLoading}
                  icon={Zap}
                />
                <ToggleSetting
                  label="Background Sync"
                  description="Sync data in the background for better responsiveness"
                  value={backgroundSync}
                  onChange={setBackgroundSync}
                  icon={RefreshCw}
                />
              </SettingSection>

              <SettingSection title="Resource Limits">
                <SliderSetting
                  label="Max Concurrent Tasks"
                  description="Maximum number of simultaneous processing tasks"
                  value={maxConcurrentTasks}
                  onChange={setMaxConcurrentTasks}
                  min={1}
                  max={20}
                  icon={Cpu}
                />
                <SelectSetting
                  label="Memory Limit"
                  description="Maximum memory usage for processing"
                  value={memoryLimit}
                  onChange={setMemoryLimit}
                  icon={MemoryStick}
                  options={[
                    { value: '1GB', label: '1 GB' },
                    { value: '2GB', label: '2 GB' },
                    { value: '4GB', label: '4 GB' },
                    { value: '8GB', label: '8 GB' },
                    { value: 'unlimited', label: 'Unlimited' }
                  ]}
                />
                <ToggleSetting
                  label="Network Optimization"
                  description="Optimize network requests for better performance"
                  value={networkOptimization}
                  onChange={setNetworkOptimization}
                  icon={Network}
                />
              </SettingSection>

              <SettingSection title="Offline Capabilities">
                <ToggleSetting
                  label="Offline Mode"
                  description="Enable limited functionality when offline"
                  value={offlineMode}
                  onChange={setOfflineMode}
                  icon={WifiOff}
                />
              </SettingSection>
            </Card>
          )}

          {activeTab === 'privacy' && (
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-6" style={{ color: colors.text }}>Privacy Settings</h3>
              
              <SettingSection title="Data Sharing">
                <ToggleSetting
                  label="Analytics Tracking"
                  description="Allow anonymous usage analytics to improve the service"
                  value={analyticsTracking}
                  onChange={setAnalyticsTracking}
                  icon={BarChart3}
                />
                <ToggleSetting
                  label="Data Sharing with Partners"
                  description="Share anonymized data with trusted partners"
                  value={dataSharing}
                  onChange={setDataSharing}
                  icon={Share}
                />
                <ToggleSetting
                  label="Cookies"
                  description="Allow cookies for enhanced functionality"
                  value={cookiesEnabled}
                  onChange={setCookiesEnabled}
                  icon={Database}
                />
              </SettingSection>

              <SettingSection title="Data Management">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="secondary" className="justify-start">
                    <Download className="w-4 h-4 mr-2" />
                    Download My Data
                  </Button>
                  <Button variant="secondary" className="justify-start">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete My Data
                  </Button>
                  <Button variant="secondary" className="justify-start">
                    <Eye className="w-4 h-4 mr-2" />
                    View Data Usage
                  </Button>
                  <Button variant="secondary" className="justify-start">
                    <Flag className="w-4 h-4 mr-2" />
                    Privacy Report
                  </Button>
                </div>
              </SettingSection>
            </Card>
          )}

          {activeTab === 'integrations' && (
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-6" style={{ color: colors.text }}>Integrations</h3>
              
              <SettingSection title="Social Media Platforms">
                <div className="space-y-4">
                  {[
                    { name: 'Facebook', status: 'connected', icon: '📘' },
                    { name: 'Twitter', status: 'connected', icon: '🐦' },
                    { name: 'Instagram', status: 'disconnected', icon: '📷' },
                    { name: 'TikTok', status: 'connected', icon: '🎵' },
                    { name: 'WhatsApp', status: 'pending', icon: '💬' },
                    { name: 'Reddit', status: 'disconnected', icon: '🤖' }
                  ].map((platform, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg" style={{ backgroundColor: colors.bgSecondary }}>
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{platform.icon}</span>
                        <div>
                          <div className="font-medium" style={{ color: colors.text }}>{platform.name}</div>
                          <div className="text-sm" style={{ color: colors.textSecondary }}>
                            Status: <Badge variant={platform.status === 'connected' ? 'success' : platform.status === 'pending' ? 'warning' : 'default'}>
                              {platform.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <Button variant={platform.status === 'connected' ? 'danger' : 'primary'} size="sm">
                        {platform.status === 'connected' ? 'Disconnect' : 'Connect'}
                      </Button>
                    </div>
                  ))}
                </div>
              </SettingSection>

              <SettingSection title="Third-party Services">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="secondary" className="justify-start">
                    <Cloud className="w-4 h-4 mr-2" />
                    Cloud Storage
                  </Button>
                  <Button variant="secondary" className="justify-start">
                    <Mail className="w-4 h-4 mr-2" />
                    Email Services
                  </Button>
                  <Button variant="secondary" className="justify-start">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Messaging APIs
                  </Button>
                  <Button variant="secondary" className="justify-start">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Analytics Tools
                  </Button>
                </div>
              </SettingSection>
            </Card>
          )}

          {activeTab === 'advanced' && (
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-6" style={{ color: colors.text }}>Advanced Settings</h3>
              
              <SettingSection title="Developer Options">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="secondary" className="justify-start">
                    <Key className="w-4 h-4 mr-2" />
                    API Keys
                  </Button>
                  <Button variant="secondary" className="justify-start">
                    <FileText className="w-4 h-4 mr-2" />
                    Webhooks
                  </Button>
                  <Button variant="secondary" className="justify-start">
                    <Database className="w-4 h-4 mr-2" />
                    Database Access
                  </Button>
                  <Button variant="secondary" className="justify-start">
                    <Server className="w-4 h-4 mr-2" />
                    Server Logs
                  </Button>
                </div>
              </SettingSection>

              <SettingSection title="System Maintenance">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="secondary" className="justify-start">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Clear Cache
                  </Button>
                  <Button variant="secondary" className="justify-start">
                    <Database className="w-4 h-4 mr-2" />
                    Rebuild Index
                  </Button>
                  <Button variant="secondary" className="justify-start">
                    <Archive className="w-4 h-4 mr-2" />
                    Archive Old Data
                  </Button>
                  <Button variant="danger" className="justify-start">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Factory Reset
                  </Button>
                </div>
              </SettingSection>

              <SettingSection title="Experimental Features">
                <div className="p-4 rounded-lg" style={{ backgroundColor: colors.warning + '20' }}>
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-5 h-5" style={{ color: colors.warning }} />
                    <span className="font-medium" style={{ color: colors.warning }}>Experimental Features</span>
                  </div>
                  <p className="text-sm mb-4" style={{ color: colors.textSecondary }}>
                    These features are in beta and may not work as expected. Use with caution.
                  </p>
                  <div className="space-y-3">
                    <ToggleSetting
                      label="AI-powered Auto-responses"
                      description="Automatically respond to detected threats"
                      value={false}
                      onChange={() => {}}
                      icon={Zap}
                    />
                    <ToggleSetting
                      label="Predictive Analytics"
                      description="Predict future threats based on patterns"
                      value={false}
                      onChange={() => {}}
                      icon={TrendingUp}
                    />
                    <ToggleSetting
                      label="Advanced ML Models"
                      description="Use experimental machine learning models"
                      value={false}
                      onChange={() => {}}
                      icon={Cpu}
                    />
                  </div>
                </div>
              </SettingSection>
            </Card>
          )}
        </div>

        {/* Settings Summary Sidebar */}
        <div className="space-y-6">
          <Card className="p-6">
            <h4 className="text-lg font-semibold mb-4" style={{ color: colors.text }}>Quick Actions</h4>
            <div className="space-y-3">
              <Button variant="primary" className="w-full justify-start">
                <Save className="w-4 h-4 mr-2" />
                Save All Settings
              </Button>
              <Button variant="secondary" className="w-full justify-start">
                <Download className="w-4 h-4 mr-2" />
                Export Configuration
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset to Defaults
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <h4 className="text-lg font-semibold mb-4" style={{ color: colors.text }}>System Status</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm" style={{ color: colors.textSecondary }}>AI Detection</span>
                <Badge variant="success">Active</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm" style={{ color: colors.textSecondary }}>Real-time Monitoring</span>
                <Badge variant="success">Online</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm" style={{ color: colors.textSecondary }}>Data Sync</span>
                <Badge variant="primary">Syncing</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm" style={{ color: colors.textSecondary }}>Security Level</span>
                <Badge variant="warning">High</Badge>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h4 className="text-lg font-semibold mb-4" style={{ color: colors.text }}>Recent Changes</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" style={{ color: colors.success }} />
                <span style={{ color: colors.textSecondary }}>Theme updated to Dark</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" style={{ color: colors.success }} />
                <span style={{ color: colors.textSecondary }}>2FA enabled</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" style={{ color: colors.success }} />
                <span style={{ color: colors.textSecondary }}>Notifications configured</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;

