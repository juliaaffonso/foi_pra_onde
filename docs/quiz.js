// quiz.js

// Example questions
const questions = [
  {
    q: "Quem é a cantora que a ex-presidente Dilma Rousseff se encontrou?",
    hint: 'Ela é colombiana!',
    a: "Shakira"
  },
  {
    q: "Quantas vezes o Palácio do Planalto é mencionado nas agendas presidenciais?",
    hint: 'É um número na casa dos milhares',
    a: null // will be computed
  }
];

// Count Palácio do Planalto mentions in multiple files
async function countPlanalto() {
  const files = ["data/all_data.json", "data/bolsonaro_agenda.json", "data/agenda_dilma_final.json", "data/temer_agenda.json"];
  let total = 0;

  for (let file of files) {
    const data = await d3.json(file);
    total += data.filter(d => d.local && d.local.toLowerCase().includes("palácio do planalto")).length;
  }

  return total;
}

// 🔹 Simple string similarity (Levenshtein distance based)
function similarity(a, b) {
  a = a.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // remove accents
  b = b.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  const longer = a.length > b.length ? a : b;
  const shorter = a.length > b.length ? b : a;

  const longerLength = longer.length;
  if (longerLength === 0) return 1.0;

  return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
}

function editDistance(s1, s2) {
  const costs = [];
  for (let i = 0; i <= s1.length; i++) {
    let lastValue = i;
    for (let j = 0; j <= s2.length; j++) {
      if (i === 0)
        costs[j] = j;
      else {
        if (j > 0) {
          let newValue = costs[j - 1];
          if (s1.charAt(i - 1) !== s2.charAt(j - 1))
            newValue = Math.min(Math.min(newValue, lastValue),
              costs[j]) + 1;
          costs[j - 1] = lastValue;
          lastValue = newValue;
        }
      }
    }
    if (i > 0)
      costs[s2.length] = lastValue;
  }
  return costs[s2.length];
}

// Initialize quiz
async function initQuiz() {
  const planaltoCount = await countPlanalto();
  questions[1].a = String(planaltoCount);

  const randomQuestion = questions[Math.floor(Math.random() * questions.length)];

  const quizDiv = d3.select("#quiz-container");
  quizDiv.html(""); // clear everything inside
  quizDiv.append("h2").text("Quiz Section"); // keep title

  quizDiv.append("h3").text(randomQuestion.q);

  // Check for a hint and display it if it exists
  if (randomQuestion.hint) {
    quizDiv.append("p")
      .attr("class", "quiz-hint") // Add a class for styling
      .text(randomQuestion.hint);
  }

  const input = quizDiv.append("input")
    .attr("type", "text")
    .attr("placeholder", "Digite sua resposta aqui");

  quizDiv.append("button")
    .text("Submit")
    .on("click", () => {
      const userAnswer = input.property("value").trim();
      const correctAnswer = randomQuestion.a.trim();

      const score = similarity(userAnswer, correctAnswer);

      if (score > 0.7) {  // allow ~70% similarity
        alert("✅ Correct (close enough)!");
      } else {
        alert("❌ Wrong. Correct answer: " + correctAnswer);
      }
    });
}

document.addEventListener("DOMContentLoaded", initQuiz);
