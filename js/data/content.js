/* Cảng Thập Nhất — nội dung màn chơi.
   Thêm câu hỏi: thêm một mục vào IG.ITEMS rồi đưa id vào level tương ứng trong IG.CHAPTERS.
   Nguồn: ghi chép bài giảng, bộ câu hỏi trắc nghiệm và bản Incoterms® 2020 của ICC trong thư mục tài liệu.
   Mục có extra:true là kiến thức bổ sung ngoài ghi chép (Institute Cargo Clauses 2009). */
window.IG = window.IG || {};

IG.ITEMS = {};
(function () {
  function add(list) { list.forEach(function (it) { IG.ITEMS[it.id] = it; }); }

  /* ---------- Đúng / Sai: nền tảng ---------- */
  add([
    { id: 'tf-law', kind: 'tf', tags: ['base'], answer: false,
      text: 'Incoterms là luật quốc tế, tự động áp dụng cho mọi hợp đồng mua bán hàng hóa quốc tế.',
      why: 'Incoterms là tập quán thương mại do ICC soạn, không phải luật. Muốn áp dụng thì hợp đồng phải dẫn chiếu tới nó.' },
    { id: 'tf-year', kind: 'tf', tags: ['base'], answer: false,
      text: 'Hợp đồng chỉ ghi "FOB Hải Phòng" mà không ghi năm thì mặc nhiên hiểu là Incoterms 2020.',
      why: 'Các bản Incoterms cùng tồn tại, bản sau không phủ nhận bản trước. Không ghi năm là mở đường cho tranh chấp, nên luôn ghi "Incoterms® 2020".' },
    { id: 'tf-old', kind: 'tf', tags: ['base'], answer: false,
      text: 'Từ khi có Incoterms 2020, các bên không còn được dùng Incoterms 2010.',
      why: 'Các bên vẫn có thể chọn bản 2010 hay 2000, miễn ghi rõ trong hợp đồng.' },
    { id: 'tf-title', kind: 'tf', tags: ['base'], answer: false,
      text: 'Incoterms cho biết khi nào quyền sở hữu hàng hóa chuyển từ người bán sang người mua.',
      why: 'Incoterms nói về chuyển giao rủi ro, không nói về quyền sở hữu. Quyền sở hữu, thanh toán, chất lượng, chế tài vi phạm phải ghi trong hợp đồng.' },
    { id: 'tf-parties', kind: 'tf', tags: ['base'], answer: true,
      text: 'Incoterms chỉ phân chia nghĩa vụ giữa người bán và người mua, không ràng buộc người chuyên chở, hãng bảo hiểm hay ngân hàng.',
      why: 'Đúng. Hợp đồng vận tải, bảo hiểm, thanh toán là các hợp đồng riêng. Incoterms chỉ thuộc về hợp đồng mua bán.' },
    { id: 'tf-tangible', kind: 'tf', tags: ['base'], answer: true,
      text: 'Incoterms chỉ áp dụng cho mua bán hàng hóa hữu hình.',
      why: 'Đúng. Dịch vụ, phần mềm tải qua mạng không có "giao hàng, vận tải" để phân chia.' },
    { id: 'tf-domestic', kind: 'tf', tags: ['base'], answer: false,
      text: 'Incoterms chỉ dùng được cho mua bán quốc tế, không dùng cho mua bán trong nước.',
      why: 'Tên đầy đủ của bản 2020 là quy tắc cho thương mại nội địa và quốc tế. EXW rất hợp với mua bán nội địa.' },
    { id: 'tf-payment', kind: 'tf', tags: ['base'], answer: false,
      text: 'Gọi Incoterms là "điều kiện thanh toán" hoặc "điều kiện giao hàng" là đã diễn tả đủ nội dung của nó.',
      why: 'Mỗi quy tắc gồm 10 cặp nghĩa vụ A1 đến A10 và B1 đến B10: giao hàng, rủi ro, vận tải, bảo hiểm, chứng từ, thông quan, chi phí, thông báo... Gọi theo một nghĩa vụ là bị hẹp nghĩa.' },
    { id: 'tf-replace', kind: 'tf', tags: ['base'], answer: false,
      text: 'Vì đã quy định vận tải, bảo hiểm và giao nhận nên Incoterms có thể thay cho hợp đồng mua bán.',
      why: 'Incoterms chỉ trả lời vài câu hỏi quanh việc giao hàng. Giá, chất lượng, thanh toán, bất khả kháng, giải quyết tranh chấp vẫn phải nằm trong hợp đồng.' },
    { id: 'tf-variant', kind: 'tf', tags: ['base'], answer: true,
      text: 'Hai bên có thể thỏa thuận sửa một quy tắc, ví dụ EXW Loaded, nhưng phải ghi thật rõ trong hợp đồng.',
      why: 'Đúng. Incoterms không cấm biến thể nhưng cũng không giải thích chúng. Nếu đổi phần chi phí, phải nói rõ điểm chuyển rủi ro có đổi theo không.' },
    { id: 'tf-eleven', kind: 'tf', tags: ['base'], answer: true,
      text: 'Incoterms 2020 có 11 quy tắc: 7 quy tắc dùng cho mọi phương thức vận tải, 4 quy tắc chỉ dùng cho đường biển và thủy nội địa.',
      why: 'Đúng. Mọi phương thức: EXW, FCA, CPT, CIP, DAP, DPU, DDP. Đường biển và thủy nội địa: FAS, FOB, CFR, CIF.' },
    { id: 'tf-1936', kind: 'tf', tags: ['base'], answer: true,
      text: 'Bản Incoterms đầu tiên được ICC ban hành năm 1936.',
      why: 'Đúng. Sau đó là các bản 1953, 1967, 1976, 1980, 1990, 2000, 2010 và 2020. Incoterms được sửa khi thực tiễn thương mại đòi hỏi.' }
  ]);

  /* ---------- Đúng / Sai: điểm mới 2020 và bẫy thường gặp ---------- */
  add([
    { id: 'tf-rail', kind: 'tf', tags: ['FOB'], answer: false,
      text: 'Theo FOB Incoterms 2020, rủi ro chuyển khi hàng qua lan can tàu.',
      why: 'Lan can tàu là cách tính của bản 2000. Từ 2010, rủi ro chuyển khi hàng đã được xếp lên tàu.' },
    { id: 'tf-cif-a', kind: 'tf', tags: ['CIF'], answer: false,
      text: 'CIF Incoterms 2020: nếu hợp đồng không nói gì thêm, người bán phải mua bảo hiểm điều kiện (A).',
      why: 'CIF giữ mức tối thiểu, điều kiện (C). Chỉ CIP mới nâng lên (A) trong bản 2020.' },
    { id: 'tf-cip-a', kind: 'tf', tags: ['CIP'], answer: true,
      text: 'CIP Incoterms 2020: mặc định người bán mua bảo hiểm điều kiện (A).',
      why: 'Đúng. CIP thường dùng cho hàng thành phẩm giá trị cao, mức (C) không đủ che các rủi ro như trộm cắp, đổ vỡ.' },
    { id: 'tf-dpu-only', kind: 'tf', tags: ['DPU'], answer: true,
      text: 'DPU là quy tắc duy nhất buộc người bán dỡ hàng tại nơi đến.',
      why: 'Đúng. Kể cả DDP, người bán cũng chỉ giao hàng trên phương tiện, sẵn sàng để dỡ.' },
    { id: 'tf-dpu-terminal', kind: 'tf', tags: ['DPU'], answer: false,
      text: 'DPU chỉ dùng được khi giao hàng tại bến bãi (terminal).',
      why: 'Đó là DAT của bản 2010. DPU đổi tên chính vì nơi giao có thể là bất kỳ địa điểm nào, miễn dỡ được hàng.' },
    { id: 'tf-dpu-ddu', kind: 'tf', tags: ['DPU', 'DAP'], answer: false,
      text: 'DPU Incoterms 2020 thay thế cho DDU.',
      why: 'DPU thay cho DAT của bản 2010. DDU thuộc bản 2000 và đã được gộp vào DAP.' },
    { id: 'tf-fca-bl', kind: 'tf', tags: ['FCA'], answer: true,
      text: 'FCA Incoterms 2020: nếu hai bên thỏa thuận, người mua phải chỉ thị người chuyên chở cấp cho người bán vận đơn có ghi "on board".',
      why: 'Đúng, đây là điểm mới ở mục A6/B6. Người bán FCA giao hàng trước khi hàng lên tàu nên trước đây khó có vận đơn on board để xuất trình theo L/C.' },
    { id: 'tf-own', kind: 'tf', tags: ['DAP', 'FCA'], answer: true,
      text: 'Incoterms 2020 cho phép người bán DAP tự chở hàng bằng xe của mình, không bắt buộc phải thuê người chuyên chở.',
      why: 'Đúng. Bản 2020 dùng cụm "ký hợp đồng hoặc tự thu xếp vận tải" cho người mua FCA và người bán DAP, DPU, DDP.' },
    { id: 'tf-a9', kind: 'tf', tags: ['base'], answer: true,
      text: 'Trong Incoterms 2020, mọi khoản chi phí mỗi bên phải chịu được liệt kê tập trung ở mục A9/B9.',
      why: 'Đúng. Mục đích là cho người dùng một danh mục chi phí ở một chỗ, thay vì tìm rải rác qua nhiều mục.' },
    { id: 'tf-c-risk', kind: 'tf', tags: ['CFR', 'CIF', 'CPT', 'CIP'], answer: false,
      text: 'Trong nhóm C, người bán chịu rủi ro về hàng hóa cho tới khi hàng tới cảng đến hoặc nơi đến.',
      why: 'Nhóm C có hai điểm tới hạn. Người bán trả cước tới nơi đến, nhưng rủi ro đã chuyển từ nơi đi.' },
    { id: 'tf-dap-ins', kind: 'tf', tags: ['DAP'], answer: false,
      text: 'Theo DAP, người bán có nghĩa vụ mua bảo hiểm cho người mua.',
      why: 'Chỉ CIF và CIP buộc người bán mua bảo hiểm cho người mua. Với DAP, người bán chịu rủi ro cả chặng nên thường tự mua cho chính mình.' },
    { id: 'tf-cfr-port', kind: 'tf', tags: ['CFR'], answer: false,
      text: 'Trong "CFR Hải Phòng", Hải Phòng là cảng bốc hàng.',
      why: 'Nhóm C ghi kèm cảng đến hoặc nơi đến. Nhóm E và F ghi kèm nơi giao hàng ở nước xuất khẩu.' },
    { id: 'tf-container', kind: 'tf', tags: ['FCA', 'FOB'], answer: true,
      text: 'Hàng đóng container giao tại bãi container nên dùng FCA thay cho FOB.',
      why: 'Đúng. Container nằm bãi trước khi lên tàu. Với FOB, người bán vẫn chịu rủi ro suốt thời gian đó dù không còn kiểm soát hàng.' },
    { id: 'tf-ddp-unload', kind: 'tf', tags: ['DDP'], answer: false,
      text: 'Theo DDP, người bán phải dỡ hàng xuống tại kho người mua.',
      why: 'DDP chỉ thêm nghĩa vụ thông quan nhập khẩu so với DAP. Dỡ hàng vẫn do người mua. Muốn người bán dỡ thì dùng DPU.' },
    { id: 'tf-110', kind: 'tf', tags: ['CIF', 'CIP'], answer: true,
      text: 'Theo CIF và CIP, số tiền bảo hiểm tối thiểu là 110% giá hợp đồng, bằng đồng tiền của hợp đồng.',
      why: 'Đúng. 10% cộng thêm coi như phần lãi dự tính của người mua.' },
    { id: 'tf-war', kind: 'tf', tags: ['CIF', 'CIP'], answer: false, extra: true,
      text: 'Bảo hiểm điều kiện (A) đã bao gồm rủi ro chiến tranh và đình công.',
      why: 'Cả (A), (B), (C) đều loại trừ chiến tranh, đình công. Người mua muốn có phải yêu cầu mua thêm và tự chịu phí.' },
    { id: 'tf-fas-exp', kind: 'tf', tags: ['FAS'], answer: true,
      text: 'Theo FAS Incoterms 2020, người bán làm thủ tục thông quan xuất khẩu.',
      why: 'Đúng. Trong 11 quy tắc chỉ EXW để việc thông quan xuất khẩu cho người mua.' },
    { id: 'tf-arrive', kind: 'tf', tags: ['CIF', 'CFR'], answer: false,
      text: 'Hợp đồng CIF nên ghi rõ ngày hàng phải tới cảng dỡ.',
      why: 'Nhóm C là hợp đồng gửi hàng: người bán xong nghĩa vụ khi giao hàng ở nơi đi. Ghi ngày hàng đến là tự mâu thuẫn. Cần cam kết ngày đến thì dùng nhóm D.' },
    { id: 'tf-unload-claim', kind: 'tf', tags: ['CPT', 'CFR'], answer: false,
      text: 'Hợp đồng vận tải người bán CPT đã ký gồm cả phí dỡ tại nơi đến. Người bán được đòi người mua hoàn lại khoản này.',
      why: 'Nếu phí dỡ thuộc người bán theo hợp đồng vận tải thì người bán không được đòi lại, trừ khi hai bên thỏa thuận khác.' },
    { id: 'tf-exw-load', kind: 'tf', tags: ['EXW'], answer: true,
      text: 'Theo EXW, người bán không có nghĩa vụ bốc hàng lên xe của người mua.',
      why: 'Đúng. Hàng chỉ cần đặt sẵn tại xưởng. Muốn người bán bốc và chịu rủi ro bốc hàng thì dùng FCA.' }
  ]);

  /* ---------- Sự cố: ai chịu? (nhóm E, F) ---------- */
  add([
    { id: 'c-exw-help', kind: 'party', rule: 'EXW', at: 105, tags: ['EXW'], answer: 'B',
      clause: 'EXW Xưởng gốm Minh Long, Bình Dương, Incoterms® 2020',
      story: 'Xe của người mua tới xưởng. Thấy tài xế loay hoay, công nhân của người bán lái xe nâng bốc giúp và làm rơi vỡ một kiện.',
      ask: 'Theo EXW, tổn thất này thuộc về ai?',
      why: 'EXW: hàng đã giao khi đặt sẵn tại xưởng, chưa bốc. Người bán không có nghĩa vụ bốc, nên bốc giúp vẫn là rủi ro và chi phí của người mua. Người mua muốn tránh thì chọn FCA.' },
    { id: 'c-fca-premises', kind: 'party', rule: 'FCA', variant: 1, at: 105, tags: ['FCA'], answer: 'S',
      clause: 'FCA Xưởng gốm Minh Long, Bình Dương, Incoterms® 2020',
      story: 'Vẫn ở xưởng đó, lần này hợp đồng ghi FCA. Xe do người mua cử tới. Trong lúc bốc hàng lên xe, một kiện rơi vỡ.',
      ask: 'Tổn thất thuộc về ai?',
      why: 'FCA giao tại cơ sở người bán: hàng phải được bốc xong lên xe của người mua thì mới coi là đã giao. Đang bốc thì rủi ro còn ở người bán.' },
    { id: 'c-fca-cy', kind: 'party', rule: 'FCA', at: 322, tags: ['FCA'], answer: 'B',
      clause: 'FCA Bãi container Cát Lái, TP.HCM, Incoterms® 2020',
      story: 'Xe của người bán chở hàng tới bãi Cát Lái đúng hẹn, báo cho hãng tàu do người mua chỉ định tới nhận. Xe nâng của bãi dỡ hàng khỏi xe và làm rơi một kiện.',
      ask: 'Tổn thất thuộc về ai?',
      why: 'FCA giao ngoài cơ sở người bán: hàng chỉ cần nằm trên xe người bán, sẵn sàng để dỡ, đặt dưới quyền định đoạt của người chuyên chở. Việc dỡ khỏi xe là của bên người mua.' },
    { id: 'c-fca-late', kind: 'party', rule: 'FCA', at: 300, tags: ['FCA'], answer: 'B',
      clause: 'FCA Kho ICD Sóng Thần, Bình Dương, giao ngày 10/6, Incoterms® 2020',
      story: 'Ngày 10/6 người bán đưa hàng tới ICD, hàng đã dán nhãn riêng cho hợp đồng này. Người chuyên chở do người mua chỉ định không tới. Đêm 12/6 kho bị chập điện, hàng cháy sém.',
      ask: 'Tổn thất đêm 12/6 thuộc về ai?',
      why: 'Mục B3: nếu người chuyên chở do người mua chỉ định không nhận hàng, rủi ro chuyển sớm cho người mua kể từ ngày đã thỏa thuận, với điều kiện hàng đã được phân định rõ là hàng của hợp đồng.' },
    { id: 'c-fas-barge', kind: 'party', rule: 'FAS', at: 372, tags: ['FAS'], answer: 'S',
      clause: 'FAS Cảng Tiên Sa, Đà Nẵng, Incoterms® 2020',
      story: 'Tàu do người mua thuê neo ngoài phao vì mớn nước sâu. Người bán thuê sà lan chở hàng ra. Sà lan bị sóng đánh nghiêng trước khi cập mạn tàu, mất 5 kiện.',
      ask: 'Tổn thất thuộc về ai?',
      why: 'FAS: người bán phải đặt hàng dọc mạn tàu. Hàng còn trên đường ra tàu thì chưa giao. Phí lõng hàng cũng thường do người bán chịu, nên ghi rõ trong hợp đồng.' },
    { id: 'c-fas-crane', kind: 'party', rule: 'FAS', at: 432, tags: ['FAS', 'FOB'], answer: 'B',
      clause: 'FAS Cảng Tiên Sa, Đà Nẵng, Incoterms® 2020',
      story: 'Hàng đã xếp ngay ngắn trên cầu cảng, trong tầm cẩu của tàu. Khi cẩu tàu nhấc kiện đầu tiên lên thì đứt cáp.',
      ask: 'Tổn thất thuộc về ai?',
      why: 'FAS: đặt dọc mạn tàu là xong nghĩa vụ giao hàng. Rủi ro và chi phí xếp hàng lên tàu thuộc người mua. Nếu là FOB thì câu trả lời ngược lại.' },
    { id: 'c-fob-crane', kind: 'party', rule: 'FOB', at: 432, tags: ['FOB'], answer: 'S',
      clause: 'FOB Cát Lái, TP.HCM, Incoterms® 2020',
      story: 'Cẩu bờ đang đưa kiện gạo qua mạn tàu thì đứt cáp. Kiện hàng rơi xuống boong, vỡ nát.',
      ask: 'Tổn thất thuộc về ai?',
      why: 'FOB 2020 không tính theo lan can tàu. Hàng phải được xếp yên lên tàu thì rủi ro mới chuyển. Rơi vỡ trong lúc xếp là tổn thất của người bán.' },
    { id: 'c-fob-cy', kind: 'party', rule: 'FOB', at: 350, tags: ['FOB', 'FCA'], answer: 'S',
      clause: 'FOB Cát Lái, TP.HCM, Incoterms® 2020',
      story: 'Người bán hạ 5 container hải sản tại bãi Cát Lái hai ngày trước khi tàu đến. Đêm đó một container mất điện lạnh, hàng hỏng.',
      ask: 'Tổn thất thuộc về ai?',
      why: 'FOB: rủi ro chỉ chuyển khi hàng lên tàu, nên suốt thời gian nằm bãi người bán vẫn chịu dù không còn giữ hàng. Vì vậy hàng container nên bán theo FCA.' },
    { id: 'c-fob-late', kind: 'party', rule: 'FOB', at: 395, tags: ['FOB'], answer: 'B',
      clause: 'FOB Hải Phòng, giao trong tuần 1 đến 7/8, Incoterms® 2020',
      story: 'Hàng của hợp đồng đã tập kết ở cầu cảng từ 5/8. Tàu do người mua chỉ định tới trễ, 15/8 mới cập cảng. Ngày 12/8 mưa bão làm ướt một phần hàng.',
      ask: 'Tổn thất ngày 12/8 thuộc về ai?',
      why: 'Tàu của người mua không tới đúng hạn nên rủi ro chuyển sớm cho người mua từ khi hết thời hạn giao hàng (B3), miễn hàng đã được phân định cho hợp đồng. Chi phí lưu bãi phát sinh cũng do người mua.' },
    { id: 'c-fob-sea', kind: 'party', rule: 'FOB', at: 580, tags: ['FOB'], answer: 'B',
      clause: 'FOB Cát Lái, TP.HCM, Incoterms® 2020',
      story: 'Tàu rời Cát Lái được ba ngày thì gặp bão. Nước tràn vào hầm, 20% lô hàng hỏng.',
      ask: 'Tổn thất thuộc về ai?',
      why: 'Hàng đã lên tàu ở cảng bốc nên rủi ro thuộc người mua. Người mua FOB tự thuê tàu và nên tự mua bảo hiểm.' },
    { id: 'c-exwl', kind: 'choice', tags: ['EXW', 'FCA'],
      clause: 'EXW-Loaded Công ty ABC, Bình Thạnh, TP.HCM, Incoterms® 2020',
      story: 'Doanh nghiệp Việt Nam bán hàng cho đối tác Campuchia và ghi điều kiện như trên.',
      ask: 'Nhận xét nào đúng?',
      options: [
        'Được, nhưng hợp đồng phải ghi rõ rủi ro và chi phí bốc hàng thuộc bên nào',
        'Không được, vì Incoterms cấm sửa đổi các quy tắc',
        'Được, và nó giống hệt FCA Incoterms® 2020'
      ], answer: 0,
      why: 'Biến thể được phép nhưng Incoterms không giải thích nó. EXW Loaded cũng khác FCA: với FCA người bán còn phải thông quan xuất khẩu và rủi ro bốc hàng rõ ràng thuộc người bán.' },
    { id: 'c-fca-done', kind: 'choice', tags: ['FCA'],
      clause: 'FCA, Incoterms® 2020',
      story: 'Có hai ý kiến về lúc người bán FCA hoàn thành giao hàng. Ý 1: khi hàng sẵn sàng để bốc lên xe của người mua tại xưởng người bán. Ý 2: khi hàng đã dỡ xuống khỏi xe người bán tại điểm người mua chỉ định.',
      ask: 'Ý nào đúng?',
      options: ['Cả hai đều sai', 'Chỉ ý 1 đúng', 'Chỉ ý 2 đúng', 'Cả hai đều đúng'], answer: 0,
      why: 'Tại xưởng: hàng phải được bốc xong lên xe, "sẵn sàng để bốc" là EXW. Ở nơi khác: hàng còn trên xe người bán, sẵn sàng để dỡ, người bán không dỡ xuống.' }
  ]);

  /* ---------- Sự cố: nhóm C ---------- */
  add([
    { id: 'c-cfr-sea', kind: 'party', rule: 'CFR', at: 580, tags: ['CFR'], answer: 'B',
      clause: 'CFR Rotterdam, Hà Lan, Incoterms® 2020',
      story: 'Người bán ở TP.HCM thuê tàu, trả cước tới Rotterdam. Giữa Ấn Độ Dương tàu gặp bão, 30% hồ tiêu ngấm nước.',
      ask: 'Tổn thất thuộc về ai?',
      why: 'CFR: người bán trả cước tới cảng đến nhưng rủi ro đã chuyển khi hàng lên tàu ở cảng bốc. Đường chi phí dài hơn đường rủi ro.' },
    { id: 'c-cif-water', kind: 'choice', tags: ['CIF'], extra: true,
      clause: 'CIF Tokyo, Nhật Bản, Incoterms® 2020',
      story: 'Hợp đồng không nói gì thêm về bảo hiểm. Người bán mua đúng mức mặc định. Trên biển, bão đánh nước biển tràn vào hầm hàng, gạo hỏng. Con tàu không đắm, không mắc cạn.',
      ask: 'Người mua đòi hãng bảo hiểm bồi thường. Kết quả dễ xảy ra nhất?',
      options: [
        'Bị từ chối: điều kiện (C) không bảo hiểm nước biển tràn vào hầm hàng',
        'Được bồi thường đủ: người bán đã mua bảo hiểm thì mọi rủi ro trên biển đều được che',
        'Người bán phải đền, vì người bán là người mua bảo hiểm'
      ], answer: 0,
      why: 'CIF mặc định chỉ là điều kiện (C): cháy nổ, tàu đắm, mắc cạn, đâm va, vứt hàng cứu tàu... Nước tràn vào hầm phải từ (B) trở lên. Rủi ro vẫn là của người mua, nên muốn (A) hay (B) phải thỏa thuận trước.' },
    { id: 'c-cif-upgrade', kind: 'choice', tags: ['CIF'],
      clause: 'CIF Hải Phòng, Việt Nam, Incoterms® 2020',
      story: 'Sau khi ký hợp đồng, người mua nhắn: "Hàng của tôi dễ vỡ, anh mua giúp điều kiện (A) nhé."',
      ask: 'Người bán nên trả lời thế nào cho đúng quy tắc?',
      options: [
        'Tôi chỉ buộc phải mua (C). Muốn (A) thì hai bên thỏa thuận và chị chịu phần phí thêm',
        'Vâng, CIF 2020 mặc định là (A) nên tôi phải mua',
        'Không được, CIF cấm mua mức cao hơn (C)'
      ], answer: 0,
      why: 'CIF: mặc định (C). Các bên được thỏa thuận mức cao hơn. Người mua cũng có thể tự mua bảo hiểm bổ sung, người bán cung cấp thông tin cần thiết.' },
    { id: 'c-cpt-first', kind: 'party', rule: 'CPT', at: 330, tags: ['CPT'], answer: 'B',
      clause: 'CPT Sân bay Nội Bài, Việt Nam, Incoterms® 2020',
      story: 'Người bán ở Osaka giao linh kiện cho hãng giao nhận mình thuê tại kho gom hàng. Xe của hãng này chở hàng ra sân bay Kansai thì bị lật.',
      ask: 'Tổn thất thuộc về ai?',
      why: 'CPT: rủi ro chuyển khi người bán giao hàng cho người chuyên chở đầu tiên do mình thuê, dù hàng còn chưa lên máy bay. Muốn chuyển muộn hơn, ví dụ tại sân bay đi, phải ghi trong hợp đồng.' },
    { id: 'c-cpt-vs-dap', kind: 'party', rule: 'CPT', at: 800, tags: ['CPT', 'DAP'], answer: 'B',
      clause: 'CPT Kho người mua, Lagos, Nigeria, Incoterms® 2020',
      story: 'Người bán đã trả cước tới tận kho ở Lagos. Trên đường từ cảng Lagos về kho, xe tải bị cướp mất nửa hàng.',
      ask: 'Tổn thất thuộc về ai?',
      why: 'CPT: cước tới Lagos do người bán trả, nhưng rủi ro đã chuyển từ lúc giao cho người chuyên chở ở nước xuất khẩu. Nếu là DAP Lagos thì người bán chịu. Vì vậy đổi từ CPT sang DAP là đổi hẳn gánh rủi ro.' },
    { id: 'c-cfr-unload', kind: 'choice', tags: ['CFR'],
      clause: 'CFR Hải Phòng, Việt Nam, Incoterms® 2020',
      story: 'Người bán thuê tàu chuyến theo điều kiện miễn phí dỡ cho chủ tàu, nên cước chưa gồm phí dỡ tại Hải Phòng.',
      ask: 'Ai trả phí dỡ hàng ở Hải Phòng?',
      options: ['Người mua', 'Người bán, vì CFR là "tiền hàng và cước"', 'Chia đôi'], answer: 0,
      why: 'Nhóm C: phí dỡ ở nơi đến do người mua trả, trừ khi khoản đó thuộc người bán theo hợp đồng vận tải. Ở đây cước không gồm phí dỡ.' },
    { id: 'c-cif-arrive', kind: 'choice', tags: ['CIF'],
      clause: 'CIF Hamburg, giao hàng chậm nhất 30/11, Incoterms® 2020',
      story: 'Người bán xếp hàng lên tàu ngày 25/11. Kênh đào trên tuyến bị đóng, tàu phải vòng xa, đến Hamburg trễ ba tuần. Người mua đòi phạt giao chậm.',
      ask: 'Người bán có vi phạm thời hạn giao hàng không?',
      options: [
        'Không. Người bán đã giao hàng lên tàu đúng hạn tại cảng bốc',
        'Có. Hàng tới Hamburg trễ nghĩa là giao chậm',
        'Có, nhưng chỉ phải chịu một nửa'
      ], answer: 0,
      why: 'Nhóm C là hợp đồng gửi hàng: giao hàng diễn ra ở cảng bốc. Người bán vẫn phải thuê tàu đi tuyến thông thường khả dụng, nhưng không cam kết ngày đến. Cần ngày đến chắc chắn thì dùng nhóm D.' },
    { id: 'c-cip-theft', kind: 'choice', tags: ['CIP', 'CIF'],
      clause: 'CIP Kho ngoại quan Dallas, Hoa Kỳ, Incoterms® 2020',
      story: 'Container máy tính xách tay bị rạch niêm phong ở cảng trung chuyển, mất 40 thùng. Hợp đồng không nói gì thêm về bảo hiểm.',
      ask: 'Điều nào đúng?',
      options: [
        'Rủi ro thuộc người mua, và bảo hiểm (A) mặc định của CIP có che trộm cắp',
        'Rủi ro thuộc người bán vì hàng chưa tới Dallas',
        'Rủi ro thuộc người mua và không có bảo hiểm nào, vì CIP chỉ yêu cầu (C)'
      ], answer: 0,
      why: 'CIP: rủi ro chuyển từ khi giao cho người chuyên chở. Bản 2020 nâng bảo hiểm mặc định của CIP lên (A), che cả trộm cắp. Nếu là CIF với (C) thì người mua trắng tay.' },
    { id: 'c-string', kind: 'choice', tags: ['CIF', 'CFR'],
      clause: 'CIF Thượng Hải, Incoterms® 2020',
      story: 'Lô cà phê đang lênh đênh trên biển thì thương nhân A bán lại cho B. A không thể "xếp hàng lên tàu" thêm lần nữa.',
      ask: 'A thực hiện nghĩa vụ giao hàng bằng cách nào?',
      options: [
        'Mua lại hàng đã được giao như vậy và chuyển chứng từ cho B',
        'Chờ tàu cập cảng, dỡ hàng rồi xếp lại',
        'Không thể bán theo CIF khi hàng đang trên đường'
      ], answer: 0,
      why: 'Mua bán theo chuỗi: các quy tắc cho phép người bán giao hàng bằng cách "mua hàng đã được giao như vậy". Vì thế chứng từ vận tải nhóm C phải cho phép người mua bán lại hàng trong hành trình.' },
    { id: 'c-shorter', kind: 'choice', tags: ['CFR', 'CPT', 'CIP', 'CIF'],
      clause: 'Incoterms® 2020',
      story: 'Vẽ hai vạch cho mỗi quy tắc: vạch rủi ro người bán chịu và vạch chi phí người bán trả.',
      ask: 'Bộ ba nào có vạch rủi ro ngắn hơn vạch chi phí?',
      options: ['CFR, CPT, CIP', 'DAP, DPU, DDP', 'CFR, CPT, FOB', 'CFR, DDP, CPT'], answer: 0,
      why: 'Chỉ nhóm C có hai điểm tới hạn tách nhau. Nhóm E, F, D: rủi ro và chi phí chuyển cùng một chỗ.' }
  ]);

  /* ---------- Sự cố: nhóm D ---------- */
  add([
    { id: 'c-dap-unload', kind: 'party', rule: 'DAP', at: 915, tags: ['DAP'], answer: 'B',
      clause: 'DAP Công ty May 10, Gia Lâm, Hà Nội, Incoterms® 2020',
      story: 'Xe chở vải tới cổng kho May 10. Công nhân của người mua dỡ hàng và làm đổ một pa-lét.',
      ask: 'Tổn thất thuộc về ai?',
      why: 'DAP: người bán giao hàng trên phương tiện, sẵn sàng để dỡ. Dỡ hàng là việc và rủi ro của người mua.' },
    { id: 'c-dpu-unload', kind: 'party', rule: 'DPU', at: 915, tags: ['DPU'], answer: 'S',
      clause: 'DPU CFS Chùa Vẽ, Hải Phòng, Incoterms® 2020',
      story: 'Tại kho CFS Chùa Vẽ, đội xe nâng do người bán thuê dỡ hàng khỏi container và làm rơi một kiện máy.',
      ask: 'Tổn thất thuộc về ai?',
      why: 'DPU: hàng phải được dỡ xong mới coi là đã giao. Rủi ro và chi phí dỡ hàng thuộc người bán.' },
    { id: 'c-dap-sea', kind: 'party', rule: 'DAP', at: 580, tags: ['DAP', 'CPT'], answer: 'S',
      clause: 'DAP Kho người mua, Lagos, Nigeria, Incoterms® 2020',
      story: 'Tàu chở lô hàng gặp nạn giữa biển, mất trắng 10 container.',
      ask: 'Tổn thất thuộc về ai?',
      why: 'Nhóm D: người bán chịu rủi ro tới tận nơi đến. Không ai buộc người bán mua bảo hiểm, nhưng không mua thì người bán tự gánh.' },
    { id: 'c-dap-customs', kind: 'party', rule: 'DAP', at: 760, tags: ['DAP'], answer: 'B',
      clause: 'DAP Kho người mua, Bình Dương, Việt Nam, Incoterms® 2020',
      story: 'Hàng về tới cảng Cát Lái. Người mua thiếu giấy phép nhập khẩu, hàng nằm cảng 20 ngày, một phần bị ẩm mốc, phát sinh phí lưu bãi.',
      ask: 'Phần tổn thất và chi phí phát sinh do kẹt thông quan thuộc về ai?',
      why: 'DAP: thông quan nhập khẩu là nghĩa vụ của người mua. Nếu người mua không làm được, tổn thất và chi phí phát sinh từ đó thuộc người mua (B3). Người bán lo ngại điều này có thể cân nhắc DDP.' },
    { id: 'c-ddp-tax', kind: 'choice', tags: ['DDP'],
      clause: 'DDP Kho người mua, Hà Nội, Việt Nam, Incoterms® 2020',
      story: 'Khi hàng về tới nơi, thuế nhập khẩu và VAT hàng nhập cao hơn người bán dự tính.',
      ask: 'Ai nộp các khoản này?',
      options: ['Người bán', 'Người mua', 'Người bán nộp thuế nhập khẩu, người mua nộp VAT'], answer: 0,
      why: 'DDP: người bán thông quan nhập khẩu và nộp mọi khoản thuế, phí nhập khẩu, kể cả VAT, trừ khi hợp đồng ghi rõ loại trừ. Vì thế người bán khó làm thủ tục ở nước nhập thì không nên nhận DDP.' },
    { id: 'c-ddp-unload', kind: 'party', rule: 'DDP', at: 915, tags: ['DDP', 'DPU'], answer: 'B',
      clause: 'DDP Kho người mua, Hà Nội, Việt Nam, Incoterms® 2020',
      story: 'Xe đã thông quan, chạy về tới kho người mua. Trong lúc dỡ, một thùng hàng rơi vỡ.',
      ask: 'Tổn thất thuộc về ai?',
      why: 'DDP không buộc người bán dỡ hàng. Người bán giao trên phương tiện, sẵn sàng để dỡ, như DAP. Chỉ DPU mới có nghĩa vụ dỡ.' },
    { id: 'c-dap-unload-cost', kind: 'choice', tags: ['DAP'],
      clause: 'DAP Kho người mua, Hamburg, Đức, Incoterms® 2020',
      story: 'Hợp đồng vận tải do người bán ký đã gồm phí dỡ hàng tại Hamburg. Sau đó người bán gửi hóa đơn đòi người mua hoàn lại khoản phí dỡ.',
      ask: 'Người mua có phải trả không?',
      options: [
        'Không, trừ khi hai bên đã thỏa thuận khác',
        'Có, vì DAP thì người mua dỡ hàng',
        'Có, nhưng chỉ một nửa'
      ], answer: 0,
      why: 'Dỡ hàng theo DAP là việc của người mua. Nhưng nếu người bán đã chịu phí dỡ theo hợp đồng vận tải của mình thì không được đòi lại, trừ khi có thỏa thuận.' },
    { id: 'c-cpt-to-dap', kind: 'choice', tags: ['DAP', 'CPT'],
      clause: 'Chào giá CPT Lagos, người mua đề nghị đổi sang DAP Lagos',
      story: 'Người bán đã chào giá CPT Lagos. Người mua trả lời: "Tôi chấp nhận giá đó, nhưng đổi thành DAP Lagos."',
      ask: 'Trước khi gật đầu, người bán cần cân nhắc điều gì nhất?',
      options: [
        'Mình sẽ gánh rủi ro suốt chặng đường tới Lagos, nên phải tính lại giá và bảo hiểm',
        'Không có gì khác, vì CPT và DAP đều do người bán trả cước',
        'Mình sẽ phải nộp thuế nhập khẩu ở Nigeria'
      ], answer: 0,
      why: 'Cước thì như nhau, nhưng DAP dời điểm chuyển rủi ro từ nơi đi tới tận Lagos. Người bán cần xét tình hình tuyến đường, tự mua bảo hiểm, xác định chính xác điểm đến và tính lại giá. Thuế nhập khẩu chỉ thuộc người bán khi là DDP.' }
  ]);

  /* ---------- Tư vấn: chọn quy tắc ---------- */
  add([
    { id: 'a-exw', kind: 'rules', tags: ['EXW'], answer: 'EXW', client: 'lan',
      brief: 'Tôi nhập hàng thủ công cho chuỗi cửa hàng ở Nhật. Tôi có văn phòng đại diện ở TP.HCM, tự gom hàng từ hai chục xưởng nhỏ, tự lo xe, tự khai hải quan xuất. Các xưởng chỉ cần để hàng sẵn ở cổng.',
      clues: ['Người bán không bốc hàng, không thông quan xuất khẩu', 'Người mua có đại diện tại nước xuất khẩu và tự lo mọi thứ', 'Đó là mức nghĩa vụ tối thiểu của người bán: EXW'] },
    { id: 'a-fca-air', kind: 'rules', tags: ['FCA'], answer: 'FCA', client: 'khoa',
      brief: 'Khách bên Đức đã chỉ định hãng giao nhận hàng không của họ. Tôi làm thủ tục xuất, chở hàng tới kho hàng hóa sân bay Tân Sơn Nhất giao cho hãng đó là xong. Cước bay họ trả.',
      clues: ['Hàng không: loại FAS, FOB, CFR, CIF', 'Người mua thuê và trả cước chặng chính: nhóm F', 'Người bán thông quan xuất khẩu và giao cho người chuyên chở của người mua: FCA'] },
    { id: 'a-fca-container', kind: 'rules', tags: ['FCA', 'FOB'], answer: 'FCA', client: 'khach',
      brief: 'Tôi đóng hàng vào container, làm hải quan xuất, hạ container tại bãi tập kết ở cảng Mumbai cho con tàu do người mua thuê. Hàng đi Naples.',
      clues: ['Người mua thuê tàu: nhóm F', 'Giao tại bãi container, chưa lên tàu: không phải FOB', 'Dọc mạn tàu cũng không phải, vì container nằm ở bãi: FCA Mumbai'] },
    { id: 'a-fas', kind: 'rules', tags: ['FAS'], answer: 'FAS', client: 'khach',
      brief: 'Tôi bán gỗ tròn. Người mua thuê tàu chuyến, tự dùng cẩu tàu để xếp hàng. Tôi chỉ cần thông quan xuất và xếp gỗ trên cầu cảng, sát mạn tàu của họ.',
      clues: ['Hàng rời, đi tàu biển, người mua thuê tàu', 'Người bán không xếp hàng lên tàu', 'Giao dọc mạn tàu: FAS'] },
    { id: 'a-fob', kind: 'rules', tags: ['FOB'], answer: 'FOB', client: 'khoa',
      brief: 'Gạo đóng bao đay, xếp hầm tàu. Người mua thuê tàu, trả cước và mua bảo hiểm. Rủi ro chuyển sang họ khi hàng đã xếp lên tàu.',
      clues: ['Hàng bao xếp hầm tàu, đường biển', 'Người mua thuê tàu và mua bảo hiểm: nhóm F', 'Rủi ro chuyển khi hàng lên tàu: FOB'] },
    { id: 'a-cfr', kind: 'rules', tags: ['CFR'], answer: 'CFR', client: 'khoa',
      brief: '5.000 tấn hồ tiêu từ TP.HCM đi Rotterdam. Tôi làm thủ tục xuất, thuê tàu, trả cước tới cảng đích. Rủi ro chuyển sang người mua khi hàng đã xếp xong lên tàu ở Việt Nam. Bảo hiểm họ tự lo.',
      clues: ['Người bán thuê tàu, trả cước tới cảng đến: nhóm C', 'Rủi ro chuyển khi hàng lên tàu: quy tắc đường biển', 'Người bán không mua bảo hiểm: CFR'] },
    { id: 'a-cif', kind: 'rules', tags: ['CIF'], answer: 'CIF', client: 'khoa',
      brief: '5.000 tấn gạo ST25 từ Cát Lái đi Tokyo. Tôi muốn lấy được vận đơn "on board" là hết nghĩa vụ. Người mua đồng ý nhưng yêu cầu tôi thuê tàu, trả cước tới Tokyo và mua bảo hiểm. Rủi ro chuyển khi hàng nằm an toàn trên tàu ở cảng đi.',
      clues: ['Người bán thuê tàu và trả cước: nhóm C', 'Rủi ro chuyển khi hàng trên tàu ở cảng đi: CFR hoặc CIF', 'Người bán mua bảo hiểm: CIF'] },
    { id: 'a-cpt', kind: 'rules', tags: ['CPT'], answer: 'CPT', client: 'khach',
      brief: 'Tôi xuất 10 xe hơi từ Manila về TP.HCM. Sau khi làm thủ tục xuất, tôi thuê phương tiện và trả cước tới Việt Nam. Nhưng rủi ro phải chuyển sang người mua ngay khi tôi giao xe cho người vận tải.',
      clues: ['Người bán thuê và trả cước chặng chính: nhóm C', 'Rủi ro chuyển khi giao cho người vận tải, không phải khi lên tàu', 'Không nhắc tới bảo hiểm: CPT'] },
    { id: 'a-cip', kind: 'rules', tags: ['CIP'], answer: 'CIP', client: 'khach',
      brief: '20 tấn tôm đông lạnh từ Incheon đi Dallas. Tôi làm thủ tục xuất, giao cho người vận tải là chuyển rủi ro. Người mua yêu cầu tôi thuê vận tải và mua bảo hiểm cho hàng.',
      clues: ['Rủi ro chuyển khi giao cho người vận tải ở nước xuất khẩu', 'Người bán thuê vận tải: CPT hoặc CIP', 'Người bán mua bảo hiểm: CIP'] },
    { id: 'a-cip-air', kind: 'rules', tags: ['CIP'], answer: 'CIP', client: 'lan',
      brief: 'Tôi mua linh kiện điện tử đắt tiền, bay từ Thâm Quyến về Nội Bài. Tôi muốn người bán lo cước bay và mua luôn bảo hiểm mức cao nhất. Rủi ro tôi chịu từ khi họ giao cho hãng bay cũng được.',
      clues: ['Hàng không: chỉ còn 7 quy tắc mọi phương thức', 'Người bán trả cước, rủi ro chuyển ở nơi đi: CPT hoặc CIP', 'Người bán mua bảo hiểm, mặc định (A): CIP'] },
    { id: 'a-cpt-container', kind: 'rules', tags: ['CPT', 'CFR'], answer: 'CPT', client: 'khoa',
      brief: 'Hàng gốm đóng container, đi tàu từ Cát Lái tới Hamburg. Tôi thuê tàu và trả cước. Tôi giao container tại bãi cho hãng tàu và muốn hết rủi ro từ đó. Bảo hiểm người mua tự mua.',
      clues: ['Người bán trả cước, không mua bảo hiểm: CFR hoặc CPT', 'Giao container tại bãi và muốn chuyển rủi ro ngay ở đó', 'CFR phải chờ hàng lên tàu, nên chọn CPT'] },
    { id: 'a-dap', kind: 'rules', tags: ['DAP'], answer: 'DAP', client: 'lan',
      brief: 'Tôi cần vải về tới kho ở Gia Lâm, và người bán phải chịu trách nhiệm cho tới khi xe tới cổng kho. Tôi có đội bốc xếp riêng và tự làm thủ tục nhập khẩu.',
      clues: ['Người bán chịu rủi ro tới nơi đến: nhóm D', 'Người mua tự dỡ hàng: loại DPU', 'Người mua tự thông quan nhập khẩu: loại DDP, còn DAP'] },
    { id: 'a-dpu', kind: 'rules', tags: ['DPU'], answer: 'DPU', client: 'lan',
      brief: 'Hàng lẻ của tôi cần giao tại kho CFS Chùa Vẽ. Người bán phải dỡ hàng khỏi container xuống kho rồi mới tính là giao. Thủ tục nhập khẩu tôi làm.',
      clues: ['Người bán chịu rủi ro tới nơi đến: nhóm D', 'Người bán dỡ hàng: chỉ có DPU'] },
    { id: 'a-ddp', kind: 'rules', tags: ['DDP'], answer: 'DDP', client: 'lan',
      brief: 'Tôi mua máy pha cà phê cho chuỗi quán. Tôi không rành xuất nhập khẩu, chỉ muốn hàng về tới kho, thuế má người bán lo hết. Dỡ hàng thì nhân viên của tôi làm được.',
      clues: ['Người bán chịu rủi ro tới nơi đến: nhóm D', 'Người bán thông quan nhập khẩu và nộp thuế: DDP', 'Người mua vẫn dỡ hàng, đúng với DDP'] },
    { id: 'a-not-ddp', kind: 'rules', tags: ['DAP', 'DDP'], answer: 'DAP', client: 'khoa',
      brief: 'Khách Brazil đòi giao tận kho họ ở São Paulo, hàng còn trên xe là được. Tôi chịu được rủi ro dọc đường, nhưng tôi không có tư cách làm thủ tục nhập khẩu ở Brazil.',
      clues: ['Giao tận nơi đến, người bán chịu rủi ro: nhóm D', 'Không dỡ hàng: DAP hoặc DDP', 'Người bán không thông quan nhập khẩu được: tránh DDP, chọn DAP'] },
    { id: 'a-air-set', kind: 'choice', tags: ['FOB', 'CPT', 'DAP'],
      clause: 'Giao hàng bằng đường hàng không',
      story: 'Một lô hàng mẫu đi máy bay. Khách hỏi bộ quy tắc nào dùng được.',
      ask: 'Chọn bộ quy tắc phù hợp với đường hàng không.',
      options: ['CPT, DAP, DDP', 'FCA, FOB, CFR, CIF', 'FAS, CPT, CIP', 'Quy tắc nào cũng được, miễn hai bên đồng ý'], answer: 0,
      why: 'FAS, FOB, CFR, CIF chỉ dành cho đường biển và thủy nội địa. Dùng FOB cho sân bay là lỗi rất hay gặp.' },
    { id: 'a-container-set', kind: 'choice', tags: ['FCA', 'CPT', 'CIP'],
      clause: 'Gửi hàng bằng container',
      story: 'Hàng đóng container, giao cho hãng tàu tại bãi.',
      ask: 'Bộ quy tắc nào phù hợp nhất?',
      options: ['FCA, CPT, CIP', 'FCA, FOB, CPT, CIP', 'CPT, CIP, CFR', 'FCA, FAS, CPT'], answer: 0,
      why: 'Container giao tại bãi chứ không giao thẳng lên tàu, nên thay FAS/FOB bằng FCA, CFR bằng CPT, CIF bằng CIP.' },
    { id: 'a-name', kind: 'choice', tags: ['CPT', 'FCA'],
      clause: 'Bull Co. (Hồng Kông) bán thiết bị cho Bear Co. (Việt Nam)',
      story: 'Hàng đóng container 20 feet, giao tại cảng Hồng Kông. Người bán thuê tàu và hết trách nhiệm khi hàng được đưa tới bãi tập kết quy định.',
      ask: 'Ghi điều kiện thế nào cho đúng?',
      options: ['CPT Cảng Sài Gòn', 'CPT Cảng Hồng Kông', 'FCA Cảng Hồng Kông', 'FCA Cảng Sài Gòn'], answer: 0,
      why: 'Người bán thuê tàu và rủi ro chuyển tại bãi tập kết: CPT. Nhóm C ghi kèm nơi đến, nên là CPT Cảng Sài Gòn. FCA thì người mua mới là người thuê tàu.' },
    { id: 'a-zambia', kind: 'choice', tags: ['CFR', 'CPT'],
      clause: 'Chào bán "CFR Zambia Port"',
      story: 'Zambia không có biển. Đường biển kết hợp đường bộ mất 65 ngày, đường không 15 ngày. Người mua muốn hàng tới trong 35 ngày với cước vừa phải.',
      ask: 'Lời khuyên nào hợp lý nhất?',
      options: [
        'Đổi sang CPT kèm nơi đến ở Zambia, kết hợp nhiều phương thức vận tải',
        'Giữ CFR và ghi thêm "hàng phải tới trong 35 ngày"',
        'Giữ CFR vì giá CFR rẻ nhất'
      ], answer: 0,
      why: 'CFR chỉ dùng cho đường biển tới một cảng biển. Hành trình đa phương thức tới nước không có biển cần CPT. Ghi ngày hàng đến vào hợp đồng nhóm C cũng là điều nên tránh.' }
  ]);

  /* ---------- Soi điều khoản ---------- */
  add([
    { id: 'k-airport', kind: 'clause', tags: ['FOB', 'FCA'],
      context: 'Lô hàng linh kiện đi máy bay từ TP.HCM.',
      tokens: ['FOB', 'Tan Son Nhat Airport, Vietnam', 'Incoterms® 2020'], bad: 0,
      fixes: ['Đổi thành FCA Tan Son Nhat Airport', 'Đổi thành FAS Tan Son Nhat Airport', 'Bỏ chữ "Airport"'], fix: 0,
      why: 'FOB chỉ dùng cho đường biển và thủy nội địa. Giao cho hãng bay tại sân bay là FCA.' },
    { id: 'k-noyear', kind: 'clause', tags: ['base'],
      context: 'Hợp đồng nhập phân bón về Hải Phòng.',
      tokens: ['CIF', 'Hai Phong Port, Vietnam', '(không ghi phiên bản)'], bad: 2,
      fixes: ['Thêm "Incoterms® 2020"', 'Thêm "theo luật Incoterms hiện hành"', 'Không cần thêm, mặc nhiên là bản mới nhất'], fix: 0,
      why: 'Các bản Incoterms cùng tồn tại. Phải ghi rõ năm. Và Incoterms không phải luật.' },
    { id: 'k-dat', kind: 'clause', tags: ['DPU'],
      context: 'Hợp đồng ký năm 2024, người bán dỡ hàng tại bãi.',
      tokens: ['DAT', 'Cat Lai Terminal, HCMC', 'Incoterms® 2020'], bad: 0,
      fixes: ['Đổi thành DPU', 'Đổi thành DDU', 'Đổi thành DES'], fix: 0,
      why: 'Bản 2020 không còn DAT. Quy tắc tương ứng là DPU. DDU và DES thuộc bản 2000.' },
    { id: 'k-arrival', kind: 'clause', tags: ['CIF'],
      context: 'Người bán muốn chỉ chịu trách nhiệm tới khi hàng lên tàu.',
      tokens: ['CIF Rotterdam', 'Incoterms® 2020', 'Shipment to arrive at discharging port before 30 June'], bad: 2,
      fixes: ['Đổi thành "Shipment not later than 30 May"', 'Giữ nguyên, thêm mức phạt nếu tàu tới trễ', 'Đổi CIF thành CFR'], fix: 0,
      why: 'Nhóm C chỉ quy định thời gian gửi hàng. Cam kết ngày hàng đến là tự gánh thêm trách nhiệm của nhóm D.' },
    { id: 'k-fob-cy', kind: 'clause', tags: ['FOB', 'FCA'],
      context: 'Người bán hạ container ở bãi rồi về.',
      tokens: ['FOB', 'Cat Lai, HCMC', 'Incoterms® 2020', '20 x 40ft containers delivered at CY'], bad: 0,
      fixes: ['Đổi thành FCA Cat Lai CY', 'Đổi thành FAS Cat Lai', 'Đổi thành EXW Cat Lai'], fix: 0,
      why: 'Giao container tại bãi thì nên dùng FCA. Ghi FOB nghĩa là người bán vẫn chịu rủi ro cho tới khi container lên tàu.' },
    { id: 'k-allother', kind: 'clause', tags: ['base'],
      context: 'Điều khoản cuối của một hợp đồng xuất khẩu sợi.',
      tokens: ['All other conditions', 'which not stated in this contract', 'will refer to Incoterms 2000'], bad: 2,
      fixes: ['Dẫn chiếu luật áp dụng cho hợp đồng, Incoterms chỉ dùng cho điều kiện giao hàng', 'Đổi thành "will refer to Incoterms 2020"', 'Giữ nguyên'], fix: 0,
      why: 'Incoterms chỉ giải quyết vài vấn đề quanh việc giao hàng. Thanh toán, chất lượng, vi phạm, tranh chấp phải dựa vào hợp đồng và luật áp dụng. Đổi năm cũng không cứu được.' },
    { id: 'k-cfr-origin', kind: 'clause', tags: ['CFR'],
      context: 'Hàng xuất từ TP.HCM đi Hamburg, người bán trả cước.',
      tokens: ['CFR', 'Cat Lai Port, HCMC', 'Incoterms® 2020'], bad: 1,
      fixes: ['Đổi thành Hamburg Port, Germany', 'Giữ nguyên, CFR ghi cảng bốc', 'Đổi thành "Vietnam"'], fix: 0,
      why: 'Nhóm C ghi kèm cảng đến, tức nơi người bán trả cước tới. Nhóm F mới ghi cảng bốc.' },
    { id: 'k-vague', kind: 'clause', tags: ['DDP', 'DAP'],
      context: 'Người bán giao hàng tận nơi cho người mua ở Việt Nam.',
      tokens: ['DDP', 'Vietnam', 'Incoterms® 2020'], bad: 1,
      fixes: ['Ghi địa chỉ cụ thể, ví dụ kho IMC, KCN Từ Liêm, Hà Nội', 'Đổi DDP thành DAP', 'Bỏ hẳn địa điểm'], fix: 0,
      why: 'Nhóm D: nơi đến là điểm chuyển cả rủi ro lẫn chi phí, và người bán phải ký hợp đồng vận tải tới đúng điểm đó. Càng chi tiết càng tránh tranh chấp.' },
    { id: 'k-cnf', kind: 'clause', tags: ['CFR'],
      context: 'Thư chào hàng của một nhà xuất khẩu.',
      tokens: ['CNF', 'Busan Port, Korea', 'Incoterms® 2020'], bad: 0,
      fixes: ['Đổi thành CFR', 'Đổi thành C&F', 'Đổi thành CF'], fix: 0,
      why: 'Phải dùng đúng ký hiệu ba chữ cái của Incoterms. CNF, C&F là cách viết tắt ngoài quy tắc.' },
    { id: 'k-ins', kind: 'clause', tags: ['CIF'],
      context: 'Điều khoản bảo hiểm trong hợp đồng CIF, hai bên không có thỏa thuận riêng nào.',
      tokens: ['CIF Hai Phong, Incoterms® 2020', 'Insurance: ICC (C)', 'insured amount 100% of invoice value'], bad: 2,
      fixes: ['Đổi thành 110% giá hợp đồng', 'Đổi ICC (C) thành ICC (A)', 'Bỏ điều khoản bảo hiểm'], fix: 0,
      why: 'CIF yêu cầu số tiền bảo hiểm tối thiểu bằng giá hợp đồng cộng 10%. Mức (C) thì đúng với mặc định của CIF.' }
  ]);
})();

