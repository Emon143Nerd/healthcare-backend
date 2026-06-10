import { JwtPayload, SignOptions } from "jsonwebtoken";
import { envVars } from "../config/env";
import { jwtUtils } from "./jwt";
import { Response } from "express";
import { cookieUtils } from "./cookie";

const getAccessToken = (payload: JwtPayload)=>{
    const accessToken = jwtUtils.createToken(
        payload,
         envVars.ACCESS_TOKEN_SECRET,
        {expiresIn: envVars.ACCESS_TOKEN_EXPIRES_IN} as SignOptions
    );
    return accessToken;
}

const getRefreshToken = (payload: JwtPayload)=>{
    const refreshToken = jwtUtils.createToken(
        payload,
        envVars.REFRESH_TOKEN_SECRET, 
        {expiresIn: envVars.REFRESH_TOKEN_EXPIRES_IN} as SignOptions
    );
    return refreshToken;
}

//* creating accessToken 
const setAccessTokenCookie = (res:Response, token:string)=>{
    // const maxAge = ms(envVars.ACCESS_TOKEN_EXPIRES_IN as StringValue); // Convert to milliseconds
    cookieUtils.setCookie(res, "accessToken", token, {
        httpOnly: true,
        secure: envVars.NODE_ENV === "production",
        sameSite: "none",
        path: "/",
        // 1 day in milliseconds
        maxAge: 60*60*24*1000 // Convert to milliseconds, ms had errors- so I hardcoded it to 1 day
    });
}

const setRefreshTokenCookie = (res:Response, token:string)=>{
    // const maxAge = ms(envVars.REFRESH_TOKEN_EXPIRES_IN as StringValue); // Convert to milliseconds
    cookieUtils.setCookie(res, "refreshToken", token, {
        httpOnly: true,
        secure: envVars.NODE_ENV === "production",
        sameSite: "none",
        path: "/",
        //* 7 days in milliseconds
        maxAge: 60*60*24*7*1000// Convert to milliseconds
    });
}


const setBetterAuthSessionCookie = (res:Response, token:string)=>{
    // const maxAge = ms(envVars.REFRESH_TOKEN_EXPIRES_IN as StringValue); // Convert to milliseconds
    cookieUtils.setCookie(res, "better-auth.session_token", token, {
        httpOnly: true,
        secure: envVars.NODE_ENV === "production",
        sameSite: "none",
        path: "/",
        //* 1 day in milliseconds
        maxAge: 60*60*24*1000 // Convert to milliseconds, in 1 day
    });
}
    

export const tokenUtils = {
    getAccessToken,
    getRefreshToken,
    setRefreshTokenCookie,
    setAccessTokenCookie,
    setBetterAuthSessionCookie
}