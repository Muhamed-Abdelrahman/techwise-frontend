import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Send, Bot, User, Loader, Sparkles, TrendingUp,
  Gamepad2, Code, Briefcase, MonitorPlay, DollarSign, Cpu, ArrowRight,
} from "lucide-react";
import "../styles/Chatbot.css";

const BASE_URL = "https://teck-wise-production.up.railway.app";
const USE_MOCK = false; // ← غيرها false لما الباك يشتغل

// ============================================================
// GET USER ID FROM LOCALSTORAGE
// ============================================================
const getUserId = () => {
  try {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    // ✅ جرب كل الاحتمالات
    return user.userId || user.useId || user.id || null;
  } catch (error) {
    console.error("Error getting userId:", error);
    return null;
  }
};

// ============================================================
// MOCK DATA
// ============================================================
const MOCK_START = {
  session_id: "mock-session-001",
  message:
    "👋 Welcome to the PC Assistant!\n\nWhat would you like to do?\n1. 🔧 **Suggest Upgrade** — Upgrade individual PC components\n2. 💻 **Recommend Laptop** — Get a laptop recommendation\n\nPlease reply with **1** or **2**.",
};

const MOCK_CHAT_UPGRADE = [
  {
    message:
      "Great! You selected **🔧 Suggest Upgrade**.\n\n**What is the purpose?**\n1. 🎮 **Gaming**\n2. 🎨 **Design & Editing**\n3. 💼 **Programming & Office**\n\nPlease reply with **1**, **2**, or **3**.",
    is_complete: false,
    recommendations: null,
  },
  {
    message:
      "Purpose: **🎮 Gaming** ✅\n\n**What is your budget level?**\n1. 💰 **Low** — Budget-friendly\n2. 💰💰 **Medium** — Mid-range, best value\n3. 💰💰💰 **High** — Premium, top performance\n\nPlease reply with **1**, **2**, or **3**.",
    is_complete: false,
    recommendations: null,
  },
  {
    message:
      "Budget: **High** ✅\n\n**Which components do you want to upgrade?** (⭐ = recommended)\n\n1. **Case**\n2. **Cooling** ⭐\n3. **CPU (Processor)** ⭐\n4. **GPU (Graphics Card)** ⭐\n5. **RAM (Memory)** ⭐\n6. **Motherboard**\n7. **SSD (Storage)** ⭐\n8. **Power Supply** ⭐\n\nReply with numbers separated by commas (e.g., **1,2,3**)\nOr type **auto** to let me choose for you.",
    is_complete: false,
    recommendations: null,
  },
  {
    message:
      "**Select brand for CPU (Processor):**\n\n1. **AMD**\n2. **Intel**\n\nChoose by number or name, or type **auto** to let me pick.",
    is_complete: false,
    recommendations: null,
  },
  {
    message:
      "Brand: **AMD** ✅\n\n**Price range for CPU (Processor):** $69 – $721\n\nEnter your **target price** (e.g., **300**)\nOr type **auto** to let me choose based on your budget.",
    is_complete: false,
    recommendations: null,
  },
  {
    message:
      "**Select brand for GPU (Graphics Card):**\n\n1. **ASRock**\n2. **ASUS**\n3. **GIGABYTE**\n4. **MSI**\n5. **ONIX**\n6. **PNY**\n7. **PowerColor**\n8. **SAPPHIRE**\n9. **XFX**\n10. **Yeston**\n11. **ZOTAC**\n\nChoose by number or name, or type **auto** to let me pick.",
    is_complete: false,
    recommendations: null,
  },
  {
    message:
      "**Select GPU Chipset Manufacturer:**\n\n1. **AMD**\n2. **NVIDIA**\n\nChoose by number or name, or type **auto** to let me pick.",
    is_complete: false,
    recommendations: null,
  },
  {
    message:
      "Brand: **ASUS** ✅\n\n**Price range for GPU (Graphics Card):** $390 – $4500\n\nEnter your **target price** (e.g., **300**)\nOr type **auto** to let me choose based on your budget.",
    is_complete: false,
    recommendations: null,
  },
  {
    message:
      "**Select brand for Motherboard:**\n\n1. **ASRock**\n2. **ASUS**\n3. **Brand**\n4. **GIGABYTE**\n5. **MSI**\n\nChoose by number or name, or type **auto** to let me pick.",
    is_complete: false,
    recommendations: null,
  },
  {
    message:
      "Brand: **ASUS** ✅\n\n**Price range for Motherboard:** $100 – $1200\n\nEnter your **target price** (e.g., **300**)\nOr type **auto** to let me choose based on your budget.",
    is_complete: false,
    recommendations: null,
  },
  {
    message:
      "🎉 **Upgrade Plan Ready**\n\n**CPU**\n📦 Ryzen 7 7800X3D AMD cpu\n💲 $409.99 | 📊 95/100\n📝 • Fastest gaming CPU on AM5\n• 3D V-Cache lifts 1% lows\n• Cool & efficient\n• Saves budget for GPU\n\n**GPU**\n📦 ASUS TUF Gaming GeForce RTX 5070 OC 12GB 192-Bit GDDR7\n💲 $799.99 | 📊 85/100\n📝 • 1440p/4K high-refresh ready\n• DLSS 4.0 frame-gen\n• Efficient 12 GB GDDR7\n• Best price-to-performance in 50-series\n\n**Motherboard**\n📦 ASUS ROG Crosshair X870E Dark Hero ATX motherboard\n💲 $699.99 | 📊 98/100\n📝 • Flagship 20+2+2 VRM\n• Five PCIe 5.0 M.2\n• USB4 & AI OC tools\n• Premium cooling and layout\n\n**Total: $1909.97**\n✅ Recommendations saved!",
    is_complete: true,
    recommendations: {
      operation: "suggest_upgrade",
      purpose: "Gaming",
      budget: "high",
      selections: [
        { component: "cpu", brand: "AMD", target_price: 500, min_price: 350, max_price: 650 },
        { component: "gpu", brand: "ASUS", target_price: 3677.99, min_price: 2574.59, max_price: 4781.39, gpu_chipset: "NVIDIA" },
        { component: "motherboard", brand: "ASUS", target_price: 979.99, min_price: 685.99, max_price: 1273.99, cpu_platform: "AMD" },
      ],
      recommendations: [
        {
          component: "CPU",
          product_id: 433,
          product_name: "Ryzen 7 7800X3D AMD cpu",
          brand: "AMD",
          price: 409.99,
          score: 95,
          reason: "• Fastest gaming CPU on AM5\n• 3D V-Cache lifts 1% lows\n• Cool & efficient\n• Saves budget for GPU",
          rating_avg: 4.5,
          rating_count: 100,
        },
        {
          component: "GPU",
          product_id: 301,
          product_name: "ASUS TUF Gaming GeForce RTX 5070 OC 12GB 192-Bit GDDR7 PCI Express 5.0 DLSS 4.0 Graphics Card",
          brand: "ASUS",
          price: 799.99,
          score: 85,
          reason: "• 1440p/4K high-refresh ready\n• DLSS 4.0 frame-gen\n• Efficient 12 GB GDDR7\n• Best price-to-performance in 50-series",
          rating_avg: 4.5,
          rating_count: 100,
        },
        {
          component: "Motherboard",
          product_id: 790,
          product_name: "ASUS ROG Crosshair X870E Dark Hero ATX motherboard",
          brand: "ASUS",
          price: 699.99,
          score: 98,
          reason: "• Flagship 20+2+2 VRM\n• Five PCIe 5.0 M.2\n• USB4 & AI OC tools\n• Premium cooling and layout",
          rating_avg: 4.5,
          rating_count: 100,
        },
      ],
    },
  },
];

