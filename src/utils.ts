import { GetingData } from "./types/types"






let user: GetingData
let ISauth = false
try {
    user = JSON.parse(`${localStorage.getItem("user")}`)
    ISauth = true
} catch {
    ISauth = false
}






export let Utils_IsAuth = ISauth




