/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Service,
  response,
  UserData,
  incorrectCredentials,
  LoginData,
  existError,
  databaseError,
  userNotFoundError,
} from "../utils";
import { service } from "../core";
import bcrypt, { hashSync } from "bcrypt";
import {
  findUserByEmailOrPhone,
  findUserByEmailAndPhone,
  createUser,
  findUser,
  updateUserProfile,
} from "../repos";
import { generateToken } from "../utils/jwt";

export const signInUser: Service<LoginData> = ({ validatedData }) =>
  service(async () => {
    const { email, password } = validatedData;
    const { data: foundUser, error } = await findUserByEmailOrPhone(
      email.toLowerCase()
    );
    if (error) return response.serverError(error);
    if (!foundUser) return response.conflict(incorrectCredentials);

    const match = await bcrypt.compare(password, foundUser.password);
    if (!match) return response.conflict(incorrectCredentials);

    const user = foundUser as UserData;

    const token = await generateToken({
      id: user.id,
      email: user.email,
    });
    const { password: psw, ...data } = user;

    return response.success({ data, token }, "User logged in successfully");
  });

export const signUpUser: Service<UserData> = ({ validatedData }) =>
  service(async () => {
    const { email, password, phone } = validatedData;
    const { data: foundUser, error } = await findUserByEmailAndPhone(
      email,
      phone
    );
    if (error) return response.serverError(error);
    if (foundUser) return response.conflict(existError("Email or Phone"));
    validatedData.password = hashSync(password, 10);

    const { data, error: userError } = await createUser(validatedData);
    if (userError) return response.serverError(userError);
    if (!data) return response.serverError(databaseError);

    return response.success("User Created Successfully");
  });

export const fetchUserProfile: Service = ({ user }) =>
  service(async () => {
    if (!user) return response.serverError();

    const { data: userData, error } = await findUser(user.id);
    if (error) return response.serverError(error);
    if (!userData) return response.conflict(userNotFoundError);
    const { password: psw, ...data } = user;

    return response.success(data, "Profile fetched successfully");
  });

export const editUserProfile: Service<UserData> = ({ validatedData, user }) =>
  service(async () => {
    if (!user) return response.serverError();

    const { data, error: updateError } = await updateUserProfile(
      user.id,
      validatedData
    );
    if (updateError) return response.serverError(updateError);
    return response.success(data, "Profile updated successfully");
  });
