/* Cảng Thập Nhất — dữ liệu 11 quy tắc Incoterms® 2020
   Muốn cập nhật kiến thức: sửa file này và content.js, không cần đụng tới mã game. */
window.IG = window.IG || {};

/* 8 mốc trên hành trình. x là toạ độ trên khung cảnh rộng 1000. */
IG.POINTS = [
  { id: 0, x: 60,  short: 'Tại xưởng',        label: 'Tại cơ sở người bán, hàng chưa bốc lên xe' },
  { id: 1, x: 150, short: 'Đã bốc lên xe',    label: 'Đã bốc xong lên xe do người mua cử đến, tại cơ sở người bán' },
  { id: 2, x: 300, short: 'Giao người chở',   label: 'Giao cho người chuyên chở tại điểm tập kết ở nước xuất khẩu (bãi container, ga, sân bay)' },
  { id: 3, x: 395, short: 'Dọc mạn tàu',      label: 'Đặt dọc mạn tàu tại cảng bốc, trong tầm cẩu' },
  { id: 4, x: 470, short: 'Trên tàu',         label: 'Hàng đã nằm an toàn trên tàu tại cảng bốc' },
  { id: 5, x: 690, short: 'Cảng đến',         label: 'Tàu tới cảng đến, hàng còn trên tàu' },
  { id: 6, x: 880, short: 'Nơi đến, chưa dỡ', label: 'Tới nơi đến, hàng còn trên phương tiện, sẵn sàng để dỡ' },
  { id: 7, x: 950, short: 'Đã dỡ xong',       label: 'Đã dỡ xong khỏi phương tiện tại nơi đến' }
];

/* Sự cố dùng chung cho màn "Dựng tuyến". x nằm giữa hai mốc. */
IG.INCIDENTS = {
  loadFactory: { x: 105, text: 'Xe nâng trượt càng khi bốc hàng lên xe ở xưởng, vỡ 2 kiện.' },
  inlandExp:   { x: 225, text: 'Xe tải va quẹt trên đường từ xưởng ra cảng, móp một phần hàng.' },
  yard:        { x: 350, text: 'Mưa lớn làm ngập bãi cảng đi, hàng nằm chờ tàu bị ướt.' },
  loading:     { x: 432, text: 'Đứt cáp cẩu khi đang đưa kiện hàng lên tàu, kiện rơi xuống cầu cảng.' },
  sea:         { x: 580, text: 'Bão giữa biển, nước tràn vào hầm hàng, hỏng 30% lô hàng.' },
  inlandImp:   { x: 800, text: 'Xe lật trên đường từ cảng đến về kho, hàng hư hỏng nặng.' },
  unload:      { x: 915, text: 'Kiện hàng rơi khi đang dỡ xuống tại nơi đến.' }
};

IG.GROUPS = {
  E: { name: 'Nhóm E', desc: 'Giao tại xưởng. Người bán làm ít nhất.' },
  F: { name: 'Nhóm F', desc: 'Người bán giao cho người chuyên chở do người mua thuê. Cước chặng chính người mua trả.' },
  C: { name: 'Nhóm C', desc: 'Người bán thuê và trả cước chặng chính, nhưng rủi ro đã chuyển từ nơi đi.' },
  D: { name: 'Nhóm D', desc: 'Người bán chịu rủi ro và chi phí tới tận nơi đến.' }
};

/* risk / cost: chỉ số mốc trong IG.POINTS
   carriage: ai ký hợp đồng vận tải chặng chính (S người bán, B người mua)
   insurance: 'S' = người bán BẮT BUỘC mua cho người mua; 'none' = không ai bị bắt buộc
   exp / imp: ai thông quan xuất khẩu / nhập khẩu; unload: ai dỡ hàng tại nơi đến */
