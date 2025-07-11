import clsx from 'clsx';
import type { CSSProperties, ReactNode } from 'react';

type Props = {
   children?: ReactNode;
   className?: string;
   title?: string;
   style?: CSSProperties;
   right?: ReactNode;
};

export const Card = ({ children, className, title, style, right }: Props) => {
   return (
      <div
         className={clsx(
            className,
            'bg-white p-5 rounded-2xl flex flex-col gap-5',
         )}
         style={style}
      >
         {(title || right) && (
            <div className='flex items-center justify-between'>
               <p className='text-xl font-semibold text-slate-500'>{title}</p>

               <div className='flex items-center gap-2'>{right}</div>
            </div>
         )}

         {children && <div className='size-full'>{children}</div>}
      </div>
   );
};
