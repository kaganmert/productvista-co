export type BaseEntity = {
  id: string;
  createdAt: number;
};

export type Entity<T> = {
  [K in keyof T]: T[K];
} & BaseEntity;

export type User = Entity<{
  username: string;
}>;

export type AuthResponse = {
  jwt: string;
  user: User;
};
