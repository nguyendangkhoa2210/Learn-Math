// ================================================================
// ========================= HỆ THỐNG QUIZ =======================
// ================================================================

let quizState = { level: null, questions: [], currentIndex: 0, score: 0, answered: false, wrongCount: 0 };
let quizTimerInterval = null;
let quizTimeLeft = 60;
const TOTAL_QUESTIONS = 10;
// Cấp 1 (Tiểu học) không giới hạn thời gian; Cấp 2 & 3 giới hạn 60 giây/câu
const TIMER_SECONDS_BY_LEVEL = { cap1: null, cap2: 60, cap3: 60 };

function randInt(min, max) { return Math.floor(Math.random()*(max-min+1))+min; }

const difficultyScale = { easy: 1, medium: 1.8, hard: 3, hsg: 3 };
const difficultyLabels = { easy: 'Dễ', medium: 'Trung Bình', hard: 'Khó', hsg: '🏆 Học Sinh Giỏi' };

const quizGenerators = {
    cap1: [
        (d=1) => { const n=randInt(2,9),i=randInt(1,10); return {text:`Tính: ${n} × ${i} = ?`,answer:n*i,tolerance:0,steps:[`Đây là phép nhân trong bảng cửu chương của ${n}.`,`${n} × ${i} = ${n*i}`]}; },
        (d=1) => { const a=randInt(2,Math.round(20*d)),b=randInt(2,Math.round(20*d)); return {text:`Diện tích HCN: chiều dài a=${a}, chiều rộng b=${b}.`,answer:a*b,tolerance:0,steps:[`Công thức: S = a × b`,`S = ${a} × ${b} = ${a*b}`]}; },
        (d=1) => { const a=randInt(2,Math.round(20*d)); return {text:`Chu vi hình vuông có cạnh a=${a}.`,answer:a*4,tolerance:0,steps:[`Công thức: P = a × 4`,`P = ${a} × 4 = ${a*4}`]}; },
        (d=1) => { const a=randInt(1,Math.round(15*d)),b=randInt(a+1,Math.round(30*d)),x=b-a; return {text:`Tìm X: ${a} + X = ${b}`,answer:x,tolerance:0,steps:[`X = B - A`,`X = ${b} - ${a} = ${x}`]}; },
        (d=1) => { const a=randInt(2,Math.round(20*d)),h=randInt(2,Math.round(20*d)); return {text:`Diện tích tam giác: đáy a=${a}, chiều cao h=${h}.`,answer:(a*h)/2,tolerance:0.01,steps:[`Công thức: S = (a × h) / 2`,`S = (${a} × ${h}) / 2 = ${(a*h)/2}`]}; },
        (d=1) => { const a=randInt(2,Math.round(20*d)),b=randInt(2,Math.round(20*d)); return {text:`Chu vi HCN có a=${a}, b=${b}.`,answer:(a+b)*2,tolerance:0,steps:[`Công thức: P = (a + b) × 2`,`P = (${a} + ${b}) × 2 = ${(a+b)*2}`]}; },
        (d=1) => { const v=randInt(2,Math.round(20*d)),t=randInt(2,Math.round(10*d)); return {text:`Một xe đi với vận tốc v=${v} km/h trong t=${t} giờ. Tính quãng đường S.`,answer:v*t,tolerance:0,steps:[`Công thức: S = v × t`,`S = ${v} × ${t} = ${v*t}`]}; },
        (d=1) => { const bVal=randInt(20,Math.round(200*d)),p=randInt(5,50); const result=parseFloat((bVal*p/100).toFixed(2)); return {text:`Tính ${p}% của ${bVal}.`,answer:result,tolerance:0.05,steps:[`Công thức: A = B × b% / 100`,`A = ${bVal} × ${p}% = ${result}`]}; },
        (d=1) => { const a=randInt(4,Math.round(24*d)),b=randInt(4,Math.round(24*d)); const g=gcdCalc(a,b); return {text:`Tìm ƯCLN(${a}, ${b}).`,answer:g,tolerance:0,steps:[`Dùng thuật toán Euclid tìm ước chung lớn nhất`,`ƯCLN(${a},${b}) = ${g}`]}; },
        (d=1) => { const a=randInt(2,Math.round(10*d)),b=randInt(2,Math.round(10*d)); const l=lcmCalc(a,b); return {text:`Tìm BCNN(${a}, ${b}).`,answer:l,tolerance:0,steps:[`BCNN(a,b) = a×b / ƯCLN(a,b)`,`BCNN(${a},${b}) = ${l}`]}; },
        (d=1) => { const g=randInt(2,Math.round(6*d)),x=randInt(2,6),y=randInt(2,6); const tu=g*x,mau=g*y; return {text:`Rút gọn phân số ${tu}/${mau} về tối giản. Tử số sau khi rút gọn là bao nhiêu?`,answer:x,tolerance:0,steps:[`ƯCLN(${tu},${mau}) = ${g}`,`${tu}/${g} = ${x}, ${mau}/${g} = ${y}`]}; },
    ],
    cap2: [
        (d=1) => { const a=randInt(3,Math.round(12*d)),b=randInt(3,Math.round(12*d)),c=Math.sqrt(a*a+b*b); return {text:`Pytago: a=${a}, b=${b}. Cạnh huyền c=? (2 chữ số thập phân)`,answer:parseFloat(c.toFixed(2)),tolerance:0.05,steps:[`Công thức: c² = a² + b²`,`c² = ${a*a} + ${b*b} = ${a*a+b*b}`,`c = √${a*a+b*b} ≈ ${c.toFixed(2)}`]}; },
        (d=1) => { const a=randInt(4,Math.round(20*d)),b=randInt(2,a-1>=2?a-1:2),h=randInt(2,Math.round(20*d)),s=((a+b)*h)/2; return {text:`Diện tích hình thang: a=${a}, b=${b}, h=${h}.`,answer:s,tolerance:0.01,steps:[`Công thức: S = [(a+b) × h] / 2`,`S = [(${a}+${b}) × ${h}] / 2 = ${s}`]}; },
        (d=1) => { const r=randInt(2,Math.round(15*d)),s=parseFloat((Math.PI*r*r).toFixed(2)); return {text:`Diện tích hình tròn r=${r} (2 chữ số thập phân, π≈3.14159).`,answer:s,tolerance:0.5,steps:[`Công thức: S = π × r²`,`S = 3.14159 × ${r}² ≈ ${s}`]}; },
        (d=1) => { const a=randInt(2,Math.round(12*d)),b=randInt(2,Math.round(12*d)); return {text:`Khai triển (a+b)² với a=${a}, b=${b}. Kết quả = ?`,answer:(a+b)*(a+b),tolerance:0,steps:[`Công thức: (a+b)² = a² + 2ab + b²`,`= ${a*a} + ${2*a*b} + ${b*b} = ${(a+b)*(a+b)}`]}; },
        (d=1) => { const a=randInt(2,Math.round(20*d)); return {text:`Chu vi hình vuông có diện tích S=${a*a}.`,answer:a*4,tolerance:0,steps:[`Từ S=a² suy ra a=√S=${a}`,`P = a × 4 = ${a*4}`]}; },
        (d=1) => { const r=randInt(2,Math.round(15*d)),c=parseFloat((2*Math.PI*r).toFixed(2)); return {text:`Chu vi hình tròn r=${r} (2 chữ số thập phân).`,answer:c,tolerance:0.5,steps:[`Công thức: C = 2πr`,`C = 2 × 3.14159 × ${r} ≈ ${c}`]}; },
        (d=1) => { const a=randInt(1,Math.round(8*d)),b=randInt(-Math.round(20*d),Math.round(20*d)); const boundary=parseFloat((-b/a).toFixed(2)); return {text:`Giải bất phương trình: ${a}x + (${b}) > 0. Tìm x > ? (chỉ nhập giá trị số)`,answer:boundary,tolerance:0.02,steps:[`x > -b/a`,`x > -(${b})/${a} = ${boundary}`]}; },
        (d=1) => { const a=randInt(4,Math.round(20*d)),h=randInt(2,Math.round(15*d)); return {text:`Diện tích hình bình hành có cạnh đáy a=${a}, chiều cao h=${h}.`,answer:a*h,tolerance:0,steps:[`Công thức: S = a × h`,`S = ${a} × ${h} = ${a*h}`]}; },
        (d=1) => { const d1=randInt(4,Math.round(16*d)),d2=randInt(4,Math.round(16*d)); return {text:`Diện tích hình thoi có 2 đường chéo d₁=${d1}, d₂=${d2}.`,answer:(d1*d2)/2,tolerance:0.01,steps:[`Công thức: S = (d₁×d₂)/2`,`S = (${d1}×${d2})/2 = ${(d1*d2)/2}`]}; },
        (d=1) => { const primes=[7,11,13,17,19,23,29,31], nonPrimes=[9,15,21,25,27,33,35,49]; const useP=Math.random()<0.5; const pool=useP?primes:nonPrimes; const n=pool[randInt(0,pool.length-1)]; let isPrime=n>1; for(let i=2;i<=Math.sqrt(n);i++) if(n%i===0){isPrime=false;break;} return {text:`Số ${n} có phải là số nguyên tố không? (nhập 1 nếu có, 0 nếu không)`,answer:isPrime?1:0,tolerance:0,steps:[`Kiểm tra các ước từ 2 đến √${n}`,`${n} ${isPrime?'không có ước nào khác 1 và chính nó ⟹ LÀ số nguyên tố':'có ước khác 1 và chính nó ⟹ KHÔNG là số nguyên tố'}`]}; },
    ],
    cap3: [
        (d=1) => { const range=Math.round(8*d),r1=randInt(-range,range),r2=randInt(-range,range),b=-(r1+r2),c=r1*r2; return {text:`x² + (${b})x + (${c}) = 0. Tổng nghiệm x₁+x₂=? (Vi-ét)`,answer:r1+r2,tolerance:0,steps:[`Vi-ét: x₁+x₂ = -b/a`,`= -(${b})/1 = ${r1+r2}`]}; },
        (d=1) => { const degOptions=[0,30,45,60,90,180]; const deg=degOptions[randInt(0,degOptions.length-1)],sinV=parseFloat(Math.sin(deg*Math.PI/180).toFixed(2)); return {text:`Tính sin(${deg}°) (2 chữ số thập phân).`,answer:sinV,tolerance:0.02,steps:[`Đây là giá trị lượng giác góc đặc biệt.`,`sin(${deg}°) ≈ ${sinV}`]}; },
        (d=1) => { const c=randInt(1,Math.round(6*d)),n=randInt(2,Math.round(6*d)); return {text:`Đạo hàm y=${c}x^${n}. Hệ số của y' là bao nhiêu?`,answer:c*n,tolerance:0,steps:[`(c·xⁿ)' = c·n·xⁿ⁻¹`,`Hệ số = ${c} × ${n} = ${c*n}`]}; },
        (d=1) => { const u1=randInt(1,Math.round(10*d)),dd=randInt(1,Math.round(5*d)),n=randInt(3,8),un=u1+(n-1)*dd; return {text:`Cấp số cộng u₁=${u1}, d=${dd}. Tìm u_${n}.`,answer:un,tolerance:0,steps:[`uₙ = u₁ + (n-1)×d`,`u_${n} = ${u1} + (${n}-1)×${dd} = ${un}`]}; },
        (d=1) => { const n=randInt(4,7),k=randInt(2,n-1),C=factorial(n)/(factorial(k)*factorial(n-k)); return {text:`Tính C(${n},${k}) (tổ hợp chập ${k} của ${n}).`,answer:C,tolerance:0,steps:[`C(n,k) = n! / [k!(n-k)!]`,`C(${n},${k}) = ${C}`]}; },
        (d=1) => { const u1=randInt(1,Math.round(5*d)),dd=randInt(1,Math.round(4*d)),n=randInt(4,8); const un=u1+(n-1)*dd,sn=(n*(u1+un))/2; return {text:`Cấp số cộng u₁=${u1}, d=${dd}. Tính S_${n}.`,answer:sn,tolerance:0,steps:[`Sₙ = n×(u₁+uₙ)/2, với uₙ=${un}`,`S_${n} = ${n}×(${u1}+${un})/2 = ${sn}`]}; },
        (d=1) => { const a=randInt(2,Math.round(10*d)),b=randInt(2,Math.round(10*d)),c=randInt(2,Math.round(10*d)); return {text:`Hình hộp chữ nhật có a=${a}, b=${b}, c=${c}. Tính thể tích V.`,answer:a*b*c,tolerance:0,steps:[`Công thức: V = a × b × c`,`V = ${a}×${b}×${c} = ${a*b*c}`]}; },
        (d=1) => { const a=randInt(2,Math.round(10*d)); return {text:`Hình lập phương cạnh a=${a}. Tính thể tích V.`,answer:a**3,tolerance:0,steps:[`Công thức: V = a³`,`V = ${a}³ = ${a**3}`]}; },
        (d=1) => { const r=randInt(2,Math.round(8*d)),h=randInt(2,Math.round(10*d)),v=parseFloat((Math.PI*r*r*h).toFixed(2)); return {text:`Hình trụ bán kính r=${r}, chiều cao h=${h}. Tính thể tích V (2 chữ số thập phân, π≈3.14159).`,answer:v,tolerance:1,steps:[`Công thức: V = πr²h`,`V = 3.14159 × ${r}² × ${h} ≈ ${v}`]}; },
        (d=1) => { const r=randInt(2,Math.round(8*d)),s=parseFloat((4*Math.PI*r*r).toFixed(2)); return {text:`Hình cầu bán kính r=${r}. Tính diện tích mặt cầu S (2 chữ số thập phân).`,answer:s,tolerance:1,steps:[`Công thức: S = 4πr²`,`S = 4 × 3.14159 × ${r}² ≈ ${s}`]}; },
        (d=1) => { const vals=[randInt(1,10),randInt(1,10),randInt(1,10),randInt(1,10),randInt(1,10)]; const mean=parseFloat((vals.reduce((s,v)=>s+v,0)/vals.length).toFixed(2)); return {text:`Tính trung bình cộng của dãy số: ${vals.join(', ')}.`,answer:mean,tolerance:0.05,steps:[`x̄ = Σxᵢ / n`,`x̄ = (${vals.join('+')}) / ${vals.length} = ${mean}`]}; },
        (d=1) => { const bRange=Math.round(6*d),a=1,b=randInt(-bRange,bRange),c=randInt(-bRange,bRange); const xDinh=parseFloat((-b/(2*a)).toFixed(2)); return {text:`Cho y = x² + (${b})x + (${c}). Tìm hoành độ đỉnh (x = -b/2a).`,answer:xDinh,tolerance:0.05,steps:[`x = -b/2a`,`x = -(${b})/2 = ${xDinh}`]}; },
        (d=1) => { const u1=randInt(1,Math.round(4*d)),q=randInt(2,3),n=randInt(2,5); const un=u1*Math.pow(q,n-1); return {text:`Cấp số nhân u₁=${u1}, công bội q=${q}. Tìm u_${n}.`,answer:un,tolerance:0,steps:[`uₙ = u₁ × q^(n-1)`,`u_${n} = ${u1} × ${q}^${n-1} = ${un}`]}; },
        (d=1) => { const bases=[2,3,5,10]; const b=bases[randInt(0,bases.length-1)],exp=randInt(2,Math.round(4*d)); const x=Math.pow(b,exp); return {text:`Tính log₍${b}₎(${x}).`,answer:exp,tolerance:0,steps:[`log_b(x) = y ⟺ b^y = x`,`${b}^${exp} = ${x} ⟹ log₍${b}₎(${x}) = ${exp}`]}; },
        (d=1) => { const r=randInt(2,Math.round(6*d)),h=randInt(2,Math.round(8*d)); const v=parseFloat(((1/3)*Math.PI*r*r*h).toFixed(2)); return {text:`Hình nón bán kính r=${r}, chiều cao h=${h}. Tính thể tích V (2 chữ số thập phân, π≈3.14159).`,answer:v,tolerance:1,steps:[`Công thức: V = (1/3)πr²h`,`V = (1/3)×3.14159×${r}²×${h} ≈ ${v}`]}; },
        (d=1) => { const x1=randInt(-Math.round(8*d),Math.round(8*d)),y1=randInt(-Math.round(8*d),Math.round(8*d)),x2=randInt(-Math.round(8*d),Math.round(8*d)),y2=randInt(-Math.round(8*d),Math.round(8*d)); const dist=parseFloat(Math.sqrt((x2-x1)**2+(y2-y1)**2).toFixed(2)); return {text:`Tính khoảng cách giữa A(${x1},${y1}) và B(${x2},${y2}) (2 chữ số thập phân).`,answer:dist,tolerance:0.05,steps:[`AB = √[(x₂-x₁)²+(y₂-y₁)²]`,`AB = √[(${x2}-${x1})²+(${y2}-${y1})²] ≈ ${dist}`]}; },
        (d=1) => { const n=randInt(5,10); const soDuongCheo=(n*(n-3))/2; return {text:`Đa giác đều ${n} cạnh có bao nhiêu đường chéo?`,answer:soDuongCheo,tolerance:0,steps:[`Công thức: số đường chéo = n(n-3)/2`,`= ${n}×(${n}-3)/2 = ${soDuongCheo}`]}; },
    ]
};

