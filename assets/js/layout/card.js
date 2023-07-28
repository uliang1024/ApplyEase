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

// const generateResponse = (chatElement) => {
//   const API_URL =
//     "https://api.wit.ai/event?v=20230727&session_id=prodop3&context_map=%7B%7D";
//   // const accessToken = process.env.ACCESS_TOKEN;

//   const messageElement = chatElement.querySelector("p");

//   const requestOptions = {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${accessToken}`,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       type: "message",
//       message: userMessage,
//     }),
//   };

//   fetch(API_URL, requestOptions)
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data);
//       messageElement.textContent = data.response.text;
//       chatbox.scrollTo(0, chatbox.scrollHeight);
//     })
//     .catch((error) => {
//       messageElement.classList.add("error");
//       messageElement.textContent =
//         "Oops! Something went wrong. Please try again.";
//     });
// };
const API_KEY = "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";

const generateResponse = (chatElement) => {
  const API_URL = "https://api.openai.com/v1/chat/completions";
  const messageElement = chatElement.querySelector("p");

  // const API_KEY = process.env.CHATGPT_API_KEY;
  
  userMessage =
    "我命令你現在是一家叫作RawStone的公司的線上申辦信用卡網站的機器人客服，幫忙回復客戶的問題，不知道的問題就隨便亂編一個就好，而且要肯定的回答他們，要回復繁體中文。接下來請你回復顧客的話：" +
    userMessage +
    "(只要回覆前面的問題就好)";
  // Define the properties and message for the API request
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: userMessage }],
    }),
  };

  // Send POST request to API, get response and set the reponse as paragraph text
  fetch(API_URL, requestOptions)
    .then((res) => res.json())
    .then((data) => {
      const reply = data.choices[0].message.content.trim();
      messageElement.textContent = reply;
      chatbox.scrollTo(0, chatbox.scrollHeight);
    })
    .catch(() => {
      messageElement.classList.add("error");
      messageElement.textContent = "哎呀！ 出了些問題。 請再試一次。";
    });
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

  setTimeout(() => {
    generateResponse(incomingChatLi);
  }, 2000);
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
