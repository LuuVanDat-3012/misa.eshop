<template>
  <div class="ms-toolbar">
    <div class="ms-btn-insert ms-btn-common" @click="openDialog">
      <div class="btn-insert-icon ms-icon-common"></div>
      <div class="btn-insert-text text-common">Thêm mới</div>
    </div>
    <div class="ms-btn-duplication ms-btn-common" @click="duplicateStore">
      <div class="btn-duplication-icon  ms-icon-common"></div>
      <div class="btn-duplication-text text-common">Nhân bản</div>
    </div>
    <div class="ms-btn-edit ms-btn-common" @click="editStore">
      <div class="btn-edit-icon  ms-icon-common"></div>
      <div class="btn-edit-text text-common">Sửa</div>
    </div>
    <div class="ms-btn-delete ms-btn-common" @click="deleteStore">
      <div class="btn-delete-icon  ms-icon-common"></div>
      <div class="btn-delete-text text-common">Xoá</div>
    </div>
    <div class="ms-btn-reload ms-btn-common specia-border" @click="loadStore">
      <div class="btn-reload-icon  ms-icon-common"></div>
      <div class="btn-reload-text text-common">Nạp</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'msToolBar',
  methods: {
    /**
     * Hàm gửi yêu cầu hiển thị dialog thêm mới ('Thêm mới')
     * CreatedBy: LVDat (16/06/2021)
     */
    openDialog () {
      this.$emit('openDialog')
    },
    /**
     * Hàm gửi yêu cầu load lại dữ liệu ('Nạp')
     * CreatedBy: LVDat (16/06/2021)
     */
    loadStore () {
      this.$emit('loadStore')
    },
    /**
     * Hàm gửi yêu cầu xoá bản ghi ('Xoá')
     */
    deleteStore () {
      this.$emit('deleteStore')
    },
    editStore () {
      this.$emit('editStore')
    },
    duplicateStore () {
      this.$emit('duplicateStore')
    }
  }
}
</script>
<style lang="scss">
@import "../../scss/common.scss";
@import "../../scss/msToolBar.scss";
</style>
