const editorArea = document.getElementById("editorArea");
const summaryContent = document.getElementById("summaryContent");
const rewriteContent = document.getElementById("rewriteContent");
const analyzeBtn = document.getElementById("analyzeBtn");

let appState = {
  resumeJson: null,
  benchmarkResult: null,
};

const mockResponse = {
  resume_json: {
    sections: [
      {
        section_id: "experience",
        section_name: "Experience",
        entries: [
          {
            entry_id: "exp1",
            title: "Data Intern",
            organization: "ABC Company",
            bullets: [
              {
                bullet_id: "b1",
                text: "Worked on sales data analysis."
              },
              {
                bullet_id: "b2",
                text: "Created weekly reports for the team."
              }
            ]
          }
        ]
      },
      {
        section_id: "projects",
        section_name: "Projects",
        entries: [
          {
            entry_id: "proj1",
            title: "Customer Churn Analysis",
            organization: "University Project",
            bullets: [
              {
                bullet_id: "b3",
                text: "Built a machine learning model to predict churn."
              }
            ]
          }
        ]
      }
    ]
  },
  benchmark: {
    overall_category: "중",
    overall_reasoning: "The resume shows relevant work and project experience, but several bullets are too generic and lack measurable impact.",
    weak_bullets: [
      {
        bullet_id: "b1",
        reason: "Too vague and lacks tools, methods, or measurable results."
      },
      {
        bullet_id: "b2",
        reason: "Describes a task but not the outcome or value."
      }
    ]
  }
};

analyzeBtn.addEventListener("click", () => {
  appState.resumeJson = mockResponse.resume_json;
  appState.benchmarkResult = mockResponse.benchmark;

  renderBenchmark();
  renderEditor();
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
        bulletEl.textContent = `• ${bullet.text}`;

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