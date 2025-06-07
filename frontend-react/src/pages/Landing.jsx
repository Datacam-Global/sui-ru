import { Box, Button, Container, Grid, Typography, useTheme, Card, CardContent, Avatar, Chip, Divider, Paper, IconButton, Stack, useMediaQuery, Tabs, Tab, TextField, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SecurityIcon from '@mui/icons-material/Security';
import GavelIcon from '@mui/icons-material/Gavel';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import LanguageIcon from '@mui/icons-material/Language';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import WarningIcon from '@mui/icons-material/Warning';
import PublicIcon from '@mui/icons-material/Public';
import FlagIcon from '@mui/icons-material/Flag';
import TranslateIcon from '@mui/icons-material/Translate';
import GroupsIcon from '@mui/icons-material/Groups';
import SchoolIcon from '@mui/icons-material/School';
import ChatIcon from '@mui/icons-material/Chat';
import ReportIcon from '@mui/icons-material/Report';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import SpeedIcon from '@mui/icons-material/Speed';
import EventNoteIcon from '@mui/icons-material/EventNote';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useState, useEffect } from 'react';
import { alpha, keyframes } from '@mui/material/styles';
import React from 'react';
import CameroonMap, { cameroonRegions } from '../../src/components/CameroonMap';

// Custom animations
const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Modern color palette
const modernColors = {
  primary: {
    main: '#2563EB',
    light: '#60A5FA',
    dark: '#1E40AF',
  },
  secondary: {
    main: '#7C3AED',
    light: '#A78BFA',
    dark: '#5B21B6',
  },
  success: {
    main: '#059669',
    light: '#34D399',
    dark: '#065F46',
  },
  error: {
    main: '#DC2626',
    light: '#F87171',
    dark: '#991B1B',
  },
  background: {
    default: '#F8FAFC',
    paper: '#FFFFFF',
    gradient: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
  },
};

// Data constants
const trendData = [
  { date: 'Jan', cases: 120 },
  { date: 'Feb', cases: 150 },
  { date: 'Mar', cases: 180 },
  { date: 'Apr', cases: 160 },
  { date: 'May', cases: 200 },
  { date: 'Jun', cases: 250 },
];

const trendingTopics = [
  { topic: 'Political News', count: 1250, trend: 'up', severity: 'high' },
  { topic: 'Health Updates', count: 980, trend: 'down', severity: 'medium' },
  { topic: 'Education', count: 750, trend: 'up', severity: 'low' },
  { topic: 'Economic News', count: 620, trend: 'up', severity: 'medium' },
];

const regionalInsights = [
  { region: 'Yaoundé', cases: 450, resolved: 400, active: 50 },
  { region: 'Douala', cases: 380, resolved: 350, active: 30 },
  { region: 'Bamenda', cases: 320, resolved: 280, active: 40 },
  { region: 'Buea', cases: 290, resolved: 250, active: 40 },
];

// Cultural facts data
const culturalFacts = [
  {
    icon: <LanguageIcon />,
    title: 'Official Languages',
    description: 'English and French are the official languages, reflecting Cameroon\'s unique bilingual heritage',
    color: '#2563EB',
  },
  {
    icon: <GroupsIcon />,
    title: 'Cultural Diversity',
    description: 'Home to over 250 ethnic groups, making it one of Africa\'s most culturally diverse nations',
    color: '#7C3AED',
  },
  {
    icon: <TrendingUpIcon />,
    title: 'Digital Growth',
    description: 'Rapid digital adoption with over 40% internet penetration and growing social media usage',
    color: '#059669',
  },
];

// Language distribution data
const languageData = [
  { name: 'French', value: 60, color: '#2563EB' },
  { name: 'English', value: 20, color: '#7C3AED' },
  { name: 'Local Languages', value: 20, color: '#059669' },
];

