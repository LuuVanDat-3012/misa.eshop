<template>
    <div class="popup-container">
        <div class="popup-model"></div>
        <div class="popup">
            <div class="popup-title">
                <div class="content-title">Xoá dữ liệu</div>
                <div class="btn-close" @click="closePopupDelete"></div>
            </div>

            <div class="popop-content">
                <div class="content-icon"></div>
                <div class="content-text">Bạn có chắc chắn muốn xoá <b>{{store.storeName}}</b> khỏi danh sách cửa hàng?</div>
            </div>

            <div class="popup-button">
                <div class="btn-cancel-popup" @click="closePopupDelete">
                   <div class="btn-cancel-popup-icon"></div>
                   <div class="btn-cancel-popup-text">Hủy bỏ</div>
                </div>
                <div class="btn-confirm" @click="deleteStore">
                     <div class="btn-confirm-icon"></div>
                   <div class="btn-confirm-text">Xóa</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: 'msPopupDelete',
  setup () {

  },
  data () {
    return {
      store: '1221323'
    }
  },
  methods: {
    /**
       * Hàm gọi tới api xoá store
       * CreatedBy: LVDat (16/6/2021)
       */
    deleteStore () {
      var tmp = []
      this.store.editMode = 4
      tmp.push(this.store)
      console.log('xoas')
      this.axios.post('Stores', tmp).then(response => {
        // Gọi component cha load dữ liệu
        this.$emit('loadStore')
        // Gọi component cha đóng popup
        this.$emit('closePopupDelete')
        console.log('xoas')
      })
    },
    /**
     * Hàm gọi component cha đóng popup
     * CreatedBy: LVDat (16/6/2021)
     */
    closePopupDelete () {
      this.$emit('closePopupDelete')
    }
  }
}
</script>
<style lang="scss">
@import "../../scss/common.scss";
@import "../../scss/msPopupDelete.scss";
</style>
