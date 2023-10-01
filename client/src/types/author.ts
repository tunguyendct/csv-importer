import { Status } from "./response";

export type Author = {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
};

export type AuthorsResponse = {
  status: Status;
  data: {
    authors: Author[];
    total: number;
  };
};

export type AuthorFilter = {
  q?: string;
  limit?: number;
  page?: number;
};
