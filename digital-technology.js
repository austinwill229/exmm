const QUESTIONS_PER_PART = 15;

const state = {
  questions: [],
  answers: [],
  checkedParts: new Set(),
  currentPart: 0
};

const el = {
  partSelect: document.getElementById("partSelect"),
  partProgress: document.getElementById("partProgress"),
  partScore: document.getElementById("partScore"),
  questionList: document.getElementById("questionList"),
  status: document.getElementById("status"),
  prevBtn: document.getElementById("prevBtn"),
  nextBtn: document.getElementById("nextBtn"),
  randomizeBtn: document.getElementById("randomizeBtn"),
  checkBtn: document.getElementById("checkBtn"),
  resetBtn: document.getElementById("resetBtn")
};

init().catch((error) => {
  console.error(error);
  el.status.textContent = "Could not load Lectures_1_5_Questions.docx. Run from a local web server in this folder.";
});

async function init() {
  const raw = await loadDocxText();
  state.questions = parseQuestions(raw);
  state.answers = Array(state.questions.length).fill(null);

  if (!state.questions.length) {
    el.status.textContent = "No questions found in Lectures_1_5_Questions.docx.";
    return;
  }

  buildPartSelector();
  bindEvents();
  renderPart();
  el.status.textContent = `Loaded ${state.questions.length} Digital Technology questions.`;
}

async function loadDocxText() {
  if (typeof JSZip === "undefined") {
    throw new Error("JSZip failed to load.");
  }

  const response = await fetch("Lectures_1_5_Questions.docx");
  if (!response.ok) {
    throw new Error(`Failed to load DOCX file (${response.status}).`);
  }

  const arrayBuffer = await response.arrayBuffer();
  const zip = await JSZip.loadAsync(arrayBuffer);
  const xml = await zip.file("word/document.xml").async("text");
  return xmlToParagraphText(xml);
}

function xmlToParagraphText(xml) {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xml, "application/xml");
  const paragraphs = Array.from(xmlDoc.getElementsByTagNameNS("*", "p"));

  return paragraphs
    .map((paragraph) =>
      Array.from(paragraph.getElementsByTagNameNS("*", "t"))
        .map((node) => node.textContent || "")
        .join("")
        .trim()
    )
    .filter(Boolean)
    .join("\n");
}

function parseQuestions(raw) {
  const lines = raw.split(/\r?\n/);
  const parsed = [];
  let current = null;

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) {
      continue;
    }

    if (/^<question\d*>/.test(line)) {
      finalizeCurrentQuestion(parsed, current);
      current = {
        text: normalize(line.replace(/^<question\d*>/, "")),
        variants: []
      };
      continue;
    }

    if (line.startsWith("<variant>")) {
      if (!current) {
        continue;
      }
      current.variants.push(normalize(line.replace("<variant>", "")));
      continue;
    }

    if (!current) {
      continue;
    }

    if (current.variants.length === 0) {
      current.text = normalize(`${current.text} ${line}`);
    } else {
      const i = current.variants.length - 1;
      current.variants[i] = normalize(`${current.variants[i]} ${line}`);
    }
  }

  finalizeCurrentQuestion(parsed, current);
  return parsed;
}

function finalizeCurrentQuestion(target, current) {
  if (!current || !current.text || current.variants.length < 2) {
    return;
  }

  target.push({
    text: current.text,
    options: current.variants.slice(),
    correctIndex: 0
  });
}

function normalize(value) {
  return value.replace(/\s+/g, " ").trim();
}

function bindEvents() {
  el.partSelect.addEventListener("change", () => {
    state.currentPart = Number(el.partSelect.value);
    renderPart();
  });

  el.prevBtn.addEventListener("click", () => {
    if (state.currentPart > 0) {
      state.currentPart -= 1;
      renderPart();
    }
  });

  el.nextBtn.addEventListener("click", () => {
    const maxPart = getPartCount() - 1;
    if (state.currentPart < maxPart) {
      state.currentPart += 1;
      renderPart();
    }
  });

  el.randomizeBtn.addEventListener("click", () => {
    randomizePartOptions(state.currentPart);
    state.checkedParts.delete(state.currentPart);
    renderPart();
    el.status.textContent = `Answer options shuffled for part ${state.currentPart + 1}.`;
  });

  el.checkBtn.addEventListener("click", () => {
    state.checkedParts.add(state.currentPart);
    renderPart();
    const { correct, total } = scorePart(state.currentPart);
    el.status.textContent = `Checked part ${state.currentPart + 1}: ${correct} / ${total} correct.`;
  });

  el.resetBtn.addEventListener("click", () => {
    const indices = getIndicesForPart(state.currentPart);
    for (const index of indices) {
      state.answers[index] = null;
    }
    state.checkedParts.delete(state.currentPart);
    renderPart();
    el.status.textContent = `Part ${state.currentPart + 1} has been reset.`;
  });
}

