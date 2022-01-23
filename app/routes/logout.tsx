import { ActionFunction } from "remix";
import { logout } from "~/utils/session.server";

export const action:ActionFunction = async ({request})=>{
    console.log('logout action')
    return await logout(request)
}