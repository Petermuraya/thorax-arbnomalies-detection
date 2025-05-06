
import { toast } from "sonner";
import { useNotifications, NotificationType } from "@/contexts/notifications";

interface NotifyOptions {
  /**
   * Whether to show a toast notification in addition to the notification center
   */
  showToast?: boolean;
  /**
   * Link to navigate to when the notification is clicked
   */
  link?: string;
  /**
   * Text for the action button
   */
  actionText?: string;
}

export const useNotify = () => {
  const { addNotification } = useNotifications();

  const notify = (
    title: string,
    message: string,
    type: NotificationType = "info",
    options: NotifyOptions = { showToast: true }
  ) => {
    // Add to notification center
    addNotification({
      title,
      message,
      type,
      link: options.link,
      actionText: options.actionText
    });

    // Also show toast if requested
    if (options.showToast) {
      const toastOptions: any = {};
      
      if (options.link && options.actionText) {
        toastOptions.action = {
          label: options.actionText,
          onClick: () => {
            // Navigation will be handled by the link in the notification center
          }
        };
      }

      switch (type) {
        case "success":
          toast.success(title, {
            description: message,
            ...toastOptions
          });
          break;
        case "error":
          toast.error(title, {
            description: message,
            ...toastOptions
          });
          break;
        case "warning":
          toast(title, {
            description: message,
            ...toastOptions
          });
          break;
        case "medical":
        case "info":
        default:
          toast(title, {
            description: message,
            ...toastOptions
          });
      }
    }
  };
  
  return {
    notify,
    notifyInfo: (title: string, message: string, options?: NotifyOptions) => 
      notify(title, message, "info", options),
    notifySuccess: (title: string, message: string, options?: NotifyOptions) => 
      notify(title, message, "success", options),
    notifyWarning: (title: string, message: string, options?: NotifyOptions) => 
      notify(title, message, "warning", options),
    notifyError: (title: string, message: string, options?: NotifyOptions) => 
      notify(title, message, "error", options),
    notifyMedical: (title: string, message: string, options?: NotifyOptions) => 
      notify(title, message, "medical", options),
  };
};
