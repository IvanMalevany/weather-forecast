<template>
  <v-app id="inspire">
    <v-navigation-drawer
            v-model="drawer"
            app
    >
      <h1 v-text="$vuetify.lang.t('$vuetify.history')"></h1>

      <v-card
              class="mx-auto"
              tile
      >

        <v-list-item two-line v-for="city in historyView" :key="city.result.id" @click="setFromHistory(city)">
          <v-list-item-content>
            <v-list-item-title v-text="city.query"></v-list-item-title>
            <v-list-item-subtitle v-text="city.result.name"></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

      </v-card>

    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title v-text="$vuetify.lang.t('$vuetify.pageTitle')"></v-toolbar-title>

      <v-btn
              elevation="2"
              v-text="$vuetify.lang.t('$vuetify.lang.ru')"
              @click="setLang('ru')"
      ></v-btn>
      <v-btn
              elevation="2"
              v-text="$vuetify.lang.t('$vuetify.lang.en')"
              @click="setLang('en')"
      ></v-btn>
    </v-app-bar>

    <v-main>

      <div>
        <table>
          <tr>
            <td>
              <v-text-field
                      :label="$vuetify.lang.t('$vuetify.searchPlaceholder')"
                      :rules="rules"
                      v-model="search"
                      hide-details="auto"
              ></v-text-field>
              <v-alert
                      type="warning"
                      v-show="API_error || notFillError"
                      v-text="$vuetify.lang.t(`$vuetify.${notFillError? 'searchErrorRequired':'API_error'}`)"
              ></v-alert>
            </td>
            <td>
              <v-btn elevation="2" v-text="$vuetify.lang.t('$vuetify.initSearch')" @click="initSearch"></v-btn>
            </td>
          </tr>
        </table>
      </div>

      <v-simple-table v-if="current">
        <template v-slot:default>
          <thead>
          <tr>
            <th class="text-left" v-text="$vuetify.lang.t('$vuetify.widget.prop')"></th>
            <th class="text-left" v-text="$vuetify.lang.t('$vuetify.widget.value')"></th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td v-text="$vuetify.lang.t('$vuetify.widget.temperature.title')"></td>
            <td>{{
              $vuetify.lang.t('$vuetify.widget.temperature.denomination') + ': ' + current.main.temp + ' °C'
              + ', ' +
              $vuetify.lang.t('$vuetify.widget.temperature.feels') + ': ' + current.main.feels_like + ' °C'
              + ', ' +
              $vuetify.lang.t('$vuetify.widget.temperature.minimal') + ': ' + current.main.temp_min + ' °C'
              + ', ' +
              $vuetify.lang.t('$vuetify.widget.temperature.maximum') + ': ' + current.main.temp_max + ' °C'
              }}</td>
          </tr>
          <tr>
            <td v-text="$vuetify.lang.t('$vuetify.widget.pressure')"></td>
            <td v-text="current.main.pressure + ', ' + $vuetify.lang.t('$vuetify.widget.units.pressure')"></td>
          </tr>
          <tr>
            <td v-text="$vuetify.lang.t('$vuetify.widget.humidity')"></td>
            <td v-text="current.main.humidity + '%'"></td>
          </tr>
          <tr>
            <td v-text="$vuetify.lang.t('$vuetify.widget.condition.title')"></td>
            <td v-text="current.weather[0].description"></td>
          </tr>
          </tbody>
        </template>
      </v-simple-table>

    </v-main>
  </v-app>

</template>

<script>
import $vuetify from './plugins/vuetify'
import axios from 'axios'

export default {
  name: 'App',

  data: () => ({
    drawer: true,
    history: [],
    current: null,
    API_token: '737ee4624d99902008861c8236ca8c25',
    rules: [
        value => !!value || $vuetify.framework.lang.t('$vuetify.searchErrorRequired'),
        value => (value && value.length >= 3) || $vuetify.framework.lang.t('$vuetify.searchErrorMinLength'),
    ],
    search: '',
    API_error: false,
    notFillError: false
  }),
  watch: {
      search(){
          this.API_error = this.notFillError = false
      }
  },
  created(){
      this.history = JSON.parse(localStorage.getItem('history') || '[]')
      this.setLang(localStorage.getItem('lang') || $vuetify.userPreset.i18n.locale)
  },
  computed: {
      historyView(){
          return this.history.reverse();
      }
  },
  methods: {
      initSearch(){
          const vm = this;
          let query = vm.search.trim();
          if(query.length >= 3){
              let locale = $vuetify.userPreset.i18n.locale;
              axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(query)}&appid=${vm.API_token}&lang=${locale}&units=metric`)
                  .then(({data}) => {
                      vm.current = data;
                      if(!vm.history.find(city => city.result.id === data.id)){
                          vm.addToHistory({
                              query: query,
                              result: data
                          })
                      }
                  })
                  .catch(error => {
                      vm.API_error = true;
                      console.log(error);
                  })
          }
          else vm.notFillError = true;
      },
      addToHistory(data){
          this.history.push(data)
          localStorage.setItem('history', JSON.stringify(this.history))
      },
      setLang(newLang){
          $vuetify.userPreset.i18n.locale = newLang
          localStorage.setItem('lang', newLang)
      },
      setFromHistory({query, result}){
          this.search = query;
          this.current = result;
      }
  }
}
</script>
