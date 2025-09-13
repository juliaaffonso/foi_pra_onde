// quiz.js

const questions = [
  {
    q: "Quem é a cantora que a ex-presidente Dilma Rousseff se encontrou?",
    hint: 'Ela nasceu na América do Sul',
    a: "Shakira"
  },
  
  {
    q: "Qual é o dia da semana campeão de agendas?",
    a: ['Quarta-feira', 'Quarta']
  },
  {
    q: "Qual horário recebeu o maior número de reuniões?",
    hint: 'É durante a tarde',
    a: ['15h', '15', '3', '15 h', '15 horas', 'três horas', '3 horas']
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
    a: ['Marechal Manuel Deodoro da Fonseca', 'Marechal Deodoro da Fonseca', 'Marechal Deodoro']
  },
  {
    q: "Quem foi o primeiro presidente do Brasil eleito diretamente pelo voto popular?",
    a: 'Prudente de Moraes'
  },
  {
    q: "Quantos presidentes o Brasil já teve até hoje?",
    a: '39'
  },
  {
    q: "Em que cidade nasceu o presidente Juscelino Kubitschek?",
    a: 'Diamantina'
  },
  {
    q: "Quem foi o primeiro presidente eleito pelo voto direto após a ditadura militar?",
    a: ['Fernando Collor de Mello', 'Fernando Collor', 'Collor']
  },
  {
    q: "Qual presidente brasileiro faleceu antes de tomar posse em 1985?",
    a: ['Tancredo Neves', 'Tancredo']
  },
  {
    q: "Em que ano Fernando Henrique Cardoso iniciou seu primeiro mandato presidencial?",
    a: '1995'
  },
  {
    q: "Qual presidente do Brasil governava quando ocorreu o golpe militar de 1964?",
    a: 'João Goulart'
  },
  {
    q: "Quem foi o segundo presidente do Brasil?",
    a: 'Floriano Peixoto'
  },
  {
    q: "Qual presidente brasileiro ficou conhecido pela frase “50 anos em 5”?",
    a: ['Juscelino Kubitschek', 'Juscelino']
  },
  {
    q: "Quem sucedeu Tancredo Neves na presidência em 1985?",
    a: ["José Sarney", "Sarney"]
  },
  {
    q: "Em que ano o presidente Jânio Quadros renunciou?",
    hint: 'Foi na década de 1960',
    a: '1961'
  },
  {
    q: "Qual presidente ficou no poder por mais tempo de forma contínua?",
    a: ['Getúlio Vargas (1930 - 1945)', 'Getúlio', 'Getúlio Vargas']
  },

  {
    q: "Em que cidade está localizado o Palácio do Planalto?",
    a: 'Brasília'
  },

  {
    q: "Em que praça está localizado o Palácio do Planalto?",
    a: ['Praça dos Três Poderes', 'Três Poderes', '3 Poderes', 'Praça dos 3 Poderes']
  },

  {
    q: "O Palácio do Planalto é a residência ou o local de trabalho do presidente?",
    a: ['Local de trabalho', 'Trabalho']
  },

  {
    q: "O Palácio da Alvorada é a residência ou o local de trabalho do presidente?",
    a: ['Residência oficial', 'Residência']
  },

  {
    q: "Quem foi o arquiteto responsável pelo projeto do Palácio do Planalto e do Palácio da Alvorada?",
    a: ['Oscar Niemeyer', 'Niemeyer']
  },

  {
    q: "Qual é o nome da famosa escultura em frente ao Palácio da Alvorada?",
    hint: 'Alfredo Ceschiatti é o artista responsável pela obra',
    a: ['As Iaras', 'Iaras']
  },


];

let availableQuestions = [];
let correctAnswersCount = 0;
let feedbackTimeoutId = null;

// --- Storage helper ---
function markQuestionAsAnswered(questionIndex) {
  const answeredIndices = JSON.parse(sessionStorage.getItem('answeredQuestions')) || [];
  if (!answeredIndices.includes(questionIndex)) answeredIndices.push(questionIndex);
  sessionStorage.setItem('answeredQuestions', JSON.stringify(answeredIndices));
}

// --- String similarity for answers ---
function similarity(a, b) {
  a = a.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  b = b.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const longer = a.length > b.length ? a : b;
  const shorter = a.length > b.length ? b : a;
  if (longer.length === 0) return 1.0;
  return (longer.length - editDistance(longer, shorter)) / parseFloat(longer.length);
}

