
import React, { useState, useEffect } from "react";
import { useNotifications } from "@/contexts/notifications";
import { Bell, Check, X, CheckCheck, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export const NotificationCenter: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { notifications, unreadCount, markAsRead, markAllAsRead, removeNotification } = useNotifications();
  const navigate = useNavigate();

  // Close notification panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      // If notification panel is open and clicked element isn't part of it, close it
      if (isOpen && !target.closest('.notification-center')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const togglePanel = () => {
    setIsOpen(!isOpen);
  };

  const handleNotificationClick = (id: string, link?: string) => {
    markAsRead(id);
    
    if (link) {
      navigate(link);
      setIsOpen(false);
    }
  };

  const getNotificationColorClass = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-l-4 border-green-500';
      case 'warning':
        return 'bg-amber-50 border-l-4 border-amber-500';
      case 'error':
        return 'bg-red-50 border-l-4 border-red-500';
      case 'medical':
        return 'bg-blue-50 border-l-4 border-blue-500';
      default:
        return 'bg-slate-50 border-l-4 border-slate-500';
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) {
      return 'just now';
    }
    
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes} min${diffInMinutes !== 1 ? 's' : ''} ago`;
    }
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
    }
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) {
      return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
    }
    
    return date.toLocaleDateString();
  };

  return (
    <div className="notification-center fixed top-4 right-4 z-50">
      <div className="relative">
        <Button 
          variant="outline" 
          onClick={togglePanel} 
          className="relative rounded-full p-2 h-auto"
          aria-label="Notifications"
        >
          <Bell size={20} />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 min-w-[1.2rem] min-h-[1.2rem] flex items-center justify-center p-0 text-xs"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>

        {isOpen && (
          <Card className="absolute right-0 top-12 w-80 md:w-96 shadow-lg z-50 max-h-[80vh] overflow-hidden">
            <CardHeader className="py-3 px-4 flex flex-row items-center justify-between border-b">
              <CardTitle className="text-base font-medium">Notifications</CardTitle>
              <div className="flex items-center gap-1">
                {unreadCount > 0 && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={markAllAsRead} 
                    className="h-7 text-xs"
                  >
                    <CheckCheck className="h-3.5 w-3.5 mr-1" />
                    Mark all as read
                  </Button>
                )}
              </div>
            </CardHeader>
            
            <CardContent className="p-0 overflow-y-auto max-h-[50vh]">
              {notifications.length === 0 ? (
                <div className="py-8 px-4 text-center text-gray-500">
                  <p>No notifications yet</p>
                </div>
              ) : (
                <div>
                  {notifications.map(notification => (
                    <div 
                      key={notification.id} 
                      className={`${getNotificationColorClass(notification.type)} p-3 border-b relative ${!notification.read ? 'bg-opacity-80' : 'bg-opacity-40'}`}
                    >
                      <div 
                        className={`cursor-pointer ${notification.link ? 'hover:bg-gray-50' : ''}`}
                        onClick={() => notification.link && handleNotificationClick(notification.id, notification.link)}
                      >
                        <div className="flex justify-between items-start">
                          <h4 className={`font-medium text-sm ${!notification.read ? '' : 'text-gray-600'}`}>
                            {notification.title}
                          </h4>
                          <div className="flex items-center space-x-1">
                            <span className="text-xs text-gray-500">
                              {formatTimeAgo(notification.timestamp)}
                            </span>
                            {!notification.read && (
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  markAsRead(notification.id);
                                }}
                                className="h-5 w-5 p-0"
                              >
                                <Check className="h-3 w-3" />
                              </Button>
                            )}
                          </div>
                        </div>
                        <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                        {notification.link && notification.actionText && (
                          <div className="mt-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="h-7 text-xs"
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
                        size="sm" 
                        onClick={(e) => {
                          e.stopPropagation();
                          removeNotification(notification.id);
                        }}
                        className="absolute right-2 top-2 h-5 w-5 p-0 opacity-50 hover:opacity-100"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
            
            {notifications.length > 0 && (
              <CardFooter className="py-2 px-4 border-t flex justify-between">
                <span className="text-xs text-gray-500">
                  {notifications.length} notification{notifications.length !== 1 ? 's' : ''}
                </span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-7 text-xs text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={() => {
                    const confirmed = window.confirm("Clear all notifications?");
                    if (confirmed) {
                      // This would be better with a proper confirmation dialog component
                      removeNotification("all");
                    }
                  }}
                >
                  <Trash2 className="h-3.5 w-3.5 mr-1" />
                  Clear all
                </Button>
              </CardFooter>
            )}
          </Card>
        )}
      </div>
    </div>
  );
};
