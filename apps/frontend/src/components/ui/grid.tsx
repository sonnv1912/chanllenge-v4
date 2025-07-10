import clsx from 'clsx';
import type { ReactNode } from 'react';

type Props = {
   responsive?: {
      sm: number;
      md: number;
      lg: number;
   };
   children: ReactNode;
};

export const Grid = ({
   responsive = { sm: 1, md: 2, lg: 3 },
   children,
}: Props) => {
   return (
      <div
         className={clsx(
            `grid gap-5 grid-cols-${responsive?.sm}`,
            `md:grid-cols-${responsive?.md}`,
            `lg:grid-cols-${responsive?.lg}`,
         )}
      >
         {children}
      </div>
   );
};
