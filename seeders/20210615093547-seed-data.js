module.exports = {
  up: async (queryInterface) => {
    const appointments = [
      {
        description: 'Hunter James Kelly Research Institute, Ellicott Street, Buffalo, NY, USA',
        start_date: new Date('2021-05-24T19:00:00.000Z'),
        end_date: new Date('2021-05-24T20:00:00.000Z'),
        trip_id: 1,
        main_text: '',
        secondary_text: '',
        place_id: '',
        types: '{}',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        description: 'H. J. Kitchen & Bath, Midwest Road, Scarborough, ON, Canada',
        start_date: new Date('2021-05-25T17:00:00.000Z'),
        end_date: new Date('2021-05-25T18:00:00.000Z'),
        trip_id: 1,
        main_text: '',
        secondary_text: '',
        place_id: '',
        types: '{}',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        description: 'HJK GHJ, Airport Road, Caledon East, ON, Canada',
        start_date: new Date('2021-05-25T19:00:00.000Z'),
        end_date: new Date('2021-05-25T20:35:00.000Z'),
        trip_id: 1,
        main_text: '',
        secondary_text: '',
        place_id: '',
        types: '{}',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        description: 'Bnj-kunststoffe GmbH, Wilhelmstraße, Bad Lippspringe, Germany',
        start_date: new Date('2021-05-26T19:00:00.000Z'),
        end_date: new Date('2021-05-26T21:00:00.000Z'),
        trip_id: 1,
        main_text: '',
        secondary_text: '',
        place_id: '',
        types: '{}',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        description: 'HJKL LLP, Main Street, Fort Lee, NJ, USA',
        start_date: new Date('2021-05-27T18:00:00.000Z'),
        end_date: new Date('2021-05-27T19:00:00.000Z'),
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
