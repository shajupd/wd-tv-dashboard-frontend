import { useNavigate } from "react-router-dom";
import Card from "../Component/CardComponents/Card";
import CardHeader from "../Component/CardComponents/CardHeader";
import LineGraph from "../Component/LineGraph";
import { MetricCard } from "../Component/Matrixcard";

import { AppUtils } from "../utils/app.utils";
import { CLIENTS_DATA } from "../utils/constants";

import { useClientScoreHistory } from "../hooks/api-hooks/useReports.hook";
import { useEffect, useMemo, useRef, useState } from "react";
import { useClientList } from "../hooks/api-hooks/useClients.hook";
import dayjs from "dayjs";

/* eslint-disable react/prop-types */
const MainPage = () => {
  const scrollRef = useRef(null);
  const navigate = useNavigate();
  const { data } = useClientList();

  const [selectedClientId, setSelectedClientId] = useState(
    data ? data[0]?._id : ""
  );

  useEffect(() => {
    if (data && data.length > 0) {
      setSelectedClientId(data[0]._id);
      const interval = setInterval(() => {
        setSelectedClientId((prevId) => {
          const currentIndex = data.findIndex(
            (client) => client._id === (prevId || data[0]._id)
          );
          const nextIndex = (currentIndex + 1) % data.length;
          return data[nextIndex]._id;
        });
      }, 10000); // 10 seconds

      return () => clearInterval(interval); // Cleanup interval on component unmount
    }
  }, [data]);

  useEffect(() => {
    if (scrollRef.current) {
      const scrollToClient = () => {
        const clientElement = document.getElementById(selectedClientId);
        if (clientElement) {
          const containerRect = scrollRef.current.getBoundingClientRect();
          const clientRect = clientElement.getBoundingClientRect();
          const scrollPosition =
            clientRect.top -
            containerRect.top +
            scrollRef.current.scrollTop -
            containerRect.height / 2 +
            clientRect.height / 2;

          scrollRef.current.scrollTo({
            top: scrollPosition,
            behavior: "smooth",
          });
        }
      };

      scrollToClient();
    }
  }, [selectedClientId]);

  return (
    <div className="w-screen h-dvh bg-black border-black text-white overflow-auto flex flex-col items-center justify-center p-10 gap-3">
      <h1 className="text-4xl font-bold mb-4 text-center text-gray-100 flex flex-row items-center justify-between gap-5 w-full mt-5">
        <div className="flex flex-col items-center justify-center text-gray-100 text-3xl">
          {dayjs().subtract(1, "month").format("MMMM YYYY")}
        </div>
        <span>
          <span className="animate-pulse ">❤️</span> Customer Health Score
        </span>
        <button
          onClick={() => {
            navigate("/settings");
          }}
          className="flex flex-col items-center justify-center text-gray-100 h-10 aspect-square w-10"
        >
          <span className="material-icons">settings</span>
        </button>
      </h1>
      <div className="flex flex-row items-start justify-center w-full h-full gap-5">
        <div className="w-5/12 bg-gray-900 p-0 rounded-lg border border-gray-700 h-full flex flex-col items-start justify-start">
          <h2 className="text-3xl font-bold mb-5 text-gray-100 border-b-[1px] border-gray-500 p-7 w-full">
            Client Scores
          </h2>
          <ClientList
            scrollRef={scrollRef}
            key={1}
            selectedClientId={selectedClientId}
            clients={CLIENTS_DATA}
            onSelectClient={(e) => {
              setSelectedClientId(e);
            }}
          />
        </div>
        <div className="w-full flex flex-col items-start justify-start gap-4">
          <ClientDashboard
            client={CLIENTS_DATA[0]}
            selectedClientId={selectedClientId}
          />
          <div className=" bg-gray-900 rounded-lg border border-gray-700 w-full h-full flex flex-row items-center gap-10">
            <div className="bg-red-500 p-6 rounded-lg text-2xl rounded-tr-none rounded-br-none">
              Last month
            </div>

            <div className="flex flex-row items-center justify-center gap-16">
              <div className="text-2xl">
                <b>Poor Health - </b>
                <span>2 (10%)</span>
              </div>
              <div className="text-2xl">
                <b>Avg Health - </b>
                <span>4 (15%)</span>
              </div>
              <div className="text-2xl">
                <b>Good Health - </b>
                <span>1 (8%)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;

const ClientList = ({ selectedClientId, onSelectClient, scrollRef }) => {
  const { data, isLoading } = useClientScoreHistory();

  return (
    <div
      className="w-full p-4 pt-0 overflow-auto custom-scroll"
      ref={scrollRef}
    >
      {isLoading
        ? "Loading..."
        : data.map((eachReport) => (
            <div
              id={eachReport?.client.id}
              key={eachReport?.client.id}
              className={`flex justify-between items-center p-4 mb-0 rounded-lg cursor-pointer ${
                eachReport?.client._id === selectedClientId
                  ? "bg-gray-700"
                  : "hover:bg-gray-800"
              }`}
              onClick={() => onSelectClient(eachReport?.client._id)}
            >
              <span className="text-gray-300 text-xl text-start flex flex-row items-center gap-5">
                <img
                  className="h-10 object-contain aspect-square bg-white rounded-2xl p-1"
                  src={eachReport?.client?.imageUrl}
                  alt=""
                />
                {eachReport?.client.name}
              </span>
              <div className="flex items-center gap-1">
                {eachReport?.scores?.map((score, index) => (
                  <div
                    key={index}
                    className={`w-10 aspect-square rounded-full ml-1 text-[15px] flex items-center justify-center ${AppUtils.getScoreColorOverall(
                      score?.overallScore
                    )}`}
                    title={`Month ${index + 1}: ${score}`}
                  >
                    {score?.month.split(" ")[0]}
                  </div>
                ))}
              </div>
            </div>
          ))}
      {/* {clients.map((client) => (
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
      ))} */}
    </div>
  );
};

const ClientDashboard = ({ selectedClientId }) => {
  const { data } = useClientScoreHistory();
  const activeData = useMemo(() => {
    return data?.find((eachReport) => {
      return eachReport?.client._id === selectedClientId;
    });
  }, [data, selectedClientId]);

  const lineGraphData = useMemo(() => {
    let labels = [];
    let values = [];

    if (activeData && activeData?.scores?.length > 0) {
      labels = activeData?.scores.map((score) => score?.month);
      values = activeData?.scores.map((score) => score?.overallScore || 0);
    }

    return {
      labels: labels?.reverse(),
      values: values?.reverse(),
    };
  }, [activeData]);

  const visibleData = useMemo(() => {
    if (activeData) {
      const prevMonth = dayjs().subtract(1, "month").format("MMM YYYY");
      return activeData?.scores.find((score) => score?.month === prevMonth);
    }
    return null;
  }, [activeData]);

  return (
    <div className="p-8 bg-gray-900 rounded-lg border border-gray-700 w-full h-full flex flex-col items-start gap-5">
      <h2 className="text-3xl font-bold mb-4 text-gray-100 flex flex-row items-center gap-5">
        <img
          className="h-14 object-contain aspect-square bg-white rounded-2xl p-1"
          src={activeData?.client?.imageUrl}
          alt=""
        />
        {activeData?.client?.name}
      </h2>
      <div className="flex flex-row gap-3mb-4 w-full">
        <Card className="col-span-1 bg-gray-800 border-gray-700 w-2/6">
          <CardHeader className="p-2">
            <div className="text-xl text-gray-300">Overall Score</div>
          </CardHeader>
          <div className="p-2">
            <p
              className={`text-6xl font-bold ${AppUtils.getScoreTextColorOverall(
                visibleData?.overallScore
              )}`}
            >
              {visibleData?.overallScore}/100
            </p>
          </div>
        </Card>
        <div className="w-full text-xl">
          <LineGraph data={lineGraphData} />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 w-full mt-8">
        <div>
          <h3 className="text-2xl font-semibold mb-2 text-gray-300">
            Marketing
          </h3>
          <div className="grid gap-4">
            <MetricCard title="CPL (Monthly)" value={visibleData?.cpl} />
            <MetricCard
              title="Quality Lead % (Monthly)"
              value={visibleData?.qualityLead}
            />
            <MetricCard title="CAC" value={visibleData?.cac} />
          </div>
        </div>
        <div>
          <h3 className="text-2xl font-semibold mb-2 text-gray-300">Finance</h3>
          <div className="grid gap-4">
            <MetricCard title="Pay on Time" value={visibleData?.payOnTime} />
            <MetricCard
              title="Budget Utilization"
              value={visibleData?.budgetUtilization}
            />
            <MetricCard
              title="Client Profitability"
              value={visibleData?.clientProfitability}
            />
          </div>
        </div>
        <div>
          <h3 className="text-2xl font-semibold mb-2 text-gray-300">
            Engagement
          </h3>
          <div className="grid gap-4">
            <MetricCard
              title="Meeting Attendance"
              value={visibleData?.meetingAttendance}
            />
            <MetricCard
              title="Client Support Response"
              value={visibleData?.clientSupportResponse}
            />
            <MetricCard
              title="Approval Time"
              value={visibleData?.approvalTime}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
