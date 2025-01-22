import { Link } from 'react-router-dom';
import { useState } from 'react';

const StatesList = ({ stateData, allReservations, cityData, countyData }) => {
    const [isExpanded, setIsExpanded] = useState(true);

    // Filter states that have reservations and sort alphabetically
    const statesWithReservations = stateData ? [...stateData.features].filter(state => {
        const stateBounds = L.geoJSON(state).getBounds();
        return allReservations.features.some(reservation => {
            const [lon, lat] = reservation.geometry.coordinates[0][0];
            const point = L.latLng(lat, lon);
            return stateBounds.contains(point);
        });
    }).sort((a, b) => {
        return a.properties.name.localeCompare(b.properties.name);
    }) : [];

    return (
        <div style={{ 
            position: 'absolute',
            left: '10px',
            top: '70px',
            zIndex: 1000
        }}>
            <div className={`bg-white rounded-r-lg shadow-lg transition-all duration-300 ${isExpanded ? 'w-64' : 'w-12'}`}>
                <button 
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="absolute -right-3 top-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
                    style={{zIndex: 1001}}
                    title={isExpanded ? "Hide states list" : "Show states with reservations"}
                >
                    {isExpanded ? '←' : '→'}
                </button>
                
                <div className={`${isExpanded ? 'opacity-100' : 'opacity-0 hidden'} p-4`}>
                    <h2 className="text-xl font-bold text-gray-800 mb-4">States with Reservations</h2>
                    <div className="flex flex-col space-y-2 max-h-[calc(100vh-120px)] overflow-y-auto">
                        {statesWithReservations.map(state => (
                            <Link 
                                key={state.properties.name}
                                to={`/states/${state.properties.name.toLowerCase()}`}
                                className="p-2 bg-blue-50 hover:bg-blue-100 rounded
                                         transition-colors duration-200
                                         text-blue-700 font-medium text-sm"
                            >
                                {state.properties.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatesList;