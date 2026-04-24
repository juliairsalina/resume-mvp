const editorArea = document.getElementById("editorArea");
const summaryContent = document.getElementById("summaryContent");
const rewriteContent = document.getElementById("rewriteContent");
const analyzeBtn = document.getElementById("analyzeBtn");
const reevaluateBtn = document.getElementById("reevaluateBtn");
console.log("Reevaluate button found:", reevaluateBtn);
const previewArea = document.getElementById("previewArea");

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

reevaluateBtn.addEventListener("click", () => {
  console.log("Re-evaluate button clicked");
  reevaluateResume();
});

function renderBenchmark() {
  const benchmark = appState.benchmarkResult;

  summaryContent.innerHTML = `
    <p><strong>Category:</strong> ${benchmark.overall_category}</p>
    <p><strong>Weak bullets:</strong> ${benchmark.weak_bullets.length}</p>
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

          console.log("Updated bullet:", bullet.bullet_id, bullet.text);
          renderPreview();
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

async function showRewritePanel(originalText, reason) {
  rewriteContent.innerHTML = "<p>Loading suggestions...</p>";

  try {
    const response = await fetch("http://127.0.0.1:8000/rewrite", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        target_role: document.getElementById("targetRole").value,
        target_level: document.getElementById("targetLevel").value,
        bullet_id: "",
        original_text: originalText,
        weakness_reason: reason,
        missing_keywords: []
      })
    });

    const data = await response.json();

    rewriteContent.innerHTML = `
      <p><strong>Original:</strong></p>
      <p>${originalText}</p>
      <hr />
    `;

    data.suggestions.forEach(s => {
      const block = document.createElement("div");

      block.innerHTML = `
        <p>${s.rewritten_text}</p>
        <button>Select</button>
        <hr />
      `;

      block.querySelector("button").addEventListener("click", () => {
        applyRewrite(originalText, s.rewritten_text);
      });

      rewriteContent.appendChild(block);
    });

  } catch (err) {
    rewriteContent.innerHTML = "<p>Error loading suggestions</p>";
    console.error(err);
  }
}

async function reevaluateResume() {
  try {
    console.log("Sending updated resume JSON:", appState.resumeJson);

    const response = await fetch("http://127.0.0.1:8000/reevaluate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        target_role: document.getElementById("targetRole").value,
        target_level: document.getElementById("targetLevel").value,
        resume_json: appState.resumeJson
      })
    });

    const data = await response.json();
    console.log("Re-evaluation result:", data);

    appState.benchmarkResult = data.benchmark;

    renderBenchmark();
    renderEditor();
    renderPreview();

  } catch (error) {
    console.error("Re-evaluate error:", error);
  }
}

function applyRewrite(oldText, newText) {
  appState.resumeJson.sections.forEach(section => {
    section.entries.forEach(entry => {
      entry.bullets.forEach(bullet => {
        if (bullet.text === oldText) {
          bullet.text = newText;
        }
      });
    });
  });

  renderEditor();
  renderPreview();

}

function renderPreview() {
  const resumeJson = appState.resumeJson;

  if (!resumeJson) {
    previewArea.innerHTML = "<p>No resume preview yet.</p>";
    return;
  }

  previewArea.innerHTML = `
    <div class="resume-page">
      ${resumeJson.sections.map(section => `
        <section class="preview-section">
          <h3>${section.section_name}</h3>

          ${section.entries.map(entry => `
            <div class="preview-entry">
              <strong>${entry.title}</strong>
              <p>${entry.organization || ""}</p>

              <ul>
                ${entry.bullets.map(bullet => `
                  <li>${bullet.text}</li>
                `).join("")}
              </ul>
            </div>
          `).join("")}
        </section>
      `).join("")}
    </div>
  `;
}