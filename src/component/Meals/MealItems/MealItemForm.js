import React from "react";
import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css"

const MealItemForm = () => {
  return (
    <div className={classes.form}>
      <Input label="Amount" input={{
        id: "amount",
        min: "1",
        max: "5",
        step: "1",
        defaultValue: "1",
        type: "number" ,
}}/>
      <button>+ Add</button>
    </div>
  )
}

export default MealItemForm;