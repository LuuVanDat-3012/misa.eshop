<template>
  <div class="ms-option-filter">
    <div
      class="btn-option"
      @click="isActived = !isActived"
      v-on-clickaway="closeFilterOption"
    >
      {{ optionSelected.key }}
    </div>
    <div class="list-option" v-show="isActived">
      <div
        class="item-option"
        v-for="(item, index) in listOption"
        :key="index"
        @click="selectOption(item)"
      >
        <div class="key-option">{{ item.key }} :</div>
        <div class="text-option">{{ item.text }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { mixin as clickaway } from 'vue-clickaway'
import { TypeFilter } from '../../constant/types.js'
export default {
  mixins: [clickaway],
  name: 'msFilterOption',
  data () {
    return {
      // Danh sách các option
      listOption: TypeFilter,
      // Option đã được chọn
      optionSelected: TypeFilter[0], // Thông tin option đã chọn
      isActived: false

    }
  },
  methods: {
    /**
     * Hàm lấy ra option được chọn
     * CreatedBy: LVDat(19/06/2021)
     */
    selectOption (item) {
      this.optionSelected = item
      this.isActived = false
    },
    // Hàm đóng lít option khi click vào vị trí bất kỳ trên màn hình
    closeFilterOption () {
      this.isActived = false
    }
  },
  /**
   * Gán giá trị cho listOption
   * CreatedBy: LVDat(19/06/2021)
   */
  mounted () {
  }
}
</script>
<style lang="scss">
@import "../../scss/msFilterOption.scss";
</style>
