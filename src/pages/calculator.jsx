import React, { useState } from "react";

function Calculator() {
  const [input, setInput] = useState("0");

  const handleButtonClick = (value) => {
    if (!isNaN(value) || value === ".") {
      // Handle number and decimal input
      setInput((prev) => (prev === "0" ? value : prev + value));
    } else if (value === "AC") {
      // Clear all
      setInput("0");
    } else if (value === "=") {
      // Handle equal button, perform the calculation
      try {
        // Replace "×" with "*" and "÷" with "/" for valid JavaScript evaluation
        const sanitizedInput = input.replace(/×/g, "*").replace(/÷/g, "/");

        // Validate the input to ensure it's a valid expression
        if (sanitizedInput.match(/^[\d\+\-\*\/\.\(\)]+$/)) {
          const result = new Function("return " + sanitizedInput)(); 
          setInput(result.toString()); 
        } else {
          setInput("Error"); 
        }
      } catch (error) {
        setInput("Error"); 
      }
    } else {
    
      const lastChar = input[input.length - 1];
      if (/[+\-×÷]/.test(lastChar)) {
        setInput(input.slice(0, -1) + value); 
      } else {
        setInput((prev) => (prev === "0" ? value : prev + value));
      }
    }
  };

  const buttons = [
    "AC", "±", "%", "÷",
    "7", "8", "9", "×",
    "4", "5", "6", "-",
    "1", "2", "3", "+",
    "0", ".", "=",
  ];

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: "url('bg3.jpg')",
      }}
    >
      <h1
  className="text-5xl font-bold text-[#FFFFFF] mb-6 font-mono italic"
  style={{
    textShadow: `
      2px 2px 4px #ac9972, 
      -2px -2px 4px rgba(255, 255, 255, 0.8),
      4px 4px 8px rgba(0, 0, 0, 0.4),
      -4px -4px 6px rgba(172, 153, 114, 0.5)
    `,
  }}
>
  Calculator
</h1>


      {/* Calculator Container */}
      <div
  className="w-[360px] pt-6 pb-6 px-4 rounded-[70px] bg-gradient-to-b from-[#2c2c2c] to-[#1d1d1d] shadow-lg backdrop-blur-md border-[1px] border-[#2c2c2c]/70 relative overflow-hidden"
  style={{
    boxShadow: `
      0px 10px 20px rgba(0, 0, 0, 0.7),
      inset 0px 5px 10px rgba(255, 255, 255, 0.05),
      inset -5px -5px 10px rgba(0, 0, 0, 0.6)
    `,
    borderImage: "linear-gradient(180deg, rgba(255,255,255,0.1), rgba(0,0,0,0.6)) 1",
  }}
>
  <div className="text-[#FFFFFF] text-right text-5xl font-light mb-4 px-4 py-6 ">
          {input}
        </div>
  <div
    className="absolute inset-0 z-0 rounded-[70px] pointer-events-none"
    style={{
      background: "radial-gradient(circle at center, rgba(255, 255, 255, 0.05), transparent 70%)",
    }}
  ></div>
        
        <div className="grid grid-cols-4 gap-2">
  {buttons.map((btn, idx) => (
    <button
      key={idx}
      onClick={() => handleButtonClick(btn)}
      className={`text-3xl font-semibold rounded-full transition-transform transform ${
        btn === "0"
          ? "h-[70px] w-[160px] col-span-2 bg-[#4B4B4B] text-[#FFFFFF] shadow-inner hover:scale-105"
          : btn === "=" || btn === "+" || btn === "-" || btn === "×" || btn === "÷"
          ? "h-[70px] w-[70px] bg-gradient-to-r from-[#ffae00] to-[#ff9100] text-[#FFFFFF] shadow-lg hover:scale-105"
          : isNaN(btn) && btn !== "."
          ? "h-[70px] w-[70px] bg-[#9E9E9E] text-[#FFFFFF] shadow-md hover:scale-105"
          : "h-[70px] w-[70px] bg-[#4B4B4B] text-[#FFFFFF] shadow-inner hover:scale-105"
      }`}
      style={{
        gridColumn: btn === "0" ? "span 2" : "span 1",
      }}
    >
      {btn}
    </button>
  ))}
</div>

      </div>
    </div>
  );
}

export default Calculator;
