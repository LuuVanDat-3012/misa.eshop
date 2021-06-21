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
        :class="{isHover : index == indexSelected , isSelect: item.value == itemSelected.value}"
        @click="chooseItem(index, item)"
      >
        {{ item.text }}
      </div>
    </div>
    <div
      :class="isFocus ? 'dropdow-button border-forcus ' : 'dropdow-button'"
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
      itemSelected: { value: 0, text: 'demo' },
      isActived: false,
      keySelected: '',
      indexHover: -1,
      keyFilter: '',
      isFocus: false,
      indexSelected: 0,
      isWarning: false,
      listItemInFilter: [],
      itemId: '',
      demo: []
    }
  },
  methods: {
    onclickComboboxButton () {
      this.listItemInFilter = this.items
      if (this.isActived === false) {
        this.isActived = true
        this.$emit('loadData')
      } else {
        this.isActived = false
      }
    },
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
    arrowDown () {
      if (this.indexHover < this.listItemInFilter.length - 1) {
        this.indexHover++
      }
    },
    arrowUp () {
      if (this.indexHover > 0) {
        this.indexHover--
      }
    },
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
    enter () {
      this.itemSelected = this.listItemInFilter[this.indexSelected]
      this.keyFilter = this.itemSelected.text
      this.listItemInFilter = []
      this.listItemInFilter = this.items
      this.isActived = false
      this.$emit('changeValue', this.itemSelected.value)
    },
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
