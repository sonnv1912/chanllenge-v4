import { endpoint, socketEvent } from '@packages/configs';
import type { Response } from '@packages/types';
import type { Chat, Message, User } from '@packages/types/data';
import clsx from 'clsx';
import { differenceInHours } from 'date-fns';
import { Pen, Plus, Send, User as UserIcon, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useModal } from 'react-motion-modal';
import { Input } from '../../components/form/input';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { useGetList } from '../../hooks/use-get-list';
import { useLocalStorage } from '../../hooks/use-localstorage';
import { useMutate } from '../../hooks/use-mutate';
import { socket } from '../../utils/socket';

export const MessagePage = () => {
   const [selected, setSelected] = useState<Chat>();
   const [user] = useLocalStorage<User>('user');
   const [content, setContent] = useState('');
   const chatBoxRef = useRef<HTMLDivElement>(null);
   const openModal = useModal((state) => state.openModal);
   const createChatMutate = useMutate(endpoint.chats);
   const [editingMessage, setEditingMessage] = useState<Message>();

   const chatQuery = useGetList<Chat>({
      endpoint: endpoint.chats,
   });

   const messageQuery = useGetList<Message>({
      endpoint: endpoint.messages,
      enable: !!selected?.id,
      queryParams: {
         chat_id: selected?.id,
      },
   });

   const height = 'calc(100vh - 56px - 40px)';

   const onSendMessage = () => {
      if (content) {
         socket.emit(socketEvent.onMessage, {
            id: editingMessage?.id,
            chat_id: selected?.id,
            sender_id: user?.id,
            content,
         });

         setContent('');
         setEditingMessage(undefined);

         return;
      }

      toast.error('Please type your message then submit');
   };

   useEffect(() => {
      if (chatQuery.data?.data?.length) {
         setSelected(chatQuery.data?.data[0]);
      }
   }, [chatQuery.data?.data]);

   useEffect(() => {
      if (messageQuery.data?.data) {
         chatBoxRef.current?.scrollTo({
            behavior: 'smooth',
            top: chatBoxRef.current.getBoundingClientRect().height,
         });
      }
   }, [messageQuery.data?.data]);

   // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
   useEffect(() => {
      const event = socket.on(
         socketEvent.onMessage,
         (response: Response<Message>) => {
            if (response.success) {
               messageQuery.refetch();
               chatQuery.refetch();

               return;
            }

            toast.error(response.message || 'Chat failed');
         },
      );

      return () => {
         event.removeListener();
      };
   }, []);

   return (
      <div className='flex items-start gap-5 p-5'>
         <Card
            title='Messages'
            className='w-64 overflow-auto'
            right={
               <Button
                  schema={'success'}
                  rounded={true}
                  onClick={() => {
                     openModal('SelectObjectModal', {
                        endpoint: endpoint.users,
                        itemKey: 'id',
                        title: 'Select user to chat with',
                        multiple: false,
                        body: {
                           className: 'size-full',
                        },
                        columns: [
                           {
                              code: 'name',
                              label: 'Name',
                           },
                           {
                              code: 'email',
                              label: 'Email',
                           },
                           {
                              code: 'role',
                              label: 'Role',
                           },
                        ],
                        onConfirm: async (user: User) => {
                           await toast.promise(
                              async () =>
                                 await createChatMutate.mutateAsync({
                                    body: {
                                       user_id: user.id,
                                       email: user.email,
                                    },
                                 }),
                              {
                                 loading: 'Creating your chat',
                                 success: () => {
                                    chatQuery.refetch();

                                    return `Now you can chat with ${user.name}`;
                                 },
                              },
                           );
                        },
                     });
                  }}
               >
                  <Plus size={20} />
               </Button>
            }
            style={{
               height,
            }}
         >
            <div className='flex flex-col gap-3'>
               {chatQuery.data?.data?.map((chat) => (
                  <Button
                     onClick={() => setSelected(chat)}
                     schema={
                        selected?.id === chat.id ? 'primary-highlight' : 'white'
                     }
                     key={chat.id}
                     className='flex items-center gap-3 justify-start py-2'
                     outline={false}
                  >
                     <Button schema={'primary-highlight'} rounded={true}>
                        <UserIcon />
                     </Button>

                     <div className='flex-1'>
                        <p className='mb-1 font-semibold'>{chat.room_name}</p>

                        <p className='text-xs line-clamp-1'>
                           {chat.last_message}
                        </p>
                     </div>
                  </Button>
               ))}
            </div>
         </Card>

         {selected && (
            <Card
               ref={chatBoxRef}
               className='flex-1 overflow-auto pb-0'
               title={selected?.room_name}
               style={{
                  height,
               }}
            >
               <div className='border-t border-gray-200 flex flex-col h-full gap-5'>
                  <div className='flex-1 flex flex-col justify-end gap-5'>
                     {messageQuery.data?.data?.map((message) => {
                        const isMe = message.sender.id === user?.id;
                        const editing = editingMessage?.id === message.id;
                        const canEdit = differenceInHours(
                           new Date(),
                           new Date(message.created_at),
                        );

                        return (
                           <div
                              key={message.id}
                              className={clsx('flex items-start gap-2', {
                                 'justify-end': isMe,
                              })}
                           >
                              <Button
                                 schema={'primary-highlight'}
                                 rounded={true}
                              >
                                 <UserIcon />
                              </Button>

                              <div
                                 className={clsx({
                                    '-order-1': isMe,
                                 })}
                              >
                                 <p
                                    className={clsx(
                                       'p-2 bg-slate-200 rounded-lg',
                                    )}
                                 >
                                    {message.content}
                                 </p>

                                 {message.updated_at && (
                                    <p className='text-right text-xs mt-0.5 text-gray-500'>
                                       Updated
                                    </p>
                                 )}
                              </div>

                              {isMe && canEdit < 2 && (
                                 <Button
                                    schema={
                                       editing ? 'primary-highlight' : 'white'
                                    }
                                    size={'custom'}
                                    rounded={true}
                                    className={clsx(
                                       'justify-center p-2 mt-1.5 block -order-2',
                                    )}
                                    onClick={() => {
                                       setEditingMessage(message);
                                       setContent(message.content);
                                    }}
                                 >
                                    <Pen size={12} />
                                 </Button>
                              )}
                           </div>
                        );
                     })}
                  </div>

                  <div className='flex items-end sticky bottom-0 left-0 right-0 bg-white gap-2'>
                     <div className='flex-1'>
                        {editingMessage && (
                           <div className='text-sm bg-slate-100 p-3 rounded-t-2xl flex items-center justify-between'>
                              <p>{editingMessage.content}</p>

                              <Button
                                 className='justify-center p-1'
                                 schema={'primary-highlight'}
                                 size={'custom'}
                                 rounded={true}
                                 onClick={() => setEditingMessage(undefined)}
                              >
                                 <X size={16} />
                              </Button>
                           </div>
                        )}

                        <Input
                           placeholder='Your message here'
                           value={content}
                           onChange={setContent}
                           onEnter={onSendMessage}
                        />
                     </div>

                     <Button onClick={onSendMessage}>
                        <Send />
                     </Button>
                  </div>
               </div>
            </Card>
         )}
      </div>
   );
};
