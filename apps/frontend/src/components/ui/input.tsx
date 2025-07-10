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
      <div
         className={clsx(
            'h-12 rounded-md bg-white border border-gray-200 focus-within:border-blue-500',
            className,
         )}
      >
         {label && <p className='mb-2'>{label}</p>}

         <input
            type='text'
            className='size-full px-3 outline-0'
            value={value}
            placeholder={placeholder}
            onInput={(e) => onChange?.((e.target as HTMLInputElement).value)}
         />

         {errorMessage && (
            <p className='text-red-500 text-sm mt-1'>{errorMessage}</p>
         )}
      </div>
   );
};
