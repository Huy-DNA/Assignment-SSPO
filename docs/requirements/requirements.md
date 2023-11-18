# Requirements

## Functional requirements

### Đối với bộ phận dịch vụ in sinh viên — SPSO (system manager)

* Hạn chế và tùy chỉnh loại file được phép in.
* Có thể xem lại lịch sử in của tất cả sinh viên và các bộ phận in ấn.
* Có thể thêm, kích hoạt, ngừng kích hoạt máy in trên web.
* Tính năng quản lý và tùy chỉnh máy in.
* Tính năng xem và lưu lại báo cáo một cách tự động mỗi cuối tháng và cuối năm.
* Lưu lại lịch sử in của tất cả sinh viên.
* Có tính năng xác thực người dùng quản trị trước khi sử dụng.
* Có thể xem báo cáo in ấn của sinh viên trong vòng 1 tuần và 1 tháng.

### Đối với sinh viên (end user)

* Có thể upload file lên hệ thống.
* Có thể chọn máy in để thực hiện việc in tài liệu và cài đặt in.
* Có thể xem lại thông tin các file đã in ấn.
* Có thể xem lại số tiền đã sử dụng cho việc in ấn.
* Có thể mua thêm giấy in.
* Có tính năng thông báo số lượng giấy còn lại.
* Có tính năng đăng nhập tài khoản.
* Có tính năng đánh giá, đưa ra feedback sau khi thực hiện quá trình in ấn.
* Có tính năng xác thực sinh viên trước khi sử dụng.

### Đối với lập trình viên

* Có tính năng test trang web.
* Có tính năng tạm dừng dịch vụ tạm thời.

## Non-functional requirements

* Bảo mật (security):
  * Ứng dụng bảo mật theo các tiêu chí của chuẩn OWASP.
  * Tài liệu được gửi lên hệ thống không truy cập được ngoài tài khoản sinh viên đã upload tài liệu đó.
* Khả năng tiếp cận (accessibility):
  * Có khả năng thích ứng với nhiều kích cỡ màn hình khác nhau (desktop, mobile,
tablet).
  ∗ Hỗ trợ màn hình desktop kích thước từ 1280×720 đến 1920×1080.
  ∗ Hỗ trợ màn hình mobile kích thước từ 360×640 đến 414×896.
  ∗ Hỗ trợ màn hình máy tính bảng kích thước từ 601×962 đến 1280×800.
* Hỗ trợ đa trình duyệt: Thích ứng với Chrome, Safari, Edge và Firefox.
* Khả năng mở rộng (scalability):
  * Hệ thống có thể phục vụ ổn định với ít nhất 300 người dùng cùng một lúc.
* Người quản lý SPSO và sinh viên có thể hiểu cách sử dụng hệ thống trong vòng 5 phút.
* Hỗ trợ thanh toán qua BKPAY.
* Hỗ trợ đăng nhập bằng nền tảng HCMUT_SSO.
* Hiệu năng (performance):
  * Thời gian truy xuất danh sách các máy in không quá 1 giây.
  * Thời gian thực hiện thêm/bớt/chỉnh sửa các máy in không quá 1 giây.
  * Thời gian truy xuất thông tin về một tài khoản người dùng không quá 1 giây