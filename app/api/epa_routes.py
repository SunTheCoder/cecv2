from flask import Blueprint, jsonify, make_response, request
import requests
from functools import lru_cache
import json
import time

bp = Blueprint('epa', __name__)

# Add timestamp to force fresh responses
LAST_FETCH_TIME = None

# LRU cache for EPA data
# maxsize=1 since we only cache one query, ttl handled by force refresh
@lru_cache(maxsize=1)
def fetch_epa_data():
    global LAST_FETCH_TIME
    print('\n🔍 CACHE STATUS: MISS - Fetching fresh data from ArcGIS')
    response = requests.post(
        'https://services.arcgis.com/cJ9YHowT8TU7DUyn/arcgis/rest/services/epa_ira/FeatureServer/0/query',
        data={
            'where': "Disadvantaged = 'Yes' AND (American_Indian_Reservations = 'Yes' OR Alaska_Native_Villages = 'Yes' OR Alaska_Native_Allotments = 'Yes')",
            'outFields': '*',
            'f': 'geojson',
            'geometryPrecision': 6
        }
    )
    
    if response.status_code != 200:
        raise requests.RequestException(f"ArcGIS API returned status {response.status_code}")
    
    LAST_FETCH_TIME = time.time()
    return response.json()

@bp.route('/epa-communities', methods=['GET'])
def get_epa_communities():
    try:
        # Check for force refresh
        force_refresh = request.args.get('refresh', 'false').lower() == 'true'
        
        if force_refresh:
            print('\n🔄 Force refreshing cache...')
            fetch_epa_data.cache_clear()
        
        # Get data (will use cached version if available)
        print('\n📥 Request received for EPA data')
        data = fetch_epa_data()
        
        response = make_response(jsonify({
            'data': data,
            'cached': LAST_FETCH_TIME is not None,
            'last_fetch': LAST_FETCH_TIME
        }))
        
        # Force fresh response every time
        response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate, max-age=0"
        response.headers["Pragma"] = "no-cache"
        response.headers["Expires"] = "0"
        response.headers["ETag"] = str(time.time())  # Force unique ETag
        
        print('✅ Response sent successfully')
        return response

    except requests.RequestException as e:
        print(f'\n🚨 Network Error: {str(e)}')
        return jsonify({'error': 'Failed to fetch EPA data'}), 500
    except Exception as e:
        print(f'\n🔥 Unexpected Error: {str(e)}')
        return jsonify({'error': 'Internal server error'}), 500