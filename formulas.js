// ===================== THUẬT TOÁN CÔNG THỨC ====================
// ================================================================

// --- CẤP 1 ---
function runCuuChuong() {
    const n = parseInt(document.getElementById('in-cuuchuong').value);
    if (isNaN(n) || n < 1) { setOutput('out-cuuchuong', '⚠️ Vui lòng nhập số nguyên dương hợp lệ lớn hơn 0.', true); return; }
    let res = `📋 Bảng nhân cho số <strong>${n}</strong>:<br>`;
    for (let i = 1; i <= 10; i++) {
        res += `&nbsp;&nbsp;${n} × ${i} = <strong>${n * i}</strong><br>`;
    }
    setOutput('out-cuuchuong', res);
}

function runHCN() {
    const a = parseFloat(document.getElementById('in-hcn-a').value);
    const b = parseFloat(document.getElementById('in-hcn-b').value);
    if (isNaN(a) || isNaN(b) || a <= 0 || b <= 0) { setOutput('out-hcn', '⚠️ Chiều dài và chiều rộng phải là số lớn hơn 0.', true); return; }
    const p = (a + b) * 2, s = a * b;
    setOutput('out-hcn', `✅ Kết quả tính toán:<br>&nbsp;&nbsp;📏 Chu vi: P = (${a} + ${b}) × 2 = <strong>${p}</strong><br>&nbsp;&nbsp;🟦 Diện tích: S = ${a} × ${b} = <strong>${s}</strong>`);
    drawRectangleSVG('svg-hcn', a, b);
}

function runHinhVuong() {
    const a = parseFloat(document.getElementById('in-hv-a').value);
    if (isNaN(a) || a <= 0) { setOutput('out-hinhvuong', '⚠️ Độ dài cạnh phải là số lớn hơn 0.', true); return; }
    setOutput('out-hinhvuong', `✅ Kết quả tính toán:<br>&nbsp;&nbsp;📏 Chu vi: P = ${a} × 4 = <strong>${a * 4}</strong><br>&nbsp;&nbsp;🟦 Diện tích: S = ${a}² = <strong>${a * a}</strong>`);
    drawRectangleSVG('svg-hinhvuong', a, a);
}

function runTamGiac() {
    const a = parseFloat(document.getElementById('in-tg-a').value);
    const h = parseFloat(document.getElementById('in-tg-h').value);
    if (isNaN(a) || isNaN(h) || a <= 0 || h <= 0) { setOutput('out-tamgiac', '⚠️ Cạnh đáy và chiều cao phải lớn hơn 0.', true); return; }
    setOutput('out-tamgiac', `✅ Kết quả:<br>&nbsp;&nbsp;🔺 Diện tích: S = (${a} × ${h}) / 2 = <strong>${(a * h) / 2}</strong>`);
    drawTriangleSVG('svg-tamgiac', a, h);
}

function runTimX() {
    const type = document.getElementById('in-timx-type').value;
    const a = parseFloat(document.getElementById('in-timx-a').value);
    const b = parseFloat(document.getElementById('in-timx-b').value);
    if (isNaN(a) || isNaN(b)) { setOutput('out-timx', '⚠️ Vui lòng nhập đầy đủ giá trị số A và B.', true); return; }
    const x = type === 'plus' ? b - a : a - b;
    const eq = type === 'plus' ? `${a} + X = ${b}` : `${a} − X = ${b}`;
    setOutput('out-timx', `✅ Bài toán: ${eq}<br>&nbsp;&nbsp;❓ Đáp số: X = <strong>${x}</strong>`);
}

// --- CẤP 2 ---
function runPytago() {
    const a = parseFloat(document.getElementById('in-py-a').value);
    const b = parseFloat(document.getElementById('in-py-b').value);
    if (isNaN(a) || isNaN(b) || a <= 0 || b <= 0) { setOutput('out-pytago', '⚠️ Độ dài hai cạnh góc vuông phải lớn hơn 0.', true); return; }
    const c = Math.sqrt(a * a + b * b);
    setOutput('out-pytago', `✅ Áp dụng định lý Pytago:<br>&nbsp;&nbsp;c² = ${a}² + ${b}² = ${a*a + b*b}<br>&nbsp;&nbsp;📐 Cạnh huyền: c = <strong>${c.toFixed(4)}</strong>`);
    drawRightTriangleSVG('svg-pytago', a, b, c);
}

function runHPT() {
    const a1 = parseFloat(document.getElementById('in-hpt-a1').value);
    const b1 = parseFloat(document.getElementById('in-hpt-b1').value);
    const c1 = parseFloat(document.getElementById('in-hpt-c1').value);
    const a2 = parseFloat(document.getElementById('in-hpt-a2').value);
    const b2 = parseFloat(document.getElementById('in-hpt-b2').value);
    const c2 = parseFloat(document.getElementById('in-hpt-c2').value);
    if ([a1,b1,c1,a2,b2,c2].some(isNaN)) { setOutput('out-hpt', '⚠️ Hãy nhập đầy đủ toàn bộ 6 hệ số.', true); return; }
    const D = a1*b2 - a2*b1, Dx = c1*b2 - c2*b1, Dy = a1*c2 - a2*c1;
    if (D === 0) {
        setOutput('out-hpt', Dx === 0 && Dy === 0
            ? '♾️ Hệ phương trình có <strong>vô số nghiệm</strong>.'
            : '⛔ Hệ phương trình <strong>vô nghiệm</strong>.');
    } else {
        setOutput('out-hpt', `✅ Hệ có nghiệm duy nhất:<br>&nbsp;&nbsp;x = ${(Dx/D).toFixed(4)}<br>&nbsp;&nbsp;y = ${(Dy/D).toFixed(4)}`);
    }
}

function runHinhThang() {
    const a = parseFloat(document.getElementById('in-thang-a').value);
    const b = parseFloat(document.getElementById('in-thang-b').value);
    const h = parseFloat(document.getElementById('in-thang-h').value);
    if (isNaN(a)||isNaN(b)||isNaN(h)||a<=0||b<=0||h<=0) { setOutput('out-hinhthang', '⚠️ Các thông số kích thước phải > 0.', true); return; }
    setOutput('out-hinhthang', `✅ Kết quả:<br>&nbsp;&nbsp;▱ Diện tích: S = (${a} + ${b}) × ${h} / 2 = <strong>${((a+b)*h)/2}</strong>`);
    drawTrapezoidSVG('svg-hinhthang', a, b, h);
}

function runDuongTron() {
    const r = parseFloat(document.getElementById('in-tron-r').value);
    if (isNaN(r) || r <= 0) { setOutput('out-duongtron', '⚠️ Bán kính phải là số lớn hơn 0.', true); return; }
    const c = 2 * Math.PI * r, s = Math.PI * r * r;
    setOutput('out-duongtron', `✅ Kết quả (π ≈ 3.14159):<br>&nbsp;&nbsp;📏 Chu vi: C = 2π × ${r} = <strong>${c.toFixed(4)}</strong><br>&nbsp;&nbsp;⚪ Diện tích: S = π × ${r}² = <strong>${s.toFixed(4)}</strong>`);
    drawCircleSVG('svg-duongtron', r);
}

function runHDT() {
    const sign = document.getElementById('in-hdt-sign').value;
    const a = document.getElementById('in-hdt-a').value.trim();
    const b = document.getElementById('in-hdt-b').value.trim();
    if (!a || !b) { setOutput('out-hdt', '⚠️ Hãy nhập đầy đủ biến thức A và B.', true); return; }
    const s = sign === 'plus' ? '+' : '−';
    const s2 = sign === 'plus' ? '+' : '−';
    setOutput('out-hdt', `✅ Khai triển hằng đẳng thức:<br>&nbsp;&nbsp;(${a} ${s} ${b})² = (${a})² ${s2} 2(${a})(${b}) + (${b})²`);
}

