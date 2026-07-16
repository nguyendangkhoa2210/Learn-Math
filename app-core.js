// ================================================================
// =====================  MATHUNIVERSE APP.JS =====================
// ================================================================

// ================= FORMULA INDEX (for search) =================
const FORMULA_INDEX = [
    // Cấp 1
    { id: 'f-cuuchuong',   title: '🔢 Bảng Cửu Chương',          level: 1, tags: ['nhân','cửu chương','tiểu học'] },
    { id: 'f-chuvihcn',    title: '📏 Chu Vi & Diện Tích HCN',    level: 1, tags: ['hình chữ nhật','chu vi','diện tích'] },
    { id: 'f-hinhvuong',   title: '🟦 Chu Vi & Diện Tích HV',     level: 1, tags: ['hình vuông','chu vi','diện tích'] },
    { id: 'f-dientichtg',  title: '🔺 Diện Tích Tam Giác',        level: 1, tags: ['tam giác','diện tích','đáy'] },
    { id: 'f-timx',        title: '❓ Tìm X Cơ Bản',              level: 1, tags: ['tìm x','ẩn','phương trình'] },
    { id: 'f-chuyendong',  title: '🚗 Toán Chuyển Động',          level: 1, tags: ['vận tốc','quãng đường','thời gian'] },
    { id: 'f-tile',        title: '📊 Tỉ Lệ & Phần Trăm',         level: 1, tags: ['phần trăm','tỉ lệ','%'] },
    { id: 'f-tbc',         title: '🧮 Trung Bình Cộng',           level: 1, tags: ['trung bình cộng','tổng','dãy số'] },
    // Cấp 2
    { id: 'f-pytago',      title: '📐 Định Lý Pytago',            level: 2, tags: ['pytago','cạnh huyền','tam giác vuông'] },
    { id: 'f-hpt2an',      title: '📊 Hệ Phương Trình 2 Ẩn',     level: 2, tags: ['hệ phương trình','cramers','ẩn'] },
    { id: 'f-hinhthang',   title: '▱ Diện Tích Hình Thang',       level: 2, tags: ['hình thang','diện tích','đáy'] },
    { id: 'f-duongtron',   title: '⚪ Chu Vi & Diện Tích Tròn',   level: 2, tags: ['hình tròn','bán kính','pi'] },
    { id: 'f-hangdangthuc',title: '🧬 Hằng Đẳng Thức',           level: 2, tags: ['hằng đẳng thức','bình phương','tổng hiệu'] },
    { id: 'f-bptbac1',     title: '📉 Bất Phương Trình Bậc Nhất', level: 2, tags: ['bất phương trình','bậc nhất'] },
    { id: 'f-duongtrungbinh', title: '📏 Đường Trung Bình Tam Giác', level: 2, tags: ['đường trung bình','tam giác'] },
    { id: 'f-bdttamgiac',  title: '🔺 Bất Đẳng Thức Tam Giác',    level: 2, tags: ['bất đẳng thức tam giác','ba cạnh'] },
    { id: 'f-canbachai',   title: '√ Căn Bậc Hai & Căn Bậc Ba',   level: 2, tags: ['căn bậc hai','căn bậc ba'] },
    // Cấp 3
    { id: 'f-ptbac2',      title: '📈 Phương Trình Bậc 2',        level: 3, tags: ['bậc 2','delta','nghiệm','vi-ét'] },
    { id: 'f-luonggiac',   title: '🌀 Lượng Giác & Radian',       level: 3, tags: ['sin','cos','tan','radian','góc'] },
    { id: 'f-daoham',      title: '⚡ Đạo Hàm Lũy Thừa',         level: 3, tags: ['đạo hàm','lũy thừa','vi phân'] },
    { id: 'f-capsocong',   title: '🔢 Cấp Số Cộng',              level: 3, tags: ['cấp số cộng','dãy số','công sai'] },
    { id: 'f-tohop',       title: '🎲 Tổ Hợp & Chỉnh Hợp',       level: 3, tags: ['tổ hợp','chỉnh hợp','giai thừa'] },
    { id: 'f-hhcn',        title: '📦 Hình Hộp Chữ Nhật',        level: 3, tags: ['hình hộp','thể tích','diện tích'] },
    { id: 'f-hlp',         title: '🧊 Hình Lập Phương',          level: 3, tags: ['lập phương','thể tích'] },
    { id: 'f-hinhtru',     title: '🥫 Hình Trụ',                 level: 3, tags: ['hình trụ','thể tích','bán kính'] },
    { id: 'f-hinhcau',     title: '🌐 Hình Cầu',                 level: 3, tags: ['hình cầu','thể tích','bán kính'] },
    { id: 'f-hinhchop',    title: '🔺 Hình Chóp Đáy Vuông',      level: 3, tags: ['hình chóp','thể tích'] },
    { id: 'f-thongke',     title: '📊 Thống Kê Cơ Bản',          level: 3, tags: ['trung bình','trung vị','mốt','độ lệch chuẩn'] },
    { id: 'f-hamso',       title: '📈 Khảo Sát Hàm Bậc 2',       level: 3, tags: ['parabol','đỉnh','hàm số'] },
    { id: 'f-tichphan',    title: '∫ Tích Phân Cơ Bản',          level: 3, tags: ['nguyên hàm','tích phân'] },
    { id: 'f-bptbac2',     title: '📈 Bất Phương Trình Bậc Hai', level: 3, tags: ['bất phương trình','tam thức','xét dấu'] },
    { id: 'f-hethucluong', title: '📐 Hệ Thức Lượng Tam Giác',   level: 3, tags: ['định lý cos','diện tích tam giác'] },
    { id: 'f-ptluonggiac', title: '🌀 Phương Trình Lượng Giác',  level: 3, tags: ['sin x','cos x','phương trình lượng giác'] },
    { id: 'f-capsonhan',   title: '🔢 Cấp Số Nhân',              level: 3, tags: ['cấp số nhân','công bội'] },
    { id: 'f-mulogarit',   title: '📐 Lũy Thừa & Logarit',       level: 3, tags: ['logarit','lũy thừa','log'] },
    { id: 'f-sophuc',      title: 'ℂ Số Phức Cơ Bản',            level: 3, tags: ['số phức','môđun','liên hợp'] },
    { id: 'f-xacsuat',     title: '🎲 Xác Suất Cổ Điển',         level: 3, tags: ['xác suất','biến cố'] },
    { id: 'f-quytacdem',   title: '➕ Quy Tắc Đếm',              level: 3, tags: ['quy tắc cộng','quy tắc nhân','đếm'] },
    { id: 'f-gioihan',     title: '♾️ Giới Hạn Dãy Số',          level: 3, tags: ['giới hạn','dãy số','lim'] },
    { id: 'f-nguyenhammorong', title: '∫ Nguyên Hàm Mở Rộng',    level: 3, tags: ['nguyên hàm','sin','cos','e mũ x'] },
    { id: 'f-ptmu',        title: '📈 Phương Trình Mũ Cơ Bản',   level: 3, tags: ['phương trình mũ','cơ số'] },
    { id: 'f-ucln',        title: '🔢 ƯCLN & BCNN',              level: 1, tags: ['ước chung lớn nhất','bội chung nhỏ nhất','euclid'] },
    { id: 'f-rutgonpx',    title: '➗ Rút Gọn Phân Số',           level: 1, tags: ['phân số','tối giản','rút gọn'] },
    { id: 'f-dauhieuchiahet', title: '✅ Dấu Hiệu Chia Hết',      level: 1, tags: ['chia hết','dấu hiệu','ước'] },
    { id: 'f-hinhbinhhanh',title: '▰ Hình Bình Hành',             level: 2, tags: ['hình bình hành','chu vi','diện tích'] },
    { id: 'f-hinhthoi',    title: '◆ Hình Thoi',                 level: 2, tags: ['hình thoi','đường chéo','diện tích'] },
    { id: 'f-talet',       title: '📏 Định Lý Talet',             level: 2, tags: ['talet','song song','tỉ lệ đoạn thẳng'] },
    { id: 'f-songuyeto',   title: '🔍 Kiểm Tra Số Nguyên Tố',    level: 2, tags: ['số nguyên tố','ước số'] },
    { id: 'f-hinhnon',     title: '🍦 Hình Nón',                 level: 3, tags: ['hình nón','thể tích','đường sinh'] },
    { id: 'f-toadooxy',    title: '📍 Tọa Độ: Khoảng Cách & Trung Điểm', level: 3, tags: ['oxy','khoảng cách','trung điểm','tọa độ'] },
    { id: 'f-dagiacdeu',   title: '⬡ Đa Giác Đều',               level: 3, tags: ['đa giác đều','góc trong','đường chéo'] },
];

