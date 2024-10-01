import { useState } from "react";
import ClientList from "../ClientList";
import InsightList from "../InsightList";

const Navbar = () => {
  const [active, setActive] = useState(1);

  const options = [
    {
      id: 1,
      name: "Clients",
      link: "/settings/clients",
    },
    {
      id: 2,

      name: "Insights",
      link: "/settings/insights",
    },
  ];

  function handleClick(id) {
    setActive(id);
  }

  function renderPage() {
    switch (active) {
      case 1:
        return <ClientList />;
      default:
        return <InsightList />;
    }
  }

  return (
    <div className="text-white w-full h-full flex flex-row gap-10 ">
      <div className="w-56 h-full rounded-2xl p-5 border border-gray-800 gap-2 flex flex-col">
        {options.map((option, index) => (
          <div
            key={index}
            onClick={() => handleClick(option.id)}
            className={`h-12 flex items-center justify-start pl-5 rounded-lg cursor-pointer hover:bg-gray-800 ${
              active === option.id ? "bg-gray-800" : ""
            }`}
          >
            <div>{option.name}</div>
          </div>
        ))}
      </div>

      <div className="w-full">{renderPage()}</div>
    </div>
  );
};

export default Navbar;
