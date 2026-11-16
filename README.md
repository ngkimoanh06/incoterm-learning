# Cảng Thập Nhất – Hải trình Incoterms® 2020

Trò chơi học Incoterms® 2020 chạy thẳng trên trình duyệt, không cần cài đặt.

## Cách chơi

Mở `index.html` bằng Chrome, Edge hoặc Firefox. Tiến độ tự lưu trong trình duyệt đó.

Nếu muốn chạy qua máy chủ cục bộ (không bắt buộc), mở PowerShell tại thư mục này:

```
powershell -ExecutionPolicy Bypass -File serve.ps1
```

rồi vào http://localhost:8123.

Phông chữ tải từ Google Fonts. Khi không có mạng, game vẫn chạy với phông dự phòng của máy.

## Có gì trong game

- 6 chặng, 17 màn, từ nền tảng tới kỳ sát hạch 20 tình huống rút ngẫu nhiên.
- Bốn cơ chế: dựng tuyến (cắm cờ rủi ro, mốc chi phí rồi cho hàng chạy và gặp sự cố), phân xử tình huống, phân loại thẻ, dựng giá FAS, FOB, CFR, CIF.
- Sổ tay 11 quy tắc kèm công cụ so sánh hai quy tắc bất kỳ.
- Ca trực ôn tập: câu trả lời sai quay lại theo lịch ngắt quãng cho tới khi bạn trả lời đúng nhiều lần.

## Sửa và mở rộng nội dung

Toàn bộ kiến thức nằm trong hai file dữ liệu, không lẫn với mã game:

- `js/data/rules.js`: 11 quy tắc (điểm chuyển rủi ro, mốc chi phí, ai làm gì, lưu ý, nhân vật).
- `js/data/content.js`: câu hỏi (`IG.ITEMS`), bộ thẻ phân loại (`IG.SORTS`), bài toán giá (`IG.PRICE`), các chặng và màn (`IG.CHAPTERS`).

Thêm một tình huống: thêm một mục vào `IG.ITEMS` với `id` riêng, rồi đưa `id` đó vào mảng `items` của màn tương ứng. Các loại câu: `tf` (đúng sai), `party` (ai chịu), `choice` (chọn một), `rules` (chọn quy tắc), `clause` (soi điều khoản).

Mã game: `js/core.js` (lưu tiến độ, ôn tập, âm thanh), `js/art.js` (hình vẽ), `js/modes.js` (bốn cơ chế chơi), `js/app.js` (các màn hình).

## Nguồn kiến thức

Ghi chép bài giảng và bộ câu hỏi trắc nghiệm môn Giao dịch thương mại quốc tế, bản Incoterms® 2020 của ICC. Phần phạm vi bảo hiểm (A), (B), (C) là kiến thức bổ sung theo Institute Cargo Clauses 2009, được ghi chú ngay trong game.
