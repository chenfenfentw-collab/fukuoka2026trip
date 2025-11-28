// 初始化資料 (從 PDF 解析)
const initialItinerary = [
    { day: "Day 1", time: "03:20", loc: "出發", desc: "前往機場 T1 報到 (04:00)", img: "" },
    { day: "Day 1", time: "06:45", loc: "飛行", desc: "虎航 IT240 (10:00 抵達福岡)", img: "" },
    { day: "Day 1", time: "11:30", loc: "福岡市區", desc: "前往市區，兌換西鐵柳川太宰府套票", img: "" },
    [cite_start]{ day: "Day 1", time: "12:00", loc: "博多東急REI酒店", desc: "抵達飯店 / 寄放行李 [cite: 8, 9]", img: "" },
    [cite_start]{ day: "Day 1", time: "12:30", loc: "博多車站", desc: "逛街。午餐: Shin-Shin 拉麵 KITTE博多店。晚餐: ?毛和牛 博多牛???武? [cite: 10, 11, 12]", img: "" },
    [cite_start]{ day: "Day 2", time: "07:40", loc: "福岡東方酒店Lawson", desc: "集合找 GOGODAY 旗子 (博多站筑紫口前) [cite: 14, 15, 16]", img: "" },
    [cite_start]{ day: "Day 2", time: "10:00", loc: "熊本城", desc: "門票 ?800，自由活動 1HR 50min [cite: 18, 19, 20]", img: "" },
    [cite_start]{ day: "Day 2", time: "13:10", loc: "阿蘇山&草千里", desc: "阿蘇中嶽火山口、草千里珈琲焙煎所、阿蘇火山博物館 [cite: 21, 23, 24]", img: "" },
    [cite_start]{ day: "Day 2", time: "18:00", loc: "返回博多", desc: "預估 19:30 抵達東方酒店 [cite: 28, 29]", img: "" },
    [cite_start]{ day: "Day 3", time: "09:10", loc: "星乃咖啡", desc: "KITTE博多店早餐 [cite: 32, 33]", img: "" },
    [cite_start]{ day: "Day 3", time: "10:30", loc: "住吉神社", desc: "步行15分，參拜40分 [cite: 34, 35, 36]", img: "" },
    [cite_start]{ day: "Day 3", time: "11:30", loc: "博多運河城", desc: "午餐+逛街 [cite: 37]", img: "" },
    [cite_start]{ day: "Day 3", time: "16:00", loc: "博多車站/屋台", desc: "晚餐與體驗 [cite: 38]", img: "" },
    [cite_start]{ day: "Day 4", time: "09:40", loc: "福岡東方酒店Lawson", desc: "集合出發 [cite: 40, 41]", img: "" },
    [cite_start]{ day: "Day 4", time: "11:30", loc: "唐戶市場", desc: "午餐+逛街 1hr [cite: 45, 46]", img: "" },
    [cite_start]{ day: "Day 4", time: "14:00", loc: "元乃隅神社", desc: "自由活動 1hr [cite: 48, 49]", img: "" },
    [cite_start]{ day: "Day 4", time: "17:30", loc: "皿倉山", desc: "自由活動 90min [cite: 50, 51]", img: "" },
    [cite_start]{ day: "Day 5", time: "09:00", loc: "出發", desc: "寄放行李，前往天神(西鐵) [cite: 55, 56]", img: "" },
    [cite_start]{ day: "Day 5", time: "10:50", loc: "柳川遊船", desc: "遊船60分鐘，午餐可在此或太宰府 [cite: 59, 60, 61]", img: "" },
    [cite_start]{ day: "Day 5", time: "14:30", loc: "太宰府天滿宮", desc: "參拜散策 [cite: 63]", img: "" },
    [cite_start]{ day: "Day 5", time: "21:00", loc: "西鐵Croom酒店", desc: "櫛田神社前 Check in [cite: 66, 67]", img: "" },
    [cite_start]{ day: "Day 6", time: "10:20", loc: "東長寺", desc: "參拜 50min [cite: 70, 71]", img: "" },
    [cite_start]{ day: "Day 6", time: "11:20", loc: "櫛田神社&川端通", desc: "參拜、午餐、御朱印 [cite: 72, 73, 75]", img: "" },
    [cite_start]{ day: "Day 6", time: "13:00", loc: "天神商圈", desc: "逛街 [cite: 76]", img: "" },
    [cite_start]{ day: "Day 6", time: "18:00", loc: "博多車站", desc: "吃燒肉 [cite: 77]", img: "" },
    [cite_start]{ day: "Day 7", time: "10:00", loc: "大濠公園/福岡城", desc: "散策 2hr [cite: 81, 82]", img: "" },
    [cite_start]{ day: "Day 7", time: "13:00", loc: "志成烏龍麵", desc: "必比登午餐 [cite: 83]", img: "" },
    [cite_start]{ day: "Day 7", time: "14:30", loc: "天神&藥院", desc: "用力逛 & 補貨 [cite: 84, 85]", img: "" },
    [cite_start]{ day: "Day 8", time: "10:30", loc: "櫛田神社", desc: "祈福 [cite: 89]", img: "" },
    [cite_start]{ day: "Day 8", time: "11:10", loc: "博多車站", desc: "午餐: 博多海鮮料理 喜水丸 [cite: 91, 92]", img: "" },
    [cite_start]{ day: "Day 8", time: "14:15", loc: "前往機場", desc: "報到虎航 IT 721 (17:55起飛) [cite: 95, 97, 98]", img: "" }
];

