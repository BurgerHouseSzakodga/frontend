const InfoCard = ({ title, value, image }) => {
  return (
    <div className="info-card">
      <p>{title}</p>
      <div className="info-card__content">
        <h4>{value}</h4>
        <img src={image} />
      </div>
    </div>
  );
};

export default InfoCard;
