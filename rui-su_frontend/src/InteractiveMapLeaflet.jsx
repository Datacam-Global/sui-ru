import React, { useState, useEffect, memo, useMemo, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in React Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const InteractiveMap = memo(({ theme }) => {
  const [loading, setLoading] = useState(true);
  const [mapReady, setMapReady] = useState(false);
  const mapRef = useRef(null);

  // Default colors in case theme is not provided
  const colors = useMemo(() => theme || {
    primary: '#3b82f6',
    secondary: '#1e40af',
    accent: '#f59e0b',
    background: '#1f2937',
    surface: '#374151',
    text: '#f9fafb',
    textSecondary: '#d1d5db',
    textMuted: '#9ca3af',
    border: '#4b5563',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444'
  }, [theme]);

  // Memoize static data to prevent unnecessary re-renders
  const incidentData = useMemo(() => [
    { id: 1, lat: 3.848, lng: 11.502, type: 'misinformation', count: 45, region: 'Centre', city: 'Yaoundé' },
    { id: 2, lat: 4.0511, lng: 9.7679, type: 'hate_speech', count: 32, region: 'Littoral', city: 'Douala' },
    { id: 3, lat: 7.3697, lng: 12.354, type: 'fake_news', count: 28, region: 'Nord', city: 'Garoua' },
    { id: 4, lat: 5.9631, lng: 10.1591, type: 'misinformation', count: 19, region: 'Adamaoua', city: 'Ngaoundéré' },
    { id: 5, lat: 6.1319, lng: 12.3991, type: 'hate_speech', count: 15, region: 'Est', city: 'Bertoua' },
    { id: 6, lat: 10.5949, lng: 14.2023, type: 'fake_news', count: 41, region: 'Extrême-Nord', city: 'Maroua' },
    { id: 7, lat: 5.4467, lng: 9.9348, type: 'misinformation', count: 22, region: 'Ouest', city: 'Bafoussam' },
    { id: 8, lat: 6.2619, lng: 9.2675, type: 'hate_speech', count: 18, region: 'Nord-Ouest', city: 'Bamenda' },
    { id: 9, lat: 4.1560, lng: 9.2874, type: 'fake_news', count: 25, region: 'Sud-Ouest', city: 'Buea' },
    { id: 10, lat: 2.9167, lng: 11.5167, type: 'misinformation', count: 12, region: 'Sud', city: 'Ebolowa' }
  ], []);

  useEffect(() => {
    // Skip GeoJSON loading and use a simple map with markers only
    setLoading(false);
  }, []);

  // Handle map ready event
  const handleMapReady = useMemo(() => () => {
    setMapReady(true);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    const currentMapRef = mapRef.current;
    return () => {
      if (currentMapRef) {
        try {
          currentMapRef.remove();
        } catch (error) {
          // Ignore cleanup errors
        }
      }
    };
  }, []);

  const getMarkerIcon = useMemo(() => (type) => {
    const iconColors = {
      misinformation: colors.primary,
      hate_speech: colors.error,
      fake_news: colors.warning
    };

    return L.divIcon({
      className: 'custom-marker',
      html: `
        <div style="
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background-color: ${iconColors[type]};
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
          animation: pulse 2s infinite;
        "></div>
        <style>
          @keyframes pulse {
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.2); opacity: 0.7; }
            100% { transform: scale(1); opacity: 1; }
          }
        </style>
      `,
      iconSize: [20, 20],
      iconAnchor: [10, 10]
    });
  }, [colors.primary, colors.error, colors.warning]);

  if (loading) {
    return (
      <div 
        className="w-full h-96 rounded-lg flex items-center justify-center"
        style={{ backgroundColor: colors.surface }}
      >
        <div className="text-center">
          <div 
            className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4"
            style={{ borderColor: colors.primary }}
          ></div>
          <p style={{ color: colors.textSecondary }}>Loading interactive map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-96">
      <MapContainer
        ref={mapRef}
        center={[6.5244, 12.3544]}
        zoom={6}
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
        className="rounded-lg"
        whenReady={handleMapReady}
        key="stable-map-container"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <ZoomControl position="bottomright" />
        
        {mapReady && incidentData.map((incident) => (
          <Marker
            key={incident.id}
            position={[incident.lat, incident.lng]}
            icon={getMarkerIcon(incident.type)}
          >
            <Popup>
              <div className="p-2" style={{ color: '#000000' }}>
                <h3 className="font-semibold text-sm text-black">{incident.city}</h3>
                <p className="text-xs text-gray-600">{incident.region} Region</p>
                <div className="flex items-center gap-2 mt-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ 
                      backgroundColor: incident.type === 'misinformation' ? colors.primary :
                                     incident.type === 'hate_speech' ? colors.error : colors.warning
                    }}
                  ></div>
                  <span className="text-xs capitalize text-gray-700">
                    {incident.type.replace('_', ' ')}: {incident.count}
                  </span>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}, (prevProps, nextProps) => {
  // Custom comparison function to prevent unnecessary re-renders
  if (!prevProps.theme && !nextProps.theme) return true;
  if (!prevProps.theme || !nextProps.theme) return false;
  
  // Compare theme properties
  const prevTheme = prevProps.theme;
  const nextTheme = nextProps.theme;
  
  return (
    prevTheme.primary === nextTheme.primary &&
    prevTheme.secondary === nextTheme.secondary &&
    prevTheme.accent === nextTheme.accent &&
    prevTheme.background === nextTheme.background &&
    prevTheme.surface === nextTheme.surface &&
    prevTheme.text === nextTheme.text &&
    prevTheme.textSecondary === nextTheme.textSecondary &&
    prevTheme.textMuted === nextTheme.textMuted &&
    prevTheme.border === nextTheme.border &&
    prevTheme.success === nextTheme.success &&
    prevTheme.warning === nextTheme.warning &&
    prevTheme.error === nextTheme.error
  );
});

export default InteractiveMap;

