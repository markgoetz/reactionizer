import City from './city.model';
import CityManager from './citymanager.model';

const testCity1 = {name: 'TestCity', lat:32, lon: -42 };
const testCity2 = {name: 'TestCity2', lat: 11, lon: -11 };

const testCities = [testCity1, testCity2];

let cityManager;

beforeEach(() => {
    cityManager = new CityManager(testCities);
});

test('retrieves a city by ID', () => {
    const city0 = cityManager.getCity(0);
    expect(city0).toBeInstanceOf(City);
    expect(city0.name).toBe(testCity1.name);
    expect(city0.lat).toBe(testCity1.lat);
    expect(city0.lon).toBe(testCity1.lon);

    const city1 = cityManager.getCity(1);
    expect(city1).toBeInstanceOf(City);
    expect(city1.name).toBe(testCity2.name);
    expect(city1.lat).toBe(testCity2.lat);
    expect(city1.lon).toBe(testCity2.lon);
});

test('returns null if a city is not found', () => {
    expect(cityManager.getCity(-1)).toBeNull;
});

test('retrieves the correct number of cities', () => {
    expect(cityManager.getCities()).toHaveLength(testCities.length);
});

test('retrieves the correct cities', () => {
    const cities = cityManager.getCities();
    expect(cities[0]).toBeInstanceOf(City);
    expect(cities[0].name).toBe(testCity1.name);
    expect(cities[0].lat).toBe(testCity1.lat);
    expect(cities[0].lon).toBe(testCity1.lon);

    expect(cities[1]).toBeInstanceOf(City);
    expect(cities[1].name).toBe(testCity2.name);
    expect(cities[1].lat).toBe(testCity2.lat);
    expect(cities[1].lon).toBe(testCity2.lon);
});