require('dotenv').config();
const mongoose = require('mongoose');
const City = require('../models/City');
const Event = require('../models/Event');
const Alert = require('../models/Alert');
const Traffic = require('../models/Traffic');
const Weather = require('../models/Weather');

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await City.deleteMany();
    await Event.deleteMany();
    await Alert.deleteMany();
    await Traffic.deleteMany();
    await Weather.deleteMany();

    // Add cities
    const cities = [
      {
        name: 'Agadir',
        coordinates: { lat: 30.427755, lon: -9.598107 },
        zoomLevel: 12
      },
      {
        name: 'Casablanca',
        coordinates: { lat: 33.573110, lon: -7.589843 },
        zoomLevel: 11
      },
      {
        name: 'Marrakech',
        coordinates: { lat: 31.629472, lon: -7.981084 },
        zoomLevel: 12
      },
      {
        name: 'Rabat',
        coordinates: { lat: 34.020882, lon: -6.841650 },
        zoomLevel: 12
      }
    ];

    const insertedCities = await City.insertMany(cities);
    console.log('Cities seeded successfully');

    //Find Agadir city ID
    const agadirCity = insertedCities.find(city => city.name === 'Agadir');

    // Add sample weather for Agadir
    const weatherData = [
      {
        city: agadirCity._id,
        temperature: 28,
        humidity: 65,
        windSpeed: 12,
        conditions: 'Sunny',
        airQuality: 'Good'
      }
    ];

    await Weather.insertMany(weatherData);
    console.log('Weather data seeded successfully');

    // Add sample events for Agadir
    const events = [
      {
        city: agadirCity._id,
        title: 'Agadir Summer Festival',
        description: 'Annual summer festival with music, food, and cultural events',
        category: 'festival',
        location: 'Place Al Amal',
        coordinates: { lat: 30.421, lon: -9.598 },
        startDate: new Date('2026-08-20'),
        endDate: new Date('2026-08-25'),
        organizer: 'City of Agadir',
        isFeatured: true
      },
      {
        city: agadirCity._id,
        title: 'Surf Competition',
        description: 'Annual surf competition at Taghazout beach',
        category: 'sports',
        location: 'Taghazout Beach',
        coordinates: { lat: 30.545, lon: -9.711 },
        startDate: new Date('2026-08-25'),
        endDate: new Date('2026-08-27'),
        organizer: 'Moroccan Surf Federation',
        isFeatured: true
      }
    ];

    await Event.insertMany(events);
    console.log('Events seeded successfully');

    // Add sample alerts for Agadir
    const alerts = [
      {
        city: agadirCity._id,
        type: 'weather',
        severity: 'high',
        title: 'Heatwave Warning',
        description: 'High temperatures expected until 6PM. Stay hydrated and avoid direct sun exposure.',
        location: 'Whole city',
        isActive: true
      },
      {
        city: agadirCity._id,
        type: 'safety',
        severity: 'medium',
        title: 'Strong Waves at Taghazout',
        description: 'Strong waves and currents reported at Taghazout beach. Swim with caution.',
        location: 'Taghazout Beach',
        coordinates: { lat: 30.545, lon: -9.711 },
        isActive: true
      }
    ];

    await Alert.insertMany(alerts);
    console.log('Alerts seeded successfully');

    // Add sample traffic incidents for Agadir
    const trafficIncidents = [
      {
        city: agadirCity._id,
        location: 'Souk El Had road',
        coordinates: { 
          type: 'Point',
          coordinates: [-9.598, 30.433]
        },
        congestionLevel: 'heavy',
        averageSpeed: 5,
        incidentType: 'construction',
        description: 'Road construction causing heavy traffic',
        isActive: true
      },
      {
        city: agadirCity._id,
        location: 'Marina roundabout',
        coordinates: { 
          type: 'Point',
          coordinates: [-9.611, 30.418]
        },
        congestionLevel: 'severe',
        incidentType: 'accident',
        description: 'Car accident blocking one lane',
        isActive: true
      }
    ];

    await Traffic.insertMany(trafficIncidents);
    console.log('Traffic incidents seeded successfully');

    console.log('All data seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();