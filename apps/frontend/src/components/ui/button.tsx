import { cva, type VariantProps } from 'class-variance-authority';
import clsx from 'clsx';

const button = cva(
   ['border rounded-md flex items-center justify-center cursor-pointer'],
   {
      variants: {
         schema: {
            white: ['bg-white', 'text-black', 'border-gray-200'],
            primary: [
               'bg-blue-500 hover:bg-blue-600',
               'text-white',
               'border-blue-500',
            ],
            'primary-highlight': [
               'bg-blue-100',
               'text-white',
               'border-blue-500',
            ],
            danger: ['bg-red-500', 'text-white', 'border-red-500'],
            'success-highlight': [
               'bg-green-100',
               'text-green-500',
               'border-green-100',
            ],
         },
         size: {
            medium: ['text-base h-12 px-3'],
         },
         disabled: {
            false: null,
            true: ['opacity-50', 'cursor-not-allowed'],
         },
      },
      defaultVariants: {
         schema: 'primary',
         size: 'medium',
         disabled: false,
      },
   },
);

type Props = {
   className?: string;
   children: React.ReactNode;
   onClick?: () => void;
};

export const Button = ({
   disabled,
   children,
   size,
   schema,
   className,
   onClick,
}: Props & VariantProps<typeof button>) => {
   return (
      <div
         onClick={() => {
            if (disabled) {
               return;
            }

            onClick?.();
         }}
         className={clsx(className, button({ size, schema, disabled }))}
      >
         {children}
      </div>
   );
};
