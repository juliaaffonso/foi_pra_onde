// quiz.js

// Example questions
const questions = [
  {
    q: "Quem é a cantora que a ex-presidente Dilma Rousseff se encontrou?",
    hint: 'Ela nasceu na América do Sul',
    a: "Shakira"
  },
  {
    q: "Quantas vezes o Palácio do Planalto é mencionado nas agendas presidenciais?",
    hint: 'É um número na casa dos milhares',
    a: null // will be computed
  },
  {
    q: "Qual presidente divulgou mais agendas?",
    hint: 'Lembre-se que alguns tiveram mandatos mais longos',
    a: null // will be computed
  },

  {
    q: "Qual é o dia da semana campeão de agendas?",
    a: 'Quarta-feira'
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

// ✨ Count number of agendas
async function findPresidentWithMostAgendas() {
  // An array of objects to keep the name and file together
  const presidents = [
    { name: "Lula", file: "data/all_data.json" },
    { name: "Bolsonaro", file: "data/bolsonaro_agenda.json" },
    { name: "Dilma", file: "data/agenda_dilma_final.json" },
    { name: "Temer", file: "data/temer_agenda.json" }
  ];

  let maxAgendas = 0;
  let winningPresident = "Ninguém"; // Default winner

  // Loop through each president to check their total
  for (const president of presidents) {
    const data = await d3.json(president.file);
    const agendaCount = data.length;

    // If this president has more agendas than the current max, they become the new winner
    if (agendaCount > maxAgendas) {
      maxAgendas = agendaCount;
      winningPresident = president.name;
    }
  }

  return winningPresident;
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

// This function runs only ONCE when the page loads
async function setupQuiz() {
  try {
    // Run all your calculations at the same time
    const results = await Promise.all([
      countPlanalto()
      // Add other calculation functions here in the future
      // findBusiestYear(),
      // findPresidentWithMostAgendas()
    ]);

    // Assign the answers to your questions array
    questions[1].a = String(results[0]);
    // questions[2].a = String(results[1]);
    // etc.

    // Now that the data is ready, display the FIRST question
    displayRandomQuestion();

    // Set up the button to show more questions
    d3.select("#nextQuestion").on("click", displayRandomQuestion);

  } catch (error) {
    console.error("Failed to set up the quiz:", error);
    d3.select("#quiz-container")
      .html("<h2>Oops!</h2><p>The quiz could not be loaded.</p>");
  }
}

// quiz.js (updated function)

function displayRandomQuestion() {
  const randomQuestion = questions[Math.floor(Math.random() * questions.length)];

  const quizDiv = d3.select("#quiz-container");
  quizDiv.html(""); // Clear the container
  quizDiv.append("h3").text(randomQuestion.q);

  if (randomQuestion.hint) {
    quizDiv.append("p")
      .attr("class", "quiz-hint")
      .text(randomQuestion.hint);
  }

  // ✨ Create a flex container for the input and buttons
  const controlsDiv = quizDiv.append("div")
      .attr("class", "quiz-controls");

  // Append the input to our new container
  const input = controlsDiv.append("input")
    .attr("type", "text")
    .attr("placeholder", "Digite aqui");
    // You can keep styling here or move it to CSS

  // Append the "Submit" button to the container
  controlsDiv.append("button")
    .text("Enviar") // Changed from "Submit" to "Enviar" for consistency
    .on("click", () => {
      const userAnswer = input.property("value").trim();
      const correctAnswer = randomQuestion.a.trim();
      const score = similarity(userAnswer, correctAnswer);

      if (score > 0.7) {
        alert("✅ Simmm! Você acertou, parabéns! 🥳");
      } else {
        alert("❌ Não foi desta vez. A resposta correta é: " + correctAnswer);
      }
    });

  // ✨ Append the "Next Question" button to the container
  controlsDiv.append("button")
    .text("Próxima")
    .on("click", displayRandomQuestion); // The click handler is right here!
}

// Start everything when the page is loaded
document.addEventListener("DOMContentLoaded", setupQuiz);
