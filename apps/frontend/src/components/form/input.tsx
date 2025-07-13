import clsx from 'clsx';
import { Label } from '../ui/label';
import { ErrorMessage } from '../ui/error-message';

type Props = {
   label?: string;
   errMsg?: string;
   placeholder?: string;
   value?: string | null;
   className?: string;
   onChange?: (value: string) => void;
};

export const Input = ({
   label,
   errMsg,
   value,
   placeholder,
   className,
   onChange,
}: Props) => {
   return (
      <div className={clsx('flex-1 w-full', className)}>
         {label && <Label content={label} />}

         <div
            className={clsx(
               'h-10 rounded-md bg-white border border-gray-200 text-sm focus-within:border-blue-500 overflow-hidden w-full',
            )}
         >
            <input
               type='text'
               className='size-full px-3 outline-0'
               value={value || ''}
               placeholder={placeholder}
               onInput={(e) => onChange?.((e.target as HTMLInputElement).value)}
            />
         </div>

         {errMsg && <ErrorMessage content={errMsg} />}
      </div>
   );
};
