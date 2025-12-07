import { error } from "console"
import { randomInt } from "crypto";


export const otpGenrator = (length:number): string => {
    if (length <= 0) {
        throw new Error("Otp length must be > 0 ")

    } 

    const minimum = 10 ** (length - 1);
    console.log("minimum",minimum);
    const maximum = 10 ** length - 1;
    console.log("maximum",maximum);
    const otp = randomInt(minimum, maximum+1);
    return String(otp).padStart(length, "0");
}
