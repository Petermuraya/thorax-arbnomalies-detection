
import React, { useState } from "react";
import { useNotifications } from "@/contexts/notifications";
import { Button } from "@/components/ui/button";
import { Bell, BellOff, Check, Trash2, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

export const NotificationCenter: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { 
    notifications, 
    unreadCount, 
    markAsRead, 
    markAllAsRead,
    removeNotification,
    clearAllNotifications
  } = useNotifications();
  const navigate = useNavigate();

  const toggleOpen = () => {
    setIsOpen(!isOpen);
    if (!isOpen && unreadCount > 0) {
      // Mark all as read when opening the panel
      markAllAsRead();
    }
  };

  const handleNotificationClick = (id: string, link?: string) => {
    markAsRead(id);
    
    if (link) {
      navigate(link);
      setIsOpen(false);
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "success": return "bg-green-100 text-green-800 border-green-200";
      case "error": return "bg-red-100 text-red-800 border-red-200";
      case "warning": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "medical": return "bg-purple-100 text-purple-800 border-purple-200";
      default: return "bg-blue-100 text-blue-800 border-blue-200";
    }
  };

  return (
    <div className="fixed right-4 top-16 z-50">
      {/* Notification bell */}
      <Button
        variant="outline"
        size="icon"
        className="rounded-full relative"
        onClick={toggleOpen}
      >
        {unreadCount > 0 ? <Bell /> : <BellOff />}
        {unreadCount > 0 && (
          <Badge 
            variant="destructive" 
            className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0"
          >
            {unreadCount}
          </Badge>
        )}
      </Button>

      {/* Notification panel */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 max-h-[80vh] bg-white shadow-lg rounded-md border overflow-hidden">
          <div className="p-3 border-b bg-slate-50 flex justify-between items-center">
            <h3 className="font-medium">Notifications</h3>
            <div className="flex gap-1">
              <Button variant="ghost" size="sm" onClick={markAllAsRead} disabled={unreadCount === 0}>
                <Check className="h-4 w-4 mr-1" />
                <span className="text-xs">Mark all read</span>
              </Button>
              <Button variant="ghost" size="sm" onClick={clearAllNotifications} disabled={notifications.length === 0}>
                <Trash2 className="h-4 w-4 mr-1" />
                <span className="text-xs">Clear all</span>
              </Button>
            </div>
          </div>
          
          <div className="overflow-y-auto max-h-[60vh]">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-3 border-b relative ${notification.read ? 'opacity-75' : 'bg-slate-50'}`}
                >
                  <div 
                    className={`cursor-pointer ${notification.link ? 'hover:bg-slate-100' : ''}`}
                    onClick={() => handleNotificationClick(notification.id, notification.link)}
                  >
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium text-sm">{notification.title}</h4>
                      <span className="text-xs text-gray-500">
                        {new Date(notification.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                    
                    {notification.link && notification.actionText && (
                      <div className="mt-2">
                        <Button 
                          variant="link" 
                          size="sm" 
                          className="h-auto p-0 text-xs text-blue-600"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleNotificationClick(notification.id, notification.link);
                          }}
                        >
                          {notification.actionText}
                        </Button>
                      </div>
                    )}
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 absolute top-1 right-1 text-gray-400 hover:text-gray-600"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeNotification(notification.id);
                    }}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))
            ) : (
              <div className="p-6 text-center text-gray-500">
                <BellOff className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                <p>No notifications</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
