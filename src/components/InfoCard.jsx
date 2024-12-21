const InfoCard = ({ title, value, image }) => {
  return (
    <div className="info-card">
      <h5>{title}</h5>
      {value}
      <img src={image} />
    </div>
  );
};

export default InfoCard;
