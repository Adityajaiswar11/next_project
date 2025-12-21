import { toast } from "sonner";

export const handleApiError = (error: any) => {
  const message =
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.message ||
    "Something went wrong";
  toast.error(message);
};

export const handleApiSuccess = (response: any) => {
  if (response?.data?.message) {
    toast.success(response.data.message);
  }
};

export const NotificationMessage = (
  notification: string,
  type: "success" | "error" | "warning" | "info",
) => {
  toast[type](notification);
};

