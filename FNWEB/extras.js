let presentList = [];
let presentIndex = 0;

function togglePresentMode() {
    const isOn = document.body.classList.toggle('presentation-mode');
    const nav = document.getElementById('presentNav');
    const presentBtn = document.getElementById('presentBtn');
    if (presentBtn) presentBtn.setAttribute('aria-pressed', String(isOn));
    if (isOn) {
        // Xây danh sách công thức đang hiển thị (theo chế độ hiện tại: học hoặc quiz)
        const isLearnMode = document.getElementById('learn-panels').style.display !== 'none';
        if (isLearnMode) {
            presentList = Array.from(document.querySelectorAll('#menu-learn .menu-item')).map(btn => {
                const onclickAttr = btn.getAttribute('onclick') || '';
                const match = onclickAttr.match(/viewFormula\('([^']+)'/);
                return match ? match[1] : null;
            }).filter(Boolean);
        } else {
            presentList = ['welcome-screen'];
        }
        presentIndex = 0;
        if (presentList.length > 0) {
            viewFormula(presentList[0], null);
        }
        nav.style.display = 'flex';
        updatePresentIndicator();
    } else {
        nav.style.display = 'none';
    }
}

function presentNext() {
    if (presentList.length === 0) return;
    presentIndex = (presentIndex + 1) % presentList.length;
    viewFormula(presentList[presentIndex], null);
    updatePresentIndicator();
}

function presentPrev() {
    if (presentList.length === 0) return;
    presentIndex = (presentIndex - 1 + presentList.length) % presentList.length;
    viewFormula(presentList[presentIndex], null);
    updatePresentIndicator();
}

function updatePresentIndicator() {
    const el = document.getElementById('presentIndicator');
    if (el) el.textContent = `${presentIndex + 1} / ${presentList.length}`;
}

document.addEventListener('keydown', (e) => {
    if (!document.body.classList.contains('presentation-mode')) return;
    const active = document.activeElement;
    if (active && /^(INPUT|TEXTAREA|SELECT)$/.test(active.tagName)) return; // đang gõ số liệu, nhường phím
    if (e.key === 'ArrowRight') presentNext();
    if (e.key === 'ArrowLeft') presentPrev();
    if (e.key === 'Escape') togglePresentMode();
});

// ================================================================
// ============== TẠO ĐỀ THI PDF CHO GIÁO VIÊN ===================
// ================================================================
// Sinh đề thi ngẫu nhiên từ ngân hàng câu hỏi quiz sẵn có, kèm đáp án,
// rồi dùng chức năng in của trình duyệt (Save as PDF) để xuất file.

let pendingExamLevel = null;

function chooseExamLevel(level, element) {
    pendingExamLevel = level;
    document.querySelectorAll('#menu-quiz .menu-item').forEach(i => i.classList.remove('active'));
    if (element) element.classList.add('active');
    document.querySelectorAll('#quiz-panels .formula-panel').forEach(p => p.classList.remove('active'));
    document.getElementById('exam-config').classList.add('active');
    document.getElementById('exam-level-label').textContent = levelLabels[level];
    closeSidebarOnMobile();
}

let examGenerationLocked = false;
function generateExam() {
    if (examGenerationLocked) return; // chặn bấm liên tục gây mở nhiều hộp thoại in
    examGenerationLocked = true;
    setTimeout(() => { examGenerationLocked = false; }, 1500);

    const level = pendingExamLevel;
    const count = parseInt(document.getElementById('exam-question-count').value);
    const difficulty = document.getElementById('exam-difficulty').value;

    const questions = [];
    if (difficulty === 'hsg') {
        const hsgGenerators = quizGeneratorsHSG[level];
        for (let i = 0; i < count; i++) {
            questions.push(hsgGenerators[randInt(0, hsgGenerators.length - 1)]());
        }
    } else {
        const scale = difficultyScale[difficulty] || 1;
        const generators = quizGenerators[level];
        for (let i = 0; i < count; i++) {
            questions.push(generators[randInt(0, generators.length - 1)](scale));
        }
    }

    const today = new Date();
    const dateStr = `${today.getDate()}/${today.getMonth()+1}/${today.getFullYear()}`;

    let questionsHtml = questions.map((q, i) =>
        `<div class="exam-question"><span class="exam-q-num">Câu ${i+1}:</span> ${q.text} <span class="exam-answer-blank">Đáp số: .....................</span></div>`
    ).join('');

    let answerHtml = questions.map((q, i) => `<span class="exam-answer-item"><strong>${i+1}.</strong> ${q.answer}</span>`).join('');

    const examHtml = `
        <div class="exam-page">
            <div class="exam-header">
                <h1>ĐỀ KIỂM TRA — ${levelLabels[level].toUpperCase()}</h1>
                <div class="exam-meta">
                    <span>Họ tên: .......................................................</span>
                    <span>Lớp: ...............</span>
                    <span>Ngày: ${dateStr}</span>
                </div>
                <div class="exam-meta"><span>Độ khó: ${difficultyLabels[difficulty]}</span><span>Số câu: ${count}</span><span>Điểm: ........./10</span></div>
            </div>
            <div class="exam-body">${questionsHtml}</div>
        </div>
        <div class="exam-page">
            <div class="exam-header"><h1>ĐÁP ÁN — ${levelLabels[level].toUpperCase()}</h1></div>
            <div class="exam-answer-grid">${answerHtml}</div>
        </div>
    `;

    document.getElementById('exam-print-area').innerHTML = examHtml;

    // Đợi 1 nhịp để trình duyệt render xong DOM trước khi mở hộp thoại in
    setTimeout(() => { window.print(); }, 150);
}

