const jsSHA = require('jssha');
const faker = require('faker');

module.exports = {
  up: async (queryInterface) => {
    const users = [];
    for (let i = 0; i < 50; i += 1) {
      const shaObj = new jsSHA('SHA-256', 'TEXT', { encoding: 'UTF8' });
      shaObj.update('password');
      const userObj = {
        name: faker.internet.userName(),
        email: faker.internet.email(),
        password: shaObj.getHash('HEX'),
        created_at: new Date(),
        updated_at: new Date(),
      };
      users.push(userObj);
    }
    await queryInterface.bulkInsert('users', users);
    const trip = [{
      user_id: 1, country: 'Japan', city: 'Tokyo', start_date: '2021-07-20', end_date: '2021-07-25', created_at: new Date(), updated_at: new Date(),
    }];
    await queryInterface.bulkInsert('trips', trip);

    const appointments = [
      {
        text: 'Hunter James Kelly Research Institute, Ellicott Street, Buffalo, NY, USA',
        start_date: new Date('2021-05-24T19:00:00.000Z'),
        end_date: new Date('2021-05-24T20:00:00.000Z'),
        lat: 42.897995230726714,
        lng: -78.86721693028716,
        trip_id: 1,
        main_text: '',
        secondary_text: '',
        place_id: '',
        types: '{}',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        text: 'H. J. Kitchen & Bath, Midwest Road, Scarborough, ON, Canada',
        start_date: new Date('2021-05-25T17:00:00.000Z'),
        end_date: new Date('2021-05-25T18:00:00.000Z'),
        lat: 43.76531624950131,
        lng: -79.27247504192141,
        trip_id: 1,
        main_text: '',
        secondary_text: '',
        place_id: '',
        types: '{}',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        text: 'HJK GHJ, Airport Road, Caledon East, ON, Canada',
        start_date: new Date('2021-05-25T19:00:00.000Z'),
        end_date: new Date('2021-05-25T20:35:00.000Z'),
        lat: 43.86927068070543,
        lng: -79.86580236890859,
        trip_id: 1,
        main_text: '',
        secondary_text: '',
        place_id: '',
        types: '{}',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        text: 'Bnj-kunststoffe GmbH, Wilhelmstraße, Bad Lippspringe, Germany',
        start_date: new Date('2021-05-26T19:00:00.000Z'),
        end_date: new Date('2021-05-26T21:00:00.000Z'),
        lat: 51.78619891653598,
        lng: 8.81811168705537,
        trip_id: 1,
        main_text: '',
        secondary_text: '',
        place_id: '',
        types: '{}',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        text: 'HJKL LLP, Main Street, Fort Lee, NJ, USA',
        start_date: new Date('2021-05-27T18:00:00.000Z'),
        end_date: new Date('2021-05-27T19:00:00.000Z'),
        lat: 40.856427889655414,
        lng: -73.97888116710942,
        trip_id: 1,
        main_text: '',
        secondary_text: '',
        place_id: '',
        types: '{}',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];
    await queryInterface.bulkInsert('appointments', appointments);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('appointments', null, {});
  },
};