// --- CẤP 3 ---
function runPTB2() {
    const a = parseFloat(document.getElementById('in-ptb2-a').value);
    const b = parseFloat(document.getElementById('in-ptb2-b').value);
    const c = parseFloat(document.getElementById('in-ptb2-c').value);
    if (isNaN(a)||isNaN(b)||isNaN(c)) { setOutput('out-ptbac2', '⚠️ Vui lòng nhập đủ các hệ số.', true); return; }
    if (a === 0) { setOutput('out-ptbac2', '⚠️ Hệ số a phải khác 0 (phương trình bậc 2).', true); return; }
    const delta = b*b - 4*a*c;
    if (delta < 0) {
        setOutput('out-ptbac2', `📊 Δ = ${delta} < 0<br>&nbsp;&nbsp;⛔ Phương trình <strong>vô nghiệm thực</strong>.`);
    } else if (delta === 0) {
        setOutput('out-ptbac2', `📊 Δ = 0 → Nghiệm kép:<br>&nbsp;&nbsp;x₁ = x₂ = <strong>${(-b/(2*a)).toFixed(4)}</strong>`);
    } else {
        const x1 = (-b + Math.sqrt(delta))/(2*a), x2 = (-b - Math.sqrt(delta))/(2*a);
        setOutput('out-ptbac2', `📊 Δ = ${delta} > 0 → Có 2 nghiệm:<br>&nbsp;&nbsp;x₁ = <strong>${x1.toFixed(4)}</strong><br>&nbsp;&nbsp;x₂ = <strong>${x2.toFixed(4)}</strong>`);
    }
}

function runLuongGiac() {
    const deg = parseFloat(document.getElementById('in-lg-deg').value);
    if (isNaN(deg)) { setOutput('out-luonggiac', '⚠️ Vui lòng nhập số đo độ góc.', true); return; }
    const rad = deg * (Math.PI / 180);
    const sinV = Math.sin(rad), cosV = Math.cos(rad);
    const tanV = Math.abs(cosV) < 1e-10 ? 'Không xác định' : Math.tan(rad).toFixed(4);
    setOutput('out-luonggiac', `🌀 Phân tích góc ${deg}°:<br>&nbsp;&nbsp;📐 Radian: <strong>${rad.toFixed(5)} rad</strong><br>&nbsp;&nbsp;sin(${deg}°) = <strong>${sinV.toFixed(4)}</strong><br>&nbsp;&nbsp;cos(${deg}°) = <strong>${cosV.toFixed(4)}</strong><br>&nbsp;&nbsp;tan(${deg}°) = <strong>${tanV}</strong>`);
}

function runDaoHam() {
    const c = parseFloat(document.getElementById('in-dh-c').value);
    const n = parseInt(document.getElementById('in-dh-n').value);
    if (isNaN(c)||isNaN(n)) { setOutput('out-daoham', '⚠️ Hãy cung cấp đầy đủ hệ số c và số mũ n.', true); return; }
    if (n === 0) { setOutput('out-daoham', `Hàm số y = ${c} (Hàm hằng)<br>&nbsp;&nbsp;y' = <strong>0</strong>`); return; }
    if (n === 1) { setOutput('out-daoham', `Hàm số y = ${c}x<br>&nbsp;&nbsp;y' = <strong>${c}</strong>`); return; }
    setOutput('out-daoham', `⚡ Đạo hàm:<br>&nbsp;&nbsp;y = ${c}x^${n}<br>&nbsp;&nbsp;y' = <strong>${c*n}x^${n-1}</strong>`);
}

function runCSC() {
    const u1 = parseFloat(document.getElementById('in-csc-u1').value);
    const d  = parseFloat(document.getElementById('in-csc-d').value);
    const n  = parseInt(document.getElementById('in-csc-n').value);
    if (isNaN(u1)||isNaN(d)||isNaN(n)||n<1) { setOutput('out-capsocong', '⚠️ Hãy điền đúng các tham số. n phải ≥ 1.', true); return; }
    const un = u1 + (n-1)*d, sn = (n*(u1+un))/2;
    setOutput('out-capsocong', `🔢 Phân tích cấp số cộng (u₁=${u1}, d=${d}):<br>&nbsp;&nbsp;u_${n} = ${u1} + (${n}-1)×${d} = <strong>${un}</strong><br>&nbsp;&nbsp;S_${n} = ${n}×(${u1}+${un})/2 = <strong>${sn}</strong>`);
}

function factorial(n) {
    if (n > 20) return Infinity;
    let res = 1;
    for (let i = 2; i <= n; i++) res *= i;
    return res;
}

function runToHop() {
    const n = parseInt(document.getElementById('in-th-n').value);
    const k = parseInt(document.getElementById('in-th-k').value);
    if (isNaN(n)||isNaN(k)||n<0||k<0) { setOutput('out-tohop', '⚠️ n và k phải là số nguyên không âm.', true); return; }
    if (k > n) { setOutput('out-tohop', '⚠️ Số phần tử chọn k không được lớn hơn n.', true); return; }
    if (n > 20) { setOutput('out-tohop', '⚠️ Để tránh tràn số, vui lòng nhập n ≤ 20.', true); return; }
    const A = factorial(n)/factorial(n-k), C = A/factorial(k);
    setOutput('out-tohop', `🎲 Kết quả (n=${n}, k=${k}):<br>&nbsp;&nbsp;Chỉnh hợp: A(${n},${k}) = <strong>${A}</strong><br>&nbsp;&nbsp;Tổ hợp: C(${n},${k}) = <strong>${C}</strong>`);
}

// --- HÌNH KHÔNG GIAN ---
function runHHCN() {
    const a = parseFloat(document.getElementById('in-hhcn-a').value);
    const b = parseFloat(document.getElementById('in-hhcn-b').value);
    const c = parseFloat(document.getElementById('in-hhcn-c').value);
    if ([a,b,c].some(v => isNaN(v) || v <= 0)) { setOutput('out-hhcn', '⚠️ Ba kích thước phải là số lớn hơn 0.', true); return; }
    const v = a*b*c, sxq = 2*(a+b)*c, stp = sxq + 2*a*b;
    setOutput('out-hhcn', `📦 Kết quả (a=${a}, b=${b}, c=${c}):<br>&nbsp;&nbsp;Thể tích: V = ${a}×${b}×${c} = <strong>${v}</strong><br>&nbsp;&nbsp;Diện tích xung quanh: S<sub>xq</sub> = <strong>${sxq}</strong><br>&nbsp;&nbsp;Diện tích toàn phần: S<sub>tp</sub> = <strong>${stp}</strong>`);
}

function runHLP() {
    const a = parseFloat(document.getElementById('in-hlp-a').value);
    if (isNaN(a) || a <= 0) { setOutput('out-hlp', '⚠️ Độ dài cạnh phải là số lớn hơn 0.', true); return; }
    setOutput('out-hlp', `🧊 Kết quả (a=${a}):<br>&nbsp;&nbsp;Thể tích: V = ${a}³ = <strong>${(a**3).toFixed(4).replace(/\.?0+$/,'')}</strong><br>&nbsp;&nbsp;Diện tích toàn phần: S<sub>tp</sub> = 6×${a}² = <strong>${(6*a*a).toFixed(4).replace(/\.?0+$/,'')}</strong>`);
}

function runHinhTru() {
    const r = parseFloat(document.getElementById('in-tru-r').value);
    const h = parseFloat(document.getElementById('in-tru-h').value);
    if (isNaN(r)||isNaN(h)||r<=0||h<=0) { setOutput('out-hinhtru', '⚠️ Bán kính và chiều cao phải lớn hơn 0.', true); return; }
    const v = Math.PI*r*r*h, sxq = 2*Math.PI*r*h, stp = sxq + 2*Math.PI*r*r;
    setOutput('out-hinhtru', `🥫 Kết quả (r=${r}, h=${h}, π≈3.14159):<br>&nbsp;&nbsp;Thể tích: V = <strong>${v.toFixed(4)}</strong><br>&nbsp;&nbsp;Diện tích xung quanh: S<sub>xq</sub> = <strong>${sxq.toFixed(4)}</strong><br>&nbsp;&nbsp;Diện tích toàn phần: S<sub>tp</sub> = <strong>${stp.toFixed(4)}</strong>`);
}

