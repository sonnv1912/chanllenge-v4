import { useState } from 'react';
import type { ModalParams } from 'react-motion-modal';
import { Listing, type ListingProps } from '../components/ui/listing';
import { Button } from '../components/ui/button';

type MultipleProps = {
   selected?: any[];
   onConfirm: (items: any[]) => void;
   multiple: true;
};

type SingleProps = {
   onConfirm: (items?: any) => void;
   selected?: any;
   multiple: false;
};

export type SelectObjectModalProps = (MultipleProps | SingleProps) &
   Omit<ListingProps, 'onRowClick' | 'createNew' | 'queryParams' | 'actions'>;

export const SelectObjectModal = ({
   closeModal,
   ...listingProps
}: ModalParams<'SelectObjectModal'>) => {
   const [selected, setSelected] = useState(
      listingProps.multiple
         ? listingProps.selected || []
         : listingProps.selected
           ? [listingProps.selected]
           : [],
   );

   return (
      <Listing
         title={listingProps.title}
         endpoint={listingProps.endpoint}
         itemKey={listingProps.itemKey}
         columns={listingProps.columns}
         selected={selected}
         right={
            <>
               <Button schema={'white'} onClick={closeModal}>
                  Cancel
               </Button>

               <Button
                  schema={'success'}
                  onClick={() => {
                     closeModal();

                     if (listingProps.multiple) {
                        listingProps.onConfirm(selected);
                     } else {
                        listingProps.onConfirm(selected?.[0]);
                     }
                  }}
               >
                  Save
               </Button>
            </>
         }
         onRowClick={(item) => {
            const foundIndex = selected.findIndex(
               (t) => item.email === t.email,
            );

            if (foundIndex > -1) {
               setSelected((prev) =>
                  prev.filter((_, index) => index !== foundIndex),
               );
            }

            if (listingProps.multiple) {
               setSelected((prev) => [...prev, item]);
            } else {
               setSelected([item]);
            }
         }}
      />
   );
};
