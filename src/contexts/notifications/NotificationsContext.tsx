
import React, { createContext, useContext, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";

export type NotificationType = "info" | "success" | "warning" | "error" | "medical";

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  timestamp: Date;
  read: boolean;
  link?: string;
  actionText?: string;
}

type NotificationsState = {
  notifications: Notification[];
  unreadCount: number;
};

const initialState: NotificationsState = {
  notifications: [],
  unreadCount: 0
};

type NotificationsAction =
  | { type: "ADD_NOTIFICATION"; payload: Omit<Notification, "id" | "timestamp" | "read"> }
  | { type: "MARK_AS_READ"; payload: string }
  | { type: "MARK_ALL_AS_READ" }
  | { type: "REMOVE_NOTIFICATION"; payload: string }
  | { type: "CLEAR_ALL_NOTIFICATIONS" };

const notificationsReducer = (state: NotificationsState, action: NotificationsAction): NotificationsState => {
  switch (action.type) {
    case "ADD_NOTIFICATION":
      const newNotification: Notification = {
        id: uuidv4(),
        timestamp: new Date(),
        read: false,
        ...action.payload
      };
      return {
        ...state,
        notifications: [newNotification, ...state.notifications],
        unreadCount: state.unreadCount + 1
      };

    case "MARK_AS_READ":
      return {
        ...state,
        notifications: state.notifications.map(notification =>
          notification.id === action.payload
            ? { ...notification, read: true }
            : notification
        ),
        unreadCount: Math.max(state.unreadCount - 1, 0)
      };

    case "MARK_ALL_AS_READ":
      return {
        ...state,
        notifications: state.notifications.map(notification => ({
          ...notification,
          read: true
        })),
        unreadCount: 0
      };

    case "REMOVE_NOTIFICATION":
      const notificationToRemove = state.notifications.find(n => n.id === action.payload);
      return {
        ...state,
        notifications: state.notifications.filter(
          notification => notification.id !== action.payload
        ),
        unreadCount: notificationToRemove && !notificationToRemove.read
          ? Math.max(state.unreadCount - 1, 0)
          : state.unreadCount
      };

    case "CLEAR_ALL_NOTIFICATIONS":
      return {
        ...state,
        notifications: [],
        unreadCount: 0
      };

    default:
      return state;
  }
};

type NotificationsContextType = NotificationsState & {
  addNotification: (notification: Omit<Notification, "id" | "timestamp" | "read">) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  clearAllNotifications: () => void;
};

const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationsContext);
  if (!context) {
    throw new Error("useNotifications must be used within a NotificationsProvider");
  }
  return context;
};

export const NotificationsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(notificationsReducer, initialState);

  const addNotification = (notification: Omit<Notification, "id" | "timestamp" | "read">) => {
    dispatch({ type: "ADD_NOTIFICATION", payload: notification });
  };

  const markAsRead = (id: string) => {
    dispatch({ type: "MARK_AS_READ", payload: id });
  };

  const markAllAsRead = () => {
    dispatch({ type: "MARK_ALL_AS_READ" });
  };

  const removeNotification = (id: string) => {
    dispatch({ type: "REMOVE_NOTIFICATION", payload: id });
  };

  const clearAllNotifications = () => {
    dispatch({ type: "CLEAR_ALL_NOTIFICATIONS" });
  };

  return (
    <NotificationsContext.Provider
      value={{
        ...state,
        addNotification,
        markAsRead,
        markAllAsRead,
        removeNotification,
        clearAllNotifications
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};
