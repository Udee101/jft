import './boostrap'
import { createApp } from 'vue'
import './assets/css/app.css'
import App from './App.vue'
import store from './store/index';
import router from './router';
import { library } from '@fortawesome/fontawesome-svg-core'

import { faUser, faCircleNotch, faLocationDot, faPaperPlane, faEnvelope, faAt, faClockRotateLeft, faArrowLeftLong, faGlobe, faMagnifyingGlass, faPenToSquare, faTrashAlt, faTimes, faArrowRightFromBracket, faGripLines } from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUser, faCircleNotch, faLocationDot, faPaperPlane, faEnvelope, faAt, faClockRotateLeft, faArrowLeftLong, faGlobe, faMagnifyingGlass, faPenToSquare, faTrashAlt, faTimes, faArrowRightFromBracket, faGripLines);

const app = createApp(App);
app.use(router);
app.use(store);
app.component('f-a-i', FontAwesomeIcon);

app.config.globalProperties.$_ = _
app.mount('#app');
