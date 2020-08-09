import City from './city.model';

export default class CityManager {
  constructor(jsonCities) {
    this.cities = jsonCities.map((c, index) => {
      const newCity = c;
      newCity.id = index;
      return new City(newCity);
    });
  }

  getCity(cityid) {
    return this.cities.find(c => (c.id.toString() === cityid.toString()));
  }

  getCities() {
    return this.cities;
  }
}
