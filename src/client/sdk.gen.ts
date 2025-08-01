// This file is auto-generated by @hey-api/openapi-ts

import type { Options as ClientOptions, TDataShape, Client } from './client';
import type { CreateUserData, CreateUserResponses, EditUserData, EditUserResponses, DelMenuData, DelMenuResponses, CreateMenuData, CreateMenuResponses, EditMenuData, EditMenuResponses, RegisterData, RegisterResponses, GetMenusData, GetMenusResponses, LoginData, LoginResponses, LoginOrRegisterData, LoginOrRegisterResponses, CheckAuthData, CheckAuthResponses, DeleteUserData, DeleteUserResponses, GetUserByIdData, GetUserByIdResponses, GetMenuData, GetMenuResponses } from './types.gen';
import { client as _heyApiClient } from './client.gen';

export type Options<TData extends TDataShape = TDataShape, ThrowOnError extends boolean = boolean> = ClientOptions<TData, ThrowOnError> & {
    /**
     * You can provide a client instance returned by `createClient()` instead of
     * individual options. This might be also useful if you want to implement a
     * custom client.
     */
    client?: Client;
    /**
     * You can pass arbitrary values through the `meta` object. This can be
     * used to access values that aren't defined as part of the SDK function.
     */
    meta?: Record<string, unknown>;
};

export const createUser = <ThrowOnError extends boolean = false>(options: Options<CreateUserData, ThrowOnError>) => {
    return (options.client ?? _heyApiClient).post<CreateUserResponses, unknown, ThrowOnError>({
        url: '/api/users',
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers
        }
    });
};

export const editUser = <ThrowOnError extends boolean = false>(options: Options<EditUserData, ThrowOnError>) => {
    return (options.client ?? _heyApiClient).put<EditUserResponses, unknown, ThrowOnError>({
        url: '/api/users',
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers
        }
    });
};

export const delMenu = <ThrowOnError extends boolean = false>(options: Options<DelMenuData, ThrowOnError>) => {
    return (options.client ?? _heyApiClient).delete<DelMenuResponses, unknown, ThrowOnError>({
        url: '/api/menu',
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers
        }
    });
};

export const createMenu = <ThrowOnError extends boolean = false>(options: Options<CreateMenuData, ThrowOnError>) => {
    return (options.client ?? _heyApiClient).post<CreateMenuResponses, unknown, ThrowOnError>({
        url: '/api/menu',
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers
        }
    });
};

export const editMenu = <ThrowOnError extends boolean = false>(options: Options<EditMenuData, ThrowOnError>) => {
    return (options.client ?? _heyApiClient).put<EditMenuResponses, unknown, ThrowOnError>({
        url: '/api/menu',
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers
        }
    });
};

export const register = <ThrowOnError extends boolean = false>(options: Options<RegisterData, ThrowOnError>) => {
    return (options.client ?? _heyApiClient).post<RegisterResponses, unknown, ThrowOnError>({
        url: '/api/register',
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers
        }
    });
};

export const getMenus = <ThrowOnError extends boolean = false>(options: Options<GetMenusData, ThrowOnError>) => {
    return (options.client ?? _heyApiClient).post<GetMenusResponses, unknown, ThrowOnError>({
        url: '/api/menu/list',
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers
        }
    });
};

export const login = <ThrowOnError extends boolean = false>(options: Options<LoginData, ThrowOnError>) => {
    return (options.client ?? _heyApiClient).post<LoginResponses, unknown, ThrowOnError>({
        url: '/api/login',
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers
        }
    });
};

export const loginOrRegister = <ThrowOnError extends boolean = false>(options: Options<LoginOrRegisterData, ThrowOnError>) => {
    return (options.client ?? _heyApiClient).post<LoginOrRegisterResponses, unknown, ThrowOnError>({
        url: '/api/loginOrRegister',
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers
        }
    });
};

export const checkAuth = <ThrowOnError extends boolean = false>(options?: Options<CheckAuthData, ThrowOnError>) => {
    return (options?.client ?? _heyApiClient).post<CheckAuthResponses, unknown, ThrowOnError>({
        url: '/api/checkAuth',
        ...options
    });
};

export const deleteUser = <ThrowOnError extends boolean = false>(options: Options<DeleteUserData, ThrowOnError>) => {
    return (options.client ?? _heyApiClient).delete<DeleteUserResponses, unknown, ThrowOnError>({
        url: '/api/users/{id}',
        ...options
    });
};

export const getUserById = <ThrowOnError extends boolean = false>(options: Options<GetUserByIdData, ThrowOnError>) => {
    return (options.client ?? _heyApiClient).get<GetUserByIdResponses, unknown, ThrowOnError>({
        url: '/api/users/{id}',
        ...options
    });
};

export const getMenu = <ThrowOnError extends boolean = false>(options: Options<GetMenuData, ThrowOnError>) => {
    return (options.client ?? _heyApiClient).get<GetMenuResponses, unknown, ThrowOnError>({
        url: '/api/menu/{id}',
        ...options
    });
};