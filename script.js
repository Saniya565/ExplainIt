let prompt = document.querySelector("#prompt");
let btn = document.querySelector("#btn");
let container = document.querySelector(".container");
let chatContainer = document.querySelector(".chat-container");
let userMessage = null;

// Base API URL
const baseUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/`;

// Function to create a chat box
function createChatBox(html, className) {
    let div = document.createElement("div");
    div.classList.add(className);
    div.innerHTML = html;
    return div;
}

// Fetch API response
async function getApiResponse(aiChatBox) {
    try {
        let response = await fetch(baseUrl + userMessage);
        let data = await response.json();

        if (data && data.length > 0) {
            aiChatBox.querySelector('.text').innerText = 
                data[0]?.meanings[0]?.definitions[0]?.definition || 
                "No definition available.";
        } else {
            aiChatBox.querySelector('.text').innerText = "No results found.";
        }
    } catch (err) {
        console.error(err);
        aiChatBox.querySelector('.text').innerText = "Error fetching data.";
    }
    finally{
        aiChatBox.querySelector(".loading").style.display="none";
        
    }
}

// Show loading animation
function showLoading() {
    let html = `
        <div class="image">
            <img src="images/ai.webp" width="40">
        </div>
        <p class="text">Loading...</p>
        <img class="loading" src="images/loading.webp" alt="loading" height="50">
    `;
    let aiChatBox = createChatBox(html, "ai-chat-box");
    chatContainer.appendChild(aiChatBox);
    getApiResponse(aiChatBox);
}

function scrollToBottom() {
    chatContainer.scrollTop = chatContainer.scrollHeight;
}


// Event listener for the button
btn.addEventListener("click", () => {
    userMessage = prompt.value.trim();
    if(userMessage==" "){
        container.style.display="flex"
    }
    {
         container.style.display="none"
    }
    if (!userMessage) return;

    let html = `
        <div class="image">
            <img src="images/user.webp" width="55px">
        </div>
        <p class="text"></p>
    `;
    let userChatBox = createChatBox(html, "user-chat-box");
    userChatBox.querySelector(".text").innerText = userMessage;
    chatContainer.appendChild(userChatBox);
    scrollToBottom();

    prompt.value = "";
    setTimeout( () => {
        showLoading();
        scrollToBottom(); 
    }, 500);
});
