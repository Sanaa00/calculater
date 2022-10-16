import React from "react";
import { ACTIONS } from "./App";
export default function DigitButton({ dispatch, digit }) {
  return (
    <button
      className="text-black h-16 w-16 flex justify-center items-center bg-lightOrange rounded-md shadow-md hover:bg-orange hover:bg-opacity-50"
      onClick={() => {
        dispatch({
          type: ACTIONS.ADD_DIGIT,
          payload: { digit },
        });
      }}
    >
      {digit}
    </button>
  );
}
