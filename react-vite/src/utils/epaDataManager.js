let cachedData = null;

export const epaDataManager = {
    async preloadData() {
        if (cachedData) {
            console.log('✅ Using memory-cached EPA data');
            return cachedData;
        }

        try {
            console.log('🔄 Fetching EPA data...');
            const response = await fetch('/api/epa-communities');
            if (!response.ok) throw new Error('Failed to fetch EPA data');
            
            const rawData = await response.json();
            // Store just the GeoJSON data portion
            cachedData = rawData.data;
            
            console.log('✨ Cached GeoJSON:', {
                type: cachedData?.type,
                features: cachedData?.features?.length
            });

            return cachedData;
        } catch (error) {
            console.error('❌ Error loading EPA data:', error);
            return null;
        }
    },

    getData() {
        return cachedData;
    }
};