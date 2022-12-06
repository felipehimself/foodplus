interface IProps {
  children: React.ReactNode;
}
const AdminContainer = ({ children }: IProps) => {
  return <div className='mt-14 mx-auto container'>{children}</div>;
};
export default AdminContainer;
