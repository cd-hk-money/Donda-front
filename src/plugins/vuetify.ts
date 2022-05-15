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
    themes: {
      light: {
        primary: '#FFFFFF',
        secondary: '#DCDCDC',
        info: '#DCDCDC'
      },
      dark: {
        primary: '#FFFFFF',
        secondary: '#696969',
        info: '#000000'
      },      
    }
  }
});