function runHinhCau() {
    const r = parseFloat(document.getElementById('in-cau-r').value);
    if (isNaN(r) || r <= 0) { setOutput('out-hinhcau', '⚠️ Bán kính phải là số lớn hơn 0.', true); return; }
    const v = (4/3)*Math.PI*r**3, s = 4*Math.PI*r*r;
    setOutput('out-hinhcau', `🌐 Kết quả (r=${r}, π≈3.14159):<br>&nbsp;&nbsp;Thể tích: V = (4/3)π×${r}³ = <strong>${v.toFixed(4)}</strong><br>&nbsp;&nbsp;Diện tích mặt cầu: S = 4π×${r}² = <strong>${s.toFixed(4)}</strong>`);
}

function runHinhChop() {
    const a = parseFloat(document.getElementById('in-chop-a').value);
    const h = parseFloat(document.getElementById('in-chop-h').value);
    if (isNaN(a)||isNaN(h)||a<=0||h<=0) { setOutput('out-hinhchop', '⚠️ Cạnh đáy và chiều cao phải lớn hơn 0.', true); return; }
    const v = (1/3)*a*a*h;
    setOutput('out-hinhchop', `🔺 Kết quả (a=${a}, h=${h}):<br>&nbsp;&nbsp;Thể tích: V = (1/3)×${a}²×${h} = <strong>${v.toFixed(4)}</strong>`);
}

// --- THỐNG KÊ CƠ BẢN ---
function runThongKe() {
    const raw = document.getElementById('in-tk-data').value.trim();
    if (!raw) { setOutput('out-thongke', '⚠️ Vui lòng nhập dãy số, cách nhau bằng dấu phẩy.', true); return; }
    const nums = raw.split(',').map(s => parseFloat(s.trim())).filter(v => !isNaN(v));
    if (nums.length === 0) { setOutput('out-thongke', '⚠️ Không tìm thấy số hợp lệ nào trong dãy đã nhập.', true); return; }
    if (nums.length > 200) { setOutput('out-thongke', '⚠️ Vui lòng nhập tối đa 200 giá trị.', true); return; }

    const n = nums.length;
    const mean = nums.reduce((s,v)=>s+v,0) / n;
    const sorted = [...nums].sort((a,b)=>a-b);
    const median = n % 2 === 0 ? (sorted[n/2 - 1] + sorted[n/2]) / 2 : sorted[(n-1)/2];

    // Tính mốt (giá trị xuất hiện nhiều nhất)
    const freq = {};
    nums.forEach(v => { freq[v] = (freq[v]||0) + 1; });
    let maxFreq = 0, modes = [];
    Object.entries(freq).forEach(([val, f]) => {
        if (f > maxFreq) { maxFreq = f; modes = [val]; }
        else if (f === maxFreq) modes.push(val);
    });
    const modeStr = maxFreq <= 1 ? 'Không có (mọi giá trị chỉ xuất hiện 1 lần)' : modes.join(', ');

    const variance = nums.reduce((s,v)=>s+(v-mean)**2, 0) / n;
    const stdDev = Math.sqrt(variance);

    setOutput('out-thongke', `📊 Phân tích ${n} giá trị: [${nums.join(', ')}]<br>` +
        `&nbsp;&nbsp;Trung bình: x̄ = <strong>${mean.toFixed(3)}</strong><br>` +
        `&nbsp;&nbsp;Trung vị: <strong>${median}</strong><br>` +
        `&nbsp;&nbsp;Mốt: <strong>${modeStr}</strong><br>` +
        `&nbsp;&nbsp;Phương sai: σ² = <strong>${variance.toFixed(3)}</strong><br>` +
        `&nbsp;&nbsp;Độ lệch chuẩn: σ = <strong>${stdDev.toFixed(3)}</strong>`);
}

// --- KHẢO SÁT HÀM SỐ BẬC 2 (CÓ VẼ ĐỒ THỊ) ---
function runHamSo() {
    const a = parseFloat(document.getElementById('in-hs-a').value);
    const b = parseFloat(document.getElementById('in-hs-b').value);
    const c = parseFloat(document.getElementById('in-hs-c').value);
    if (isNaN(a)||isNaN(b)||isNaN(c)) { setOutput('out-hamso', '⚠️ Vui lòng nhập đủ 3 hệ số a, b, c.', true); return; }
    if (a === 0) { setOutput('out-hamso', '⚠️ Hệ số a phải khác 0 (đây là hàm số bậc hai).', true); return; }

    const xDinh = -b / (2*a);
    const yDinh = c - (b*b) / (4*a);
    const huong = a > 0 ? 'bề lõm quay lên (có giá trị nhỏ nhất)' : 'bề lõm quay xuống (có giá trị lớn nhất)';

    setOutput('out-hamso', `📈 Khảo sát y = ${a}x² + ${b}x + ${c}:<br>` +
        `&nbsp;&nbsp;Trục đối xứng: x = <strong>${xDinh.toFixed(3)}</strong><br>` +
        `&nbsp;&nbsp;Tọa độ đỉnh: I(${xDinh.toFixed(3)} ; ${yDinh.toFixed(3)})<br>` +
        `&nbsp;&nbsp;Parabol có ${huong}.`);

    drawParabolaSVG('svg-hamso', a, b, c, xDinh, yDinh);
}

// --- TÍCH PHÂN CƠ BẢN (NGUYÊN HÀM HÀM LŨY THỪA) ---
function runTichPhan() {
    const c = parseFloat(document.getElementById('in-tp-c').value);
    const n = parseFloat(document.getElementById('in-tp-n').value);
    if (isNaN(c) || isNaN(n)) { setOutput('out-tichphan', '⚠️ Vui lòng nhập đủ hệ số c và số mũ n.', true); return; }
    if (n === -1) { setOutput('out-tichphan', '⚠️ Với n = -1, nguyên hàm là ln|x| + C (công thức khác, không áp dụng ở đây).', true); return; }
    const newCoef = c / (n+1), newExp = n+1;
    setOutput('out-tichphan', `∫ Nguyên hàm của y = ${c}x^${n}:<br>&nbsp;&nbsp;∫ ${c}x^${n} dx = (${c}/(${n}+1)) × x^${newExp} + C = <strong>${newCoef}x^${newExp} + C</strong>`);
}

// --- TOÁN CHUYỂN ĐỘNG ---
function runChuyenDong() {
    const type = document.getElementById('in-cd-type').value;
    const a = parseFloat(document.getElementById('in-cd-a').value);
    const b = parseFloat(document.getElementById('in-cd-b').value);
    if (isNaN(a) || isNaN(b) || a <= 0 || b <= 0) { setOutput('out-chuyendong', '⚠️ Vui lòng nhập đủ 2 giá trị lớn hơn 0.', true); return; }
    if (type === 's') {
        setOutput('out-chuyendong', `🚗 Tìm quãng đường: S = v × t<br>&nbsp;&nbsp;S = ${a} × ${b} = <strong>${a*b}</strong>`);
    } else if (type === 'v') {
        setOutput('out-chuyendong', `🚗 Tìm vận tốc: v = S / t<br>&nbsp;&nbsp;v = ${a} / ${b} = <strong>${(a/b).toFixed(3)}</strong>`);
    } else {
        setOutput('out-chuyendong', `🚗 Tìm thời gian: t = S / v<br>&nbsp;&nbsp;t = ${a} / ${b} = <strong>${(a/b).toFixed(3)}</strong>`);
    }
}

// --- TỈ LỆ & PHẦN TRĂM ---
function runTiLe() {
    const type = document.getElementById('in-tl-type').value;
    const a = parseFloat(document.getElementById('in-tl-a').value);
    const b = parseFloat(document.getElementById('in-tl-b').value);
    const p = parseFloat(document.getElementById('in-tl-p').value);
    if (isNaN(b) || b === 0) { setOutput('out-tile', '⚠️ Vui lòng nhập giá trị B khác 0.', true); return; }
    if (type === 'find-a') {
        if (isNaN(p)) { setOutput('out-tile', '⚠️ Vui lòng nhập tỉ lệ % để tính A.', true); return; }
        const result = (b * p) / 100;
        setOutput('out-tile', `📊 Tìm A: A = B × b% / 100<br>&nbsp;&nbsp;A = ${b} × ${p}% = <strong>${result}</strong>`);
    } else {
        if (isNaN(a)) { setOutput('out-tile', '⚠️ Vui lòng nhập giá trị A để tính tỉ lệ %.', true); return; }
        const result = (a / b) * 100;
        setOutput('out-tile', `📊 Tìm tỉ lệ %: b% = A / B × 100<br>&nbsp;&nbsp;b% = ${a} / ${b} × 100 = <strong>${result.toFixed(2)}%</strong>`);
    }
}

