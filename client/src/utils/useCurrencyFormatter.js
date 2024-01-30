import { useMemo } from 'react';

const useCurrencyFormatter = () => {
  const formatter = useMemo(
    () =>
      new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0
      }),
    []
  );

  return formatter;
};

export default useCurrencyFormatter;