const levelLabels = { cap1:'Cấp 1 (Tiểu Học)', cap2:'Cấp 2 (THCS)', cap3:'Cấp 3 (THPT)' };

// ================================================================
// ========= NGÂN HÀNG ĐỀ HỌC SINH GIỎI (TỰ SOẠN, NHIỀU BƯỚC) =====
// ================================================================
// Khác với các mức Dễ/TB/Khó (chỉ phóng to số liệu của MỘT công thức),
// đề Học Sinh Giỏi đòi hỏi kết hợp 2+ bước suy luận — đúng phong cách
// đề thi HSG thật (tư duy logic, không chỉ áp công thức máy móc).
// Toàn bộ nội dung dưới đây do hệ thống tự sinh ngẫu nhiên, KHÔNG
// sao chép từ bất kỳ đề thi có sẵn nào.
const quizGeneratorsHSG = {
    cap1: [
        // Bài toán 2 bước: mua bán có nhập thêm
        () => { const a=randInt(30,90),b=randInt(5,a-10),c=randInt(5,25); const ans=a-b+c;
            return {text:`Một cửa hàng có ${a} quyển vở. Buổi sáng bán được ${b} quyển, buổi chiều nhập thêm ${c} quyển. Hỏi cuối ngày cửa hàng còn bao nhiêu quyển vở?`,answer:ans,tolerance:0,
            steps:[`Bước 1: Sau khi bán buổi sáng còn: ${a} − ${b} = ${a-b}`,`Bước 2: Nhập thêm buổi chiều: ${a-b} + ${c} = ${ans}`]}; },
        // Tìm hai số biết tổng và hiệu
        () => { const big=randInt(30,60),small=randInt(5,big-5); const sum=big+small, diff=big-small;
            return {text:`Tổng hai số là ${sum}, hiệu hai số là ${diff}. Tìm số lớn hơn.`,answer:big,tolerance:0,
            steps:[`Số lớn = (Tổng + Hiệu) / 2`,`Số lớn = (${sum} + ${diff}) / 2 = ${big}`]}; },
        // Bài toán tuổi 2 bước
        () => { const con=randInt(6,15),hon=randInt(20,30); const bo=con+hon; const sum=con+bo;
            return {text:`Tuổi bố hơn tuổi con ${hon} tuổi. Tổng số tuổi của hai bố con hiện nay là ${sum}. Hỏi con hiện nay bao nhiêu tuổi?`,answer:con,tolerance:0,
            steps:[`Gọi tuổi con là x, tuổi bố là x + ${hon}`,`x + (x + ${hon}) = ${sum} ⟹ 2x = ${sum-hon} ⟹ x = ${con}`]}; },
        // Chu vi hình chữ nhật biết chu vi và hiệu 2 cạnh
        () => { const rong=randInt(4,12),hon=randInt(2,8); const dai=rong+hon; const cv=2*(dai+rong);
            return {text:`Một mảnh vườn hình chữ nhật có chu vi ${cv}m, chiều dài hơn chiều rộng ${hon}m. Tính chiều dài mảnh vườn.`,answer:dai,tolerance:0,
            steps:[`Nửa chu vi = ${cv}/2 = ${cv/2}`,`Chiều dài = (Nửa chu vi + Hiệu)/2 = (${cv/2} + ${hon})/2 = ${dai}`]}; },
        // Dãy số cách đều, tìm số hạng ở giữa
        () => { const u1=randInt(2,10),d=randInt(2,6),n=randInt(5,9); const un=u1+(n-1)*d; const mid=Math.ceil(n/2); const umid=u1+(mid-1)*d;
            return {text:`Cho dãy số cách đều bắt đầu từ ${u1}, mỗi số sau hơn số trước ${d} đơn vị, có tất cả ${n} số. Tìm số hạng thứ ${mid} (ở giữa dãy).`,answer:umid,tolerance:0,
            steps:[`Số hạng thứ k = số đầu + (k−1)×khoảng cách`,`Số hạng thứ ${mid} = ${u1} + (${mid}−1)×${d} = ${umid}`]}; },
    ],
    cap2: [
        // Tam giác vuông: cho 2 cạnh góc vuông, tính chu vi (Pytago + chu vi) — dùng bộ ba Pythagore chuẩn để đảm bảo số đẹp
        () => { const triples=[[3,4,5],[6,8,10],[5,12,13],[9,12,15],[8,15,17],[7,24,25],[9,40,41],[12,16,20]]; const [aInt,bInt,c]=triples[randInt(0,triples.length-1)]; const cv=aInt+bInt+c;
            return {text:`Một tam giác vuông có 2 cạnh góc vuông lần lượt là ${aInt} và ${bInt}. Tính chu vi tam giác (2 chữ số thập phân).`,answer:cv,tolerance:0.05,
            steps:[`Bước 1: Cạnh huyền c = √(${aInt}²+${bInt}²) = ${c}`,`Bước 2: Chu vi = ${aInt} + ${bInt} + ${c} = ${cv}`]}; },
        // Hệ phương trình có lời văn (tổng - hiệu / gà chó kiểu đơn giản)
        () => { const tong=randInt(15,30),hieu=randInt(1,tong-5); const x=(tong+hieu)/2, y=(tong-hieu)/2;
            if (!Number.isInteger(x) || !Number.isInteger(y)) return { text:`Hai số có tổng ${tong+1}, hiệu ${hieu}. Tìm số lớn.`, answer:(tong+1+hieu)/2, tolerance:0, steps:[`Số lớn = (Tổng+Hiệu)/2`,`= (${tong+1}+${hieu})/2`] };
            return {text:`Hai số tự nhiên có tổng là ${tong} và hiệu là ${hieu}. Tìm số lớn hơn trong hai số đó.`,answer:x,tolerance:0,
            steps:[`Số lớn = (Tổng+Hiệu)/2 = (${tong}+${hieu})/2 = ${x}`,`Số bé = (Tổng−Hiệu)/2 = ${y}`]}; },
        // Giảm giá 2 lần liên tiếp
        () => { const gia=randInt(200,500)*10,p1=randInt(10,20),p2=randInt(5,15);
            const sau1=gia*(1-p1/100), sau2=sau1*(1-p2/100);
            return {text:`Một món hàng giá ${gia} nghìn đồng, giảm giá ${p1}% lần 1, sau đó tiếp tục giảm ${p2}% trên giá đã giảm. Tính giá cuối cùng (làm tròn đến hàng đơn vị, đơn vị nghìn đồng).`,answer:Math.round(sau2),tolerance:1,
            steps:[`Sau giảm lần 1: ${gia} × (1−${p1}%) = ${sau1.toFixed(1)}`,`Sau giảm lần 2: ${sau1.toFixed(1)} × (1−${p2}%) ≈ ${Math.round(sau2)}`]}; },
        // Diện tích phần còn lại (hình lớn trừ hình nhỏ - composite)
        () => { const banKinh=randInt(4,8); const canhVuong=banKinh*2; const sVuong=canhVuong*canhVuong; const sTron=parseFloat((Math.PI*banKinh*banKinh).toFixed(2)); const sConLai=parseFloat((sVuong-sTron).toFixed(2));
            return {text:`Một hình vuông cạnh ${canhVuong}, bên trong có 1 hình tròn nội tiếp bán kính ${banKinh} (tiếp xúc 4 cạnh). Tính diện tích phần hình vuông nằm ngoài hình tròn (2 chữ số thập phân, π≈3.14159).`,answer:sConLai,tolerance:0.5,
            steps:[`S vuông = ${canhVuong}² = ${sVuong}`,`S tròn = π×${banKinh}² ≈ ${sTron}`,`Phần còn lại = ${sVuong} − ${sTron} ≈ ${sConLai}`]}; },
        // Số nguyên tố + chia hết kết hợp
        () => { const primes=[11,13,17,19,23,29,31,37]; const p=primes[randInt(0,primes.length-1)]; const k=randInt(2,5); const n=p*k;
            return {text:`Cho số N = ${n}, biết N chia hết cho một số nguyên tố p (11 ≤ p ≤ 40) và thương là ${k}. Tìm số nguyên tố p đó.`,answer:p,tolerance:0,
            steps:[`N = p × ${k} ⟹ p = N / ${k} = ${n} / ${k} = ${p}`,`Kiểm tra ${p} là số nguyên tố: đúng ✓`]}; },
    ],
    cap3: [
        // Vi-ét mở rộng: x1²+x2²
        () => { const a=1,r1=randInt(-6,6),r2=randInt(-6,6); const b=-(r1+r2),c=r1*r2; const s=r1+r2,p=r1*r2; const ans=s*s-2*p;
            return {text:`Cho phương trình x² + (${b})x + (${c}) = 0 có 2 nghiệm x₁, x₂. Tính x₁² + x₂² (không giải phương trình, dùng định lý Vi-ét).`,answer:ans,tolerance:0,
            steps:[`Vi-ét: x₁+x₂ = ${s}, x₁×x₂ = ${p}`,`x₁²+x₂² = (x₁+x₂)² − 2x₁x₂ = ${s}² − 2×(${p}) = ${ans}`]}; },
        // Max/min hàm bậc 2 có điều kiện
        () => { const a=randInt(1,3)*(Math.random()<0.5?1:-1),b=randInt(-8,8),c=randInt(-5,10);
            const xDinh=-b/(2*a), yDinh=parseFloat((c-(b*b)/(4*a)).toFixed(2));
            const loai = a>0 ? 'giá trị nhỏ nhất' : 'giá trị lớn nhất';
            return {text:`Tìm ${loai} của hàm số y = ${a}x² + (${b})x + (${c}).`,answer:yDinh,tolerance:0.05,
            steps:[`Đỉnh parabol tại x = -b/2a = ${xDinh.toFixed(2)}`,`y(đỉnh) = c − b²/4a = ${yDinh}`,`Vì a ${a>0?'>':'<'} 0 nên đây là ${loai}`]}; },
        // Kết hợp mũ - logarit
        () => { const base=[2,3,5][randInt(0,2)]; const exp1=randInt(2,4),exp2=randInt(1,3); const total=exp1+exp2; const rhs=Math.pow(base,total);
            return {text:`Giải phương trình: ${base}^(x+${exp2}) = ${rhs}. Tìm x.`,answer:exp1,tolerance:0,
            steps:[`${base}^(x+${exp2}) = ${base}^${total} ⟹ x + ${exp2} = ${total}`,`x = ${total} − ${exp2} = ${exp1}`]}; },
        // Xác suất + tổ hợp kết hợp
        () => { const n=randInt(6,9),k=randInt(2,3); function fact(x){let r=1;for(let i=2;i<=x;i++)r*=i;return r;} const total=fact(n)/(fact(k)*fact(n-k)); const favorable=1; const p=parseFloat((favorable/total).toFixed(4));
            return {text:`Một hộp có ${n} quả bóng khác nhau, chọn ngẫu nhiên ${k} quả. Tính xác suất để chọn được đúng ${k} quả bóng đã đánh dấu trước (chỉ có 1 cách thuận lợi), làm tròn 4 chữ số thập phân.`,answer:p,tolerance:0.001,
            steps:[`Số cách chọn: C(${n},${k}) = ${total}`,`P = 1/C(${n},${k}) = 1/${total} ≈ ${p}`]}; },
        // Cấp số cộng: biết u1 và un, tính tổng n số hạng
        () => { const u1=randInt(1,10),n=randInt(6,12),d=randInt(1,5); const un=u1+(n-1)*d; const sn=(n*(u1+un))/2;
            return {text:`Cấp số cộng có số hạng đầu u₁=${u1}, số hạng thứ ${n} là u_${n}=${un}. Tính tổng ${n} số hạng đầu tiên Sₙ.`,answer:sn,tolerance:0,
            steps:[`Công thức: Sₙ = n×(u₁+uₙ)/2`,`S_${n} = ${n}×(${u1}+${un})/2 = ${sn}`]}; },
    ]
};

