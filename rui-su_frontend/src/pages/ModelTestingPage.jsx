import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { Loader2, Send, AlertTriangle, CheckCircle, XCircle, Brain, Clock, Target, Zap } from 'lucide-react';
import { detectHateSpeech } from '../services/apiService';

const ModelTestingPage = () => {
  const { colors } = useTheme();
  const [inputText, setInputText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [error, setError] = useState(null);

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

  const getSeverityColor = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'high': return 'danger';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'default';
    }
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

  return (
    <div className="pt-20 min-h-screen" style={{ backgroundColor: colors.bg }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4" style={{ color: colors.text }}>
            Hate Speech Detection Model Testing
          </h1>
          <p className="text-xl" style={{ color: colors.textSecondary }}>
            Test our AI-powered hate speech detection model with your own text content
          </p>
        </div>

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
            This interface demonstrates our hate speech detection model's capabilities. 
            The model analyzes text content and provides confidence scores, severity levels, 
            and detailed explanations for its classifications.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ModelTestingPage;