// --- BẤT PHƯƠNG TRÌNH BẬC NHẤT ---
function runBPTBac1() {
    const a = parseFloat(document.getElementById('in-bpt1-a').value);
    const b = parseFloat(document.getElementById('in-bpt1-b').value);
    const sign = document.getElementById('in-bpt1-sign').value;
    if (isNaN(a) || isNaN(b)) { setOutput('out-bptbac1', '⚠️ Vui lòng nhập đủ hệ số a và b.', true); return; }
    if (a === 0) { setOutput('out-bptbac1', '⚠️ Hệ số a phải khác 0.', true); return; }

    const boundary = -b / a;
    // Xác định chiều bất đẳng thức sau khi chia cho a (đảo chiều nếu a < 0)
    const signMap = { '>':'>', '<':'<', '>=':'≥', '<=':'≤' };
    const flipMap = { '>':'<', '<':'>', '>=':'≤', '<=':'≥' };
    const finalSign = a > 0 ? signMap[sign] : flipMap[sign];

    setOutput('out-bptbac1', `📉 Giải: ${a}x + ${b} ${signMap[sign]} 0<br>` +
        `&nbsp;&nbsp;⟺ x ${finalSign} ${(-b/a).toFixed(3)}` +
        `${a < 0 ? '<br>&nbsp;&nbsp;(Lưu ý: chia 2 vế cho a < 0 nên đảo chiều bất đẳng thức)' : ''}<br>` +
        `&nbsp;&nbsp;Tập nghiệm: x ${finalSign} <strong>${boundary.toFixed(3)}</strong>`);
}

// --- BẤT PHƯƠNG TRÌNH BẬC HAI (XÉT DẤU TAM THỨC) ---
function runBPTBac2() {
    const a = parseFloat(document.getElementById('in-bpt2-a').value);
    const b = parseFloat(document.getElementById('in-bpt2-b').value);
    const c = parseFloat(document.getElementById('in-bpt2-c').value);
    if (isNaN(a) || isNaN(b) || isNaN(c)) { setOutput('out-bptbac2', '⚠️ Vui lòng nhập đủ 3 hệ số a, b, c.', true); return; }
    if (a === 0) { setOutput('out-bptbac2', '⚠️ Hệ số a phải khác 0.', true); return; }

    const delta = b*b - 4*a*c;
    const dauA = a > 0 ? 'dương (+)' : 'âm (−)';

    if (delta < 0) {
        setOutput('out-bptbac2', `📈 Xét dấu f(x) = ${a}x² + ${b}x + ${c}:<br>&nbsp;&nbsp;Δ = ${delta} < 0<br>&nbsp;&nbsp;⟹ f(x) luôn cùng dấu với a trên toàn trục số: f(x) <strong>${dauA}</strong> với mọi x.`);
    } else if (delta === 0) {
        const x0 = -b/(2*a);
        setOutput('out-bptbac2', `📈 Xét dấu f(x) = ${a}x² + ${b}x + ${c}:<br>&nbsp;&nbsp;Δ = 0, nghiệm kép x₀ = ${x0.toFixed(3)}<br>&nbsp;&nbsp;⟹ f(x) <strong>${dauA}</strong> với mọi x ≠ ${x0.toFixed(3)}, f(x₀) = 0.`);
    } else {
        const x1 = (-b - Math.sqrt(delta)) / (2*a);
        const x2 = (-b + Math.sqrt(delta)) / (2*a);
        const xNho = Math.min(x1,x2).toFixed(3), xLon = Math.max(x1,x2).toFixed(3);
        const dauKhac = a > 0 ? 'âm (−)' : 'dương (+)';
        setOutput('out-bptbac2', `📈 Xét dấu f(x) = ${a}x² + ${b}x + ${c}:<br>&nbsp;&nbsp;Δ = ${delta} > 0, hai nghiệm: x₁ = ${xNho}, x₂ = ${xLon}<br>` +
            `&nbsp;&nbsp;⟹ f(x) <strong>${dauA}</strong> khi x &lt; ${xNho} hoặc x &gt; ${xLon}<br>` +
            `&nbsp;&nbsp;⟹ f(x) <strong>${dauKhac}</strong> khi ${xNho} &lt; x &lt; ${xLon}`);
    }
}

// --- HỆ THỨC LƯỢNG TRONG TAM GIÁC ---
function runHeThucLuong() {
    const b = parseFloat(document.getElementById('in-htl-b').value);
    const c = parseFloat(document.getElementById('in-htl-c').value);
    const A = parseFloat(document.getElementById('in-htl-A').value);
    if (isNaN(b) || isNaN(c) || isNaN(A) || b<=0 || c<=0 || A<=0 || A>=180) { setOutput('out-hethucluong', '⚠️ Cạnh b, c phải > 0 và góc A trong khoảng (0°, 180°).', true); return; }

    const rad = A * Math.PI / 180;
    const aSquared = b*b + c*c - 2*b*c*Math.cos(rad);
    const a = Math.sqrt(aSquared);
    const S = 0.5 * b * c * Math.sin(rad);

    setOutput('out-hethucluong', `📐 Với b=${b}, c=${c}, góc A=${A}°:<br>` +
        `&nbsp;&nbsp;Định lý Cos: a² = ${b}² + ${c}² − 2×${b}×${c}×cos(${A}°) = ${aSquared.toFixed(3)}<br>` +
        `&nbsp;&nbsp;Cạnh a = <strong>${a.toFixed(3)}</strong><br>` +
        `&nbsp;&nbsp;Diện tích: S = ½ × ${b} × ${c} × sin(${A}°) = <strong>${S.toFixed(3)}</strong>`);
}

// --- PHƯƠNG TRÌNH LƯỢNG GIÁC CƠ BẢN ---
function runPTLuongGiac() {
    const type = document.getElementById('in-ptlg-type').value;
    const a = parseFloat(document.getElementById('in-ptlg-a').value);
    if (isNaN(a) || a < -1 || a > 1) { setOutput('out-ptluonggiac', '⚠️ Giá trị a phải nằm trong khoảng [-1, 1] để phương trình có nghiệm.', true); return; }

    if (type === 'sin') {
        const arcsinDeg = Math.asin(a) * 180 / Math.PI;
        setOutput('out-ptluonggiac', `🌀 Giải sin x = ${a}:<br>` +
            `&nbsp;&nbsp;arcsin(${a}) ≈ ${arcsinDeg.toFixed(2)}°<br>` +
            `&nbsp;&nbsp;⟹ x = <strong>${arcsinDeg.toFixed(2)}° + k360°</strong><br>` +
            `&nbsp;&nbsp;hoặc x = <strong>${(180-arcsinDeg).toFixed(2)}° + k360°</strong> &nbsp;(k ∈ ℤ)`);
    } else {
        const arccosDeg = Math.acos(a) * 180 / Math.PI;
        setOutput('out-ptluonggiac', `🌀 Giải cos x = ${a}:<br>` +
            `&nbsp;&nbsp;arccos(${a}) ≈ ${arccosDeg.toFixed(2)}°<br>` +
            `&nbsp;&nbsp;⟹ x = <strong>±${arccosDeg.toFixed(2)}° + k360°</strong> &nbsp;(k ∈ ℤ)`);
    }
}

// --- CẤP SỐ NHÂN ---
function runCSN() {
    const u1 = parseFloat(document.getElementById('in-csn-u1').value);
    const q = parseFloat(document.getElementById('in-csn-q').value);
    const n = parseInt(document.getElementById('in-csn-n').value);
    if (isNaN(u1) || isNaN(q) || isNaN(n) || n < 1) { setOutput('out-capsonhan', '⚠️ Hãy điền đúng các tham số. n phải ≥ 1.', true); return; }
    if (n > 100) { setOutput('out-capsonhan', '⚠️ Vui lòng nhập n ≤ 100 để tránh tràn số.', true); return; }

    const un = u1 * Math.pow(q, n-1);
    let snText;
    if (q === 1) {
        const sn = u1 * n;
        snText = `Vì q = 1 nên Sₙ = u₁ × n = ${u1} × ${n} = <strong>${sn}</strong>`;
    } else {
        const sn = u1 * (Math.pow(q,n) - 1) / (q - 1);
        snText = `Sₙ = u₁(qⁿ−1)/(q−1) = ${u1}×(${q}^${n}−1)/(${q}−1) = <strong>${sn.toFixed(4)}</strong>`;
    }

    setOutput('out-capsonhan', `🔢 Phân tích cấp số nhân (u₁=${u1}, q=${q}):<br>` +
        `&nbsp;&nbsp;u_${n} = ${u1} × ${q}^(${n}-1) = <strong>${un.toFixed(4)}</strong><br>` +
        `&nbsp;&nbsp;${snText}`);
}

