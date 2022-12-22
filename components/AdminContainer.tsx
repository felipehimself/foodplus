import { IChildren } from '../interfaces/Props';

const AdminContainer = ({ children }: IChildren) => {
  return <div className='mt-4 mx-auto container'>{children}</div>;
};
export default AdminContainer;
