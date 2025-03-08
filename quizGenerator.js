// TODO: adicionar comentários

fetch('questions.json')
    .then(response => response.json())
    .then(data => {
        let currentQuestionIndex = 0;
        let correctlyAnsweredQuestions = 0;
        const quizContainer = document.createElement("div");
        document.body.appendChild(quizContainer);

        function showQuestion(index) {
            quizContainer.innerHTML = "";
            const question = data.questions[index];

            const questionContainer = document.createElement("div");
            questionContainer.classList.add("question");

            const questionLabel = document.createElement("p");
            questionLabel.textContent = question.label;
            questionContainer.appendChild(questionLabel);

            const answers = [...question.incorrect_answers, question.correct_answer];
            answers.sort(() => Math.random() - 0.5);

            answers.forEach(answer => {
                const answerContainer = document.createElement("div");

                const radio = document.createElement("input");
                radio.type = "radio";
                radio.name = `question-${index}`;
                radio.value = answer;

                const label = document.createElement("label");
                label.textContent = answer;

                radio.addEventListener("change", () => {
                    const isCorrect = answer === question.correct_answer;
                    console.log(isCorrect);
                    if (isCorrect) {
                        correctlyAnsweredQuestions++;
                    }
                    currentQuestionIndex++;
                    if (currentQuestionIndex < data.questions.length) {
                        showQuestion(currentQuestionIndex);
                    } else {
                        quizContainer.innerHTML = `<p>Parabéns, você completou o Quiz<br>Você acertou ${correctlyAnsweredQuestions} questões.`;
                    }
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