// 狀態管理
let data = {
    itinerary: JSON.parse(localStorage.getItem('trip_itinerary')) || initialItinerary,
    expenses: JSON.parse(localStorage.getItem('trip_expenses')) || [],
    notes: JSON.parse(localStorage.getItem('trip_notes')) || []
};

// 儲存 helper
const save = () => {
    localStorage.setItem('trip_itinerary', JSON.stringify(data.itinerary));
    localStorage.setItem('trip_expenses', JSON.stringify(data.expenses));
    localStorage.setItem('trip_notes', JSON.stringify(data.notes));
    renderAll();
};

// 分類清單
const expenseCats = ["交通", "餐飲", "土產", "無用紀念品", "住宿", "生活補貨", "門票", "旅行必要費"];

// 渲染函式
function renderAll() {
    renderItinerary();
    renderExpenses();
    renderNotes();
}

function renderItinerary() {
    const container = document.getElementById('itinerary-list');
    container.innerHTML = '';
    
    // Group by Day
    let currentDay = '';
    data.itinerary.forEach((item, index) => {
        if(item.day !== currentDay) {
            currentDay = item.day;
            container.innerHTML += `<div class="day-header"><h3>${currentDay}</h3></div>`;
        }
        
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="time-loc">
                <span>${item.time}</span>
                <span>${item.loc}</span>
            </div>
            <div class="desc">${item.desc}</div>
            ${item.img ? `<img src="${item.img}" class="img-preview">` : ''}
            <a href="https://www.google.com/maps/search/?api=1&query=${item.loc} 福岡" target="_blank" class="map-link">?? 在地圖上查看</a>
            <button class="btn-delete" onclick="deleteItem('itinerary', ${index})">刪除</button>
        `;
        container.appendChild(card);
    });
}

function renderExpenses() {
    const container = document.getElementById('expense-list');
    const totalEl = document.getElementById('total-amount');
    container.innerHTML = '';
    
    let totalTWD = 0;
    
    // 反序排列 (新的在上面)
    data.expenses.slice().reverse().forEach((item, revIndex) => {
        const realIndex = data.expenses.length - 1 - revIndex;
        // 匯率簡化估算 JPY to TWD (0.22)
        const amountTWD = item.currency === 'JPY' ? Math.round(item.amount * 0.22) : item.amount;
        totalTWD += amountTWD;
        
        const div = document.createElement('div');
        div.className = 'expense-item';
        div.innerHTML = `
            <div>
                <div style="font-weight:bold">${item.cat}</div>
                <div style="font-size:0.8em; color:gray">${item.date} | ${item.pay}</div>
            </div>
            <div style="text-align:right">
                <div style="font-weight:bold">${item.amount} ${item.currency}</div>
                <div style="font-size:0.8em; color:gray">? NT$${amountTWD}</div>
                <button class="btn-delete" onclick="deleteItem('expense', ${realIndex})">x</button>
            </div>
        `;
        container.appendChild(div);
    });
    
    totalEl.innerText = `NT$${totalTWD.toLocaleString()}`;
}

function renderNotes() {
    const container = document.getElementById('notes-list');
    container.innerHTML = '';
    
    data.notes.forEach((note, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div style="white-space: pre-wrap;">${note.content}</div>
            ${note.img ? `<img src="${note.img}" class="img-preview">` : ''}
             <button class="btn-delete" onclick="deleteItem('note', ${index})">刪除</button>
        `;
        container.appendChild(card);
    });
}

// 刪除邏輯
function deleteItem(type, index) {
    if(!confirm("確定刪除嗎？")) return;
    if(type === 'itinerary') data.itinerary.splice(index, 1);
    if(type === 'expense') data.expenses.splice(index, 1);
    if(type === 'note') data.notes.splice(index, 1);
    save();
}

