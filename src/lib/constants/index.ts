export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'Bookstore';
export const APP_DESCRIPTION = process.env.NEXT_PUBLIC_APP_DESCRIPTION || 'Buy and sell used books';
export const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000';


export const SAMPLE_MESSAGES = [
  { content: "Hi there! 👋" },
  { content: "How’s it going?" },
  { content: "Is now a good time to chat?" },
  { content: "Hey, are you available to chat?" },
  { content: "Sure! How can I help you?" },
  { content: "Let me know if you have any questions!" },
  { content: "Thanks for reaching out!" },
  { content: "Sounds good to me." },
  { content: "Can you please send me more details?" },
  { content: "I'm interested, tell me more!" },
  { content: "When would be a good time for you?" },
  { content: "Looking forward to hearing from you." },
  { content: "Thanks! Talk soon." },
  { content: "Let’s stay in touch!" },
  { content: "No worries, take your time." },
  { content: "Appreciate your help!" },
  { content: "Got it, thank you!" },
  { content: "Would you like me to explain further?" },
  { content: "Please feel free to ask me anything." },
  { content: "Have a great day! ☀️" },
  { content: "Thanks for the update!" },
  { content: "I'll get back to you shortly." }
];

export const FUN_SAMPLE_MESSAGES = [
  { content: "Sounds awesome! 😎" },
  { content: "LOL 😂" },
  { content: "You're the best! 🙌" },
  { content: "No problem at all!" },
  { content: "Haha, that's funny! 😄" },
  { content: "I'm excited! 🎉" },
  { content: "Let's do it! 🚀" },
  { content: "I appreciate it a lot!" },
  { content: "That makes sense 👍" },
  { content: "Catch you later! 👋" },
  { content: "Just let me know. No rush!" },
  { content: "Thanks again! 🙏" },
  { content: "That's totally fine with me!" },
  { content: "Can't wait! 🤩" },
  { content: "Haha no worries!" },
  { content: "Exactly! 👌" },
  { content: "Perfect, thank you!" },
  { content: "You rock! 🎸" },
  { content: "Good vibes only! ✨" },
  { content: "Let’s make it happen!" }
];

export const ALL_SAMPLE_MESSAGES = [...SAMPLE_MESSAGES, ...FUN_SAMPLE_MESSAGES];