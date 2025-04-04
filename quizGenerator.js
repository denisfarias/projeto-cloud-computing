fetch('questions.json')                                         // inicializando JSON
    .then(response => response.json())
    .then(data => {
        let currentQuestionIndex = 0;                           // índice da questão atual
        let correctlyAnsweredQuestions = 0;                     // contador de questões respondidas corretamente
        const quizContainer = document.createElement("div");    // criando o container principal para o quiz
        document.body.appendChild(quizContainer);               // adicionando o container ao corpo do documento

        function showQuestion(index) {
            quizContainer.innerHTML = "";
            const question = data.questions[index];

            // container para a questão atual
            const questionContainer = document.createElement("div");
            questionContainer.classList.add("question");

            // texto da questão
            const questionLabel = document.createElement("p");
            questionLabel.textContent = question.label;
            questionContainer.appendChild(questionLabel);

            // respostas aleatórias
            const answers = [...question.incorrect_answers, question.correct_answer];
            answers.sort(() => Math.random() - 0.5);

            // loop pra criar as perguntas
            answers.forEach(answer => {
                const answerContainer = document.createElement("div");

                const radio = document.createElement("input");
                radio.type = "radio";
                radio.name = `question-${index}`;
                radio.value = answer;

                const label = document.createElement("label");
                label.textContent = answer;

                // evento que ativa quando o usuário seleciona uma resposta
                radio.addEventListener("change", () => {
                    const isCorrect = answer === question.correct_answer;
                    console.log(isCorrect);

                    if (isCorrect) { correctlyAnsweredQuestions++; }
                    currentQuestionIndex++;

                    const allInputs = document.querySelectorAll(`input[name='question-${index}']`);
                    allInputs.forEach(input => input.disabled = true);

                    // trocar o CSS das questões corretas e incorretas
                    questionContainer.querySelectorAll("label").forEach(l => {
                        if (l.textContent === question.correct_answer) {
                            // estilos serão alterados depois
                            l.style.color = "green"
                            l.style.fontWeight = "bold"
                        } else {
                            l.style.color = "red"
                        }
                    })

                    // esperar ~1 segundo após responder a questão
                    setTimeout(() => {
                        // veja se ainda tem questões para responder
                        if (currentQuestionIndex < data.questions.length) {
                            showQuestion(currentQuestionIndex); // passa para a próxima questão
                        } else if (correctlyAnsweredQuestions <= 0) {
                            quizContainer.innerHTML = `<p>Fim do quiz, você não acertou nenhuma questão</p>`;
                        } else if (correctlyAnsweredQuestions = 1) {
                            quizContainer.innerHTML = `<p>Parabéns, você completou o Quiz<br>Você acertou ${correctlyAnsweredQuestions} questão de ${data.questions.length}.</p>`;
                        } else {
                            quizContainer.innerHTML = `<p>Parabéns, você completou o Quiz<br>Você acertou ${correctlyAnsweredQuestions} questões de ${data.questions.length}.</p>`;
                        }
                    }, 900);
                });

                answerContainer.appendChild(radio);
                answerContainer.appendChild(label);
                questionContainer.appendChild(answerContainer);
            });

            quizContainer.appendChild(questionContainer);
        }

        showQuestion(currentQuestionIndex);
    })
    .catch(error => console.error("Erro em obter o arquivo JSON:", error));
