import { AppUtils } from "../utils/app.utils";

/* eslint-disable react/prop-types */
const ClientScoreCard = ({ client, selectedClientId }) => {
  return (
    <div
      key={client.id}
      className={`flex justify-between items-center p-2 mb-2 rounded cursor-pointer ${
        client.id === selectedClientId ? "bg-gray-700" : "hover:bg-gray-800"
      }`}
    >
      <span className="text-gray-300">{client.name}</span>
      <div className="flex items-center">
        {client.scoreHistory.map((score, index) => (
          <div
            key={index}
            className={`w-6 h-6 rounded-full ml-1 ${AppUtils.getScoreColor(
              score
            )}`}
            title={`Month ${index + 1}: ${score}`}
          />
        ))}
        <span
          className={`ml-2 font-bold ${AppUtils.getScoreTextColor(
            client.currentScore
          )}`}
        >
          {client.currentScore}
        </span>
      </div>
    </div>
  );
};

export default ClientScoreCard;