// --- LŨY THỪA & LOGARIT ---
function runLogarit() {
    const b = parseFloat(document.getElementById('in-log-b').value);
    const x = parseFloat(document.getElementById('in-log-x').value);
    if (isNaN(b) || isNaN(x)) { setOutput('out-mulogarit', '⚠️ Vui lòng nhập đủ cơ số b và giá trị x.', true); return; }
    if (b <= 0 || b === 1) { setOutput('out-mulogarit', '⚠️ Cơ số b phải > 0 và khác 1.', true); return; }
    if (x <= 0) { setOutput('out-mulogarit', '⚠️ Giá trị x phải lớn hơn 0.', true); return; }

    const result = Math.log(x) / Math.log(b);
    setOutput('out-mulogarit', `📐 Tính log<sub>${b}</sub>(${x}):<br>` +
        `&nbsp;&nbsp;Công thức đổi cơ số: log<sub>${b}</sub>(${x}) = ln(${x}) / ln(${b})<br>` +
        `&nbsp;&nbsp;= ${Math.log(x).toFixed(4)} / ${Math.log(b).toFixed(4)} = <strong>${result.toFixed(4)}</strong><br>` +
        `&nbsp;&nbsp;(Kiểm tra: ${b}<sup>${result.toFixed(4)}</sup> ≈ ${x})`);
}

// --- TRUNG BÌNH CỘNG (CẤP 1) ---
function runTBC() {
    const raw = document.getElementById('in-tbc-data').value.trim();
    if (!raw) { setOutput('out-tbc', '⚠️ Vui lòng nhập các số cách nhau bằng dấu phẩy.', true); return; }
    const nums = raw.split(',').map(s => parseFloat(s.trim())).filter(v => !isNaN(v));
    if (nums.length === 0) { setOutput('out-tbc', '⚠️ Không tìm thấy số hợp lệ nào.', true); return; }
    const sum = nums.reduce((s,v) => s+v, 0);
    const avg = sum / nums.length;
    setOutput('out-tbc', `🧮 Dãy số: [${nums.join(', ')}]<br>&nbsp;&nbsp;Tổng = ${sum}<br>&nbsp;&nbsp;Trung bình cộng = ${sum} / ${nums.length} = <strong>${avg}</strong>`);
}

// --- ĐƯỜNG TRUNG BÌNH TAM GIÁC (CẤP 2) ---
function runDuongTrungBinh() {
    const a = parseFloat(document.getElementById('in-dtb-a').value);
    if (isNaN(a) || a <= 0) { setOutput('out-duongtrungbinh', '⚠️ Độ dài cạnh đáy phải lớn hơn 0.', true); return; }
    setOutput('out-duongtrungbinh', `📏 Với cạnh đáy a = ${a}:<br>&nbsp;&nbsp;Đường trung bình DE = a / 2 = ${a} / 2 = <strong>${a/2}</strong><br>&nbsp;&nbsp;(DE song song và bằng nửa cạnh đáy tương ứng)`);
}

// --- BẤT ĐẲNG THỨC TAM GIÁC (CẤP 2) ---
function runBDTTamGiac() {
    const a = parseFloat(document.getElementById('in-bdt-a').value);
    const b = parseFloat(document.getElementById('in-bdt-b').value);
    const c = parseFloat(document.getElementById('in-bdt-c').value);
    if ([a,b,c].some(v => isNaN(v) || v <= 0)) { setOutput('out-bdttamgiac', '⚠️ Ba cạnh phải là số lớn hơn 0.', true); return; }

    const valid = (a+b > c) && (b+c > a) && (a+c > b);
    if (valid) {
        setOutput('out-bdttamgiac', `✅ Với a=${a}, b=${b}, c=${c}:<br>&nbsp;&nbsp;${a}+${b} > ${c} ✓, ${b}+${c} > ${a} ✓, ${a}+${c} > ${b} ✓<br>&nbsp;&nbsp;<strong>Ba cạnh này LẬP ĐƯỢC một tam giác.</strong>`);
    } else {
        setOutput('out-bdttamgiac', `❌ Với a=${a}, b=${b}, c=${c}:<br>&nbsp;&nbsp;Không thỏa mãn bất đẳng thức tam giác.<br>&nbsp;&nbsp;<strong>Ba cạnh này KHÔNG lập được tam giác.</strong>`);
    }
}

// --- CĂN BẬC HAI & CĂN BẬC BA (CẤP 2) ---
function runCanBac() {
    const x = parseFloat(document.getElementById('in-can-x').value);
    if (isNaN(x)) { setOutput('out-canbachai', '⚠️ Vui lòng nhập giá trị x.', true); return; }

    const cbrtVal = Math.cbrt(x);
    let sqrtText;
    if (x < 0) {
        sqrtText = `Không xác định trên tập số thực (vì x = ${x} < 0)`;
    } else {
        sqrtText = `√${x} = <strong>${Math.sqrt(x).toFixed(4)}</strong>`;
    }
    setOutput('out-canbachai', `√ Với x = ${x}:<br>&nbsp;&nbsp;Căn bậc hai: ${sqrtText}<br>&nbsp;&nbsp;Căn bậc ba: ∛${x} = <strong>${cbrtVal.toFixed(4)}</strong>`);
}

// --- SỐ PHỨC CƠ BẢN (CẤP 3) ---
function runSoPhuc() {
    const a = parseFloat(document.getElementById('in-sp-a').value);
    const b = parseFloat(document.getElementById('in-sp-b').value);
    if (isNaN(a) || isNaN(b)) { setOutput('out-sophuc', '⚠️ Vui lòng nhập đủ phần thực a và phần ảo b.', true); return; }

    const modulus = Math.sqrt(a*a + b*b);
    const conjSign = b >= 0 ? '−' : '+';
    const zStr = `${a} ${b >= 0 ? '+' : '−'} ${Math.abs(b)}i`;
    setOutput('out-sophuc', `ℂ Số phức z = ${zStr}:<br>` +
        `&nbsp;&nbsp;Môđun: |z| = √(${a}² + ${b}²) = <strong>${modulus.toFixed(4)}</strong><br>` +
        `&nbsp;&nbsp;Số phức liên hợp: z̄ = ${a} ${conjSign} ${Math.abs(b)}i`);
}

// --- XÁC SUẤT CỔ ĐIỂN (CẤP 3) ---
function runXacSuat() {
    const nA = parseFloat(document.getElementById('in-xs-a').value);
    const nOmega = parseFloat(document.getElementById('in-xs-omega').value);
    if (isNaN(nA) || isNaN(nOmega) || nA < 0 || nOmega <= 0) { setOutput('out-xacsuat', '⚠️ n(A) ≥ 0 và n(Ω) > 0.', true); return; }
    if (nA > nOmega) { setOutput('out-xacsuat', '⚠️ n(A) không được lớn hơn n(Ω).', true); return; }

    const p = nA / nOmega;
    setOutput('out-xacsuat', `🎲 Với n(A) = ${nA}, n(Ω) = ${nOmega}:<br>&nbsp;&nbsp;P(A) = ${nA} / ${nOmega} = <strong>${p.toFixed(4)}</strong> (≈ ${(p*100).toFixed(2)}%)`);
}

