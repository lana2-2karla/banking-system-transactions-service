import IValidateResponse from '../../interface/IValidateResponse';

class ValidateUserDTO {
  id: string;
  name: string;
  cpf: string;
  companyId: number;
  constructor(userValidate: IValidateResponse) {
    this.id = userValidate.user.id;
    this.name = userValidate.user.name;
    this.cpf = userValidate.user.cpf;
    this.companyId = userValidate.company.id;
  }
}

export default ValidateUserDTO;
