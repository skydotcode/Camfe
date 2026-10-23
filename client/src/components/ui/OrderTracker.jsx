import { useEffect, useState } from "react";
import axios from "axios";
import { Clock, Utensils, Bike, MapPin, Package , XCircle} from "lucide-react";
import api from '../../config/axios.js'
import { useAuth } from "#src/context/AuthContext.jsx";
import { socket } from "#src/socket.js";
import toast from "react-hot-toast";

const STEPS = [
  { key: "placed",      label: "Accepted by Cafe", icon: Clock },
  { key: "accepted",   label: "Preparing",         icon: Utensils },
  { key: "ready",            label: "Ready",            icon: Package },
  { key: "out_for_delivery", label: "On the Way",       icon: Bike },
  { key: "delivered",        label: "Delivered",        icon: MapPin },
];

// which index each status corresponds to
const STATUS_INDEX = {
  placed:     0,
  accepted:  1,
  ready: 2,
  out_for_delivery:  3,
  delivered: 4,
};

export const OrderTracker = ({orderId}) => {
  const {refreshUser} = useAuth();
  const [status, setStatus] = useState(null);


  useEffect(() => {
    socket.emit("join-order" , orderId)
    // fetchStatus();   // fetch immediately
    const fetchStatus = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get(`/api/orders/${orderId}/status`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStatus(res.data.data.status);
        if(res.data.data.status== "delivered") refreshUser() ;   // adjust to your response shape
      } catch (err) {
        console.error(err);
      }
    };
    fetchStatus();

    // const interval = setInterval(() => {
    //   fetchStatus();                        // then every 10 seconds
    // }, 10000);
    const onUpdate = (order) =>{
      // console.log('socket status:', JSON.stringify(order?.status));
      // console.log(order);
      if (order._id !== orderId) return;
      setStatus(order?.status);
      if (order.status === "rejected") {
        toast.error("Your order was rejected by the cafe");
        refreshUser();
      } else if (order.status === "delivered") {
        toast.success("Order delivered!");
        refreshUser();
      } else {
        toast("Order updated!", { icon: "👏" });
      }
    }

    // return () => clearInterval(interval);   // cleanup on unmount
    socket.on('order-status-updated', onUpdate);
    return () => socket.off('order-status-updated', onUpdate);
  }, [orderId]);

  const currentIndex = STATUS_INDEX[status] ?? -1;
  if (status === "rejected" || status === "cancelled") {
    return (
      <div className="flex items-center gap-4 py-4">
        <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
          <XCircle size={22} className="text-white" />
        </div>
        <div>
          <p className="font-semibold text-base text-gray-800">
            {status === "rejected" ? "Order Rejected by Cafe" : "Order Cancelled"}
          </p>
          <p className="text-sm text-red-500 font-medium">
            {status === "rejected"
              ? "The cafe couldn't accept your order."
              : "You cancelled this order."}
          </p>
        </div>
      </div>
    );
  }

  const getStepStatus = (i) => {
    if (status === "delivered") return "completed";
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
              {status === "delivered" && (
                <p className="text-green-600 font-semibold mb-2">Your order has been delivered!</p>
              )}
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-500
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
                  className={`w-0.5 h-4 my-1 transition-all duration-500
                    ${i < currentIndex || status === "delivered" ? "bg-orange-500" : "bg-gray-200"}
                  `}
                />
              )}
            </div>

            <div className="">
              <p className={`font-semibold text-base ${stepStatus === "pending" ? "text-gray-400" : "text-gray-800"}`}>
                {step.label}
              </p>
              <p className={`text-sm mt-0.5
                ${stepStatus === "completed"  ? "text-gray-400" : ""}
                ${stepStatus === "inprogress" ? "text-orange-500 font-medium" : ""}
                ${stepStatus === "pending"    ? "text-gray-300" : ""}
              `}>
                {stepStatus === "completed"  && "Completed" && (isLast ? "Delivered successfully 🎉" : "Completed")}
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
  

