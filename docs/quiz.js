// quiz.js

const questions = [
  {
    q: "Quem é a cantora que a ex-presidente Dilma Rousseff se encontrou?",
    hint: 'Dica: Ela nasceu na América do Sul',
    a: "Shakira"
  },
  {
    q: "Quantas vezes o Palácio do Planalto é mencionado nas agendas presidenciais?",
    hint: 'Dica: É um número na casa dos milhares',
    a: null // will be computed
  },
  {
    q: "Qual presidente divulgou mais agendas?",
    hint: 'Dica: Lembre-se que alguns tiveram mandatos mais longos',
    a: null // will be computed
  },
  {
    q: "Qual é o dia da semana campeão de agendas?",
    a: 'Quarta-feira'
  },
  {
    q: "Qual horário recebeu o maior número de reuniões?",
    hint: 'É durante a tarde',
    a: '15h'
  },
  {
    q: "Qual mês do ano concentrou o maior número de agendas?",
    a: 'Julho'
  },
  
  {
    q: "Em que ano foi inaugurado o Palácio do Planalto?",
    a: '1960'
  },

  {
    q: "Em que ano foi inaugurado o Palácio da Alvorada?",
    a: '1958'
  },

  {
    q: "Quem foi o primeiro presidente do Brasil?",
    a: 'Marechal Manuel Deodoro da Fonseca'
  },

  {
    q: "Quem foi o primeiro presidente do Brasil eleito diretamente pelo voto popular?",
    a: 'Prudente de Moraes'
  },

  {
    q: "Quantos presidentes o Brasil já teve até hoje?",
    a: '39'
  },
];

let availableQuestions = [];

function markQuestionAsAnswered(questionIndex) {
  // MODIFIED: Using sessionStorage to store data for the current session only.
  const answeredIndices = JSON.parse(sessionStorage.getItem('answeredQuestions')) || [];

  if (!answeredIndices.includes(questionIndex)) {
    answeredIndices.push(questionIndex);
  }

  // MODIFIED: Saving the updated list back to sessionStorage.
  sessionStorage.setItem('answeredQuestions', JSON.stringify(answeredIndices));
}

async function countPlanalto() {
  const files = ["data/all_data.json", "data/bolsonaro_agenda.json", "data/agenda_dilma_final.json", "data/temer_agenda.json"];
  let total = 0;
  for (let file of files) {
    const data = await d3.json(file);
    total += data.filter(d => d.local && d.local.toLowerCase().includes("palácio do planalto")).length;
  }
  return total;
}

async function findPresidentWithMostAgendas() {
  const presidents = [
    { name: "Lula", file: "data/all_data.json" },
    { name: "Bolsonaro", file: "data/bolsonaro_agenda.json" },
    { name: "Dilma", file: "data/agenda_dilma_final.json" },
    { name: "Temer", file: "data/temer_agenda.json" }
  ];
  let maxAgendas = 0;
  let winningPresident = "Ninguém";
  for (const president of presidents) {
    const data = await d3.json(president.file);
    const agendaCount = data.length;
    if (agendaCount > maxAgendas) {
      maxAgendas = agendaCount;
      winningPresident = president.name;
    }
  }
  return winningPresident;
}

function similarity(a, b) {
  a = a.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
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
      if (i === 0) costs[j] = j;
      else {
        if (j > 0) {
          let newValue = costs[j - 1];
          if (s1.charAt(i - 1) !== s2.charAt(j - 1))
            newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
          costs[j - 1] = lastValue;
          lastValue = newValue;
        }
      }
    }
    if (i > 0) costs[s2.length] = lastValue;
  }
  return costs[s2.length];
}

async function setupQuiz() {
  try {
    const results = await Promise.all([
      countPlanalto(),
      findPresidentWithMostAgendas()
    ]);

    questions[1].a = String(results[0]);
    questions[2].a = String(results[1]);

    // MODIFIED: Load answered questions from sessionStorage.
    const answeredIndices = JSON.parse(sessionStorage.getItem('answeredQuestions')) || [];

    availableQuestions = questions
      .map((question, index) => ({ ...question, originalIndex: index }))
      .filter(question => !answeredIndices.includes(question.originalIndex));

    displayRandomQuestion();

  } catch (error) {
    console.error("Failed to set up the quiz:", error);
    d3.select("#quiz-container")
      .html("<h2>Oops!</h2><p>The quiz could not be loaded.</p>");
  }
}

function displayRandomQuestion() {
  const quizDiv = d3.select("#quiz-container");
  quizDiv.html("");

  if (availableQuestions.length === 0) {
    quizDiv.append("h3").text("Parabéns! 🏆");
    quizDiv.append("p").text("Você respondeu todas as perguntas.");
    return;
  }

  const randomIndex = Math.floor(Math.random() * availableQuestions.length);
  const currentQuestion = availableQuestions[randomIndex];

  quizDiv.append("h3").text(currentQuestion.q);

  if (currentQuestion.hint) {
    quizDiv.append("p")
      .attr("class", "quiz-hint")
      .text(currentQuestion.hint);
  }

  const controlsDiv = quizDiv.append("div")
    .attr("class", "quiz-controls");

  const input = controlsDiv.append("input")
    .attr("type", "text")
    .attr("placeholder", "Digite aqui");

  controlsDiv.append("button")
    .text("Enviar")
    .on("click", () => {
      const userAnswer = input.property("value").trim();
      const correctAnswer = currentQuestion.a.trim();
      const score = similarity(userAnswer, correctAnswer);

      markQuestionAsAnswered(currentQuestion.originalIndex);
      availableQuestions.splice(randomIndex, 1);

      if (score > 0.7) {
        alert("✅ Simmm! Você acertou, parabéns! 🥳");
      } else {
        alert("❌ Não foi desta vez. A resposta correta é: " + correctAnswer);
      }

      displayRandomQuestion();
    });

  // NEW: The "Próxima" button is added back.
  controlsDiv.append("button")
    .text("Próxima")
    .on("click", displayRandomQuestion); // Its job is simply to call the next question.

}

document.addEventListener("DOMContentLoaded", setupQuiz);