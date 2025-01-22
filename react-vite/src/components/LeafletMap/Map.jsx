    import React, { useEffect, useState, useRef } from "react";
    import { MapContainer, TileLayer, GeoJSON, LayersControl, Popup } from "react-leaflet";
    import "leaflet/dist/leaflet.css";
    import * as L from 'leaflet';
    import * as esri from 'esri-leaflet';
import StatesList from "./StatesList";

    const ResourceMap = () => {
    const [geojsonData, setGeojsonData] = useState({ mainland: null, alaska: null, islands: null });
    const [stateData, setStateData] = useState(null);
    const [countyData, setCountyData] = useState(null);
    const [cityData, setCityData] = useState(null);
    const [selectedFeature, setSelectedFeature] = useState(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const [reservationsByState, setReservationsByState] = useState({});
    const [allReservations, setAllReservations] = useState(null);

    // Add a ref to store the map instance
    const mapRef = useRef(null);

    useEffect(() => {
        const fetchGeoJSONs = async () => {
        try {
            // Fetch tribal reservations data
            const response = await fetch("/other_reservation.geojson");
            const data = await response.json();
            setAllReservations(data);

            // Fetch state boundaries data
            const stateResponse = await fetch("/us-state-boundaries.geojson");
            const stateGeoJSON = await stateResponse.json();
            setStateData(stateGeoJSON);

            // Fetch county boundaries data
            const countyResponse = await fetch("/georef-united-states-of-america-county.geojson");
            const countyGeoJSON = await countyResponse.json();
            setCountyData(countyGeoJSON);

            // Fetch cities data
            const citiesResponse = await fetch("/us_cities.geojson");
            const citiesGeoJSON = await citiesResponse.json();
            // Filter cities to only include those with reservations nearby
            const citiesWithReservations = {
                ...citiesGeoJSON,
                features: citiesGeoJSON.features.filter(feature => {
                    const cityPoint = L.latLng(feature.geometry.coordinates[1], feature.geometry.coordinates[0]);
                    return data.features.some(reservation => {
                        const [lon, lat] = reservation.geometry.coordinates[0][0];
                        const reservationPoint = L.latLng(lat, lon);
                        return cityPoint.distanceTo(reservationPoint) <= 100000;
                    });
                })
            };
            setCityData(citiesWithReservations);

            // Separate features by region
            const mainland = data.features.filter((feature) => {
            const [lon, lat] = feature.geometry.coordinates[0][0];
            return lat > 24 && lat < 50 && lon > -125 && lon < -66;
            });

            const alaska = data.features.filter((feature) => {
            const [lon, lat] = feature.geometry.coordinates[0][0];
            return lat > 50 && lon < -130;
            });

            const islands = data.features.filter((feature) => {
            const [lon, lat] = feature.geometry.coordinates[0][0];
            return (
                (lat > 15 && lat < 25 && lon > -160 && lon < -150) || // Hawaii
                (lat > 17 && lat < 19 && lon > -68 && lon < -65) || // Puerto Rico
                (lat > 13 && lat < 15 && lon > 144 && lon < 146) // Guam
            );
            });

            setGeojsonData({
            mainland: { type: "FeatureCollection", features: mainland },
            alaska: { type: "FeatureCollection", features: alaska },
            islands: { type: "FeatureCollection", features: islands },
            });
        } catch (error) {
            console.error("Error loading GeoJSON:", error);
        }
        };

        fetchGeoJSONs();
    }, []);

    // Modify the useEffect for ArcGIS layer
    useEffect(() => {
        if (!mapRef.current) return;

        console.log("Adding EPA layer..."); // Debug log

        // Add the EPA IRA layer
        const epaLayer = esri.featureLayer({
            url: 'https://services.arcgis.com/cJ9YHowT8TU7DUyn/arcgis/rest/services/epa_ira/FeatureServer/0',
            where: "Disadvantaged = 'Yes' AND (American_Indian_Reservations = 'Yes' OR Alaska_Native_Villages = 'Yes' OR Alaska_Native_Allotments = 'Yes')",
            style: function (feature) {
                return {
                    color: '#ff0000', // Changed to red for visibility
                    weight: 2,
                    opacity: 0.8,
                    fillOpacity: 0.4
                };
            },
            onEachFeature: function (feature, layer) {
                layer.bindPopup(() => {
                    const properties = feature.properties;
                    const propertyList = Object.entries(properties)
                        .map(([key, value]) => `<p><strong>${key}:</strong> ${value || 'N/A'}</p>`)
                        .join('');
                    
                    return `<div>
                        <h3>EPA IRA Community</h3>
                        ${propertyList}
                    </div>`;
                });
            }
        }).addTo(mapRef.current);

        // Debug event handlers
        epaLayer.on('loading', function() {
            console.log('EPA layer loading...');
        });
        
        epaLayer.on('load', function() {
            console.log('EPA layer loaded!');
        });

        epaLayer.on('error', function(e) {
            console.error('Error loading EPA layer:', e);
        });

        return () => {
            if (mapRef.current && epaLayer) {
                mapRef.current.removeLayer(epaLayer);
            }
        };
    }, [mapRef.current]); // Only run when map instance changes

    // Function to handle feature click and show metadata
    const onEachFeature = (feature, layer) => {
        console.log(feature)
        layer.on({
        click: (e) => {
            setSelectedFeature({
            name: feature.properties["BASENAME"] || "Unknown Location",
            centlat: feature.properties["CENTLAT"]|| "No type available",
            centlng: feature.properties["CENTLON"] || "No description available",
            fullData: feature.properties,
            coordinates: e.latlng,
            });
            setIsExpanded(false);
        },
        });
    };

    const onEachState = (feature, layer) => {
        layer.on({
            click: (e) => {
                const stateName = feature.properties.name;
                // Find all reservations within this state's bounds
                const bounds = layer.getBounds();
                const stateReservations = allReservations?.features.filter(reservation => {
                    const [lon, lat] = reservation.geometry.coordinates[0][0];
                    const point = L.latLng(lat, lon);
                    return bounds.contains(point);
                }).map(reservation => reservation.properties.BASENAME) || [];

                setSelectedFeature({
                    name: stateName,
                    coordinates: e.latlng,
                    isState: true,
                    reservations: stateReservations
                });
            }
        });
    };

    const onEachCounty = (feature, layer) => {
        layer.on({
            click: (e) => {
                const countyName = feature.properties.name;
                // Find all reservations within this county's bounds
                const bounds = layer.getBounds();
                const countyReservations = allReservations?.features.filter(reservation => {
                    const [lon, lat] = reservation.geometry.coordinates[0][0];
                    const point = L.latLng(lat, lon);
                    return bounds.contains(point);
                }).map(reservation => reservation.properties.BASENAME) || [];

                setSelectedFeature({
                    name: countyName,
                    coordinates: e.latlng,
                    isCounty: true,
                    reservations: countyReservations
                });
            }
        });
    };

    const onEachCity = (feature, layer) => {
        layer.on({
            click: (e) => {
                const cityName = feature.properties.name;
                // Find all reservations within 100km radius of the city
                const cityPoint = L.latLng(feature.geometry.coordinates[1], feature.geometry.coordinates[0]);
                const cityReservations = allReservations?.features.filter(reservation => {
                    const [lon, lat] = reservation.geometry.coordinates[0][0];
                    const reservationPoint = L.latLng(lat, lon);
                    return cityPoint.distanceTo(reservationPoint) <= 100000; // 100km in meters
                }).map(reservation => reservation.properties.BASENAME) || [];

                setSelectedFeature({
                    name: cityName,
                    coordinates: [feature.geometry.coordinates[1], feature.geometry.coordinates[0]],
                    isCity: true,
                    reservations: cityReservations
                });
            }
        });
    };

    const hasReservationsNearby = (feature, type) => {
        if (!allReservations) return false;
        
        if (type === 'state') {
            const bounds = L.geoJSON(feature).getBounds();
            return allReservations.features.some(reservation => {
                const [lon, lat] = reservation.geometry.coordinates[0][0];
                return bounds.contains(L.latLng(lat, lon));
            });
        } else if (type === 'county') {
            const bounds = L.geoJSON(feature).getBounds();
            return allReservations.features.some(reservation => {
                const [lon, lat] = reservation.geometry.coordinates[0][0];
                return bounds.contains(L.latLng(lat, lon));
            });
        }
        return false;
    };

    const center = [37.54812, -77.44675];

    return (
        <div style={{ height: "100vh", width: "100%", zIndex: 1 }}>
        <MapContainer 
            center={center} 
            zoom={4} 
            style={{ height: "100%", width: "100%" }}
            ref={mapRef} // Add ref to MapContainer
        >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />

            {/* Map Key */}
            <div className="leaflet-bottom leaflet-right" style={{ margin: "20px", backgroundColor: "white", padding: "10px", borderRadius: "5px" }}>
                <div>
                    <p><strong>Key:</strong></p>
                    <br></br>
                    <div style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
                        <div style={{ 
                            width: "20px", 
                            height: "20px", 
                            backgroundColor: "#ff0000", 
                            marginRight: "5px", 
                            opacity: 0.4 
                        }}></div>
                        <span>Disadvantaged Communities</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
                        <div style={{ 
                            width: "20px", 
                            height: "20px", 
                            backgroundColor: "#22c55e",
                            borderRadius: "50%",
                            border: "1px solid #000",
                            marginRight: "5px"
                        }}></div>
                        <span>Cities with Reservations Nearby</span>
                    </div>
                </div>
            </div>

            <LayersControl position="topright">
            {/* State Boundaries Layer */}
            <LayersControl.Overlay checked name="State Boundaries">
                {stateData && <GeoJSON 
                    data={stateData}
                    style={(feature) => ({
                        color: hasReservationsNearby(feature, 'state') ? '#2563eb' : '#666',
                        weight: 1,
                        fillOpacity: 0.1,
                        fillColor: hasReservationsNearby(feature, 'state') ? '#2563eb' : '#666'
                    })}
                    onEachFeature={onEachState}
                />}
            </LayersControl.Overlay>

            {/* County Boundaries Layer */}
            <LayersControl.Overlay name="County Boundaries">
                {countyData && <GeoJSON 
                    data={countyData}
                    style={(feature) => ({
                        color: hasReservationsNearby(feature, 'county') ? '#2563eb' : '#999',
                        weight: 1,
                        fillOpacity: 0.1,
                        fillColor: hasReservationsNearby(feature, 'county') ? '#2563eb' : '#999'
                    })}
                    onEachFeature={onEachCounty}
                />}
            </LayersControl.Overlay>

            {/* Cities Layer */}
            <LayersControl.Overlay name="Cities with Reservations">
                {cityData && <GeoJSON 
                    data={cityData}
                    pointToLayer={(feature, latlng) => L.circleMarker(latlng, {
                        radius: 8,
                        fillColor: "#22c55e",
                        color: "#000",
                        weight: 1,
                        opacity: 1,
                        fillOpacity: 0.8
                    })}
                    onEachFeature={onEachCity}
                />}
            </LayersControl.Overlay>

            <LayersControl.Overlay checked name="Continental U.S.">
                {geojsonData.mainland && <GeoJSON data={geojsonData.mainland} onEachFeature={onEachFeature} />}
            </LayersControl.Overlay>

            <LayersControl.Overlay checked name="Alaska">
                {geojsonData.alaska && <GeoJSON data={geojsonData.alaska} onEachFeature={onEachFeature} />}
            </LayersControl.Overlay>

            <LayersControl.Overlay checked name="Hawaii & Islands">
                {geojsonData.islands && <GeoJSON data={geojsonData.islands} onEachFeature={onEachFeature} />}
            </LayersControl.Overlay>

            {/* Modified EPA layer control */}
            <LayersControl.Overlay checked name="EPA IRA Communities">
                {/* Layer added programmatically */}
            </LayersControl.Overlay>
            </LayersControl>

            {selectedFeature && (
            <Popup position={selectedFeature.coordinates}>
                <div className="p-4 bg-white shadow-lg rounded-lg w-64">
                    <h4 className="text-lg font-bold text-gray-800">{selectedFeature.name}</h4>
                    
                    {(selectedFeature.isState || selectedFeature.isCounty || selectedFeature.isCity) ? (
                        <div>
                            <h5 className="text-md font-semibold text-gray-700 mt-2">
                                Reservations {selectedFeature.isCity ? 'within 100km of this city' : 
                                            `in this ${selectedFeature.isState ? 'state' : 'county'}`}:
                            </h5>
                            {selectedFeature.reservations.length > 0 ? (
                                <ul className="mt-2 max-h-40 overflow-y-auto">
                                    {selectedFeature.reservations.map((reservation, index) => (
                                        <li key={index} className="text-sm text-gray-600 mb-1">• {reservation}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-sm text-gray-600 mt-2">
                                    No reservations found {selectedFeature.isCity ? 'near this city' : 
                                    `in this ${selectedFeature.isState ? 'state' : 'county'}`}.
                                </p>
                            )}
                        </div>
                    ) : (
                        <>
                            <p className="text-sm text-gray-600 mt-2">
                                <strong className="text-gray-900">Nation:</strong> {selectedFeature.name}
                            </p>
                            <p className="text-sm text-gray-600">
                                <strong className="text-gray-900">Center Latitude:</strong> {selectedFeature.centlat}
                            </p>
                            <p className="text-sm text-gray-600">
                                <strong className="text-gray-900">Center Longitude:</strong> {selectedFeature.centlng}
                            </p>
                            
                            <button 
                                onClick={() => setIsExpanded(!isExpanded)}
                                className="mt-3 w-full bg-blue-600 text-white py-1 px-3 rounded-md text-sm font-medium hover:bg-blue-700 transition"
                            >
                                {isExpanded ? "Hide Details ▲" : "Show More ▼"}
                            </button>
                            
                            {isExpanded && (
                                <div className="mt-3 max-h-40 overflow-y-auto bg-gray-100 p-2 rounded border border-gray-300">
                                    <pre className="text-xs text-gray-700">{JSON.stringify(selectedFeature.fullData, null, 2)}</pre>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </Popup>
            )}
        </MapContainer>
        <StatesList stateData={stateData} allReservations={allReservations} cityData={cityData} countyData={countyData} />
        </div>
    );
    };

    export default ResourceMap;
