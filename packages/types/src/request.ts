export type Response<T = null> = {
   data?: T | null;
   success: boolean;
   message?: string;
   status: number;
   meta?: Meta;
};

export type Meta = {
   total: number;
   next_page?: number;
};

export type QueryParams<T = any> = {
   fields: T;
   limit: number;
   page: number;
   offset: number;
};
