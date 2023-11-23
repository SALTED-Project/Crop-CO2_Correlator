<template>
  <div>
    <header id="topnav"> 
      <p>
          <a id="topnav_title">Crop-CO2 correlator</a>
          <a id="topnav_salted" href="https://salted-project.eu/"><img src="../assets/salted_logo_negativo.png" alt="Logo SALTED"></a>
          <a id="topnav_amper" href="https://www.grupoamper.com/"><img src="../assets/logo_grupoamper.png" alt="Logo AMPER"></a>
      </p>
    </header>
    <div id="map_data_popup" class="popup_map_data">
      <ul>
        <li id="map_data_show_co2" class="map_data_button" @click="toggle_show_co2">Show CO2 data</li>
        <li id="map_data_show_parcels" class="map_data_button" @click="toggle_show_all_parcels">Show crop data</li>
      </ul>
    </div>
    <div id="select_parcels_popup" class="popup_select_parcels">
      <ul>
        <li id="parcel_button_water" class="select_parcels_button active" @click="toggle_show_parcel('AG')">Water</li>
        <li id="parcel_button_greenhouse" class="select_parcels_button active" @click="toggle_show_parcel('IV')">Greenhouse</li>
        <li id="parcel_button_citrus" class="select_parcels_button active" @click="toggle_show_parcel('CI')">Citrus</li>
        <li id="parcel_button_olive" class="select_parcels_button active" @click="toggle_show_parcel('OV')">Olive</li>
        <li id="parcel_button_pasture" class="select_parcels_button active" @click="toggle_show_parcel('PA')">Pasture</li>
        <li id="parcel_button_forest" class="select_parcels_button active" @click="toggle_show_parcel('FO')">Forest</li>
        <li id="parcel_button_fruit" class="select_parcels_button active" @click="toggle_show_parcel('FY')">Fruit</li>
        <li id="parcel_button_vineyard" class="select_parcels_button active" @click="toggle_show_parcel('VI')">Vineyard</li>
        <li id="parcel_button_nuts" class="select_parcels_button active" @click="toggle_show_parcel('FS')">Nuts</li>
        <li id="parcel_button_soil" class="select_parcels_button active" @click="toggle_show_parcel('TA')">Soil</li>
        <!-- <li id="parcel_button_buildings" class="select_parcels_button active" @click="toggle_show_parcel('ED')">Buildings</li> -->
        <!-- <li id="parcel_button_road" class="select_parcels_button active" @click="toggle_show_parcel('CA')">Road</li> -->
        <li id="parcel_button_fallow" class="select_parcels_button active" @click="toggle_show_parcel('IM')">Fallow</li>
      </ul>
    </div>
    <div id="parcel_distribution_popup" class="popup">
      <p>The following chart depicts the percentage of crops of every kind, as well as its total number by hovering: <button class="close_popups" type='button'>X</button></p>
      <div id="parcel_distribution_chart"></div>
    </div>
    <div id="co2_by_parcel_popup" class="popup">
      <p>The following chart depicts the minimum, maximum, and mean values of CO2, as well as the variance, in every kind of crop:<button class="close_popups" type='button'>X</button></p>
      <div id="co2_distribution_complete_chart"></div>
    </div>
    <div id="button_panel">
      <ul>
        <li id=map_data>Map data</li>
        <li id=select_parcels>Select crops</li>
        <li id=parcel_distribution>See crop distribution</li>
        <li id=co2_by_parcel>See CO2 by crop</li>
      </ul>
      <div>

      </div>
    </div>
      <l-map
      :zoom="zoom"
      :center="center"
      @update:zoom="zoom_updated"
      id="map" 
    >
    <l-control :position="'topright'" class="legend_co2">
      <div>
        <div class="legend_co2_wrapper">
          <i style="background: #ffffffbb"></i>
          <i style="background: #eeeeeebb"></i>
          <i style="background: #ddddddbb"></i>
          <i style="background: #ccccccbb"></i>
          <i style="background: #bbbbbbbb"></i>
          <i style="background: #aaaaaabb"></i>
          <i style="background: #999999bb"></i>
          <i style="background: #888888bb"></i>
          <i style="background: #777777bb"></i>
          <i style="background: #666666bb"></i>
          <i style="background: #555555bb"></i>
          <i style="background: #444444bb"></i>
          <i style="background: #333333bb"></i>
          <i style="background: #222222bb"></i>
          <i style="background: #111111bb"></i>
          <i style="background: #000000bb"></i>
        </div>
        <div class="legend_co2_wrapper">
          <p id="legend_co2_0">0.0</p>
          <p id="legend_co2_text">CO2 (kg/m²)</p>
          <p id="legend_co2_1">>1.0</p>
        </div>
      </div>
    </l-control>
    <l-control :position="'topright'" class="legend_parcel">
      <ul>
        <li style="border-left: 20px solid #00cdf1">Water</li> <!-- AG -->
        <li style="border-left: 20px solid #3185FC">Greenhouse</li> <!-- IV -->
        <li style="border-left: 20px solid #FFBA08">Citrus</li> <!-- CF, CI, CS, CV -->
        <li style="border-left: 20px solid #33a63a">Olive</li> <!-- OC, OF, OV -->
        <li style="border-left: 20px solid #8FE388">Pasture</li> <!-- PA, PR, PS -->
        <li style="border-left: 20px solid #00844b">Forest</li> <!-- FO -->
        <li style="border-left: 20px solid #D00000">Fruit</li> <!-- FY, FF -->
        <li style="border-left: 20px solid #5D2E8C">Vineyard</li> <!-- VF, VI, VO -->
        <li style="border-left: 20px solid #9f7a35">Nuts</li> <!-- FL, FS, FV -->
        <li style="border-left: 20px solid #684A00">Soil</li> <!-- TA, TH -->
        <!-- <li style="border-left: 20px solid #a13325">Buildings</li> ED, ZC, ZU, ZV -->
        <!-- <li style="border-left: 20px solid #545355">Road</li> CA -->
        <li style="border-left: 20px solid #242222">Fallow</li> <!-- IM -->
      </ul>
    </l-control>
    <div id="msg_display_wrapper">
    <l-control :position="'bottomleft'" class="msg_display" v-if="loading">
      <div ref="loading_msg">Loading data... <br/><br/></div>
    </l-control>
    </div>
      <l-tile-layer
        :url="url"
        :attribution="attribution"
      />
      <l-geo-json id="geojson_parcel"
        v-if="show_zoom && show_parcels_user"
        :geojson="geojson_parcel"
        :options-style="styleFunction_parcel"
      />
      <l-geo-json id="geojson_co2"
        v-if="show_zoom && show_co2_user"
        :geojson="geojson_co2"
        :options="options_co2"
        :options-style="styleFunction_co2"
        ref="co2"
      />
    </l-map>
  </div>
