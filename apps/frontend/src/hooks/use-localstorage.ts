import { useCallback, useEffect, useState } from 'react';

export const useLocalStorage = <T>(
   key: string,
): [T | undefined, (value: T) => void] => {
   const [value, _setValue] = useState<T>();

   const setValue = useCallback(
      (newValue: T) => {
         localStorage.setItem(
            key,
            typeof newValue === 'string' ? newValue : JSON.stringify(newValue),
         );

         _setValue(newValue);
      },
      [key],
   );

   useEffect(() => {
      const result = localStorage.getItem(key);

      try {
         _setValue(result ? JSON.parse(result) : result);
      } catch (_) {
         _setValue(result as T);
      }
   }, [key]);

   return [value, setValue];
};
