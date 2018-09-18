const faker = require('faker');
const fs = require('fs');
const path = require('path');

const hoods = ['Nob Hill', 'Tenderloin', 'Russian Hill', 'SOMA', 'Embarcadero', 'Marina', 'Hayes'];
const cuisine = ['American', 'Asian', 'Brunch', 'Burger', 'Chinese', 'Indian'];
const tipsChoices = ['Breakfast', 'Lunch', 'Dinner', 'Private Seating', 'Outdoor', 'Bar'];

// TODO
const generatePhotos = (num) => {
  const photos = [];

  for (let i = 0; i <= num; i++) {
    photos.push(`https://s3-us-west-1.amazonaws.com/food-zagat/images/food-${Math.floor(Math.random() * 59)}.jpg`);
  }
  return photos;
};

const generateReviews = (num) => {
  const generateReviews = [];
  for (let i = 0; i <= num; i++) {
    generateReviews.push({
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      date: faker.date.between('2012-01-01', '2015-12-31'),
      text: faker.lorem.paragraph(),
      profilePic: faker.image.people(),
      star: faker.random.boolean(),
      numOfStars: faker.random.number({ min: 1, max: 4 }),
    });
  }
  return generateReviews;
};

const generateWhatToOrder = (num) => {
  const WhatToOrder = [];
  for (let i = 0; i <= num; i++) {
    WhatToOrder.push({
      title: faker.commerce.productName(),
      img: faker.image.food(),
    });
  }
  return WhatToOrder;
};

const generatePublications = (num) => {
  const publications = [];
  for (let i = 0; i <= num; i++) {
    publications.push({
      img: faker.image.food(),
      title: faker.commerce.productName(),
      url: faker.internet.url(),
      date: faker.date.between('2012-01-01', '2015-12-31'),
    });
  }
  return publications;
};

const generateTips = (num) => {
  const tips = new Set();
  for (let i = 0; i <= num; i++) {
    tips.add(tipsChoices[faker.random.number({ min: 0, max: 5 })]);
  }
  return [...tips];
};

const createRestaurant = function (id) {
  const weekdayStart = `${faker.random.number({ min: 7, max: 12 })}:00 AM`;
  const weekdayEnd = `${faker.random.number({ min: 7, max: 12 })}:00 PM`;
  const companyName = faker.company.companyName();
  return {
    id,
    businessInfo: {
      name: companyName,
      location: {
        address: faker.address.streetAddress(),
        neighborhood: hoods[faker.random.number({ min: 0, max: 6 })],
      },
      phone: faker.phone.phoneNumberFormat(),
      times: {
        Sunday: [`${faker.random.number({ min: 8, max: 11 })}:00 AM`, `${faker.random.number({ min: 5, max: 8 })}:00 PM`],
        Monday: [weekdayStart, weekdayEnd],
        Tuesday: [weekdayStart, weekdayEnd],
        Wednesday: [weekdayStart, weekdayEnd],
        Thursday: [weekdayStart, weekdayEnd],
        Friday: [weekdayStart, weekdayEnd],
        Saturday: [
          `${faker.random.number({ min: 8, max: 11 })}:00 AM`,
          `${faker.random.number({ min: 5, max: 8 })}:00 PM`,
        ],
      },
      email: faker.internet.email(companyName),
      website: `www.${companyName.replace(/ /, '')}.com`,
      social: {
        facebook: faker.random.boolean(),
        instagram: faker.random.boolean(),
        linkedin: faker.random.boolean(),
      },
      tag: faker.company.catchPhrase(),
    },
    details: {
      dollarSigns: faker.random.number({ min: 1, max: 4 }),
      cuisine: cuisine[faker.random.number(5)],
      opentable: faker.random.boolean(),
      insideTips: faker.lorem.sentence(),
      knownFor: generateTips(faker.random.number(8)),
    },
    zagatReview: {
      description: faker.lorem.sentence(),
      review: faker.random.number({ min: 1, max: 5 }),
    },
    publications: generatePublications(faker.random.number(5)),
    photos: generatePhotos(faker.random.number(6)),
    whatToOrder: generateWhatToOrder(faker.random.number(5)),
    reviews: generateReviews(faker.random.number(5)),
  };
};

let count = 1;
const maxCount = 100;
const restaurants = [];
while (count <= maxCount) {
  const restaurant = createRestaurant(count);
  restaurants.push(restaurant);
  count += 1;
}

const json = JSON.stringify(restaurants, null, 2);
fs.writeFile(path.join(__dirname, 'seed_data', 'zagat-data.json'), json, 'utf8', () => console.log('Data generation done'));
