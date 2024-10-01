/* eslint-disable react/prop-types */
import { Form, Input, Modal, Table } from "antd";
import {
  useClientList,
  useClientListMutate,
} from "../hooks/api-hooks/useClients.hook";
import { useState } from "react";

const ClientList = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const { data, isLoading } = useClientList();
  const dataSource = data?.map((client) => ({
    key: client._id,
    name: client.name,
    _id: client._id,
  }));
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Id",
      dataIndex: "_id",
      key: "_id",
    },
  ];

  return (
    <div className="w-full h-full flex flex-col gap-5">
      <div className="w-full flex justify-end">
        <button onClick={() => setIsAddModalOpen(true)}>Add client</button>
        <AddClientModal open={isAddModalOpen} setOpen={setIsAddModalOpen} />
      </div>
      <Table
        loading={isLoading}
        dataSource={dataSource}
        columns={columns}
        pagination={false}
      />
    </div>
  );
};

export default ClientList;

const AddClientModal = ({ open, setOpen }) => {
  const [form] = Form.useForm();
  const { mutate } = useClientListMutate({});

  function handleSubmit() {
    form.submit();
  }

  function handleSubmitForm() {
    mutate({
      name: form.getFieldValue("name"),
      imageUrl: form.getFieldValue("imageUrl"),
    });
    setOpen(false);
  }

  return (
    <Modal
      onCancel={() => {
        setOpen(false);
      }}
      onOk={handleSubmit}
      title="Add client"
      open={open}
    >
      <Form onFinish={handleSubmitForm} layout="vertical" form={form}>
        <Form.Item
          name={"name"}
          label="Client name"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name={"imageUrl"} label="Image URL">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};