// Update testimonials data with more Cameroon-specific content
const testimonials = [
  {
    name: 'Dr. Marie Nkolo',
    role: 'Digital Rights Activist, Yaoundé',
    avatar: '/avatars/activist.jpg',
    quote: 'Sui-Ru is transforming how we combat misinformation in Cameroon. Its AI-powered approach in both English and French makes it uniquely valuable for our bilingual society.',
    region: 'Centre',
    languages: ['French', 'English'],
    color: '#7C3AED', // Purple for Centre region
  },
  {
    name: 'Prof. Jean Kamga',
    role: 'Media Studies Expert, Douala',
    avatar: '/avatars/expert.jpg',
    quote: 'The platform\'s ability to analyze content across our diverse cultural landscape, from the coastal regions to the northern areas, makes it an essential tool for Cameroon\'s digital future.',
    region: 'Littoral',
    languages: ['French', 'Duala'],
    color: '#8B5CF6', // Purple for Littoral region
  },
  {
    name: 'Sarah Mbah',
    role: 'Youth Leader, Bamenda',
    avatar: '/avatars/youth.jpg',
    quote: 'As a young Cameroonian from the Northwest, I appreciate how Sui-Ru helps us navigate the digital space while respecting our cultural diversity and linguistic heritage.',
    region: 'North-West',
    languages: ['English', 'Pidgin'],
    color: '#059669', // Green for North-West region
  },
  {
    name: 'Chief Oumarou',
    role: 'Community Leader, Maroua',
    avatar: '/avatars/chief.jpg',
    quote: 'In the Far North, where digital literacy is growing, Sui-Ru helps bridge the gap between traditional knowledge and modern technology, protecting our communities from misinformation.',
    region: 'Far North',
    languages: ['French', 'Fulfulde'],
    color: '#1E40AF', // Blue for Far North region
  }
];

// Cameroon-inspired color palette
const cameroonColors = {
  primary: {
    main: '#007A5E', // Green from Cameroon flag
    light: '#00A884',
    dark: '#005A45',
  },
  secondary: {
    main: '#CE1126', // Red from Cameroon flag
    light: '#E63946',
    dark: '#A30D1E',
  },
  accent: {
    yellow: '#FCD116', // Yellow from Cameroon flag
    gold: '#D4AF37',
    brown: '#8B4513',
  },
  cultural: {
    purple: '#7C3AED', // Cultural diversity
    blue: '#2563EB',   // Unity
    green: '#059669',  // Growth
  }
};

// Cameroon-inspired patterns (placeholder for now, can be replaced with SVG/base64 patterns)
const cameroonPatterns = {
  geometric: {
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C92AC' fill-opacity='0.1' fill-rule='evenodd'%3E%3Cpath d='M0 0h3v3H0V0zm3 3h3v3H3V3z'/%3E%3C/g%3E%3C/svg%3E")`,
    backgroundRepeat: 'repeat',
  },
  diagonalStripes: {
    backgroundImage: `repeating-linear-gradient(45deg, ${alpha(cameroonColors.primary.main, 0.05)}, ${alpha(cameroonColors.primary.main, 0.05)} 10px, transparent 10px, transparent 20px)`,
  },
};

// Features data
const features = [
  {
    icon: ChatIcon,
    title: 'AI-Powered Analysis',
    description: 'Advanced AI algorithms analyze content across multiple languages and platforms',
    capabilities: ['Natural Language Processing', 'Sentiment Analysis', 'Pattern Recognition'],
    demoText: 'Try our AI analysis with a sample text',
    color: modernColors.primary.main,
  },
  {
    icon: ReportIcon,
    title: 'Report Misinformation',
    description: 'Easy-to-use reporting system for flagging suspicious content',
    capabilities: ['Quick Report Form', 'Evidence Upload', 'Anonymous Reporting'],
    demoText: 'Report a piece of misinformation',
    color: modernColors.error.main,
  },
  {
    icon: NotificationsActiveIcon,
    title: 'Real-time Updates',
    description: 'Stay informed with instant notifications about trending misinformation',
    capabilities: ['Custom Alerts', 'Trend Analysis', 'Regional Updates'],
    demoText: 'Set up your notification preferences',
    color: modernColors.success.main,
  },
  {
    icon: VerifiedUserIcon,
    title: 'Fact-Checking Hub',
    description: 'Access verified information and fact-checking resources',
    capabilities: ['Source Verification', 'Fact Database', 'Expert Reviews'],
    demoText: 'Browse verified facts',
    color: modernColors.secondary.main,
  },
];

// New: Cameroonian Proverbs data
const cameroonianProverbs = [
  {
    quote: "When you follow in the footsteps of your father, you learn how to walk.",
    origin: "Beti People"
  },
  {
    quote: "A child who does not learn to walk properly will not know how to run.",
    origin: "Bassa People"
  },
  {
    quote: "The eye that saw yesterday can still see today.",
    origin: "Fulani People"
  },
  {
    quote: "Knowledge is like a garden: if it is not cultivated, it cannot be harvested.",
    origin: "Douala People"
  },
  {
    quote: "He who refuses to be advised will not walk far.",
    origin: "Ewondo People"
  }
];

