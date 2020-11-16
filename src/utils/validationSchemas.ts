import { object, string } from 'yup';

const validationSchema = object().shape({
    name: string().required(),
    quantity: string().required().min(1),
    price: string().required(),
    sku: string().required(),
    cost: string().required(),
    description: string().required(),
  });

export default validationSchema;