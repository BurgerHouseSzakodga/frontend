import { ValamiContext } from "./contexts";

const ValamiContextProvider = ({ children }) => {
  return (
    <ValamiContext.Provider value={"valami"}>{children}</ValamiContext.Provider>
  );
};

export default ValamiContextProvider;
