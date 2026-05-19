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
  el.status.textContent = "Could not load self.txt. Run from a local web server in this folder.";
});

async function init() {
  const raw = await loadSourceText();
  const topics = parseTopics(raw);
  state.questions = buildQuestions(topics);
  state.answers = Array(state.questions.length).fill(null);

  if (!state.questions.length) {
    el.status.textContent = "No topics found in self.txt.";
    return;
  }

  buildPartSelector();
  bindEvents();
  renderPart();
  el.status.textContent = `Loaded ${state.questions.length} Gas Turbine questions.`;
}

async function loadSourceText() {
  const response = await fetch("self.txt");
  if (!response.ok) {
    throw new Error(`Failed to load self.txt (${response.status}).`);
  }
  return response.text();
}

function parseTopics(raw) {
  const lines = raw.split(/\r?\n/);
  const topics = [];
  let current = null;

  for (const rawLine of lines) {
    const line = normalize(rawLine);
    if (!line) {
      continue;
    }

    const headingMatch = line.match(/^(\d+)\.\s+(.+)$/);
    if (headingMatch) {
      finalizeTopic(topics, current);
      current = {
        number: Number(headingMatch[1]),
        title: normalize(headingMatch[2]),
        body: []
      };
      continue;
    }

    if (current) {
      current.body.push(line);
    }
  }

  finalizeTopic(topics, current);
  return topics;
}

function finalizeTopic(target, current) {
  if (!current || !current.title || current.body.length === 0) {
    return;
  }

  target.push({
    number: current.number,
    title: current.title,
    answer: normalize(current.body.join(" "))
  });
}

function buildQuestions(topics) {
  const answerPool = topics.map((topic) => topic.answer);

  return topics.map((topic, index) => {
    const distractors = pickRandomDistinct(
      answerPool.filter((answer) => answer !== topic.answer),
      3
    );

    const options = [topic.answer, ...distractors];
    shuffleInPlace(options);

    return {
      text: `${index + 1}. ${topic.title}`,
      options,
      correctIndex: options.indexOf(topic.answer)
    };
  });
}

function pickRandomDistinct(pool, count) {
  const unique = Array.from(new Set(pool));
  shuffleInPlace(unique);
  return unique.slice(0, Math.min(count, unique.length));
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
