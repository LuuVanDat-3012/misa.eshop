<template>
  <div class="ms-option-filter" >
    <div class="btn-option" @click="isActived = !isActived" v-on-clickaway="closeFilterOption" >
      {{optionSelected.key}}
    </div>
    <div class="list-option" v-show="isActived" >
      <div class="item-option" v-for="(item, index) in listOption" :key="index" @click="selectOption(item)">
        <div class="key-option">{{ item.key }} :</div>
        <div class="text-option">{{ item.text }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { mixin as clickaway } from 'vue-clickaway'

export default {
  mixins: [clickaway],
  name: 'msFilterOption',
  data () {
    return {
      // Danh sách các option
      listOption: [
        { key: '*', text: 'Chứa', value: 1 },
        { key: '=', text: 'Bằng', value: 2 },
        { key: '+', text: 'Bắt đầu bằng', value: 3 },
        { key: '-', text: 'Kết thúc bằng', value: 4 },
        { key: '!', text: 'Không chứa', value: 5 }
      ],
      // Option đã được chọn
      optionSelected: { key: '*', text: 'Chứa', value: 1 }, // Thông tin option đã chọn
      isActived: false
    }
  },
  methods: {
    // Hàm lấy ra option được chọn
    selectOption (item) {
      this.optionSelected = item
      this.isActived = false
    },
    // Hàm đóng lít option khi click vào vị trí bất kỳ trên màn hình
    closeFilterOption () {
      this.isActived = false
    }
  }
}
</script>
<style lang="scss">
@import "../../scss/msFilterOption.scss";
</style>
