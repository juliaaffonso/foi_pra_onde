// quiz.js

const questions = [
  {
    type: "text",
    q: "Quem é a cantora que a ex-presidente Dilma Rousseff se encontrou?",
    hint: 'Ela nasceu na América do Sul',
    a: "Shakira"
  },

  {
    type: "text",
    q: "Qual é o dia da semana campeão de agendas presidenciais?",
    a: ['Quarta-feira', 'Quarta']
  },
  {
    type: "text",
    q: "Qual horário recebeu o maior número de reuniões?",
    hint: 'É durante a tarde',
    a: ['15h', '15', '3', '15 h', '15 horas', 'três horas', '3 horas']
  },
  {
    type: "text",
    q: "Qual mês do ano concentrou o maior número de agendas?",
    a: 'Julho'
  },
  {
    type: "text",
    q: "Em que ano foi inaugurado o Palácio do Planalto?",
    a: '1960'
  },
  {
    type: "text",
    q: "Em que ano foi inaugurado o Palácio da Alvorada?",
    a: '1958'
  },
  {
    type: "text",
    q: "Quem foi o primeiro presidente do Brasil?",
    a: ['Marechal Manuel Deodoro da Fonseca', 'Marechal Deodoro da Fonseca', 'Marechal Deodoro']
  },
  {
    type: "text",
    q: "Quem foi o primeiro presidente do Brasil eleito diretamente pelo voto popular?",
    a: 'Prudente de Moraes'
  },
  {
    type: "text",
    q: "Quantos presidentes o Brasil já teve até hoje?",
    a: '39'
  },
  {
    type: "text",
    q: "Em que cidade nasceu o presidente Juscelino Kubitschek?",
    a: 'Diamantina'
  },
  {
    type: "text",
    q: "Quem foi o primeiro presidente eleito pelo voto direto após a ditadura militar?",
    a: ['Fernando Collor de Mello', 'Fernando Collor', 'Collor']
  },
  {
    type: "text",
    q: "Qual presidente brasileiro faleceu antes de tomar posse em 1985?",
    a: ['Tancredo Neves', 'Tancredo']
  },
  {
    type: "text",
    q: "Em que ano Fernando Henrique Cardoso iniciou seu primeiro mandato presidencial?",
    a: '1995'
  },
  {
    type: "text",
    q: "Qual presidente do Brasil governava quando ocorreu o golpe militar de 1964?",
    a: 'João Goulart'
  },
  {
    type: "text",
    q: "Quem foi o segundo presidente do Brasil?",
    a: 'Floriano Peixoto'
  },
  {
    type: "text",
    q: "Qual presidente brasileiro ficou conhecido pela frase “50 anos em 5”?",
    a: ['Juscelino Kubitschek', 'Juscelino']
  },
  {
    type: "text",
    q: "Quem sucedeu Tancredo Neves na presidência em 1985?",
    a: ["José Sarney", "Sarney"]
  },
  {
    type: "text",
    q: "Em que ano o presidente Jânio Quadros renunciou?",
    hint: 'Foi na década de 1960',
    a: '1961'
  },
  {
    type: "text",
    q: "Qual presidente ficou no poder por mais tempo de forma contínua?",
    a: ['Getúlio Vargas (1930 - 1945)', 'Getúlio', 'Getúlio Vargas']
  },

  {
    type: "text",
    q: "Em que cidade está localizado o Palácio do Planalto?",
    a: 'Brasília'
  },

  {
    type: "text",
    q: "Em que praça está localizado o Palácio do Planalto?",
    a: ['Praça dos Três Poderes', 'Três Poderes', '3 Poderes', 'Praça dos 3 Poderes']
  },

  {
    type: "text",
    q: "O Palácio do Planalto é a residência ou o local de trabalho do presidente?",
    a: ['Local de trabalho', 'Trabalho']
  },

  {
    type: "text",
    q: "O Palácio da Alvorada é a residência ou o local de trabalho do presidente?",
    a: ['Residência oficial', 'Residência']
  },

  {
    type: "text",
    q: "Quem foi o arquiteto responsável pelo projeto dos Palácio do Planalto e da Alvorada?",
    a: ['Oscar Niemeyer', 'Niemeyer']
  },

  {
    type: "text",
    q: "Qual é o nome da famosa escultura em frente ao Palácio da Alvorada?",
    hint: 'Alfredo Ceschiatti é o artista responsável pela obra',
    a: ['As Iaras', 'Iaras']
  },

  {
    type: "text",
    q: "Quantas estrelas tem a bandeira do Brasil?",
    a: ['27', 'Vinte e sete']
  },

  {
    type: "multiple_choice",
    q: "Qual é o maior estado do Brasil em extensão territorial?",
    options: ["Amazonas", "Pará", "Mato Grosso", "Minas Gerais"],
    a: "Amazonas"
  },

  {
    type: "multiple_choice",
    q: "Qual destes rios é o mais extenso do Brasil?",
    options: ["Rio São Francisco", "Rio Tocantins", "Rio Paraná", "Rio Amazonas"],
    a: "Rio Amazonas"
  },

  {
    type: "multiple_choice",
    q: "Em que ano ocorreu a Proclamação da República no Brasil?",
    options: ["1822", "1889", "1930", "1964"],
    a: "1889"
  },

  {
    type: "multiple_choice",
    q: "Qual é a maior cidade do Brasil em população?",
    options: ["Rio de Janeiro", "Salvador", "São Paulo", "Brasília"],
    a: "São Paulo"
  },

  {
    type: "multiple_choice",
    q: "Qual destes biomas é exclusivo do Brasil?",
    options: ["Amazônia", "Cerrado", "Pantanal", "Mata Atlântica"],
    a: "Pantanal"
  },

  {
    type: "multiple_choice",
    q: "Qual destas cidades foi a primeira capital do Brasil?",
    options: ["Rio de Janeiro", "Salvador", "Recife", "Olinda"],
    a: "Salvador"
  },

  {
    type: "multiple_choice",
    q: "Qual tratado definiu as fronteiras entre os territórios coloniais na América do Sul em 1494?",
    options: ["Tratado de Utrecht", "Tratado de Madri", "Tratado de Tordesilhas", "Tratado de Petrópolis"],
    a: "Tratado de Tordesilhas"
  },

  {
    type: "multiple_choice",
    q: "Quantos estados compõem a federação brasileira, sem contar o Distrito Federal?",
    options: ["25", "26", "27", "24"],
    a: "26"
  },

  {
    type: "multiple_choice",
    q: "Qual é o maior bioma brasileiro em extensão territorial?",
    options: ["Amazônia", "Cerrado", "Caatinga", "Mata Atlântica"],
    a: "Amazônia"
  },

  {
    type: "multiple_choice",
    q: "Qual bioma brasileiro é caracterizado por clima semiárido e vegetação adaptada à seca?",
    options: ["Pantanal", "Caatinga", "Pampa", "Mata Atlântica"],
    a: "Caatinga"
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

function displayRandomQuestion() {
  // Clear any pending timer from a previous answer
  if (feedbackTimeoutId) {
    clearTimeout(feedbackTimeoutId);
    feedbackTimeoutId = null;
  }

  const quizDiv = d3.select("#quiz-container");
  quizDiv.html("");

  // Check if all questions have been answered
  if (availableQuestions.length === 0) {
    quizDiv.append("h3").text("Parabéns! 🏆");
    quizDiv.append("p").text("Você respondeu todas as perguntas.");
    quizDiv.append("button")
      .attr("class", "restart-btn")
      .text("Reiniciar Quiz")
      .on("click", restartQuiz);
    return;
  }

  // Select a random question from the available pool
  const randomIndex = Math.floor(Math.random() * availableQuestions.length);
  const currentQuestion = availableQuestions[randomIndex];

  // Display the question text
  quizDiv.append("h3").text(currentQuestion.q);

  // Display the hint button if a hint exists
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
  
  // Helper function to process the answer, provide feedback, and load the next question
  function processAnswer(isCorrect, correctAnswer) {
    const feedback = d3.select("#quiz-feedback");
    
    // Make score tracker visible if it's the first question answered
    if (!d3.select(".score-tracker").classed("visible")) {
      d3.select(".score-tracker").classed("visible", true);
    }
    
    if (isCorrect) {
      correctAnswersCount++;
      feedback.text("✅ Simmm! Você acertou, parabéns! 🥳").attr("class", "correct");
    } else {
      feedback.text(`❌ Não foi desta vez. A resposta correta é: ${correctAnswer}`).attr("class", "incorrect");
    }

    d3.select("#score-correct").text(correctAnswersCount);
    markQuestionAsAnswered(currentQuestion.originalIndex);
    availableQuestions.splice(randomIndex, 1); // Remove question from the available pool

    // Set a timer to automatically display the next question
    feedbackTimeoutId = setTimeout(() => {
      displayRandomQuestion();
      feedback.text("").attr("class", "");
    }, 4000);
  }

  //-- Conditional Rendering Based on Question Type --//

  if (currentQuestion.type === "multiple_choice") {
    // Render buttons for multiple-choice questions
    const optionsDiv = quizDiv.append("div").attr("class", "quiz-options");

    optionsDiv.selectAll("button")
      .data(currentQuestion.options)
      .enter()
      .append("button")
      .attr("class", "option-btn")
      .text(d => d)
      .on("click", function(event, d) {
        const userAnswer = d;
        const isCorrect = userAnswer === currentQuestion.a;
        processAnswer(isCorrect, currentQuestion.a);
      });
      
  } else { 
    // Render a text input for 'text' type questions (the default)
    const controlsDiv = quizDiv.append("div").attr("class", "quiz-controls");
    const input = controlsDiv.append("input")
      .attr("type", "text")
      .attr("placeholder", "Digite aqui");

    controlsDiv.append("button")
      .text("Enviar")
      .on("click", () => {
        const userAnswer = input.property("value").trim();
        const correctAnswers = Array.isArray(currentQuestion.a) ? currentQuestion.a : [currentQuestion.a];
        // Check similarity for typo tolerance
        const score = Math.max(...correctAnswers.map(ans => similarity(userAnswer, ans.trim())));
        
        processAnswer(score > 0.7, correctAnswers[0]);
        input.property("value", ""); // Clear input after processing
      });

    // "Next Question" button
    controlsDiv.append("button")
    .text("Próxima")
    .on("click", displayRandomQuestion);
    }
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