function resetQuizView() {
    document.querySelectorAll('#quiz-panels .formula-panel').forEach(p => p.classList.remove('active'));
    document.getElementById('quiz-intro').classList.add('active');
    document.querySelectorAll('#menu-quiz .menu-item').forEach(i => i.classList.remove('active'));
    clearQuizTimer();
}

let pendingQuizLevel = null;

function chooseLevel(level, element) {
    pendingQuizLevel = level;
    document.querySelectorAll('#menu-quiz .menu-item').forEach(i => i.classList.remove('active'));
    if (element) element.classList.add('active');
    document.querySelectorAll('#quiz-panels .formula-panel').forEach(p => p.classList.remove('active'));
    document.getElementById('quiz-difficulty-select').classList.add('active');
    document.getElementById('difficulty-level-label').textContent = levelLabels[level];
    closeSidebarOnMobile();
}

function startQuiz(difficulty) {
    const level = pendingQuizLevel;
    quizState = { level, difficulty, questions: [], currentIndex: 0, score: 0, answered: false, wrongCount: 0 };

    if (difficulty === 'hsg') {
        // Đề Học Sinh Giỏi: ngân hàng riêng, nhiều bước suy luận, không phóng to số liệu
        const hsgGenerators = quizGeneratorsHSG[level];
        for (let i = 0; i < TOTAL_QUESTIONS; i++) {
            const genIndex = randInt(0, hsgGenerators.length - 1);
            const q = hsgGenerators[genIndex]();
            q.genIndex = genIndex;
            quizState.questions.push(q);
        }
    } else {
        const scale = difficultyScale[difficulty] || 1;
        const generators = quizGenerators[level];
        const weights = getWeakWeights(level, generators.length);
        for (let i = 0; i < TOTAL_QUESTIONS; i++) {
            const genIndex = weightedRandomIndex(weights);
            const q = generators[genIndex](scale);
            q.genIndex = genIndex;
            quizState.questions.push(q);
        }
    }

    document.querySelectorAll('#quiz-panels .formula-panel').forEach(p => p.classList.remove('active'));
    document.getElementById('quiz-active').classList.add('active');
    document.getElementById('quiz-level-label').textContent = `${levelLabels[level]} · ${difficultyLabels[difficulty]}`;

    renderQuizQuestion();
}

