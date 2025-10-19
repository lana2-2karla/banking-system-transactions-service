interface IValidateResponse {
  user: {
    id: string,
    name: string,
    cpf: string,
    email: string | null,
    telephone: string | null,
  },
  company: {
    id: number,
    name: string,
    corporateName: string,
    cnpj: string,
    nickname: string | null,
    active: number,
    type: number,
    status: number,
    createdAt: string,
    disabledAt: string | null,
    code: string,
    contract: string | null,
    externalLink: string | null,
    externalLinkName: string | null,
    segmentId: number | null,
    positionCPF: string,
    stateId: number | null,
    cityId: number | null,
    motherCompany: number | null,
    courtesy: boolean,
    physicalCard: number | null,
  }
}

export default IValidateResponse;