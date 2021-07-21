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
  assets: {
    styles: ['https://unpkg.com/leaflet@1.7.1/dist/leaflet.css'],
  },
  dashboard: {
    component: AdminBro.bundle('./dashboard'),
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
            components: {
              edit: AdminBro.bundle('./tinymce'),
            },
            isVisible: {
              show: true, edit: true, filter: false, list: false
            },
          },
          map: {
            isVisible: {
              show: false, edit: true, filter: false, list: false
            },
            components: {
              edit: AdminBro.bundle('./map'),
            },
          },
          updatedAt: {
            isVisible: {
              show: true, edit: false, filter: true, list: false
            },
          },
          createdAt: {
            isVisible: {
              show: true, edit: false, filter: true, list: false
            },
          },
          name: {
            isVisible: {
              show: false, edit: true, filter: true, list: true
            },
          },
        },
      } 
    },
    {
      resource: db.User,
      options: {
        icon: 'User',
        parent: {
          name: 'User Management',
          icon: 'User',
        },
        properties: {
          encryptedPassword: {
            isVisible: false,
          },
          password: {
           type: 'password',      
           isVisible: {
              show: false,
              edit: true,
              list: false,
              filter: false
            }
          }
        }
      }
    }
  ],
});


module.exports = adminBro;