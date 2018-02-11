import React, { Component } from "react";

import { YMaps, Map, Placemark } from "react-yandex-maps";

export default class YandexMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      center: [22.41406249999999, 3.588197],
      ymaps: null,
      cities: []
    };
  }
  
  handleApiAvaliable = ymaps => {
    this.setState({ ymaps: ymaps });
    //console.log(ymaps);
  };

  componentWillReceiveProps(props) {
    if (this.state.ymaps !== null)
      this.state.ymaps.geocode(props.cityName, { results: 1 }).then(
        res => {
          this.setState({
            cities: [
              ...this.state.cities,
              {
                center: res.geoObjects.get(0).geometry.getCoordinates(),
                name: props.cityName
              }
            ]
          });
        },
        err => {
          console.error(err);
        }
      );
  }

  render() {
    return (
      <YMaps onApiAvaliable={ymaps => this.handleApiAvaliable(ymaps)}>
        <Map
          state={{ center: this.state.center, zoom: 2 }}
          width={"100%"}
          height={"50%"}
        >
          {this.state.cities.map((item, index) => {
            return (
              <Placemark
                key={index}
                geometry={{
                  coordinates: item.center
                }}
                properties={{
                  hintContent: item.name,
                  balloonContent: item.name
                }}
              />
            );
          })}
        </Map>
      </YMaps>
    );
  }
}
