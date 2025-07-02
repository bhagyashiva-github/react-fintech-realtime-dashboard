import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Formik, Form, Field } from 'formik';

const CurrencyWidget: React.FC = () => {
  const [rates, setRates] = useState<Record<string, number>>({});
  const [result, setResult] = useState<number | null>(null);



  useEffect(() => {
    axios.get('https://open.er-api.com/v6/latest/USD')
      .then(res => setRates(res.data.rates))
      .catch(console.error);
  }, []);

  return (
    <div className="bg-gray-300 p-6 rounded shadow">
      <h2 className="text-lg font-bold mb-2">Currency Converter</h2>
      <Formik
        initialValues={{ amount: 1, from: 'USD', to: 'INR' }}
        onSubmit={({ amount, from, to }) => {
          const rate = rates[to] / rates[from];
          setResult(amount * rate);
        }}
      >
        <Form className="flex gap-2 flex-wrap items-center">
          <Field name="amount" type="number" className="bg-white text-black border border-gray-300 rounded px-3 py-2"/>
          <Field as="select" name="from" className="bg-white text-black border border-gray-300 rounded px-3 py-2">
            {Object.keys(rates).map(cur => <option key={cur}>{cur}</option>)}
          </Field>
          <Field as="select" name="to" className="bg-white text-black border border-gray-300 rounded px-3 py-2">
            {Object.keys(rates).map(cur => <option key={cur}>{cur}</option>)}
          </Field>
          <button type="submit" className="px-4 py-2 font-medium rounded bg-blue-600 text-white ">Convert</button>
        </Form>
      </Formik>
      {result !== null && (
        <p className="mt-2 text-green-600 font-semibold">Converted Amount: {result.toFixed(2)}</p>
      )}
    </div>
  );
};
export default CurrencyWidget;
