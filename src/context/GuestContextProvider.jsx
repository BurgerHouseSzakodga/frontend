import { GuestContext } from "./contexts";

const GuestContextProvider = ({ children }) => {
  return (
    <GuestContext.Provider value={"valami"}>{children}</GuestContext.Provider>
  );
};

export default GuestContextProvider;