// ================================================================
// ================= ĐĂNG KÝ SERVICE WORKER (PWA) =================
// ================================================================
// Cho phép cài đặt web như ứng dụng và chạy được khi mất mạng.
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./service-worker.js')
            .catch((err) => console.warn('Không thể đăng ký Service Worker:', err));
    });
}

// ================================================================
// ================= ÔN THI NHANH (FLASHCARD) =====================
// ================================================================
// Tự động lấy toàn bộ công thức từ DOM (title + formula-expr) để tạo thẻ,
// không cần định nghĩa dữ liệu trùng lặp ở nơi khác.

let flashcardList = [];
let flashcardFiltered = [];
let flashcardIndex = 0;

function buildFlashcardData() {
    const panels = document.querySelectorAll('#learn-panels .formula-panel[data-title]');
    flashcardList = Array.from(panels).map(panel => ({
        title: panel.getAttribute('data-title'),
        level: panel.getAttribute('data-level') || '1',
        expr: (panel.querySelector('.formula-expr') || {}).innerHTML || '(Chưa có công thức tóm tắt)'
    }));
}

function openFlashcardMode() {
    if (flashcardList.length === 0) buildFlashcardData();
    flashcardFiltered = flashcardList;
    flashcardIndex = 0;
    document.getElementById('flashcard-modal').classList.add('open');
    document.querySelectorAll('.fc-filter-btn').forEach(b => b.classList.remove('active'));
    document.querySelector('.fc-filter-btn[data-level="all"]').classList.add('active');
    renderFlashcard();
}

function closeFlashcardMode(event) {
    if (event && event.target !== event.currentTarget) return;
    document.getElementById('flashcard-modal').classList.remove('open');
}

function filterFlashcards(level, btn) {
    document.querySelectorAll('.fc-filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    flashcardFiltered = level === 'all' ? flashcardList : flashcardList.filter(c => c.level === level);
    flashcardIndex = 0;
    renderFlashcard();
}

function renderFlashcard() {
    const inner = document.getElementById('flashcard-inner');
    inner.classList.remove('flipped');
    if (flashcardFiltered.length === 0) {
        document.getElementById('fc-front').innerHTML = 'Không có thẻ nào ở mục này';
        document.getElementById('fc-back').innerHTML = '';
        document.getElementById('fc-counter').textContent = '0 / 0';
        return;
    }
    const card = flashcardFiltered[flashcardIndex];
    document.getElementById('fc-front').innerHTML = card.title;
    document.getElementById('fc-back').innerHTML = card.expr;
    document.getElementById('fc-counter').textContent = `${flashcardIndex + 1} / ${flashcardFiltered.length}`;
}

function flipFlashcard() {
    document.getElementById('flashcard-inner').classList.toggle('flipped');
}

function nextFlashcard() {
    if (flashcardFiltered.length === 0) return;
    flashcardIndex = (flashcardIndex + 1) % flashcardFiltered.length;
    renderFlashcard();
}

function prevFlashcard() {
    if (flashcardFiltered.length === 0) return;
    flashcardIndex = (flashcardIndex - 1 + flashcardFiltered.length) % flashcardFiltered.length;
    renderFlashcard();
}

document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('flashcard-modal');
    if (!modal || !modal.classList.contains('open')) return;
    if (e.key === 'ArrowRight') nextFlashcard();
    if (e.key === 'ArrowLeft') prevFlashcard();
    if (e.key === ' ') { e.preventDefault(); flipFlashcard(); }
    if (e.key === 'Escape') closeFlashcardMode();
});