// --- QUY TẮC ĐẾM (CẤP 3) ---
function runQuyTacDem() {
    const type = document.getElementById('in-qtd-type').value;
    const m = parseFloat(document.getElementById('in-qtd-m').value);
    const n = parseFloat(document.getElementById('in-qtd-n').value);
    if (isNaN(m) || isNaN(n) || m < 0 || n < 0) { setOutput('out-quytacdem', '⚠️ m và n phải là số không âm.', true); return; }

    if (type === 'add') {
        setOutput('out-quytacdem', `➕ Quy tắc cộng (2 phương án không thể xảy ra đồng thời):<br>&nbsp;&nbsp;Số cách = m + n = ${m} + ${n} = <strong>${m+n}</strong>`);
    } else {
        setOutput('out-quytacdem', `✖️ Quy tắc nhân (2 công đoạn liên tiếp):<br>&nbsp;&nbsp;Số cách = m × n = ${m} × ${n} = <strong>${m*n}</strong>`);
    }
}

// --- GIỚI HẠN DÃY SỐ CƠ BẢN (CẤP 3) ---
function runGioiHan() {
    const a = parseFloat(document.getElementById('in-gh-a').value);
    const b = parseFloat(document.getElementById('in-gh-b').value);
    const c = parseFloat(document.getElementById('in-gh-c').value);
    const d = parseFloat(document.getElementById('in-gh-d').value);
    if ([a,b,c,d].some(isNaN)) { setOutput('out-gioihan', '⚠️ Vui lòng nhập đủ 4 hệ số a, b, c, d.', true); return; }
    if (c === 0) { setOutput('out-gioihan', '⚠️ Hệ số c (mẫu) phải khác 0.', true); return; }

    const limit = a / c;
    setOutput('out-gioihan', `♾️ lim (${a}n + ${b}) / (${c}n + ${d}) khi n→∞:<br>` +
        `&nbsp;&nbsp;So sánh hệ số bậc cao nhất (bậc n) ở tử và mẫu:<br>` +
        `&nbsp;&nbsp;Giới hạn = a/c = ${a} / ${c} = <strong>${limit.toFixed(4)}</strong>`);
}

// --- NGUYÊN HÀM MỞ RỘNG (CẤP 3) ---
function runNguyenHamMoRong() {
    const type = document.getElementById('in-nhmr-type').value;
    const out = document.getElementById('out-nguyenhammorong');
    const table = {
        sin: '∫ sin(x) dx = −cos(x) + C',
        cos: '∫ cos(x) dx = sin(x) + C',
        exp: '∫ eˣ dx = eˣ + C',
        inv: '∫ (1/x) dx = ln|x| + C  (điều kiện x ≠ 0)'
    };
    setOutput('out-nguyenhammorong', `∫ Công thức nguyên hàm:<br>&nbsp;&nbsp;<strong>${table[type]}</strong>`);
}

// --- PHƯƠNG TRÌNH MŨ CƠ BẢN (CẤP 3) ---
function runPTMu() {
    const a = parseFloat(document.getElementById('in-ptmu-a').value);
    const b = parseFloat(document.getElementById('in-ptmu-b').value);
    if (isNaN(a) || isNaN(b)) { setOutput('out-ptmu', '⚠️ Vui lòng nhập đủ cơ số a và giá trị b.', true); return; }
    if (a <= 0 || a === 1) { setOutput('out-ptmu', '⚠️ Cơ số a phải > 0 và khác 1.', true); return; }
    if (b <= 0) { setOutput('out-ptmu', '⚠️ Phương trình vô nghiệm vì b phải > 0 (do aˣ luôn dương).', true); return; }

    const x = Math.log(b) / Math.log(a);
    setOutput('out-ptmu', `📈 Giải phương trình ${a}ˣ = ${b}:<br>&nbsp;&nbsp;x = log<sub>${a}</sub>(${b}) = <strong>${x.toFixed(4)}</strong>`);
}

// --- HÀM PHỤ TRỢ: ƯCLN / BCNN (dùng thuật toán Euclid) ---
function gcdCalc(a, b) { a = Math.abs(Math.round(a)); b = Math.abs(Math.round(b)); while (b) { [a, b] = [b, a % b]; } return a; }
function lcmCalc(a, b) { return Math.abs(a * b) / gcdCalc(a, b); }

// --- ƯCLN & BCNN (CẤP 1) ---
function runUCLN() {
    const a = parseInt(document.getElementById('in-ucln-a').value);
    const b = parseInt(document.getElementById('in-ucln-b').value);
    if (isNaN(a) || isNaN(b) || a <= 0 || b <= 0) { setOutput('out-ucln', '⚠️ Vui lòng nhập 2 số nguyên dương.', true); return; }

    const g = gcdCalc(a, b);
    const l = lcmCalc(a, b);
    setOutput('out-ucln', `🔢 Với a = ${a}, b = ${b}:<br>&nbsp;&nbsp;ƯCLN(${a}, ${b}) = <strong>${g}</strong><br>&nbsp;&nbsp;BCNN(${a}, ${b}) = <strong>${l}</strong><br>&nbsp;&nbsp;Kiểm tra: ${g} × ${l} = ${g*l} = ${a} × ${b} = ${a*b} ✓`);
}

// --- RÚT GỌN PHÂN SỐ (CẤP 1) ---
function runRutGonPS() {
    const tu = parseInt(document.getElementById('in-rgps-tu').value);
    const mau = parseInt(document.getElementById('in-rgps-mau').value);
    if (isNaN(tu) || isNaN(mau) || mau === 0) { setOutput('out-rutgonpx', '⚠️ Tử số hợp lệ, mẫu số khác 0.', true); return; }

    const g = gcdCalc(tu, mau) || 1;
    let newTu = tu / g, newMau = mau / g;
    if (newMau < 0) { newTu = -newTu; newMau = -newMau; }
    setOutput('out-rutgonpx', `➗ Phân số ${tu}/${mau}:<br>&nbsp;&nbsp;ƯCLN(${Math.abs(tu)}, ${Math.abs(mau)}) = ${g}<br>&nbsp;&nbsp;Rút gọn: ${tu}/${mau} = <strong>${newTu}/${newMau}</strong> (tối giản)`);
}

// --- DẤU HIỆU CHIA HẾT (CẤP 1) ---
function runDauHieuChiaHet() {
    const n = parseInt(document.getElementById('in-dhch-n').value);
    if (isNaN(n) || n <= 0) { setOutput('out-dauhieuchiahet', '⚠️ Vui lòng nhập số nguyên dương.', true); return; }

    const digitSum = String(n).split('').reduce((s,d) => s + parseInt(d), 0);
    const lastDigit = n % 10;
    const results = [];
    results.push(`Chia hết cho 2: ${lastDigit % 2 === 0 ? '✅ Có' : '❌ Không'} (chữ số tận cùng là ${lastDigit})`);
    results.push(`Chia hết cho 5: ${lastDigit === 0 || lastDigit === 5 ? '✅ Có' : '❌ Không'} (chữ số tận cùng là ${lastDigit})`);
    results.push(`Chia hết cho 3: ${digitSum % 3 === 0 ? '✅ Có' : '❌ Không'} (tổng chữ số = ${digitSum})`);
    results.push(`Chia hết cho 9: ${digitSum % 9 === 0 ? '✅ Có' : '❌ Không'} (tổng chữ số = ${digitSum})`);
    results.push(`Chia hết cho 10: ${lastDigit === 0 ? '✅ Có' : '❌ Không'} (chữ số tận cùng là ${lastDigit})`);

    setOutput('out-dauhieuchiahet', `✅ Kiểm tra số ${n}:<br>&nbsp;&nbsp;${results.join('<br>&nbsp;&nbsp;')}`);
}

// --- HÌNH BÌNH HÀNH (CẤP 2) ---
function runHinhBinhHanh() {
    const a = parseFloat(document.getElementById('in-bh-a').value);
    const b = parseFloat(document.getElementById('in-bh-b').value);
    const h = parseFloat(document.getElementById('in-bh-h').value);
    if ([a,b,h].some(v => isNaN(v) || v <= 0)) { setOutput('out-hinhbinhhanh', '⚠️ Ba giá trị phải là số lớn hơn 0.', true); return; }

    setOutput('out-hinhbinhhanh', `▰ Với cạnh đáy a=${a}, cạnh bên b=${b}, chiều cao h=${h}:<br>` +
        `&nbsp;&nbsp;Chu vi: P = 2(${a}+${b}) = <strong>${2*(a+b)}</strong><br>` +
        `&nbsp;&nbsp;Diện tích: S = ${a} × ${h} = <strong>${a*h}</strong>`);
}