</template>

<script>
import { LMap, LTileLayer, LGeoJson, LControl } from "vue2-leaflet";
import ApexCharts from "apexcharts";

export default {
  name: "SaltedMap",
  components: {
    LMap,
    LTileLayer,
    LGeoJson,
    LControl
  },
  data() {
    return {
      loading: false,
      show_zoom: (process.env.VUE_APP_INITIAL_ZOOM >= process.env.VUE_APP_THRESHOLD_ZOOM),
      show_co2_user: (process.env.VUE_APP_INITIAL_SHOW == 'True'),
      show_parcels_user: (process.env.VUE_APP_INITIAL_SHOW == 'True'),
      enableTooltip: (process.env.VUE_APP_SHOW_TOOLTIP == 'True'),
      zoom: parseInt(process.env.VUE_APP_INITIAL_ZOOM),
      center: [parseFloat(process.env.VUE_APP_INITIAL_LAT), parseFloat(process.env.VUE_APP_INITIAL_LON)],
      geojson_parcel: null,
      geojson_co2: null,
      geojson_parcel_hidden: null,
      parcel_co2_list: null,
      parcel_distribution: null,
      co2_complete_distribution: null,
      //url: 'https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}.png',
      //url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      url: 'https://a.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    };
  },
  computed: {
    getParcelColor() {
      return (parcel) => {
        switch(parcel) {
          case "AG":
            return '#00cdf1';
          case "CA":
            return '#545355';
          case "CF":
          case "CI":
          case "CS":
          case "CV":
            return '#FFBA08';
          case "FO":
            return '#00844b';
          case "FL":
          case "FS":
          case "FV":
            return '#9f7a35';
          case "FY":
          case "FF":
            return '#D00000';
          case "IM":
            return '#242222';
          case "IV":
            return '#3185FC';
          case "OC":
          case "OF":
          case "OV":
            return '#33a63a';
          case "PA":
          case "PR":
          case "PS":
            return '#8FE388';
          case "TA":
          case "TH":
            return '#684A00';
          case "VF":
          case "VI":
          case "VO":
            return '#5D2E8C';
          case "ZC":
          case "ZU":
          case "ZV":
          case "ED":
            return '#a13325';
          default:
            return "#195a17";
        }
      }
    },
    getCO2Color() {
      return (co2) => {
        let hexa = Math.floor(co2 * 15);
        if(hexa > 15) { hexa = 15; }
        hexa = 15 - hexa;
        return '#' + hexa.toString(16).repeat(6); 
      }
    },
    options_co2() {
      return {
        onEachFeature: this.onEachFeatureFunction_co2
      };
    },
    styleFunction_co2() {
      return (feature) => {
        return {
          weight: 0.1,
          color: "#000000",
          opacity: 0.7,
          fillColor: this.getCO2Color(feature.properties.co2),
          fillOpacity: 0.7,
          display: 'block'
        };
      };
    },
    onEachFeatureFunction_co2() {
      if (!this.enableTooltip) {
        return () => {};
      }
      return (feature, layer) => {
        layer.bindTooltip(
          "<div>CO2 (kg/m²): " +
            feature.properties.co2 +
            "</div>",
          { permanent: false, sticky: true }
        );
      };
    },
    styleFunction_parcel() {
      return (feature) => {
        return {
          weight: 0.1,
          color: "#000000",
          opacity: 1,
          fillColor: this.getParcelColor(feature.properties.parcel),
          fillOpacity: 1
        };
      };
    }
  },
  async created() {
    this.loading = true;
    
    // request co2 data
    var co2_json_data = [];
    let offset = 0;
    let count = 0;
    do {
      var co2_response = await fetch(process.env.VUE_APP_SCORPIO_ENDPOINT + "ngsi-ld/v1/entities?type=AirQualityObserved&offset="+offset.toString()+"&limit=1000&options=keyValues&attrs=location,co2&count=true", {
        headers: {"Link": '<https://raw.githubusercontent.com/SALTED-Project/contexts/main/wrapped_contexts/environment-context.jsonld>;rel="http://www.w3.org/ns/json-ld#context";type="application/ld+json"'},
      });
      count = parseInt(co2_response.headers.get('count'));
      //count = Math.min(parseInt(co2_response.headers.get('count')), 6000);
      offset += 1000;
      var co2_json_data_partial = await co2_response.json();
      co2_json_data.push(...co2_json_data_partial);
      // Update loading message
      this.$refs.loading_msg.innerHTML = "Loading data... </br>CO2 polygons loaded: " + 
        Math.min(count,offset).toString() + "/" + count.toString() +
        " </br>Parcel polygons loaded: 0";
    } while(offset < count);
    var parcel_json_data = [];
    let co2_count = count;

    // request parcel data
    offset = 0;
    do {
      var parcel_response = await fetch(process.env.VUE_APP_SCORPIO_ENDPOINT + "ngsi-ld/v1/entities?type=AgriParcel&offset="+offset.toString()+"&limit=1000&options=keyValues&attrs=category,location,hasAirQualityObserved&count=true", {
        headers: {"Link": '<https://raw.githubusercontent.com/SALTED-Project/contexts/main/wrapped_contexts/agrifood-context.jsonld>;rel="http://www.w3.org/ns/json-ld#context";type="application/ld+json"'},
      });
      count = parseInt(parcel_response.headers.get('count'));
      offset += 1000;
      var parcel_json_data_partial = await parcel_response.json();
      parcel_json_data.push(...parcel_json_data_partial);
      // Update loading message
      this.$refs.loading_msg.innerHTML = "Loading data... </br>CO2 polygons loaded: " + 
        co2_count.toString() + "/" + co2_count.toString() + 
        " </br>Crop polygons loaded: " + Math.min(count,offset).toString() + "/" + count.toString();
    } while(offset < count);
    var co2_geojson_data = {
      "type": "FeatureCollection",
      "features": []
    };

    // initialize parcel data
    var parcel_geojson_data = [];
    for(let i=0;i<29;i++) {
      parcel_geojson_data.push({
        "type": "FeatureCollection",
        "features": []
      })  
    }

    // map co2 data to geojson
    var co2_values = new Map();
    co2_json_data.forEach(feature => {
      co2_geojson_data["features"].push({
        "type": "Feature",
        "geometry": feature["location"],
        "properties": { "co2": feature["co2"] }
      });
      co2_values.set(feature["id"],feature["co2"]);
    });

    // map parcel data to geojson
    this.parcel_co2_list = Array.from( new Array(this.$parcel_types.length), function() { return []; } );
    parcel_json_data.forEach(feature => {
      let category = feature["category"].slice(0,2);
      let index = this.$parcel_types.indexOf(category);
      let related_airq = feature["hasAirQualityObserved"];
      if(!Array.isArray(related_airq)) {
        related_airq = [related_airq];
      }
      if(index < 0) { return; }
      parcel_geojson_data[index]["features"].push({
        "type": "Feature",
        "geometry": feature["location"],
        "properties": { "parcel": category }
      });
      // separate co2 values by parcel
      related_airq.forEach(airq => {
        if(!co2_values.has(airq)) { return }
        this.parcel_co2_list[index].push(co2_values.get(airq));
      });
    });
    
    // show data in the map
    this.geojson_co2 = co2_geojson_data;
    this.geojson_parcel = parcel_geojson_data;
    this.geojson_parcel_hidden = JSON.parse(JSON.stringify(this.geojson_parcel));
    if(process.env.VUE_APP_INITIAL_SHOW === "True") {
      document.getElementById('map_data_show_co2').classList.add('active');
      document.getElementById('map_data_show_parcels').classList.add('active');
    }
    this.init_buttons();
    this.loading = false;

    // generate graphs
    this.calculate_parcel_distribution();
    this.calculate_co2_complete_distribution();
  },
  async updated() {
    this.$nextTick(() => { // co2 should always be on top
      this.$refs.co2.mapObject.bringToFront();
    });
  },
  methods: {
    init_buttons() {
      var map_data = document.querySelector('#map_data');
      var map_data_popup = document.getElementById('map_data_popup');

      var select_parcels = document.querySelector('#select_parcels');
      var select_parcels_popup = document.getElementById('select_parcels_popup');

      var parcel_distribution = document.querySelector('#parcel_distribution');
      var parcel_distribution_popup = document.getElementById('parcel_distribution_popup');

      var co2_by_parcel = document.querySelector('#co2_by_parcel');
      var co2_by_parcel_popup = document.getElementById('co2_by_parcel_popup');

      var list_map_data = document.querySelectorAll('.map_data_button');
      var list_select_parcels = document.querySelectorAll('.select_parcels_button');
      var list_popup = document.querySelectorAll('.popup, .popup_map_data, .popup_select_parcels');
      var list_buttons = document.querySelectorAll('.close_popups');
      var list_parents = [map_data, select_parcels]; // only those where we want the hover color to stick

      map_data.addEventListener('click', function() { showPopup(map_data,map_data_popup) });
      select_parcels.addEventListener('click', function() { showPopup(select_parcels,select_parcels_popup) });
      parcel_distribution.addEventListener('click', function() { showPopup(parcel_distribution,parcel_distribution_popup) });
      co2_by_parcel.addEventListener('click', function() { showPopup(co2_by_parcel,co2_by_parcel_popup) });

      list_buttons.forEach(function(button) {
        button.addEventListener('click', closeAllPopups);
      });
      list_map_data.forEach(function(button) {
        button.addEventListener('click', triggerColor);
      });
      list_select_parcels.forEach(function(button) {
        button.addEventListener('click', triggerColor);
      });

      function showPopup(parent_id,popup_id) {
        if (popup_id.classList.contains('active')) {
          popup_id.classList.remove('active');
          parent_id.classList.remove('active');
        } else {
          closeAllPopups();
          popup_id.classList.add('active');
          list_parents.forEach(function(parent) {
            if (parent==parent_id) { parent.classList.add('active'); }
          });
        }
      }

      function closeAllPopups() {
        list_popup.forEach(function(popup) {
          if (popup.classList.contains('active')) {
            popup.classList.remove('active');
          }
        });
        list_parents.forEach(function(parent) {
          if (parent.classList.contains('active')) {
            parent.classList.remove('active');
          }
        });
      }

      function triggerColor() {
        if (this.classList.contains('active')) {
          this.classList.remove('active');
        } else {
          this.classList.add('active');
        }
      }
    },
    toggle_show_co2() {
      this.show_co2_user = !this.show_co2_user;
    },
    toggle_show_all_parcels() {
      this.show_parcels_user = !this.show_parcels_user;
    },
    toggle_show_parcel(category) {
      let index_list = [];
      if (!(category in this.$parcel_transform)) { return; }
      this.$parcel_transform[category].forEach(cat => {
        let this_index = this.$parcel_types.indexOf(cat);
        if(this_index < 0) { return; }
        index_list.push(this_index);
      });
      index_list.forEach(index => {
        if (this.geojson_parcel[index].features.length == 0) {
          this.geojson_parcel[index] = JSON.parse(JSON.stringify(this.geojson_parcel_hidden[index]));
        } else {
          this.geojson_parcel[index] = {
            "type": "FeatureCollection",
            "features": []
          };
        }
      });
      if(this.show_parcels_user) { //needed so it updates in real time
        this.geojson_parcel.push({
          "type": "FeatureCollection",
          "features": []
        });
        this.geojson_parcel.pop();
      }
    },
    calculate_parcel_distribution() {
      var count_list = [];
      for(const category of Object.values(this.$parcel_transform)) {
        var count = 0;
        category.forEach(cat => {
          let this_index = this.$parcel_types.indexOf(cat);
          count += this.geojson_parcel_hidden[this_index].features.length;
        });
        count_list.push(count);
      }

      this.parcel_distribution = {
        chart: {
          type: "pie",
          toolbar: {
            show: true,
            tools: {
              download: true,
            },
          },
        },
        series: count_list,
        labels: this.$parcel_names,
        colors: ["#00cdf1", "#3185FC", "#FFBA08", "#33a63a", "#8FE388", "#00844b", "#D00000", "#5D2E8C", "#9f7a35", "#684A00", "#a13325", "#545355", "#242222"],
        legend: {
          fontSize: "14px",
          fontFamily: "Arial, Helvetica, sans-serif",
          markers: {
            radius: 0,
            width: "12px",
            height: "12px",
            shape: "rectangle"
          },
        },
        tooltip: {
          y: {
            formatter: function(value) {
              return value + " parcels (" + (100*value/count_list.reduce((partialSum, a) => partialSum + a, 0)).toFixed(1) + "%)";
            }
          },
          style: {
            fontSize: "15px"
          }
        },
        dataLabels: {
          style: {
            fontSize: "15px"
          }
        } 
      };
      const chart = new ApexCharts(document.querySelector("#parcel_distribution_chart"), this.parcel_distribution);
      chart.render();
    },
    calculate_co2_complete_distribution() {

      var graph_list = Array.from( new Array(Object.keys(this.$parcel_transform).length), function() { return []; } );
      var graph_index = 0;
      for(const category of Object.values(this.$parcel_transform)) {
        category.forEach(cat => {
          let this_index = this.$parcel_types.indexOf(cat);
          graph_list[graph_index].push(...this.parcel_co2_list[this_index]);
        });
        graph_index += 1;
      }

      const mean = arr => arr.reduce( ( p, c ) => p + c, 0 ) / arr.length;
      const standardDeviation = arr => {
        if(arr.length < 2) { return 0; }
        return Math.sqrt(
          arr.reduce((acc, val) => acc.concat((val - mean(arr)) ** 2), []).reduce((acc, val) => acc + val, 0) /
            (arr.length - 1)
        );
      };

      var co2_mean = graph_list.map(function (element) { return mean(element).toFixed(3); });
      // var co2_var = graph_list.map(function (element) { return getVar(element).toFixed(5); });
      var co2_stddev = graph_list.map(function (element) { return standardDeviation(element).toFixed(3); });
      var co2_min = graph_list.map(function (element) {
        var min = Math.min(...element).toFixed(3);
        if(min == "Infinity") { return "0.000"; }
        return min;
      });
      var co2_max = graph_list.map(function (element) { return Math.max(...element, 0).toFixed(3); });
      
      // one standard deviation at each side: 68%; two std dev at each side: 95%
      var co2_full_data = Array.from( new Array(graph_list.length), function() { return []; } );
      for(var i = 0; i < graph_list.length; i++) {
        co2_full_data[i].push(this.$parcel_names[i]);
        co2_full_data[i].push(co2_min[i]);
        co2_full_data[i].push((Number(co2_mean[i]) - Number(co2_stddev[i])).toFixed(3)); // 2 * Number ...
        co2_full_data[i].push(co2_mean[i]);
        co2_full_data[i].push((Number(co2_mean[i]) + Number(co2_stddev[i])).toFixed(3)); // 2 * Number ...
        co2_full_data[i].push(co2_max[i]);
      }

      this.co2_complete_distribution = {
        chart: {
          type: 'boxPlot'
        },
        series: [{
          data: Array.from(co2_full_data, function (element) {
            return {
              x: element[0],
              y: element.slice(1)
            };
          }),
        }],
        plotOptions: {
          boxPlot: {
            colors: {
              upper: '#cccccc',
              lower: '#cccccc'
            }
          }
        },
        yaxis: {
          min: Math.min(...co2_min.filter((x) => x > 0)) - 0.03,
          max: Math.max(...co2_max) + 0.03,
          title: {
            text: 'CO2 (kg/m²)',
            style: {
              fontSize: "18px",
              fontFamily: "Arial, Helvetica, sans-serif",
              fontWeight: "normal"
            },
          },
          labels: {
            style: {
              fontSize: "14px",
              fontFamily: "Arial, Helvetica, sans-serif"
            },
          },
        },
        xaxis: {
          labels: {
            rotate: -45,
            rotateAlways: true,
            style: {
              fontSize: "17px",
              fontFamily: "Arial, Helvetica, sans-serif"
            }
          }
        },
        tooltip: {
          enabled: true,
          followCursor: true,
          // eslint-disable-next-line no-unused-vars
          custom: function({series, seriesIndex, dataPointIndex, w}) {
            var data = w.globals.initialSeries[seriesIndex].data[dataPointIndex];
            
            return '<div id="co2_distribution_tooltip"><p>' + data.x + '</p>' +
            '<ul>' +
            '<li><b>Maximum</b>: ' + data.y[4] + '</li>' +
            '<li><b>Mean + StDev</b>: ' + data.y[3] + '</li>' +
            '<li><b>Mean</b>: ' + data.y[2] + '</li>' +
            '<li><b>Mean - StDev</b>: ' + data.y[1] + '</li>' +
            '<li><b>Minimum</b>: ' + data.y[0] + '</li>' +
            '</ul></div>';
          },
          style: {
            fontSize: '15px',
            fontFamily: "Arial, Helvetica, sans-serif"
          },
        },
      };
      const chart = new ApexCharts(document.querySelector("#co2_distribution_complete_chart"), this.co2_complete_distribution);
      chart.render();
    },
    zoom_updated(zoom) {
      if(zoom < process.env.VUE_APP_THRESHOLD_ZOOM) {
        this.show_zoom = false;
      } else {
        this.show_zoom = true;
      }
    },
  }
};

</script>
