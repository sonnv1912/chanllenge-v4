type Props = {
   content?: string;
};

export const ErrorMessage = ({ content }: Props) => {
   if (!content) {
      return null;
   }

   return <p className='text-xs mt-1 text-red-500'>{content}</p>;
};