const MOCK_CHAT_LAPTOP = [
  {
    message:
      "Great! You selected **💻 Recommend Laptop**.\n\n**What is the purpose?**\n1. 🎮 **Gaming**\n2. 🎨 **Design & Editing**\n3. 💼 **Programming & Office**\n\nPlease reply with **1**, **2**, or **3**.",
    is_complete: false,
    recommendations: null,
  },
  {
    message:
      "Purpose: **🎮 Gaming** ✅\n\n**What is your budget level?**\n1. 💰 **Low** — Budget-friendly\n2. 💰💰 **Medium** — Mid-range, best value\n3. 💰💰💰 **High** — Premium, top performance\n\nPlease reply with **1**, **2**, or **3**.",
    is_complete: false,
    recommendations: null,
  },
  {
    "message": "🎉 **Top 3 Laptops Ready**\n\n**1. MSI Thin A15 15.6\" Gaming Laptop - AMD Ryzen 5 7535HS - GeForce RTX 4060 Laptop GPU - 16GB DDR5 RAM - 512GB SSD (Thin A15 B7VF-461US )**\n💲 $719.99 | 📊 87/100\n📝 • RTX 4060 beats all others at this price\n• DDR5 & Ryzen 7000 keep frames high\n• 1.5k+ reviews prove reliability\n• MSI build quality & cooling\n\n**2. HP Victus 15 Gaming Laptop, 15.6\" FHD 144Hz Display, Intel Core i5-13420H 8-core Processor, NVIDIA GeForce RTX 4050 6GB Graphic, 16GB DDR4 512GB PCIe SSD, Wi-Fi 6 Backlit Keyboard, Windows 11**\n💲 $676.79 | 📊 85/100\n📝 • Cheapest RTX 4050 on list\n• 144 Hz panel for smooth play\n• 16 GB RAM & 512 GB SSD included\n• HP service network\n\n**3. HP Victus 15.6 inch FHD 144Hz Gaming Laptop Intel Core i5-13420H NVIDIA GeForce RTX 4050 6GB - 16GB DDR4 512GB SSD Mica Silver (2024)**\n💲 $684.79 | 📊 84/100\n📝 • Same GPU & screen as #825\n• Slightly newer 2024 chassis\n• Still under $700\n• Good budget 1080p gaming\n\n✅ Recommendations saved!",
    "is_complete": true,
    "recommendations": {
      "operation": "recommend_laptop",
      "purpose": "Gaming",
      "budget": "low",
      "selections": [
        {
          "component": "GamingLaptop",
          "brand": "",
          "target_price": 567.2,
          "min_price": 397.04,
          "max_price": 737.36
        }
      ],
      "recommendations": [
        {
          "product_id": 806,
          "product_name": "MSI Thin A15 15.6\" Gaming Laptop - AMD Ryzen 5 7535HS - GeForce RTX 4060 Laptop GPU - 16GB DDR5 RAM - 512GB SSD (Thin A15 B7VF-461US )",
          "brand": "MSI", 
          "price": 719.99,
          "score": 87,
          "reason": "• RTX 4060 beats all others at this price\n• DDR5 & Ryzen 7000 keep frames high\n• 1.5k+ reviews prove reliability\n• MSI build quality & cooling",
          "category": "GamingLaptop",
          "image_url": "https://c1.neweggimages.com/productimage/nb640/34-156-873-01.png",
          "url": "https://www.newegg.com/msi-15-6-geforce-rtx-4060-laptop-gpu-amd-ryzen-5-7535hs-fhd-16gb-memory-512-gb-nvme-ssd/p/N82E16834156873R",
          "rating_avg": 4.5,
          "rating_count": 1535
        },
        {
          "product_id": 825,
          "product_name": "HP Victus 15 Gaming Laptop, 15.6\" FHD 144Hz Display, Intel Core i5-13420H 8-core Processor, NVIDIA GeForce RTX 4050 6GB Graphic, 16GB DDR4 512GB PCIe SSD, Wi-Fi 6 Backlit Keyboard, Windows 11",
          "brand": "unknown",
          "price": 676.79,
          "score": 85,
          "reason": "• Cheapest RTX 4050 on list\n• 144 Hz panel for smooth play\n• 16 GB RAM & 512 GB SSD included\n• HP service network",
          "category": "GamingLaptop",
          "image_url": "https://c1.neweggimages.com/productimage/nb640/B6HND2503070EPVX639.jpg",
          "url": "https://www.newegg.com/hp-raider-15-6-geforce-rtx-4050-laptop-gpu-2-3-ghz-fhd-16gb-memory-512gb-pcie-ssd/p/2WC-0001-05F66",
          "rating_avg": 4.5,
          "rating_count": 568
        },
        {
          "product_id": 851,
          "product_name": "HP Victus 15.6 inch FHD 144Hz Gaming Laptop Intel Core i5-13420H NVIDIA GeForce RTX 4050 6GB - 16GB DDR4 512GB SSD Mica Silver (2024)",
          "brand": "unknown",
          "price": 684.79,
          "score": 84,
          "reason": "• Same GPU & screen as #825\n• Slightly newer 2024 chassis\n• Still under $700\n• Good budget 1080p gaming",
          "category": "GamingLaptop",
          "image_url": "https://c1.neweggimages.com/productimage/nb640/A8X5S24112311SVRT25.jpg",
          "url": "https://www.newegg.com/hp-15-6-geforce-rtx-4050-laptop-gpu-intel-core-i5-13420h-16gb-memory-512-gb-ssd/p/2WC-0001-05CT7",
          "rating_avg": 4.5,
          "rating_count": 568
        }
      ]
    }
  },
];

