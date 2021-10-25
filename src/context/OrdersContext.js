import { useState, useEffect, createContext } from 'react';

export const OrdersContext = createContext();

const OrdersProvider = ({ children }) => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  let url =
    'https://food-order-app-96653-default-rtdb.firebaseio.com/meals.json';

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json();

      const loadedMeals = [];

      for (const key in data) {
        loadedMeals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      }

      setMeals(loadedMeals);
      setIsLoading(false);
      console.log(meals);
    };

    fetchMeals().catch(error => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, [url]);

  const createOrder = async (userData, orderItems) => {
    setIsSubmitting(true);

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          user: userData,
          orderItems: orderItems,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Something went wrong ' + response.data);
      }

      const data = response.json();
      console.log(data);
      setIsSubmitting(false);
      setDidSubmit(true);
    } catch (error) {
      setHttpError(error.message);
    }
  };

  return (
    <OrdersContext.Provider
      value={{
        meals,
        isLoading,
        httpError,
        isSubmitting,
        didSubmit,
        createOrder,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};

export default OrdersProvider;
