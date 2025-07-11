import clsx from 'clsx';

type Props = {
   label?: string;
   errorMessage?: string;
   placeholder?: string;
   value?: string;
   className?: string;
   onChange?: (value: string) => void;
};

export const Input = ({
   label,
   errorMessage,
   value,
   placeholder,
   className,
   onChange,
}: Props) => {
   return (
      <div className='flex-1 w-full'>
         {label && <p className='mb-2 text-sm'>{label}</p>}

         <div
            className={clsx(
               'h-10 rounded-md bg-white border border-gray-200 text-sm focus-within:border-blue-500 overflow-hidden w-full',
               className,
            )}
         >
            <input
               type='text'
               className='size-full px-3 outline-0'
               value={value}
               placeholder={placeholder}
               onInput={(e) => onChange?.((e.target as HTMLInputElement).value)}
            />
         </div>

         {errorMessage && (
            <p className='text-red-400 text-xs mt-1'>{errorMessage}</p>
         )}
      </div>
   );
};
