import { Button, Popover } from "antd";
import { useEffect, useState } from "react";

// Import the endpoint directly from the API that has the getNumberOfCategories endpoint
import { useGetNumberOfCategoriesQuery } from "../../Redux/Features/Admin/UserManagementApi/bookManagement.api";

type ApiError = {
  status: string;
  data: unknown;
};

const ApiStatusChecker = () => {
  const [isChecking, setIsChecking] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Use the query hook directly
  const { refetch } = useGetNumberOfCategoriesQuery(undefined);

  const checkApiConnection = async () => {
    setIsChecking(true);
    setConnectionStatus("idle");
    setErrorMessage("");

    try {
      // Use the refetch function to test the API connection
      const result = await refetch();

      if ("error" in result) {
        const error = result.error as ApiError;
        setConnectionStatus("error");
        setErrorMessage(
          error.status === "FETCH_ERROR"
            ? "Unable to connect to the API server. Please check if the server is running."
            : `Error: ${JSON.stringify(error.data || error.status)}`
        );
      } else {
        setConnectionStatus("success");
      }
    } catch (error) {
      setConnectionStatus("error");
      setErrorMessage(
        `Unexpected error: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    } finally {
      setIsChecking(false);
    }
  };

  // Try to check connection once on mount
  useEffect(() => {
    checkApiConnection();
  }, []);

  const statusContent = (
    <div className="p-2 w-72">
      <h4 className="font-medium mb-2">API Connection Status</h4>
      {connectionStatus === "idle" ? (
        <p className="text-gray-600 dark:text-gray-300">
          Checking connection...
        </p>
      ) : connectionStatus === "success" ? (
        <p className="text-green-600 dark:text-green-400">
          ✓ API connection successful
        </p>
      ) : (
        <div>
          <p className="text-red-600 dark:text-red-400 mb-2">
            ✗ Connection failed
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400 break-words">
            {errorMessage}
          </p>
          <div className="mt-3">
            <p className="text-xs font-medium mb-1">Troubleshooting:</p>
            <ul className="text-xs list-disc pl-4 space-y-1">
              <li>Ensure your backend server is running on port 5001</li>
              <li>Check for network connectivity issues</li>
              <li>Verify CORS settings on your server</li>
            </ul>
          </div>
        </div>
      )}
      <div className="mt-4">
        <Button
          size="small"
          onClick={checkApiConnection}
          loading={isChecking}
          type={connectionStatus === "error" ? "primary" : "default"}
        >
          Retry Connection
        </Button>
      </div>
    </div>
  );

  return (
    <Popover
      content={statusContent}
      title="API Status"
      trigger="click"
      placement="topRight"
    >
      <Button
        type={connectionStatus === "error" ? "primary" : "default"}
        danger={connectionStatus === "error"}
        className="fixed bottom-4 right-4 z-50 shadow-md"
        icon={
          connectionStatus === "idle" ? (
            <span className="h-2 w-2 rounded-full bg-gray-400 inline-block mr-2" />
          ) : connectionStatus === "success" ? (
            <span className="h-2 w-2 rounded-full bg-green-500 inline-block mr-2" />
          ) : (
            <span className="h-2 w-2 rounded-full bg-red-500 inline-block mr-2" />
          )
        }
      >
        {connectionStatus === "idle"
          ? "Checking API"
          : connectionStatus === "success"
          ? "API Connected"
          : "API Connection Error"}
      </Button>
    </Popover>
  );
};

export default ApiStatusChecker;
