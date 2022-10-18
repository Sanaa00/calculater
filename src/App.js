import { useReducer } from "react";
import "./App.css";
import DigitButton from "./DigitButton";
import OperationButton from "./OprationButton";
export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CHOOSE_OPERATION: "choose-operation",
  CLEAR: "clear",
  DELETE_DIGIT: "delete-digit",
  EVALUATE: "evaluate",
};
function ruducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false,
        };
      }
      if (payload.digit === "0" && state.currentOperand === "0") {
        return state;
      }
      if (payload.digit === "." && state.currentOperand.includes(".")) {
        return state;
      }
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      };
    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand === null && state.prevOperand === null) {
        return state;
      }
      if (state.prevOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          prevOperand: state.currentOperand,
          currentOperand: null,
        };
      }
      if (state.currentOperand == null) {
        return {
          ...state,
          operation: payload.operation,
        };
      }
      return {
        ...state,
        prevOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: null,
      };
    case ACTIONS.CLEAR:
      return {};

    case ACTIONS.DELETE_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperand: null,
        };
      }
      if (state.currentOperand == null) return state;
      if (state.currentOperand.length === 1)
        return {
          ...state,
          currentOperand: null,
        };
      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
      };
    case ACTIONS.EVALUATE:
      if (
        state.operation == null ||
        state.currentOperand == null ||
        state.prevOperand == null
      )
        return { state };
      return {
        ...state,
        overwrite: true,
        prevOperand: null,
        operation: null,
        customElements: evaluate(state),
      };
    default:
      return state;
  }
}
function evaluate({ currentOperand, prevOperand, operation }) {
  const prev = parseFloat(prevOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(current)) return "";
  let computation = "";
  switch (operation) {
    case "+":
      computation = prev + current;
      break;
    case "-":
      computation = prev - current;
      break;
    case "*":
      computation = prev * current;
      break;
    case "÷":
      computation = prev / current;
      break;
    default:
      return {};
  }
  return computation;
}
function App() {
  const [{ currentOperand, prevOperand, operation }, dispatch] = useReducer(
    ruducer,
    {}
  );
  return (
    <div className="flex flex-col justify-center items-center font-Oswald  text-gray-900 font-bold bg-gradient-to-r from-orange to-lightOrange bg-opacity-50 h-screen">
      <h1 className="text-3xl ">Calculater </h1>
      <div className="bg-lightOrange rounded-lg shadow-lg flex flex-col justify-center items-end  bg-opacity-30 p-4 mt-10">
        <div className="py-4 pr-2 bg-lightOrange  w-full rounded-md h-20 my-2 flex flex-col  items-end justify-center">
          <div className="h-6 text-black  text-opacity-80">
            {prevOperand} {operation}
          </div>
          <div className="h-10  text-black  ">{currentOperand}</div>
        </div>
        <div className="grid grid-cols-4 gap-2 grid-template-20">
          <button
            onClick={() => dispatch({ type: ACTIONS.CLEAR })}
            className=" col-span-2 h-16 w-full flex justify-center items-center bg-orange rounded-md shadow-md hover:bg-opacity-50"
          >
            AC
          </button>
          <button
            onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}
            className="h-16 w-16 flex justify-center items-center bg-orange rounded-md shadow-md hover:bg-opacity-50"
          >
            DEL
          </button>
          <OperationButton operation="÷" dispatch={dispatch}>
            {" "}
            ÷
          </OperationButton>
          <DigitButton
            digit="1"
            dispatch={dispatch}
            className="h-16 w-16 flex justify-center items-center bg-lightOrange rounded-md shadow-md hover:bg-orange hover:bg-opacity-50"
          >
            1
          </DigitButton>
          <DigitButton
            digit="2"
            dispatch={dispatch}
            className="h-16 w-16 flex justify-center items-center bg-lightOrange rounded-md shadow-md hover:bg-orange hover:bg-opacity-50"
          >
            2
          </DigitButton>
          <DigitButton
            digit="3"
            dispatch={dispatch}
            className="h-16 w-16 flex justify-center items-center bg-lightOrange rounded-md shadow-md hover:bg-orange hover:bg-opacity-50"
          >
            3
          </DigitButton>
          <OperationButton operation="*" dispatch={dispatch}>
            {" "}
            *
          </OperationButton>
          <DigitButton digit="4" dispatch={dispatch}>
            4
          </DigitButton>{" "}
          <DigitButton digit="5" dispatch={dispatch}>
            5
          </DigitButton>{" "}
          <DigitButton digit="6" dispatch={dispatch}>
            6
          </DigitButton>
          <OperationButton operation="+" dispatch={dispatch}>
            +
          </OperationButton>
          <DigitButton digit="7" dispatch={dispatch}>
            7
          </DigitButton>{" "}
          <DigitButton digit="8" dispatch={dispatch}>
            8
          </DigitButton>{" "}
          <DigitButton digit="9" dispatch={dispatch}>
            9
          </DigitButton>
          <OperationButton operation="-" dispatch={dispatch}>
            -
          </OperationButton>
          <DigitButton digit="." dispatch={dispatch}>
            .
          </DigitButton>
          <DigitButton digit="0" dispatch={dispatch}>
            0
          </DigitButton>
          <button
            onClick={() => dispatch({ type: ACTIONS.EVALUATE })}
            className="text-2xl col-span-2 h-16 w-full flex justify-center items-center bg-orange rounded-md shadow-md hover:bg-opacity-50"
          >
            =
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
