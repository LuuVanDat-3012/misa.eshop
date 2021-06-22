<template>
  <div class="ms-header">
    <div class="ms-header-title">Cửa hàng</div>
    <div class="ms-header-box-inner">
      <div class="ms-box-combobox">
        <ms-combobox :items="this.items" ref="cbbHeader" class="ms-cbb-header"/>
      </div>
      <div class="account">
        <div class="account-img"></div>
        <div class="account-user">
            <span>Nguyễn Văn Mạnh</span></div>
        <div class="ms-action-account"></div>
      </div>
    </div>
    <div class="ms-header-box-icon">
      <div class="ms-icon-header">
        <div class="ms-icon-support"></div>
      </div>
      <div class="ms-icon-header">
        <div class="ms-icon-notification"></div>
      </div>
      <div class="ms-icon-header icon-bulkhead">
        <div class="ms-icon-help"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'msHeader',
  data () {
    return {
      items: [
        { value: 0, text: 'Chi nhánh 1' },
        { value: 1, text: 'Chi nhánh 2' },
        { value: 2, text: 'Chi nhánh 3' },
        { value: 3, text: 'Chi nhánh 4' },
        { value: 4, text: 'Chi nhánh 5' }
      ]
    }
  },
  mounted () {
    this.$refs.cbbHeader.itemSelected = this.items[0]
    this.$refs.cbbHeader.keyFilter = this.items[0].text
  }
}
</script>
<style lang="sass" scoped>
@import '../../scss/common.scss'
@import '../../scss/msHeader.scss'
</style>
