<template>
  <div
    :class="
      isWarning ? 'combobox-container border-warning' : 'combobox-container'
    "
    v-on:keyup.40="arrowDown()"
    v-on:keyup.38="arrowUp()"
    v-on:keyup.13="enter()"
    @click="focus()"
    class="ms-combobox"
  >
    <input
      type="text"
      v-model="keySelected"
      v-on:keyup="checkValue()"
      ref="inputcombobox"
      class="ms-input-cbb"
    />
    <div class="select" v-if="isActived">
      <div
        class="option"
        v-for="(item, index) in items"
        :key="index"
        :class="index == indexSelected ? 'isselected' : ''"
        @click="enter(index, item.value, item.text)"
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
      items: [],
      itemSelected: { value: 0, text: 'Cửa hàng 1' },
      isActived: false,
      keySelected: '',
      indexHover: 0,
      keyfilter: '',
      isFocus: false,
      indexSelected: 0,
      isWarning: false,
      listId: []
    }
  },
  methods: {
    onclickComboboxButton () {
      this.keyfilter = ''
      this.isActived = !this.isActived
    },
    checkValue () {
      if (this.itemsInFilter.length === 0) this.isWarning = true
      if (this.itemsInFilter.length > 0) this.isWarning = false
      if (
        this.keySelected === '' ||
        this.keySelected === this.itemSelected.text
      ) { return }
      if (this.itemsInFilter.length > 0) {
        this.isActived = true
      }
    },
    arrowDown () {
      if (this.indexHover < this.itemsInFilter.length - 1) {
        this.indexHover++
      }
    },
    arrowUp () {
      if (this.indexHover > 0) {
        this.indexHover--
      }
    },
    enter (index, val, text) {
      if (index != null) {
        this.itemSelected = this.itemsInFilter[index]
        this.keySelected = this.itemsInFilter[index].text
        this.indexHover = index
        this.isActived = false
        this.setIndexSelected()
      } else {
        if (this.itemsInFilter[this.indexHover] != null) {
          this.itemSelected = this.itemsInFilter[this.indexHover]
          this.keySelected = this.itemsInFilter[this.indexHover].text
          this.isActived = false
          this.setIndexSelected()
        }
      }
      this.itemSelected.value = val
      this.itemSelected.text = text
      this.$emit('getPositionId')
    },
    setIndexSelected () {
      for (var i = 0; i < this.items.length; i++) {
        if (this.items[i] === this.itemSelected) {
          this.indexSelected = i
          return
        }
      }
    },
    focus () {
      this.isFocus = true
    }
  },
  computed: {
    itemsInFilter () {
      return this.items.filter(item =>
        item.text.toLowerCase().includes(this.keyfilter.toLowerCase())
      )
    }
  },
  watch: {
    keySelected: function () {
      this.keyfilter = this.keySelected
      if (this.itemsInFilter.length === 0) this.isActived = false
      if (this.keySelected === '') this.isActived = false
      if (this.keySelected !== this.itemSelected.text) {
        this.itemSelected = { value: -1, text: '' }
        this.indexSelected = 0
        this.indexHover = 0
      }
    },
    indexHover: function () {
      this.indexSelected = this.indexHover
    }
  }
}
</script>
<style lang="sass" scoped>
@import '../../scss/msCombobox.scss'
</style>