// --- HÌNH THOI (CẤP 2) ---
function runHinhThoi() {
    const d1 = parseFloat(document.getElementById('in-thoi-d1').value);
    const d2 = parseFloat(document.getElementById('in-thoi-d2').value);
    if (isNaN(d1) || isNaN(d2) || d1 <= 0 || d2 <= 0) { setOutput('out-hinhthoi', '⚠️ Hai đường chéo phải lớn hơn 0.', true); return; }

    setOutput('out-hinhthoi', `◆ Với hai đường chéo d₁=${d1}, d₂=${d2}:<br>&nbsp;&nbsp;Diện tích: S = (${d1} × ${d2}) / 2 = <strong>${(d1*d2)/2}</strong>`);
}

// --- ĐỊNH LÝ TALET (CẤP 2) ---
function runTalet() {
    const am = parseFloat(document.getElementById('in-talet-am').value);
    const ab = parseFloat(document.getElementById('in-talet-ab').value);
    const an = parseFloat(document.getElementById('in-talet-an').value);
    const acRaw = document.getElementById('in-talet-ac').value;
    const out = document.getElementById('out-talet');

    if (isNaN(am) || isNaN(ab) || isNaN(an) || ab === 0) { setOutput('out-talet', '⚠️ Cần nhập AM, AB, AN hợp lệ (AB ≠ 0).', true); return; }

    if (acRaw.trim() === '') {
        const ac = (an * ab) / am;
        if (am === 0) { setOutput('out-talet', '⚠️ AM phải khác 0 để tính AC.', true); return; }
        setOutput('out-talet', `📏 Áp dụng Talet: AM/AB = AN/AC<br>&nbsp;&nbsp;AC = AN × AB / AM = ${an} × ${ab} / ${am} = <strong>${ac.toFixed(4)}</strong>`);
    } else {
        const ac = parseFloat(acRaw);
        if (isNaN(ac) || ac === 0) { setOutput('out-talet', '⚠️ AC phải là số khác 0.', true); return; }
        const ratio1 = am / ab, ratio2 = an / ac;
        const isEqual = Math.abs(ratio1 - ratio2) < 0.0001;
        setOutput('out-talet', `📏 So sánh tỉ lệ: AM/AB = ${ratio1.toFixed(4)}, AN/AC = ${ratio2.toFixed(4)}<br>&nbsp;&nbsp;${isEqual ? '✅ Bằng nhau ⟹ MN // BC (đúng định lý Talet)' : '❌ Không bằng nhau ⟹ MN không song song BC'}`);
    }
}

// --- KIỂM TRA SỐ NGUYÊN TỐ (CẤP 2) ---
function runSoNguyenTo() {
    const n = parseInt(document.getElementById('in-snt-n').value);
    if (isNaN(n) || n <= 0) { setOutput('out-songuyeto', '⚠️ Vui lòng nhập số nguyên dương.', true); return; }
    if (n > 1e12) { setOutput('out-songuyeto', '⚠️ Vui lòng nhập số nhỏ hơn để tránh treo trình duyệt.', true); return; }

    if (n === 1) { setOutput('out-songuyeto', `🔍 Số 1 <strong>KHÔNG</strong> là số nguyên tố (theo quy ước toán học).`); return; }
    if (n === 2) { setOutput('out-songuyeto', `🔍 Số 2 <strong>LÀ</strong> số nguyên tố (số nguyên tố chẵn duy nhất).`); return; }

    let isPrime = true, divisor = null;
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) { isPrime = false; divisor = i; break; }
    }

    if (isPrime) {
        setOutput('out-songuyeto', `🔍 Số ${n} <strong>LÀ</strong> số nguyên tố (không có ước nào từ 2 đến √${n} ≈ ${Math.sqrt(n).toFixed(2)}).`);
    } else {
        setOutput('out-songuyeto', `🔍 Số ${n} <strong>KHÔNG</strong> là số nguyên tố (chia hết cho ${divisor}, vì ${n} = ${divisor} × ${n/divisor}).`);
    }
}

// --- HÌNH NÓN (CẤP 3) ---
function runHinhNon() {
    const r = parseFloat(document.getElementById('in-non-r').value);
    const h = parseFloat(document.getElementById('in-non-h').value);
    if (isNaN(r) || isNaN(h) || r <= 0 || h <= 0) { setOutput('out-hinhnon', '⚠️ Bán kính và chiều cao phải lớn hơn 0.', true); return; }

    const l = Math.sqrt(r*r + h*h);
    const v = (1/3) * Math.PI * r * r * h;
    const sxq = Math.PI * r * l;
    const stp = sxq + Math.PI * r * r;
    setOutput('out-hinhnon', `🍦 Với r=${r}, h=${h} (π≈3.14159):<br>` +
        `&nbsp;&nbsp;Đường sinh: l = √(${r}²+${h}²) = <strong>${l.toFixed(4)}</strong><br>` +
        `&nbsp;&nbsp;Thể tích: V = (1/3)πr²h = <strong>${v.toFixed(4)}</strong><br>` +
        `&nbsp;&nbsp;Diện tích xung quanh: S<sub>xq</sub> = πrl = <strong>${sxq.toFixed(4)}</strong><br>` +
        `&nbsp;&nbsp;Diện tích toàn phần: S<sub>tp</sub> = <strong>${stp.toFixed(4)}</strong>`);
}

// --- TỌA ĐỘ OXY: KHOẢNG CÁCH & TRUNG ĐIỂM (CẤP 3) ---
function runToaDoOxy() {
    const x1 = parseFloat(document.getElementById('in-oxy-x1').value);
    const y1 = parseFloat(document.getElementById('in-oxy-y1').value);
    const x2 = parseFloat(document.getElementById('in-oxy-x2').value);
    const y2 = parseFloat(document.getElementById('in-oxy-y2').value);
    if ([x1,y1,x2,y2].some(isNaN)) { setOutput('out-toadooxy', '⚠️ Vui lòng nhập đủ tọa độ 2 điểm A(x₁,y₁) và B(x₂,y₂).', true); return; }

    const dist = Math.sqrt((x2-x1)**2 + (y2-y1)**2);
    const mx = (x1+x2)/2, my = (y1+y2)/2;
    setOutput('out-toadooxy', `📍 Với A(${x1}, ${y1}), B(${x2}, ${y2}):<br>` +
        `&nbsp;&nbsp;Khoảng cách AB = √[(${x2}−${x1})² + (${y2}−${y1})²] = <strong>${dist.toFixed(4)}</strong><br>` +
        `&nbsp;&nbsp;Trung điểm M = (<strong>${mx}</strong>, <strong>${my}</strong>)`);
}

// --- ĐA GIÁC ĐỀU (CẤP 3) ---
function runDaGiacDeu() {
    const n = parseInt(document.getElementById('in-dgd-n').value);
    if (isNaN(n) || n < 3) { setOutput('out-dagiacdeu', '⚠️ Số cạnh n phải là số nguyên ≥ 3.', true); return; }

    const tongGoc = (n - 2) * 180;
    const mottGoc = tongGoc / n;
    const soDuongCheo = (n * (n - 3)) / 2;
    setOutput('out-dagiacdeu', `⬡ Đa giác đều ${n} cạnh:<br>` +
        `&nbsp;&nbsp;Tổng số đo góc trong = (${n}−2)×180° = <strong>${tongGoc}°</strong><br>` +
        `&nbsp;&nbsp;Mỗi góc trong = ${tongGoc}° / ${n} = <strong>${mottGoc.toFixed(2)}°</strong><br>` +
        `&nbsp;&nbsp;Số đường chéo = ${n}(${n}−3)/2 = <strong>${soDuongCheo}</strong>`);
}

function svgWrap(id, innerSvg, viewW, viewH) {
    const el = document.getElementById(id);
    if (!el) return;
    el.innerHTML = `<svg viewBox="0 0 ${viewW} ${viewH}" class="geo-svg">${innerSvg}</svg>`;
}

