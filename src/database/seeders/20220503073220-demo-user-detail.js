"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    //  Add seed commands here.

    //  Example:
    await queryInterface.bulkInsert(
      "user_detail",
      [
        {
          first_name: "ram",
          last_name: "katwal",
          gender: "male",
          dob: "1990-08-07",
          contact: "582151494651",
          address: "banwsor",
          email: "hari@df.com",
          user_id: "45",
        },
        {
          first_name: "Janetta",
          last_name: "Hesser",
          email: "jhesser0@tiny.cc",
          gender: "Female",
          dob: "6/4/2005",
          contact: "2428600427",
          address: "709 Springs Parkway",
          user_id: "80",
        },
        {
          first_name: "Lilyan",
          last_name: "Portis",
          email: "lportis1@wiley.com",
          gender: "Female",
          dob: "8/10/2019",
          contact: "1426995016",
          address: "37977 Dexter Crossing",
          user_id: "82",
        },
        {
          first_name: "Fanchon",
          last_name: "Foulsham",
          email: "ffoulsham2@weebly.com",
          gender: "Female",
          dob: "3/22/2002",
          contact: "7955166965",
          address: "5365 Chive Point",
          user_id: "83",
        },
        {
          first_name: "Alessandro",
          last_name: "Millberg",
          email: "amillberg3@photobucket.com",
          gender: "Male",
          dob: "7/23/1992",
          contact: "6564249330",
          address: "261 Mockingbird Pass",
          user_id: "85",
        },
        {
          first_name: "Tonya",
          last_name: "Bellenie",
          email: "tbellenie4@cisco.com",
          gender: "Female",
          dob: "6/7/2009",
          contact: "0297869523",
          address: "98 Summer Ridge Drive",
          user_id: "86",
        },
        {
          first_name: "Kathie",
          last_name: "Retter",
          email: "kretter5@flavors.me",
          gender: "Female",
          dob: "8/21/2019",
          contact: "8391302121",
          address: "47 Commercial Drive",
          user_id: "87",
        },
        {
          first_name: "Fiorenze",
          last_name: "Brackstone",
          email: "fbrackstone6@livejournal.com",
          gender: "Female",
          dob: "10/5/2000",
          contact: "9730472300",
          address: "972 Anniversary Way",
          user_id: "88",
        },
        {
          first_name: "Issy",
          last_name: "Najara",
          email: "inajara7@baidu.com",
          gender: "Female",
          dob: "6/26/1990",
          contact: "9940149956",
          address: "8 Mallory Circle",
          user_id: "96",
        },
        {
          first_name: "Gil",
          last_name: "Pinel",
          email: "gpinel8@cocolog-nifty.com",
          gender: "Male",
          dob: "11/13/1991",
          contact: "6360777800",
          address: "1377 Hanson Drive",
          user_id: "97",
        },
        {
          first_name: "Dietrich",
          last_name: "Maestrini",
          email: "dmaestrini9@godaddy.com",
          gender: "Male",
          dob: "6/5/1990",
          contact: "9949040728",
          address: "67 Barnett Crossing",
          user_id: "98",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("user_detail", null, {});
  },
};
