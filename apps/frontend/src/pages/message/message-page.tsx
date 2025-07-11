import { endpoint } from '@packages/configs';
import { useGetList } from '../../hooks/use-get-list';
import type { Chat, Message, User } from '@packages/types/data';
import { Card } from '../../components/ui/card';
import { User as UserIcon } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { useEffect, useState } from 'react';
import { Input } from '../../components/ui/input';
import { useLocalStorage } from '../../hooks/use-localstorage';
import clsx from 'clsx';

export const MessagePage = () => {
   const [selected, setSelected] = useState<Chat>();
   const [user] = useLocalStorage<User>('user');

   const chatQuery = useGetList<Chat[]>({
      endpoint: endpoint.chats,
   });

   const messageQuery = useGetList<Message[]>({
      endpoint: endpoint.messages,
      enable: !!selected?.id,
      queryParams: {
         chat_id: selected?.id,
      },
   });

   const height = 'calc(100vh - 56px - 40px)';

   useEffect(() => {
      if (chatQuery.data?.data?.length) {
         setSelected(chatQuery.data?.data[0]);
      }
   }, [chatQuery.data?.data]);

   return (
      <div className='flex items-start gap-5 p-5'>
         <Card
            title='Messages'
            className='w-80 overflow-auto'
            style={{
               height,
            }}
         >
            {chatQuery.data?.data?.map((chat) => (
               <div key={chat.id} className='flex items-center gap-3'>
                  <Button schema={'primary-highlight'} rounded={true}>
                     <UserIcon />
                  </Button>

                  <div>
                     <p className='mb-1'>{chat.room_name}</p>

                     <p className='text-gray-500 text-sm'>
                        {chat.last_message}
                     </p>
                  </div>
               </div>
            ))}
         </Card>

         <Card
            className='flex-1'
            title={selected?.room_name}
            style={{
               height,
            }}
         >
            <div className='border-t border-gray-200 flex flex-col h-full gap-5'>
               <div className='flex-1 flex flex-col justify-end'>
                  {messageQuery.data?.data?.map((message) => {
                     const isMe = message.sender.email === user?.email;

                     return (
                        <div
                           key={message.id}
                           className={clsx('flex items-start gap-2', {
                              'justify-end': isMe,
                           })}
                        >
                           {isMe && (
                              <p className='p-2 bg-slate-200 rounded-lg'>
                                 {message.content}
                              </p>
                           )}

                           <Button schema={'primary-highlight'} rounded={true}>
                              <UserIcon />
                           </Button>

                           {!isMe && (
                              <p className='p-2 bg-slate-200 rounded-lg'>
                                 {message.content}
                              </p>
                           )}
                        </div>
                     );
                  })}
               </div>

               <Input placeholder='Your message here' />
            </div>
         </Card>
      </div>
   );
};
