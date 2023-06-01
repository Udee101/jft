import * as dotenv from "dotenv"
import { Request, Response, NextFunction } from "express"
import * as jwt from "jsonwebtoken"

dotenv.config({ path: ".env" });

export const authenticateToken = (req:Request, res:Response, next:NextFunction) => {
  const authHeader = req.headers.authorization

  if (authHeader) {
    const token = authHeader.split(" ")[1]
    jwt.verify(token, process.env.JWT_SECRET, (err: any, data: any) => {
      if (err) {
        return res.status(401).json({
          message: "Unauthorized"
        })
      }
      data
      next()
    })
  }else {
    return res.sendStatus(401)
  }
}
