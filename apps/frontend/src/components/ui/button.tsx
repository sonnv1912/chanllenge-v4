import { cva, type VariantProps } from 'class-variance-authority';
import clsx from 'clsx';

const button = cva(
   [
      'border flex items-center gap-2 text-sm cursor-pointer transition-all duration-300 outline-none',
   ],
   {
      variants: {
         schema: {
            white: ['bg-white text-black border-gray-200 hover:bg-gray-200'],
            primary: [
               'bg-blue-500 hover:bg-blue-600 text-white border-blue-500',
            ],
            'primary-highlight': [
               'bg-blue-100 text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white',
            ],
            danger: ['bg-red-500 text-white border-red-500 hover:bg-red-600'],
            'success-highlight': [
               'bg-green-100 text-green-500 border-green-500 hover:bg-green-500 hover:text-white',
            ],
            success: [
               'bg-green-500 text-white border-green-500 hover:bg-green-600',
            ],
            violet: [
               'bg-violet-500 text-white border-violet-500 hover:bg-violet-600',
            ],
         },
         size: {
            medium: ['min-h-10 min-w-10 px-2'],
            custom: [],
         },
         disabled: {
            false: null,
            true: ['opacity-50', 'cursor-not-allowed'],
         },
         outline: {
            false: 'border-transparent',
            true: '',
         },
         rounded: {
            false: 'rounded-md',
            true: 'rounded-full',
         },
      },
      defaultVariants: {
         schema: 'primary',
         size: 'medium',
         disabled: false,
         outline: true,
         rounded: false,
      },
   },
);

type Props = {
   className?: string;
   children: React.ReactNode;
   onClick?: () => void;
};

export const Button = ({
   className,
   onClick,
   children,
   ...variants
}: Props & VariantProps<typeof button>) => {
   return (
      <div
         onClick={() => {
            if (variants.disabled) {
               return;
            }

            onClick?.();
         }}
         className={clsx(className, button(variants))}
      >
         {children}
      </div>
   );
};
