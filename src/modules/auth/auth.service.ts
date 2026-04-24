import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Auth } from './entities/auth.entity';
import * as bcrypt from "bcrypt"
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import nodemailer from "nodemailer"
import { VeriflyDto } from './dto/verify.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';


@Injectable()
export class AuthService {
  private nodemailer: nodemailer.Transporter
  constructor(
    @InjectRepository(Auth) private authRepo: Repository<Auth>,
    private jwtService: JwtService
  ) {
    this.nodemailer = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "qodirberganovbotir@gmail.com",  // ✅ to'g'rilandi
        pass: process.env.APP_KEY
      }
    })
  }

  async register(createAuthDto: CreateAuthDto) {
    const { username, email, password } = createAuthDto
    const foundedUser = await this.authRepo.findOne({ where: { email } })

    if (foundedUser) throw new BadRequestException("user already exists")

    const hashPassword = await bcrypt.hash(password, 10)

    const otp = Array.from({ length: 6 }, () => Math.floor(Math.random() * 9)).join("")

    const time = Date.now() + 120000

    await this.nodemailer.sendMail({
      from: "qodirberganovbotir@gmail.com",  // ✅ to'g'rilandi
      to: email,
      subject: "Tasdiqlash kodi",
      html: `<b>Sizning kodingiz: ${otp}</b>`
    })

    const user = this.authRepo.create({ username, email, password: hashPassword, otp, otpTime: time });
    await this.authRepo.save(user)

    return { message: "registred" }
  }

  async verify(dto: VeriflyDto) {
    const { email, otp } = dto
    const foundedUser = await this.authRepo.findOne({ where: { email } })

    const otpValidation = /^\d{6}$/.test(otp)
    if (!otpValidation) throw new BadRequestException("invalid otp")

    if (!foundedUser) throw new UnauthorizedException("email not found")

    if (foundedUser.otp !== otp) throw new BadRequestException("wrong otp")  // ✅ to'g'rilandi

    const now = Date.now()
    if (foundedUser.otpTime && foundedUser.otpTime < now) throw new BadRequestException("otp expired")

    await this.authRepo.update(foundedUser.id, { otp: "", otpTime: 0 })

    const payload = { id :foundedUser.id , username: foundedUser.username, role: foundedUser.role };
    return {
      access_token: await this.jwtService.signAsync(payload)
    }
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto
    const foundedUser = await this.authRepo.findOne({ where: { email } })

    if (!foundedUser) throw new BadRequestException("user not found")

    const checkPassword = await bcrypt.compare(password, foundedUser.password)

    if (checkPassword) {
      const otp = Array.from({ length: 6 }, () => Math.floor(Math.random() * 9)).join("")

      const time = Date.now() + 120000

      await this.nodemailer.sendMail({
        from: "qodirberganovbotir@gmail.com",  
        to: email,
        subject: "Tasdiqlash kodi",
        html: `<b>Sizning kodingiz: ${otp}</b>`
      })

      await this.authRepo.update(foundedUser.id, { otp, otpTime: time })
      return { message: "please check your email" }
    } else {
      throw new BadRequestException("wrong password")
    }
  }
}