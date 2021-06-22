<template>
  <div
    :class="
      isWarning ? 'combobox-container border-warning' : 'combobox-container'
    "
    v-on:keyup.40="arrowDown()"
    v-on:keyup.38="arrowUp()"
    class="ms-combobox"
    v-on:keyup.13="enter"
  >
    <input
      type="text"
      v-model="keyFilter"
      v-on:keyup="checkValue()"
      ref="inputcombobox"
      class="ms-input-cbb"
      placeholder="Nhập để tìm kiếm"
    />
    <div class="select" v-if="isActived">
      <div
        class="option"
        v-for="(item, index) in listItemInFilter"
        :key="index"
        :class="{isSelect: item.value == itemSelected.value}"
        @click="chooseItem(index, item)"
      >
        {{ item.text }}
      </div>
    </div>
    <div
      class="dropdow-button"
      @click="onclickComboboxButton()"
    >
      <span class="dropdown-icon"></span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'msCombobox',
  data () {
    return {
      itemSelected: { value: 0, text: 'demo' }, // Giá trị được chọn
      isActived: false, // Ẩn/ hiện drop content
      indexHover: 0, // Vị trí đang được hover
      keyFilter: '', // Từ khóa tìm kiếm
      indexSelected: 0, // Vị trí phần tử được chọn
      isWarning: false, // Ản/hiện thông báo khi không tìm thấy dữ liệu
      listItemInFilter: []// Danh sách các phần tử sau khi lọc
    }
  },
  methods: {
    onclickComboboxButton () {
      this.listItemInFilter = this.items
      if (this.isActived === false) {
        this.isActived = true
        // this.$emit('loadData')
        this.$emit('closeOtherComboboxs')
      } else {
        this.isActived = false
      }
    },
    /**
     * Hàm lấy ra danh sách các giá trị thỏa mã khi nhập liệu vào ô input
     * CreatedBy: LVDat (15/06/2021)
     */
    checkValue () {
      this.listItemInFilter = []
      this.keyFilter =
        this.keyFilter.charAt(0).toUpperCase() + this.keyFilter.slice(1)
      this.items.forEach(element => {
        if (element.text.indexOf(this.keyFilter) !== -1) {
          this.listItemInFilter.push({
            value: element.value,
            text: element.text
          })
        }
      })
      if (this.listItemInFilter.length > 0) {
        this.isActived = true
        this.isWarning = false
      } else {
        this.isWarning = true
      }
    },
    /**
     * Dịch vị trí khi bấn phím xuống
     * CreatedBy: LVDat (15/06/2021)
     */
    arrowDown () {
      if (this.indexHover === 0) {
        this.indexHover = 1
      } else if (this.indexHover < this.listItemInFilter.length - 1) {
        this.indexHover++
      }
    },
    /**
     * Dịch vị trí khi bấm phím lêm
     * CreatedBy: LVDat (15/06/2021)
     */
    arrowUp () {
      if (this.indexHover > 0) {
        this.indexHover--
      }
    },
    /**
     * Hàm nhận và gửi dữ liệu sau khi click
     * CreatedBy: LVDat (15/06/2021)
     */
    chooseItem (index, item) {
      if (index != null) {
        this.itemSelected = this.listItemInFilter[index]
        this.indexHover = index
        this.isActived = false
        this.setIndexSelected()
      } else {
        if (this.itemsInFilter[this.indexHover] != null) {
          this.itemSelected = this.listItemInFilter[this.indexHover]
          this.isActived = false
        }
      }
      this.itemSelected = item
      this.keyFilter = this.itemSelected.text
      this.listItemInFilter = []
      this.listItemInFilter = this.items
      this.$emit('changeValue', this.itemSelected.value)
    },
    /**
     * Hàm nhận và gửi dữ liệu sau khi bấm 'enter'
     * CreatedBy: LVDat (19/06/2021)
     */
    enter () {
      this.itemSelected = this.listItemInFilter[this.indexSelected]
      this.keyFilter = this.itemSelected.text
      this.listItemInFilter = []
      this.listItemInFilter = this.items
      this.isActived = false
      this.$emit('changeValue', this.itemSelected.value)
    },
    /**
     * Hàm set vị trí phần tử được chọn
     * CreatedBy: LVDat (19/06/2021)
     */
    setIndexSelected () {
      for (var i = 0; i < this.items.length; i++) {
        if (this.items[i] === this.itemSelected) {
          this.indexSelected = i
          return
        }
      }
    }
  },
  props: {
    /**
     * Danh sách các phần tử được nhận từ component cha
     */
    items: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    indexHover: function () {
      this.indexSelected = this.indexHover
    }
  }
}
</script>
<style lang="sass">
@import '../../scss/msCombobox.scss'
</style>
