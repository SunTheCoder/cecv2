import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

const ReservationModal = ({ isOpen, onClose, reservation }) => {
    if (!reservation) return null;

    const properties = reservation.properties;

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

                                    {/* Status Indicators */}
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h4 className="font-semibold text-gray-700 mb-2">Community Status</h4>
                                        <div className="space-y-2">
                                            <StatusIndicator 
                                                condition={properties.Disadvantaged === 'Yes'}
                                                label="Disadvantaged Community"
                                                icon="⚠️"
                                            />
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

const StatusIndicator = ({ condition, label, icon }) => {
    if (!condition) return null;
    return (
        <div className="flex items-center space-x-2 text-sm">
            <span>{icon}</span>
            <span className="font-medium">{label}</span>
        </div>
    );
};

export default ReservationModal; 