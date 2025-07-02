import React, { useState } from "react";
import { Dashboard } from "../pages/Dashboard";
import StockTable from "./StockTable";
import CurrencyWidget from "./CurrencyWidget";

const tabs = ["CryptoTable", "CurrencyConverter", "StockTable"];

const MainContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState("CryproTable");

  const renderContent = () => {
    switch (activeTab) {
      case "CryptoTable":
        return <div className="p-6 text-lg"><Dashboard/></div>;
      case "CurrencyConverter":
        return(<><div className="p-6 text-lg"><div className="p-6"><CurrencyWidget /></div>
        </div></>);
     case "StockTable":
      return <div className="p-6 text-lg"><StockTable/></div>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <header className="bg-purple-500 text-white shadow">
     
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          {/* <img src="./vite.svg"></img> */}
          <img src="./src/assets/react.svg"></img>
          
        <h1 className="text-4xl leading-tight font-bold">FinTech Dashboard</h1>
          <div className="flex space-x-4">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`px-4 py-2 font-medium rounded transition ${
                  activeTab === tab
                    ? "bg-blue-700 text-white"
                    : "text-white hover:bg-blue-600"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="container mx-auto mt-6">{renderContent()}</main>
    </div>
  );
};

export default MainContent;
