import '@fortawesome/fontawesome-free/css/all.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'fa' || 'md'
  },
  theme: {
    dark: true,
    themes: {
      light: {
        secondary: '#DCDCDC',
        info: '#DCDCDC'
      },
      dark: {
        secondary: '#696969',
        info: '#000000'
      },      
    }
  }
});