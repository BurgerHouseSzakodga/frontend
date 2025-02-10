import React from "react";
import { FaTag, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import "../sass/components/addres-about.css";

export default function AddresAbout() {
  const features = [
    {
      icon: <FaTag className="icon" />,
      title: "Napi Leárazások",
    },
    {
      icon: <FaMapMarkerAlt className="icon" />,
      title: "Élő Rendeléskövetés",
    },
    {
      icon: <FaClock className="icon" />,
      title: "Gyors Szállítás",
    },
  ];

  return (
    <div className="addres-about-container">
      {features.map((feature, index) => (
        <div key={index} className="feature-card">
          <div>{feature.icon}</div>
          <h3 className="feature-title">{feature.title}</h3>
        </div>
      ))}
    </div>
  );
}