const editorArea = document.getElementById("editorArea");
const summaryContent = document.getElementById("summaryContent");
const rewriteContent = document.getElementById("rewriteContent");
const analyzeBtn = document.getElementById("analyzeBtn");

let appState = {
  resumeJson: null,
  benchmarkResult: null,
};

analyzeBtn.addEventListener("click", async () => {
  try {
    const response = await fetch("http://127.0.0.1:8000/mock-analysis");

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();
    console.log("Fetched data:", data);

    appState.resumeJson = data.resume_json;
    appState.benchmarkResult = data.benchmark;

    renderBenchmark();
    renderEditor();
  } catch (error) {
    console.error("Error fetching analysis:", error);
    summaryContent.innerHTML = `<p>Failed to load analysis: ${error.message}</p>`;
  }
});

function renderBenchmark() {
  const benchmark = appState.benchmarkResult;

  summaryContent.innerHTML = `
    <p><strong>Category:</strong> ${benchmark.overall_category}</p>
    <p><strong>Reasoning:</strong> ${benchmark.overall_reasoning}</p>
  `;
}

function renderEditor() {
  const resumeJson = appState.resumeJson;
  const weakBulletMap = new Map(
    appState.benchmarkResult.weak_bullets.map(item => [item.bullet_id, item.reason])
  );

  editorArea.innerHTML = "";

  resumeJson.sections.forEach(section => {
    const sectionEl = document.createElement("div");
    sectionEl.className = "resume-section";

    sectionEl.innerHTML = `<h3>${section.section_name}</h3>`;

    section.entries.forEach(entry => {
      const entryEl = document.createElement("div");
      entryEl.className = "resume-entry";

      entryEl.innerHTML = `
        <strong>${entry.title}</strong>
        <div>${entry.organization || ""}</div>
      `;

      entry.bullets.forEach(bullet => {
        const bulletEl = document.createElement("div");
        const isWeak = weakBulletMap.has(bullet.bullet_id);

        bulletEl.className = `resume-bullet ${isWeak ? "weak" : ""}`;
        bulletEl.contentEditable = true;
        bulletEl.textContent = `• ${bullet.text}`;

        bulletEl.addEventListener("input", (e) => {
            const updatedText = e.target.textContent.replace(/^•\s*/, "").trim();
            bullet.text = updatedText;
        });

        if (isWeak) {
            bulletEl.addEventListener("click", () => {
            showRewritePanel(bullet.text, weakBulletMap.get(bullet.bullet_id));
            });
        }

        entryEl.appendChild(bulletEl);
        });

      sectionEl.appendChild(entryEl);
    });

    editorArea.appendChild(sectionEl);
  });
}

function showRewritePanel(originalText, reason) {
  rewriteContent.innerHTML = `
    <p><strong>Selected bullet:</strong></p>
    <p>${originalText}</p>
    <p><strong>Why it is weak:</strong></p>
    <p>${reason}</p>
    <hr />
    <p>Rewrite suggestions will appear here later.</p>
  `;
}