// Hình chữ nhật / hình vuông: a = chiều dài, b = chiều rộng
function drawRectangleSVG(id, a, b) {
    const maxDim = 220, pad = 30;
    const ratio = a / b;
    let w, h;
    if (ratio >= 1) { w = maxDim; h = maxDim / ratio; } else { h = maxDim; w = maxDim * ratio; }
    const viewW = w + pad * 2, viewH = h + pad * 2 + 20;
    const x = pad, y = pad;
    const svg = `
        <rect x="${x}" y="${y}" width="${w}" height="${h}" class="geo-shape" />
        <text x="${x + w/2}" y="${y - 10}" class="geo-label" text-anchor="middle">a = ${a}</text>
        <text x="${x - 12}" y="${y + h/2}" class="geo-label" text-anchor="middle" transform="rotate(-90 ${x-12} ${y+h/2})">b = ${b}</text>
    `;
    svgWrap(id, svg, viewW, viewH);
}

// Tam giác: a = đáy, h = chiều cao
function drawTriangleSVG(id, a, h) {
    const maxDim = 220, pad = 30;
    const ratio = a / h;
    let w, hh;
    if (ratio >= 1) { w = maxDim; hh = maxDim / ratio; } else { hh = maxDim; w = maxDim * ratio; }
    const viewW = w + pad * 2, viewH = hh + pad * 2 + 20;
    const x0 = pad, y0 = pad + hh;
    const apexX = x0 + w * 0.35;
    const svg = `
        <polygon points="${x0},${y0} ${x0+w},${y0} ${apexX},${pad}" class="geo-shape" />
        <line x1="${apexX}" y1="${pad}" x2="${apexX}" y2="${y0}" class="geo-dashed" />
        <text x="${x0 + w/2}" y="${y0 + 22}" class="geo-label" text-anchor="middle">a = ${a}</text>
        <text x="${apexX + 10}" y="${pad + hh/2}" class="geo-label" text-anchor="start">h = ${h}</text>
    `;
    svgWrap(id, svg, viewW, viewH);
}

// Tam giác vuông (Pytago): a, b = 2 cạnh góc vuông, c = cạnh huyền
function drawRightTriangleSVG(id, a, b, c) {
    const maxDim = 200, pad = 30;
    const ratio = a / b;
    let w, h;
    if (ratio >= 1) { w = maxDim; h = maxDim / ratio; } else { h = maxDim; w = maxDim * ratio; }
    const viewW = w + pad * 2, viewH = h + pad * 2 + 20;
    const x0 = pad, y0 = pad + h;
    const svg = `
        <polygon points="${x0},${y0} ${x0+w},${y0} ${x0},${pad}" class="geo-shape" />
        <rect x="${x0}" y="${y0-14}" width="14" height="14" fill="none" stroke="var(--pink,#db2777)" stroke-width="2" />
        <text x="${x0 + w/2}" y="${y0 + 22}" class="geo-label" text-anchor="middle">a = ${a}</text>
        <text x="${x0 - 10}" y="${pad + h/2}" class="geo-label" text-anchor="end">b = ${b}</text>
        <text x="${x0 + w*0.42}" y="${pad + h*0.42}" class="geo-label" text-anchor="middle">c = ${c.toFixed(2)}</text>
    `;
    svgWrap(id, svg, viewW, viewH);
}

// Hình thang: a = đáy lớn, b = đáy nhỏ, h = chiều cao
function drawTrapezoidSVG(id, a, b, h) {
    const maxDim = 220, pad = 30;
    const scale = maxDim / Math.max(a, h * 1.2);
    const w1 = a * scale, w2 = b * scale, hh = h * scale;
    const viewW = w1 + pad * 2, viewH = hh + pad * 2 + 20;
    const x0 = pad, y0 = pad + hh;
    const offset = (w1 - w2) / 2;
    const svg = `
        <polygon points="${x0},${y0} ${x0+w1},${y0} ${x0+w1-offset},${pad} ${x0+offset},${pad}" class="geo-shape" />
        <text x="${x0 + w1/2}" y="${y0 + 22}" class="geo-label" text-anchor="middle">a = ${a}</text>
        <text x="${x0 + w1/2}" y="${pad - 10}" class="geo-label" text-anchor="middle">b = ${b}</text>
        <line x1="${x0+offset}" y1="${pad}" x2="${x0+offset}" y2="${y0}" class="geo-dashed" />
        <text x="${x0 + offset - 10}" y="${pad + hh/2}" class="geo-label" text-anchor="end">h = ${h}</text>
    `;
    svgWrap(id, svg, viewW, viewH);
}

// Hình tròn: r = bán kính
function drawCircleSVG(id, r) {
    const maxR = 90, pad = 30;
    const viewW = maxR * 2 + pad * 2, viewH = maxR * 2 + pad * 2;
    const cx = viewW / 2, cy = viewH / 2;
    const svg = `
        <circle cx="${cx}" cy="${cy}" r="${maxR}" class="geo-shape" />
        <line x1="${cx}" y1="${cy}" x2="${cx + maxR}" y2="${cy}" class="geo-dashed" />
        <circle cx="${cx}" cy="${cy}" r="2.5" fill="var(--pink,#db2777)" />
        <text x="${cx + maxR/2}" y="${cy - 8}" class="geo-label" text-anchor="middle">r = ${r}</text>
    `;
    svgWrap(id, svg, viewW, viewH);
}

// Đồ thị parabol y = ax² + bx + c, tự động chọn khoảng x quanh đỉnh để hiển thị đẹp
function drawParabolaSVG(id, a, b, c, xDinh, yDinh) {
    const viewW = 320, viewH = 260, pad = 36;
    const plotW = viewW - pad * 2, plotH = viewH - pad * 2;

    // Chọn khoảng x hiển thị: quanh đỉnh, đủ rộng để thấy hình dạng parabol
    const span = Math.max(6, Math.abs(xDinh) * 0.6 + 4);
    const xMin = xDinh - span, xMax = xDinh + span;

    // Tính y tại các điểm mẫu để xác định khoảng y hiển thị
    const samples = 60;
    let yMin = Infinity, yMax = -Infinity;
    const pts = [];
    for (let i = 0; i <= samples; i++) {
        const x = xMin + (xMax - xMin) * i / samples;
        const y = a*x*x + b*x + c;
        pts.push([x, y]);
        if (y < yMin) yMin = y;
        if (y > yMax) yMax = y;
    }
    // Đảm bảo trục y=0 luôn nằm trong khung nhìn
    yMin = Math.min(yMin, 0); yMax = Math.max(yMax, 0);
    if (yMax === yMin) { yMax += 1; yMin -= 1; }
    const yPad = (yMax - yMin) * 0.1;
    yMin -= yPad; yMax += yPad;

    const toSvgX = x => pad + (x - xMin) / (xMax - xMin) * plotW;
    const toSvgY = y => pad + plotH - (y - yMin) / (yMax - yMin) * plotH;

    const pathD = pts.map((p,i) => `${i===0?'M':'L'} ${toSvgX(p[0]).toFixed(1)} ${toSvgY(p[1]).toFixed(1)}`).join(' ');

    // Trục tọa độ (nếu 0 nằm trong khoảng hiển thị)
    const axisX = (xMin <= 0 && 0 <= xMax) ? `<line x1="${toSvgX(0)}" y1="${pad}" x2="${toSvgX(0)}" y2="${pad+plotH}" class="geo-axis" />` : '';
    const axisY = `<line x1="${pad}" y1="${toSvgY(0)}" x2="${pad+plotW}" y2="${toSvgY(0)}" class="geo-axis" />`;

    const vx = toSvgX(xDinh), vy = toSvgY(yDinh);

    const svg = `
        ${axisY}${axisX}
        <path d="${pathD}" class="geo-curve" />
        <circle cx="${vx}" cy="${vy}" r="4" fill="var(--pink,#db2777)" />
        <text x="${vx + 8}" y="${vy - 8}" class="geo-label" text-anchor="start">I(${xDinh.toFixed(1)}, ${yDinh.toFixed(1)})</text>
    `;
    svgWrap(id, svg, viewW, viewH);
}

// ================================================================
// ================= CHẾ ĐỘ TRÌNH CHIẾU (PRESENTATION) ============
// ================================================================
// Dùng để giảng bài trên máy chiếu: phóng to nội dung, ẩn sidebar,
// điều hướng bằng nút Trước/Tiếp hoặc phím mũi tên trái/phải.