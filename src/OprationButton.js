import React from "react";
import { ACTIONS } from "./App.js";
export default function OperationButton({ dispatch, operation }) {
  return (
    <button
      className="text-black text-2xl  h-16 w-16 flex justify-center items-center bg-lightOrange rounded-md shadow-md hover:bg-orange hover:bg-opacity-50"
      onClick={() => {
        dispatch({
          type: ACTIONS.CHOOSE_OPERATION,
          payload: { operation },
        });
      }}
    >
      {operation}
    </button>
  );
}
