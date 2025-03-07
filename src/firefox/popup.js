let currentQuestion, currentQuestionId, originalUrl, currentQuestionTitle, currentQuestionSlug;

document.addEventListener('DOMContentLoaded', async function() {
    const result = await browser.storage.local.get(['originalUrl']);
    originalUrl = result.originalUrl;
    const response = await browser.runtime.sendMessage({action: "getRandomQuestion"});
    currentQuestion = response.question;
    currentQuestionId = response.id;
    currentQuestionTitle = response.title;
    currentQuestionSlug = response.slug; 
    document.getElementById('question').textContent = currentQuestionTitle; 
    document.getElementById('question_content').innerHTML = currentQuestion; 
    document.getElementById('submit').addEventListener('click', async function() {
        await browser.storage.local.set({ 
            lastSubmittedSolution: "",
            lastQuestionSlug: currentQuestionSlug
        });
        const leetCodeUrl = `https://leetcode.com/problems/${currentQuestionSlug}/description`;
        await browser.tabs.create({ url: leetCodeUrl });
        window.close();
    });
});

document.getElementById('submit').addEventListener('click', function() {
    chrome.storage.local.set({ 
        lastSubmittedSolution: "",
        lastQuestionSlug: currentQuestionSlug
    }, function() {
        chrome.runtime.sendMessage({
            action: "openLeetCodeQuestion",
            slug: currentQuestionSlug
        });
    });
});

browser.runtime.onMessage.addListener((message) => {
    if (message.action === "updatePopup") {
        const resultDiv = document.getElementById("result");
        resultDiv.textContent = message.content;
        resultDiv.style.backgroundColor = "#e7f4e7"; 
        const header = document.getElementById("declaration_of_war");
        const question = document.getElementById("question");
        const questionContent = document.getElementById("question_content");
        const questionSection = document.getElementById("question_section");
        const submitButton = document.getElementById("submit");
        if (header && question && questionContent && questionSection && submitButton) {
            console.log("Removing elements");
            header.remove();
            question.remove();
            questionContent.remove();
            questionSection.remove();
            submitButton.remove();
        } else {
            console.error("Elements not found");
        }
    }
});