import { BookOutlined } from "@ant-design/icons";
import { Layout } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { Outlet } from "react-router-dom";
import ApiStatusChecker from "../Home/ApiStatusChecker";
import Sidebar from "../Sidebar/Sidebar";
import DasahboardTopBar from "./DasahboardTopBar";

const DashboardLayout = () => {
  return (
    <Layout style={{ minHeight: "100vh" }} className="dark:bg-slate-900">
      <Sidebar />

      <Layout className="bg-[#f9fafb] dark:bg-slate-900">
        <Header
          style={{ padding: 0 }}
          className="bg-transparent dark:bg-slate-900 sticky top-0 z-10 shadow-sm dark:shadow-slate-800"
        >
          <DasahboardTopBar />
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: "calc(100vh - 130px)",
              borderRadius: 8,
              backgroundColor: "white",
              boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
            }}
            className="overflow-hidden dark:bg-slate-800 dark:text-white dark:shadow-slate-700"
          >
            <Outlet />
          </div>
        </Content>
        <Footer className="bg-white dark:bg-slate-800 dark:text-white text-center py-4 mt-6 shadow-inner dark:shadow-slate-700">
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center mb-2">
              <BookOutlined className="text-xl mr-2 text-indigo-600 dark:text-indigo-400" />
              <span className="text-xl font-bold">
                Libr
                <span className="text-indigo-600 dark:text-indigo-400">
                  ant
                </span>
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              &copy; {new Date().getFullYear()} Librant. All rights reserved.
            </p>
          </div>
        </Footer>
      </Layout>
      <ApiStatusChecker />
    </Layout>
  );
};

export default DashboardLayout;
