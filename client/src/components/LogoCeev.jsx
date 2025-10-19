import React from "react";
import { FileText } from "lucide-react";

const LogoCeev = () => {
  return (
    <div className="flex items-center space-x-2 select-none cursor-pointer">
      {/* Icon */}
      <div className="p-2 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-xl shadow-md">
        <FileText className="w-3 h-3 text-white" />
      </div>

      {/* Text */}
      <span className="text-2xl font-semibold tracking-tight text-gray-800">
        Ceev
      </span>
    </div>
  );
};

export default LogoCeev;