import Vue from 'vue'
Vue.filter('formatStatus', (val) => {
  if (val === 1) return 'Đang hoạt động'
  return 'Ngừng hoạt động'
})
