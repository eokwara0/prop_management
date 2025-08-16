import { createContext } from "react";

export type SignupPasswordValidationType = {
  numbers: Array<number>;
};
const signupValidationContext = createContext<SignupPasswordValidationType>({
  numbers: [],
});
export const signupDispatchContext = createContext<
  React.Dispatch<{ type: SignupPasswordActionType; num: number }> | undefined
>(undefined);

export enum SignupPasswordActionType {
  APPEND = "append",
  DELETE = "delete",
}

export const SignupPasswordReducer = (
  state: SignupPasswordValidationType,
  action: { type: SignupPasswordActionType; num: number }
) => {
  switch (action.type) {
    case SignupPasswordActionType.APPEND:
      return {
        ...state,
        numbers: [...state.numbers, action.num].sort(),
      };
    case SignupPasswordActionType.DELETE:
      return {
        ...state,
        numbers: state.numbers
          .filter((c) => {
            return c !== action.num;
          })
          .sort((a, b) => a - b),
      };
    default:
      throw new Error(`unknow action type : ${action.type}`);
  }
};

export default signupValidationContext;
