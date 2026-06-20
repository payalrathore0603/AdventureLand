import { formatDistanceToNow } from "date-fns";

export function getTimeAgo(timeStamp:string){
    return formatDistanceToNow(
        new Date(timeStamp),{
            addSuffix: true
        }
    )
}   