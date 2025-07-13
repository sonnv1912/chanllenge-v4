type Props = {
   content: string;
};

export const Label = ({ content }: Props) => {
   return (
      <p className='text-sm mb-1.5 cursor-default text-t-muted font-medium'>
         {content}
      </p>
   );
};
