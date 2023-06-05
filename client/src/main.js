import './boostrap'
import { createApp } from 'vue'
import './assets/css/app.css'
import App from './App.vue'
import store from './store/index';
import router from './router';
import { library } from '@fortawesome/fontawesome-svg-core'

import { faUser, faCircleNotch, faLocationDot, faPaperPlane, faEnvelope, faAt, faBriefcase, faMagnifyingGlass, faPenToSquare, faTrashAlt, faTimes, faArrowRightFromBracket, faGripLines, faAngleLeft, faUpRightFromSquare, faPlus } from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUser, faCircleNotch, faLocationDot, faPaperPlane, faEnvelope, faAt, faBriefcase, faMagnifyingGlass, faPenToSquare, faTrashAlt, faTimes, faArrowRightFromBracket, faGripLines, faAngleLeft, faUpRightFromSquare, faPlus);

const app = createApp(App);
app.use(router);
app.use(store);
app.component('f-a-i', FontAwesomeIcon);

app.config.globalProperties.$_ = _
app.mount('#app');
