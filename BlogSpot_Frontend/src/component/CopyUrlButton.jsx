import { useState } from "react";
import { FiCopy ,FiCheck } from "react-icons/fi";

const CopyUrlButton = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error("Failed to copy URL:", err);
    }
  };

  return (
  
  <>
   <button
      onClick={handleCopy}
      className="flex items-center m-3 text-white bg-blue-500 hover:bg-black px-3 py-1 rounded transition duration-200"
    >
      {copied ? <FiCheck className="mx-1" /> : <FiCopy className="mx-1" />}
      {copied ? "Copied!" : "Copy URL"}
    </button>
  </>

  );
};

export default CopyUrlButton;
