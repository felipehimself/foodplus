import LoadingIcons from 'react-loading-icons'


const PageLoading = () => {
  return (
    <div className='fixed inset-0 z-20 flex items-center justify-center backdrop-blur-[1px] bg-[rgba(0,0,0,0.2)]'>
     <LoadingIcons.Circles fill="#f73001" />

    </div>
  );
};
export default PageLoading;
