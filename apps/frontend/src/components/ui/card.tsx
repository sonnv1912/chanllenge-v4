import clsx from 'clsx';
import { forwardRef, type CSSProperties, type ReactNode } from 'react';

type Props = {
   children?: ReactNode;
   className?: string;
   title?: string;
   style?: CSSProperties;
   right?: ReactNode;
   header?: ReactNode;
   subTitle?: string;
};

export const Card = forwardRef<HTMLDivElement, Props>(
   ({ children, className, title, style, right, header, subTitle }, ref) => {
      return (
         <div
            ref={ref}
            className={clsx(
               className,
               'bg-white p-5 rounded-2xl flex flex-col gap-5',
            )}
            style={style}
         >
            {!header && (title || right) && (
               <div className='flex items-center justify-between'>
                  <div>
                     <p className='text-xl font-semibold text-blue-500'>
                        {title}
                     </p>

                     {subTitle && (
                        <p className='text-xm text-slate-400'>{subTitle}</p>
                     )}
                  </div>

                  <div className='flex items-center gap-2'>{right}</div>
               </div>
            )}

            {header && header}

            {children && <div className='size-full'>{children}</div>}
         </div>
      );
   },
);
