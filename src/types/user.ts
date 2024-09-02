type User = {
  id: number;
  username: string;
  email: string;
  fullName: string;
  dateOfBirth: string;
  phoneNumber: string;
  profileImageUrl: string;
  roles: Array<Role>;
};

type Role = {
  id: number;
  name: string;
};

export type { User, Role };
