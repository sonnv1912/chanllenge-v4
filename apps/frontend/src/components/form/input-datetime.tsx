import clsx from 'clsx';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { upperFirst } from 'lodash';
import { useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { ErrorMessage } from '../ui/error-message';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type Props = {
   label?: string;
   value?: string | null;
   errMsg?: string;
   disable?: boolean;
   min?: string;
   onChange?: (data?: string | null) => void;
};

export const InputDatetime = ({
   label,
   value,
   disable,
   errMsg,
   min,
   onChange,
}: Props) => {
   const [mode, setMode] = useState<'date' | 'month' | 'year'>('date');
   const ref = useRef<DatePicker>(null);

   return (
      <div>
         {label && <Label content={label} />}

         <DatePicker
            ref={ref}
            selected={value ? new Date(value) : undefined}
            dateFormat='dd/MM/yyyy'
            showPopperArrow={false}
            minDate={min ? new Date(min) : undefined}
            locale={vi}
            popperPlacement='bottom-start'
            showMonthYearPicker={mode === 'month'}
            showYearPicker={mode === 'year'}
            yearItemNumber={18}
            showFullMonthYearPicker={true}
            shouldCloseOnSelect={false}
            disabled={disable}
            className={clsx({
               'bg-gray-200 cursor-default': disable,
            })}
            renderCustomHeader={(data) => {
               const year = data.date.getFullYear();
               const startYear = Math.floor((year - 1) / 18) * 18 + 1;
               const endYear = startYear + 17;

               return (
                  <div className='flex items-center justify-between mb-5'>
                     <Button
                        rounded={true}
                        schema={'primary-highlight'}
                        onClick={() => {
                           if (mode === 'date') {
                              data.decreaseMonth();
                           }

                           if (mode === 'month') {
                              data.decreaseYear();
                           }

                           if (mode === 'year') {
                              data.changeYear(startYear - 18);
                           }
                        }}
                     >
                        <ChevronLeft size={20} />
                     </Button>

                     <p
                        className='text-sm font-medium'
                        onClick={() => {
                           if (mode === 'date') {
                              setMode('month');
                           }
                           if (mode === 'month') {
                              setMode('year');
                           }
                           if (mode === 'year') {
                              setMode('date');
                           }
                        }}
                     >
                        {mode === 'date' &&
                           upperFirst(
                              format(data.monthDate, 'MMMM, yyyy', {
                                 locale: vi,
                              }),
                           )}

                        {mode === 'month' &&
                           upperFirst(
                              format(data.monthDate, 'yyyy', {
                                 locale: vi,
                              }),
                           )}

                        {mode === 'year' && `${startYear} - ${endYear}`}
                     </p>

                     <Button
                        rounded={true}
                        schema={'primary-highlight'}
                        onClick={() => {
                           if (mode === 'date') {
                              data.increaseMonth();
                           }

                           if (mode === 'month') {
                              data.increaseYear();
                           }

                           if (mode === 'year') {
                              data.changeYear(endYear + 18);
                           }
                        }}
                     >
                        <ChevronRight size={20} />
                     </Button>
                  </div>
               );
            }}
            onSelect={(data) => {
               if (mode === 'year') {
                  setMode('month');
               }
               if (mode === 'month') {
                  setMode('date');
               }

               if (mode === 'date' && data) {
                  ref.current?.setOpen(false);

                  const currDate = new Date();

                  data.setHours(currDate.getHours());
                  data.setMinutes(currDate.getMinutes());
                  data.setSeconds(currDate.getSeconds());

                  onChange?.(data?.toISOString());
               }
            }}
         />

         <ErrorMessage content={errMsg} />
      </div>
   );
};