// ================================================================
// ============ MÁY TÍNH KHOA HỌC (KIỂU CASIO FX-580VN X) =========
// ================================================================
// Bộ đánh giá biểu thức viết riêng, KHÔNG dùng eval() trực tiếp trên
// input người dùng — chỉ cho phép ký tự thuộc whitelist toán học,
// tránh rủi ro thực thi mã tùy ý.
//
// Tính năng đầy đủ: SHIFT (2 chức năng/phím như máy thật), bộ nhớ
// M+/M-/MR/MC, tổ hợp/chỉnh hợp (nCr/nPr), lịch sử phép tính, DEG/RAD.

let calcExpr = '';
let calcAngleMode = 'DEG'; // 'DEG' hoặc 'RAD'
let calcShiftOn = false;
let calcLastAns = 0;
let calcMemory = 0;
let calcHistory = [];       // { expr, result }
let calcHistoryIndex = -1;  // vị trí đang duyệt bằng phím ▲▼

function toggleCalculator() {
    document.getElementById('calc-window').classList.toggle('open');
}

// Máy tính là cửa sổ nổi, không có lớp nền chặn thao tác với trang —
// closeCalculator() chỉ được gọi từ nút ✕, KHÔNG tự đóng khi bấm ra ngoài.
function closeCalculator() {
    document.getElementById('calc-window').classList.remove('open');
}

// ---- KÉO-THẢ MÁY TÍNH (chỉ kéo được từ thanh tiêu đề casio-topbar) ----
function initCalcDrag() {
    const win = document.getElementById('calc-window');
    const handle = document.getElementById('calc-drag-handle');
    if (!win || !handle) return;

    let dragging = false, offsetX = 0, offsetY = 0;

    function startDrag(clientX, clientY) {
        dragging = true;
        const rect = win.getBoundingClientRect();
        offsetX = clientX - rect.left;
        offsetY = clientY - rect.top;
        win.style.left = rect.left + 'px';
        win.style.top = rect.top + 'px';
        win.style.right = 'auto';
    }
    function moveDrag(clientX, clientY) {
        if (!dragging) return;
        const maxX = window.innerWidth - win.offsetWidth;
        const maxY = window.innerHeight - win.offsetHeight;
        const x = Math.min(Math.max(0, clientX - offsetX), Math.max(0, maxX));
        const y = Math.min(Math.max(0, clientY - offsetY), Math.max(0, maxY));
        win.style.left = x + 'px';
        win.style.top = y + 'px';
    }
    function endDrag() { dragging = false; }

    handle.addEventListener('mousedown', (e) => { startDrag(e.clientX, e.clientY); e.preventDefault(); });
    document.addEventListener('mousemove', (e) => moveDrag(e.clientX, e.clientY));
    document.addEventListener('mouseup', endDrag);

    handle.addEventListener('touchstart', (e) => {
        const t = e.touches[0];
        startDrag(t.clientX, t.clientY);
    }, { passive: true });
    document.addEventListener('touchmove', (e) => {
        if (!dragging) return;
        const t = e.touches[0];
        moveDrag(t.clientX, t.clientY);
    }, { passive: true });
    document.addEventListener('touchend', endDrag);
}
document.addEventListener('DOMContentLoaded', initCalcDrag);

