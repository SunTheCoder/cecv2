import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { epaDataManager } from '../utils/epaDataManager';

const ReservationModal = ({ isOpen, onClose, reservation }) => {
    if (!reservation) return null;

    const properties = reservation.properties;
    const epaCommunities = epaDataManager.getData();
    
    // Find matching EPA community data
    const epaData = epaCommunities?.features?.find(feature => {
        // Match based on location
        const [resLon, resLat] = reservation.geometry.coordinates[0][0];
        const [epaLon, epaLat] = feature.geometry.coordinates[0][0];
        const threshold = 0.01; // approximately 1km
        return Math.abs(resLat - epaLat) < threshold && 
               Math.abs(resLon - epaLon) < threshold;
    })?.properties;

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
                                <Dialog.Title as="h3" className="text-2xl font-bold text-gray-900 mb-4">
                                    {properties.BASENAME}
                                </Dialog.Title>

                                <div className="mt-4 space-y-4">
                                    {/* Location Information */}
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h4 className="font-semibold text-gray-700 mb-2">Location Details</h4>
                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                            <div>
                                                <p className="text-gray-600">Latitude</p>
                                                <p className="font-medium">{properties.CENTLAT}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-600">Longitude</p>
                                                <p className="font-medium">{properties.CENTLON}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* EPA Community Status */}
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h4 className="font-semibold text-gray-700 mb-2">EPA Community Status</h4>
                                        {epaData ? (
                                            <div className="space-y-4">
                                                {/* Primary Indicators */}
                                                <div className="space-y-2">
                                                    <StatusIndicator 
                                                        condition={epaData.Disadvantaged === 'Yes'}
                                                        label="Disadvantaged Community"
                                                        icon="⚠️"
                                                        description="Identified as disadvantaged based on environmental and economic factors"
                                                    />
                                                    <StatusIndicator 
                                                        condition={epaData.Low_Income === 'Yes'}
                                                        label="Low Income Community"
                                                        icon="💰"
                                                        description="Meets federal low-income criteria"
                                                    />
                                                    <StatusIndicator 
                                                        condition={epaData.Energy_Community === 'Yes'}
                                                        label="Energy Community"
                                                        icon="⚡"
                                                        description="Identified as an energy community under federal guidelines"
                                                    />
                                                </div>

                                                {/* Environmental Indicators */}
                                                <div>
                                                    <h5 className="font-medium text-gray-700 mb-2">Environmental Factors</h5>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <DataPoint 
                                                            label="Climate Risk Index"
                                                            value={epaData.Climate_Risk_Index}
                                                            icon="🌡️"
                                                        />
                                                        <DataPoint 
                                                            label="Air Quality Index"
                                                            value={epaData.Air_Quality_Index}
                                                            icon="💨"
                                                        />
                                                        <DataPoint 
                                                            label="Water Quality"
                                                            value={epaData.Water_Quality}
                                                            icon="💧"
                                                        />
                                                        <DataPoint 
                                                            label="Lead Exposure Risk"
                                                            value={epaData.Lead_Exposure_Risk}
                                                            icon="🏗️"
                                                        />
                                                    </div>
                                                </div>

                                                {/* Socioeconomic Indicators */}
                                                <div>
                                                    <h5 className="font-medium text-gray-700 mb-2">Socioeconomic Factors</h5>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <DataPoint 
                                                            label="Unemployment Rate"
                                                            value={epaData.Unemployment_Rate}
                                                            icon="👥"
                                                        />
                                                        <DataPoint 
                                                            label="Poverty Rate"
                                                            value={epaData.Poverty_Rate}
                                                            icon="📊"
                                                        />
                                                        <DataPoint 
                                                            label="Energy Burden"
                                                            value={epaData.Energy_Burden}
                                                            icon="💡"
                                                        />
                                                        <DataPoint 
                                                            label="Housing Burden"
                                                            value={epaData.Housing_Burden}
                                                            icon="🏠"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <p className="text-gray-500 italic">No EPA community data available for this location</p>
                                        )}
                                    </div>

                                    {/* Reservation Status */}
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h4 className="font-semibold text-gray-700 mb-2">Reservation Status</h4>
                                        <div className="space-y-2">
                                            <StatusIndicator 
                                                condition={properties.American_Indian_Reservations === 'Yes'}
                                                label="American Indian Reservation"
                                                icon="🏕️"
                                            />
                                            <StatusIndicator 
                                                condition={properties.Alaska_Native_Villages === 'Yes'}
                                                label="Alaska Native Village"
                                                icon="🌨️"
                                            />
                                            <StatusIndicator 
                                                condition={properties.Alaska_Native_Allotments === 'Yes'}
                                                label="Alaska Native Allotment"
                                                icon="📍"
                                            />
                                        </div>
                                    </div>

                                    {/* Additional Data */}
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h4 className="font-semibold text-gray-700 mb-2">Additional Information</h4>
                                        <div className="space-y-2 text-sm">
                                            {Object.entries(properties).map(([key, value]) => {
                                                // Skip already displayed properties
                                                if (['BASENAME', 'CENTLAT', 'CENTLON', 'Disadvantaged', 
                                                    'American_Indian_Reservations', 'Alaska_Native_Villages', 
                                                    'Alaska_Native_Allotments'].includes(key)) {
                                                    return null;
                                                }
                                                return (
                                                    <div key={key} className="grid grid-cols-2 gap-2">
                                                        <span className="text-gray-600">{key.replace(/_/g, ' ')}</span>
                                                        <span className="font-medium">{value}</span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 flex justify-end">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                        onClick={onClose}
                                    >
                                        Close
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

const StatusIndicator = ({ condition, label, icon, description }) => {
    if (!condition) return null;
    return (
        <div className="flex items-start space-x-2">
            <span className="mt-0.5">{icon}</span>
            <div>
                <span className="font-medium">{label}</span>
                {description && (
                    <p className="text-sm text-gray-500">{description}</p>
                )}
            </div>
        </div>
    );
};

const DataPoint = ({ label, value, icon }) => {
    if (!value) return null;
    return (
        <div className="flex items-center space-x-2">
            <span>{icon}</span>
            <div>
                <div className="text-sm text-gray-600">{label}</div>
                <div className="font-medium">{value}</div>
            </div>
        </div>
    );
};

export default ReservationModal; 