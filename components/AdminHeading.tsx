import { IAdminHeading } from '../interfaces/Props';

const AdminHeading = ({ title, width }: IAdminHeading) => {
  return (
    <div
      className={`flex mb-4 relative justify-center items-center ${
        width || 'lg:w-4/12'
      } mx-auto`}
    >
      <h2>{title}</h2>
    </div>
  );
};
export default AdminHeading;
