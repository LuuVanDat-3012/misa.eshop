<template>
<div class="ms-popup-error-container">
    <div class="ms-popup-model">

    </div>
    <div class="ms-popup-error">
             <div class="popup-error-title">
                <div class="error-title">MISA eShop</div>
                <div class="btn-close" @click="closePopupError"></div>
            </div>

            <div class="popop-error-content">
                <div class="content-error-icon"></div>
                <div class="content-text">Mã cửa hàng đã tồn tại. Vui lòng kiểm tra lại.</div>
            </div>
            <div class="popup-error-btn" @click="closePopupError">
                <div class="error-btn">Đồng ý</div>
            </div>
    </div>
</div>
</template>
<script>
export default {
  name: 'msPopupError',
  methods: {
    closePopupError () {
      this.$emit('closePopupError')
    }
  }
}
</script>
<style lang="scss">
@import "../../scss/common.scss";
@import "../../scss/msPopupError.scss";
</style>
