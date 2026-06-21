let data = { name: "", summary: "", exp: [] };

function save() {
    data.name = document.getElementById('name').value;
    data.summary = document.getElementById('summary').value;
    localStorage.setItem('arch-data', JSON.stringify(data));
    render();
}

function addExp() {
    data.exp.push({ id: Date.now(), role: "", company: "", desc: "" });
    save();
}

function updateExp(id, field, val) {
    const item = data.exp.find(e => e.id == id);
    item[field] = val;
    save();
}

function deleteExp(id) {
    data.exp = data.exp.filter(e => e.id != id);
    save();
}

// MOCK AI FUNCTION
async function optimizeWithAI(id, buttonEl) {
    const item = data.exp.find(e => e.id == id);
    if (!item.desc) return alert("Write something first!");
    
    buttonEl.innerText = "Optimizing...";
    buttonEl.disabled = true;

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simple transformation logic (This is where the API call will go)
    item.desc = "Strategically led " + item.desc + ", increasing efficiency by 20% and optimizing workflow performance.";
    
    buttonEl.innerText = "Optimize";
    buttonEl.disabled = false;
    save();
}

function show(id) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('nav button').forEach(b => b.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    document.getElementById('tab-' + (id === 'edit' ? 'edit' : 'prev')).classList.add('active');
    render();
}

function render() {
    document.getElementById('p-name').innerText = data.name || "Your Name";
    document.getElementById('p-summary').innerText = data.summary;
    
    const container = document.getElementById('exp-container');
    container.innerHTML = "";
    data.exp.forEach(e => {
        container.innerHTML += `
            <div style="background:#0f172a; padding:15px; margin-bottom:15px; border-radius:6px;">
                <input value="${e.role}" placeholder="Role" oninput="updateExp(${e.id}, 'role', this.value)">
                <input value="${e.company}" placeholder="Company" oninput="updateExp(${e.id}, 'company', this.value)">
                <textarea placeholder="Description" oninput="updateExp(${e.id}, 'desc', this.value)">${e.desc}</textarea>
                <button class="ai-btn" onclick="optimizeWithAI(${e.id}, this)">✨ Optimize with AI</button>
                <button onclick="deleteExp(${e.id})" style="background:#ef4444; padding:5px; font-size:12px; width: 100%;">Delete</button>
            </div>
        `;
    });

    document.getElementById('p-exp').innerHTML = data.exp.map(e => `
        <div class="job-item">
            <div class="res-title">${e.role}</div>
            <div><strong>${e.company}</strong></div>
            <p>${e.desc}</p>
        </div>
    `).join('');
}

// Init
const saved = localStorage.getItem('arch-data');
if (saved) {
    data = JSON.parse(saved);
    document.getElementById('name').value = data.name;
    document.getElementById('summary').value = data.summary;
}
render();
