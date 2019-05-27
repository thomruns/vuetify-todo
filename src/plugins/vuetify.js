import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  iconfont: 'md',
  theme: {
    primary: '#9652ff',
    secondary: '#36F1cd',
    accent: '#39A0ED',
    success: '#3cd1c2',
    warning: '#ffaa2c',
    info: '#4C6085',
    error: '#f83e70'
  }
})
