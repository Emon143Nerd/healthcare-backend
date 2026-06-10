import { Request, Response } from "express";
import { authService } from "./auth.service";
import catchAsync from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import { tokenUtils } from "../../utils/token";
import { AppError } from "../../errors/AppErrors";
import status from "http-status";


const registerPatient = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body;
    const result = await authService.registerPatient(payload);

    const { accessToken, refreshToken, token, ...rest } = result;

    tokenUtils.setAccessTokenCookie(res, accessToken);
    tokenUtils.setRefreshTokenCookie(res, refreshToken);
    tokenUtils.setBetterAuthSessionCookie(res, token as string);

    sendResponse(res, {
        httpStatusCode: 200,
        success: true,
        message: "Patient registered successfully",
        data: {
            token,
            accessToken,
            refreshToken,
            ...rest,
        },
    });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body;
    const result = await authService.loginUser(payload);

    const { accessToken, refreshToken, token, ...rest } = result;

    // setting up tokens in cookies
    tokenUtils.setAccessTokenCookie(res, accessToken);
    tokenUtils.setRefreshTokenCookie(res, refreshToken);
    tokenUtils.setBetterAuthSessionCookie(res, token);

    sendResponse(res, {
        httpStatusCode: 200,
        success: true,
        message: "User logged in successfully",
        data: {
            token,
            accessToken,
            refreshToken,
            ...rest,
        },
    });
});

const getMe = catchAsync(async (req: Request, res: Response) => {
    const user = req.user;
    const result = await authService.getMe(user);
    sendResponse(res, {
        httpStatusCode: 200,
        success: true,
        message: "User fetched successfully",
        data: result,
    });
});

const getNewToken = catchAsync(
    async (req: Request, res: Response) => {
        const refreshToken = req.cookies.refreshToken;
        const betterAuthSessionToken = req.cookies["better-auth.session_token"];
        if (!refreshToken) {
            throw new AppError(status.UNAUTHORIZED, "Refresh token is missing");
        }
        const result = await authService.getNewToken(refreshToken, betterAuthSessionToken);

        const { accessToken, refreshToken: newRefreshToken, sessionToken } = result;

        tokenUtils.setAccessTokenCookie(res, accessToken);
        tokenUtils.setRefreshTokenCookie(res, newRefreshToken);
        tokenUtils.setBetterAuthSessionCookie(res, sessionToken);

        sendResponse(res, {
            httpStatusCode: status.OK,
            success: true,
            message: "New tokens generated successfully",
            data: {
                accessToken,
                refreshToken: newRefreshToken,
                sessionToken,
            },
        });
    }
)
export const authController = {
    registerPatient,
    loginUser,
    getMe,
    getNewToken, 
};