/* ---------- Bộ thẻ phân loại ---------- */
IG.SORTS = {
  scope: {
    bins: [
      { id: 'inc', label: 'Incoterms trả lời', tone: 'teal' },
      { id: 'con', label: 'Phải ghi trong hợp đồng', tone: 'paper' }
    ],
    items: [
      { id: 's1', text: 'Ai thuê phương tiện vận tải?', bin: 'inc', why: 'Mục A4/B4 về vận tải.' },
      { id: 's2', text: 'Quyền sở hữu hàng chuyển khi nào?', bin: 'con', why: 'Incoterms không đụng tới quyền sở hữu. Đây là điều hay bị nhầm nhất.' },
      { id: 's3', text: 'Ai mua bảo hiểm cho hàng?', bin: 'inc', why: 'Mục A5/B5 về bảo hiểm.' },
      { id: 's4', text: 'Thanh toán bằng L/C hay chuyển khoản, trả khi nào?', bin: 'con', why: 'Thanh toán thuộc về hợp đồng mua bán.' },
      { id: 's5', text: 'Ai làm thủ tục thông quan và nộp thuế?', bin: 'inc', why: 'Mục A7/B7 về thông quan xuất khẩu, nhập khẩu.' },
      { id: 's6', text: 'Hàng phải đạt chất lượng, quy cách gì?', bin: 'con', why: 'Chất lượng và quy cách do hợp đồng quy định.' },
      { id: 's7', text: 'Rủi ro về hàng chuyển ở đâu, lúc nào?', bin: 'inc', why: 'Mục A3/B3 về chuyển giao rủi ro, gắn với mục A2 về giao hàng.' },
      { id: 's8', text: 'Vi phạm hợp đồng thì bị phạt, bồi thường ra sao?', bin: 'con', why: 'Chế tài do hợp đồng và luật áp dụng quy định.' },
      { id: 's9', text: 'Mỗi bên chịu những khoản chi phí nào?', bin: 'inc', why: 'Mục A9/B9 liệt kê phân chia chi phí.' },
      { id: 's10', text: 'Gặp bất khả kháng thì xử lý thế nào?', bin: 'con', why: 'Incoterms không có điều khoản bất khả kháng.' },
      { id: 's11', text: 'Ai phải báo cho ai về tên tàu, ngày giao?', bin: 'inc', why: 'Mục A10/B10 về thông báo.' },
      { id: 's12', text: 'Tranh chấp xử ở tòa hay trọng tài, theo luật nào?', bin: 'con', why: 'Luật áp dụng và giải quyết tranh chấp nằm ngoài Incoterms.' }
    ]
  },
  mode: {
    bins: [
      { id: 'any', label: 'Mọi phương thức vận tải', tone: 'teal' },
      { id: 'sea', label: 'Chỉ đường biển, thủy nội địa', tone: 'navy' }
    ],
    items: [
      { id: 'm-EXW', rule: 'EXW', bin: 'any', why: 'Giao tại xưởng, xe gì tới chở cũng được.' },
      { id: 'm-FOB', rule: 'FOB', bin: 'sea', why: 'On board là trên tàu biển.' },
      { id: 'm-FCA', rule: 'FCA', bin: 'any', why: 'Giao cho người chuyên chở bất kỳ: xe, tàu hỏa, máy bay, tàu biển.' },
      { id: 'm-CIF', rule: 'CIF', bin: 'sea', why: 'Giao hàng trên tàu ở cảng bốc.' },
      { id: 'm-CPT', rule: 'CPT', bin: 'any', why: 'Carriage, không phải Freight: cước mọi phương thức.' },
      { id: 'm-FAS', rule: 'FAS', bin: 'sea', why: 'Alongside Ship: phải có tàu.' },
      { id: 'm-DAP', rule: 'DAP', bin: 'any', why: 'Nơi đến có thể là kho, ga, sân bay.' },
      { id: 'm-CFR', rule: 'CFR', bin: 'sea', why: 'Freight: cước tàu biển tới cảng đến.' },
      { id: 'm-CIP', rule: 'CIP', bin: 'any', why: 'Bản mọi phương thức của CIF.' },
      { id: 'm-DPU', rule: 'DPU', bin: 'any', why: 'Dỡ hàng ở bất kỳ nơi đến nào.' },
      { id: 'm-DDP', rule: 'DDP', bin: 'any', why: 'Giao tận nơi, phương thức nào cũng được.' }
    ]
  },
  umbrella: {
    bins: [
      { id: 'C', label: 'Ô nhỏ (C) đã che', tone: 'yellow' },
      { id: 'B', label: 'Phải từ ô vừa (B)', tone: 'teal' },
      { id: 'A', label: 'Chỉ ô lớn (A)', tone: 'pink' },
      { id: 'X', label: 'Không ô nào che', tone: 'paper' }
    ],
    items: [
      { id: 'u1', text: 'Cháy, nổ', bin: 'C', why: '(C) che cháy nổ. (B) và (A) đương nhiên cũng che.' },
      { id: 'u2', text: 'Tàu đắm, mắc cạn, lật úp', bin: 'C', why: 'Tai nạn lớn của con tàu thuộc phạm vi (C).' },
      { id: 'u3', text: 'Nước biển tràn vào hầm hàng', bin: 'B', why: '(C) không che nước tràn vào. Phải từ (B).' },
      { id: 'u4', text: 'Mất trộm, mất cắp', bin: 'A', why: 'Chỉ (A) che trộm cắp. Vì thế CIP cho hàng giá trị cao chuyển sang (A).' },
      { id: 'u5', text: 'Vứt hàng xuống biển để cứu tàu', bin: 'C', why: 'Vứt hàng cứu tàu và tổn thất chung nằm trong (C).' },
      { id: 'u6', text: 'Sóng cuốn hàng khỏi boong', bin: 'B', why: 'Hàng bị sóng cuốn phải từ (B).' },
      { id: 'u7', text: 'Đổ vỡ, móp méo do xếp dỡ mạnh tay', bin: 'A', why: 'Đổ vỡ thông thường chỉ (A) mới che.' },
      { id: 'u8', text: 'Chiến tranh, đình công', bin: 'X', why: 'Cả ba điều kiện đều loại trừ. Người mua muốn có phải yêu cầu mua thêm và trả phí.' },
      { id: 'u9', text: 'Tàu đâm va', bin: 'C', why: 'Đâm va nằm trong (C).' },
      { id: 'u10', text: 'Động đất, sét đánh', bin: 'B', why: 'Thiên tai dạng này phải từ (B).' },
      { id: 'u11', text: 'Hàng tới chậm, lỡ mùa bán', bin: 'X', why: 'Chậm trễ bị loại trừ ở mọi điều kiện.' },
      { id: 'u12', text: 'Ướt mưa khi chuyển tải', bin: 'A', why: 'Nước mưa chỉ (A) mới che.' },
      { id: 'u13', text: 'Bao bì không đủ chắc', bin: 'X', why: 'Lỗi bao bì là loại trừ chung. Đóng gói là việc của người bán theo mục A8.' }
    ]
  },
  groups: {
    bins: [
      { id: 'F', label: 'Người mua lo chặng chính', tone: 'navy' },
      { id: 'C', label: 'Người bán trả cước, rủi ro buông ở nơi đi', tone: 'yellow' },
      { id: 'D', label: 'Người bán gánh rủi ro tới nơi đến', tone: 'teal' }
    ],
    items: [
      { id: 'g-CIF', rule: 'CIF', bin: 'C', why: 'Trả cước và bảo hiểm tới cảng đến, rủi ro chuyển khi hàng lên tàu ở cảng đi.' },
      { id: 'g-DAP', rule: 'DAP', bin: 'D', why: 'Giao tại nơi đến, hàng còn trên phương tiện.' },
      { id: 'g-FCA', rule: 'FCA', bin: 'F', why: 'Giao cho người chuyên chở do người mua chỉ định.' },
      { id: 'g-CPT', rule: 'CPT', bin: 'C', why: 'Trả cước tới nơi đến, rủi ro chuyển khi giao cho người chuyên chở.' },
      { id: 'g-EXW', rule: 'EXW', bin: 'F', why: 'Người mua lo từ cổng xưởng. EXW đứng riêng nhóm E nhưng cùng tính chất này.' },
      { id: 'g-DDP', rule: 'DDP', bin: 'D', why: 'Giao tại nơi đến, đã thông quan nhập khẩu.' },
      { id: 'g-FOB', rule: 'FOB', bin: 'F', why: 'Người mua thuê tàu và trả cước.' },
      { id: 'g-CFR', rule: 'CFR', bin: 'C', why: 'Trả cước tới cảng đến, rủi ro chuyển khi hàng lên tàu.' },
      { id: 'g-DPU', rule: 'DPU', bin: 'D', why: 'Giao tại nơi đến, đã dỡ xuống.' },
      { id: 'g-FAS', rule: 'FAS', bin: 'F', why: 'Người mua thuê tàu và xếp hàng lên tàu.' },
      { id: 'g-CIP', rule: 'CIP', bin: 'C', why: 'Trả cước và bảo hiểm tới nơi đến, rủi ro chuyển khi giao cho người chuyên chở.' }
    ]
  }
};

