<template>
  <div class="ms-popup-save">
    <div class="popup-model"></div>
    <div class="popup">
      <div class="popup-title">
        <div class="content-title">Dữ liệu chưa được lưu</div>
        <div class="btn-close" ></div>
      </div>

      <div class="popop-content">
        <div class="content-icon"></div>
        <div class="content-text">
          Dữ liệu đã thay đổi, bạn có muốn lưu không?
        </div>
      </div>

      <div class="popup-button">
        <div class="ms-btn-save ms-footer-btn-common" @click="saveData">
          <div class="ms-icon-common ms-btn-save-icon"></div>
          <div class="ms-btn-save-text">Lưu</div>
        </div>
        <div class="ms-btn-dont-save" @click="closePopupSave">
          <div class="ms-icon-common ms-btn-dont-save-icon"></div>
          <div class="ms-btn-dont-save-text">Không lưu</div>
        </div>
        <div class="ms-btn-popup-cancel ms-footer-btn-common" @click="closePopupSave">
          <div class="ms-btn-cancel-icon ms-icon-common"></div>
          <div class="ms-btn-cancel-popup-text">Hủy bỏ</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'msPopupSave',
  setup () {},
  data () {
    return {
      store: {}
    }
  },
  methods: {
    closePopupSave () {
      this.$emit('closePopupSave')
    },
    saveData () {
      this.store.provinceId = this.provinceId || null
      this.store.districtId = this.districtId || null
      this.store.wardId = this.wardId || null
      this.store.editMode = 2
      var listStore = []
      listStore.push(this.store)
      console.log(this.store)
      // this.axios.post('Stores', listStore).then(response => {
      //   if (response.data.success === true) {
      //     this.$vToastify.success(response.data.message)
      //     this.$emit('loadStore')
      //   } else {
      //     this.$emit('displayPopupError')
      //   }
      // })
    }
  }
}
</script>
<style lang="scss">
@import "../../scss/common.scss";
@import "../../scss/msPopupSave.scss";
</style>
