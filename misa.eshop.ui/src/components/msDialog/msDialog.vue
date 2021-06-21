<template>
  <div class="ms-dialog">
    <div class="ms-dialog-model"></div>

    <div class="ms-dialog-main">
      <div class="ms-dialog-header">
        <div class="ms-header-title">{{ editModeTitle }}</div>
        <div class="ms-icon-close" @click="closeDialog"></div>
      </div>

      <div class="ms-dialog-body">
        <div class="ms-row">
          <div class="ms-row-text">
            Mã cửa hàng <span class="ms-field-requied">*</span>
          </div>
          <div
            class="ms-form-text "
            :class="{ error: isWarningCode, zoomOut: isWarningCode }"
          >
            <input
              type="text"
              class="ms-field-input"
              v-model="store.storeCode"
              ref="autofocus"
              @keyup="validateStoreCode"
              @keydown.tab="validateStoreCode"
            />
          </div>
          <div class="ms-icon-error" v-if="isWarningCode"></div>
        </div>

        <div class="ms-row">
          <div class="ms-row-text ">
            Tên cửa hàng <span class="ms-field-requied">*</span>
          </div>
          <div
            class="ms-form-text"
            :class="{ error: isWarningName, zoomOut: isWarningName }"
          >
            <input
              type="text"
              class="ms-field-input"
              v-model="store.storeName"
              @keyup="validateStoreName"
              @keydown.tab="validateStoreName"
              ref="inputStoreName"
            />
            <div
              class="ms-icon-error icon-error-special"
              v-if="isWarningName"
            ></div>
          </div>
        </div>

        <div class="ms-row-large">
          <div class="ms-row-text">
            Địa chỉ <span class="ms-field-requied">*</span>
          </div>
          <div
            class="ms-field-textarea"
            :class="{ error: isWarningAddress, zoomOut: isWarningAddress }"
          >
            <textarea
              name=""
              id="text-arena"
              cols="30"
              rows="10"
              @keyup="validateStoreAddress"
              @keydown.tab="validateStoreAddress"
              v-model="store.address"
              ref="inputStoreAddress"
            ></textarea>
          </div>
          <div class="ms-icon-error" v-if="isWarningAddress"></div>
        </div>

        <div class="ms-row ms-row-2-col">
          <div class="ms-col">
            <div class="ms-row-text">Số điện thoại</div>
            <div class="ms-form-text">
              <input
                type="text"
                class="ms-field-input"
                v-model="store.phoneNumber"
              />
            </div>
          </div>
          <div class="ms-col">
            <div class="ms-row-text text-padding-10px">Mã số thuế</div>
            <div class="ms-form-text">
              <input
                type="text"
                class="ms-field-input"
                v-model="store.storeTaxCode"
              />
            </div>
          </div>
        </div>

        <div class="ms-row">
          <div class="ms-row-text">Quốc gia</div>
          <div class="ms-form-select align-item-left">
            <ms-combobox
              class="custom-combobox"
              ref="cbbCountry"
              @changeValue="getProvince"
              :items="listCountry"
            />
          </div>
        </div>

        <div class="ms-row ms-row-2-col">
          <div class="ms-col">
            <div class="ms-row-text">Tỉnh/Thành phố</div>
            <div class="ms-form-select">
              <ms-combobox
                class="custom-combobox"
                ref="cbbProvince"
                @changeValue="getDistrict"
                :items="this.listProvince"
              />
            </div>
          </div>
          <div class="ms-col">
            <div class="ms-row-text text-padding-10px">Quận/Huyện</div>
            <div class="ms-form-select">
              <ms-combobox
                class="custom-combobox"
                ref="cbbDistrict"
                :items="this.listDistrict"
                @changeValue="getWard"
              />
            </div>
          </div>
        </div>

        <div class="ms-row ms-row-2-col">
          <div class="ms-col">
            <div class="ms-row-text">Phường/Xã</div>
            <div class="ms-form-select">
              <ms-combobox
                class="custom-combobox"
                ref="cbbWard"
                @changeValue="confirmPosition"
                :items="this.listWard"
              />
            </div>
          </div>
          <div class="ms-col">
            <div class="ms-row-text text-padding-10px">Đường phố</div>
            <div class="ms-form-text">
              <input
                type="text"
                class="ms-field-input"
                v-model="store.street"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- dialog-footer -->
      <div class="ms-dialog-footer">
        <div class="ms-footer-left">
          <div class="ms-help">
            <div class="ms-help-icon"></div>
            <div class="ms-help-text">Trợ giúp</div>
          </div>
        </div>
        <div class="ms-footer-right">
          <div class="ms-btn-save ms-footer-btn-common" @click="saveData(0)">
            <div class="ms-icon-common ms-btn-save-icon"></div>
            <div class="ms-btn-save-text">Lưu</div>
          </div>
          <div class="ms-btn-build ms-footer-btn-common" @click="saveData(1)">
            <div class="ms-btn-build-icon ms-icon-common"></div>
            <div class="ms-btn-build-text">Lưu và thêm mới</div>
          </div>
          <div class="ms-btn-cancel ms-footer-btn-common" @click="exitDialog">
            <div class="ms-btn-cancel-icon ms-icon-common"></div>
            <div class="ms-btn-cancel-text">Hủy bỏ</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'msDialog',
  data () {
    return {
      store: {
        storeId: '00000000-0000-0000-0000-000000000000',
        storeCode: '',
        storeName: '',
        address: '',
        phoneNumber: '',
        storeTaxCode: '',
        provinceId: '',
        districtId: '',
        wardId: '',
        countryId: '',
        street: '',
        status: 1,
        createdDate: '2017-08-15T13:32:46',
        createdBy: '',
        modifiedDate: '1970-01-01T01:45:10',
        modifiedBy: '',
        editMode: 0
      },
      storeDefault: {
        storeId: '00000000-0000-0000-0000-000000000000',
        storeCode: '',
        storeName: '',
        address: '',
        phoneNumber: '',
        storeTaxCode: '',
        provinceId: '',
        districtId: '',
        wardId: '',
        street: '',
        status: 1,
        createdDate: '2017-08-15T13:32:46',
        createdBy: '',
        modifiedDate: '1970-01-01T01:45:10',
        modifiedBy: '',
        editMode: 0
      },
      listCountry: [],
      listDistrict: [],
      listProvince: [],
      listWard: [],
      provinceId: '',
      districtId: '',
      wardId: '',
      countryId: '',
      isWarningCode: false,
      isWarningAddress: false,
      isWarningName: false,
      error: false,
      temp: {}
    }
  },
  methods: {
    closeDialog () {
      this.$emit('displayPopupSave', this.store)
    },
    exitDialog () {
      this.store = this.storeDefault
      this.listCountry = []
      this.listDistrict = []
      this.listProvince = []
      this.listWard = []
      this.isWarningCode = false
      this.isWarningAddress = false
      this.isWarningName = false
      this.$emit('closeDialog')
    },
    /**
     * Hàm lấy toàn bộ danh sách quốc gia
     * CreatedBy: LVDat (16/06/2021)
     */
    getCountry () {
      this.axios.get('Country?pageIndex=1&pageSize=100').then(response => {
        response.data.data.forEach(element => {
          this.listCountry.push({
            value: element.countryId,
            text: element.countryName
          })
        })
        this.$refs.cbbCountry.keyFilter = this.listCountry[0].text
        this.$refs.cbbCountry.itemSelected = this.listCountry[0]
        this.store.countryId = this.listCountry[0].value
      })
    },

    /**
     * Hàm lấy thông tin tỉnh/thành phố sau khi chọn quốc gia
     * CeatedBy: LVDat (16/06/2021)
     */
    getProvince (countryId) {
      this.listProvince = []
      this.axios.get('Provinces?pageIndex=1&pageSize=100').then(response => {
        for (let index = 0; index < response.data.data.length; index++) {
          var element = response.data.data[index]
          this.listProvince.push({
            value: element.provinceId,
            text: element.provinceName
          })
          this.$refs.cbbProvince.keyFilter = ''
          this.$refs.cbbDistrict.keyFilter = ''
          this.$refs.cbbWard.keyFilter = ''
        }
      })
    },
    /**
     * Hàm lấy thông tin quận/huyện sau khi chọn tỉnh/thành phố
     * CeatedBy: LVDat (16/06/2021)
     */
    getDistrict (provinceId) {
      this.listDistrict = []
      this.provinceId = provinceId
      this.axios
        .get('Districts/get/byProvince?provinceId=' + this.provinceId)
        .then(response => {
          for (let index = 0; index < response.data.data.length; index++) {
            var element = response.data.data[index]
            this.listDistrict.push({
              value: element.districtId,
              text: element.districtName
            })
          }
          if (this.listDistrict.length === 0) {
            this.districtId = null
            this.wardId = null
          }
          this.$refs.cbbDistrict.keyFilter = ''
          this.$refs.cbbWard.keyFilter = ''
        })
    },
    /**
     * Hàm lấy thông tin xã/phường sau khi chọn quận/huyện
     * CeatedBy: LVDat (16/06/2021)
     */
    getWard (districtId) {
      this.listWard = []
      this.store.districtId = districtId
      this.districtId = districtId
      this.axios
        .get('Wards/get/byDistrict?districtId=' + this.districtId)
        .then(response => {
          for (let index = 0; index < response.data.data.length; index++) {
            var element = response.data.data[index]
            this.listWard.push({
              value: element.wardId,
              text: element.wardName
            })
          }
          if (this.listWard.length === 0) {
            this.wardId = null
          }
          this.$refs.cbbWard.itemSelected = {}
          this.$refs.cbbWard.keyFilter = ''
        })
    },
    confirmPosition (wardId) {
      this.wardId = wardId
      this.store.wardId = wardId
    },
    /**
     * Hàm mặc định focus vào ô input đầu tiên
     * CreatedBy: LVDat (15/06/2021)
     */
    focusInput () {
      setTimeout(() => {
        this.$refs.autofocus.focus()
      }, 10)
    },

    validateStoreCode () {
      if (this.validateData(this.store.storeCode)) {
        this.isWarningCode = false
      } else {
        this.isWarningCode = true
      }
    },
    validateStoreName () {
      if (this.validateData(this.store.storeName)) {
        this.isWarningName = false
      } else {
        this.isWarningName = true
      }
    },
    validateStoreAddress () {
      if (this.validateData(this.store.address)) {
        this.isWarningAddress = false
      } else {
        this.isWarningAddress = true
      }
    },
    validateData (val) {
      if (typeof val === 'undefined' || val === null || val === '') {
        return false
      }
      return true
    },
    /**
     * Hàm lưu dữ liệu
     * CreatedBy: LVDat (19/06/2021)
     */
    saveData (key) {
      // Validate 1 dữ liệu
      this.validateStoreCode()
      this.validateStoreName()
      this.validateStoreAddress()
      // Focus vào ô input lỗi
      if (this.isWarningCode) {
        this.focusInput()
      } else if (this.isWarningName) {
        this.$refs.inputStoreName.focus()
      } else if (this.isWarningAddress) {
        this.$refs.inputStoreAddress.focus()
      } else {
        // Gán lại dữ liệu và thêm
        this.store.provinceId = this.provinceId || null
        this.store.districtId = this.districtId || null
        this.store.wardId = this.wardId || null
        if (this.$refs.cbbProvince.keyFilter === '') {
          this.store.provinceId = null
        }
        if (this.$refs.cbbDistrict.keyFilter === '') {
          this.store.districtId = null
        }
        if (this.$refs.cbbWard.keyFilter === '') {
          this.store.wardId = null
        }
        this.store.editMode = this.editMode
        var listStore = []
        listStore.push(this.store)
        // Gửi request lên server
        this.axios.post('Stores', listStore).then(response => {
          if (response.data.success === true) {
            this.$vToastify.success(response.data.message)
            this.$emit('loadStore')
            this.exitDialog()
          } else {
            this.$emit('displayPopupError')
          }
        })
      }
    },

    editStore (store) {
      this.store = store
      this.countryId = this.store.countryId
      this.provinceId = this.store.provinceId
      this.districtId = this.store.districtId
      this.wardId = this.store.wardId
      if (this.countryId !== null) {
        this.getCountry()
        this.getProvince(this.countryId)
        if (this.provinceId !== null) {
          this.getDistrict(this.provinceId)
          if (this.districtId !== null) {
            this.getWard(this.districtId)
            this.confirmPosition(this.wardId)
          }
        }
      }
      this.store.provinceId = this.provinceId

      setTimeout(() => {
        this.getProvinceById()
        this.getDistrictById()
        this.getWardById()
      }, 100)
    },
    /**
     * Hàm lấy thông tin tỉnh/thành phố theo mã tỉnh/thành phố
     */
    getProvinceById () {
      if (this.provinceId !== null && this.provinceId !== '') {
        this.axios.get('Provinces/' + this.provinceId).then(response => {
          this.$refs.cbbProvince.keyFilter = response.data.data[0].provinceName
          this.$refs.cbbProvince.itemSelected.text =
            response.data.data[0].provinceName
          this.$refs.cbbProvince.itemSelected.value =
            response.data.data[0].provinceId
        })
      }
    },
    /**
     * Lấy thông tin quận huyện theo mã quận/huyện
     */
    getDistrictById () {
      if (this.districtId !== null && this.districtId !== '') {
        this.axios.get('Districts/' + this.districtId).then(response => {
          this.$refs.cbbDistrict.keyFilter = response.data.data[0].districtName
          this.$refs.cbbDistrict.itemSelected.text =
            response.data.data[0].districtName
          this.$refs.cbbDistrict.itemSelected.value =
            response.data.data[0].districtId
        })
      }
    },
    getWardById () {
      if (this.wardId !== null && this.wardId !== '') {
        this.axios.get('Wards/' + this.wardId).then(response => {
          this.$refs.cbbWard.keyFilter = response.data.data[0].wardName
          this.$refs.cbbWard.itemSelected.text = response.data.data[0].wardName
          this.$refs.cbbWard.itemSelected.value = response.data.data[0].wardId
        })
      }
    }
  },
  computed: {
    editModeTitle () {
      if (this.editMode === 1) {
        return 'Thêm mới cửa hàng'
      } else return 'Sửa cửa hàng'
    }
  },
  props: {
    editMode: {
      type: Number,
      default: 1
    }
  },
  watch: {
    // storeMain: function () {
    //   console.log('Main da thay doi', this.storeMain.storeCode)
    // },
    // store: function () {
    //   console.log('Regular da thay doi', this.store.storeCode)
    // }
  }
}
</script>
<style lang="scss" scoped>
@import "../../scss/common.scss";
@import "../../scss/msDialog.scss";
</style>
