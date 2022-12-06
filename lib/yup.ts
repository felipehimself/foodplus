import * as Yup from 'yup';

export const productValidation = Yup.object().shape({
  type: Yup.string().trim().required('required'),
  name: Yup.string().trim().required('required'),
  price: Yup.number().required('required'),
 
});
