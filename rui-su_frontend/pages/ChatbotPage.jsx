import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { MessageSquare, Brain, Clock, Shield, Send, Bot, User, Mic, Paperclip, MoreVertical, RefreshCw } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';

const ChatbotPage = () => {
  const { colors } = useTheme();
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: 'Hello! I\'m the Sui-Ru AI assistant. I can help you with:\n\n• Content monitoring and analysis\n• Threat detection information\n• Reporting suspicious content\n• System status and updates\n• General platform guidance\n\nHow can I assist you today?',
      timestamp: new Date(),
      suggestions: ['Check system status', 'How to report content', 'Explain AI detection', 'Contact support']
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [conversationId] = useState(`conv_${Date.now()}`);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (messageText = inputMessage) => {
    if (!messageText.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: messageText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate API call delay
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        type: 'bot',
        content: getBotResponse(messageText),
        timestamp: new Date(),
        suggestions: getSuggestions(messageText)
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, Math.random() * 1000 + 1500);
  };

  const getBotResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('system status') || lowerMessage.includes('status')) {
      return `🟢 **System Status: All Operational**\n\n• **Platforms Monitored:** 6 active\n• **Detection Accuracy:** 94.7%\n• **Response Time:** <2 seconds\n• **Uptime:** 99.97%\n• **Active Threats:** 23 currently being processed\n\nAll monitoring systems are functioning normally. Last system check: ${new Date().toLocaleTimeString()}`;
    } 
    
    else if (lowerMessage.includes('report') || lowerMessage.includes('suspicious')) {
      return `📋 **How to Report Suspicious Content:**\n\n**Quick Report:**\n1. Go to the Report page\n2. Paste the content URL or upload screenshot\n3. Select threat type (misinformation, hate speech, etc.)\n4. Add description and submit\n\n**Emergency Reports:**\n• Use the emergency hotline for immediate threats\n• Critical content is prioritized automatically\n\n**What happens next:**\n• AI analysis within 30 seconds\n• Human review for complex cases\n• Action taken within 2-4 hours\n\nWould you like me to guide you through reporting specific content?`;
    } 
    
    else if (lowerMessage.includes('detection') || lowerMessage.includes('ai') || lowerMessage.includes('how it works')) {
      return `🤖 **AI Detection System Overview:**\n\n**Technology Stack:**\n• Natural Language Processing (NLP)\n• Computer Vision for images/videos\n• Pattern recognition algorithms\n• Real-time sentiment analysis\n\n**Detection Capabilities:**\n• **Misinformation:** 96.2% accuracy\n• **Hate Speech:** 94.8% accuracy\n• **Spam/Scams:** 97.1% accuracy\n• **Harassment:** 93.5% accuracy\n\n**Process:**\n1. Content ingestion from platforms\n2. Multi-layer AI analysis\n3. Confidence scoring\n4. Human verification for edge cases\n5. Action recommendation\n\n**Languages Supported:** English, French, Arabic, and 12+ local languages`;
    } 
    
    else if (lowerMessage.includes('contact') || lowerMessage.includes('support') || lowerMessage.includes('help')) {
      return `📞 **Contact & Support Options:**\n\n**Emergency Hotline:**\n• Phone: +237-XXX-XXX-XXX\n• Available 24/7 for critical threats\n\n**Technical Support:**\n• Email: support@sui-ru.cm\n• Response time: <4 hours\n• Live chat: Available 9 AM - 6 PM\n\n**Business Inquiries:**\n• Visit our Marketing page\n• Schedule consultation\n• Custom enterprise solutions\n\n**Community:**\n• User forums\n• Knowledge base\n• Video tutorials\n\nWhat type of support do you need?`;
    } 
    
    else if (lowerMessage.includes('threat') || lowerMessage.includes('alert')) {
      return `⚠️ **Current Threat Landscape:**\n\n**Active Threats (Last 24h):**\n• Misinformation: 45 cases\n• Hate Speech: 32 cases\n• Spam Networks: 15 cases\n• Harassment: 8 cases\n\n**Trending Concerns:**\n• Election-related misinformation ↗️\n• COVID-19 vaccine claims ↗️\n• Economic conspiracy theories ↗️\n\n**Regional Hotspots:**\n• Centre Region: High activity\n• Littoral Region: Medium activity\n• Far North: Elevated monitoring\n\n**Response Actions:**\n• 89% automatically flagged\n• 67% content removed/restricted\n• 23% under investigation\n\nWould you like details on any specific threat type?`;
    } 
    
    else if (lowerMessage.includes('platform') || lowerMessage.includes('facebook') || lowerMessage.includes('twitter') || lowerMessage.includes('instagram')) {
      return `📱 **Platform Monitoring Coverage:**\n\n**Fully Integrated:**\n• Facebook: 125K posts/day\n• WhatsApp: 156K messages/day\n• Instagram: 67K posts/day\n• TikTok: 78K videos/day\n• Twitter/X: 89K tweets/day\n• Reddit: 34K posts/day\n\n**Monitoring Capabilities:**\n• Real-time content scanning\n• User behavior analysis\n• Network effect tracking\n• Cross-platform correlation\n\n**Platform-Specific Features:**\n• Image/video analysis\n• Audio content detection\n• Link verification\n• Account authenticity checks\n\nWhich platform would you like to know more about?`;
    } 
    
    else if (lowerMessage.includes('accuracy') || lowerMessage.includes('performance')) {
      return `📊 **System Performance Metrics:**\n\n**Detection Accuracy:**\n• Overall: 94.7% (↑0.3% this week)\n• False Positives: 4.2% (↓0.1%)\n• False Negatives: 1.1% (↓0.2%)\n\n**Response Times:**\n• Initial Detection: <2 seconds\n• Human Review: <4 hours\n• Action Implementation: <6 hours\n\n**Processing Volume:**\n• 2.48M posts analyzed daily\n• 150+ threats detected hourly\n• 99.97% system uptime\n\n**Quality Assurance:**\n• Continuous model training\n• Regular accuracy audits\n• Community feedback integration\n• Expert validation processes\n\nOur AI models are updated weekly with new threat patterns.`;
    } 
    
    else if (lowerMessage.includes('privacy') || lowerMessage.includes('data') || lowerMessage.includes('security')) {
      return `🔒 **Privacy & Security Measures:**\n\n**Data Protection:**\n• End-to-end encryption\n• GDPR compliant\n• Local data residency\n• Automatic data purging\n\n**Privacy Principles:**\n• Minimal data collection\n• Purpose limitation\n• User consent required\n• Transparent processing\n\n**Security Features:**\n• Multi-factor authentication\n• Regular security audits\n• Incident response team\n• 24/7 monitoring\n\n**User Rights:**\n• Data access requests\n• Correction capabilities\n• Deletion rights\n• Portability options\n\nYour privacy is our top priority. All conversations are encrypted and not stored permanently.`;
    } 
    
    else if (lowerMessage.includes('thank') || lowerMessage.includes('bye') || lowerMessage.includes('goodbye')) {
      return `👋 **Thank you for using Sui-Ru AI Assistant!**\n\nI'm always here to help with:\n• System information\n• Reporting guidance\n• Technical support\n• General questions\n\n**Quick Access:**\n• Emergency: Use the alert button\n• Reports: Visit the Reports page\n• Analytics: Check the Dashboard\n\nStay safe and keep monitoring! Feel free to return anytime you need assistance.`;
    } 
    
    else {
      return `🤔 **I'd be happy to help!**\n\nI can assist you with information about:\n\n• **System Status** - Current operational status\n• **Threat Detection** - How our AI works\n• **Content Reporting** - Step-by-step guidance\n• **Platform Coverage** - Monitored social networks\n• **Support Options** - Contact information\n• **Performance Metrics** - Accuracy and statistics\n\nCould you please be more specific about what you'd like to know? You can also use the suggested questions below to get started.`;
    }
  };

  const getSuggestions = (message) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('status')) {
      return ['View detailed metrics', 'Check platform status', 'Recent alerts', 'System performance'];
    } else if (lowerMessage.includes('report')) {
      return ['Emergency reporting', 'Upload evidence', 'Track my reports', 'Reporting guidelines'];
    } else if (lowerMessage.includes('detection')) {
      return ['Accuracy statistics', 'Supported languages', 'Detection methods', 'False positive rates'];
    } else if (lowerMessage.includes('contact')) {
      return ['Emergency hotline', 'Technical support', 'Business inquiries', 'Community forums'];
    } else {
      return ['System status', 'Report content', 'How AI works', 'Contact support'];
    }
  };

  const handleSuggestionClick = (suggestion) => {
    handleSendMessage(suggestion);
  };

  const clearChat = () => {
    setMessages([{
      id: 1,
      type: 'bot',
      content: 'Chat cleared! How can I help you today?',
      timestamp: new Date(),
      suggestions: ['Check system status', 'How to report content', 'Explain AI detection', 'Contact support']
    }]);
  };

  return (
    <div className="pt-20 min-h-screen" style={{ backgroundColor: colors.bg }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4" style={{ color: colors.text }}>
            Sui-Ru AI Assistant
          </h1>
          <p className="text-xl" style={{ color: colors.textSecondary }}>
            Get instant help with content monitoring, threat detection, and system guidance
          </p>
          <div className="flex items-center justify-center gap-4 mt-4">
            <Badge variant="success">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
              Online
            </Badge>
            <Badge variant="primary">AI Powered</Badge>
            <Badge variant="secondary">24/7 Available</Badge>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <Card className="h-[600px] flex flex-col">
              {/* Chat Header */}
              <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: colors.border }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" 
                       style={{ backgroundColor: colors.primary + '20' }}>
                    <Bot className="w-5 h-5" style={{ color: colors.primary }} />
                  </div>
                  <div>
                    <h3 className="font-semibold" style={{ color: colors.text }}>Sui-Ru Assistant</h3>
                    <p className="text-sm" style={{ color: colors.textSecondary }}>
                      Conversation ID: {conversationId.slice(-8)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" onClick={clearChat}>
                    <RefreshCw className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 p-6 overflow-y-auto space-y-4">
                {messages.map((message) => (
                  <div key={message.id}>
                    <div className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`flex gap-3 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : ''}`}>
                        <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                             style={{ backgroundColor: message.type === 'user' ? colors.primary + '20' : colors.secondary + '20' }}>
                          {message.type === 'user' ? 
                            <User className="w-4 h-4" style={{ color: colors.primary }} /> :
                            <Bot className="w-4 h-4" style={{ color: colors.secondary }} />
                          }
                        </div>
                        <div className={`px-4 py-3 rounded-lg ${message.type === 'user' ? 'rounded-br-none' : 'rounded-bl-none'}`}
                             style={{
                               backgroundColor: message.type === 'user' ? colors.primary : colors.bgTertiary,
                               color: message.type === 'user' ? '#ffffff' : colors.text
                             }}>
                          <div className="whitespace-pre-line text-sm">{message.content}</div>
                          <p className="text-xs mt-2 opacity-70">
                            {message.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Suggestions */}
                    {message.suggestions && message.type === 'bot' && (
                      <div className="flex flex-wrap gap-2 mt-3 ml-11">
                        {message.suggestions.map((suggestion, index) => (
                          <Button
                            key={index}
                            variant="ghost"
                            size="sm"
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="text-xs"
                            style={{ borderColor: colors.border }}
                          >
                            {suggestion}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex gap-3 max-w-[80%]">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center"
                           style={{ backgroundColor: colors.secondary + '20' }}>
                        <Bot className="w-4 h-4" style={{ color: colors.secondary }} />
                      </div>
                      <div className="px-4 py-3 rounded-lg rounded-bl-none"
                           style={{ backgroundColor: colors.bgTertiary }}>
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 border-t" style={{ borderColor: colors.border }}>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Paperclip className="w-4 h-4" />
                  </Button>
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                    placeholder="Type your message... (Press Enter to send)"
                    className="flex-1 px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                    style={{
                      backgroundColor: colors.bgSecondary,
                      borderColor: colors.border,
                      color: colors.text
                    }}
                    disabled={isTyping}
                  />
                  <Button variant="ghost" size="sm">
                    <Mic className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="primary" 
                    onClick={() => handleSendMessage()}
                    disabled={!inputMessage.trim() || isTyping}
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="p-4">
              <h3 className="font-semibold mb-4" style={{ color: colors.text }}>Quick Actions</h3>
              <div className="space-y-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full justify-start"
                  onClick={() => handleSendMessage('What is the current system status?')}
                >
                  <Shield className="w-4 h-4 mr-2" />
                  System Status
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full justify-start"
                  onClick={() => handleSendMessage('How do I report suspicious content?')}
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Report Content
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full justify-start"
                  onClick={() => handleSendMessage('Explain how AI detection works')}
                >
                  <Brain className="w-4 h-4 mr-2" />
                  AI Detection
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full justify-start"
                  onClick={() => handleSendMessage('I need technical support')}
                >
                  <Clock className="w-4 h-4 mr-2" />
                  Get Support
                </Button>
              </div>
            </Card>

            {/* Features */}
            <Card className="p-4">
              <h3 className="font-semibold mb-4" style={{ color: colors.text }}>AI Capabilities</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Brain className="w-5 h-5" style={{ color: colors.primary }} />
                  <div>
                    <div className="text-sm font-medium" style={{ color: colors.text }}>Smart Responses</div>
                    <div className="text-xs" style={{ color: colors.textSecondary }}>Context-aware answers</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5" style={{ color: colors.secondary }} />
                  <div>
                    <div className="text-sm font-medium" style={{ color: colors.text }}>24/7 Available</div>
                    <div className="text-xs" style={{ color: colors.textSecondary }}>Always ready to help</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5" style={{ color: colors.success }} />
                  <div>
                    <div className="text-sm font-medium" style={{ color: colors.text }}>Secure & Private</div>
                    <div className="text-xs" style={{ color: colors.textSecondary }}>Encrypted conversations</div>
                  </div>
                </div>
              </div>
            </Card>

            {/* System Info */}
            <Card className="p-4">
              <h3 className="font-semibold mb-4" style={{ color: colors.text }}>System Info</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span style={{ color: colors.textSecondary }}>Response Time</span>
                  <span style={{ color: colors.success }}>< 2s</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: colors.textSecondary }}>Accuracy</span>
                  <span style={{ color: colors.success }}>94.7%</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: colors.textSecondary }}>Languages</span>
                  <span style={{ color: colors.text }}>15+</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: colors.textSecondary }}>Uptime</span>
                  <span style={{ color: colors.success }}>99.97%</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;