// ---- Luyện tập thích ứng: ưu tiên ra lại các dạng câu học sinh hay sai ----
// Lưu số lần sai theo từng "dạng câu" (index trong mảng generator) cho mỗi cấp,
// dạng nào sai nhiều sẽ có xác suất xuất hiện cao hơn ở lần luyện tiếp theo.
function getWeakWeights(level, count) {
    const stored = JSON.parse(localStorage.getItem(`mu_weak_${level}`) || '{}');
    const weights = [];
    for (let i = 0; i < count; i++) {
        weights.push(1 + Math.min(stored[i] || 0, 8)); // trọng số tối đa gấp 9 lần mặc định
    }
    return weights;
}

function weightedRandomIndex(weights) {
    const total = weights.reduce((s,w) => s+w, 0);
    let r = Math.random() * total;
    for (let i = 0; i < weights.length; i++) {
        r -= weights[i];
        if (r <= 0) return i;
    }
    return weights.length - 1;
}

function recordWeakness(level, genIndex, wasCorrect) {
    const key = `mu_weak_${level}`;
    const stored = JSON.parse(localStorage.getItem(key) || '{}');
    if (wasCorrect) {
        // Trả lời đúng: giảm nhẹ trọng số (học sinh đã cải thiện dạng này)
        stored[genIndex] = Math.max(0, (stored[genIndex] || 0) - 1);
    } else {
        stored[genIndex] = (stored[genIndex] || 0) + 2;
    }
    localStorage.setItem(key, JSON.stringify(stored));
}


