import { useEffect, useState } from "react";
import axios from "axios";
import { Clock, Utensils, Bike, MapPin } from "lucide-react";
import api from '../../config/axios.js'

const STEPS = [
  { key: "placed",      label: "Accepted by Cafe", icon: Clock },
  { key: "accepted",   label: "Preparing",         icon: Utensils },
  { key: "ready",  label: "On the Way",        icon: Bike },
  { key: "out_for_delivery",   label: "Delivered",         icon: MapPin },
];

// which index each status corresponds to
const STATUS_INDEX = {
  placed:     0,
  accepted:  1,
  ready: 2,
  out_for_delivery:  3,
};

export const OrderTracker = ({orderId}) => {
    const [status, setStatus] = useState(null);

  const fetchStatus = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`/api/orders/${orderId}/status`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStatus(res.data.data.status);   // adjust to your response shape
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStatus();                          // fetch immediately

    const interval = setInterval(() => {
      fetchStatus();                        // then every 10 seconds
    }, 10000);

    return () => clearInterval(interval);   // cleanup on unmount
  }, [orderId]);

  const currentIndex = STATUS_INDEX[status] ?? -1;

  const getStepStatus = (i) => {
    if (i < currentIndex)  return "completed";
    if (i === currentIndex) return "inprogress";
    return "pending";
  };
  return (
        <div className="flex flex-col py-4">
      {STEPS.map((step, i) => {
        const stepStatus = getStepStatus(i);
        const Icon = step.icon;
        const isLast = i === STEPS.length - 1;

        return (
          <div key={step.key} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-500
                  ${stepStatus === "pending"
                    ? "bg-gray-200"
                    : "bg-orange-500"
                  }
                  ${stepStatus === "inprogress" ? "ring-4 ring-orange-200" : ""}
                `}
              >
                <Icon
                  size={22}
                  className={stepStatus === "pending" ? "text-gray-400" : "text-white"}
                />
              </div>
              {!isLast && (
                <div
                  className={`w-0.5 h-12 my-1 transition-all duration-500
                    ${i < currentIndex ? "bg-orange-500" : "bg-gray-200"}
                  `}
                />
              )}
            </div>

            <div className="pt-3">
              <p className={`font-semibold text-base ${stepStatus === "pending" ? "text-gray-400" : "text-gray-800"}`}>
                {step.label}
              </p>
              <p className={`text-sm mt-0.5
                ${stepStatus === "completed"  ? "text-gray-400" : ""}
                ${stepStatus === "inprogress" ? "text-orange-500 font-medium" : ""}
                ${stepStatus === "pending"    ? "text-gray-300" : ""}
              `}>
                {stepStatus === "completed"  && "Completed"}
                {stepStatus === "inprogress" && "In progress..."}
                {stepStatus === "pending"    && "Pending"}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
  

