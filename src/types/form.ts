export type LoginFormData = {
  identifier: string;
  password: string;
};

export type SignupFormData = {
  username: string;
  email: string;
  fullName: string;
  password: string;
  confirmPassword: string;
};

export type UpdateProfileFormData = {
  username: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  profileImageUrl: string;
};

export type ChangePasswordFormData = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export type PasswordResetRequest = {
  email: string;
};

export type PasswordResetFormData = {
  email: string;
  newPassword: string;
  confirmPassword: string;
};
