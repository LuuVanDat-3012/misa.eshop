<template>
  <div class="ms-content">
    <ms-tool-bar
      @openDialog="openDialog"
      @deleteStore="deleteStore"
      @loadStore="loadStore"
      @editStore="editStore"
      @duplicateStore="duplicateStore"
    />
    <ms-grid
      ref="grid"
      @editStore="editStore"
      @getStoreSelected="getStoreSelected"
    />
    <ms-dialog
      v-show="isActiveDialog"
      @closeDialog="closeDialog"
      ref="dialog"
      :editMode="editMode"
      @displayPopupError="isActivePopupError = true"
      @loadStore="loadStore"
      @displayPopupSave="displayPopupSave"
    />
    <ms-popup-save
      v-show="isActivePopupSave"
      @loadStore="loadStore"
      @closePopupSave="isActivePopupSave = fasle"
      @closeDialog="closeDialog"
      ref="popupSave"
    />
    <ms-popup-delete
      v-show="isActivePopupDelete"
      ref="popupDelete"
      @loadStore="loadStore"
      @closePopupDelete="isActivePopupDelete = false"
    />
    <ms-popup-error
      v-show="isActivePopupError"
      @closePopupError="closePopupError"
    />
  </div>
</template>
<script>
import _ from 'lodash'
export default {
  name: 'msContent',
  data () {
    return {
      isActiveDialog: false, // Biến hiển thị dialog
      isActivePopupDelete: false, // Biến hiển thị popup delete
      isActivePopupSave: false, // Biến hiển thị popup save
      isActivePopupError: false, // Biến hiển thị popup error
      editMode: 0,
      storeSelected: {},
      storeNew: {}
    }
  },
  methods: {
    /**
     * Hàm hiển thị dialog và gọi hàm load Country của dialog
     * CreatedBy: LVDat (16/06/2021)
     */
    openDialog () {
      this.isActiveDialog = true
      this.editMode = 1
      this.$refs.grid.storeSelected = this.$refs.dialog.store
      this.$refs.dialog.getCountry()
      this.$refs.dialog.getProvince('123')
      this.$refs.dialog.focusInput()
    },
    closeDialog () {
      this.isActivePopupSave = false
      this.isActiveDialog = false
    },
    /**
     * Hàm gửi yêu cầu load lại dữ liệu
     * CreatedBy: LVDat (16/06/2021)
     */
    loadStore () {
      this.$refs.grid.loadStoreDefault()
    },
    /**
     * Hàm hiển thị popup xác nhận xoá
     * CreatedBy: LVDat (16/06/2021)
     */
    deleteStore () {
      this.isActivePopupDelete = true
      this.$refs.popupDelete.store = this.$refs.grid.storeSelected
    },
    /**
     * Hàm gửi đi 1 store để hiện thị lên dialog và sửa
     * CreatedBy: LVDat (16/06/2021)
     */
    editStore () {
      this.axios.get('Stores/' + this.storeSelected.storeId).then(response => {
        this.isActiveDialog = true
        this.editMode = 2
        this.$refs.dialog.focusInput()
        this.$refs.dialog.editStore(response.data.data[0])
      })
    },
    /**
     * Hàm lấy thông tin store khi nhấn click trên grid
     * CreatedBy: LVDat (16/06/2021)
     */
    getStoreSelected (store) {
      this.storeSelected = store
    },
    /**
     * Hàm đóng popup delete
     * CreatedBy: LVDat (19/06/2021)
     */
    closePopupError () {
      this.isActivePopupError = false
      this.$refs.dialog.focusInput()
    },
    /**
     * Hàm nhân đôi store đã chọn
     * CreatedBy: LVDat (19/06/2021)
     */
    duplicateStore () {
      this.axios.get('Stores/' + this.storeSelected.storeId).then(response => {
        this.isActiveDialog = true
        this.editMode = 1
        var store = response.data.data[0]
        store.storeCode += '[copy]'
        this.$refs.dialog.editStore(store)
      })
    },
    displayPopupSave (item) {
      this.axios.get('Stores/' + this.storeSelected.storeId).then(response => {
        this.storeNew = response.data.data[0]
        if (!_.isEqual(item, this.storeNew)) {
          item.editMode = this.editMode
          this.$refs.popupSave.store = item
          this.isActivePopupSave = true
        } else {
          this.isActiveDialog = false
        }
      })
    }
  }
}
</script>

<style lang="scss">
@import "../../scss/common.scss";
@import "../../scss/msContent.scss";
</style>
