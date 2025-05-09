import React, { useState } from "react";

import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { Empty, Spin, Table, Tag } from "antd";
import moment from "moment";
import { useGetCustomerOrdersQuery } from "../../Redux/Features/Orders/Order.api";
import { TransactionDetails } from "../../Types/global";

import UpdatePasswordForm from "./UpdatePasswordForm";

const UserManagement = () => {
  const [activeTab, setActiveTab] = useState("manageOrder");
  const {
    data: orders,
    isLoading,
    error,
  } = useGetCustomerOrdersQuery(undefined);

  // Define columns for the table
  const columns = [
    {
      title: "Order ID",
      dataIndex: ["transaction", "id"],
      key: "orderId",
      render: (id: string) => (
        <span className="font-medium">{id || "N/A"}</span>
      ),
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "date",
      render: (date: Date) => (
        <span>{moment(date).format("MMM DD, YYYY")}</span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string, record: TransactionDetails) => {
        const orderStatus =
          status || record.transaction?.transactionStatus || "pending";

        let color = "blue";
        let icon = <ClockCircleOutlined />;

        if (
          orderStatus.toLowerCase().includes("complete") ||
          orderStatus.toLowerCase().includes("success")
        ) {
          color = "green";
          icon = <CheckCircleOutlined />;
        } else if (
          orderStatus.toLowerCase().includes("fail") ||
          orderStatus.toLowerCase().includes("cancel")
        ) {
          color = "red";
          icon = <CloseCircleOutlined />;
        }

        return (
          <Tag color={color} icon={icon}>
            {orderStatus.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: "Total",
      dataIndex: "totalPrice",
      key: "total",
      render: (price: number) => (
        <span className="font-medium">${price.toFixed(2)}</span>
      ),
    },
    {
      title: "Payment Method",
      dataIndex: ["transaction", "method"],
      key: "method",
      render: (method: string) => <span>{method || "N/A"}</span>,
    },
  ];

  const handleTabClick = (tabId: React.SetStateAction<string>) => {
    setActiveTab(tabId);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500 mb-2">Failed to load orders</p>
        <p className="text-gray-500">Please try again later</p>
      </div>
    );
  }

  const orderData = orders?.data || [];

  return (
    <section className="mt-3 lg:ml-3">
      <ul className="flex gap-3 bg-gray-100 rounded-xl p-1 overflow-hidden">
        <li
          id="manageOrder"
          className={`tab ${
            activeTab === "manageOrder"
              ? "bg-transparent border-b-2 border-[#e12503] text-[#e12503] shadow-sm"
              : "text-gray-600 font-semibold"
          }  text-center text-sm py-2.5 px-4 tracking-wide cursor-pointer`}
          onClick={() => handleTabClick("manageOrder")}
        >
          My Orders
        </li>
        <li
          id="profile-settings"
          className={`tab ${
            activeTab === "profile-settings"
              ? "bg-transparent border-b-2 border-[#e12503] text-[#e12503] shadow-sm"
              : "text-gray-600 font-semibold"
          }  text-center text-sm py-2.5 px-4 tracking-wide cursor-pointer`}
          onClick={() => handleTabClick("profile-settings")}
        >
          Profile Settings
        </li>
      </ul>
      {/* User settings */}
      <div
        className={`tab-content bg-white lg:px-8 lg:py-4 rounded-md mt-3 lg:mt-8 ${
          activeTab === "profile-settings" ? "block" : "hidden"
        }`}
      >
        <UpdatePasswordForm />
      </div>
      {/* Manage Order */}
      <div
        className={`tab-content bg-white px-3 lg:px-8 lg:py-4 rounded-md  mt-8 ${
          activeTab === "manageOrder" ? "block" : "hidden"
        }`}
      >
        <div className="container px-4 mx-auto">
          <p className="text-[18px] mb-4">Manage Order ({orderData.length})</p>
          <div className="flex flex-col">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                  {orderData.length > 0 ? (
                    <Table
                      columns={columns}
                      dataSource={orderData}
                      rowKey="_id"
                      pagination={{ pageSize: 5 }}
                      className="min-w-full divide-y divide-gray-200 dark:divide-gray-700"
                    />
                  ) : (
                    <Empty
                      description="No orders found"
                      image={Empty.PRESENTED_IMAGE_SIMPLE}
                      className="py-12"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserManagement;
