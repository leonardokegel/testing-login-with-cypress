const { default: axios } = require("axios");
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        async 'db:erase'() {
          const { data } = await axios.delete('http://localhost:4000/users');
          return data;
        },

        async 'db:create:user'(user) {
          const { data } = await axios.post('http://localhost:4000/users', user);
          return data;
        }
      })
    },
  },
});