// New: Community Impact Stories data
const communityImpactStories = [
  {
    title: "Combating Misinformation in Rural Elections",
    description: "Sui-Ru's real-time monitoring and local fact-checking teams successfully debunked false electoral information spread across radio and social media in the rural North region, ensuring a fairer election process.",
    date: "October 2023",
    region: "North Region",
    icon: GavelIcon,
    color: cameroonColors.cultural.green,
  },
  {
    title: "Digital Literacy Workshop for Youth",
    description: "In partnership with local NGOs, Sui-Ru delivered workshops in Douala, empowering over 500 young people to identify and report fake news, significantly reducing online vulnerability in the Littoral region.",
    date: "September 2023",
    region: "Littoral Region",
    icon: SchoolIcon,
    color: cameroonColors.cultural.blue,
  },
  {
    title: "Early Warning System for Health Scares",
    description: "Our platform's rapid detection of health misinformation regarding a recent outbreak in the Centre region allowed health authorities to issue timely, accurate advisories, preventing widespread panic and promoting public health.",
    date: "August 2023",
    region: "Centre Region",
    icon: SecurityIcon,
    color: cameroonColors.cultural.purple,
  },
  {
    title: "Empowering Local Journalists with Fact-Checking Tools",
    description: "Sui-Ru provided advanced fact-checking training and tools to journalists in the South-West, enhancing their capacity to verify information and produce reliable news, especially during critical events.",
    date: "July 2023",
    region: "South-West Region",
    icon: EventNoteIcon,
    color: cameroonColors.accent.gold,
  },
];

// Component definitions
const MotionBox = motion(Box);