IG.RULES = [
  {
    code: 'EXW', name: 'Ex Works', vn: 'Giao tại xưởng', group: 'E', mode: 'any', color: '#8d6e4f',
    risk: 0, cost: 0, carriage: 'B', insurance: 'none', exp: 'B', imp: 'B', unload: 'B',
    named: 'nơi giao hàng (thường là cơ sở người bán)',
    example: 'EXW Công ty ABC, Thạnh Mỹ Tây, TP.HCM, Việt Nam, Incoterms® 2020',
    who: 'Lão Xưởng', line: 'Hàng để sẵn ở cổng xưởng. Tự tới mà chở.',
    keyword: 'Người bán làm ít nhất. Không bốc hàng, không thông quan xuất khẩu.',
    riskWhy: 'EXW: người bán giao hàng khi đặt hàng dưới quyền định đoạt của người mua tại cơ sở của mình, hàng chưa bốc lên xe. Rủi ro chuyển ngay tại đó.',
    costWhy: 'EXW: chi phí của người bán dừng ở cổng xưởng. Bốc hàng, vận tải, thông quan đều do người mua chịu.',
    notes: [
      'Nên ghi rõ điểm giao hàng cụ thể. Nếu không, người bán được chọn điểm phù hợp nhất với mình.',
      'Người bán không có nghĩa vụ bốc hàng. Nếu bốc giúp thì rủi ro và chi phí bốc hàng vẫn thuộc người mua.',
      'Người mua tự làm thủ tục xuất khẩu lẫn nhập khẩu. Người bán chỉ hỗ trợ thông tin.',
      'Hợp với mua bán nội địa, hoặc khi người mua có đại diện ở nước xuất khẩu và đi gom hàng nhiều nơi.',
      'Người mua ngại rủi ro bốc hàng hoặc khó thông quan xuất khẩu thì chuyển sang FCA.',
      'Biến thể EXW Loaded, EXW Cleared for Export không có trong Incoterms: phải ghi rõ trong hợp đồng ai chịu rủi ro và chi phí.'
    ],
    confuse: ['FCA', 'DDP'],
    face: { skin: '#e9b98a', hair: '#6b6b6b', hairStyle: 'bald', hat: 'cap', hatColor: '#5b4632', shirt: '#d8c7a8', extra: 'mustache' }
  },
  {
    code: 'FCA', name: 'Free Carrier', vn: 'Giao cho người chuyên chở', group: 'F', mode: 'any', color: '#2f9e63',
    risk: 2, riskAlt: 1, cost: 2, carriage: 'B', insurance: 'none', exp: 'S', imp: 'B', unload: 'B',
    named: 'nơi giao hàng ở nước xuất khẩu',
    example: 'FCA Sân bay Tân Sơn Nhất, Việt Nam, Incoterms® 2020',
    who: 'Cô Trao', line: 'Thông quan xuất xong, tôi trao tận tay người chuyên chở của anh.',
    keyword: 'Hai cách giao: tại xưởng thì bốc lên xe người mua; nơi khác thì để trên xe người bán, sẵn sàng để dỡ.',
    riskWhy: 'FCA: giao tại cơ sở người bán thì rủi ro chuyển khi hàng đã bốc xong lên xe do người mua cử đến. Giao ở nơi khác thì rủi ro chuyển khi hàng nằm trên xe người bán, sẵn sàng để dỡ, đặt dưới quyền định đoạt của người chuyên chở do người mua chỉ định.',
    costWhy: 'FCA: người bán chịu chi phí tới điểm giao hàng, gồm cả thông quan xuất khẩu. Cước chặng chính do người mua trả.',
    notes: [
      'Hợp đồng phải nói rõ nơi giao có phải cơ sở người bán hay không, vì hai trường hợp chuyển rủi ro khác nhau.',
      'Giao ngoài cơ sở người bán: hàng chỉ cần "sẵn sàng để dỡ", người bán không dỡ xuống.',
      'Hàng container, hàng không, đa phương thức: dùng FCA thay cho FAS, FOB. Container giao ở bãi (CY) chứ không giao thẳng lên tàu.',
      'Điểm mới 2020: nếu hai bên thỏa thuận, người mua chỉ thị người chuyên chở cấp cho người bán vận đơn có ghi "on board" (hữu ích khi thanh toán bằng L/C).',
      'Điểm mới 2020: người mua có thể tự dùng phương tiện của mình để nhận hàng, không nhất thiết phải thuê người chuyên chở.',
      'Người mua phải báo cho người bán tên người chuyên chở, phương thức, thời gian và điểm nhận hàng.'
    ],
    confuse: ['EXW', 'FOB', 'CPT'],
    face: { skin: '#f3cfa6', hair: '#2a1d16', hairStyle: 'bun', hat: 'none', hatColor: '#2f9e63', shirt: '#e8f4ec', extra: 'none' }
  },
  {
    code: 'FAS', name: 'Free Alongside Ship', vn: 'Giao dọc mạn tàu', group: 'F', mode: 'sea', color: '#7b5ea7',
    risk: 3, cost: 3, carriage: 'B', insurance: 'none', exp: 'S', imp: 'B', unload: 'B',
    named: 'cảng bốc hàng',
    example: 'FAS Cảng Tiên Sa, Đà Nẵng, Việt Nam, Incoterms® 2020',
    who: 'Chú Mạn', line: 'Tôi đặt hàng dọc mạn tàu, trong tầm cẩu. Bốc lên là việc của anh.',
    keyword: 'Dọc mạn tàu: trên cầu cảng hoặc sà lan, cần cẩu của tàu với tới được.',
    riskWhy: 'FAS: người bán giao hàng khi đặt hàng dọc mạn con tàu do người mua chỉ định tại cảng bốc. Việc xếp lên tàu là rủi ro và chi phí của người mua.',
    costWhy: 'FAS: người bán chịu chi phí tới khi hàng nằm dọc mạn tàu, gồm thông quan xuất khẩu. Xếp lên tàu và cước biển do người mua trả.',
    notes: [
      'Chỉ dùng cho vận tải biển và thủy nội địa.',
      'Tàu không cập được cầu cảng: người bán phải đưa hàng ra dọc mạn tàu bằng sà lan. Phí lõng hàng (lighterage) nên ghi rõ ai chịu.',
      'Nên ghi rõ điểm xếp hàng tại cảng. Nếu người mua không báo thì người bán được chọn.',
      'Chứng từ thường chỉ là biên nhận "nhận để xếp", chưa phải vận đơn đã xếp hàng.',
      'Hàng container thì chuyển sang FCA.'
    ],
    confuse: ['FOB', 'FCA'],
    face: { skin: '#d9a877', hair: '#3a2a20', hairStyle: 'short', hat: 'beanie', hatColor: '#4d3a70', shirt: '#cfc4e6', extra: 'beard' }
  },
  {
    code: 'FOB', name: 'Free On Board', vn: 'Giao trên tàu', group: 'F', mode: 'sea', color: '#1f4e9c',
    risk: 4, cost: 4, carriage: 'B', insurance: 'none', exp: 'S', imp: 'B', unload: 'B',
    named: 'cảng bốc hàng',
    example: 'FOB Tân Cảng, Việt Nam, Incoterms® 2020',
    who: 'Thuyền phó Boong', line: 'Hàng nằm yên trên tàu rồi tôi mới buông tay.',
    keyword: 'On board: hàng đã ở trên tàu. Không còn tính theo lan can tàu.',
    riskWhy: 'FOB: người bán giao hàng khi hàng đã được xếp lên con tàu do người mua chỉ định tại cảng bốc. Trước lúc đó mọi tổn thất thuộc người bán.',
    costWhy: 'FOB: người bán chịu chi phí tới khi hàng lên tàu, gồm thông quan xuất khẩu và xếp hàng. Cước biển do người mua trả.',
    notes: [
      'Chỉ dùng cho vận tải biển và thủy nội địa.',
      'Rủi ro chuyển khi hàng đã ở trên tàu. "Lan can tàu" là cách tính của Incoterms 2000, đã bỏ từ 2010.',
      'Hàng rơi vỡ trong lúc đang xếp, khi chưa nằm yên trên tàu: người bán chịu.',
      'Hàng container giao tại bãi (CY) trước khi tàu đến: nếu vẫn ghi FOB thì người bán chịu rủi ro suốt thời gian nằm bãi. Nên dùng FCA.',
      'Người mua phải báo tên tàu, điểm xếp hàng, thời gian giao. Tàu đến trễ hoặc không nhận hàng: rủi ro chuyển sớm cho người mua kể từ ngày đã thỏa thuận.',
      'Không dùng lẫn các thuật ngữ thuê tàu FI, FO, FIO vào điều kiện giao hàng.'
    ],
    confuse: ['FAS', 'FCA', 'CFR'],
    face: { skin: '#efc49a', hair: '#1c1c1c', hairStyle: 'short', hat: 'captain', hatColor: '#16346b', shirt: '#f4f6fb', extra: 'none' }
  },
  {
    code: 'CFR', name: 'Cost and Freight', vn: 'Tiền hàng và cước phí', group: 'C', mode: 'sea', color: '#c9772b',
    risk: 4, cost: 5, carriage: 'S', insurance: 'none', exp: 'S', imp: 'B', unload: 'B',
    named: 'cảng đến',
    example: 'CFR Cảng Hải Phòng, Việt Nam, Incoterms® 2020',
    who: 'Anh Cước', line: 'Cước tới cảng đến tôi trả. Còn rủi ro, tôi buông từ lúc hàng lên tàu.',
    keyword: 'Hai điểm tới hạn: rủi ro chuyển ở cảng đi, chi phí kéo tới cảng đến.',
    riskWhy: 'CFR: rủi ro chuyển khi hàng đã lên tàu ở cảng bốc, giống hệt FOB. Việc người bán trả cước không kéo dài trách nhiệm rủi ro của họ.',
    costWhy: 'CFR: người bán ký hợp đồng vận tải và trả cước tới cảng đến ghi trong hợp đồng. Chi phí dỡ ở cảng đến do người mua trả, trừ khi đã nằm trong cước.',
    notes: [
      'Chỉ dùng cho vận tải biển và thủy nội địa. Hàng container thì dùng CPT.',
      'Tên cảng ghi sau CFR là cảng đến, không phải nơi chuyển rủi ro.',
      'Người bán thuê tàu theo điều kiện thông thường, hành trình thông thường, tàu phù hợp với loại hàng.',
      'Không ai bắt buộc phải mua bảo hiểm, nhưng người mua nên mua vì mình chịu rủi ro trên biển.',
      'Phí dỡ ở cảng đến: nếu hợp đồng vận tải quy định người bán trả thì người bán không được đòi lại người mua, trừ khi có thỏa thuận.',
      'Hợp đồng nhóm C là hợp đồng gửi hàng: chỉ quy định thời gian giao hàng, không cam kết ngày hàng đến.'
    ],
    confuse: ['FOB', 'CIF', 'CPT'],
    face: { skin: '#e2b184', hair: '#2b2118', hairStyle: 'short', hat: 'cap', hatColor: '#9a5417', shirt: '#f6dcc0', extra: 'none' }
  },
  {
    code: 'CIF', name: 'Cost, Insurance and Freight', vn: 'Tiền hàng, bảo hiểm và cước phí', group: 'C', mode: 'sea', color: '#d6a514',
    risk: 4, cost: 5, carriage: 'S', insurance: 'S', insClause: 'C', exp: 'S', imp: 'B', unload: 'B',
    named: 'cảng đến',
    example: 'CIF Cảng Hải Phòng, Việt Nam, Incoterms® 2020',
    who: 'Chị Cước Ô Nhỏ', line: 'Cước tôi trả, kèm một chiếc ô nhỏ loại C che cho hàng của anh.',
    keyword: 'CFR cộng bảo hiểm. Mặc định điều kiện (C), tối thiểu 110% giá hợp đồng.',
    riskWhy: 'CIF: rủi ro chuyển khi hàng đã lên tàu ở cảng bốc. Người bán mua bảo hiểm nhưng là bảo hiểm cho rủi ro của người mua.',
    costWhy: 'CIF: người bán trả cước và phí bảo hiểm tới cảng đến ghi trong hợp đồng.',
    notes: [
      'Giống CFR, thêm nghĩa vụ mua bảo hiểm và giao chứng từ bảo hiểm cho người mua.',
      'Mặc định: Institute Cargo Clauses (C), mức thấp nhất. Muốn (A) hoặc (B) phải thỏa thuận và người mua chịu phần phí thêm.',
      'Số tiền bảo hiểm tối thiểu 110% giá hợp đồng, bằng đồng tiền của hợp đồng.',
      'Bảo hiểm từ điểm giao hàng tới ít nhất là cảng đến. Người mua có quyền đòi bồi thường trực tiếp từ hãng bảo hiểm.',
      'Bảo hiểm chiến tranh, đình công là phần mua thêm, người mua yêu cầu và trả phí.',
      'Hay dùng cho hàng nguyên liệu, hàng rời, hàng dễ bán lại trong hành trình.'
    ],
    confuse: ['CFR', 'CIP', 'FOB'],
    face: { skin: '#f1cba3', hair: '#3b2416', hairStyle: 'long', hat: 'none', hatColor: '#d6a514', shirt: '#fff3c9', extra: 'umbrellaS' }
  },
  {
    code: 'CPT', name: 'Carriage Paid To', vn: 'Cước phí trả tới', group: 'C', mode: 'any', color: '#17939f',
    risk: 2, cost: 6, carriage: 'S', insurance: 'none', exp: 'S', imp: 'B', unload: 'B',
    named: 'nơi đến',
    example: 'CPT Sân bay Nội Bài, Việt Nam, Incoterms® 2020',
    who: 'Anh Tải', line: 'Xe, tàu hỏa hay máy bay, cước tới nơi đến tôi lo. Rủi ro tôi buông khi giao cho người chuyên chở đầu tiên.',
    keyword: 'Bản mọi phương thức của CFR. Rủi ro chuyển khi giao cho người chuyên chở do người bán thuê.',
    riskWhy: 'CPT: rủi ro chuyển khi người bán giao hàng cho người chuyên chở do chính mình thuê. Nếu có nhiều chặng, mặc định là người chuyên chở đầu tiên.',
    costWhy: 'CPT: người bán ký hợp đồng vận tải và trả cước tới nơi đến ghi trong hợp đồng.',
    notes: [
      'Dùng cho mọi phương thức vận tải. Dùng thay CFR khi hàng đóng container, đi hàng không hay đa phương thức.',
      'Tên địa điểm ghi sau CPT là nơi đến. Nên ghi rõ cả điểm giao hàng, vì đó mới là nơi chuyển rủi ro.',
      'Nhiều người chuyên chở nối nhau: mặc định rủi ro chuyển ở người đầu tiên. Muốn chuyển muộn hơn phải ghi trong hợp đồng.',
      'Phí dỡ tại nơi đến: nếu đã nằm trong hợp đồng vận tải thì người bán không đòi lại được.',
      'Người mua nên tự mua bảo hiểm cho chặng vận chuyển.'
    ],
    confuse: ['CFR', 'CIP', 'DAP', 'FCA'],
    face: { skin: '#e6b98e', hair: '#1f1a17', hairStyle: 'short', hat: 'hardhat', hatColor: '#f5c518', shirt: '#c9eef1', extra: 'glasses' }
  },
  {
    code: 'CIP', name: 'Carriage and Insurance Paid To', vn: 'Cước phí và bảo hiểm trả tới', group: 'C', mode: 'any', color: '#d6247a',
    risk: 2, cost: 6, carriage: 'S', insurance: 'S', insClause: 'A', exp: 'S', imp: 'B', unload: 'B',
    named: 'nơi đến',
    example: 'CIP Sân bay Nội Bài, Việt Nam, Incoterms® 2020',
    who: 'Chị Tải Ô Lớn', line: 'Cước tôi trả, kèm chiếc ô lớn loại A. Đồ điện tử của anh cần ô lớn.',
    keyword: 'CPT cộng bảo hiểm. Từ 2020 mặc định điều kiện (A), mức cao nhất.',
    riskWhy: 'CIP: rủi ro chuyển khi giao hàng cho người chuyên chở do người bán thuê, giống CPT.',
    costWhy: 'CIP: người bán trả cước và phí bảo hiểm tới nơi đến ghi trong hợp đồng.',
    notes: [
      'Giống CPT, thêm nghĩa vụ mua bảo hiểm.',
      'Điểm mới 2020: mặc định Institute Cargo Clauses (A). Bản 2010 chỉ yêu cầu mức tối thiểu (C).',
      'Lý do đổi: CIP hay dùng cho hàng thành phẩm, giá trị cao, đóng container, dễ mất cắp và đổ vỡ.',
      'Số tiền bảo hiểm tối thiểu 110% giá hợp đồng, bằng đồng tiền hợp đồng, tới ít nhất là nơi đến.',
      'Hai bên vẫn có thể thỏa thuận mức thấp hơn.'
    ],
    confuse: ['CIF', 'CPT', 'DAP'],
    face: { skin: '#f4d2ac', hair: '#161616', hairStyle: 'bun', hat: 'none', hatColor: '#d6247a', shirt: '#ffd9ea', extra: 'umbrellaL' }
  },
  {
    code: 'DAP', name: 'Delivered at Place', vn: 'Giao tại địa điểm', group: 'D', mode: 'any', color: '#5a8f3c',
    risk: 6, cost: 6, carriage: 'S', insurance: 'none', exp: 'S', imp: 'B', unload: 'B',
    named: 'nơi đến, cũng là nơi giao hàng',
    example: 'DAP Công ty May 10, Gia Lâm, Hà Nội, Việt Nam, Incoterms® 2020',
    who: 'Bác Tới', line: 'Tôi chở tới tận nơi. Hàng còn trên xe, mời anh dỡ.',
    keyword: 'Tới nơi, chưa dỡ. Người mua dỡ hàng và thông quan nhập khẩu.',
    riskWhy: 'DAP: người bán chịu mọi rủi ro tới khi hàng đặt dưới quyền định đoạt của người mua trên phương tiện, sẵn sàng để dỡ, tại nơi đến.',
    costWhy: 'DAP: người bán chịu chi phí tới nơi đến. Dỡ hàng và thuế, thủ tục nhập khẩu do người mua chịu.',
    notes: [
      'Phải ghi thật rõ điểm đến: đó là nơi chuyển cả rủi ro lẫn chi phí.',
      'Người mua dỡ hàng và chịu rủi ro dỡ hàng. Nếu hợp đồng vận tải đã gồm phí dỡ thì người bán không đòi lại được.',
      'Người mua thông quan nhập khẩu. Nếu người mua không thông quan được và hàng kẹt lại, tổn thất phát sinh thuộc người mua.',
      'Không ai bị bắt buộc mua bảo hiểm, nhưng người bán chịu rủi ro cả chặng nên thường tự mua.',
      'DAP thay cho DAF, DES, DDU của Incoterms 2000.',
      'Muốn người bán dỡ hàng: dùng DPU. Muốn người bán thông quan nhập khẩu: dùng DDP.'
    ],
    confuse: ['DPU', 'DDP', 'CPT'],
    face: { skin: '#dba878', hair: '#8a8a8a', hairStyle: 'short', hat: 'conical', hatColor: '#e9d9a6', shirt: '#dcedcf', extra: 'none' }
  },
  {
    code: 'DPU', name: 'Delivered at Place Unloaded', vn: 'Giao tại địa điểm đã dỡ xuống', group: 'D', mode: 'any', color: '#b5482e',
    risk: 7, cost: 7, carriage: 'S', insurance: 'none', exp: 'S', imp: 'B', unload: 'S',
    named: 'nơi đến, cũng là nơi giao hàng',
    example: 'DPU CFS Chùa Vẽ, Hải Phòng, Việt Nam, Incoterms® 2020',
    who: 'Bác Dỡ', line: 'Trong mười một anh em, chỉ mình tôi dỡ hàng xuống rồi mới giao.',
    keyword: 'Quy tắc duy nhất người bán phải dỡ hàng tại nơi đến.',
    riskWhy: 'DPU: người bán chịu rủi ro tới khi hàng đã được dỡ xong khỏi phương tiện tại nơi đến.',
    costWhy: 'DPU: người bán chịu chi phí tới nơi đến và cả chi phí dỡ hàng. Thuế, thủ tục nhập khẩu do người mua chịu.',
    notes: [
      'Tên cũ là DAT (Delivered at Terminal) trong Incoterms 2010. Đổi tên vì nơi giao có thể là bất kỳ đâu, không chỉ bến bãi.',
      'Trong bản 2020, DPU xếp sau DAP vì giao muộn hơn DAP một bước dỡ hàng.',
      'Người bán không nên dùng DPU nếu người chuyên chở của mình không thu xếp được việc dỡ hàng tại nơi đến.',
      'Người mua thông quan nhập khẩu.'
    ],
    confuse: ['DAP', 'DDP'],
    face: { skin: '#cf9a6c', hair: '#2a2a2a', hairStyle: 'short', hat: 'hardhat', hatColor: '#b5482e', shirt: '#f3d3c8', extra: 'mustache' }
  },
  {
    code: 'DDP', name: 'Delivered Duty Paid', vn: 'Giao đã trả thuế', group: 'D', mode: 'any', color: '#3d3d8f',
    risk: 6, cost: 6, carriage: 'S', insurance: 'none', exp: 'S', imp: 'S', unload: 'B',
    named: 'nơi đến, cũng là nơi giao hàng',
    example: 'DDP Công ty IMC, KCN Từ Liêm, Hà Nội, Việt Nam, Incoterms® 2020',
    who: 'Ngài Trọn Gói', line: 'Thuế nhập khẩu tôi cũng nộp nốt. Anh chỉ việc dỡ hàng.',
    keyword: 'Người bán làm nhiều nhất: thông quan cả xuất lẫn nhập, nộp thuế nhập khẩu. Nhưng không dỡ hàng.',
    riskWhy: 'DDP: người bán chịu rủi ro tới khi hàng đã thông quan nhập khẩu, đặt dưới quyền định đoạt của người mua trên phương tiện, sẵn sàng để dỡ, tại nơi đến.',
    costWhy: 'DDP: người bán chịu mọi chi phí tới nơi đến, gồm cả thuế và thủ tục nhập khẩu. Dỡ hàng vẫn do người mua.',
    notes: [
      'Ngược hoàn toàn với EXW: nghĩa vụ của người bán là tối đa.',
      'Người bán thông quan nhập khẩu và nộp thuế, kể cả VAT hàng nhập, trừ khi hợp đồng loại trừ.',
      'Người bán không dỡ hàng. Việc dỡ vẫn do người mua, như DAP.',
      'Người bán không nên dùng DDP nếu khó làm thủ tục nhập khẩu ở nước người mua. Khi đó nên chọn DAP hoặc DPU.'
    ],
    confuse: ['DAP', 'DPU', 'EXW'],
    face: { skin: '#eec6a0', hair: '#1a1a1a', hairStyle: 'short', hat: 'tophat', hatColor: '#23235c', shirt: '#dadaf3', extra: 'glasses' }
  }
];

IG.rule = function (code) { return IG.RULES.find(function (r) { return r.code === code; }); };

/* Nhân vật ngoài 11 hoa tiêu */
IG.CAST = {
  haiau: { who: 'Chị Hải Âu', color: '#0f6f86',
    face: { skin: '#f1caa2', hair: '#20150f', hairStyle: 'long', hat: 'none', shirt: '#e4f3f6', extra: 'glasses' } },
  khoa: { who: 'Anh Khoa, chủ xưởng gốm', color: '#f47b20',
    face: { skin: '#e3b386', hair: '#1c1c1c', hairStyle: 'short', hat: 'none', shirt: '#ffe1c7', extra: 'none' } },
  lan: { who: 'Bà Lan, nhà nhập khẩu', color: '#2378c9',
    face: { skin: '#f3d0ab', hair: '#5a5a5a', hairStyle: 'bun', hat: 'none', shirt: '#d5e8fb', extra: 'none' } },
  khach: { who: 'Khách hàng', color: '#56707a',
    face: { skin: '#e8be94', hair: '#33261c', hairStyle: 'short', hat: 'none', shirt: '#e6ecee', extra: 'none' } }
};
