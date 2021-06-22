/**
 * option tìm kiếm
 * 1: Chứa
 * 2: Bằng
 * 3: Bắt đầu bằng
 * 4: Kết thúc bằng
 * 5: Không chứa
 */
export const TypeFilter = [
  { key: '*', text: 'Chứa', value: 1 },
  { key: '=', text: 'Bằng', value: 2 },
  { key: '+', text: 'Bắt đầu bằng', value: 3 },
  { key: '-', text: 'Kết thúc bằng', value: 4 },
  { key: '!', text: 'Không chứa', value: 5 }
]

/**
 * Trạng thái hoạt động
 * 0: Ngừng hoạt động
 * 1: Đang hoạt động
 * 2: Tất cả
 */
export const TypeStatus = [
  { value: 2, text: 'Tất cả' },
  { value: 1, text: 'Đang hoạt động' },
  { value: 0, text: 'Ngừng hoạt động' }
]
/**
     * Msg
     */
export const Msg = {
  errorValidate: 'Trường này không được để trống',
  duplicateKey: 'Mã cửa hàng đã tồn tại vui lòng kiểm tra lại'
}
