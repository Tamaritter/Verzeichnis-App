"use server";
import {cookies} from "next/headers";

export async function createCookie<T>(name: string, data: T) {
    const cookieStore = await cookies();

    cookieStore.set(name, JSON.stringify(data), {secure: true, sameSite: 'strict'});
}

export async function readCookie<T>(name: string): Promise<T | null> {
    const cookieStore = await cookies();
    const cookie = cookieStore.get(name);

    if (cookie) {
        return JSON.parse(cookie.value);
    }

    return null;
}