function renderQuizQuestion() {
    const q = quizState.questions[quizState.currentIndex];
    document.getElementById('quiz-question').textContent = q.text;
    document.getElementById('quiz-progress').textContent = `Câu ${quizState.currentIndex+1} / ${TOTAL_QUESTIONS}`;
    document.getElementById('quiz-score').textContent = `Điểm: ${quizState.score}`;
    document.getElementById('quiz-answer-input').value = '';
    document.getElementById('quiz-answer-input').disabled = false;
    document.getElementById('quiz-feedback').style.display = 'none';
    document.getElementById('quiz-submit-btn').style.display = 'block';
    document.getElementById('quiz-next-btn').style.display = 'none';
    quizState.answered = false;

    // Progress bar
    const pct = ((quizState.currentIndex) / TOTAL_QUESTIONS) * 100;
    document.getElementById('quiz-progress-fill').style.width = pct + '%';

    // Start timer
    startQuizTimer();

    document.getElementById('quiz-answer-input').focus();
}

// ---- TIMER ----
function startQuizTimer() {
    clearQuizTimer();
    const timerWrap = document.getElementById('quiz-timer-wrap');
    const limit = TIMER_SECONDS_BY_LEVEL[quizState.level];

    if (limit === null || limit === undefined) {
        // Cấp 1: không tính thời gian, ẩn hẳn thanh đếm giờ
        if (timerWrap) timerWrap.style.display = 'none';
        return;
    }
    if (timerWrap) timerWrap.style.display = '';

    quizTimeLeft = limit;
    updateTimerUI();
    quizTimerInterval = setInterval(() => {
        quizTimeLeft--;
        updateTimerUI();
        if (quizTimeLeft <= 0) {
            clearQuizTimer();
            if (!quizState.answered) timeoutQuestion();
        }
    }, 1000);
}