// ============================================================
// PARSER
// ============================================================
const parseOptionsFromMessage = (message) => {
  const options = [];
  const lines = message.split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    const match = trimmed.match(
      /^(\d+)\.\s+(?:[^\s]*\s+)?\*{0,2}([^*\n(—]+?)\*{0,2}(?:\s*[—(].*)?$/
    );
    if (match) {
      const num = match[1];
      const label = match[2].trim();
      if (label.length > 0 && label.length < 40) {
        options.push({ value: num, label: `${num}. ${label}` });
      }
    }
  }
  return options;
};

const getSmartIcon = (label) => {
  const l = label.toLowerCase();
  if (l.includes("gaming") || l.includes("game")) return <Gamepad2 size={16} />;
  if (l.includes("design") || l.includes("edit")) return <Briefcase size={16} />;
  if (l.includes("program") || l.includes("code") || l.includes("office")) return <Code size={16} />;
  if (l.includes("laptop") || l.includes("recommend")) return <MonitorPlay size={16} />;
  if (l.includes("upgrade") || l.includes("suggest")) return <TrendingUp size={16} />;
  if (l.includes("low") || l.includes("medium") || l.includes("high") || l.includes("budget")) return <DollarSign size={16} />;
  if (l.includes("amd") || l.includes("intel") || l.includes("cpu") || l.includes("gpu") || l.includes("nvidia") || l.includes("asus") || l.includes("msi")) return <Cpu size={16} />;
  return <Sparkles size={16} />;
};

const buildOptions = (message) => {
  return parseOptionsFromMessage(message);
};

// ============================================================
// COMPONENT
// ============================================================
const ChatbotPage = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [quickOptions, setQuickOptions] = useState([]);
  const [isComplete, setIsComplete] = useState(false);
  const [isStarting, setIsStarting] = useState(true);
  const [finalData, setFinalData] = useState(null);

  // Mock tracking بـ useRef عشان متتأثرش بالـ re-renders
  const mockStepRef = useRef(0);
  const mockFlowRef = useRef("");

  const messagesEndRef = useRef(null);
  const hasStartedRef = useRef(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, quickOptions, isTyping]);

  useEffect(() => {
    if (!hasStartedRef.current) {
      hasStartedRef.current = true;
      startSession();
    }
  }, []);

  const getCurrentTime = () =>
    new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

  const addBotMessage = (text) =>
    setMessages((prev) => [...prev, { type: "bot", text, time: getCurrentTime() }]);

  const addUserMessage = (text) =>
    setMessages((prev) => [...prev, { type: "user", text, time: getCurrentTime() }]);

  // ============================================================
  // MOCK CHAT LOGIC
  // ============================================================
  const getMockChatResponse = (userMessage) => {
    const msg = userMessage.toLowerCase().trim();

    // تحديد الـ flow من أول رسالة بس
    if (mockStepRef.current === 0) {
      if (msg.includes("2") || msg.includes("laptop") || msg.includes("recommend")) {
        mockFlowRef.current = "laptop";
      } else {
        mockFlowRef.current = "upgrade";
      }
    }

    const flow =
      mockFlowRef.current === "laptop" ? MOCK_CHAT_LAPTOP : MOCK_CHAT_UPGRADE;
    const response = flow[mockStepRef.current] || flow[flow.length - 1];
    mockStepRef.current = Math.min(mockStepRef.current + 1, flow.length - 1);

    return { ...response, session_id: "mock-session-001" };
  };

  // ============================================================
  // START SESSION
  // ============================================================
  const startSession = async () => {
    setIsStarting(true);
    setMessages([]);
    setQuickOptions([]);
    setIsComplete(false);
    setFinalData(null);
    setSessionId(null);
    mockStepRef.current = 0;
    mockFlowRef.current = "";

    try {
      let data;

      if (USE_MOCK) {
        await new Promise((r) => setTimeout(r, 600));
        data = MOCK_START;
      } else {
        const userId = getUserId();
        if (!userId) {
          navigate("/login");
          return;
        }
        const res = await fetch(`${BASE_URL}/upgrade/start`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_id: userId, user_req_number: 0 }),
        });
        if (!res.ok) throw new Error("Server error");
        data = await res.json();
      }

      setSessionId(data.session_id);
      addBotMessage(data.message);
      setQuickOptions(buildOptions(data.message));
    } catch (err) {
      addBotMessage("❌ Failed to connect to server. Please try again.");
    } finally {
      setIsStarting(false);
    }
  };

  // ============================================================
  // SEND MESSAGE
  // ============================================================
  const sendMessage = async (value, displayLabel = null) => {
    const textToSend = value || inputMessage;
    if (!textToSend.trim() || !sessionId || isTyping || isComplete) return;

    addUserMessage(displayLabel || textToSend);
    setInputMessage("");
    setQuickOptions([]);
    setIsTyping(true);

    try {
      let data;

      if (USE_MOCK) {
        await new Promise((r) => setTimeout(r, 700));
        data = getMockChatResponse(textToSend);
      } else {
        const res = await fetch(`${BASE_URL}/upgrade/chat`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ session_id: sessionId, message: textToSend }),
        });
        if (!res.ok) throw new Error("Server error");
        data = await res.json();
      }

      addBotMessage(data.message);

      if (data.is_complete) {
        setIsComplete(true);
        setFinalData(data.recommendations);
        setQuickOptions([]);
      } else {
        setQuickOptions(buildOptions(data.message));
      }
    } catch (err) {
      addBotMessage("❌ Something went wrong. Please try again.");
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatMessage = (text) => {
    return text.split("\n").map((line, i) => {
      const parts = line.split(/\*\*(.*?)\*\*/g);
      return (
        <span key={i} className="d-block mb-1">
          {parts.map((part, j) =>
            j % 2 === 1 ? <strong key={j}>{part}</strong> : part
          )}
        </span>
      );
    });
  };

    const goToResults = () => {
    if (!finalData) return;

    const operation = finalData.operation;

    if (operation === "recommend_laptop") {
      navigate("/results/laptop", { state: { resultsData: finalData } });
    } else {
      navigate("/results/upgrade", { state: { resultsData: finalData } });
    }
  };

  // ============================================================
  // RENDER
  // ============================================================
  return (
    <div className="chat-wrapper">
      <div className="chat-header">
        <div className="chat-header-container">
          <div className="d-flex align-items-center">
            <div className="bot-avatar-header">
              <Bot size={24} className="text-white" />
            </div>
            <div className="ms-3">
              <h4 className="mb-0 fw-bold header-title">AI PC Assistant</h4>
              <small className="online-status">
                <span className="online-dot"></span>
                {USE_MOCK ? " Mock Mode" : " Online"}
              </small>
            </div>
          </div>
          <button
            className="new-chat-btn"
            onClick={() => {
              hasStartedRef.current = true;
              startSession();
            }}
            disabled={isStarting}
          >
            New Chat
          </button>
        </div>
      </div>

      <div className="chat-container">
        <div className="chat-messages-area position-relative">
          {isStarting && (
            <div className="text-center text-muted mt-4">
              <Loader size={24} className="spin-icon me-2" /> Starting Session...
            </div>
          )}

          {messages.map((msg, idx) => (
            <div key={idx} className={`message-row ${msg.type}`}>
              {msg.type === "bot" && (
                <div className="bot-avatar-msg">
                  <Bot size={18} className="text-white" />
                </div>
              )}
              <div className={`message-bubble ${msg.type}`}>
                <div className="message-text">
                  {msg.type === "bot" ? formatMessage(msg.text) : msg.text}
                </div>
                <div className={`message-time ${msg.type}`}>{msg.time}</div>
              </div>
              {msg.type === "user" && (
                <div className="user-avatar-msg">
                  <User size={18} className="text-white" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="message-row bot">
              <div className="bot-avatar-msg">
                <Bot size={18} className="text-white" />
              </div>
              <div className="message-bubble bot typing-bubble">
                <div className="typing-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}

          {quickOptions.length > 0 && !isComplete && (
            <div className="quick-options-container">
              <p className="options-title">Choose an option:</p>
              <div className="options-grid">
                {quickOptions.map((opt, idx) => (
                  <button
                    key={idx}
                    className="option-card"
                    onClick={() => sendMessage(opt.value, opt.label)}
                    disabled={isTyping}
                  >
                    <span className="option-icon">{getSmartIcon(opt.label)}</span>
                    <span className="option-text">{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div ref={messagesEndRef} style={{ height: "1px" }} />
        </div>

        {!isComplete ? (
          <div className="chat-input-area">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type your reply here..."
              className="chat-input"
              disabled={isTyping || isStarting}
            />
            <button
              onClick={() => sendMessage()}
              disabled={!inputMessage.trim() || isTyping || isStarting}
              className="send-btn"
            >
              <Send size={18} />
            </button>
          </div>
        ) : (
          <div className="d-flex flex-column gap-3 mt-3">
            {finalData && (
              <button className="view-results-btn w-100" onClick={goToResults}>
                View Detailed Results <ArrowRight size={18} className="ms-2" />
              </button>
            )}
            <button
              className="start-new-conv-btn w-100"
              onClick={() => {
                hasStartedRef.current = true;
                startSession();
              }}
            >
              Start New Conversation
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatbotPage;