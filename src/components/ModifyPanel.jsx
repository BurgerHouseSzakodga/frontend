const ModifyPanel = ({ onCloseModifyPanel, selectedItem }) => {
  return (
    <div>
      {selectedItem.name}
      <button onClick={() => onCloseModifyPanel(false, null)}>bezár</button>
    </div>
  );
};

export default ModifyPanel;
