import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface Alert {
  id: number;
  message: string;
  severity: 'high' | 'medium';
  time: string;
}

interface AlertSystemProps {
  alerts: Alert[];
}

const AlertSystem: React.FC<AlertSystemProps> = ({ alerts }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow max-h-[400px] overflow-y-auto">
      {alerts.length === 0 ? (
        <p className="text-gray-500">暂无警报</p>
      ) : (
        <ul>
          {alerts.map((alert) => (
            <li key={alert.id} className={`mb-2 p-2 rounded ${alert.severity === 'high' ? 'bg-red-100' : 'bg-yellow-100'}`}>
              <div className="flex items-center">
                <AlertTriangle className={`mr-2 ${alert.severity === 'high' ? 'text-red-500' : 'text-yellow-500'}`} />
                <span className="font-semibold">{alert.message}</span>
              </div>
              <span className="text-sm text-gray-600">{alert.time}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AlertSystem;