const StatCard = ({ title, value, icon: Icon, trend, color }) => {
  const theme = useTheme();
  
  const colorMap = {
    primary: theme.palette.primary.main,
    secondary: theme.palette.secondary.main,
    success: theme.palette.success.main,
    error: theme.palette.error.main,
    warning: theme.palette.warning.main,
    info: theme.palette.info.main,
  };

  const selectedColor = colorMap[color] || theme.palette.primary.main;

  return (
    <Card sx={{ height: '100%', borderRadius: 4, boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: 2,
              bgcolor: alpha(selectedColor, 0.1),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mr: 2,
            }}
          >
            <Icon sx={{ fontSize: 24, color: selectedColor }} />
          </Box>
          <Typography variant="h6" component="h3" sx={{ fontWeight: 600 }}>
            {title}
          </Typography>
        </Box>
        <Typography variant="h4" component="div" sx={{ mb: 1, fontWeight: 700 }}>
          {value}
        </Typography>
        {trend !== undefined && (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {trend > 0 ? (
              <TrendingUpIcon sx={{ color: theme.palette.success.main, mr: 1 }} />
            ) : (
              <TrendingDownIcon sx={{ color: theme.palette.error.main, mr: 1 }} />
            )}
            <Typography
              variant="body2"
              color={trend > 0 ? 'success.main' : 'error.main'}
              sx={{ fontWeight: 500 }}
            >
              {trend > 0 ? 'Increasing' : 'Decreasing'}
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

const ModernFeatureCard = ({ feature }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <MotionBox
      whileHover={{ scale: 1.02, y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      sx={{
        height: '100%',
        position: 'relative',
      }}
    >
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          transition: 'all 0.3s ease',
          bgcolor: isHovered ? alpha(feature.color, 0.05) : 'white',
          borderRadius: 4,
          boxShadow: isHovered 
            ? `0 20px 40px ${alpha(feature.color, 0.15)}`
            : '0 4px 6px rgba(0,0,0,0.05)',
          border: `1px solid ${alpha(feature.color, 0.1)}`,
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: feature.color,
            transform: isHovered ? 'scaleX(1)' : 'scaleX(0)',
            transition: 'transform 0.3s ease',
          },
        }}
      >
        <CardContent sx={{ flexGrow: 1, p: 4 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              mb: 3,
              color: feature.color,
            }}
          >
            <Box
              sx={{
                width: 60,
                height: 60,
                borderRadius: 2,
                bgcolor: alpha(feature.color, 0.1),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 2,
              }}
            >
              <feature.icon sx={{ fontSize: 32 }} />
            </Box>
            <Typography variant="h5" component="h3" sx={{ fontWeight: 600 }}>
              {feature.title}
            </Typography>
          </Box>
          
          <Typography variant="body1" color="text.secondary" paragraph sx={{ mb: 3 }}>
            {feature.description}
          </Typography>

          <Box sx={{ mt: 2, mb: 3 }}>
            {feature.capabilities.map((capability, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  mb: 2,
                  p: 1,
                  borderRadius: 1,
                  bgcolor: alpha(feature.color, 0.05),
                }}
              >
                <SpeedIcon
                  sx={{
                    fontSize: 16,
                    color: feature.color,
                    mr: 1.5,
                  }}
                />
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {capability}
                </Typography>
              </Box>
            ))}
          </Box>

          <Box
            sx={{
              mt: 'auto',
              pt: 3,
              borderTop: `1px solid ${alpha(feature.color, 0.1)}`,
            }}
          >
            <Button
              variant="contained"
              size="large"
              sx={{
                bgcolor: feature.color,
                color: 'white',
                px: 4,
                py: 1.5,
                borderRadius: 2,
                fontWeight: 600,
                '&:hover': {
                  bgcolor: alpha(feature.color, 0.9),
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              {feature.demoText}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </MotionBox>
  );
};

const ModernInteractiveDemo = () => {
  const [activeTab, setActiveTab] = useState(0);
  const theme = useTheme();
  
  return (
    <Box sx={{ mt: 12, mb: 8 }}>
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          sx={{
            fontWeight: 700,
            mb: 2,
            background: modernColors.background.gradient,
            backgroundClip: 'text',
            textFillColor: 'transparent',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Experience Sui-Ru
        </Typography>
        <Typography
          variant="h6"
          align="center"
          color="text.secondary"
          sx={{ mb: 6, maxWidth: 600, mx: 'auto' }}
        >
          Try our powerful tools and see how we're making Cameroon's digital space safer
        </Typography>
        
        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 4,
            bgcolor: 'white',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
            border: '1px solid rgba(0,0,0,0.05)',
          }}
        >
          <Tabs
            value={activeTab}
            onChange={(e, newValue) => setActiveTab(newValue)}
            variant="fullWidth"
            sx={{
              mb: 4,
              '& .MuiTab-root': {
                fontSize: '1.1rem',
                fontWeight: 600,
                py: 2,
                textTransform: 'none',
              },
              '& .Mui-selected': {
                color: modernColors.primary.main,
              },
              '& .MuiTabs-indicator': {
                height: 3,
                borderRadius: 3,
                bgcolor: modernColors.primary.main,
              },
            }}
          >
            <Tab label="AI Analysis" />
            <Tab label="Quick Report" />
            <Tab label="Live Updates" />
          </Tabs>
          
          <Box sx={{ p: 2 }}>
            <AnimatePresence mode="wait">
              <MotionBox
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <MotionBox
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {activeTab === 0 && (
                    <Box>
                      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                        Ask our AI about trending topics
                      </Typography>
                      <TextField
                        fullWidth
                        placeholder="e.g., What's the latest trending misinformation in Yaoundé?"
                        variant="outlined"
                        sx={{
                          mb: 3,
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            bgcolor: 'rgba(0,0,0,0.02)',
                          },
                        }}
                      />
                      <Button
                        variant="contained"
                        size="large"
                        sx={{
                          bgcolor: modernColors.primary.main,
                          px: 4,
                          py: 1.5,
                          borderRadius: 2,
                          fontWeight: 600,
                          '&:hover': {
                            bgcolor: modernColors.primary.dark,
                            transform: 'translateY(-2px)',
                          },
                          transition: 'all 0.3s ease',
                        }}
                      >
                        Analyze
                      </Button>
                    </Box>
                  )}
                  
                  {activeTab === 1 && (
                    <Box>
                      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                        Report Misinformation
                      </Typography>
                      <Stack spacing={3}>
                        <TextField
                          fullWidth
                          placeholder="Enter the suspicious content URL"
                          variant="outlined"
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 2,
                              bgcolor: 'rgba(0,0,0,0.02)',
                            },
                          }}
                        />
                        <TextField
                          fullWidth
                          multiline
                          rows={3}
                          placeholder="Describe why you think this is misinformation"
                          variant="outlined"
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 2,
                              bgcolor: 'rgba(0,0,0,0.02)',
                            },
                          }}
                        />
                        <Button
                          variant="contained"
                          size="large"
                          sx={{
                            bgcolor: modernColors.error.main,
                            px: 4,
                            py: 1.5,
                            borderRadius: 2,
                            fontWeight: 600,
                            '&:hover': {
                              bgcolor: modernColors.error.dark,
                              transform: 'translateY(-2px)',
                            },
                            transition: 'all 0.3s ease',
                          }}
                        >
                          Submit Report
                        </Button>
                      </Stack>
                    </Box>
                  )}
                  
                  {activeTab === 2 && (
                    <Box>
                      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                        Latest Updates
                      </Typography>
                      <List sx={{ p: 0 }}>
                        {[1, 2, 3].map((item) => (
                          <ListItem
                            key={item}
                            sx={{
                              mb: 2,
                              p: 2,
                              borderRadius: 2,
                              bgcolor: 'rgba(0,0,0,0.02)',
                              '&:hover': {
                                bgcolor: 'rgba(0,0,0,0.04)',
                              },
                              transition: 'all 0.3s ease',
                            }}
                          >
                            <ListItemIcon>
                              <NotificationsActiveIcon sx={{ color: modernColors.primary.main }} />
                            </ListItemIcon>
                            <ListItemText
                              primary={
                                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                  New misinformation pattern detected
                                </Typography>
                              }
                              secondary="2 hours ago • Yaoundé"
                            />
                            <Chip
                              label="High Priority"
                              color="error"
                              size="small"
                              sx={{
                                borderRadius: 1,
                                fontWeight: 600,
                              }}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  )}
                </MotionBox>
              </MotionBox>
            </AnimatePresence>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

const CulturalFactCard = ({ fact }) => (
  <MotionBox
    whileHover={{ scale: 1.02, y: -5 }}
    sx={{
      height: '100%',
      position: 'relative',
    }}
  >
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s ease',
        borderRadius: 4,
        boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
        border: `1px solid ${alpha(fact.color, 0.1)}`,
        overflow: 'hidden',
        '&:hover': {
          boxShadow: `0 20px 40px ${alpha(fact.color, 0.15)}`,
          bgcolor: alpha(fact.color, 0.05),
        },
      }}
    >
      <CardContent sx={{ p: 4 }}>
        <Box
          sx={{
            width: 64,
            height: 64,
            borderRadius: 2,
            bgcolor: alpha(fact.color, 0.1),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 3,
          }}
        >
          {React.cloneElement(fact.icon, { sx: { fontSize: 32, color: fact.color } })}
        </Box>
        <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
          {fact.title}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {fact.description}
        </Typography>
      </CardContent>
    </Card>
  </MotionBox>
);

const TestimonialCard = ({ testimonial, isActive }) => {
  const theme = useTheme();
  
  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      sx={{
        position: 'absolute',
        width: '100%',
        maxWidth: 800,
        display: isActive ? 'block' : 'none',
      }}
    >
      <Card
        sx={{
          p: 4,
          borderRadius: 4,
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          bgcolor: 'background.paper',
          position: 'relative',
          border: `1px solid ${alpha(testimonial.color, 0.2)}`,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Avatar
            src={testimonial.avatar}
            alt={testimonial.name}
            sx={{
              width: 64,
              height: 64,
              mr: 2,
              border: '2px solid',
              borderColor: testimonial.color,
            }}
          />
          <Box>
            <Typography variant="h6" component="h3" sx={{ fontWeight: 600, color: testimonial.color }}>
              {testimonial.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
              {testimonial.role}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Chip
                label={testimonial.region}
                size="small"
                sx={{
                  bgcolor: alpha(testimonial.color, 0.1),
                  color: testimonial.color,
                  fontWeight: 500,
                }}
              />
              {testimonial.languages.map((lang, index) => (
                <Chip
                  key={index}
                  label={lang}
                  size="small"
                  sx={{
                    bgcolor: alpha(cameroonColors.accent.gold, 0.1),
                    color: cameroonColors.accent.gold,
                    fontWeight: 500,
                  }}
                />
              ))}
            </Box>
          </Box>
        </Box>
        <Typography
          variant="body1"
          sx={{
            fontSize: '1.1rem',
            lineHeight: 1.7,
            color: 'text.primary',
            position: 'relative',
            zIndex: 1,
            fontStyle: 'italic',
          }}
        >
          {testimonial.quote}
        </Typography>
      </Card>
    </MotionBox>
  );
};

const TrendingTopicCard = ({ topic }) => {
  const theme = useTheme();
  
  const severityColors = {
    high: theme.palette.error.main,
    medium: theme.palette.warning.main,
    low: theme.palette.success.main,
  };

  const trendColors = {
    up: theme.palette.success.main,
    down: theme.palette.error.main,
  };

  return (
    <MotionBox
      whileHover={{ scale: 1.02, y: -2 }}
      sx={{
        width: '100%',
        mb: 2,
      }}
    >
      <Card
        sx={{
          p: 2,
          borderRadius: 2,
          bgcolor: 'background.paper',
          border: '1px solid',
          borderColor: 'divider',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
              {topic.topic}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Chip
                label={topic.severity}
                size="small"
                sx={{
                  bgcolor: alpha(severityColors[topic.severity], 0.1),
                  color: severityColors[topic.severity],
                  fontWeight: 500,
                }}
              />
              <Typography variant="body2" color="text.secondary">
                {topic.count.toLocaleString()} mentions
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {topic.trend === 'up' ? (
              <TrendingUpIcon sx={{ color: trendColors[topic.trend] }} />
            ) : (
              <TrendingDownIcon sx={{ color: trendColors[topic.trend] }} />
            )}
          </Box>
        </Box>
      </Card>
    </MotionBox>
  );
};

const ModernHero = () => {
  const theme = useTheme(); // Use theme to access colors for patterns

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        bgcolor: modernColors.background.default,
        // Enhanced background with gradient and subtle pattern
        background: `linear-gradient(135deg, ${cameroonColors.primary.main} 0%, ${cameroonColors.accent.yellow} 100%)`,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: modernColors.background.gradient,
          opacity: 0.1,
          zIndex: 0,
        },
        '&::after': { // New pseudo-element for cultural pattern overlay
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          ...cameroonPatterns.geometric, // Apply a subtle geometric pattern
          opacity: 0.1,
          zIndex: 0,
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h1"
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  mb: 2,
                  background: modernColors.background.gradient,
                  backgroundClip: 'text',
                  textFillColor: 'transparent',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Protecting Cameroon's Digital Space
              </Typography>
              <Typography
                variant="h5"
                color="text.secondary"
                sx={{ mb: 4, fontWeight: 400 }}
              >
                Combating misinformation and hate speech across all regions of Cameroon
              </Typography>
              <Stack direction="row" spacing={2}>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    bgcolor: modernColors.primary.main,
                    color: 'white',
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    fontWeight: 600,
                    '&:hover': {
                      bgcolor: modernColors.primary.dark,
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  Get Started
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  sx={{
                    borderColor: modernColors.primary.main,
                    color: modernColors.primary.main,
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    fontWeight: 600,
                    '&:hover': {
                      borderColor: modernColors.primary.dark,
                      bgcolor: alpha(modernColors.primary.main, 0.05),
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  Learn More
                </Button>
              </Stack>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <CameroonMap />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

const TestimonialsSection = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{ py: { xs: 6, md: 8 } }}>
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          component="h2"
          align="center"
          gutterBottom
          sx={{
            mb: 2,
            background: `linear-gradient(135deg, ${cameroonColors.primary.main}, ${cameroonColors.secondary.main})`,
            backgroundClip: 'text',
            textFillColor: 'transparent',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Voices from Cameroon
        </Typography>
        <Typography
          variant="h6"
          align="center"
          color="text.secondary"
          sx={{ mb: 6, maxWidth: 600, mx: 'auto' }}
        >
          Hear from leaders across our diverse regions about how Sui-Ru is making a difference
        </Typography>
        
        <Box
          sx={{
            position: 'relative',
            height: 300,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={`testimonial-${index}`}
                testimonial={testimonial}
                isActive={index === activeTestimonial}
              />
            ))}
          </AnimatePresence>
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          {testimonials.map((_, index) => (
            <IconButton
              key={index}
              onClick={() => setActiveTestimonial(index)}
              sx={{
                mx: 1,
                width: 12,
                height: 12,
                bgcolor: index === activeTestimonial ? testimonials[index].color : 'grey.300',
                '&:hover': {
                  bgcolor: index === activeTestimonial ? alpha(testimonials[index].color, 0.8) : 'grey.400',
                },
                transition: 'all 0.3s ease',
              }}
            />
          ))}
        </Box>
      </Container>
    </Box>
  );
};

// New Section: Local Wisdom (Proverbs/Quotes)
const LocalWisdomSection = () => {
  const [currentProverbIndex, setCurrentProverbIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProverbIndex((prevIndex) => (prevIndex + 1) % cameroonianProverbs.length);
    }, 7000); // Change proverb every 7 seconds
    return () => clearInterval(interval);
  }, []);

  const currentProverb = cameroonianProverbs[currentProverbIndex];

  return (
    <Box sx={{ py: { xs: 6, md: 8 }, bgcolor: alpha(cameroonColors.cultural.blue, 0.05) }}>
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          component="h2"
          align="center"
          gutterBottom
          sx={{
            mb: 6,
            background: `linear-gradient(135deg, ${cameroonColors.cultural.blue}, ${cameroonColors.cultural.purple})`,
            backgroundClip: 'text',
            textFillColor: 'transparent',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Wisdom from Our Roots
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200, position: 'relative' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentProverbIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              style={{ position: 'absolute', width: '100%' }}
            >
              <Typography variant="h5" align="center" fontStyle="italic" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto' }}>
                "{currentProverb.quote}"
              </Typography>
              <Typography variant="body2" align="center" color="text.disabled" mt={1}>
                - {currentProverb.origin}
              </Typography>
            </motion.div>
          </AnimatePresence>
        </Box>
      </Container>
    </Box>
  );
};

// New Component: ImpactStoryCard
const ImpactStoryCard = ({ story }) => {
  return (
    <MotionBox
      whileHover={{ scale: 1.03, boxShadow: '0 8px 30px rgba(0,0,0,0.1)' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      sx={{
        width: '100%',
        height: '100%',
      }}
    >
      <Card
        sx={{
          p: 3,
          borderRadius: 4,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          bgcolor: 'background.paper',
          borderLeft: `5px solid ${story.color}`,
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-5px)',
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          {story.icon && <story.icon sx={{ color: story.color, fontSize: 40, mr: 2 }} />}
          <Typography variant="h6" component="h3" sx={{ fontWeight: 600, color: story.color }}>
            {story.title}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1, mb: 2 }}>
          {story.description}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
          <Chip
            label={story.region}
            size="small"
            sx={{
              bgcolor: alpha(story.color, 0.1),
              color: story.color,
              fontWeight: 500,
              mr: 1,
              mb: { xs: 1, sm: 0 },
            }}
          />
          <Typography variant="caption" color="text.disabled">
            {story.date}
          </Typography>
        </Box>
      </Card>
    </MotionBox>
  );
};

// New Section: Community Impact Stories (Populated and Enhanced)
const CommunityImpactSection = () => {
  return (
    <Box sx={{ py: { xs: 6, md: 8 }, bgcolor: alpha(cameroonColors.cultural.green, 0.05) }}>
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          component="h2"
          align="center"
          gutterBottom
          sx={{
            mb: 6,
            background: `linear-gradient(135deg, ${cameroonColors.cultural.green}, ${cameroonColors.accent.brown})`,
            backgroundClip: 'text',
            textFillColor: 'transparent',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Real Impact, Real Stories
        </Typography>
        <Grid container spacing={4}>
          {communityImpactStories.map((story, index) => (
            <Grid item xs={12} md={6} key={index}>
              <ImpactStoryCard story={story} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

// New Component: RegionalInsightsSection (Redesigned)
const RegionalInsightsSection = () => {
  const [hoveredRegion, setHoveredRegion] = useState(null);

  return (
    <Box sx={{ py: { xs: 6, md: 8 }, bgcolor: alpha(cameroonColors.cultural.purple, 0.05) }}>
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          component="h2"
          align="center"
          gutterBottom
          sx={{
            mb: 6,
            background: `linear-gradient(135deg, ${cameroonColors.cultural.purple}, ${cameroonColors.accent.gold})`,
            backgroundClip: 'text',
            textFillColor: 'transparent',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Regional Digital Safety Insights
        </Typography>

        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <CameroonMap setHoveredRegion={setHoveredRegion} />
          </Grid>
          <Grid item xs={12} md={6}>
            {hoveredRegion ? (
              <Card
                sx={{
                  p: 4,
                  borderRadius: 4,
                  boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
                  bgcolor: 'background.paper',
                  borderLeft: `8px solid ${hoveredRegion.color}`,
                  transition: 'all 0.3s ease',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, color: hoveredRegion.color }}>
                  {hoveredRegion.name}
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="body1" color="text.secondary">Cases Reported:</Typography>
                  <Typography variant="h5" fontWeight="bold">{hoveredRegion.cases.toLocaleString()}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body1" color="text.secondary">Digital Penetration:</Typography>
                  <Typography variant="h5" fontWeight="bold">{hoveredRegion.digitalPenetration}%</Typography>
                </Box>
                <Typography variant="body2" color="text.disabled" mt={2}>
                  Hover over different regions on the map to see their specific digital safety insights.
                </Typography>
              </Card>
            ) : (
              <Card
                sx={{
                  p: 4,
                  borderRadius: 4,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                  bgcolor: 'background.paper',
                  borderLeft: `8px solid ${cameroonColors.accent.gold}`,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                }}
              >
                <Typography variant="h5" gutterBottom color="text.primary">
                  Explore Digital Safety Across Cameroon
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 400 }}>
                  Hover over any region on the map to view real-time insights on misinformation cases and digital penetration specific to that area.
                </Typography>
                <img src="/illustrations/map-illustration.svg" alt="Explore Map" style={{ width: '60%', maxWidth: 200, marginTop: '20px' }} />
              </Card>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

const Landing = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: modernColors.background.default }}>
      <ModernHero />
      
      {/* Enhanced Features Section */}
      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            component="h2"
            align="center"
            gutterBottom
            sx={{
              fontWeight: 700,
              mb: 2,
              background: modernColors.background.gradient,
              backgroundClip: 'text',
              textFillColor: 'transparent',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Powerful Features for a Safer Digital Cameroon
          </Typography>
          <Typography
            variant="h6"
            align="center"
            color="text.secondary"
            sx={{ mb: 8, maxWidth: 800, mx: 'auto' }}
          >
            Our platform combines advanced AI technology with local expertise to combat
            misinformation and hate speech across Cameroon's diverse digital landscape.
          </Typography>
          
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={6} key={index}>
                <ModernFeatureCard feature={feature} />
              </Grid>
            ))}
          </Grid>

          <ModernInteractiveDemo />
        </Container>
      </Box>

      {/* Cultural Facts Section */}
      <Box sx={{ py: { xs: 6, md: 8 } }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            component="h2"
            align="center"
            gutterBottom
            sx={{ mb: 6 }}
          >
            Cameroon's Digital Landscape
          </Typography>
          <Grid container spacing={4}>
            {culturalFacts.map((fact, index) => (
              <Grid item xs={12} md={4} key={index}>
                <CulturalFactCard fact={fact} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Language Distribution Section */}
      <Box sx={{ py: { xs: 6, md: 8 }, bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h4" gutterBottom>
                Language Distribution
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                Our platform supports all major languages used in Cameroon, ensuring comprehensive coverage and accessibility.
              </Typography>
              <Stack spacing={2}>
                {languageData.map((lang, index) => (
                  <Box key={lang.name} sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        borderRadius: '50%',
                        bgcolor: lang.color,
                        mr: 2,
                      }}
                    />
                    <Typography variant="body1">
                      {lang.name} ({lang.value}%)
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={languageData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {languageData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* New Section: Local Wisdom (Proverbs/Quotes) */}
      <LocalWisdomSection />

      {/* New Section: Community Impact Stories */}
      <CommunityImpactSection />

      {/* New Section: Regional Insights */}
      <RegionalInsightsSection />

      {/* Statistics Section (Enhanced with better color blending) */}
      <Box sx={{ py: { xs: 6, md: 8 }, bgcolor: alpha(cameroonColors.primary.light, 0.1) }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            component="h2"
            align="center"
            gutterBottom
            sx={{ mb: 6 }}
          >
            Real-time Insights
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                title="Active Cases"
                value="1,240"
                icon={WarningIcon}
                trend={12}
                color="error"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                title="Resolved Cases"
                value="8,560"
                icon={SecurityIcon}
                trend={-5}
                color="success"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                title="Platforms Monitored"
                value="50+"
                icon={PublicIcon}
                color="info"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                title="Response Time"
                value="< 5min"
                icon={AnalyticsIcon}
                trend={-15}
                color="primary"
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Trends Section */}
      <Box sx={{ py: { xs: 6, md: 8 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={6}>
            <Grid item xs={12} md={8}>
              <Typography variant="h4" gutterBottom>
                Misinformation Trends
              </Typography>
              <Box sx={{ height: 400, mt: 4 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="cases"
                      stroke={theme.palette.error.main}
                      strokeWidth={2}
                      name="New Cases"
                    />
                    <Line
                      type="monotone"
                      dataKey="resolved"
                      stroke={theme.palette.success.main}
                      strokeWidth={2}
                      name="Resolved Cases"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h4" gutterBottom>
                Trending Topics
              </Typography>
              <Box sx={{ mt: 4 }}>
                {trendingTopics.map((topic, index) => (
                  <TrendingTopicCard key={index} topic={topic} />
                ))}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Enhanced Call to Action Section */}
      <Box
        sx={{
          position: 'relative',
          bgcolor: 'secondary.main',
          color: 'white',
          py: { xs: 8, md: 12 },
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url("/cameroon-pattern.svg")',
            opacity: 0.1,
            zIndex: 0,
          }
        }}
      >
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
          <Typography
            variant="h3"
            component="h2"
            align="center"
            gutterBottom
            sx={{ mb: 4 }}
          >
            Join Cameroon's Digital Safety Movement
          </Typography>
          <Typography
            variant="body1"
            align="center"
            sx={{ mb: 6, opacity: 0.9 }}
          >
            Together, we can create a safer digital environment for all Cameroonians.
            Be part of the solution in combating misinformation and hate speech.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/login')}
              sx={{
                bgcolor: 'white',
                color: 'secondary.main',
                px: 4,
                '&:hover': {
                  bgcolor: 'grey.100',
                },
              }}
            >
              Get Started Now
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/dashboard')}
              sx={{
                borderColor: 'white',
                color: 'white',
                px: 4,
                '&:hover': {
                  borderColor: 'white',
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              Learn More
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Landing; 