function calcRender() {
    document.getElementById('calc-expression').textContent = calcExpr.replace(/\*/g,'×').replace(/\//g,'÷');
}

// Chèn 1 token vào biểu thức. Nếu SHIFT đang bật, tự động tắt lại sau khi dùng
// (đúng hành vi máy thật: SHIFT chỉ áp dụng cho phím tiếp theo).
function calcInput(token) {
    calcExpr += token;
    calcRender();
    if (calcShiftOn) calcSetShift(false);
}

// Dùng cho các phím có 2 chức năng (thường / SHIFT), VD: sin <-> sin⁻¹
function calcFn(normalToken, shiftToken) {
    calcInput(calcShiftOn ? shiftToken : normalToken);
}

function calcBackspace() {
    calcExpr = calcExpr.slice(0, -1);
    calcRender();
}

function calcClearAll() {
    calcExpr = '';
    document.getElementById('calc-display').textContent = '0';
    calcRender();
    if (calcShiftOn) calcSetShift(false);
}

function calcCursorEnd() { /* Bàn phím ảo không có con trỏ giữa chuỗi, giữ nút cho giống máy thật */ }
function calcHistoryNav(direction) {
    if (calcHistory.length === 0) return;
    calcHistoryIndex = Math.min(Math.max(0, calcHistoryIndex + direction), calcHistory.length - 1);
    const entry = calcHistory[calcHistory.length - 1 - calcHistoryIndex];
    if (entry) { calcExpr = entry.expr; calcRender(); }
}

function calcToggleSign() {
    if (calcExpr) calcExpr = `-(${calcExpr})`;
    calcRender();
}

function calcToggleDegRad() {
    calcAngleMode = calcAngleMode === 'DEG' ? 'RAD' : 'DEG';
    document.getElementById('calc-mode-label').textContent = calcAngleMode;
}

function calcSetShift(on) {
    calcShiftOn = on;
    document.getElementById('calc-shift-btn').classList.toggle('ck-active', on);
    document.getElementById('calc-shift-indicator').style.display = on ? 'inline' : 'none';
}
function calcShiftToggle() { calcSetShift(!calcShiftOn); }

function calcInsertAns() {
    calcExpr += `(${calcLastAns})`;
    calcRender();
}

// ---- BỘ NHỚ (M+ / M- / MR / MC) ----
function calcUpdateMemIndicator() {
    document.getElementById('calc-mem-indicator').style.display = calcMemory !== 0 ? 'inline' : 'none';
}
function calcMemoryAdd() {
    const val = calcEvaluateSilently(calcExpr || String(calcLastAns));
    if (val !== null) { calcMemory += val; calcUpdateMemIndicator(); showCalcToast('Đã cộng vào bộ nhớ (M+)'); }
}
function calcMemorySub() {
    const val = calcEvaluateSilently(calcExpr || String(calcLastAns));
    if (val !== null) { calcMemory -= val; calcUpdateMemIndicator(); showCalcToast('Đã trừ khỏi bộ nhớ (M−)'); }
}
function calcRecallMemory() {
    calcExpr += `(${calcMemory})`;
    calcRender();
}
function calcMemoryClear() {
    calcMemory = 0;
    calcUpdateMemIndicator();
    showCalcToast('Đã xóa bộ nhớ (MC)');
}
function showCalcToast(msg) {
    // Dùng lại hệ thống toast có sẵn của app nếu tồn tại, nếu không thì bỏ qua lặng lẽ
    if (typeof showToast === 'function') showToast(msg, 'success');
}

// ---- LỊCH SỬ PHÉP TÍNH ----
function toggleCalcHistory() {
    document.getElementById('calc-history-panel').classList.toggle('open');
}
function renderCalcHistory() {
    const list = document.getElementById('calc-history-list');
    if (calcHistory.length === 0) {
        list.innerHTML = '<p class="calc-history-empty">Chưa có phép tính nào.</p>';
        return;
    }
    list.innerHTML = calcHistory.slice().reverse().map((h, i) => `
        <div class="calc-history-item" onclick="calcRecallHistory(${calcHistory.length - 1 - i})">
            <div class="chi-expr">${h.expr.replace(/\*/g,'×').replace(/\//g,'÷')}</div>
            <div class="chi-result">= ${h.result}</div>
        </div>
    `).join('');
}
function calcRecallHistory(index) {
    const entry = calcHistory[index];
    if (!entry) return;
    calcExpr = String(entry.result);
    calcRender();
    document.getElementById('calc-history-panel').classList.remove('open');
}
function clearCalcHistory() {
    calcHistory = [];
    calcHistoryIndex = -1;
    renderCalcHistory();
}

// Danh sách hàm/hằng số được whitelist khi biên dịch biểu thức
function calcCompile(expr) {
    const allowed = /^[0-9+\-*/^%().,a-zA-Z\s!]*$/;
    if (!allowed.test(expr)) throw new Error('Ký tự không hợp lệ');

    const js = expr
        .replace(/\bpi\b/g, 'Math.PI')
        .replace(/\be\b/g, 'Math.E')
        .replace(/\^/g, '**')
        .replace(/(\d+(?:\.\d+)?)!/g, 'FACT($1)')
        .replace(/\bnCr\(/g, 'COMB(')
        .replace(/\bnPr\(/g, 'PERM(')
        .replace(/\bcbrt\(/g, 'Math.cbrt(')
        .replace(/\basin\(/g, 'ASIN(')
        .replace(/\bacos\(/g, 'ACOS(')
        .replace(/\batan\(/g, 'ATAN(')
        .replace(/\bsin\(/g, 'SIN(')
        .replace(/\bcos\(/g, 'COS(')
        .replace(/\btan\(/g, 'TAN(')
        .replace(/\blog\(/g, 'LOG10(')
        .replace(/\bln\(/g, 'Math.log(')
        .replace(/\bsqrt\(/g, 'Math.sqrt(');

    return js;
}

function calcBuildRuntime() {
    const SIN = (x) => Math.sin(calcAngleMode === 'DEG' ? x * Math.PI / 180 : x);
    const COS = (x) => Math.cos(calcAngleMode === 'DEG' ? x * Math.PI / 180 : x);
    const TAN = (x) => Math.tan(calcAngleMode === 'DEG' ? x * Math.PI / 180 : x);
    const ASIN = (x) => { const r = Math.asin(x); return calcAngleMode === 'DEG' ? r * 180 / Math.PI : r; };
    const ACOS = (x) => { const r = Math.acos(x); return calcAngleMode === 'DEG' ? r * 180 / Math.PI : r; };
    const ATAN = (x) => { const r = Math.atan(x); return calcAngleMode === 'DEG' ? r * 180 / Math.PI : r; };
    const LOG10 = (x) => Math.log(x) / Math.LN10;
    const FACT = (n) => {
        n = Math.round(n);
        if (n < 0) return NaN;
        if (n > 170) return Infinity;
        let r = 1;
        for (let i = 2; i <= n; i++) r *= i;
        return r;
    };
    const COMB = (n, k) => { n = Math.round(n); k = Math.round(k); if (k > n || k < 0) return NaN; return FACT(n) / (FACT(k) * FACT(n - k)); };
    const PERM = (n, k) => { n = Math.round(n); k = Math.round(k); if (k > n || k < 0) return NaN; return FACT(n) / FACT(n - k); };
    return { SIN, COS, TAN, ASIN, ACOS, ATAN, LOG10, FACT, COMB, PERM };
}

// Tính lặng lẽ (không cập nhật màn hình/lịch sử) — dùng cho M+ / M-
function calcEvaluateSilently(expr) {
    try {
        const compiled = calcCompile(expr);
        const rt = calcBuildRuntime();
        const fn = new Function(...Object.keys(rt), `return (${compiled});`);
        const result = fn(...Object.values(rt));
        return (typeof result === 'number' && isFinite(result)) ? result : null;
    } catch (e) {
        return null;
    }
}

function calcEquals() {
    if (!calcExpr) return;
    try {
        const openCount = (calcExpr.match(/\(/g) || []).length;
        const closeCount = (calcExpr.match(/\)/g) || []).length;
        const exprToEval = calcExpr + ')'.repeat(Math.max(0, openCount - closeCount));

        const compiled = calcCompile(exprToEval);
        const rt = calcBuildRuntime();
        const fn = new Function(...Object.keys(rt), `return (${compiled});`);
        const result = fn(...Object.values(rt));

        if (typeof result !== 'number' || !isFinite(result)) {
            document.getElementById('calc-display').textContent = 'Math ERROR';
            return;
        }

        const rounded = Math.round(result * 1e10) / 1e10;
        calcLastAns = rounded;
        document.getElementById('calc-display').textContent = String(rounded);

        calcHistory.push({ expr: calcExpr, result: rounded });
        if (calcHistory.length > 30) calcHistory.shift();
        calcHistoryIndex = -1;
        renderCalcHistory();

        calcExpr = String(rounded);
        calcRender();
    } catch (err) {
        document.getElementById('calc-display').textContent = 'Lỗi cú pháp';
    }
}

// Hỗ trợ gõ bàn phím vật lý khi máy tính đang mở
// Lưu ý: KHÔNG đóng bằng phím Esc — máy tính chỉ đóng khi bấm nút ✕
// QUAN TRỌNG: nếu người dùng đang gõ vào 1 ô input/textarea/select khác của
// trang web (VD: ô trả lời quiz), bàn phím phải gõ vào đó bình thường —
// máy tính chỉ "nghe" phím khi không có ô nhập nào khác đang được focus.
document.addEventListener('keydown', (e) => {
    const win = document.getElementById('calc-window');
    if (!win || !win.classList.contains('open')) return;

    const active = document.activeElement;
    const isTypingElsewhere = active && /^(INPUT|TEXTAREA|SELECT)$/.test(active.tagName) && !win.contains(active);
    if (isTypingElsewhere) return; // nhường phím cho ô nhập của trang web

    if (/[0-9+\-*/.()]/.test(e.key)) { calcInput(e.key); e.preventDefault(); }
    else if (e.key === 'Enter') { calcEquals(); e.preventDefault(); }
    else if (e.key === 'Backspace') { calcBackspace(); e.preventDefault(); }
});

// ================================================================
// ============ HỆ THỐNG MENU CHẾ ĐỘ (GIỐNG MÁY THẬT) =============
// ================================================================
// Máy Casio fx-580VN X thật có màn hình MENU cho phép chọn giữa
// nhiều chế độ tính toán (COMP, CMPLX, BASE-N, STAT, TABLE, EQN...).
// Mỗi chế độ dưới đây có logic tính toán THẬT, không chỉ trang trí.

let calcCurrentMode = 'comp';

function calcOpenMenu() {
    document.getElementById('calc-menu-grid').style.display = 'block';
    document.querySelectorAll('.calc-mode-panel').forEach(p => p.style.display = 'none');
}

function calcSwitchMode(mode) {
    calcCurrentMode = mode;
    document.getElementById('calc-menu-grid').style.display = 'none';
    document.querySelectorAll('.calc-mode-panel').forEach(p => p.style.display = 'none');
    const panel = document.getElementById(`calc-panel-${mode}`);
    if (panel) panel.style.display = mode === 'comp' ? 'block' : 'block';
    // Cập nhật nhãn chế độ hiển thị trên màn hình
    const modeNames = { comp:'DEG', cmplx:'CMPLX', basen:'BASE-N', stat:'STAT', table:'TABLE', eqn:'EQN', ratio:'RATIO' };
    if (mode === 'comp') {
        document.getElementById('calc-mode-label').textContent = calcAngleMode;
    } else {
        document.getElementById('calc-mode-label').textContent = modeNames[mode] || mode.toUpperCase();
    }
}

// ---- CHẾ ĐỘ SỐ PHỨC (CMPLX) ----
function calcComplexOp(op) {
    const a = parseFloat(document.getElementById('cx-a').value) || 0;
    const b = parseFloat(document.getElementById('cx-b').value) || 0;
    const c = parseFloat(document.getElementById('cx-c').value) || 0;
    const d = parseFloat(document.getElementById('cx-d').value) || 0;
    let re, im;

    if (op === '+') { re = a + c; im = b + d; }
    else if (op === '-') { re = a - c; im = b - d; }
    else if (op === '*') { re = a*c - b*d; im = a*d + b*c; }
    else if (op === '/') {
        const denom = c*c + d*d;
        if (denom === 0) { document.getElementById('cx-result').innerHTML = '⚠️ Không thể chia cho 0'; return; }
        re = (a*c + b*d) / denom;
        im = (b*c - a*d) / denom;
    }

    const modulus = Math.sqrt(re*re + im*im);
    const argument = Math.atan2(im, re) * 180 / Math.PI;
    const sign = im >= 0 ? '+' : '−';

    document.getElementById('cx-result').innerHTML =
        `Kết quả: <strong>${round10(re)} ${sign} ${round10(Math.abs(im))}i</strong><br>` +
        `Môđun |z| = ${round10(modulus)}<br>` +
        `Argument = ${round10(argument)}°`;
}

// ---- CHẾ ĐỘ ĐỔI CƠ SỐ (BASE-N) ----
function calcConvertBase() {
    const inputBase = parseInt(document.getElementById('bn-input-base').value);
    const raw = document.getElementById('bn-input').value.trim();
    const resultBox = document.getElementById('bn-result');

    if (!raw) { resultBox.innerHTML = '⚠️ Vui lòng nhập số cần đổi.'; return; }

    const decimalVal = parseInt(raw, inputBase);
    if (isNaN(decimalVal)) {
        resultBox.innerHTML = `⚠️ "${raw}" không hợp lệ ở hệ cơ số ${inputBase}.`;
        return;
    }

    resultBox.innerHTML = `
        <div class="bn-row"><span>DEC (10)</span><strong>${decimalVal.toString(10)}</strong></div>
        <div class="bn-row"><span>BIN (2)</span><strong>${decimalVal.toString(2)}</strong></div>
        <div class="bn-row"><span>OCT (8)</span><strong>${decimalVal.toString(8)}</strong></div>
        <div class="bn-row"><span>HEX (16)</span><strong>${decimalVal.toString(16).toUpperCase()}</strong></div>
    `;
}

// ---- CHẾ ĐỘ THỐNG KÊ 1 BIẾN (STAT) ----
function calcComputeStat() {
    const raw = document.getElementById('st-input').value.trim();
    const resultBox = document.getElementById('st-result');
    if (!raw) { resultBox.innerHTML = '⚠️ Vui lòng nhập dãy số.'; return; }

    const nums = raw.split(',').map(s => parseFloat(s.trim())).filter(v => !isNaN(v));
    if (nums.length === 0) { resultBox.innerHTML = '⚠️ Không có số hợp lệ.'; return; }

    const n = nums.length;
    const sum = nums.reduce((s,v) => s+v, 0);
    const mean = sum / n;
    const variance = nums.reduce((s,v) => s + (v-mean)**2, 0) / n;
    const sampleVariance = n > 1 ? nums.reduce((s,v) => s + (v-mean)**2, 0) / (n-1) : 0;

    resultBox.innerHTML = `
        <div class="bn-row"><span>n</span><strong>${n}</strong></div>
        <div class="bn-row"><span>Σx</span><strong>${round10(sum)}</strong></div>
        <div class="bn-row"><span>x̄ (trung bình)</span><strong>${round10(mean)}</strong></div>
        <div class="bn-row"><span>σx (độ lệch chuẩn tổng thể)</span><strong>${round10(Math.sqrt(variance))}</strong></div>
        <div class="bn-row"><span>sx (độ lệch chuẩn mẫu)</span><strong>${round10(Math.sqrt(sampleVariance))}</strong></div>
    `;
}

// ---- CHẾ ĐỘ BẢNG GIÁ TRỊ f(x) (TABLE) ----
function calcGenerateTable() {
    const fxRaw = document.getElementById('tb-fx').value.trim();
    const start = parseFloat(document.getElementById('tb-start').value);
    const end = parseFloat(document.getElementById('tb-end').value);
    const step = parseFloat(document.getElementById('tb-step').value);
    const resultBox = document.getElementById('tb-result');

    if (!fxRaw) { resultBox.innerHTML = '⚠️ Vui lòng nhập f(x).'; return; }
    if (isNaN(start) || isNaN(end) || isNaN(step) || step <= 0) { resultBox.innerHTML = '⚠️ Khoảng giá trị hoặc bước nhảy không hợp lệ.'; return; }
    if ((end - start) / step > 100) { resultBox.innerHTML = '⚠️ Quá nhiều điểm (tối đa 100). Hãy tăng bước nhảy.'; return; }

    try {
        // Biểu thức chỉ cho phép biến x + các phép toán/hàm đã whitelist
        const compiled = calcCompile(fxRaw.replace(/\bx\b/g, '(X)'));
        const rt = calcBuildRuntime();
        const fn = new Function('X', ...Object.keys(rt), `return (${compiled});`);

        let rows = '';
        for (let x = start; x <= end + 1e-9; x += step) {
            const y = fn(x, ...Object.values(rt));
            rows += `<div class="tb-row"><span>${round10(x)}</span><strong>${typeof y === 'number' && isFinite(y) ? round10(y) : 'Lỗi'}</strong></div>`;
        }
        resultBox.innerHTML = `<div class="tb-header-row"><span>x</span><strong>f(x)</strong></div>${rows}`;
    } catch (err) {
        resultBox.innerHTML = '⚠️ Biểu thức f(x) không hợp lệ. Dùng biến "x", VD: x^2+2*x-1';
    }
}

// ---- CHẾ ĐỘ GIẢI PHƯƠNG TRÌNH (EQN) ----
function calcEqnTypeChange() {
    const type = document.getElementById('eq-type').value;
    document.getElementById('eq-inputs-linear2').style.display = type === 'linear2' ? 'block' : 'none';
    document.getElementById('eq-inputs-quad').style.display = type === 'quad' ? 'block' : 'none';
}

function calcSolveEqn() {
    const type = document.getElementById('eq-type').value;
    const resultBox = document.getElementById('eq-result');

    if (type === 'linear2') {
        const a1 = parseFloat(document.getElementById('eq-a1').value);
        const b1 = parseFloat(document.getElementById('eq-b1').value);
        const c1 = parseFloat(document.getElementById('eq-c1').value);
        const a2 = parseFloat(document.getElementById('eq-a2').value);
        const b2 = parseFloat(document.getElementById('eq-b2').value);
        const c2 = parseFloat(document.getElementById('eq-c2').value);
        if ([a1,b1,c1,a2,b2,c2].some(isNaN)) { resultBox.innerHTML = '⚠️ Vui lòng nhập đủ 6 hệ số.'; return; }

        const D = a1*b2 - a2*b1;
        if (D === 0) { resultBox.innerHTML = 'Hệ vô nghiệm hoặc vô số nghiệm (D = 0).'; return; }
        const x = (c1*b2 - c2*b1) / D;
        const y = (a1*c2 - a2*c1) / D;
        resultBox.innerHTML = `Nghiệm: <strong>x = ${round10(x)}</strong>, <strong>y = ${round10(y)}</strong>`;
    } else {
        const a = parseFloat(document.getElementById('eq-qa').value);
        const b = parseFloat(document.getElementById('eq-qb').value);
        const c = parseFloat(document.getElementById('eq-qc').value);
        if ([a,b,c].some(isNaN) || a === 0) { resultBox.innerHTML = '⚠️ Hệ số a, b, c hợp lệ và a ≠ 0.'; return; }

        const delta = b*b - 4*a*c;
        if (delta < 0) {
            const re = -b/(2*a), im = Math.sqrt(-delta)/(2*a);
            resultBox.innerHTML = `Vô nghiệm thực. Nghiệm phức: x = ${round10(re)} ± ${round10(im)}i`;
        } else if (delta === 0) {
            resultBox.innerHTML = `Nghiệm kép: <strong>x = ${round10(-b/(2*a))}</strong>`;
        } else {
            const x1 = (-b - Math.sqrt(delta)) / (2*a);
            const x2 = (-b + Math.sqrt(delta)) / (2*a);
            resultBox.innerHTML = `Hai nghiệm: <strong>x₁ = ${round10(x1)}</strong>, <strong>x₂ = ${round10(x2)}</strong>`;
        }
    }
}

// ---- CHẾ ĐỘ TỈ LỆ THỨC (RATIO) ----
function calcSolveRatio() {
    const a = parseFloat(document.getElementById('rt-a').value);
    const b = parseFloat(document.getElementById('rt-b').value);
    const c = parseFloat(document.getElementById('rt-c').value);
    const resultBox = document.getElementById('rt-result');
    if ([a,b,c].some(isNaN) || a === 0) { resultBox.innerHTML = '⚠️ Vui lòng nhập đủ a, b, c (a ≠ 0).'; return; }

    const x = (b * c) / a;
    document.getElementById('rt-x').value = round10(x);
    resultBox.innerHTML = `${a} : ${b} = ${c} : x  ⟹  <strong>x = ${round10(x)}</strong>`;
}

function round10(n) { return Math.round(n * 1e10) / 1e10; }

// ================================================================
// ========= TÍNH NĂNG NÂNG CAO: THU GỌN / SAO CHÉP / CHÈN VÀO Ô ==
// ================================================================

// ---- THU GỌN / MỞ RỘNG MÁY TÍNH ----
let calcMinimized = false;
function toggleCalcMinimize() {
    calcMinimized = !calcMinimized;
    const collapsible = document.getElementById('calc-collapsible');
    const btn = document.getElementById('calc-minimize-btn');
    if (calcMinimized) {
        collapsible.style.display = 'none';
        btn.textContent = '➕';
        btn.title = 'Mở rộng';
    } else {
        collapsible.style.display = 'block';
        btn.textContent = '➖';
        btn.title = 'Thu gọn';
    }
}

// ---- SAO CHÉP KẾT QUẢ ----
function calcCopyResult() {
    const text = document.getElementById('calc-display').textContent;
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => showCalcToast('Đã sao chép: ' + text));
    } else {
        // Phương án dự phòng cho trình duyệt cũ không hỗ trợ Clipboard API
        const tmp = document.createElement('textarea');
        tmp.value = text;
        document.body.appendChild(tmp);
        tmp.select();
        document.execCommand('copy');
        document.body.removeChild(tmp);
        showCalcToast('Đã sao chép: ' + text);
    }
}

// ---- CHÈN KẾT QUẢ VÀO Ô NHẬP ĐANG CHỌN TRÊN TRANG WEB ----
// Theo dõi ô input số cuối cùng người dùng bấm vào (ngoài máy tính) để biết
// nên "chèn" kết quả vào đâu khi bấm nút "Chèn vào ô nhập".
let calcLastFocusedInput = null;

function initCalcInsertTracking() {
    document.addEventListener('focusin', (e) => {
        const el = e.target;
        const win = document.getElementById('calc-window');
        if (!el || !win || win.contains(el)) return; // bỏ qua các ô input bên trong máy tính
        if (el.tagName === 'INPUT' && (el.type === 'number' || el.type === 'text')) {
            calcLastFocusedInput = el;
            updateCalcInsertBtnState();
        }
    });
}
document.addEventListener('DOMContentLoaded', initCalcInsertTracking);

function updateCalcInsertBtnState() {
    const btn = document.getElementById('calc-insert-btn');
    if (!btn) return;
    if (calcLastFocusedInput && document.body.contains(calcLastFocusedInput)) {
        btn.disabled = false;
        btn.title = `Chèn vào ô: ${calcLastFocusedInput.placeholder || calcLastFocusedInput.id}`;
    } else {
        btn.disabled = true;
        btn.title = 'Hãy bấm vào 1 ô nhập số trên trang trước';
    }
}

function calcInsertToPage() {
    if (!calcLastFocusedInput || !document.body.contains(calcLastFocusedInput)) {
        showCalcToast('⚠️ Hãy bấm vào 1 ô nhập số trên trang trước khi chèn.');
        return;
    }
    const value = document.getElementById('calc-display').textContent;
    calcLastFocusedInput.value = value;
    calcLastFocusedInput.dispatchEvent(new Event('input', { bubbles: true }));
    calcLastFocusedInput.dispatchEvent(new Event('change', { bubbles: true }));
    showCalcToast(`Đã chèn ${value} vào ô nhập!`);
    calcLastFocusedInput.focus();
}