function updateTimerUI() {
    const fill   = document.getElementById('quiz-timer-fill');
    const label  = document.getElementById('quiz-timer-label');
    const limit  = TIMER_SECONDS_BY_LEVEL[quizState.level] || 60;
    const pct    = (quizTimeLeft / limit) * 100;
    fill.style.width = pct + '%';
    label.textContent = `⏱️ ${quizTimeLeft}s`;
    const isWarning = quizTimeLeft <= 10;
    fill.classList.toggle('warning', isWarning);
    label.classList.toggle('warning', isWarning);
}

function clearQuizTimer() {
    if (quizTimerInterval) { clearInterval(quizTimerInterval); quizTimerInterval = null; }
}

function timeoutQuestion() {
    const q = quizState.questions[quizState.currentIndex];
    quizState.answered = true;
    quizState.wrongCount++;
    document.getElementById('quiz-answer-input').disabled = true;
    document.getElementById('quiz-submit-btn').style.display = 'none';
    document.getElementById('quiz-next-btn').style.display = 'block';
    const feedback = document.getElementById('quiz-feedback');
    feedback.style.display = 'block';
    feedback.className = 'output-box is-error';
    feedback.innerHTML = `⏰ Hết thời gian! Đáp án đúng là <strong>${q.answer}</strong>.`;
    document.getElementById('quiz-score').textContent = `Điểm: ${quizState.score}`;
}

