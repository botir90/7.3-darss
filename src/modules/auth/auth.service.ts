import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Auth } from './entities/auth.entity';
import * as bcrypt from "bcrypt"
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import  nodemailer from "nodemailer"
import { VeriflyDto } from './dto/verify.dto';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
  private nodemailer:nodemailer.Transporter
  constructor(@InjectRepository(Auth)private authRepo:Repository <Auth>,
private jwtService:JwtService
){
    this.nodemailer=nodemailer.createTransport({
      service:"gmail",
      auth:{
        user:" xudoyorovd83@gmail.com",
        pass:process.env.APP_KEY
      }
    })
  }
 async register(createAuthDto: CreateAuthDto) {
  const {username,email,password}=createAuthDto
  const foundedUser =await this.authRepo.findOne({where:{email}})
  
if (foundedUser)throw new BadRequestException("user already exists")

  const hashPassword =await bcrypt.hash(createAuthDto.password,10)

  const otp =Array.from ({length:6},()=>Math.floor(Math.random()*9)).join("")

  const time=Date.now()+120000

  await this.nodemailer.sendMail({
    from:"xudoyorovd83@gmail.com",
    to:email,
    subject:"dars",
    text:"test content ",
    html:`<b>${otp}</b>`
  })

  const user=  this.authRepo.create({username,email,password:hashPassword,otp,otpTime:time});

   await this.authRepo.save(user)

   return{message:"registred"}
  }

  async verify(dto:VeriflyDto){
   const {email,otp}=dto
   const foundedUser=await this.authRepo.findOne({where:{email}})

   const otpValidation=/^\d{6}$/.test(otp)

   if(!otpValidation) throw new BadRequestException("invaled otp")

   if(!foundedUser) throw new UnauthorizedException("email not found")

   if(!foundedUser) throw new BadRequestException("wrong otp")

    const now=Date.now()
    if(foundedUser.otpTime && foundedUser.otpTime < now) throw new BadRequestException("otp expired")

    await this.authRepo.update(foundedUser.id,{otp:"",otpTime:0})
    
    const payload={username:foundedUser.username, role:foundedUser.role};
    return{
      access_token:await this.jwtService.signAsync(payload)
    }
  }

}
