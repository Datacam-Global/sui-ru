import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { MessageSquare, Brain, Clock, Shield } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const ChatbotPage = () => {
  const { colors } = useTheme();
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: 'Hello! I\'m the Sui-Ru AI assistant. How can I help you today?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        type: 'bot',
        content: getBotResponse(inputMessage),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const getBotResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('help') || lowerMessage.includes('what can you do')) {
      return 'I can help you with information about our monitoring system, explain how to report content, provide system status updates, and answer questions about our AI detection capabilities.';
    } else if (lowerMessage.includes('report')) {
      return 'To report suspicious content, you can use our Report page or provide me with the details here. I can guide you through the reporting process.';
    } else if (lowerMessage.includes('detection') || lowerMessage.includes('ai')) {
      return 'Our AI detection system uses advanced machine learning to identify misinformation and hate speech with over 95% accuracy. It analyzes text, images, and patterns in real-time across multiple platforms.';
    } else if (lowerMessage.includes('contact') || lowerMessage.includes('emergency')) {
      return 'For emergencies, please contact the relevant authorities immediately. For system-related issues, you can reach our support team through the Contact page.';
    } else {
      return 'Thank you for your message. I\'m here to help with any questions about our monitoring system, reporting procedures, or general assistance. What would you like to know more about?';
    }
  };

  return (
    <div className="pt-20 min-h-screen" style={{ backgroundColor: colors.bg }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4" style={{ color: colors.text }}>
            AI Assistant
          </h1>
          <p className="text-xl" style={{ color: colors.textSecondary }}>
            Get instant help and information about our monitoring system
          </p>
        </div>

        <Card className="h-96 flex flex-col">
          <div className="flex-1 p-6 overflow-y-auto space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.type === 'user' 
                      ? 'rounded-br-none' 
                      : 'rounded-bl-none'
                  }`}
                  style={{
                    backgroundColor: message.type === 'user' ? colors.primary : colors.bgTertiary,
                    color: message.type === 'user' ? '#ffffff' : colors.text
                  }}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs mt-1 opacity-70">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div
                  className="max-w-xs lg:max-w-md px-4 py-2 rounded-lg rounded-bl-none"
                  style={{ backgroundColor: colors.bgTertiary }}
                >
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t" style={{ borderColor: colors.border }}>
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{
                  backgroundColor: colors.bgSecondary,
                  borderColor: colors.border,
                  color: colors.text
                }}
              />
              <Button variant="primary" onClick={handleSendMessage}>
                <MessageSquare className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>

        <div className="mt-8 grid md:grid-cols-3 gap-4">
          <Card className="p-4 text-center">
            <Brain className="w-8 h-8 mx-auto mb-2" style={{ color: colors.primary }} />
            <h3 className="font-semibold mb-1" style={{ color: colors.text }}>AI Powered</h3>
            <p className="text-sm" style={{ color: colors.textSecondary }}>
              Advanced natural language processing
            </p>
          </Card>
          <Card className="p-4 text-center">
            <Clock className="w-8 h-8 mx-auto mb-2" style={{ color: colors.secondary }} />
            <h3 className="font-semibold mb-1" style={{ color: colors.text }}>24/7 Available</h3>
            <p className="text-sm" style={{ color: colors.textSecondary }}>
              Get help anytime, day or night
            </p>
          </Card>
          <Card className="p-4 text-center">
            <Shield className="w-8 h-8 mx-auto mb-2" style={{ color: colors.success }} />
            <h3 className="font-semibold mb-1" style={{ color: colors.text }}>Secure</h3>
            <p className="text-sm" style={{ color: colors.textSecondary }}>
              Your conversations are private and secure
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};
export default ChatbotPage;


