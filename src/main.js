import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false;
Vue.prototype.$parcel_types = ["AG","CA","CF","CI","CS","CV","ED","FL","FO","FS","FV","FY","IM","IV","OC","OF","OV","PA","PR","PS","FF","TA","TH","VF","VI","VO","ZC","ZU","ZV"];
Vue.prototype.$parcel_transform = {
  "AG": ["AG"],
  "IV": ["IV"],
  "CI": ["CI", "CF", "CS", "CV"],
  "OV": ["OV", "OC", "OF"],
  "PA": ["PA", "PR", "PS"],
  "FO": ["FO"],
  "FY": ["FY", "FF"],
  "VI": ["VI", "VF", "VO"],
  "FS": ["FS", "FL", "FV"],
  "TA": ["TA", "TH"],
  // "ED": ["ED", "ZC", "ZU", "ZV"],
  // "CA": ["CA"],
  "IM": ["IM"],
};
Vue.prototype.$parcel_names = ["Water", "Greenhouse", "Citrus", "Olive", "Pasture", "Forest", "Fruit", "Vineyard", "Nuts", "Soil", /*"Buildings", "Road", */"Fallow"];
Vue.prototype.$is_authenticated = Vue.observable({ value: false });

// eslint-disable-next-line no-unused-vars
var map = new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
//console.log(map.$children[0].hide_co2);
