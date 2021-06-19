import Vue from 'vue'

import msMenu from '@/layout/msMenu/msMenu.vue'
import msHeader from '@/layout/msHeader/msHeader.vue'
import msContent from '@/layout/msContent/msContent.vue'
import msCombobox from '@/components/msCombobox/msCombobox.vue'
import msToolBar from '@/components/msToolBar/msToolBar.vue'
import msGrid from '@/components/msGrid/msGrid.vue'
import msFilterOption from '@/components/msFilterOption/msFilterOption.vue'
import msDialog from '@/components/msDialog/msDialog.vue'
import msNavigate from '@/components/msNavigate/msNavigate.vue'
import msPopupDelete from '@/components/msPopupDelete/msPopupDelete.vue'
import msPopupSave from '@/components/msPopupSave/msPopupSave.vue'
import msPopupError from '@/components/msPopupError/msPopupError.vue'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import VueResizable from 'vue-resizable'
Vue.component(VueResizable)
Vue.component(msPopupError.name, msPopupError)
Vue.component(PulseLoader)
Vue.component(msPopupSave.name, msPopupSave)
Vue.component(msPopupDelete.name, msPopupDelete)
Vue.component(msDialog.name, msDialog)
Vue.component(msMenu.name, msMenu)
Vue.component(msHeader.name, msHeader)
Vue.component(msContent.name, msContent)
Vue.component(msCombobox.name, msCombobox)
Vue.component(msToolBar.name, msToolBar)
Vue.component(msFilterOption.name, msFilterOption)
Vue.component(msGrid.name, msGrid)
Vue.component(msNavigate.name, msNavigate)
