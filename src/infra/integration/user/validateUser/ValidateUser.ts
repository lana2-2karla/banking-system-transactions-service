import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';
import { IncomingHttpHeaders } from 'http';
import IValidateResponse from './interface/IValidateResponse';
import ValidateUserDTO from './dto/output/ValidateUserDTO';

@Injectable()
class ValidateUser {
  constructor(private readonly _httpService: HttpService) {}

  validate = async (headers: IncomingHttpHeaders): Promise<ValidateUserDTO> => {
    const url = `${process.env.GLOBAL_API_URL}/microservices/validations/user`;
    const body = { token: headers.authorization };
    const config: AxiosRequestConfig = { headers: { Authorization: process.env.TOKEN } };
    try {
      const { data } = await this._httpService.axiosRef.post<IValidateResponse>(url, body, config);
      return new ValidateUserDTO(data);
    } catch {
      throw new Error();
    }
  };
}

export default ValidateUser;
