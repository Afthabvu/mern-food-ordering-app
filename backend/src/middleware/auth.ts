import { NextFunction, Request, Response } from "express";
import { auth } from "express-oauth2-jwt-bearer";
import jwt from 'jsonwebtoken';
import User from "../models/user";

declare global{
  namespace Express{
    interface Request{
      userId:string,
      auth0Id:string
    }
  }
}

export const jwtCheck = auth({
    audience: process.env.Auth0_AUDIENCE,
    issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
    tokenSigningAlg: 'RS256'
  });

  export const jwtParse=async(req:Request,res:Response,next:NextFunction)=>{
    // console.log("hello iam parse")
    // console.log(req.body)
    // console.log(req.headers)
    const {authorization}= req.headers;
    // console.log(authorization)
    if(!authorization || !authorization.startsWith("Bearer ")){
      // console.log("entered error")
      return res.sendStatus(401);
    }
    const token = authorization.split(" ")[1];
    // console.log(token)

    try {
      const decoded=jwt.decode(token) as jwt.JwtPayload;
      const auth0Id=decoded.sub;
      const user=await User.findOne({auth0Id})
      if(!user){
        return res.sendStatus(401);
      }
      req.auth0Id=auth0Id  as string;
      req.userId=user._id.toString();
      next()
      
    } catch (error) {
      return res.sendStatus(401)
      
    }

  }