const AdminBro = require('admin-bro');
const db = require('../models');
const adminBro = new AdminBro({
   rootPath: '/admin',
   databases: [db],
   branding: {
     companyName: 'Iittala App',
     softwareBrothers: false,
   }
});
module.exports = adminBro;