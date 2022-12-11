import LoadingIcons from 'react-loading-icons'


const PageLoading = () => {
  return (
    <div className='fixed inset-0 z-20 flex items-center justify-center bg-gradient-to-b from-[rgba(0,0,0,0.1)] to-[rgba(0,0,0,0.1)]'>
     <LoadingIcons.Circles fill="#f73001" />

    </div>
  );
};
export default PageLoading;