/* ---------- Bài toán giá ---------- */
IG.PRICE = {
  unit: 'USD/thùng',
  route: 'Xuất gốm từ TP.HCM sang Pháp, cảng đến Le Havre',
  blocks: [
    { id: 'cost',   label: 'Giá thành sản xuất',                 base: 600, step: 'FAS' },
    { id: 'profit', label: 'Lãi dự tính 25% giá thành',          pct: 0.25, step: 'FAS' },
    { id: 'inland', label: 'Cước chở ra cảng TP.HCM',            base: 3,   step: 'FAS' },
    { id: 'export', label: 'Chi phí thông quan xuất khẩu',       base: 0.2, step: 'FAS' },
    { id: 'load',   label: 'Phí xếp hàng lên tàu',               base: 0.5, step: 'FOB' },
    { id: 'freight',label: 'Cước biển tới Le Havre',             base: 15,  step: 'CFR' },
    { id: 'ins',    label: 'Phí bảo hiểm đường biển',            step: 'CIF' },
    { id: 'unload', label: 'Phí dỡ hàng tại Le Havre',           base: 0.6, step: 'none' },
    { id: 'duty',   label: 'Thuế nhập khẩu tại Pháp',            base: 18,  step: 'none' }
  ],
  rate: 0.002,
  steps: [
    { term: 'FAS', place: 'Ho Chi Minh City', why: 'FAS: người bán đưa hàng tới dọc mạn tàu và đã thông quan xuất khẩu. Chưa có phí xếp lên tàu.' },
    { term: 'FOB', place: 'Ho Chi Minh City', why: 'FOB = FAS + phí xếp hàng lên tàu.' },
    { term: 'CFR', place: 'Le Havre', why: 'CFR = FOB + cước biển tới cảng đến.' },
    { term: 'CIF', place: 'Le Havre', why: 'CIF = CFR + phí bảo hiểm. Phí bảo hiểm tính trên 110% giá CIF.' }
  ],
  leftover: 'Hai khoản còn lại không nằm trong giá nào ở trên: phí dỡ ở cảng đến do người mua trả (trừ khi cước đã gồm), còn thuế nhập khẩu chỉ người bán DDP mới chịu.'
};