function buildPartSelector() {
  const parts = getPartCount();
  el.partSelect.innerHTML = "";

  for (let part = 0; part < parts; part += 1) {
    const option = document.createElement("option");
    option.value = String(part);
    option.textContent = `Part ${part + 1}`;
    el.partSelect.append(option);
  }
}

function getPartCount() {
  return Math.ceil(state.questions.length / QUESTIONS_PER_PART);
}

function getIndicesForPart(part) {
  const start = part * QUESTIONS_PER_PART;
  const end = Math.min(start + QUESTIONS_PER_PART, state.questions.length);
  return Array.from({ length: end - start }, (_, i) => start + i);
}

function scorePart(part) {
  const indices = getIndicesForPart(part);
  let correct = 0;

  for (const i of indices) {
    const selected = state.answers[i];
    if (selected === state.questions[i].correctIndex) {
      correct += 1;
    }
  }

  return { correct, total: indices.length };
}

function renderPart() {
  el.partSelect.value = String(state.currentPart);

  const indices = getIndicesForPart(state.currentPart);
  const checked = state.checkedParts.has(state.currentPart);
  el.questionList.innerHTML = "";

  for (const index of indices) {
    const q = state.questions[index];
    const item = document.createElement("li");
    item.className = "question-item";

    const text = document.createElement("p");
    text.className = "question-text";
    text.textContent = q.text;
    item.append(text);

    const options = document.createElement("ul");
    options.className = "options";

    q.options.forEach((option, optionIndex) => {
      const optionItem = document.createElement("li");
      const label = document.createElement("label");
      const input = document.createElement("input");
      input.type = "radio";
      input.name = `q-${index}`;
      input.checked = state.answers[index] === optionIndex;
      input.addEventListener("change", () => {
        state.answers[index] = optionIndex;
        updateMetrics();
      });

      const span = document.createElement("span");
      span.textContent = option;

      label.append(input, span);
      optionItem.append(label);
      options.append(optionItem);
    });

    item.append(options);

    if (checked) {
      const selected = state.answers[index];
      const isCorrect = selected === q.correctIndex;
      item.classList.add(isCorrect ? "correct" : "wrong");

      const feedback = document.createElement("p");
      feedback.className = `feedback ${isCorrect ? "good" : "bad"}`;
      feedback.textContent = isCorrect
        ? "Correct"
        : `Correct answer: ${q.options[q.correctIndex]}`;
      item.append(feedback);
    }

    el.questionList.append(item);
  }

  el.prevBtn.disabled = state.currentPart === 0;
  el.nextBtn.disabled = state.currentPart === getPartCount() - 1;

  updateMetrics();
}

function updateMetrics() {
  const indices = getIndicesForPart(state.currentPart);
  const answered = indices.filter((i) => state.answers[i] !== null).length;
  el.partProgress.textContent = `${answered} / ${indices.length} answered`;

  if (state.checkedParts.has(state.currentPart)) {
    const { correct, total } = scorePart(state.currentPart);
    el.partScore.textContent = `${correct} / ${total}`;
  } else {
    el.partScore.textContent = "Not checked yet";
  }
}

function randomizePartOptions(part) {
  const indices = getIndicesForPart(part);

  for (const i of indices) {
    const q = state.questions[i];
    const selected = state.answers[i];

    const bundled = q.options.map((text, optionIndex) => ({
      text,
      isCorrect: optionIndex === q.correctIndex,
      isSelected: optionIndex === selected
    }));

    shuffleInPlace(bundled);

    q.options = bundled.map((entry) => entry.text);
    q.correctIndex = bundled.findIndex((entry) => entry.isCorrect);

    const newSelected = bundled.findIndex((entry) => entry.isSelected);
    state.answers[i] = newSelected === -1 ? null : newSelected;
  }
}

function shuffleInPlace(list) {
  for (let i = list.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [list[i], list[j]] = [list[j], list[i]];
  }
}
