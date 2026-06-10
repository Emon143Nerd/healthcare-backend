import jwt, {  JwtPayload, SignOptions } from 'jsonwebtoken'; 

export const createToken = (
    jwtPayload: JwtPayload,
    secret: string,
    {expiresIn}: SignOptions
): string => {
    const token = jwt.sign(jwtPayload, secret, { expiresIn });
    return token;
};


const verifyToken =(
    token: string,
    secret: string,
)=>{
    try{
        const decoded = jwt.verify(token, secret) as JwtPayload;
        return {
            success: true,
            decoded
        }
    }catch(error: any){
        return {
            success: false,
            message: error.message
        }
    }
}

const decodeToken =(token: string)=>{
    const decoded = jwt.decode(token) as JwtPayload;
    return decoded;
}

export const jwtUtils = {
    createToken,
    verifyToken,
    decodeToken
}  