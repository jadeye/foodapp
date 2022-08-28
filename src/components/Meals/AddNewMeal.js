import Modal from "../UI/Modal";
import NewMealForm from "./NewMealForm";
import useHttp from "../../hooks/useHttp";

/* Data structure
    id: "m2",
    name: "Schnitzel",
    description: "A german specialty!",
    price: 16.5,

 */

const AddNewMealForm = (props) => {
  const { isLoading, error, sendHTTPRequest: sendAddMealRequest } = useHttp();
  let success = "";
  const callbackFunction = (childData) => {
    console.log(`childData ${childData}`);
    this.setState({ success: childData });
  };
  /* 
  const creatTask = (mealData, mealText) => {
    const generatedId = mealData.name; // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, mealData };

    props.onAddTask(createdTask);
  };
 */
  const addNewMealHandler = async (mealData) => {
    sendAddMealRequest(
      {
        url: "https://react-http-2496a-default-rtdb.europe-west1.firebasedatabase.app/meals.json",
        method: "POST",
        body: mealData,
        headers: { "Content-Type": "application/json" },
      }
      // creatTask.bind(null, mealData)
    );
  };

  if (error) {
    console.log(`ERR: ${error}`);
  }
  if (!error && error !== null) {
    console.log(error);
    // success = "success";
  }
  return (
    <Modal onClose={props.onClose}>
      <NewMealForm
        onAddNewMeal={addNewMealHandler}
        onClose={() => props.onClose("ddd")}
        loading={isLoading}
        parentCallback={callbackFunction}
      />
      {error && <p>{error}</p>}
    </Modal>
  );
};
export default AddNewMealForm;
