import { RiAdminFill } from 'react-icons/ri';

const Admin = () => {
  return (
    <div className='container mx-auto'>
      <div className='text-lg mt-4 text-center p-2 mx-auto w-full flex justify-center'>
        <RiAdminFill className='fill-slate-600' size={36} />
      </div>
      <form className='mx-auto md:w-4/12 flex flex-col gap-4 mt-6'>
        <h2 className=' font-semibold text-center text-slate-600'>
          Include Product • Admin Panel 
        </h2>
        <div className='flex flex-col gap-1 text-sm'>
          <label htmlFor='type' className='text-slate-600'>
            Type
          </label>
          <select
            className='form-select appearance-none
                block
                w-full
                px-3
                py-1.5
                text-base
                font-normal
                text-gray-700
                bg-white bg-clip-padding bg-no-repeat
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                m-0
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
            aria-label='Default select example'
          >
            <option>Sauce</option>
            <option value='1'>Veggie</option>
            <option value='2'>Cheese</option>
            <option value='2'>Crunch</option>
            <option value='2'>Extras</option>
          </select>
        </div>

        <div className='flex flex-col gap-1 text-sm'>
          <label
            htmlFor='name'
            className='form-label inline-block  text-gray-700'
          >
            Name
          </label>
          <input
            type='text'
            className='
              form-control
              block
              w-full
              px-3
              py-1.5
              text-base
              font-normal
              text-gray-700
              bg-white bg-clip-padding
              border border-solid border-gray-300
              rounded
              transition
              ease-in-out
              m-0
              focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
              '
            id='name'
            placeholder=''
          />
        </div>

        <div className='flex flex-col gap-1 text-sm'>
          <label
            htmlFor='price'
            className='form-label inline-block  text-gray-700'
          >
            Price
          </label>
          <input
            type='number'
            className='
              form-control
              block
              w-full
              px-3
              py-1.5
              text-base
              font-normal
              text-gray-700
              bg-white bg-clip-padding
              border border-solid border-gray-300
              rounded
              transition
              ease-in-out
              m-0
              focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
              '
            id='price'
            placeholder=''
          />
        </div>

        <div className='flex flex-col gap-1 text-sm'>
          <label
            htmlFor='image'
            className='form-label inline-block mb-2 text-gray-700'
          >
            Image
          </label>
          <input
            className='form-control
            block
            w-full
            px-3
            py-1.5
            text-base
            font-normal
            text-gray-700
            bg-white bg-clip-padding
            border border-solid border-gray-300
            rounded
            transition
            ease-in-out
            m-0
           focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
            type='file'
            id='image'
          />
        </div>
        <button
          type='button'
          className='mt-6 inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'
        >
          Send
        </button>
      </form>
    </div>
  );
};
export default Admin;
