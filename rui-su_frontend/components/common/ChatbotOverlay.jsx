import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { Brain, X, MessageSquare, Send, Bot, User, Minimize2, Maximize2 } from 'lucide-react';

const ChatbotOverlay = () => {
  const { colors } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: 'Hi! I\'m your Sui-Ru AI assistant. I can help you with:\n\n• Quick system status\n• Reporting guidance\n• Navigation help\n• General questions\n\nHow can I assist you?',
      timestamp: new Date(),
      suggestions: ['System status', 'How to report', 'Need help', 'Contact support']
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (messageText = inputMessage) => {
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

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        type: 'bot',
        content: getQuickBotResponse(messageText),
        timestamp: new Date(),
        suggestions: getQuickSuggestions(messageText)
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, Math.random() * 800 + 1000);
  };

  const getQuickBotResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('system status') || lowerMessage.includes('status')) {
      return `🟢 **System Status: Operational**\n\n• All platforms monitoring: ✅\n• Detection accuracy: 94.7%\n• Response time: <2s\n• Active threats: 23\n\nEverything is running smoothly! Need more details? Visit the full dashboard.`;
    } 
    
    else if (lowerMessage.includes('report') || lowerMessage.includes('how to report')) {
      return `📋 **Quick Reporting Guide:**\n\n1. Click "Report" in navigation\n2. Paste URL or upload screenshot\n3. Select threat type\n4. Submit with description\n\n**Emergency?** Use the emergency button for immediate threats.\n\nNeed step-by-step help?`;
    } 
    
    else if (lowerMessage.includes('help') || lowerMessage.includes('navigation')) {
      return `🧭 **Navigation Help:**\n\n• **Dashboard:** Real-time monitoring\n• **Analytics:** Detailed insights\n• **Reports:** Submit & track reports\n• **Settings:** Customize preferences\n\n**Quick Actions:**\n• Use this chat for instant help\n• Emergency button for urgent issues\n\nWhat specific area do you need help with?`;
    } 
    
    else if (lowerMessage.includes('contact') || lowerMessage.includes('support')) {
      return `📞 **Quick Contact Options:**\n\n**Emergency:** +237-XXX-XXX-XXX\n**Support:** support@sui-ru.cm\n**Response time:** <4 hours\n\n**Or visit our Marketing page for:**\n• Business consultations\n• Custom solutions\n• Expert advice\n\nWhat type of support do you need?`;
    } 
    
    else if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return `👋 **Hello there!**\n\nI'm your quick-access AI assistant. I can help you with:\n\n• System status checks\n• Reporting guidance\n• Navigation help\n• Emergency support\n\nFor detailed conversations, visit the full Chatbot page. What can I help you with right now?`;
    } 
    
    else if (lowerMessage.includes('detection') || lowerMessage.includes('ai')) {
      return `🤖 **AI Detection Quick Info:**\n\n• **Accuracy:** 94.7% overall\n• **Speed:** <2 second analysis\n• **Coverage:** 6 major platforms\n• **Languages:** 15+ supported\n\n**Detects:**\n• Misinformation\n• Hate speech\n• Spam & scams\n• Harassment\n\nWant technical details? Visit the full Chatbot page!`;
    } 
    
    else if (lowerMessage.includes('thank') || lowerMessage.includes('bye')) {
      return `👋 **You're welcome!**\n\nI'm always here in the corner for quick help. For detailed assistance, visit the full Chatbot page.\n\n**Remember:**\n• Emergency button for urgent issues\n• Dashboard for real-time monitoring\n• Reports page for submissions\n\nStay safe and keep monitoring!`;
    } 
    
    else {
      return `🤔 **I can help with:**\n\n• **System status** - Current operational info\n• **Reporting** - How to submit reports\n• **Navigation** - Finding your way around\n• **Support** - Contact information\n\n**For detailed help:** Visit the full Chatbot page\n\nWhat would you like to know?`;
    }
  };

  const getQuickSuggestions = (message) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('status')) {
      return ['View dashboard', 'Check alerts', 'Platform status'];
    } else if (lowerMessage.includes('report')) {
      return ['Emergency report', 'Upload evidence', 'Track reports'];
    } else if (lowerMessage.includes('help')) {
      return ['Dashboard tour', 'Reporting guide', 'Contact support'];
    } else {
      return ['System status', 'How to report', 'Need help', 'Contact support'];
    }
  };

  const handleSuggestionClick = (suggestion) => {
    handleSendMessage(suggestion);
  };

  return (
    <>
      {/* Chatbot Toggle Button */}
      <div className="fixed bottom-6 right-4 sm:right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 group"
          style={{ 
            background: colors.gradientPrimary,
            boxShadow: `0 8px 32px ${colors.primary}40`
          }}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Animated AI Icon */}
            <div className="relative">
              <Brain 
                className={`w-8 h-8 text-white transition-all duration-300 ${
                  isOpen ? 'rotate-180 scale-0' : 'rotate-0 scale-100'
                }`} 
              />
              <X 
                className={`absolute inset-0 w-8 h-8 text-white transition-all duration-300 ${
                  isOpen ? 'rotate-0 scale-100' : 'rotate-180 scale-0'
                }`} 
              />
            </div>
            
            {/* Pulse Animation */}
            <div 
              className="absolute inset-0 rounded-full animate-ping opacity-20"
              style={{ backgroundColor: colors.primary }}
            />
            
            {/* Notification Dot */}
            {!isOpen && (
              <div 
                className="absolute -top-1 -right-1 w-4 h-4 rounded-full animate-pulse"
                style={{ backgroundColor: colors.success }}
              >
                <div className="w-full h-full rounded-full animate-ping" style={{ backgroundColor: colors.success }} />
              </div>
            )}
          </div>
        </button>
      </div>

      {/* Chatbot Window */}
      {isOpen && (
        <div className={`fixed bottom-20 sm:bottom-24 right-4 sm:right-6 left-4 sm:left-auto z-50 w-auto sm:w-80 transition-all duration-300 transform ${
          isMinimized ? 'h-12' : 'h-96'
        }`}>
          <div 
            className="w-full h-full rounded-xl shadow-2xl border backdrop-blur-md overflow-hidden"
            style={{ 
              backgroundColor: colors.bgCard,
              borderColor: colors.border,
              boxShadow: `0 20px 60px ${colors.primary}20`
            }}
          >
            {/* Header */}
            <div 
              className="p-4 border-b cursor-pointer"
              style={{ 
                background: colors.gradientPrimary,
                borderColor: colors.border 
              }}
              onClick={() => setIsMinimized(!isMinimized)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-white bg-opacity-20 flex items-center justify-center mr-3">
                    <Brain className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Quick AI Assistant</h3>
                    <p className="text-xs text-white text-opacity-80">
                      {isTyping ? 'Typing...' : 'Online • Click to expand'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsMinimized(!isMinimized);
                    }}
                    className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-1 transition-colors"
                  >
                    {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsOpen(false);
                    }}
                    className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-1 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages - Only show when not minimized */}
            {!isMinimized && (
              <>
                <div className="flex-1 p-4 overflow-y-auto h-64 space-y-3">
                  {messages.map((message) => (
                    <div key={message.id}>
                      <div className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`flex gap-2 max-w-[85%] ${message.type === 'user' ? 'flex-row-reverse' : ''}`}>
                          <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                               style={{ backgroundColor: message.type === 'user' ? colors.primary + '20' : colors.secondary + '20' }}>
                            {message.type === 'user' ? 
                              <User className="w-3 h-3" style={{ color: colors.primary }} /> :
                              <Bot className="w-3 h-3" style={{ color: colors.secondary }} />
                            }
                          </div>
                          <div
                            className={`px-3 py-2 rounded-lg text-sm ${
                              message.type === 'user' 
                                ? 'rounded-br-none' 
                                : 'rounded-bl-none'
                            }`}
                            style={{
                              backgroundColor: message.type === 'user' ? colors.primary : colors.bgTertiary,
                              color: message.type === 'user' ? '#ffffff' : colors.text
                            }}
                          >
                            <div className="whitespace-pre-line">{message.content}</div>
                            <p className="text-xs mt-1 opacity-70">
                              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Suggestions */}
                      {message.suggestions && message.type === 'bot' && (
                        <div className="flex flex-wrap gap-1 mt-2 ml-8">
                          {message.suggestions.map((suggestion, index) => (
                            <button
                              key={index}
                              onClick={() => handleSuggestionClick(suggestion)}
                              className="text-xs px-2 py-1 rounded border transition-colors hover:bg-opacity-80"
                              style={{ 
                                borderColor: colors.border,
                                backgroundColor: colors.bgSecondary,
                                color: colors.textSecondary
                              }}
                            >
                              {suggestion}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="flex gap-2 max-w-[85%]">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center"
                             style={{ backgroundColor: colors.secondary + '20' }}>
                          <Bot className="w-3 h-3" style={{ color: colors.secondary }} />
                        </div>
                        <div
                          className="px-3 py-2 rounded-lg rounded-bl-none"
                          style={{ backgroundColor: colors.bgTertiary }}
                        >
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

                {/* Input */}
                <div className="p-3 border-t" style={{ borderColor: colors.border }}>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Quick question..."
                      className="flex-1 px-3 py-2 text-sm rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                      style={{
                        backgroundColor: colors.bgSecondary,
                        borderColor: colors.border,
                        color: colors.text
                      }}
                      disabled={isTyping}
                    />
                    <button
                      onClick={() => handleSendMessage()}
                      disabled={!inputMessage.trim() || isTyping}
                      className="px-3 py-2 rounded-lg transition-all duration-200 disabled:opacity-50"
                      style={{ 
                        background: colors.gradientPrimary,
                        color: '#ffffff'
                      }}
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="text-xs mt-2 text-center" style={{ color: colors.textMuted }}>
                    For detailed help, visit the full Chatbot page
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ChatbotOverlay;

