import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'
import VueI18n from 'vue-i18n'

Vue.use(Vuetify)
Vue.use(VueI18n)

const messages = {
    ru: {
        $vuetify: {
            pageTitle: 'Прогноз погоды',
            history: 'История',
            initSearch: 'Поиск',
            searchPlaceholder: 'Введите город...',
            searchErrorRequired: 'Поле не заполнено',
            searchErrorMinLength: 'Минимальная длинна 3 символа',
            lang: {
                ru: 'Русский',
                en: 'Английский',
            },
            widget: {
                prop: 'Свойство',
                value: 'Значение',
                temperature: {
                    title: 'Температура',
                    denomination: 'номинал',
                    feels: 'ощущается как',
                    minimal: 'минимальная',
                    maximum: 'максимальная'
                },
                pressure: 'давление',
                humidity: 'влажность',
                condition: {
                    title: 'состояние'
                },
                units: {
                    pressure: 'мм'
                }
            },
            API_error: 'Город не найден',
        }
    },
    en: {
        $vuetify: {
            pageTitle: 'Weather forecast',
            history: 'History',
            initSearch: 'Search',
            searchPlaceholder: 'Enter city...',
            searchErrorRequired: 'The field is not filled',
            searchErrorMinLength: 'Minimum length is 3 characters',
            lang: {
                ru: 'Russian',
                en: 'English',
            },
            widget: {
                prop: 'Property',
                value: 'Meaning',
                temperature: {
                    title: 'temperature',
                    denomination: 'denomination',
                    feels: 'feels like',
                    minimal: 'minimal',
                    maximum: 'maximum'
                },
                pressure: 'pressure',
                humidity: 'humidity',
                condition: {
                    title: 'condition'
                },
                units: {
                    pressure: 'mm'
                }
            },
            API_error: 'City not found'
        }
    },
}

const i18n = new VueI18n({
    locale: 'ru', // set locale
    messages, // set locale messages
})

export default new Vuetify({
    lang: {
        t: (key, ...params) => i18n.t(key, params),
    },
    i18n
})