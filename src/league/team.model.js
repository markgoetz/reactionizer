export default class Team {
  constructor(data, expansion) {
    this.name = data.name;
    this.cityid = data.cityid;
    this.city = data.city;
    this.lat = data.lat;
    this.lon = data.lon;
    this.id = data.id;
    this.expansion = expansion;

    this.original_data = data;
  }

  getLogoID() {
    if (!this.expansion) {
      const id = this.name.toLowerCase().replace(' ', '');
      return `logo-${id}`;
    }

    return 'logo-expansion';
  }

  relocate(city) {
    this.city = city.city;
    this.cityid = city.id;
    this.lat = city.lat;
    this.lon = city.lon;
    this.relocated = true;
  }

  reset() {
    this.city = this.original_data.city;
    this.lat = this.original_data.lat;
    this.lon = this.original_data.lon;
    this.relocated = false;
  }
}
