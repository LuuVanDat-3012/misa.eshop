<template>
  <div class="ms-grid-container">
    <div class="loading" v-if="isLoading">
      <!-- <PulseLoader class="loading-icon" :color="'#bcbcbf'"></PulseLoader> -->
      <div class="gif-loading"></div>
    </div>
    <table
      class="ms-grid-content"
      :style="{ height: sizeGrid + 'px' }"
      v-columns-resizable
    >
      <!-- Mã cửa hàng -->
      <thead>
        <tr>
          <th class="ms-th ms-th-store-code">
            <div class="ms-grid-title" @click="sortByStoreCode">
              <span>Mã cửa hàng</span>
            </div>
            <div class="ms-filter">
              <ms-filter-option ref="optionCode" />
              <div class="ms-filter-input">
                <input
                  type="text"
                  class="ms-input"
                  v-model="objectFilter.filterCode"
                  @keyup.enter="searchWithFilter"
                />
              </div>
            </div>
          </th>
          <!-- Tên cửa hàng -->
          <th class="ms-th ms-th-store-name">
            <div class="ms-grid-title" @click="sortByStoreName">
              <span>Tên cửa hàng</span>
            </div>
            <div class="ms-filter">
              <ms-filter-option ref="optionName" />
              <div class="ms-filter-input">
                <input
                  type="text"
                  class="ms-input"
                  v-model="objectFilter.filterName"
                  @keyup.enter="searchWithFilter"
                />
              </div>
            </div>
          </th>
          <!-- Địa chỉ -->
          <th class="ms-th ms-th-store-address">
            <div class="ms-grid-title" @click="sortByStoreAddress">
              <span>Địa chỉ</span>
            </div>
            <div class="ms-filter">
              <ms-filter-option ref="optionAddress" />
              <div class="ms-filter-input">
                <input
                  type="text"
                  class="ms-input"
                  v-model="objectFilter.filterAddress"
                  @keyup.enter="searchWithFilter"
                />
              </div>
            </div>
          </th>
          <!-- Số điện thoại -->
          <th class="ms-th ms-th-store-phone">
            <div class="ms-grid-title">
              <span>Số điện thoại</span>
            </div>
            <div class="ms-filter">
              <ms-filter-option ref="optionPhone" />
              <div class="ms-filter-input">
                <input
                  type="text"
                  class="ms-input"
                  v-model="objectFilter.filterPhone"
                  @keyup.enter="searchWithFilter"
                />
              </div>
            </div>
          </th>
          <!-- Trạng thái -->
          <th class="ms-th ms-th-store-status">
            <div class="ms-grid-title">
              <span>Trạng thái</span>
            </div>
            <div class="ms-filter">
              <ms-combobox class="ms-cbb-filter" :items="this.items" ref="cbbFilter"/>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in listStore"
          :key="index"
          :class="item.storeId == storeSelected.storeId ? 'isSelected' : ''"
          @click="selectStore(item)"
          @dblclick="editStore(item)"
        >
          <td>{{ item.storeCode }}</td>
          <td :title="item.storeName">{{ item.storeName }}</td>
          <td :title="item.address">{{ item.address }}</td>
          <td :title="item.phoneNumber">{{ item.phoneNumber }}</td>
          <td>{{ item.status | formatStatus }}</td>
        </tr>
      </tbody>
    </table>

    <div class="ms-navigate">
      <div class="ms-btn-page-common" @click="backtoFirstPage">
        <div class="ms-first-page-icon ms-icon-common"></div>
      </div>
      <div class="ms-btn-page-common" @click="prePage">
        <div class="ms-pre-page-icon ms-icon-common"></div>
      </div>
      <div class="ms-page-text">Trang {{ curentPage }}</div>
      <div class="ms-input-page">
        <input type="text" v-model="objectFilter.pageIndex" @keyup.enter="goPage" />
      </div>
      <div class="ms-page-text">trên {{ totalPage }}</div>
      <div class="ms-btn-page-common" @click="nextPage">
        <div class="ms-next-page-icon ms-icon-common"></div>
      </div>
      <div class="ms-btn-page-common" @click="nextLastPage">
        <div class="ms-last-page-icon ms-icon-common"></div>
      </div>
      <div class="ms-btn-page-common boder-blue">
        <div class="ms-reload-icon ms-icon-common" @click="loadStoreDefault"></div>
      </div>
      <div class="ms-select-pagesize">
        <select name="" id="" v-model="objectFilter.pageSize">
          <option :value="15" :selected="true">15</option>
          <option :value="25">25</option>
          <option :value="50">50</option>
          <option :value="100">100</option>
        </select>
      </div>

      <div class="ms-paging-detail">Hiện thị {{(objectFilter.pageIndex-1)*objectFilter.pageSize+ 1}} - {{maxSize}} trên {{totalRecord}} bản ghi</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'msGrid',
  components: {
    // PulseLoader
  },
  data () {
    return {
      listStore: [], // Biến lưu danh sách các cửa hàng
      sizeGrid: 0, // Biến xác định kích thước của bảng
      storeSelected: '',
      storeFake: '',
      isLoading: false,
      totalPage: 1,
      curentPage: 1,
      totalRecord: 0,
      statusSortCode: true,
      statusSortName: true,
      statusSortAddress: true,
      statusSortPhone: true,
      items: [
        { value: 2, text: 'Tất cả' },
        { value: 1, text: 'Đang hoạt động' },
        { value: 0, text: 'Ngưng hoạt động' }
      ],
      objectFilter: {
        filterCode: '',
        filterName: '',
        filterAddress: '',
        filterPhone: '',
        filterStatus: 2,
        optionCode: 1,
        optionName: 1,
        optionAddress: 1,
        optionPhone: 1,
        pageIndex: 1,
        pageSize: 15
      },
      objectFilterTemp: {
        filterCode: '',
        filterName: '',
        filterAddress: '',
        filterPhone: '',
        filterStatus: 2,
        optionCode: 1,
        optionName: 1,
        optionAddress: 1,
        optionPhone: 1,
        pageIndex: 1,
        pageSize: 15
      }
    }
  },
  methods: {
    /**
     * Hàm lưu lại thông tin store đã chọn
     * CreatedBy: LVDat (16/06/2021)
     */
    selectStore (store) {
      this.storeSelected = store
      this.$emit('getStoreSelected', store)
    },
    /**
     * Hàm load lại dữ liệu mặc định
     * CreatedBy: LVDat (18/06/2021)
     */
    loadStoreDefault () {
      this.isLoading = true
      this.objectFilter = this.objectFilterTemp
      this.axios
        .post('Stores/Filter', this.objectFilterTemp)
        .then(response => {
          this.listStore = response.data.data
          this.sizeGrid = response.data.data * 31.4 + 64
          this.isLoading = false
          this.totalPage = response.data.totalPage
          this.totalRecord = response.data.totalRecord
          if (response.data.data.length > 0) {
            this.storeSelected = response.data.data[0]
            this.$emit('getStoreSelected', this.storeSelected)
          }
        })
    },
    /**
     * Hàm gửi yêu cầu sửa cửa hàng và gửi đi store được chọn
     * CreatedBy: LVDat (16/06/2021)F
     */
    editStore (store) {
      this.storeSelected = store
      this.$emit('editStore')
    },
    searchWithFilter () {
      this.isLoading = true
      this.objectFilter.optionCode = this.$refs.optionCode.optionSelected.value
      this.objectFilter.optionName = this.$refs.optionName.optionSelected.value
      this.objectFilter.optionAddress = this.$refs.optionAddress.optionSelected.value
      this.objectFilter.optionPhone = this.$refs.optionPhone.optionSelected.value
      this.objectFilter.filterStatus = this.$refs.cbbFilter.itemSelected.value

      this.axios
        .post(
          'Stores/Filter', this.objectFilter
        )
        .then(response => {
          this.listStore = response.data.data
          this.sizeGrid = response.data.data.length * 31.4 + 64
          this.isLoading = false
          this.totalPage = response.data.totalPage
          this.totalRecord = response.data.totalRecord
          if (response.data.data.length > 0) {
            this.storeSelected = response.data.data[0]
          }
        })
    },
    /**
     * Hàm sắp xếp danh sách cửa hàng theo tên cửa hàng
     * CreatedBy: LVDat (18/06/2021)
     */
    sortByStoreName () {
      this.statusSortName = !this.statusSortName
      if (this.statusSortName) {
        this.listStore.sort(function (a, b) {
          if (a.storeName.toLowerCase() < b.storeName.toLowerCase()) {
            return -1
          }
          if (a.storeName.toLowerCase() > b.storeName.toLowerCase()) {
            return 1
          }
          return 0
        })
      } else {
        this.listStore.sort(function (a, b) {
          if (a.storeName.toLowerCase() < b.storeName.toLowerCase()) {
            return 1
          }
          if (a.storeName.toLowerCase() > b.storeName.toLowerCase()) {
            return -1
          }
          return 0
        })
      }
    },
    /**
     * Hàm sắp xếp danh sách cửa hàng theo mã cửa hàng
     * CreatedBy: LVDat (18/06/2021)
     */
    sortByStoreCode () {
      this.statusSortCode = !this.statusSortCode
      if (this.statusSortCode) {
        this.listStore.sort(function (a, b) {
          if (a.storeCode.toLowerCase() < b.storeCode.toLowerCase()) {
            return -1
          }
          if (a.storeCode.toLowerCase() > b.storeCode.toLowerCase()) {
            return 1
          }
          return 0
        })
      } else {
        this.listStore.sort(function (a, b) {
          if (a.storeCode.toLowerCase() < b.storeCode.toLowerCase()) {
            return 1
          }
          if (a.storeCode.toLowerCase() > b.storeCode.toLowerCase()) {
            return -1
          }
          return 0
        })
      }
    },
    /**
     * Hàm sắp xếp danh sách cửa hàng theo địa chỉ
     * CreatedBy: LVDat (18/06/2021)
     */
    sortByStoreAddress () {
      this.statusSortAddress = !this.statusSortAddress
      if (this.statusSortAddress) {
        this.listStore.sort(function (a, b) {
          if (a.address.toLowerCase() < b.address.toLowerCase()) {
            return -1
          }
          if (a.address.toLowerCase() > b.address.toLowerCase()) {
            return 1
          }
          return 0
        })
      } else {
        this.listStore.sort(function (a, b) {
          if (a.address.toLowerCase() < b.address.toLowerCase()) {
            return 1
          }
          if (a.address.toLowerCase() > b.address.toLowerCase()) {
            return -1
          }
          return 0
        })
      }
    },
    /**
     * Hàm sắp xếp danh sách cửa hàng theo số điện thoại
     * CreatedBy: LVDat (18/06/2021)
     */
    sortByStorePhone () {
      this.statusSortPhone = !this.statusSortPhone
      if (this.statusSortPhone) {
        this.listStore.sort(function (a, b) {
          if (a.phoneNumber.toLowerCase() < b.phoneNumber.toLowerCase()) {
            return -1
          }
          if (a.phoneNumber.toLowerCase() > b.phoneNumber.toLowerCase()) {
            return 1
          }
          return 0
        })
      } else {
        this.listStore.sort(function (a, b) {
          if (a.phoneNumber.toLowerCase() < b.phoneNumber.toLowerCase()) {
            return 1
          }
          if (a.phoneNumber.toLowerCase() > b.phoneNumber.toLowerCase()) {
            return -1
          }
          return 0
        })
      }
    },
    /**
     * Hàm chuyển đến trang tiếp theo
     * CreatedBy: LVDat(18/06/2021)
     */
    nextPage () {
      if (this.objectFilter.pageIndex < this.totalPage) {
        this.objectFilter.pageIndex++
        this.curentPage = this.objectFilter.pageIndex
        this.searchWithFilter()
      }
    },
    /**
     * Hàm chuyển đến trang cuối cùng
     * CreatedBy: LVDat(18/06/2021)
     */
    nextLastPage () {
      this.objectFilter.pageIndex = this.totalPage
      this.curentPage = this.totalPage
      this.searchWithFilter()
    },
    goPage () {
      var tmp = this.objectFilter.pageIndex
      if (this.objectFilter.pageIndex <= 0 || this.objectFilter.pageIndex > this.totalPage) {
        this.objectFilter.pageIndex = tmp
      } else {
        this.curentPage = this.objectFilter.pageIndex
        this.searchWithFilter()
      }
    },
    backtoFirstPage () {
      this.objectFilter.pageIndex = 1
      this.curentPage = this.objectFilter.pageIndex
      this.searchWithFilter()
    },
    prePage () {
      if (this.objectFilter.pageIndex > 1) {
        this.objectFilter.pageIndex--
        this.curentPage = this.objectFilter.pageIndex
        this.searchWithFilter()
      }
    }
  },

  /**
   * Tải dữ liệu ngay sai mounted
   * CreatedBy: LVDat (15/06/2021)
   */
  mounted () {
    this.isLoading = true
    this.$refs.cbbFilter.itemSelected = this.items[0]
    this.axios
      .post('Stores/Filter', this.objectFilter)
      .then(response => {
        this.listStore = response.data.data
        this.sizeGrid = response.data.data * 31.4 + 64
        this.isLoading = false
        this.totalPage = response.data.totalPage
        this.totalRecord = response.data.totalRecord
        if (response.data.data.length > 0) {
          this.storeSelected = response.data.data[0]
          this.$emit('getStoreSelected', this.storeSelected)
        }
      })
  },
  watch: {
    pageSize: function () {
      this.objectFilter.pageIndex = 1
      this.curentPage = 1
      this.searchWithFilter()
    }
  },
  computed: {
    maxSize: function () {
      if (this.objectFilter.pageIndex * this.objectFilter.pageSize > this.totalRecord) { return this.totalRecord }
      return this.objectFilter.pageIndex * this.objectFilter.pageSize
    }
  }
}
</script>
<style lang="scss">
@import "../../scss/common.scss";
@import "../../scss/msGrid.scss";
</style>
