<template>
  <div class="ms-header">
    <div class="ms-header-title">Cửa hàng</div>
    <div class="ms-header-box-inner">
      <div class="ms-box-combobox">
        <ms-combobox :items="this.items"/>
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
        { value: 0, text: 'Cửa hàng 1' },
        { value: 1, text: 'Cửa hàng 2' },
        { value: 2, text: 'Cửa hàng 3' },
        { value: 3, text: 'Cửa hàng 4' },
        { value: 4, text: 'Cửa hàng 5' }
      ]
    }
  }
}
</script>
<style lang="sass" scoped>
@import '../../scss/common.scss'
@import '../../scss/msHeader.scss'
</style>
