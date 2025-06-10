import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import { alpha } from '@mui/material/styles';
import cameroonGeoJSON from '../assets/cm.json';

// Color scheme for regions
const regionColors = {
  'Nord': '#2563EB',
  'Extrême-Nord': '#1E40AF',
  'Adamaoua': '#3B82F6',
  'Est': '#60A5FA',
  'Centre': '#7C3AED',
  'Sud': '#6D28D9',
  'Littoral': '#8B5CF6',
  'Ouest': '#A78BFA',
  'Nord-Ouest': '#059669',
  'Sud-Ouest': '#10B981'
};

// Sample data for regions (you can replace this with real data)
const regionData = {
  'Nord': { cases: 120, digitalPenetration: 35 },
  'Extrême-Nord': { cases: 150, digitalPenetration: 30 },
  'Adamaoua': { cases: 90, digitalPenetration: 40 },
  'Est': { cases: 80, digitalPenetration: 45 },
  'Centre': { cases: 200, digitalPenetration: 65 },
  'Sud': { cases: 110, digitalPenetration: 50 },
  'Littoral': { cases: 180, digitalPenetration: 70 },
  'Ouest': { cases: 130, digitalPenetration: 55 },
  'Nord-Ouest': { cases: 160, digitalPenetration: 45 },
  'Sud-Ouest': { cases: 140, digitalPenetration: 50 }
};

const CameroonMap = ({ setHoveredRegion }) => {
  // Function to convert GeoJSON coordinates to SVG path
  const coordinatesToPath = (coordinates) => {
    if (!coordinates || !coordinates.length) return '';
    
    // Handle both Polygon and MultiPolygon types
    const paths = Array.isArray(coordinates[0][0][0]) ? coordinates : [coordinates];
    
    return paths.map(polygon => {
      return polygon.map((ring, i) => {
        // Flip y-coordinate for SVG (Cameroon latitude range: 1.5 to 13)
        const points = ring.map(([x, y]) => `${x},${13 - y + 1.5}`).join(' ');
        return `${i === 0 ? 'M' : 'L'} ${points} Z`;
      }).join(' ');
    }).join(' ');
  };

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: 500,
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
          viewBox="8.5 1.5 7.5 11.5"
          sx={{
            width: '75%',
            height: '75%',
            '& path': {
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              stroke: '#1a1a1a',
              strokeWidth: 0.3,
              '&:hover': {
                filter: 'brightness(1.1)',
                transform: 'scale(1.02)',
                strokeWidth: 0.5,
              },
            },
          }}
        >
          {/* Cameroon Map Paths */}
          {cameroonGeoJSON.features.map((feature) => {
            const regionName = feature.properties.name;
            const data = regionData[regionName] || { cases: 0, digitalPenetration: 0 };
            const color = regionColors[regionName] || '#ccc';
            
            return (
              <path
                key={regionName}
                d={coordinatesToPath(feature.geometry.coordinates)}
                fill={color}
                opacity={0.7}
                onMouseEnter={() => setHoveredRegion({ name: regionName, ...data, color })}
                onMouseLeave={() => setHoveredRegion(null)}
              />
            );
          })}
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