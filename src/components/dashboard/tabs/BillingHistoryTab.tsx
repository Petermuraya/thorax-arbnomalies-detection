
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DollarSign } from "lucide-react";

interface BillingItem {
  id: string;
  date: string;
  description: string;
  amount: string;
  status: string;
}

interface BillingHistoryTabProps {
  billingHistory: BillingItem[];
  pendingPayment: number;
}

export const BillingHistoryTab = ({ 
  billingHistory,
  pendingPayment 
}: BillingHistoryTabProps) => {
  return (
    <div className="p-0">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50 text-slate-500 text-sm">
              <th className="py-3 px-6 text-left font-medium">Invoice</th>
              <th className="py-3 px-6 text-left font-medium">Date</th>
              <th className="py-3 px-6 text-left font-medium">Description</th>
              <th className="py-3 px-6 text-right font-medium">Amount</th>
              <th className="py-3 px-6 text-right font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {billingHistory.map((item, index) => (
              <tr 
                key={item.id} 
                className={`border-t border-slate-100 ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}
              >
                <td className="py-4 px-6 font-medium text-blue-600">{item.id}</td>
                <td className="py-4 px-6 text-slate-700">{item.date}</td>
                <td className="py-4 px-6 text-slate-700">{item.description}</td>
                <td className="py-4 px-6 text-right font-medium text-slate-800">{item.amount}</td>
                <td className="py-4 px-6 text-right">
                  <Badge variant={item.status === 'Paid' ? 'success' : 'warning'}>
                    {item.status}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="p-6 border-t border-slate-100 bg-slate-50">
        <div className="flex justify-between items-center">
          <div>
            <span className="text-slate-500">Total Pending:</span>
            <span className="ml-2 font-semibold text-amber-600">${(pendingPayment / 100).toFixed(2)}</span>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <DollarSign className="h-4 w-4 mr-2" />
            Pay Now
          </Button>
        </div>
      </div>
    </div>
  );
};