function editDistance(s1, s2) {
  const costs = [];
  for (let i = 0; i <= s1.length; i++) {
    let lastValue = i;
    for (let j = 0; j <= s2.length; j++) {
      if (i === 0) costs[j] = j;
      else if (j > 0) {
        let newValue = costs[j - 1];
        if (s1.charAt(i - 1) !== s2.charAt(j - 1))
          newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
        costs[j - 1] = lastValue;
        lastValue = newValue;
      }
    }
    if (i > 0) costs[s2.length] = lastValue;
  }
  return costs[s2.length];
}

// --- Main setup ---
let totalQuestions = 0;

async function setupQuiz() {
  try {
    const results = await Promise.all([
      countPlanalto(),
      findPresidentWithMostAgendas()
    ]);

    questions[1].a = String(results[0]);
    questions[2].a = String(results[1]);

    const answeredIndices = JSON.parse(sessionStorage.getItem('answeredQuestions')) || [];

    availableQuestions = questions
      .map((question, index) => ({ ...question, originalIndex: index }))
      .filter(q => !answeredIndices.includes(q.originalIndex));

    totalQuestions = questions.length;

    d3.select("#score-total").text(totalQuestions);
    d3.select("#score-correct").text(correctAnswersCount); // ✅ reset visible score

    displayRandomQuestion();
  } catch (error) {
    console.error("Failed to set up the quiz:", error);
    d3.select("#quiz-container")
      .html("<h2>Oops!</h2><p>Não conseguimos carregar o quiz.</p>");
  }
}

// --- Question display ---
function displayRandomQuestion() {
  // Clear any pending timer from a previous answer
  if (feedbackTimeoutId) {
    clearTimeout(feedbackTimeoutId);
    feedbackTimeoutId = null;
  }

  const quizDiv = d3.select("#quiz-container");
  quizDiv.html("");

  if (availableQuestions.length === 0) {
    quizDiv.append("h3").text("Parabéns! 🏆");
    quizDiv.append("p").text("Você respondeu todas as perguntas.");
    quizDiv.append("button")
      .attr("class", "restart-btn")
      .text("Reiniciar Quiz")
      .on("click", restartQuiz);
    return;
  }

  const randomIndex = Math.floor(Math.random() * availableQuestions.length);
  const currentQuestion = availableQuestions[randomIndex];

  quizDiv.append("h3").text(currentQuestion.q);

  if (currentQuestion.hint) {
    const hintBtn = quizDiv.append("button")
      .attr("class", "hint-btn")
      .text("Mostrar dica")
      .on("click", function () {
        d3.select(this).remove();
        quizDiv.append("p")
          .attr("class", "quiz-hint")
          .text(currentQuestion.hint);
      });
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
      const correctAnswers = Array.isArray(currentQuestion.a) ? currentQuestion.a : [currentQuestion.a];
      const score = Math.max(...correctAnswers.map(ans => similarity(userAnswer, ans.trim())));

      const feedback = d3.select("#quiz-feedback");

      if (!d3.select(".score-tracker").classed("visible")) {
        d3.select(".score-tracker").classed("visible", true);
      }

      if (score > 0.7) {
        correctAnswersCount++;
        d3.select("#score-correct").text(correctAnswersCount);
        feedback.text("✅ Simmm! Você acertou, parabéns! 🥳")
          .attr("class", "correct");
      } else {
        feedback.text("❌ Não foi desta vez. A resposta correta é: " + correctAnswers[0])
          .attr("class", "incorrect");
      }

      d3.select("#score-correct").text(correctAnswersCount);

      markQuestionAsAnswered(currentQuestion.originalIndex);
      availableQuestions.splice(randomIndex, 1);

      // Store the timer ID so we can cancel it if needed
      feedbackTimeoutId = setTimeout(() => {
        displayRandomQuestion();
        feedback.text("").attr("class", "");
        input.property("value", "");
      }, 4000);
    });


  controlsDiv.append("button")
    .text("Próxima")
    .on("click", displayRandomQuestion);
}
// --- Restart ---
function restartQuiz() {
  sessionStorage.removeItem('answeredQuestions');
  correctAnswersCount = 0;
  availableQuestions = [...questions];
  d3.select("#score-correct").text(correctAnswersCount);
  displayRandomQuestion();
}

document.addEventListener("DOMContentLoaded", setupQuiz);
