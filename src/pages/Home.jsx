import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Select from "react-select";
import { BsStars } from "react-icons/bs";
import { HiOutlineCode } from "react-icons/hi";
import Editor from "@monaco-editor/react";
import { IoCloseSharp, IoCopy } from "react-icons/io5";
import { PiExportBold } from "react-icons/pi";
import { ImNewTab } from "react-icons/im";
import { FiRefreshCcw } from "react-icons/fi";
import { GoogleGenAI } from "@google/genai";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";

const Home = () => {
  const options = [
    { value: "html-css", label: "HTML + CSS" },
    { value: "html-tailwind", label: "HTML + Tailwind CSS" },
    { value: "html-bootstrap", label: "HTML + Bootstrap" },
    { value: "html-css-js", label: "HTML + CSS + JS" },
    { value: "html-tailwind-bootstrap", label: "HTML + Tailwind + Bootstrap" },
  ];

  const [outputScreen, setOutputScreen] = useState(false);
  const [tab, setTab] = useState(1);
  const [prompt, setPrompt] = useState("");
  const [frameWork, setFrameWork] = useState(options[0]);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [isNewTabOpen, setIsNewTabOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  function extractCode(response) {
    const match = response.match(/```(?:\w+)?\n?([\s\S]*?)```/);
    return match ? match[1].trim() : response.trim();
  }

  const ai = new GoogleGenAI({
    apiKey: import.meta.env.VITE_GOOGLE_GEMINI_API_KEY,
  });

  async function getResponse() {
    if (!prompt.trim())
      return toast.error("Please describe your component first");

    try {
      setLoading(true);
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `
     You are an experienced programmer with expertise in web development and UI/UX design. You create modern, animated, and fully responsive UI components. You are highly skilled in HTML, CSS, Tailwind CSS, Bootstrap, JavaScript, React, Next.js, Vue.js, Angular, and more.

Now, generate a UI component for: ${prompt}  
Framework to use: ${frameWork.value}  

Requirements:  
- The code must be clean, well-structured, and easy to understand.  
- Optimize for SEO where applicable.  
- Focus on creating a modern, animated, and responsive UI design.  
- Include high-quality hover effects, shadows, animations, colors, and typography.  
- Return ONLY the code, formatted properly in **Markdown fenced code blocks**.  
- Do NOT include explanations, text, comments, or anything else besides the code.  
- And give the whole code in a single HTML file.
      `,
      });

      setCode(extractCode(response.text));
      setOutputScreen(true);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while generating code");
    } finally {
      setLoading(false);
    }
  }

  const copyCode = async () => {
    if (!code.trim()) return toast.error("No code to copy");
    try {
      await navigator.clipboard.writeText(code);
      toast.success("Code copied to clipboard");
    } catch (err) {
      console.error("Failed to copy: ", err);
      toast.error("Failed to copy");
    }
  };

  const downnloadFile = () => {
    if (!code.trim()) return toast.error("No code to download");

    const fileName = "GenUI-Code.html";
    const blob = new Blob([code], { type: "text/plain" });
    let url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);
    toast.success("File downloaded");
  };

  return (
    <>
      <Navbar />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-6 lg:px-16">
        <div
          className="w-full py-6 rounded-xl mt-5 p-5"
          style={{ backgroundColor: "var(--secondary-bg)" }}
        >
          <h3 className="text-[25px] font-semibold sp-text">
            AI Component Generator
          </h3>
          <p
            className="mt-2 text-[16px]"
            style={{ color: "var(--text-secondary)" }}
          >
            Describe your component and let AI code it for you.
          </p>

          <p
            className="text-[15px] font-[700] mt-4"
            style={{ color: "var(--text-primary)" }}
          >
            Framework
          </p>
          <Select
            className="mt-2"
            options={options}
            value={frameWork}
            styles={{
              control: (base) => ({
                ...base,
                backgroundColor: "var(--tertiary-bg)",
                borderColor: "var(--border-color)",
                color: "var(--text-primary)",
                boxShadow: "none",
                "&:hover": { borderColor: "var(--border-color)" },
              }),
              menu: (base) => ({
                ...base,
                backgroundColor: "var(--secondary-bg)",
                color: "var(--text-primary)",
              }),
              option: (base, state) => ({
                ...base,
                backgroundColor: state.isSelected
                  ? "#8b5cf6"
                  : state.isFocused
                  ? "var(--tertiary-bg)"
                  : "var(--secondary-bg)",
                color: "var(--text-primary)",
                "&:active": { backgroundColor: "#8b5cf6" },
              }),
              singleValue: (base) => ({
                ...base,
                color: "var(--text-primary)",
              }),
              placeholder: (base) => ({
                ...base,
                color: "var(--text-secondary)",
              }),
              input: (base) => ({ ...base, color: "var(--text-primary)" }),
            }}
            onChange={(selected) => setFrameWork(selected)}
          />

          <p
            className="text-[15px] font-[700] mt-5"
            style={{ color: "var(--text-primary)" }}
          >
            Describe your component
          </p>
          <textarea
            onChange={(e) => setPrompt(e.target.value)}
            value={prompt}
            className="w-full min-h-[200px] rounded-xl mt-3 p-3 outline-none focus:ring-2 focus:ring-purple-500 resize-none"
            style={{
              backgroundColor: "var(--tertiary-bg)",
              color: "var(--text-primary)",
              border: "1px solid var(--border-color)",
            }}
            placeholder="Describe your component in detail and AI will generate it..."
          ></textarea>

          <div className="flex items-center justify-between mt-3">
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              Click on generate button to get your code
            </p>
            <button
              onClick={getResponse}
              className="flex items-center p-3 rounded-lg border-0 bg-gradient-to-r from-purple-400 to-purple-600 px-5 gap-2 transition-all hover:opacity-80 hover:scale-105 active:scale-95"
            >
              {loading ? <ClipLoader color="white" size={18} /> : <BsStars />}
              Generate
            </button>
          </div>
        </div>

        <div
          className="relative mt-2 w-full h-[80vh] rounded-xl overflow-hidden"
          style={{ backgroundColor: "var(--secondary-bg)" }}
        >
          {!outputScreen ? (
            <div className="w-full h-full flex items-center flex-col justify-center">
              <div className="p-5 w-[70px] flex items-center justify-center text-[30px] h-[70px] rounded-full bg-gradient-to-r from-purple-400 to-purple-600">
                <HiOutlineCode />
              </div>
              <p
                className="text-[16px] mt-3"
                style={{ color: "var(--text-secondary)" }}
              >
                Your component & code will appear here.
              </p>
            </div>
          ) : (
            <>
              <div
                className="w-full h-[50px] flex items-center gap-3 px-3"
                style={{ backgroundColor: "var(--tertiary-bg)" }}
              >
                <button
                  onClick={() => setTab(1)}
                  className={`w-1/2 py-2 rounded-lg transition-all ${
                    tab === 1 ? "bg-purple-600 text-white" : ""
                  }`}
                  style={
                    tab !== 1
                      ? {
                          backgroundColor: "var(--secondary-bg)",
                          color: "var(--text-primary)",
                          border: "1px solid var(--border-color)",
                        }
                      : {}
                  }
                >
                  Code
                </button>
                <button
                  onClick={() => setTab(2)}
                  className={`w-1/2 py-2 rounded-lg transition-all ${
                    tab === 2 ? "bg-purple-600 text-white" : ""
                  }`}
                  style={
                    tab !== 2
                      ? {
                          backgroundColor: "var(--secondary-bg)",
                          color: "var(--text-primary)",
                          border: "1px solid var(--border-color)",
                        }
                      : {}
                  }
                >
                  Preview
                </button>
              </div>

              <div
                className="w-full h-[50px] flex items-center justify-between px-4"
                style={{ backgroundColor: "var(--tertiary-bg)" }}
              >
                <p
                  className="font-bold"
                  style={{ color: "var(--text-primary)" }}
                >
                  Code Editor
                </p>
                <div className="flex items-center gap-2">
                  {tab === 1 ? (
                    <>
                      <button
                        onClick={copyCode}
                        className="w-10 h-10 rounded-xl flex items-center justify-center hover:opacity-80"
                        style={{
                          border: "1px solid var(--border-color)",
                          backgroundColor: "var(--secondary-bg)",
                          color: "var(--text-primary)",
                        }}
                      >
                        <IoCopy />
                      </button>
                      <button
                        onClick={downnloadFile}
                        className="w-10 h-10 rounded-xl flex items-center justify-center hover:opacity-80"
                        style={{
                          border: "1px solid var(--border-color)",
                          backgroundColor: "var(--secondary-bg)",
                          color: "var(--text-primary)",
                        }}
                      >
                        <PiExportBold />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => setIsNewTabOpen(true)}
                        className="w-10 h-10 rounded-xl flex items-center justify-center hover:opacity-80"
                        style={{
                          border: "1px solid var(--border-color)",
                          backgroundColor: "var(--secondary-bg)",
                          color: "var(--text-primary)",
                        }}
                      >
                        <ImNewTab />
                      </button>
                      <button
                        onClick={() => setRefreshKey((prev) => prev + 1)}
                        className="w-10 h-10 rounded-xl flex items-center justify-center hover:opacity-80"
                        style={{
                          border: "1px solid var(--border-color)",
                          backgroundColor: "var(--secondary-bg)",
                          color: "var(--text-primary)",
                        }}
                      >
                        <FiRefreshCcw />
                      </button>
                    </>
                  )}
                </div>
              </div>

              <div className="h-full">
                {tab === 1 ? (
                  <Editor
                    value={code}
                    height="100%"
                    theme="vs-dark"
                    language="html"
                  />
                ) : (
                  <iframe
                    key={refreshKey}
                    srcDoc={code}
                    className="w-full h-full bg-white text-black"
                  ></iframe>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {isNewTabOpen && (
        <div
          className="absolute inset-0 w-screen h-screen overflow-auto"
          style={{ backgroundColor: "var(--secondary-bg)" }}
        >
          <div
            className="w-full h-[60px] flex items-center justify-between px-5"
            style={{
              backgroundColor: "var(--tertiary-bg)",
              color: "var(--text-primary)",
            }}
          >
            <p className="font-bold">Preview</p>
            <button
              onClick={() => setIsNewTabOpen(false)}
              className="w-10 h-10 rounded-xl flex items-center justify-center hover:opacity-80"
              style={{
                border: "1px solid var(--border-color)",
                backgroundColor: "var(--secondary-bg)",
                color: "var(--text-primary)",
              }}
            >
              <IoCloseSharp />
            </button>
          </div>
          <iframe
            srcDoc={code}
            className="w-full h-[calc(100vh-60px)]"
          ></iframe>
        </div>
      )}
    </>
  );
};

export default Home;
