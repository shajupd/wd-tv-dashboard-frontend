import Card from "../Component/CardComponents/Card";
import CardHeader from "../Component/CardComponents/CardHeader";
import LineGraph from "../Component/LineGraph";
import { MetricCard } from "../Component/Matrixcard";
import { AppUtils } from "../utils/app.utils";
import { CLIENTS_DATA } from "../utils/constants";

console.log(CLIENTS_DATA);

/* eslint-disable react/prop-types */
const MainPage = () => {
  return (
    <div className="w-screen h-dvh bg-black border-black text-white overflow-auto flex flex-col items-center justify-center p-10 gap-6">
      <h1 className="text-4xl font-bold mb-4 text-center text-gray-100">
        Webdura Digital Marketing TV Dashboard
      </h1>
      <div className="flex flex-row items-start justify-center w-full h-full gap-5">
        <div className="w-4/12 bg-gray-900 p-4 rounded-lg border border-gray-700 h-full flex flex-col items-start justify-start">
          <h2 className="text-xl font-bold mb-4 text-gray-100">
            Client Scores
          </h2>
          <ClientList
            key={1}
            selectedClientId={1}
            clients={CLIENTS_DATA}
            onSelectClient={() => {
              console.log("Client selected");
            }}
          />
        </div>
        <ClientDashboard client={CLIENTS_DATA[0]} />
      </div>
    </div>
  );
};

export default MainPage;

const ClientList = ({ clients, selectedClientId, onSelectClient }) => (
  <div className="w-full">
    {clients.map((client) => (
      <div
        key={client.id}
        className={`flex justify-between items-center p-2 mb-2 rounded cursor-pointer ${
          client.id === selectedClientId ? "bg-gray-700" : "hover:bg-gray-800"
        }`}
        onClick={() => onSelectClient(client.id)}
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
    ))}
  </div>
);

const ClientDashboard = ({ client }) => {
  const totalScore = AppUtils.calculateTotalScore(client);

  return (
    <div className="p-4 bg-gray-900 rounded-lg border border-gray-700 w-full h-full flex flex-col items-start">
      <h2 className="text-2xl font-bold mb-4 text-gray-100">{client.name}</h2>
      <div className="flex flex-row gap-3mb-4 w-full">
        <Card className="col-span-1 bg-gray-800 border-gray-700 w-2/6">
          <CardHeader className="p-2">
            <div className="text-lg text-gray-300">Overall Score</div>
          </CardHeader>
          <div className="p-2">
            <p
              className={`text-4xl font-bold ${AppUtils.getScoreTextColor(
                totalScore
              )}`}
            >
              {totalScore}/100
            </p>
          </div>
        </Card>
        <div className="w-full">
          <LineGraph />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 w-full mt-8">
        <div>
          <h3 className="text-lg font-semibold mb-2 text-gray-300">
            Marketing
          </h3>
          <div className="grid gap-2">
            <MetricCard title="CPL (Monthly)" value={client.marketing.cpl} />
            <MetricCard
              title="Quality Lead % (Monthly)"
              value={client.marketing.qualityLead}
            />
            <MetricCard title="CAC" value={client.marketing.cac} />
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2 text-gray-300">Finance</h3>
          <div className="grid gap-2">
            <MetricCard title="Pay on Time" value={client.finance.payOnTime} />
            <MetricCard
              title="Budget Utilization"
              value={client.finance.budgetUtilization}
            />
            <MetricCard
              title="Client Profitability"
              value={client.finance.clientProfitability}
            />
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2 text-gray-300">
            Engagement
          </h3>
          <div className="grid gap-2">
            <MetricCard
              title="Meeting Attendance"
              value={client.engagement.meetingAttendance}
            />
            <MetricCard
              title="Client Support Response"
              value={client.engagement.clientSupportResponse}
            />
            <MetricCard
              title="Approval Time"
              value={client.engagement.approvalTime}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