// ================= TOAST NOTIFICATION =================
function showToast(msg, type = 'info') {
    const container = document.getElementById('toast-container');
    const icons = { success: '✅', error: '❌', info: 'ℹ️' };
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<span>${icons[type]}</span><span>${msg}</span>`;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3100);
}

// ================= COPY OUTPUT =================
function copyOutput(id) {
    const el = document.getElementById(id);
    const text = el.innerText || el.textContent;
    if (!text || text.includes('Kết quả hiển thị tại đây')) {
        showToast('Chưa có kết quả để sao chép!', 'error');
        return;
    }
    navigator.clipboard.writeText(text).then(() => {
        showToast('Đã sao chép kết quả!', 'success');
    }).catch(() => {
        showToast('Không thể sao chép trên trình duyệt này.', 'error');
    });
}

// ================= BOOKMARK =================
function getBookmarks() {
    return JSON.parse(localStorage.getItem('mu_bookmarks') || '[]');
}
function saveBookmarks(bk) {
    localStorage.setItem('mu_bookmarks', JSON.stringify(bk));
}

function toggleBookmark(id, title, btn) {
    let bk = getBookmarks();
    const idx = bk.findIndex(b => b.id === id);
    if (idx === -1) {
        bk.push({ id, title });
        saveBookmarks(bk);
        btn.classList.add('bookmarked');
        btn.textContent = '⭐ Đã Đánh Dấu';
        showToast(`Đã lưu "${title}" vào yêu thích!`, 'success');
    } else {
        bk.splice(idx, 1);
        saveBookmarks(bk);
        btn.classList.remove('bookmarked');
        btn.textContent = '⭐ Đánh Dấu';
        showToast(`Đã xóa khỏi yêu thích.`, 'info');
    }
    renderBookmarkList();
    updateStatsDisplay();
}

function renderBookmarkList() {
    const bk = getBookmarks();
    const group = document.getElementById('bookmark-group');
    const list  = document.getElementById('bookmark-list');
    if (!bk.length) { group.style.display = 'none'; return; }
    group.style.display = 'block';
    list.innerHTML = bk.map(b =>
        `<button class="recent-item" onclick="viewFormula('${b.id}', null)">⭐ ${b.title}</button>`
    ).join('');
}

function syncBookmarkButtons() {
    const bk = getBookmarks();
    const ids = new Set(bk.map(b => b.id));
    document.querySelectorAll('[onclick^="toggleBookmark"]').forEach(btn => {
        const match = btn.getAttribute('onclick').match(/toggleBookmark\('([^']+)'/);
        if (match) {
            const id = match[1];
            if (ids.has(id)) {
                btn.classList.add('bookmarked');
                btn.textContent = '⭐ Đã Đánh Dấu';
            } else {
                btn.classList.remove('bookmarked');
                btn.textContent = '⭐ Đánh Dấu';
            }
        }
    });
}

// ================= RECENTLY VIEWED =================
function getRecent() {
    return JSON.parse(localStorage.getItem('mu_recent') || '[]');
}
function addRecent(id, title) {
    let recent = getRecent();
    recent = recent.filter(r => r.id !== id);
    recent.unshift({ id, title });
    if (recent.length > 5) recent = recent.slice(0, 5);
    localStorage.setItem('mu_recent', JSON.stringify(recent));
    renderRecentList();
}
function renderRecentList() {
    const recent = getRecent();
    const group = document.getElementById('recent-group');
    const list  = document.getElementById('recent-list');
    if (!recent.length) { group.style.display = 'none'; return; }
    group.style.display = 'block';
    list.innerHTML = recent.map(r =>
        `<button class="recent-item" onclick="viewFormula('${r.id}', null)">🕓 ${r.title}</button>`
    ).join('');
}

// ================= SEARCH =================
function handleSearch(query) {
    const resultsEl = document.getElementById('search-results');
    const q = query.trim().toLowerCase();
    if (!q) { resultsEl.classList.remove('open'); return; }

    const matches = FORMULA_INDEX.filter(f =>
        f.title.toLowerCase().includes(q) ||
        f.tags.some(t => t.includes(q))
    );

    if (!matches.length) {
        resultsEl.innerHTML = `<div class="search-result-item" style="color:var(--text-3);">Không tìm thấy kết quả...</div>`;
        resultsEl.classList.add('open');
        return;
    }

    const levelLabel = { 1: 'Cấp 1', 2: 'Cấp 2', 3: 'Cấp 3' };
    const levelClass = { 1: 'level-tag-1', 2: 'level-tag-2', 3: 'level-tag-3' };

    resultsEl.innerHTML = matches.map(f => `
        <div class="search-result-item" onclick="selectSearchResult('${f.id}')">
            <span>${f.title}</span>
            <span class="search-level ${levelClass[f.level]}">${levelLabel[f.level]}</span>
        </div>
    `).join('');
    resultsEl.classList.add('open');
}

function selectSearchResult(id) {
    document.getElementById('formula-search').value = '';
    document.getElementById('search-results').classList.remove('open');
    // Ensure we're in learn mode
    if (document.getElementById('learn-panels').style.display === 'none') {
        switchMode('learn');
    }
    viewFormula(id, null);
}

// Close search on outside click
document.addEventListener('click', (e) => {
    if (!e.target.closest('#search-wrap-learn')) {
        document.getElementById('search-results').classList.remove('open');
    }
});

// ================= STATS MODAL =================
function openStatsModal() {
    updateStatsDisplay();
    document.getElementById('stats-modal').classList.add('open');
}
function closeStatsModal(e) {
    if (!e || e.target === document.getElementById('stats-modal') || e.currentTarget.classList.contains('modal-close')) {
        document.getElementById('stats-modal').classList.remove('open');
    }
}
const LEVEL_META = {
    cap1: { name: 'Cấp 1 · Tiểu Học', color: 'var(--orange, #ea580c)', bg: 'var(--orange-lt, #ffedd5)' },
    cap2: { name: 'Cấp 2 · THCS',     color: 'var(--blue, #4f46e5)',   bg: 'var(--blue-lt, #ede9fe)' },
    cap3: { name: 'Cấp 3 · THPT',     color: 'var(--green, #16a34a)', bg: 'var(--green-lt, #dcfce7)' }
};
const DIFF_META = {
    easy:   { name: 'Dễ',       icon: '🟢' },
    medium: { name: 'Trung Bình', icon: '🟡' },
    hard:   { name: 'Khó',      icon: '🔴' },
    hsg:    { name: 'Học Sinh Giỏi', icon: '🏆' }
};

function getGradeLabel(scorePct) {
    if (scorePct >= 100) return '🏆 Xuất sắc';
    if (scorePct >= 80)  return '🎉 Giỏi';
    if (scorePct >= 60)  return '👍 Khá';
    if (scorePct >= 40)  return '📖 Trung bình';
    return '💪 Cần cố gắng';
}

function updateStatsDisplay() {
    const viewed    = JSON.parse(localStorage.getItem('mu_viewed_set') || '[]').length;
    const bookmarks = getBookmarks().length;
    document.getElementById('stat-formulas-viewed').textContent = viewed;
    document.getElementById('stat-bookmarks').textContent = bookmarks;

    // Dựng thẻ thống kê RIÊNG BIỆT cho từng cấp, và TRONG mỗi cấp lại tách riêng
    // theo từng độ khó (Dễ/Trung Bình/Khó) — vì năng lực ở mỗi độ khó khác nhau,
    // gộp chung sẽ không phản ánh đúng học sinh mạnh/yếu ở mức nào.
    ['cap1', 'cap2', 'cap3'].forEach(level => {
        const meta = LEVEL_META[level];
        const card = document.getElementById(`level-card-${level}`);
        if (!card) return;

        const history = getQuizHistory(level);
        const totalAttempts = ['easy','medium','hard','hsg']
            .reduce((s, d) => s + getDifficultyStats(level, d).attempts, 0);

        if (totalAttempts === 0) {
            card.innerHTML = `
                <div class="lsc-header" style="color:${meta.color};background:${meta.bg};">${meta.name}</div>
                <p class="lsc-empty">Chưa luyện tập ở cấp này. Vào chế độ Luyện Tập để bắt đầu!</p>
            `;
            return;
        }

        // Bảng chia theo độ khó
        const diffRows = ['easy','medium','hard','hsg'].map(diff => {
            const s = getDifficultyStats(level, diff);
            const dm = DIFF_META[diff];
            if (s.attempts === 0) {
                return `<div class="lsc-diff-row lsc-diff-empty">
                    <span class="lsc-diff-name">${dm.icon} ${dm.name}</span>
                    <span class="lsc-diff-val">Chưa làm</span>
                </div>`;
            }
            return `<div class="lsc-diff-row">
                <span class="lsc-diff-name">${dm.icon} ${dm.name}</span>
                <span class="lsc-diff-val">${s.attempts} lần · TB ${s.avg.toFixed(1)} · Cao nhất <strong>${s.best}/10</strong></span>
            </div>`;
        }).join('');

        // 5 lần gần nhất, mới nhất trước, có gắn nhãn độ khó
        const recent = history.slice(-5).reverse();
        const recentHtml = recent.map(h => {
            const d = new Date(h.date);
            const dateStr = `${d.getDate()}/${d.getMonth()+1}`;
            const pct = (h.score / TOTAL_QUESTIONS) * 100;
            const dotColor = pct >= 80 ? '#16a34a' : pct >= 50 ? '#ca8a04' : '#dc2626';
            const diffTag = DIFF_META[h.difficulty] ? DIFF_META[h.difficulty].icon : '';
            return `<div class="lsc-history-row">
                <span class="lsc-history-dot" style="background:${dotColor};"></span>
                <span class="lsc-history-date">${dateStr}</span>
                <span class="lsc-history-diff">${diffTag}</span>
                <span class="lsc-history-score">${h.score}/${TOTAL_QUESTIONS}</span>
            </div>`;
        }).join('');

        // Đánh giá tổng quan dựa trên trung bình có trọng số của cả 3 độ khó
        const overallAvgPct = totalAttempts > 0
            ? (['easy','medium','hard','hsg'].reduce((s,d) => {
                const st = getDifficultyStats(level, d);
                return s + st.avg * st.attempts;
              }, 0) / totalAttempts / TOTAL_QUESTIONS) * 100
            : 0;

        card.innerHTML = `
            <div class="lsc-header" style="color:${meta.color};background:${meta.bg};">${meta.name}
                <span class="lsc-grade-inline">${getGradeLabel(overallAvgPct)}</span>
            </div>
            <div class="lsc-diff-table">${diffRows}</div>
            ${recentHtml ? `<div class="lsc-history"><div class="lsc-history-title">5 lần gần nhất (mọi độ khó)</div>${recentHtml}</div>` : ''}
        `;
    });
}

function resetAllStats() {
    if (!confirm('Bạn có chắc muốn xóa toàn bộ dữ liệu? Hành động này không thể hoàn tác!')) return;
    ['cap1','cap2','cap3'].forEach(l => {
        localStorage.removeItem(`mathuniverse_highscore_${l}`);
        localStorage.removeItem(`mu_quiz_count_${l}`);
        localStorage.removeItem(`mu_history_${l}`);
        localStorage.removeItem(`mu_weak_${l}`);
        ['easy','medium','hard','hsg'].forEach(d => {
            localStorage.removeItem(`mu_sum_${l}_${d}`);
            localStorage.removeItem(`mu_count_${l}_${d}`);
            localStorage.removeItem(`mu_best_${l}_${d}`);
        });
    });
    localStorage.removeItem('mu_total_quiz'); // dọn key cũ nếu còn sót từ phiên bản trước
    localStorage.removeItem('mu_recent');
    localStorage.removeItem('mu_viewed_set');
    localStorage.removeItem('mu_bookmarks');
    renderRecentList();
    renderBookmarkList();
    refreshHighScores();
    updateStatsDisplay();
    closeStatsModal();
    showToast('Đã xóa toàn bộ dữ liệu!', 'success');
}

// ================================================================
// ============== SAO LƯU / KHÔI PHỤC DỮ LIỆU (JSON) =============
// ================================================================
// Toàn bộ điểm số, lịch sử, bookmark đang lưu trong localStorage của trình duyệt.
// Hai hàm dưới đây giúp học sinh xuất ra file để giữ lại hoặc chuyển sang máy khác.

function exportUserData() {
    const data = {};
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('mu_') || key.startsWith('mathuniverse_')) {
            data[key] = localStorage.getItem(key);
        }
    }
    const payload = { exportedAt: new Date().toISOString(), app: 'MathUniverse', data };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mathuniverse-backup-${new Date().toISOString().slice(0,10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Đã xuất file sao lưu!', 'success');
}

function importUserData(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const payload = JSON.parse(e.target.result);
            if (!payload.data || typeof payload.data !== 'object') throw new Error('Sai định dạng');
            Object.entries(payload.data).forEach(([key, value]) => {
                if (key.startsWith('mu_') || key.startsWith('mathuniverse_')) {
                    localStorage.setItem(key, value);
                }
            });
            renderRecentList();
            renderBookmarkList();
            refreshHighScores();
            updateStatsDisplay();
            showToast('Khôi phục dữ liệu thành công!', 'success');
        } catch (err) {
            showToast('⚠️ File không hợp lệ, vui lòng kiểm tra lại.', 'error');
        }
    };
    reader.readAsText(file);
    event.target.value = '';
}

// ================= VIEWS TRACKING =================
function trackViewed(id) {
    let viewed = JSON.parse(localStorage.getItem('mu_viewed_set') || '[]');
    if (!viewed.includes(id)) {
        viewed.push(id);
        localStorage.setItem('mu_viewed_set', JSON.stringify(viewed));
    }
}

// ================= ĐIỀU HƯỚNG CHẾ ĐỘ (HỌC / QUIZ) =================
function switchMode(mode) {
    const learnMenu   = document.getElementById('menu-learn');
    const quizMenu    = document.getElementById('menu-quiz');
    const learnPanels = document.getElementById('learn-panels');
    const quizPanels  = document.getElementById('quiz-panels');
    const learnBtn    = document.getElementById('modeLearnBtn');
    const quizBtn     = document.getElementById('modeQuizBtn');
    const searchWrap  = document.getElementById('search-wrap-learn');

    if (mode === 'learn') {
        learnMenu.style.display = 'flex';
        quizMenu.style.display = 'none';
        learnPanels.style.display = 'block';
        quizPanels.style.display = 'none';
        learnBtn.classList.add('active');
        quizBtn.classList.remove('active');
        if (searchWrap) searchWrap.style.display = 'block';
        showWelcome();
    } else {
        learnMenu.style.display = 'none';
        quizMenu.style.display = 'block';
        learnPanels.style.display = 'none';
        quizPanels.style.display = 'block';
        quizBtn.classList.add('active');
        learnBtn.classList.remove('active');
        if (searchWrap) searchWrap.style.display = 'none';
        resetQuizView();
        refreshHighScores();
    }
}

// ================= ĐIỀU HƯỚNG CÔNG THỨC =================
// Đóng/mở từng nhóm cấp học trong sidebar (accordion) — mặc định nhóm chứa
// công thức đang xem sẽ tự mở, các nhóm khác thu gọn để đỡ rối mắt.
function toggleMenuGroup(headerEl) {
    const group = headerEl.closest('.menu-group');
    group.classList.toggle('collapsed');
}

function viewFormula(formulaId, element) {
    // Ẩn tất cả panels
    document.querySelectorAll('#learn-panels .formula-panel').forEach(p => p.classList.remove('active'));
    // Bỏ active khỏi menu items
    document.querySelectorAll('#menu-learn .menu-item').forEach(i => i.classList.remove('active'));

    const targetPanel = document.getElementById(formulaId);
    if (targetPanel) {
        targetPanel.classList.add('active');
        const title = targetPanel.getAttribute('data-title') || formulaId;
        addRecent(formulaId, title);
        trackViewed(formulaId);
        syncBookmarkButtons();
    }

    if (element) {
        element.classList.add('active');
        const grp = element.closest('.menu-group');
        if (grp) grp.classList.remove('collapsed');
    }

    // Highlight matching sidebar button if called from search/recent/bookmark
    if (!element) {
        document.querySelectorAll('#menu-learn .menu-item').forEach(btn => {
            if (btn.getAttribute('onclick') && btn.getAttribute('onclick').includes(`'${formulaId}'`)) {
                btn.classList.add('active');
                const grp = btn.closest('.menu-group');
                if (grp) grp.classList.remove('collapsed');
            }
        });
    }

    closeSidebarOnMobile();
}

function showWelcome() {
    document.querySelectorAll('#learn-panels .formula-panel').forEach(p => p.classList.remove('active'));
    document.getElementById('welcome-screen').classList.add('active');
    document.querySelectorAll('#menu-learn .menu-item').forEach(i => i.classList.remove('active'));
    if (document.getElementById('learn-panels').style.display === 'none') switchMode('learn');
    updateWelcomeDashboard();
}

// ================= DASHBOARD CHÀO MỪNG (ĐỘNG, THÂN THIỆN HỌC SINH) =================
const MOTIVATIONAL_QUOTES = [
    '💡 "Toán học là ngôn ngữ mà vũ trụ dùng để viết chính nó."',
    '🌟 "Đừng sợ sai — mỗi lỗi sai là một bước tiến gần hơn đến đáp án đúng."',
    '🔥 "Người giỏi toán không phải người không bao giờ sai, mà là người luyện tập nhiều nhất."',
    '🎯 "Một bài toán khó hôm nay sẽ là bài dễ của ngày mai, nếu bạn kiên trì luyện tập."',
    '🚀 "Mỗi công thức bạn học hôm nay là một viên gạch xây nên tương lai của bạn."',
    '📚 "Học toán giống như tập gym cho não bộ — càng luyện, càng mạnh."',
];
const MASCOT_MORNING = ['🦉','🐥','☀️'];
const MASCOT_AFTERNOON = ['🦉','📖','🎓'];
const MASCOT_EVENING = ['🦉','🌙','✨'];

function updateWelcomeDashboard() {
    // Câu nói truyền cảm hứng ngẫu nhiên mỗi lần vào trang chủ
    const quoteEl = document.getElementById('hero-quote');
    if (quoteEl) quoteEl.textContent = MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)];

    // Lời chào theo giờ trong ngày
    const hour = new Date().getHours();
    const greetingEl = document.getElementById('hero-greeting');
    const mascotEl = document.getElementById('hero-mascot');
    let greeting, mascotSet;
    if (hour < 11) { greeting = 'Chào buổi sáng! Bắt đầu ngày mới với vài công thức toán nhé! ☀️'; mascotSet = MASCOT_MORNING; }
    else if (hour < 18) { greeting = 'Chào buổi chiều! Cùng luyện tập để nắm chắc kiến thức nào! 📖'; mascotSet = MASCOT_AFTERNOON; }
    else { greeting = 'Chào buổi tối! Ôn lại bài hôm nay trước khi nghỉ ngơi nhé! 🌙'; mascotSet = MASCOT_EVENING; }
    if (greetingEl) greetingEl.textContent = greeting;
    if (mascotEl) mascotEl.textContent = mascotSet[Math.floor(Math.random() * mascotSet.length)];

    // Thành tích cá nhân (đọc từ localStorage đã có sẵn)
    const viewed = JSON.parse(localStorage.getItem('mu_viewed_set') || '[]').length;
    const bookmarks = getBookmarks().length;
    const bestScores = ['cap1','cap2','cap3'].map(l => parseInt(localStorage.getItem(`mathuniverse_highscore_${l}`) || '0'));
    const best = Math.max(0, ...bestScores);

    const viewedEl = document.getElementById('mpb-viewed');
    const bookmarksEl = document.getElementById('mpb-bookmarks');
    const bestEl = document.getElementById('mpb-best');
    if (viewedEl) viewedEl.textContent = viewed;
    if (bookmarksEl) bookmarksEl.textContent = bookmarks;
    if (bestEl) bestEl.textContent = `${best}/10`;

    const encourageEl = document.getElementById('mpb-encourage');
    if (encourageEl) {
        if (viewed === 0) {
            encourageEl.textContent = '👋 Bạn chưa xem công thức nào — hãy chọn 1 cấp độ ở trên để bắt đầu!';
        } else if (viewed < 10) {
            encourageEl.textContent = `🌱 Bạn đã xem ${viewed} công thức — tiếp tục khám phá thêm nhé!`;
        } else if (viewed < 25) {
            encourageEl.textContent = `🔥 Ấn tượng! Bạn đã xem ${viewed} công thức — sắp phủ kín cả 3 cấp rồi!`;
        } else {
            encourageEl.textContent = `🏆 Xuất sắc! Bạn đã xem ${viewed}/42 công thức — một cao thủ toán học thực thụ!`;
        }
    }
}

// Nhảy nhanh tới công thức đầu tiên của 1 cấp độ khi bấm thẻ chọn cấp
function jumpToLevel(level) {
    const firstFormula = FORMULA_INDEX.find(f => f.level === level);
    if (!firstFormula) return;
    const btn = Array.from(document.querySelectorAll('#menu-learn .menu-item'))
        .find(b => b.getAttribute('onclick') && b.getAttribute('onclick').includes(firstFormula.id));
    viewFormula(firstFormula.id, btn || null);
}

// ================= SIDEBAR RESPONSIVE =================
const hamburgerBtn = document.getElementById('hamburgerBtn');
if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', () => {
        const sidebar = document.getElementById('sidebar');
        // On mobile: toggle open class; on desktop: toggle collapsed
        if (window.innerWidth <= 768) {
            sidebar.classList.toggle('open');
        } else {
            sidebar.classList.toggle('collapsed');
        }
    });
}
function closeSidebarOnMobile() {
    if (window.innerWidth <= 768) {
        document.getElementById('sidebar').classList.remove('open');
    }
}

// ================= LOGO BOUNCE =================
document.querySelectorAll('.letters span').forEach(span => {
    span.addEventListener('mouseenter', (e) => {
        e.target.classList.remove('active');
        setTimeout(() => e.target.classList.add('active'), 10);
    });
    span.addEventListener('animationend', (e) => e.target.classList.remove('active'));
});

// ================= OUTPUT HELPER =================
function setOutput(id, html, isError = false) {
    const el = document.getElementById(id);
    el.innerHTML = html;
    el.classList.toggle('is-error', isError);
    // Trigger re-animation
    el.style.animation = 'none';
    el.offsetHeight; // reflow
    el.style.animation = '';
}

// ================= ENTER KEY SUPPORT for all panels =================
document.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter') return;

    const activeInput = document.activeElement;
    if (!activeInput || activeInput.tagName !== 'INPUT') return;

    // Quiz mode
    const quizInput = document.getElementById('quiz-answer-input');
    if (activeInput === quizInput) {
        if (!quizState.answered) submitQuizAnswer();
        else nextQuizQuestion();
        return;
    }

    // Learn mode — find the active panel's calc button
    const activePanel = document.querySelector('.formula-panel.active');
    if (activePanel) {
        const btn = activePanel.querySelector('.calc-btn');
        if (btn) btn.click();
    }
});

// ================================================================
function initDarkMode() {
    if (localStorage.getItem('mu_darkmode') === 'on') {
        document.body.classList.add('dark-mode');
        const btn = document.getElementById('darkModeBtn');
        if (btn) { btn.textContent = '☀️'; btn.setAttribute('aria-pressed', 'true'); }
    }
}
function toggleDarkMode() {
    const isDark = document.body.classList.toggle('dark-mode');
    localStorage.setItem('mu_darkmode', isDark ? 'on' : 'off');
    const btn = document.getElementById('darkModeBtn');
    if (btn) { btn.textContent = isDark ? '☀️' : '🌙'; btn.setAttribute('aria-pressed', String(isDark)); }
}
document.addEventListener('DOMContentLoaded', initDarkMode);

// ================================================================
// ================= SVG MINH HỌA HÌNH HỌC =======================
// ================================================================
// Các hàm vẽ SVG động dựa trên số liệu người dùng nhập, giúp trực quan hóa hình học.

let audioCtx = null;
function getAudioCtx() {
    if (!audioCtx) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (AudioContextClass) audioCtx = new AudioContextClass();
    }
    return audioCtx;
}

function playSound(type) {
    if (localStorage.getItem('mu_sound_off') === 'on') return;
    const ctx = getAudioCtx();
    if (!ctx) return;

    const now = ctx.currentTime;
    if (type === 'correct') {
        // Hai nốt tăng dần, cảm giác vui tai
        [523.25, 659.25].forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.value = freq;
            gain.gain.setValueAtTime(0.15, now + i*0.09);
            gain.gain.exponentialRampToValueAtTime(0.001, now + i*0.09 + 0.2);
            osc.connect(gain).connect(ctx.destination);
            osc.start(now + i*0.09);
            osc.stop(now + i*0.09 + 0.2);
        });
    } else {
        // Một nốt trầm ngắn, nhẹ nhàng không gây khó chịu
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = 196;
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
        osc.connect(gain).connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.25);
    }
}

function toggleSound() {
    const isOff = localStorage.getItem('mu_sound_off') === 'on';
    localStorage.setItem('mu_sound_off', isOff ? 'off' : 'on');
    const btn = document.getElementById('soundToggleBtn');
    if (btn) { btn.textContent = isOff ? '🔊' : '🔇'; btn.setAttribute('aria-pressed', String(!isOff)); }
    if (isOff) playSound('correct'); // phát thử khi bật lại
}

function initSoundBtn() {
    const btn = document.getElementById('soundToggleBtn');
    if (btn) btn.textContent = localStorage.getItem('mu_sound_off') === 'on' ? '🔇' : '🔊';
}
document.addEventListener('DOMContentLoaded', initSoundBtn);

// ================================================================
// ========= CHỐNG BẤM LIÊN TỤC (DEBOUNCE) CHO NÚT "TÍNH" =========
// ================================================================
// Vô hiệu hóa nút trong 300ms sau mỗi lần bấm để tránh double-click
// gây gọi hàm 2 lần liên tiếp (không nguy hiểm về dữ liệu nhưng
// tránh nhấp nháy giao diện và tiết kiệm tính toán không cần thiết).
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.calc-btn').forEach((btn) => {
        btn.addEventListener('click', function guardClick(e) {
            if (this.dataset.locked === '1') {
                e.stopImmediatePropagation();
                e.preventDefault();
                return;
            }
            this.dataset.locked = '1';
            this.style.opacity = '0.7';
            setTimeout(() => { this.dataset.locked = '0'; this.style.opacity = '1'; }, 300);
        }, true); // capture: chạy trước onclick inline nên có thể chặn kịp
    });
});

// ================================================================
// ================= GIỚI THIỆU LẦN ĐẦU (ONBOARDING) ==============
// ================================================================
// Chỉ hiển thị modal giới thiệu tính năng ở lần truy cập đầu tiên,
// dựa vào cờ đánh dấu trong localStorage.
function initOnboarding() {
    if (localStorage.getItem('mu_onboarded') === 'yes') return;
    const modal = document.getElementById('onboarding-modal');
    if (modal) modal.classList.add('open');
}
function closeOnboarding() {
    localStorage.setItem('mu_onboarded', 'yes');
    const modal = document.getElementById('onboarding-modal');
    if (modal) modal.classList.remove('open');
}
document.addEventListener('DOMContentLoaded', initOnboarding);

document.addEventListener('DOMContentLoaded', () => {
    // Cập nhật dashboard chào mừng ngay khi tải trang (màn hình chào hiển thị mặc định)
    updateWelcomeDashboard();
});

// Mặc định chỉ mở nhóm Cấp 1, thu gọn Cấp 2 & 3 để sidebar đỡ rối khi mới vào trang
document.addEventListener('DOMContentLoaded', () => {
    const groups = document.querySelectorAll('#menu-learn .menu-group');
    groups.forEach((g, i) => { if (i > 0) g.classList.add('collapsed'); });
});

// ================================================================
// ============ STREAK HỌC LIÊN TỤC NGÀY (DAILY STREAK) ===========
// ================================================================
// So sánh ngày truy cập gần nhất với hôm nay: nếu là hôm qua -> +1 streak,
// nếu là hôm nay rồi -> giữ nguyên, nếu cách xa hơn -> reset về 1.
function updateDailyStreak() {
    const todayStr = new Date().toISOString().slice(0, 10);
    const lastVisit = localStorage.getItem('mu_last_visit');
    let streak = parseInt(localStorage.getItem('mu_streak_count') || '0');

    if (lastVisit === todayStr) {
        // Đã tính streak hôm nay rồi, không đổi
    } else if (lastVisit) {
        const diffDays = Math.round((new Date(todayStr) - new Date(lastVisit)) / 86400000);
        streak = diffDays === 1 ? streak + 1 : 1;
    } else {
        streak = 1;
    }
    localStorage.setItem('mu_last_visit', todayStr);
    localStorage.setItem('mu_streak_count', String(streak));

    const badge = document.getElementById('streak-badge');
    const countEl = document.getElementById('streak-count');
    if (badge && countEl && streak > 0) {
        countEl.textContent = streak;
        badge.style.display = 'inline-flex';
    }
    return streak;
}
document.addEventListener('DOMContentLoaded', updateDailyStreak);

// ================================================================
// ================= HỆ THỐNG HUY HIỆU (BADGES) ===================
// ================================================================
const BADGE_DEFS = [
    { id: 'first-view',   icon: '👀', name: 'Người Mới',       check: s => s.viewed >= 1 },
    { id: 'explorer-10',  icon: '🌱', name: 'Nhà Khám Phá',    check: s => s.viewed >= 10 },
    { id: 'explorer-25',  icon: '🔥', name: 'Ham Học',         check: s => s.viewed >= 25 },
    { id: 'explorer-all', icon: '🏆', name: 'Bậc Thầy Công Thức', check: s => s.viewed >= 53 },
    { id: 'first-quiz',   icon: '📝', name: 'Chiến Binh Đề Thi', check: s => s.totalQuizzes >= 1 },
    { id: 'quiz-10',      icon: '⚔️', name: 'Luyện Đề Bền Bỉ',  check: s => s.totalQuizzes >= 10 },
    { id: 'perfect-score',icon: '💯', name: 'Điểm Tuyệt Đối',  check: s => s.bestScore >= 10 },
    { id: 'hsg-attempt',  icon: '🎓', name: 'Dám Thử Sức HSG', check: s => s.hsgAttempts >= 1 },
    { id: 'streak-3',     icon: '🔥', name: 'Chuỗi 3 Ngày',    check: s => s.streak >= 3 },
    { id: 'streak-7',     icon: '⚡', name: 'Chuỗi 7 Ngày',    check: s => s.streak >= 7 },
    { id: 'bookmark-5',   icon: '⭐', name: 'Người Sưu Tầm',   check: s => s.bookmarks >= 5 },
];

function computeBadgeStats() {
    const viewed = JSON.parse(localStorage.getItem('mu_viewed_set') || '[]').length;
    const bookmarks = getBookmarks().length;
    const streak = parseInt(localStorage.getItem('mu_streak_count') || '0');
    let totalQuizzes = 0, bestScore = 0, hsgAttempts = 0;
    ['cap1','cap2','cap3'].forEach(l => {
        totalQuizzes += parseInt(localStorage.getItem(`mu_quiz_count_${l}`) || '0');
        bestScore = Math.max(bestScore, parseInt(localStorage.getItem(`mathuniverse_highscore_${l}`) || '0'));
        hsgAttempts += parseInt(localStorage.getItem(`mu_count_${l}_hsg`) || '0');
    });
    return { viewed, bookmarks, streak, totalQuizzes, bestScore, hsgAttempts };
}

function checkAndRenderBadges() {
    const stats = computeBadgeStats();
    const unlocked = JSON.parse(localStorage.getItem('mu_badges') || '[]');
    let newlyUnlocked = [];

    BADGE_DEFS.forEach(b => {
        if (!unlocked.includes(b.id) && b.check(stats)) {
            unlocked.push(b.id);
            newlyUnlocked.push(b);
        }
    });
    if (newlyUnlocked.length > 0) {
        localStorage.setItem('mu_badges', JSON.stringify(unlocked));
        newlyUnlocked.forEach(b => showToast(`🎉 Mở khóa huy hiệu: ${b.icon} ${b.name}!`, 'success'));
    }

    const grid = document.getElementById('badges-grid');
    if (!grid) return;
    if (unlocked.length === 0) {
        grid.innerHTML = '<p class="calc-history-empty">Chưa có huy hiệu nào — bắt đầu học và luyện đề để mở khóa!</p>';
        return;
    }
    grid.innerHTML = BADGE_DEFS.map(b => {
        const has = unlocked.includes(b.id);
        return `<div class="badge-item ${has ? 'earned' : 'locked'}" title="${b.name}">
            <span class="badge-icon">${has ? b.icon : '🔒'}</span>
            <span class="badge-name">${b.name}</span>
        </div>`;
    }).join('');
}

// ================================================================
// ========== BẢNG XẾP HẠNG LỚP HỌC (LƯU TRÊN 1 MÁY DÙNG CHUNG) ===
// ================================================================
let pendingQuizStartCallback = null;
let currentStudentName = localStorage.getItem('mu_last_student_name') || '';

// Được gọi thay cho chooseLevel/startQuiz trực tiếp khi cần hỏi tên trước
function promptStudentNameThenRun(callback) {
    pendingQuizStartCallback = callback;
    document.getElementById('student-name-input').value = currentStudentName;
    document.getElementById('name-prompt-modal').classList.add('open');
}
function confirmStudentName() {
    const name = document.getElementById('student-name-input').value.trim();
    currentStudentName = name;
    localStorage.setItem('mu_last_student_name', name);
    document.getElementById('name-prompt-modal').classList.remove('open');
    if (pendingQuizStartCallback) { pendingQuizStartCallback(); pendingQuizStartCallback = null; }
}

function saveToLeaderboard(level, difficulty, score) {
    if (!currentStudentName) return; // học sinh chọn bỏ trống tên -> không tham gia bảng xếp hạng
    const entries = JSON.parse(localStorage.getItem('mu_leaderboard') || '[]');
    entries.push({ name: currentStudentName, level, difficulty, score, date: new Date().toISOString() });
    if (entries.length > 200) entries.shift();
    localStorage.setItem('mu_leaderboard', JSON.stringify(entries));
}

let leaderboardFilterLevel = 'all';
function openLeaderboard() {
    document.getElementById('leaderboard-modal').classList.add('open');
    renderLeaderboard();
}
function closeLeaderboard(event) {
    if (event && event.target !== event.currentTarget) return;
    document.getElementById('leaderboard-modal').classList.remove('open');
}
function filterLeaderboard(level, btn) {
    leaderboardFilterLevel = level;
    document.querySelectorAll('#leaderboard-modal .fc-filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderLeaderboard();
}
function renderLeaderboard() {
    const entries = JSON.parse(localStorage.getItem('mu_leaderboard') || '[]');
    const filtered = leaderboardFilterLevel === 'all' ? entries : entries.filter(e => e.level === leaderboardFilterLevel);

    // Lấy điểm CAO NHẤT của mỗi học sinh (theo tên) để bảng xếp hạng công bằng, không phụ thuộc số lần làm
    const bestPerStudent = {};
    filtered.forEach(e => {
        const key = e.name;
        if (!bestPerStudent[key] || e.score > bestPerStudent[key].score) bestPerStudent[key] = e;
    });
    const ranked = Object.values(bestPerStudent).sort((a, b) => b.score - a.score).slice(0, 20);

    const list = document.getElementById('leaderboard-list');
    if (ranked.length === 0) {
        list.innerHTML = '<p class="calc-history-empty">Chưa có ai làm bài với tên ở mục này.</p>';
        return;
    }
    const medals = ['🥇', '🥈', '🥉'];
    list.innerHTML = ranked.map((e, i) => `
        <div class="lb-row ${i < 3 ? 'lb-top3' : ''}">
            <span class="lb-rank">${medals[i] || (i+1)}</span>
            <span class="lb-name">${escapeHtml(e.name)}</span>
            <span class="lb-meta">${levelLabels ? levelLabels[e.level] || e.level : e.level}${e.difficulty ? ' · ' + (difficultyLabels ? difficultyLabels[e.difficulty] : e.difficulty) : ''}</span>
            <span class="lb-score">${e.score}/10</span>
        </div>
    `).join('');
}
function clearLeaderboard() {
    if (!confirm('Xóa toàn bộ bảng xếp hạng lớp học? Không thể hoàn tác!')) return;
    localStorage.removeItem('mu_leaderboard');
    renderLeaderboard();
    showToast('Đã xóa bảng xếp hạng.', 'success');
}
function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

// Gọi kiểm tra huy hiệu mỗi khi dashboard cập nhật
const _origUpdateWelcomeDashboard = updateWelcomeDashboard;
updateWelcomeDashboard = function() {
    _origUpdateWelcomeDashboard();
    checkAndRenderBadges();
};