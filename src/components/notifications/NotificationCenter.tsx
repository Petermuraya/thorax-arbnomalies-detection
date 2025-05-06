
import React, { useState } from "react";
import { 
  Bell,
  BellDot,
  X,
  Check,
  AlertCircle,
  Info,
  CheckCircle
} from "lucide-react";
import { 
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Notification, NotificationType, useNotifications } from "@/contexts/notifications";
import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";

const notificationIcons: Record<NotificationType, React.ReactNode> = {
  info: <Info className="h-4 w-4 text-blue-500" />,
  success: <CheckCircle className="h-4 w-4 text-green-500" />,
  warning: <AlertCircle className="h-4 w-4 text-amber-500" />,
  error: <AlertCircle className="h-4 w-4 text-red-500" />,
  medical: <AlertCircle className="h-4 w-4 text-purple-500" />
};

const NotificationItem: React.FC<{
  notification: Notification;
  onClose?: () => void;
}> = ({ notification, onClose }) => {
  const { markAsRead, removeNotification } = useNotifications();
  const navigate = useNavigate();
  
  const handleClick = () => {
    if (!notification.read) {
      markAsRead(notification.id);
    }
    
    if (notification.link) {
      navigate(notification.link);
      if (onClose) onClose();
    }
  };
  
  return (
    <div 
      className={`p-4 border-b last:border-b-0 transition-colors ${
        notification.read ? 'bg-white' : 'bg-blue-50'
      } hover:bg-gray-50 cursor-pointer`}
      onClick={handleClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex gap-3">
          <div className="mt-0.5">
            {notificationIcons[notification.type]}
          </div>
          <div>
            <h4 className="font-medium text-sm">{notification.title}</h4>
            <p className="text-sm text-gray-600 mt-0.5">{notification.message}</p>
            <div className="flex items-center mt-2 gap-4">
              <span className="text-xs text-gray-500">
                {formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })}
              </span>
              {notification.link && notification.actionText && (
                <span className="text-xs font-medium text-blue-600">
                  {notification.actionText}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {!notification.read && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-6 w-6"
              onClick={(e) => {
                e.stopPropagation();
                markAsRead(notification.id);
              }}
            >
              <Check className="h-3.5 w-3.5" />
              <span className="sr-only">Mark as read</span>
            </Button>
          )}
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-6 w-6 text-gray-500 hover:text-gray-900"
            onClick={(e) => {
              e.stopPropagation();
              removeNotification(notification.id);
            }}
          >
            <X className="h-3.5 w-3.5" />
            <span className="sr-only">Remove</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export const NotificationCenter: React.FC = () => {
  const { notifications, unreadCount, markAllAsRead, clearAllNotifications } = useNotifications();
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button className="rounded-full h-14 w-14 shadow-lg bg-blue-600 hover:bg-blue-700 fixed bottom-6 right-6 z-50">
          {unreadCount > 0 ? <BellDot className="h-6 w-6" /> : <Bell className="h-6 w-6" />}
          <span className="sr-only">Notifications</span>
          {unreadCount > 0 && (
            <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 min-w-5 rounded-full text-white text-xs flex items-center justify-center">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md p-0">
        <SheetHeader className="px-4 py-5 border-b">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-xl">Notifications</SheetTitle>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={markAllAsRead}
                  className="text-xs h-8"
                >
                  Mark all as read
                </Button>
              )}
              {notifications.length > 0 && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={clearAllNotifications}
                  className="text-xs h-8"
                >
                  Clear all
                </Button>
              )}
            </div>
          </div>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-8rem)]">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 p-4">
              <Bell className="h-8 w-8 text-gray-400 mb-2" />
              <p className="text-center text-gray-500">No notifications yet</p>
            </div>
          ) : (
            <div className="divide-y">
              {notifications.map(notification => (
                <NotificationItem 
                  key={notification.id} 
                  notification={notification} 
                  onClose={() => setIsOpen(false)}
                />
              ))}
            </div>
          )}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