// Modal 邏輯
function openModal(type) {
    const modal = document.getElementById('modal');
    const content = document.getElementById('modal-content');
    const title = document.getElementById('modal-title');
    
    modal.style.display = 'block';
    
    if(type === 'itinerary') {
        title.innerText = "新增行程";
        content.innerHTML = `
            <input type="text" id="inp-day" placeholder="Day (e.g., Day 1)" value="Day ">
            <input type="time" id="inp-time">
            <input type="text" id="inp-loc" placeholder="地點">
            <textarea id="inp-desc" rows="3" placeholder="說明"></textarea>
            <input type="file" id="inp-img" accept="image/*">
            <button class="btn-primary" onclick="addItem('itinerary')">新增</button>
        `;
    } else if (type === 'expense') {
        title.innerText = "記一筆";
        let catOptions = expenseCats.map(c => `<option value="${c}">${c}</option>`).join('');
        content.innerHTML = `
            <input type="date" id="inp-date" value="${new Date().toISOString().split('T')[0]}">
            <select id="inp-cat">${catOptions}</select>
            <div style="display:flex; gap:5px">
                <input type="number" id="inp-amount" placeholder="金額" style="flex:2">
                <select id="inp-curr" style="flex:1">
                    <option value="JPY">JPY</option>
                    <option value="TWD">TWD</option>
                </select>
            </div>
            <select id="inp-pay">
                <option value="現金">現金</option>
                <option value="信用卡">信用卡</option>
                <option value="IC卡/Pay">IC卡/Pay</option>
            </select>
            <button class="btn-primary" onclick="addItem('expense')">新增</button>
        `;
    } else if (type === 'note') {
        title.innerText = "新增筆記";
        content.innerHTML = `
            <textarea id="inp-note-content" rows="5" placeholder="輸入備忘事項..."></textarea>
            <input type="file" id="inp-img" accept="image/*">
            <button class="btn-primary" onclick="addItem('note')">儲存</button>
        `;
    }
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

async function addItem(type) {
    if(type === 'itinerary') {
        const imgInput = document.getElementById('inp-img');
        let imgData = "";
        if(imgInput.files[0]) imgData = await toBase64(imgInput.files[0]);
        
        data.itinerary.push({
            day: document.getElementById('inp-day').value,
            time: document.getElementById('inp-time').value,
            loc: document.getElementById('inp-loc').value,
            desc: document.getElementById('inp-desc').value,
            img: imgData
        });
        // Sort itinerary by Day then Time
        data.itinerary.sort((a, b) => a.day.localeCompare(b.day) || a.time.localeCompare(b.time));
    } else if (type === 'expense') {
        data.expenses.push({
            date: document.getElementById('inp-date').value,
            cat: document.getElementById('inp-cat').value,
            amount: parseFloat(document.getElementById('inp-amount').value),
            currency: document.getElementById('inp-curr').value,
            pay: document.getElementById('inp-pay').value
        });
    } else if (type === 'note') {
        const imgInput = document.getElementById('inp-img');
        let imgData = "";
        if(imgInput.files[0]) imgData = await toBase64(imgInput.files[0]);
        
        data.notes.push({
            content: document.getElementById('inp-note-content').value,
            img: imgData
        });
    }
    
    save();
    closeModal();
}

// 圖片轉 Base64
const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

// UI 切換
function switchView(viewName) {
    document.querySelectorAll('.view').forEach(el => el.classList.remove('active'));
    document.getElementById(`view-${viewName}`).classList.add('active');
    
    document.querySelectorAll('nav button').forEach(el => el.classList.remove('active'));
    document.getElementById(`nav-${viewName}`).classList.add('active');
    
    document.getElementById('page-title').innerText = 
        viewName === 'itinerary' ? '每日行程' : 
        viewName === 'expenses' ? '記帳本' : '備忘錄';
}

// 主題切換
function toggleTheme() {
    const body = document.body;
    if(body.getAttribute('data-theme') === 'dark') {
        body.removeAttribute('data-theme');
    } else {
        body.setAttribute('data-theme', 'dark');
    }
}

// 天氣功能 (福岡座標)
async function fetchWeather() {
    const widget = document.getElementById('weather-widget');
    try {
        const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=33.59&longitude=130.40&current_weather=true&timezone=Asia%2FTokyo');
        const wData = await res.json();
        const temp = wData.current_weather.temperature;
        const code = wData.current_weather.weathercode;
        // 簡易天氣代碼對照
        let condition = "晴";
        if(code > 3) condition = "多雲";
        if(code > 50) condition = "雨";
        
        widget.style.display = 'block';
        widget.innerText = `福岡目前天氣: ${temp}°C (${condition})`;
    } catch (e) {
        widget.style.display = 'none'; // 離線或錯誤時隱藏
    }
}

// 啟動
renderAll();
fetchWeather();
