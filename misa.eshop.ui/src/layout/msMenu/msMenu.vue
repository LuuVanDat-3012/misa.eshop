<template>
    <div class="ms-menu-container">
        <div class="ms-logo">
          <div class="ms-logo-img"></div>
        </div>
        <div class="ms-menu">
          <div class="ms-menu-item flex">
            <span class=" ms-icon-menubar-model">
                <div class="ms-menu-icon-dashboard special ms-icon-menubar"></div>
            </span>
            <span class="ms-menu-text text-padding-left special-text">Tổng quan</span>
          </div>
          <div class="ms-menu-item flex">
            <span class="ms-icon-menubar-model">
                <div class="ms-menu-icon-report ms-icon-menubar padding-left-10px"></div>
            </span>
            <span class="ms-menu-text text-padding-left">Báo cáo</span>
          </div>
          <div class="ms-menu-item flex">
            <span class=" ms-icon-menubar-model">
              <div class="ms-menu-icon-deliveryledge ms-icon-menubar padding-left-10px"></div>
            </span>
            <span class="ms-menu-text text-padding-left">Đơn hàng</span>
          </div>
          <div class="ms-menu-item flex">
            <span class=" ms-icon-menubar-model">
              <div class="ms-menu-icon-purchase ms-icon-menubar padding-left-10px"></div>
            </span>
            <span class="ms-menu-text text-padding-left">Mua hàng</span>
          </div>
          <div class="ms-menu-item flex">
            <span class=" ms-icon-menubar-model">
              <div class="ms-menu-icon-promotion ms-icon-menubar padding-left-10px"></div>
            </span>
            <span class="ms-menu-text text-padding-left">Khuyến mãi</span>
          </div>
          <div class="ms-menu-item flex">
            <span class=" ms-icon-menubar-model">
              <div class="ms-menu-icon-manage-store ms-icon-menubar padding-left-10px"></div>
            </span>
            <span class="ms-menu-text text-padding-left">Quản lý cửa hàng</span>
          </div>
          <div class="ms-menu-item flex">
            <span class=" ms-icon-menubar-model">
              <div class="ms-menu-icon-commodity ms-icon-menubar padding-left-10px"></div>
            </span>
            <span class="ms-menu-text text-padding-left">Hàng hoá</span>
          </div>
        </div>
    </div>
</template>
<script>
export default {
  name: 'msMenu'
}
</script>
<style lang="scss" scoped>
@import '../../scss/common.scss';
@import '../../scss/msMenu.scss';
</style>
