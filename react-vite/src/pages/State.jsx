import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import LeafletMap from '../components/LeafletMap/Map';
import ReservationModal from '../components/ReservationModal';
import { epaDataManager } from '../utils/epaDataManager';

const State = () => {
    const { stateName } = useParams();
    const [selectedReservation, setSelectedReservation] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [stateData, setStateData] = useState(null);
    const [reservations, setReservations] = useState([]);
    const [epaData, setEpaData] = useState(null);

    useEffect(() => {
        const loadAllData = async () => {
            // Load EPA data
            const epaFeatures = await epaDataManager.preloadData();
            setEpaData(epaFeatures);

            // Fetch state boundaries data
            const stateResponse = await fetch("/us-state-boundaries.geojson");
            const stateGeoJSON = await stateResponse.json();
            
            // Find the specific state
            const state = stateGeoJSON.features.find(
                feature => feature.properties.name.toLowerCase() === stateName.toLowerCase()
            );
            setStateData(state);

            // Fetch reservations data
            const reservationsResponse = await fetch("/other_reservation.geojson");
            const reservationsData = await reservationsResponse.json();

            // Filter reservations within state bounds
            if (state) {
                const bounds = L.geoJSON(state).getBounds();
                const stateReservations = reservationsData.features.filter(reservation => {
                    const [lon, lat] = reservation.geometry.coordinates[0][0];
                    const point = L.latLng(lat, lon);
                    return bounds.contains(point);
                });
                setReservations(stateReservations);
            }

            // Enhance reservations with EPA data
            const enhancedReservations = stateReservations.map(reservation => {
                // Find matching EPA feature based on location
                const matchingEpaFeature = epaFeatures?.features?.find(epaFeature => {
                    const [resLon, resLat] = reservation.geometry.coordinates[0][0];
                    const [epaLon, epaLat] = epaFeature.geometry.coordinates[0][0];
                    
                    // Use a small threshold for coordinate matching
                    const threshold = 0.01; // roughly 1km
                    return Math.abs(resLat - epaLat) < threshold && 
                           Math.abs(resLon - epaLon) < threshold;
                });

                return {
                    ...reservation,
                    epaData: matchingEpaFeature?.properties || null
                };
            });

            setReservations(enhancedReservations);
        };

        if (stateName) {
            loadAllData();
        }
    }, [stateName]);

    const handleReservationClick = (reservation) => {
        setSelectedReservation(reservation);
        setIsModalOpen(true);
    };

    if (!stateData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-8 capitalize border-b pb-4">
                {stateName.replace(/-/g, ' ')}
            </h1>
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    <span className="mr-2">Tribal Nations in this state:</span>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                        {reservations.length}
                    </span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {reservations.map((reservation, index) => (
                        <div 
                            key={index} 
                            onClick={() => handleReservationClick(reservation)}
                            className="bg-gray-50 rounded-lg p-4 shadow-md cursor-pointer 
                                     hover:bg-gray-100 transition-colors duration-200"
                        >
                            <span className="text-gray-700 font-medium">
                                {reservation.properties.BASENAME}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
            {/* <div className="map-section rounded-lg overflow-hidden shadow-lg" style={{ height: "600px" }}>
                <LeafletMap />
            </div> */}

            <ReservationModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                reservation={selectedReservation}
            />
        </div>
    );
};

export default State;