import { useState, useEffect } from "react";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import useHttp from "../../hooks/useHttp";

import MealItem from "./MealItem/MealItem";
/* 
const DUMMY_MEALS = [
  {
    id: "m1",
    name: "Sushi",
    description: "Finest fish and veggies",
    price: 22.99,
  },
  {
    id: "m2",
    name: "Schnitzel",
    description: "A german specialty!",
    price: 16.5,
  },
  {
    id: "m3",
    name: "Barbecue Burger",
    description: "American, raw, meaty",
    price: 12.99,
  },
  {
    id: "m4",
    name: "Green Bowl",
    description: "Healthy...and green...",
    price: 18.99,
  },
];
 */
const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);

  const { isLoading, error, sendHTTPRequest: fetchMeals } = useHttp();

  useEffect(() => {
    const transformMeals = (mealObj) => {
      const loadMeals = [];

      for (const mealKey in mealObj) {
        loadMeals.push({
          id: mealKey,
          name: mealObj[mealKey].name,
          description: mealObj[mealKey].description,
          price: mealObj[mealKey].price,
        });
      }

      setMeals(loadMeals);
    };
    fetchMeals(
      {
        url: "https://react-http-2496a-default-rtdb.europe-west1.firebasedatabase.app/meals.json",
      },
      transformMeals
    );
  }, [fetchMeals]);

  if (isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <h3>Loading...</h3>
      </section>
    );
  }
  if (error) {
    return (
      <section className={classes.MealsFetchingError}>
        <h3>{error}</h3>
      </section>
    );
  }
  const mealsList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
