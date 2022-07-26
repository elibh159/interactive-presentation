import { TextErrorProp } from "../Interfaces/textErrorInterface";

export const TextError = ({ children }: TextErrorProp) => (
  <div className="text-danger" >
    {children}
  </div>
);