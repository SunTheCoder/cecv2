import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEPAData } from '../../store/slices/epaSlice';

const ResourceMap = () => {
    const dispatch = useDispatch();
    const { data: epaData, loading, error } = useSelector(state => state.epa);
    const [epaLayer, setEpaLayer] = useState(null);

    useEffect(() => {
        dispatch(fetchEPAData());
        
        // Optional: Set up periodic background refresh
        const interval = setInterval(() => {
            dispatch(fetchEPAData());
        }, 60 * 60 * 1000); // Every hour
        
        return () => clearInterval(interval);
    }, [dispatch]);

    useEffect(() => {
        if (!epaData || !mapInstance) return;

        if (epaLayer) {
            epaLayer.clearLayers();
            epaLayer.addData(epaData);
        } else {
            const layer = L.geoJSON(epaData, {
                style: {
                    color: '#ff0000',
                    weight: 2,
                    opacity: 0.8,
                    fillOpacity: 0.4
                }
            }).addTo(mapInstance);
            setEpaLayer(layer);
        }
    }, [epaData, mapInstance]);

    // Optional loading indicator
    if (loading && !epaData) {
        return <div>Loading EPA data...</div>;
    }

    return (
        <div style={{ height: "100vh", width: "100%" }}>
            <MapContainer 
                center={[39.8283, -98.5795]} 
                zoom={4} 
                style={{ height: "100%", width: "100%" }}
            >
                <MapInitializer setMap={setMapInstance} />
                {/* ... other map components ... */}
            </MapContainer>
        </div>
    );
}; 