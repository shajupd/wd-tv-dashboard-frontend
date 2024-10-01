/* eslint-disable react/prop-types */
import { Modal, Table } from "antd";
import {
  useInsightBulkAdd,
  useInsightList,
  useInsightRemove,
} from "../hooks/api-hooks/useInsightHook";
import { useRef, useState } from "react";
import { useClientList } from "../hooks/api-hooks/useClients.hook";

const InsightList = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { data, isLoading } = useInsightList();
  const { mutate: mutateRemove } = useInsightRemove();

  const columns = [
    {
      title: "Client",
      dataIndex: "client",
      key: "client",
      sorter: (a, b) => a.client.localeCompare(b.client),
    },
    {
      title: "Month",
      dataIndex: "month",
      key: "month",
      sorter: (a, b) => a.month.localeCompare(b.month),
    },
    {
      title: "CPL",
      dataIndex: "cpl",
      key: "cpl",
    },
    {
      title: "Pay On Time",
      dataIndex: "payOnTime",
      key: "payOnTime",
    },
    {
      title: "Meeting Attendance",
      dataIndex: "meetingAttendance",
      key: "meetingAttendance",
    },
    {
      title: "Quality Leads",
      dataIndex: "qualityLeads",
      key: "qualityLeads",
    },
    {
      title: "Budget Utilization",
      dataIndex: "budgetUtilization",
      key: "budgetUtilization",
    },
    {
      title: "Client Support Response",
      dataIndex: "clientSupportResponse",
      key: "clientSupportResponse",
    },
    {
      title: "CAC",
      dataIndex: "cac",
      key: "cac",
    },
    {
      title: "Client Profitability",
      dataIndex: "clientProfitability",
      key: "clientProfitability",
    },
    {
      title: "Approval Time",
      dataIndex: "approvalTime",
      key: "approvalTime",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <button onClick={() => handleRemove(record?.key)}>
          <span className="material-icons">delete</span>
        </button>
      ),
    },
  ];
  const _data = data?.map((item) => ({
    key: item._id,
    client: item.client.name,
    month: item.month,
    cpl: item.cpl,
    payOnTime: item.payOnTime,
    meetingAttendance: item.meetingAttendance,
    qualityLeads: item.qualityLeads,
    budgetUtilization: item.budgetUtilization,
    clientSupportResponse: item.clientSupportResponse,
    cac: item.cac,
    clientProfitability: item.clientProfitability,
    approvalTime: item.approvalTime,
  }));

  function handleRemove(id) {
    mutateRemove(id);
  }

  return (
    <div className="w-full h-full flex flex-col gap-5">
      <div className="w-full flex justify-end gap-5">
        <button onClick={() => setIsAddModalOpen(true)}>Upload data</button>
        <ImportModal open={isAddModalOpen} setOpen={setIsAddModalOpen} />
      </div>
      <Table
        loading={isLoading}
        dataSource={_data}
        columns={columns}
        pagination={false}
      />
    </div>
  );
};

export default InsightList;

const ImportModal = ({ open, setOpen }) => {
  const { data } = useClientList();
  const { mutate } = useInsightBulkAdd();
  const inputRef = useRef(null);
  function handleButtonClick() {
    inputRef?.current?.click();
  }
  function handleFileChange(e) {
    const file = e.target.files[0];
    //Only allow csv
    if (file.type !== "text/csv") {
      alert("Only csv files are allowed");
      return;
    }
    //Only allow files less than 1MB
    if (file.size > 1000000) {
      alert("File size should be less than 1MB");
      return;
    }

    //convert the vsv to json
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function () {
      const csv = reader.result;
      const lines = csv.split("\n");
      const json = [];

      for (let i = 1; i < lines.length; i++) {
        const obj = {};
        const currentLine = lines[i].split(",");
        obj.client = currentLine[1];
        obj.month = currentLine[2];
        obj.cpl = currentLine[3];
        obj.payOnTime = currentLine[4];
        obj.meetingAttendance = currentLine[5];
        obj.qualityLeads = currentLine[6];
        obj.budgetUtilization = currentLine[7];
        obj.clientSupportResponse = currentLine[8];
        obj.cac = currentLine[9];
        obj.clientProfitability = currentLine[10];
        obj.approvalTime = currentLine[11];
        json.push(obj);
      }

      //send the json to the backend
      mutate(json);
    };
  }

  function downloadSampleFile() {
    //create a csv file with the headers, also add the clients and months bu default

    const clientList = data?.map((item) => ({
      name: item.name,
      _id: item._id,
    }));

    const month = new Date().toLocaleString("default", { month: "short" });
    const year = new Date().getFullYear();

    const monthYear = `${month} ${year}`;
    const csv = `clientName,clientId,month,cpl,payOnTime,meetingAttendance,qualityLeads,budgetUtilization,clientSupportResponse,cac,clientProfitability,approvalTime\n${clientList
      .map((item) => `${item.name},${item._id},${monthYear},0,0,0,0,0,0,0,0,0`)
      .join("\n")}`;
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sample.csv";
    a.click();
  }

  return (
    <Modal
      title="Upload insights from csv"
      footer={false}
      open={open}
      onCancel={() => setOpen(false)}
    >
      <div className="flex flex-col items-center justify-center gap-2 h-44">
        <input
          onChange={handleFileChange}
          ref={inputRef}
          className="hidden"
          type="file"
        />
        <button onClick={handleButtonClick.bind(this)}>Upload</button>
        <span
          onClick={downloadSampleFile}
          className="text-[12px] cursor-pointer text-blue-500 mt-2"
        >
          Click to get sample file
        </span>
      </div>
    </Modal>
  );
};
