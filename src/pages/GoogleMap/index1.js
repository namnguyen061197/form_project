import React, { useEffect, useState } from 'react';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

const MapContainer =(props) =>  {
  // this.state = {
  //   // for google map places autocomplete
  //   address: '',

  //   showingInfoWindow: false,
  //   activeMarker: {},
  //   selectedPlace: {},

  //   mapCenter: {
  //     lat: 49.2827291,
  //     lng: -123.1207375
  //   }
  // };
  const {addressMap} = props;
  const [stateMap, setStateMap] = useState({
    // for google map places autocomplete
    address: '',

    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},

    mapCenter: {
      lat: 49.2827291,
      lng: -123.1207375
    }
  })

  const handleChange = address => {
    // this.setState({ address });
    setStateMap({...stateMap,address:address})
  };
 
  const handleSelect = address => {
    // this.setState({ address });
    setStateMap({...stateMap,address:address})
    geocodeByAddress({address})
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        console.log('Success', latLng);

        // update center state
        // this.setState({ mapCenter: latLng });
        setStateMap({...stateMap, mapCenter: latLng})
      })
      .catch(error => console.error('Error', error));
  };
  useEffect(() => {
    // setStateMap({...stateMap,address:address})
    geocodeByAddress({addressMap})
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        console.log('Success', latLng);

        // update center state
        // this.setState({ mapCenter: latLng });
        setStateMap({...stateMap, mapCenter: latLng})
      })
      .catch(error => console.error('Error', error));
  },[])
  
  return (
    <div id='googleMaps' style={{height:"100vh"}}>
      <PlacesAutocomplete
        // value={this.state.address}
        value={stateMap.address}
        // onChange={this.handleChange}
        onChange={() => handleChange()}
        // onSelect={this.handleSelect}
        onSelect={() => handleSelect()}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input',
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafaf9', cursor: 'pointer' }
                  : { backgroundColor: '#fffff7', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>

      <Map 
        google={props.google}
        initialCenter={{
          // lat: this.state.mapCenter.lat,
          lat: stateMap.mapCenter.lat,
          lng: stateMap.mapCenter.lng
          // lng: this.state.mapCenter.lng
        }}
        center={{
          // lat: this.state.mapCenter.lat,
          // lng: this.state.mapCenter.lng,
          lat: stateMap.mapCenter.lat,
          lng: stateMap.mapCenter.lng
        }}
      >
        <Marker 
          position={{
            // lat: this.state.mapCenter.lat,
            // lng: this.state.mapCenter.lng,
            lat: stateMap.mapCenter.lat,
            lng: stateMap.mapCenter.lng
          }} />
      </Map>
    </div>
  )
}
export default GoogleApiWrapper({
  apiKey: ('AIzaSyB0eD7HrvyoF_VNj1zqlhS8EAzphj_6_eY')
})(MapContainer)