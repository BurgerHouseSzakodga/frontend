import React from "react";
import { FaMapMarkerAlt, FaUtensils, FaDollarSign, FaSmile } from "react-icons/fa";
import "../sass/components/about-you.css";

export default function AboutYouCard() {
  const steps = [
    {
      icon: <FaMapMarkerAlt className="icon" />,
      title: "Cím kiválasztása",
      description: "Válaszd ki, hogy hova szállítsák ki a rendelésed.",
    },
    {
      icon: <FaUtensils className="icon" />,
      title: "Rendelés leadása",
      description: "Válaszd ki a neked megfelelő ételt széles kínálatunkból.",
    },
    {
      icon: <FaDollarSign className="icon" />,
      title: "Fizetés",
      description: "Gyors, megbízható, biztonságos, fizess kézpénzel vagy kártyával.",
    },
    {
      icon: <FaSmile className="icon" />,
      title: "Élvezd az ételed",
      description: "A forró ételt villámgyorsan az ajtódnál találod.",
    },
  ];

  return (
    <div className="about-you-container">
      <h2 className="about-you-title">Hogy is működik</h2>
      <div className="steps-container">
        {steps.map((step, index) => (
          <div key={index} className="step-card">
            <div>{step.icon}</div>
            <h3 className="step-title">{step.title}</h3>
            <p className="step-description">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}