/* ---------- Chương và màn ---------- */
IG.CHAPTERS = [
  {
    id: 'ch1', name: 'Bến Khởi Hành', sub: 'Incoterms là gì và không là gì', x: 110, y: 330,
    intro: [
      { who: 'haiau', text: 'Chào tân binh. Chị là Hải Âu, trưởng phòng chứng từ của hãng giao nhận Sao Biển. Em tới đúng lúc lắm.' },
      { who: 'haiau', text: 'Cảng Thập Nhất này sống nhờ mười một hoa tiêu. Mỗi người dẫn hàng theo một lối riêng, và mỗi lối chia việc giữa người bán với người mua một kiểu.' },
      { who: 'haiau', text: 'Trước khi gặp họ, em phải thuộc bốn câu hỏi. Ai thuê phương tiện vận tải? Ai mua bảo hiểm? Ai thông quan và nộp thuế? Rủi ro chuyển ở đâu, lúc nào?' },
      { who: 'haiau', text: 'Và nhớ một điều khách hay quên: Incoterms không trả lời mọi thứ. Bắt đầu từ bàn phân loại nhé.' }
    ],
    levels: [
      { id: 'l1-1', type: 'sort', set: 'scope', title: 'Bàn phân loại', goal: 'Câu hỏi nào Incoterms trả lời, câu nào phải ghi trong hợp đồng?',
        takeaways: ['Incoterms trả lời: giao hàng, rủi ro, vận tải, bảo hiểm, thông quan, chi phí, chứng từ, thông báo.', 'Incoterms không nói gì về quyền sở hữu, thanh toán, chất lượng, chế tài, bất khả kháng, luật áp dụng.'] },
      { id: 'l1-2', type: 'sort', set: 'mode', title: 'Hai bến tàu', goal: 'Xếp 11 quy tắc vào đúng bến: mọi phương thức, hay chỉ đường thủy.',
        takeaways: ['Chỉ đường biển và thủy nội địa: FAS, FOB, CFR, CIF.', 'Bảy quy tắc còn lại dùng cho mọi phương thức, kể cả đa phương thức.'] },
      { id: 'l1-3', type: 'quiz', timed: 25, title: 'Sóng nhiễu', goal: 'Mười hai lời đồn về Incoterms. Lời nào đúng, lời nào sai?',
        items: ['tf-law', 'tf-year', 'tf-old', 'tf-title', 'tf-parties', 'tf-tangible', 'tf-domestic', 'tf-payment', 'tf-replace', 'tf-variant', 'tf-eleven', 'tf-1936'],
        takeaways: ['Incoterms là tập quán, không phải luật: phải dẫn chiếu trong hợp đồng và ghi rõ năm.', 'Các bản cùng tồn tại. Biến thể được phép nhưng phải ghi rõ.'] }
    ]
  },
  {
    id: 'ch2', name: 'Vịnh Người Mua Thuê Tàu', sub: 'EXW, FCA, FAS, FOB', x: 290, y: 190, meet: ['EXW', 'FCA', 'FAS', 'FOB'],
    intro: [
      { who: 'haiau', text: 'Vịnh này là đất của nhóm E và nhóm F. Điểm chung: người mua tự thuê và trả cước chặng chính. Người bán chỉ đưa hàng tới một điểm ở nước mình.' },
      { who: 'EXW', text: 'Hàng để sẵn ở cổng xưởng. Tự tới mà chở. Bốc hàng, hải quan, tôi không đụng tay.' },
      { who: 'FCA', text: 'Tôi thì thông quan xuất khẩu đàng hoàng, rồi trao hàng cho người chuyên chở của người mua. Ở xưởng tôi thì tôi bốc lên xe họ. Ở nơi khác thì tôi chở tới, để trên xe, họ tự dỡ.' },
      { who: 'FAS', text: 'Tôi đặt hàng dọc mạn tàu, trong tầm cẩu. Bốc lên tàu là việc của người mua.' },
      { who: 'FOB', text: 'Còn tôi phải thấy hàng nằm yên trên tàu rồi mới buông tay. Đừng ai nhắc chuyện lan can tàu nữa, xưa rồi.' },
      { who: 'haiau', text: 'Giờ em dựng tuyến cho từng người. Cắm cờ rủi ro, cắm mốc chi phí, bật công tắc cho đúng, rồi cho hàng chạy. Sự cố rơi vào ai, em sẽ thấy ngay.' }
    ],
    levels: [
      { id: 'l2-1', type: 'route', title: 'Dựng tuyến nhóm E và F', goal: 'Cắm cờ rủi ro và mốc chi phí cho từng hoa tiêu, rồi cho hàng khởi hành.',
        tasks: [
          { rule: 'EXW', clause: 'EXW Xưởng gốm Minh Long, Bình Dương, Incoterms® 2020', incidents: ['loadFactory', 'sea'] },
          { rule: 'FCA', variant: 1, clause: 'FCA Xưởng gốm Minh Long, Bình Dương, Incoterms® 2020', hint: 'Nơi giao là cơ sở người bán.', incidents: ['loadFactory', 'yard'] },
          { rule: 'FCA', clause: 'FCA Bãi container Cát Lái, TP.HCM, Incoterms® 2020', hint: 'Nơi giao không phải cơ sở người bán.', incidents: ['inlandExp', 'yard'] },
          { rule: 'FAS', clause: 'FAS Cảng Tiên Sa, Đà Nẵng, Incoterms® 2020', incidents: ['yard', 'loading'] },
          { rule: 'FOB', clause: 'FOB Cát Lái, TP.HCM, Incoterms® 2020', incidents: ['loading', 'sea'] }
        ],
        takeaways: ['Nhóm E và F: rủi ro và chi phí chuyển cùng một chỗ, ở nước xuất khẩu.', 'Thang nghĩa vụ người bán: EXW, rồi FCA, FAS, FOB. Mỗi bậc thêm một việc.', 'Chỉ EXW để người mua thông quan xuất khẩu.'] },
      { id: 'l2-2', type: 'quiz', title: 'Sổ sự cố', goal: 'Hàng gặp chuyện. Dựa vào điều kiện giao hàng, phân xử ai chịu.',
        items: ['c-exw-help', 'c-fca-premises', 'c-fca-cy', 'c-fas-barge', 'c-fas-crane', 'c-fob-crane', 'c-fob-cy', 'c-fob-sea', 'c-fca-late', 'c-fob-late', 'c-exwl', 'c-fca-done'],
        takeaways: ['Bốc hàng tại xưởng: EXW thì người mua chịu, FCA thì người bán chịu.', 'Xếp hàng lên tàu: FAS thì người mua chịu, FOB thì người bán chịu.', 'Người mua không cử được tàu, xe đúng hẹn: rủi ro chuyển sớm cho người mua.'] },
      { id: 'l2-3', type: 'quiz', title: 'Bàn tư vấn', goal: 'Khách kể nhu cầu. Chọn hoa tiêu phù hợp.', hand: ['EXW', 'FCA', 'FAS', 'FOB'],
        items: ['a-exw', 'a-fca-air', 'a-fca-container', 'a-fas', 'a-fob'],
        takeaways: ['Hàng không, container: FCA. Hàng rời giao sát mạn tàu: FAS. Hàng xếp lên tàu: FOB.'] }
    ]
  },
  {
    id: 'ch3', name: 'Eo Hai Điểm', sub: 'CFR, CIF, CPT, CIP', x: 500, y: 300, meet: ['CFR', 'CIF', 'CPT', 'CIP'],
    intro: [
      { who: 'haiau', text: 'Eo biển này làm đắm nhiều hợp đồng nhất. Ở đây người bán trả cước tới tận nơi đến, nên ai cũng tưởng người bán chịu rủi ro tới đó.' },
      { who: 'CFR', text: 'Tưởng thế là nhầm. Cước tới cảng đến tôi trả. Nhưng hàng lên tàu ở cảng đi là tôi hết chịu rủi ro, y như Thuyền phó Boong.' },
      { who: 'CIF', text: 'Tôi giống anh Cước, có thêm chiếc ô nhỏ loại C. Tôi mua bảo hiểm, nhưng người được che là người mua.' },
      { who: 'CPT', text: 'Tôi là anh Cước phiên bản mọi phương thức. Giao cho người chuyên chở đầu tiên là tôi buông rủi ro. Tên địa điểm đi sau tôi là nơi đến.' },
      { who: 'CIP', text: 'Còn tôi che ô lớn loại A. Từ 2020, hàng đi với tôi mặc định được bảo hiểm mức cao nhất.' },
      { who: 'haiau', text: 'Ở eo này, cờ rủi ro và mốc chi phí nằm ở hai nơi khác nhau. Dựng tuyến đi rồi em sẽ nhớ suốt đời.' }
    ],
    levels: [
      { id: 'l3-1', type: 'route', title: 'Dựng tuyến nhóm C', goal: 'Hai điểm tới hạn: cờ rủi ro một nơi, mốc chi phí một nẻo.',
        tasks: [
          { rule: 'CFR', clause: 'CFR Rotterdam, Hà Lan, Incoterms® 2020', incidents: ['loading', 'sea'] },
          { rule: 'CIF', clause: 'CIF Tokyo, Nhật Bản, Incoterms® 2020', incidents: ['yard', 'sea'] },
          { rule: 'CPT', clause: 'CPT Kho người mua, Lagos, Nigeria, Incoterms® 2020', hint: 'Người bán giao container cho hãng tàu tại bãi cảng đi.', incidents: ['yard', 'inlandImp'] },
          { rule: 'CIP', clause: 'CIP Kho ngoại quan Dallas, Hoa Kỳ, Incoterms® 2020', hint: 'Người bán giao hàng cho hãng vận tải tại điểm tập kết ở nước xuất khẩu.', incidents: ['inlandExp', 'sea'] }
        ],
        takeaways: ['Nhóm C: vạch rủi ro ngắn hơn vạch chi phí.', 'CFR, CIF: rủi ro chuyển khi hàng lên tàu. CPT, CIP: khi giao cho người chuyên chở.', 'Tên địa điểm ghi sau quy tắc nhóm C là nơi đến, không phải nơi chuyển rủi ro.'] },
      { id: 'l3-2', type: 'sort', set: 'umbrella', title: 'Ô nhỏ, ô lớn', goal: 'Mỗi tai họa cần chiếc ô cỡ nào mới che được?', extra: true,
        takeaways: ['CIF mặc định ô nhỏ (C). CIP mặc định ô lớn (A).', '(C) chỉ che tai nạn lớn: cháy nổ, đắm, mắc cạn, đâm va, vứt hàng cứu tàu.', 'Chiến tranh, đình công, chậm trễ, lỗi bao bì: không điều kiện nào che.'] },
      { id: 'l3-3', type: 'quiz', title: 'Sổ sự cố nhóm C', goal: 'Ai chịu rủi ro, ai trả tiền, bảo hiểm có đền không?',
        items: ['c-cfr-sea', 'c-cpt-first', 'c-cpt-vs-dap', 'c-cif-water', 'c-cif-upgrade', 'c-cfr-unload', 'c-cif-arrive', 'c-cip-theft', 'c-string', 'c-shorter'],
        takeaways: ['Người bán nhóm C xong việc khi gửi hàng đi. Hàng tới trễ không phải là giao chậm.', 'Phí dỡ ở nơi đến: người mua trả, trừ khi cước đã gồm.'] },
      { id: 'l3-4', type: 'price', title: 'Phòng tính giá', goal: 'Xếp từng khoản chi phí để dựng giá FAS, FOB, CFR, CIF.',
        takeaways: ['FAS, rồi FOB, CFR, CIF: mỗi bậc cộng thêm đúng một khoản.', 'CIF = CFR chia cho (1 trừ 110% nhân tỷ lệ phí bảo hiểm).'] }
    ]
  },
  {
    id: 'ch4', name: 'Quần đảo Đích Đến', sub: 'DAP, DPU, DDP', x: 720, y: 200, meet: ['DAP', 'DPU', 'DDP'],
    intro: [
      { who: 'haiau', text: 'Sang tới đây thì người bán không còn buông tay giữa đường nữa. Nhóm D giao hàng ngay tại nơi đến, rủi ro và chi phí cùng chuyển ở đó.' },
      { who: 'DAP', text: 'Tôi chở tới tận nơi. Hàng còn nằm trên xe, mời người mua dỡ. Hải quan nhập khẩu cũng mời người mua.' },
      { who: 'DPU', text: 'Trong mười một anh em, chỉ mình tôi dỡ hàng xuống rồi mới giao. Hồi 2010 người ta gọi tôi là DAT.' },
      { who: 'DDP', text: 'Tôi lo trọn gói, thuế nhập khẩu cũng nộp nốt. Có điều tôi không dỡ hàng đâu nhé, nhiều người hay tưởng thế.' },
      { who: 'haiau', text: 'Ba người này chỉ khác nhau ở hai việc: dỡ hàng và thông quan nhập khẩu. Nắm hai việc đó là em phân biệt được.' }
    ],
    levels: [
      { id: 'l4-1', type: 'route', title: 'Dựng tuyến nhóm D', goal: 'Người bán đi tới tận nơi đến. Ai dỡ hàng, ai nộp thuế?',
        tasks: [
          { rule: 'DAP', clause: 'DAP Công ty May 10, Gia Lâm, Hà Nội, Incoterms® 2020', incidents: ['sea', 'unload'] },
          { rule: 'DPU', clause: 'DPU CFS Chùa Vẽ, Hải Phòng, Incoterms® 2020', incidents: ['inlandImp', 'unload'] },
          { rule: 'DDP', clause: 'DDP Công ty IMC, KCN Từ Liêm, Hà Nội, Incoterms® 2020', incidents: ['sea', 'unload'] }
        ],
        takeaways: ['Nhóm D: người bán chịu rủi ro cả chặng, nên dù không bắt buộc vẫn nên tự mua bảo hiểm.', 'DPU: người bán dỡ hàng. DDP: người bán thông quan nhập khẩu, nhưng không dỡ.'] },
      { id: 'l4-2', type: 'quiz', title: 'Sổ sự cố nhóm D', goal: 'Dỡ hàng, kẹt hải quan, thuế tăng. Ai gánh?',
        items: ['c-dap-unload', 'c-dpu-unload', 'c-ddp-unload', 'c-dap-sea', 'c-dap-customs', 'c-ddp-tax', 'c-dap-unload-cost', 'c-cpt-to-dap'],
        takeaways: ['DAP: người mua không thông quan nhập khẩu được thì người mua chịu hậu quả.', 'Đổi CPT thành DAP: cước như cũ nhưng rủi ro cả chặng về tay người bán.'] },
      { id: 'l4-3', type: 'quiz', title: 'Bàn tư vấn lớn', goal: 'Đủ mười một hoa tiêu. Khách nào, người nấy.',
        items: ['a-cfr', 'a-cif', 'a-cpt', 'a-cip', 'a-cip-air', 'a-cpt-container', 'a-dap', 'a-dpu', 'a-ddp', 'a-not-ddp', 'a-air-set', 'a-container-set', 'a-name', 'a-zambia'],
        takeaways: ['Hỏi lần lượt: đi bằng gì, ai thuê chặng chính, có bảo hiểm bắt buộc không, rủi ro chuyển ở đâu.', 'Container: FCA, CPT, CIP thay cho FOB, CFR, CIF.'] }
    ]
  },
  {
    id: 'ch5', name: 'Hải Đăng 2020', sub: 'Điểm mới và cách ghi vào hợp đồng', x: 860, y: 350,
    intro: [
      { who: 'haiau', text: 'Biết quy tắc rồi vẫn có thể thua vì một dòng chữ. Phần lớn tranh chấp chị gặp đến từ điều khoản ghi ẩu.' },
      { who: 'haiau', text: 'Công thức ghi cho đúng: quy tắc, cộng địa điểm thật cụ thể, cộng "Incoterms® 2020". Ví dụ: CIF Cảng Hải Phòng, Việt Nam, Incoterms® 2020.' },
      { who: 'haiau', text: 'Bản 2020 cũng có mấy thay đổi so với 2010: vận đơn on board cho FCA, CIP lên ô lớn, DAT đổi thành DPU, tự chở bằng xe nhà, chi phí gom về A9/B9, yêu cầu an ninh vận tải.' },
      { who: 'haiau', text: 'Soi kỹ từng điều khoản rồi chỉ ra chỗ hỏng cho chị.' }
    ],
    levels: [
      { id: 'l5-1', type: 'quiz', title: 'Soi điều khoản', goal: 'Bấm vào phần sai trong điều khoản, rồi chọn cách sửa.',
        items: ['k-airport', 'k-noyear', 'k-dat', 'k-arrival', 'k-fob-cy', 'k-allother', 'k-cfr-origin', 'k-vague', 'k-cnf', 'k-ins'],
        takeaways: ['Quy tắc + địa điểm cụ thể + Incoterms® 2020.', 'Nhóm E, F ghi nơi giao hàng. Nhóm C ghi nơi đến. Nhóm D: nơi đến cũng là nơi giao.', 'Không thêm thuật ngữ lạ, không ghi ngày hàng đến trong hợp đồng nhóm C.'] },
      { id: 'l5-2', type: 'quiz', timed: 25, title: 'Ánh đèn 2020', goal: 'Hai mươi nhận định về điểm mới và các bẫy quen thuộc.',
        items: ['tf-rail', 'tf-cif-a', 'tf-cip-a', 'tf-dpu-only', 'tf-dpu-terminal', 'tf-dpu-ddu', 'tf-fca-bl', 'tf-own', 'tf-a9', 'tf-c-risk', 'tf-dap-ins', 'tf-cfr-port', 'tf-container', 'tf-ddp-unload', 'tf-110', 'tf-war', 'tf-fas-exp', 'tf-arrive', 'tf-unload-claim', 'tf-exw-load'],
        takeaways: ['Điểm mới 2020: on board B/L cho FCA, CIP dùng (A), DAT thành DPU, tự thu xếp vận tải, chi phí ở A9/B9, an ninh vận tải.'] },
      { id: 'l5-3', type: 'sort', set: 'groups', title: 'Bảng tổng kết', goal: 'Xếp cả 11 quy tắc theo câu hỏi: ai lo chặng chính, rủi ro chuyển ở đâu.',
        takeaways: ['E, F: người mua lo chặng chính, giao ở nơi đi.', 'C: người bán trả cước, giao ở nơi đi.', 'D: người bán trả cước, giao ở nơi đến.'] }
    ]
  },
  {
    id: 'ch6', name: 'Đài Sát Hạch', sub: 'Kỳ thi lấy bằng hoa tiêu', x: 930, y: 120,
    intro: [
      { who: 'haiau', text: 'Em đã đi hết các bến. Còn một việc: kỳ sát hạch của Cảng Thập Nhất.' },
      { who: 'haiau', text: 'Hai mươi tình huống rút ngẫu nhiên từ mọi vùng biển. Đúng từ 70% thì nhận bằng hoa tiêu. Lần nào thi đề cũng khác.' }
    ],
    levels: [
      { id: 'l6-1', type: 'quiz', exam: 20, title: 'Kỳ sát hạch hoa tiêu', goal: 'Hai mươi tình huống hỗn hợp. Đạt 70% để nhận bằng.',
        takeaways: ['Bốn câu hỏi: ai thuê vận tải, ai mua bảo hiểm, ai thông quan, rủi ro chuyển ở đâu.', 'Rủi ro, chi phí và nghĩa vụ là ba chuyện khác nhau.'] }
    ]
  }
];

IG.RANKS = [
  { xp: 0, name: 'Tân binh' },
  { xp: 350, name: 'Nhân viên chứng từ' },
  { xp: 900, name: 'Chuyên viên giao nhận' },
  { xp: 1600, name: 'Trưởng tuyến' },
  { xp: 2400, name: 'Hoa tiêu Incoterms' }
];
