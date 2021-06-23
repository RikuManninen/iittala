const AdminBro = require('admin-bro');
const db = require('../models');
const AdminBroSequelize = require('@admin-bro/sequelize')

AdminBro.registerAdapter(AdminBroSequelize)

const adminBro = new AdminBro({
  rootPath: '/admin',
  databases: [db],
  branding: {
    companyName: 'Iittala App',
    softwareBrothers: false,
    logo: false,
  },
  resources: [
    { 
      resource: db.Marker, 
      options: {
        icon: 'Marker',
        parent: {
          name: 'Map',
          icon: 'Map',
        },
        properties: {
          content: {
            type: 'richtext',
            //components: {
            //  edit: AdminBro.bundle('./editor'),
            //}
          }
        },
      } 
    },
  ],
});


module.exports = adminBro;