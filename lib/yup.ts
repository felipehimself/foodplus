import * as Yup from 'yup';

export const productValidation = Yup.object().shape({
  category: Yup.string().trim().required('required'),
  name: Yup.string().trim().required('required'),
  price: Yup.number().required('required'),
 
});
