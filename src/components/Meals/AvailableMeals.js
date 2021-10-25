import { useContext } from 'react';
import { OrdersContext } from '../../context/OrdersContext';
import classes from './AvailableMeals.module.css';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';

const AvailableMeals = () => {
  const mealsCntx = useContext(OrdersContext);

  if (mealsCntx.isLoading) {
    return (
      <section>
        <p className={classes['loading-text']}>Loading...</p>
      </section>
    );
  }

  if (mealsCntx.httpError) {
    return (
      <section>
        <p className={classes['error-text']}>{mealsCntx.httpError}</p>
      </section>
    );
  }

  const mealList = mealsCntx.meals.map(meal => (
    <MealItem
      id={meal.id} // Fixing label problem
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