function submitQuizAnswer() {
    if (quizState.answered) return;
    clearQuizTimer();

    const input = document.getElementById('quiz-answer-input');
    const userAnswer = parseFloat(input.value);
    const feedback = document.getElementById('quiz-feedback');
    const q = quizState.questions[quizState.currentIndex];

    if (isNaN(userAnswer)) {
        feedback.style.display = 'block';
        feedback.className = 'output-box is-error';
        feedback.innerHTML = '⚠️ Vui lòng nhập một giá trị số hợp lệ.';
        startQuizTimer(); // Resume timer
        return;
    }

    const isCorrect = Math.abs(userAnswer - q.answer) <= (q.tolerance || 0.001);
    quizState.answered = true;
    input.disabled = true;
    document.getElementById('quiz-submit-btn').style.display = 'none';
    document.getElementById('quiz-next-btn').style.display = 'block';
    feedback.style.display = 'block';

    if (typeof q.genIndex === 'number' && quizState.difficulty !== 'hsg') recordWeakness(quizState.level, q.genIndex, isCorrect);

    const stepsHtml = q.steps ? renderAnimatedSteps(q.steps) : '';

    if (isCorrect) {
        quizState.score++;
        feedback.className = 'output-box';
        feedback.innerHTML = `✅ <strong>Chính xác!</strong> Đáp án đúng là <strong>${q.answer}</strong>.${stepsHtml}`;
        playSound('correct');
    } else {
        quizState.wrongCount++;
        feedback.className = 'output-box is-error';
        feedback.innerHTML = `❌ <strong>Chưa đúng.</strong> Đáp án đúng: <strong>${q.answer}</strong> — Bạn nhập: ${input.value}${stepsHtml}`;
        playSound('wrong');
    }
    document.getElementById('quiz-score').textContent = `Điểm: ${quizState.score}`;
}

// Hiển thị các bước giải lần lượt xuất hiện (giống hoạt ảnh "vẽ" từng bước),
// thay vì hiện hết cùng lúc — giúp học sinh theo dõi logic dễ hơn.
function renderAnimatedSteps(steps) {
    const stepsInner = steps.map((s, i) =>
        `<div class="step-line" style="animation-delay:${i * 0.35}s">
            <span class="step-num">${i+1}</span><span class="step-text">${s}</span>
        </div>`
    ).join('');
    return `<div class="quiz-explain"><strong>🔎 Cách giải từng bước:</strong>${stepsInner}</div>`;
}

function nextQuizQuestion() {
    quizState.currentIndex++;
    if (quizState.currentIndex >= TOTAL_QUESTIONS) finishQuiz();
    else renderQuizQuestion();
}

