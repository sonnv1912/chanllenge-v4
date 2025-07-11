import { routes } from '@packages/configs';

export const WelcomePage = () => {
   return (
      <div className='bg-black h-screen w-screen flex flex-col gap-5 items-center justify-center text-white'>
         <p>HI, welcome back</p>

         <a
            className='bg-green-500 hover:bg-green-600 rounded-md px-4 py-2'
            href={routes.login}
         >
            Login to continue
         </a>
      </div>
   );
};
