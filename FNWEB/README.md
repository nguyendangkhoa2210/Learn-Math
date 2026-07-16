# MathUniverse — Hệ Thống Học Toán Tương Tác

Ứng dụng web học toán tương tác dành cho học sinh Tiểu học → THCS → THPT và giáo viên. Chạy hoàn toàn phía client (không cần backend/server), lưu dữ liệu bằng `localStorage`, có thể cài đặt như một ứng dụng (PWA) và chạy offline.

## 1. Công nghệ sử dụng

| Thành phần | Công nghệ |
|---|---|
| Giao diện | HTML5 + CSS3 thuần (không framework) |
| Logic | JavaScript thuần (Vanilla JS, ES6+) |
| Lưu trữ | `localStorage` của trình duyệt |
| Đồ họa | SVG sinh động bằng JS (hình học, đồ thị hàm số) |
| PWA | Web App Manifest + Service Worker (cache-first) |
| Xuất PDF | `window.print()` với CSS `@media print` |

Không có phụ thuộc ngoài (không npm, không CDN framework) — chỉ dùng Google Fonts qua `<link>`.

## 2. Cấu trúc file

```
├── index.html            # Toàn bộ cấu trúc DOM: sidebar, panel công thức, quiz, modal
├── app-core.js            # Điều hướng, tìm kiếm, bookmark, thống kê, sao lưu, dark mode, âm thanh, onboarding, PWA
├── formulas.js             # Toàn bộ hàm tính công thức (run*) + vẽ SVG minh họa hình học
├── quiz.js                 # Ngân hàng câu hỏi, chấm điểm, luyện tập thích ứng, điểm cao
├── extras.js                # Trình chiếu, tạo đề thi PDF, flashcard ôn thi nhanh
├── style.css                # Toàn bộ giao diện: design tokens, responsive, dark mode, print, a11y
├── manifest.json             # Khai báo PWA (tên, icon, màu chủ đạo)
├── icon.svg                  # Icon ứng dụng
└── service-worker.js          # Cache tài nguyên tĩnh để chạy offline
```

> **Lưu ý:** trước đây toàn bộ logic nằm trong 1 file `app.js` duy nhất (~1660 dòng). File đã được **chia thành 4 module theo chức năng** để dễ đọc, dễ debug, và dễ mở rộng — mỗi file dưới 600 dòng. Thứ tự nạp trong `index.html` không quan trọng về mặt kỹ thuật (các hàm đều ở global scope) nhưng nên giữ nguyên thứ tự `app-core → formulas → quiz → extras` cho dễ theo dõi.

## 3. Kiến trúc & luồng dữ liệu

### 3.1. Hai chế độ chính
- **Chế độ Học (`learn-panels`)**: tra cứu công thức, nhập số liệu → tính toán → hiển thị kết quả + minh họa SVG (nếu là hình học).
- **Chế độ Luyện Tập (`quiz-panels`)**: chọn cấp độ → chọn độ khó → làm 10 câu hỏi random → chấm điểm → lưu lịch sử.

Chuyển đổi qua `switchMode('learn' | 'quiz')` trong `app.js`.

### 3.2. Ngân hàng câu hỏi (`quizGenerators`)
Mỗi cấp độ (`cap1`, `cap2`, `cap3`) có một mảng các **hàm sinh câu hỏi**. Mỗi hàm nhận tham số `scale` (hệ số độ khó: `easy=1`, `medium=1.8`, `hard=3`) và trả về:
```js
{ text, answer, tolerance, steps }
```
`steps` là mảng các bước giải, hiển thị ngay sau khi học sinh trả lời (đúng hoặc sai) — đây là điểm khác biệt giữa "kiểm tra" và "học qua kiểm tra".

### 3.3. Dữ liệu lưu trong `localStorage`
| Key | Nội dung |
|---|---|
| `mathuniverse_highscore_cap1/2/3` | Điểm cao nhất mỗi cấp |
| `mu_total_quiz` | Tổng số lần làm quiz |
| `mu_recent` | Danh sách công thức xem gần đây |
| `mu_viewed_set` | Tập công thức đã từng xem (đếm số lượng) |
| `mu_bookmarks` | Danh sách công thức đã đánh dấu sao |
| `mu_darkmode` | Trạng thái chế độ tối |

Tất cả key này có thể **xuất ra file JSON** (nút "💾 Sao Lưu" trong modal Thống Kê) để chuyển sang máy khác hoặc phòng mất dữ liệu khi xóa cache trình duyệt, và **nhập lại** bằng nút "📥 Khôi Phục".