function finishQuiz() {
    clearQuizTimer();
    document.querySelectorAll('#quiz-panels .formula-panel').forEach(p => p.classList.remove('active'));
    document.getElementById('quiz-result').classList.add('active');

    const score = quizState.score;
    const wrong = quizState.wrongCount;
    const pct   = Math.round((score / TOTAL_QUESTIONS) * 100);

    // Update breakdown
    document.getElementById('result-ring-num').textContent = score;
    document.getElementById('result-correct').textContent  = score;
    document.getElementById('result-wrong').textContent    = wrong;
    document.getElementById('result-pct').textContent      = pct + '%';

    // Animate ring
    const circumference = 2 * Math.PI * 56; // r=56
    const offset = circumference - (score / TOTAL_QUESTIONS) * circumference;
    const circle = document.getElementById('score-ring-circle');
    circle.style.transition = 'stroke-dashoffset 1s cubic-bezier(0.16,1,0.3,1)';
    setTimeout(() => { circle.style.strokeDashoffset = offset; }, 100);

    // Title
    const title = document.getElementById('quiz-result-title');
    if (score === TOTAL_QUESTIONS)       title.textContent = '🏆 Xuất Sắc! Điểm Tuyệt Đối!';
    else if (score >= TOTAL_QUESTIONS*0.8) title.textContent = '🎉 Làm Rất Tốt!';
    else if (score >= TOTAL_QUESTIONS*0.6) title.textContent = '👍 Khá Tốt!';
    else if (score >= TOTAL_QUESTIONS*0.4) title.textContent = '📖 Cần Cố Gắng Thêm!';
    else                                  title.textContent = '💪 Hãy Luyện Tập Thêm!';

    // Save stats — lưu riêng theo từng cấp VÀ từng độ khó để không bị gộp sai lệch
    saveHighScore(quizState.level, score);
    incrementQuizCount(quizState.level);
    saveQuizHistory(quizState.level, score, quizState.difficulty);
    recordDifficultyStats(quizState.level, quizState.difficulty, score);
    saveToLeaderboard(quizState.level, quizState.difficulty, score);
    refreshHighScores();
    checkAndRenderBadges();

    // Confetti if perfect
    if (score === TOTAL_QUESTIONS) launchConfetti();
}

function retryQuiz() {
    pendingQuizLevel = quizState.level;
    startQuiz(quizState.difficulty);
    document.querySelectorAll('#menu-quiz .menu-item').forEach((btn, i) => {
        const levels = ['cap1','cap2','cap3'];
        if (levels[i] === quizState.level) btn.classList.add('active');
    });
}

// ---- CONFETTI ----
function launchConfetti() {
    const colors = ['#4f46e5','#db2777','#16a34a','#ea580c','#0891b2','#7c3aed','#f59e0b'];
    for (let i = 0; i < 80; i++) {
        const el = document.createElement('div');
        el.className = 'confetti-piece';
        el.style.left = Math.random() * 100 + 'vw';
        el.style.top  = '-10px';
        el.style.background = colors[Math.floor(Math.random()*colors.length)];
        el.style.width  = (Math.random()*8+6) + 'px';
        el.style.height = (Math.random()*8+6) + 'px';
        el.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
        el.style.animationDuration = (Math.random()*2+2) + 's';
        el.style.animationDelay    = (Math.random()*1.5) + 's';
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 4000);
    }
    showToast('🏆 Điểm tuyệt đối! Xuất sắc!', 'success');
}

// ---- HIGH SCORE & STATS ----
function saveHighScore(level, score) {
    const key = `mathuniverse_highscore_${level}`;
    const current = parseInt(localStorage.getItem(key) || '0');
    if (score > current) localStorage.setItem(key, String(score));
}

function incrementQuizCount(level) {
    const c = parseInt(localStorage.getItem(`mu_quiz_count_${level}`) || '0');
    localStorage.setItem(`mu_quiz_count_${level}`, String(c + 1));
}

// Lưu thống kê CHÍNH XÁC theo từng tổ hợp (cấp độ × độ khó) bằng tổng dồn + số lần,
// để tính điểm trung bình đúng dù người dùng đã chơi rất nhiều lần (không giới hạn
// bởi kích thước mảng lịch sử như saveQuizHistory).
function recordDifficultyStats(level, difficulty, score) {
    const sumKey  = `mu_sum_${level}_${difficulty}`;
    const cntKey  = `mu_count_${level}_${difficulty}`;
    const bestKey = `mu_best_${level}_${difficulty}`;
    const sum = parseFloat(localStorage.getItem(sumKey) || '0') + score;
    const cnt = parseInt(localStorage.getItem(cntKey) || '0') + 1;
    localStorage.setItem(sumKey, String(sum));
    localStorage.setItem(cntKey, String(cnt));
    const best = Math.max(parseInt(localStorage.getItem(bestKey) || '0'), score);
    localStorage.setItem(bestKey, String(best));
}

function getDifficultyStats(level, difficulty) {
    const cnt = parseInt(localStorage.getItem(`mu_count_${level}_${difficulty}`) || '0');
    const sum = parseFloat(localStorage.getItem(`mu_sum_${level}_${difficulty}`) || '0');
    const best = parseInt(localStorage.getItem(`mu_best_${level}_${difficulty}`) || '0');
    return { attempts: cnt, avg: cnt > 0 ? sum / cnt : 0, best };
}

// Lưu lịch sử làm bài theo từng cấp riêng biệt (tối đa 20 lần gần nhất/cấp)
// để tính điểm trung bình và hiển thị xu hướng tiến bộ chính xác cho từng cấp.
function saveQuizHistory(level, score, difficulty) {
    const key = `mu_history_${level}`;
    const history = JSON.parse(localStorage.getItem(key) || '[]');
    history.push({ date: new Date().toISOString(), score, difficulty });
    if (history.length > 20) history.shift();
    localStorage.setItem(key, JSON.stringify(history));
}

function getQuizHistory(level) {
    return JSON.parse(localStorage.getItem(`mu_history_${level}`) || '[]');
}

function refreshHighScores() {
    ['cap1','cap2','cap3'].forEach(level => {
        const val = localStorage.getItem(`mathuniverse_highscore_${level}`);
        const el  = document.getElementById(`highscore-${level}`);
        if (el) el.textContent = val
            ? `${levelLabels[level]}: ${val}/${TOTAL_QUESTIONS} điểm`
            : `${levelLabels[level]}: chưa có dữ liệu`;
    });
}

// ================================================================
// ======================= KHỞI TẠO APP ==========================
// ================================================================
(function init() {
    renderRecentList();
    renderBookmarkList();
    syncBookmarkButtons();
    refreshHighScores();
})();
// ================= CHẾ ĐỘ TỐI (DARK MODE) =================