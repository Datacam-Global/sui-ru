import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import { alpha } from '@mui/material/styles';

// Cameroon map data with more accurate region names and data
export const cameroonRegions = [
  { 
    name: 'North', 
    cases: 120, 
    digitalPenetration: 35, 
    color: '#2563EB',
    path: 'M 300,50 L 350,80 L 400,70 L 450,100 L 420,150 L 380,180 L 320,160 L 280,120 Z'
  },
  { 
    name: 'Far North', 
    cases: 150, 
    digitalPenetration: 30, 
    color: '#1E40AF',
    path: 'M 280,120 L 320,160 L 380,180 L 350,220 L 300,240 L 250,200 L 220,160 Z'
  },
  { 
    name: 'Adamawa', 
    cases: 90, 
    digitalPenetration: 40, 
    color: '#3B82F6',
    path: 'M 350,220 L 380,180 L 420,150 L 450,100 L 500,120 L 480,180 L 420,220 L 380,240 Z'
  },
  { 
    name: 'East', 
    cases: 80, 
    digitalPenetration: 45, 
    color: '#60A5FA',
    path: 'M 420,220 L 480,180 L 500,120 L 550,150 L 520,220 L 480,280 L 420,260 Z'
  },
  { 
    name: 'Centre', 
    cases: 200, 
    digitalPenetration: 65, 
    color: '#7C3AED',
    path: 'M 300,240 L 350,220 L 380,240 L 420,260 L 380,300 L 320,280 L 280,260 Z'
  },
  { 
    name: 'South', 
    cases: 110, 
    digitalPenetration: 50, 
    color: '#6D28D9',
    path: 'M 280,260 L 320,280 L 380,300 L 350,340 L 300,360 L 250,320 L 220,280 Z'
  },
  { 
    name: 'Littoral', 
    cases: 180, 
    digitalPenetration: 70, 
    color: '#8B5CF6',
    path: 'M 220,160 L 250,200 L 280,240 L 300,240 L 320,280 L 280,260 L 250,320 L 220,280 L 200,240 L 180,200 Z'
  },
  { 
    name: 'West', 
    cases: 130, 
    digitalPenetration: 55, 
    color: '#A78BFA',
    path: 'M 180,200 L 200,240 L 220,280 L 250,320 L 220,360 L 180,340 L 160,300 L 150,260 L 170,220 Z'
  },
  { 
    name: 'North-West', 
    cases: 160, 
    digitalPenetration: 45, 
    color: '#059669',
    path: 'M 150,260 L 160,300 L 180,340 L 220,360 L 250,320 L 280,260 L 250,200 L 220,160 L 180,200 L 170,220 Z'
  },
  { 
    name: 'South-West', 
    cases: 140, 
    digitalPenetration: 50, 
    color: '#10B981',
    path: 'M 180,340 L 220,360 L 250,320 L 300,360 L 280,400 L 240,420 L 200,400 L 170,380 Z'
  }
];

const CameroonMap = ({ setHoveredRegion }) => {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: 500, // Increased height for better visibility
        bgcolor: 'background.paper',
        borderRadius: 4,
        overflow: 'hidden',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
        border: '1px solid rgba(0,0,0,0.05)',
      }}
    >
      {/* Map Container */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 4,
        }}
      >
        {/* Map SVG */}
        <Box
          component="svg"
          viewBox="0 0 800 600"
          sx={{
            width: '100%',
            height: '100%',
            '& path': {
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              stroke: '#fff',
              strokeWidth: 1,
              '&:hover': {
                filter: 'brightness(1.1)',
                transform: 'scale(1.02)',
                strokeWidth: 2,
              },
            },
          }}
        >
          {/* Cameroon Map Paths */}
          <g transform="translate(50,50) scale(0.9)">
            {cameroonRegions.map((region, index) => (
              <path
                key={region.name}
                d={region.path}
                fill={region.color}
                opacity={0.7}
                onMouseEnter={() => setHoveredRegion(region)}
                onMouseLeave={() => setHoveredRegion(null)}
              />
            ))}
          </g>
        </Box>

        {/* Map Legend */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 16,
            left: 16,
            bgcolor: 'background.paper',
            borderRadius: 2,
            p: 2,
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            zIndex: 1,
          }}
        >
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
            Digital Penetration
          </Typography>
          <Stack direction="row" spacing={2}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  bgcolor: '#1E40AF',
                  mr: 1,
                }}
              />
              <Typography variant="caption">Low</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  bgcolor: '#7C3AED',
                  mr: 1,
                }}
              />
              <Typography variant="caption">Medium</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  bgcolor: '#8B5CF6',
                  mr: 1,
                }}
              />
              <Typography variant="caption">High</Typography>
            </Box>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default CameroonMap; 