### 3.4. Sinh đề thi PDF
Hàm `generateExam()` tái sử dụng chính `quizGenerators` để sinh N câu hỏi, render vào `<div id="exam-print-area">` (ẩn khỏi màn hình thường, chỉ hiện khi in nhờ CSS `@media print`), sau đó gọi `window.print()`. Người dùng chọn "Save as PDF" ở hộp thoại in của trình duyệt để xuất file — không cần thư viện PDF nào.

### 3.5. Chế độ trình chiếu
`togglePresentMode()` bật class `presentation-mode` trên `<body>`, CSS sẽ ẩn sidebar/thanh công cụ và phóng to nội dung panel hiện tại. Điều hướng bằng `presentNext()` / `presentPrev()` (nút bấm hoặc phím mũi tên trái/phải), thoát bằng ESC.

### 3.6. SVG minh họa hình học & đồ thị
Các hàm `draw*SVG(containerId, ...)` (VD: `drawRectangleSVG`, `drawCircleSVG`, `drawParabolaSVG`) sinh chuỗi SVG động dựa trên số liệu người dùng nhập, gán vào `<div class="geo-svg-wrap">` tương ứng sau mỗi lần bấm "Tính". Đồ thị hàm bậc 2 (`drawParabolaSVG`) tự động chọn khoảng nhìn quanh đỉnh parabol để hiển thị đẹp mắt.

## 4. Danh sách tính năng

**Công thức (32 chuyên đề, 3 cấp học):**
- Cấp 1: Cửu chương, HCN, hình vuông, tam giác, tìm X, **toán chuyển động, tỉ lệ % **
- Cấp 2: Pytago, hệ phương trình 2 ẩn, hình thang, hình tròn, hằng đẳng thức, **bất phương trình bậc nhất**
- Cấp 3: Phương trình bậc 2, lượng giác, đạo hàm, cấp số cộng, tổ hợp/chỉnh hợp, hình hộp CN, hình lập phương, hình trụ, hình cầu, hình chóp, thống kê cơ bản, khảo sát hàm bậc 2 (có đồ thị), tích phân cơ bản, **bất phương trình bậc hai, hệ thức lượng tam giác, phương trình lượng giác cơ bản, cấp số nhân, lũy thừa & logarit**

**Ôn tập & học hiệu quả:**
- **Flashcard ôn thi nhanh** — lật thẻ xem nhanh toàn bộ công thức, lọc theo cấp
- **Luyện tập thích ứng** — hệ thống tự động ưu tiên ra lại các dạng câu học sinh hay sai (dựa trên trọng số lưu ở `mu_weak_capX`)
- **Âm thanh phản hồi** đúng/sai khi làm quiz (Web Audio API, có thể tắt)


**Luyện tập & đánh giá:**
- Quiz 10 câu ngẫu nhiên/lần, 3 mức độ khó, đếm giờ 30s/câu, giải thích từng bước
- Thống kê tách theo Cấp 1/2/3 (số lần làm, điểm TB, điểm cao nhất, lịch sử 5 lần gần nhất)
- Đánh dấu (bookmark) công thức yêu thích, xem lại nhanh

**Dành cho giáo viên:**
- Sinh đề thi ngẫu nhiên (10/20/30 câu) kèm đáp án, xuất PDF qua in trình duyệt
- Chế độ trình chiếu toàn màn hình cho giảng dạy trên lớp

**Khác:**
- Chế độ tối (dark mode)
- Sao lưu/khôi phục toàn bộ dữ liệu qua file JSON
- PWA: cài đặt như app, hoạt động offline sau lần truy cập đầu

## 5. Hướng dẫn chạy & triển khai

**Chạy cục bộ (đơn giản nhất):** mở trực tiếp `index.html` bằng trình duyệt. Lưu ý: Service Worker (chức năng offline) **chỉ hoạt động khi phục vụ qua HTTP(S)**, không hoạt động với `file://`. Có thể dùng:
```bash
# Python có sẵn trên hầu hết máy:
python3 -m http.server 8000
# rồi mở http://localhost:8000
```

**Triển khai lên hosting tĩnh** (Netlify, GitHub Pages, Vercel, InfinityFree...): upload nguyên cụm 6 file (`index.html`, `app.js`, `style.css`, `manifest.json`, `icon.svg`, `service-worker.js`) vào cùng một thư mục gốc — không cần cấu hình build hay backend.

## 6. Hướng phát triển tiếp theo (gợi ý)
- Vẽ đồ thị cho hàm bậc nhất, hàm phân thức
- Thêm chuyên đề Xác suất nâng cao (biến cố, quy tắc cộng/nhân)
- Đồng bộ dữ liệu qua tài khoản (cần backend) thay vì chỉ `localStorage`
- Bảng xếp hạng nhiều học sinh (cần backend hoặc dịch vụ như Firebase)
