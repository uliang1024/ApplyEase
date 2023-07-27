const goTop = document.querySelector(".goTop");

window.addEventListener("scroll", () => {
  let scrollAmount = window.scrollY;

  if (scrollAmount > 0) {
    goTop.classList.remove("hide");
  } else {
    goTop.classList.add("hide");
  }
});

goTop.addEventListener("click", function (e) {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// ---

const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector("#send-btn");

let userMessage = null; // Variable to store user's message
const inputInitHeight = chatInput.scrollHeight;

const createChatLi = (message, className) => {
  // Create a chat <li> element with passed message and className
  const chatLi = document.createElement("li");
  chatLi.classList.add("chat", `${className}`);
  let chatContent =
    className === "outgoing"
      ? `<p>${message}</p>`
      : `<i class="fa-solid fa-robot"></i><p>${message}</p>`;
  chatLi.innerHTML = chatContent;
  return chatLi; // return chat <li> element
};

const generateResponse = (chatElement) => {
  const messageElement = chatElement.querySelector("p");
  messageElement.textContent = "喔是喔";
  // Scroll to the bottom after GPT-3's response
  chatbox.scrollTo(0, chatbox.scrollHeight);
};

const handleChat = () => {
  userMessage = chatInput.value.trim(); // Get user entered message and remove extra whitespace
  if (!userMessage) return;

  // Clear the input textarea and set its height to default
  chatInput.value = "";
  chatInput.style.height = `${inputInitHeight}px`;

  // Append the user's message to the chatbox
  chatbox.appendChild(createChatLi(userMessage, "outgoing"));
  // Scroll to the bottom after user's message
  chatbox.scrollTo(0, chatbox.scrollHeight);

  // Display "Thinking..." message while waiting for the response
  const incomingChatLi = createChatLi("Thinking...", "incoming");
  chatbox.appendChild(incomingChatLi);
  // Scroll to the bottom after displaying "Thinking..."
  chatbox.scrollTo(0, chatbox.scrollHeight);

  const messageElement = incomingChatLi.querySelector("p");
  messageElement.textContent = "喔是喔";
  // Scroll to the bottom after GPT-3's response
  chatbox.scrollTo(0, chatbox.scrollHeight);
};

chatInput.addEventListener("input", () => {
  // Adjust the height of the input textarea based on its content
  chatInput.style.height = `${inputInitHeight}px`;
  chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
  // If Enter key is pressed without Shift key, handle the chat
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    handleChat();
  }
});

sendChatBtn.addEventListener("click", handleChat);
closeBtn.addEventListener("click", () =>
  document.body.classList.remove("show-chatbot")
);
chatbotToggler.addEventListener("click", () =>
  document.body.classList.toggle("show-chatbot")
);


// ---

const apiUrl =
  "https://api.wit.ai/event?v=20230727&session_id=prodop3&context_map=%7B%7D";
const accessToken = "44XAEYSCZX7BZR5EALJHGKVCOUWU2AAQ";

const requestOptions = {
  method: "POST",
  headers: {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    type: "message",
    message: "為甚麼需要身分證",
  }),
};

fetch(apiUrl, requestOptions)
  .then((response) => response.json())
  .then((data) => {
    console.log(data.response.text);
  })
  .catch((error) => {
    console.error("Error:", error);
  });