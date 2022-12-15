import * as Yup from 'yup';

export const productValidation = Yup.object().shape({
  category: Yup.string().trim().required('required'),
  name: Yup.string().trim().required('required'),
  price: Yup.number().required('required'),
});

export const userAddressValidation = Yup.object().shape({
  street: Yup.string().trim().required('required'),
  number: Yup.number(),
  city: Yup.string().trim().required('required'),
  state: Yup.string().trim().required('required'),
});
