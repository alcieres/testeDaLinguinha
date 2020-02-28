const { check } = require('express-validator');

exports.validate = (method) => {
  switch (method) {
    case 'assessment': {
      return  [
        check('name', 'Os dados do campo "Nome" são inválidos.')
            .exists().withMessage('O campo "Nome" é obrigatório.')
            .not().isEmpty().withMessage('O campo "Nome" não pode estar vazio.')
            .isLength({min: 3, max: 100}).withMessage('O campo "Nome" pode ter entre 3 e 100 caracteres.')
            //.escape()
            .trim()
            .customSanitizer(
                (value) => {
                  value = value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase();
                  return value;
                }
            ),
        check('birthDate', 'A data de nascimento é inválida.')
            .isISO8601({strict: true}),
        check('assessments[0].assessmentDate', 'A data do teste é inválida.')
            .isISO8601({strict: true}),
        check('genre', 'O campo "Gênero" é inválido.')
            .exists().withMessage('O campo "Gênero" é obrigatório.')
            .isInt({min: 1, max: 2}),
        check('motherName', 'Os dados do campo "Nome da Mãe" são inválidos.')
            .exists().withMessage('O campo "Nome da Mãe" é obrigatório.')
            .not().isEmpty().withMessage('O campo "Nome da Mãe" é obrigatório.')
            .isLength({min: 3, max: 100}).withMessage('O campo "Nome da Mãe" pode ter entre 3 e 100 caracteres.')
            //.escape()
            .trim()
            .customSanitizer(
                (value) => {
                  value = value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase();
                  return value;
                }
            ),
        check('motherCPF', 'Os dados do campo "CPF da Mãe" são inválidos.')
            .optional({checkFalsy: true})
            .exists().withMessage('O campo "CPF da Mãe" deve ser enviado.')
            .isLength({min: 14, max: 14}).withMessage('O campo "CPF da Mãe" deve ter 14 dígitos.')
            .blacklist('.-')
            .isInt()
            .custom(
                (value) => {
                  let sum = 0;
                  let rest;
                  if (value.length !== 11 ||
                      value === "00000000000" ||
                      value === "11111111111" ||
                      value === "22222222222" ||
                      value === "33333333333" ||
                      value === "44444444444" ||
                      value === "55555555555" ||
                      value === "66666666666" ||
                      value === "77777777777" ||
                      value === "88888888888" ||
                      value === "99999999999") {
                    throw new Error('O CPF informado é inválido.');
                  }
                  for (let i = 1; i <= 9; i++) {
                    sum += parseInt(value.substring(i - 1, i)) * (11 - i);
                  }
                  rest = (sum * 10) % 11;
                  if ((rest === 10) || (rest === 11)) {
                    rest = 0;
                  }
                  if (rest !== parseInt(value.substring(9, 10))) {
                    throw new Error('O CPF informado é inválido.');
                  }
                  sum = 0;
                  for (let i = 1; i <= 10; i++) {
                    sum += parseInt(value.substring(i - 1, i)) * (12 - i);
                  }
                  rest = (sum * 10) % 11;
                  if ((rest === 10) || (rest === 11)) {
                    rest = 0;
                  }
                  if (rest !== parseInt(value.substring(10, 11))) {
                    throw new Error('O CPF informado é inválido.');
                  }
                  return value;
                })
            //.escape()
            .trim(),
        check('fatherName', 'Os dados do campo "Nome do Pai" são inválidos')
            .optional({ checkFalsy: true })
            .exists().withMessage('O campo "Nome do Pai" deve ser enviado')
            .isLength({min: 3, max: 100}).withMessage('O campo "Nome do Pai" pode ter entre 3 e 100 caracteres')
            //.escape()
            .trim()
            .customSanitizer(
                (value) => {
                  value = value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase();
                  return value;
                }
            ),
        check('address', 'Os dados do campo "Endereço" são inválidos')
            .exists().withMessage('O campo "Endereço" é obrigatório')
            .not().isEmpty().withMessage('O campo "Endereço" é obrigatório')
            .isLength({min: 3, max: 100}).withMessage('O campo "Endereço" pode ter entre 3 e 100 caracteres')
            //.escape()
            .trim()
            .customSanitizer(
                (value) => {
                  value = value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase();
                  return value;
                }
            ),
        check('residenceNumber', 'Os dados do campo "Número" são inválidos')
            .exists().withMessage('O campo "Número" é obrigatório')
            .not().isEmpty().withMessage('O campo "Número" é obrigatório')
            .isLength({min: 1, max: 15}).withMessage('O campo "Número" pode ter entre 1 e 15 caracteres')
            //.escape()
            .trim()
            .customSanitizer(
                (value) => {
                  value = value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase();
                  return value;
                }
            ),
        check('neighborhood', 'Os dados do campo "Bairro" são inválidos')
            .exists().withMessage('O campo "Bairro" é obrigatório')
            .not().isEmpty().withMessage('O campo "Bairro" é obrigatório')
            .isLength({min: 3, max: 100}).withMessage('O campo "Bairro" pode ter entre 1 e 15 caracteres')
            //.escape()
            .trim()
            .customSanitizer(
                (value) => {
                  value = value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase();
                  return value;
                }
            ),
        check('state', 'Os dados do campo "Estado" são inválidos')
            .exists().withMessage('O campo "Estado" é obrigatório')
            .not().isEmpty().withMessage('O campo "Estado" é obrigatório')
            .isLength({min: 2, max: 2}).withMessage('O campo "Estado" pode ter entre 1 e 15 caracteres')
            //.escape()
            .trim()
            .customSanitizer(
                (value) => {
                  value = value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase();
                  return value;
                }
            ),
        check('city', 'Os dados do campo "Cidade" são inválidos')
            .exists().withMessage('O campo "Cidade" é obrigatório')
            .not().isEmpty().withMessage('O campo "Cidade" é obrigatório')
            .isLength({min: 1, max: 100}).withMessage('O campo "Cidade" pode ter entre 1 e 100 caracteres')
            //.escape()
            .trim()
            .customSanitizer(
                (value) => {
                  value = value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase();
                  return value;
                }
            ),
        check('cep', 'Os dados do campo "CEP" são inválidos.')
            .optional({checkFalsy: true})
            .exists().withMessage('O campo "CEP" é obrigatório.')
            .not().isEmpty().withMessage('O campo "CEP" é obrigatório.')
            .blacklist('-')
            .custom(
                (value) => {
                  if (/^\d{2}.\d{3}-\d{3}?$|^\d{5}-?\d{3}?$/.test(value)) {
                    return value;
                  } else {
                    throw new Error('Os dados do campo "CEP" são inválidos.');
                  }
                }
            )
            //.escape()
            .trim(),
        check('email', 'Os dados do campo "E-mail" são inválidos')
            .optional({ checkFalsy: true })
            .isEmail().withMessage('O campo "E-mail" é inválido')
            .normalizeEmail()
            .customSanitizer(
                (value) => {
                  return value === '@' ? '' : value;
                }
            ),
        check('resTel', 'Os dados do campo "Telefone Residencial" são inválidos')
            .optional({checkFalsy: true})
            .blacklist('()-\\s')
            .trim()
            .isLength({min: 10, max: 11}).withMessage('O campo "Telefone Residencial" deve ter entre 10 e 11 dígitos')
            .isInt(),
        check('commercialTel', 'Os dados do campo "Telefone Comercial" são inválidos')
            .optional({checkFalsy: true})
            .blacklist('()-\\s')
            .trim()
            .isLength({min: 10, max: 11}).withMessage('O campo "Telefone Comercial" deve ter entre 10 e 11 dígitos')
            .isInt(),
        //.escape(),
        check('celPhone', 'Os dados do campo "Telefone Celular" são inválidos')
            .optional({checkFalsy: true})
            .blacklist('()-\\s')
            .trim()
            .isLength({min: 11, max: 11}).withMessage('O campo "Telefone Celular" deve ter 11 dígitos')
            .isInt().withMessage('O campo "Telefone Celular" deve ser composto somente por números'),
        //.escape(),
        check('familyHistory', 'Os dados do campo "Antecedentes Familiares" são inválidos')
            .isIn(['1', '2', undefined]),
        check('problemDescription', 'Os dados do campo "Quem e qual o problema" são inválidos')
            .trim()
            .isLength({min: 0, max: 1000}).withMessage('O campo "Quem e qual o problema" pode ter no máximo 1000 caracteres'),
        //.escape(),
        check('patientHealthProblem', 'Os dados do campo "Problemas de Saúde" são inválidos')
            .isIn(['1', '2', undefined]),
        check('healthProblemDescription', 'Os dados do campo "Quem e qual o problema" são inválidos')
            .trim()
            .isLength({min: 0, max: 1000}).withMessage('O campo "Quem e qual o problema" pode ter no máximo 1000 caracteres'),
        //.escape(),
        check('assessments[0].breastfeeding', 'Os dados do campo "Mama no Peito?" são inválidos')
            .isIn(['1', '2', '3', undefined]),
        check('assessments[0].breastfeedingTime', 'Os dados do campo "Tempo entre as mamadas" são inválidos')
            .isIn(['1', '2', undefined]),
        check('assessments[0].breastfeedingTiredness', 'Os dados do campo "Cansaço para mamar?" são inválidos')
            .isIn(['1', '2', undefined]),
        check('assessments[0].breastfeedingSleep', 'Os dados do campo "Mama um pouquinho e dorme?" são inválidos')
            .isIn(['1', '2', undefined]),
        check('assessments[0].releasingNipple', 'Os dados do campo "Vai soltando o mamilo?" são inválidos')
            .isIn(['1', '2', undefined]),
        check('assessments[0].biteNipple', 'Os dados do campo "Morde o mamilo?" são inválidos')
            .isIn(['1', '2', undefined]),
        check('assessments[0].obsBreastfeeding', 'Os dados do campo "Observações" da pergunta "Mama no Peito?" são inválidos')
            .trim()
            .isLength({max: 1000}).withMessage('pode ter no máximo 1000 caracteres'),
        //.escape(),

        //Pontuação da História Clínica
        check('assessments[0].clinicalHistoryPoints', 'A pontuação da "História Clínica" é inválida')
            .isNumeric(),

        check('assessments[0].questionOne', 'Os dados da questão "1. Postura dos lábios em repouso" são inválidos')
            .isIn(['1', '2', '3', undefined]),
        check('assessments[0].questionTwo', 'Os dados da questão "2. Tendência do posicionamento da língua durante o choro" são inválidos')
            .isIn(['1', '2', '3', '4', undefined]),
        check('assessments[0].questionThree', 'Os dados da questão "3. Forma da ponta da língua quando elevada durante o choro" são inválidos')
            .isIn(['1', '2', '3', undefined]),

        //Pontuação das Questões de Um a Três
        check('assessments[0].questionsOneToThreePoints', 'A pontuação das questões 1 a 3 é inválida')
            .isNumeric(),

        check('assessments[0].questionFour', 'Os dados da questão "4. Frênulo da língua" são inválidos')
            .isIn(['1', '2', '3', undefined]),
        check('assessments[0].questionFourOne', 'Os dados da questão "4.1. Espessura do frênulo" são inválidos')
            .isIn(['1', '2', undefined]),
        check('assessments[0].questionFourTwo', 'Os dados da questão "4.2. Fixação do frênulo na face sublingual (ventral) da língua" são inválidos')
            .isIn(['1', '2', '3', undefined]),
        check('assessments[0].questionFourThree', 'Os dados da questão "4.3. Fixação do frênulo no assoalho da boca" são inválidos')
            .isIn(['1', '2', undefined]),
        check('assessments[0].questionFourComments', 'Os dados do campo "Observações" da "Parte I" são inválidos')
            .trim()
            .isLength({max: 1000}).withMessage('O campo "Observações" da "Parte I" pode ter no máximo 1000 caracteres'),
        //.escape(),

        //Inserir Pontuação da Questão 4
        check('assessments[0].questionFourPoints', 'A pontuação da questão 4 é inválida')
            .isNumeric(),

        //Inserir Pontuação da Parte I
        check('assessments[0].questionsOneToFourPoints', 'A pontuação das questões 1 a 4 é inválida')
            .isNumeric(),

        check('assessments[0].partTwoQuestionOne', 'Os dados da questão "1.1 Movimento da língua" são inválidos')
            .isIn(['1', '2', undefined]),
        check('assessments[0].partTwoQuestionTwoOne', 'Os dados da questão "2.1 Ritmo da sucção" são inválidos')
            .isIn(['1', '2', undefined]),
        check('assessments[0].partTwoQuestionTwoTwo', 'Os dados da questão "2.2 Coordenação entre sucção/deglutição/respiração" são inválidos')
            .isIn(['1', '2', undefined]),
        check('assessments[0].partTwoQuestionTwoThree', 'Os dados da questão "2.3 "Morde" o mamilo" são inválidos')
            .isIn(['1', '2', undefined]),
        check('assessments[0].partTwoQuestionTwoFour', 'Os dados da questão "2.4 Estalos de língua durante a sucção" são inválidos')
            .isIn(['1', '2', undefined]),
        check('assessments[0].obsSuction', 'Os dados do campo "Observações" da "Parte II" são inválidos')
            .trim()
            .isLength({min: 0, max: 1000}).withMessage('O campo "Observações" da "Parte II" pode ter no máximo 1000 caracteres'),
        //.escape(),

        //Inserir Pontuação da Parte II
        check('assessments[0].partTwoQuestionPoints', 'A pontuação da "Parte II" é inválida')
            .isNumeric(),

        //Inserir Pontos Totais Exame Clínico
        check('assessments[0].clinicalAssessmentPoints', 'A pontuação do "Exame Clínico" é inválida')
            .isNumeric(),

        //Inserir Pontos Totais do Exame
        check('assessments[0].historyAssessmentPoints', 'A pontuação total do exame é inválida')
            .isNumeric(),

        check('assessments[0].obsResume', 'Os dados do campo "Observações" do "Resumo Final" são inválidos')
            .trim()
            .isLength({max: 1000}).withMessage('O campo "Observações" do "Resumo Final" pode ter no máximo 1000 caracteres'),
        //.escape(),
        check('assessments[0].assBehavior', 'Os dados da questão "CONDUTA" no Resumo Final são inválidos')
            .isIn(['1', '2', '3', undefined]),
        check('assessments[0].descBehavior', 'Os dados do campo "Observações" do "Resumo Final" são inválidos')
            .trim()
            .isLength({max: 100}).withMessage('O campo "Descrição da conduta" do "Resumo Final" pode ter no máximo 100 caracteres')
        //.escape()
      ]
    }
    case 'patient': {
      return [
        check('inputName', 'Os dados do campo "Nome" são inválidos.')
            .exists().withMessage('O campo "Nome" é obrigatório.')
            .not().isEmpty().withMessage('O campo "Nome" não pode estar vazio.')
            .isLength({min: 3, max: 100}).withMessage('O campo "Nome" pode ter entre 3 e 100 caracteres.')
            //.escape()
            .trim()
            .customSanitizer(
                (value) => {
                  value = value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase();
                  return value;
                }
            ),
        check('inputBirthDate', 'A data de nascimento é inválida.')
            .isISO8601({strict: true}),
        check('rbGenre', 'O campo "Gênero" é inválido.')
            .exists().withMessage('O campo "Gênero" é obrigatório.')
            .isInt({min: 1, max: 2}),
        check('inputMotherName', 'Os dados do campo "Nome da Mãe" são inválidos.')
            .exists().withMessage('O campo "Nome da Mãe" é obrigatório.')
            .not().isEmpty().withMessage('O campo "Nome da Mãe" é obrigatório.')
            .isLength({min: 3, max: 100}).withMessage('O campo "Nome da Mãe" pode ter entre 3 e 100 caracteres.')
            //.escape()
            .trim()
            .customSanitizer(
                (value) => {
                  value = value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase();
                  return value;
                }
            ),
        check('inputMotherCPF', 'Os dados do campo "CPF da Mãe" são inválidos.')
            .optional({checkFalsy: true})
            .exists().withMessage('O campo "CPF da Mãe" deve ser enviado.')
            .isLength({min: 14, max: 14}).withMessage('O campo "CPF da Mãe" deve ter 14 dígitos.')
            .blacklist('.-')
            .isInt()
            .custom(
                (value) => {
                  let sum = 0;
                  let rest;
                  if (value.length !== 11 ||
                      value === "00000000000" ||
                      value === "11111111111" ||
                      value === "22222222222" ||
                      value === "33333333333" ||
                      value === "44444444444" ||
                      value === "55555555555" ||
                      value === "66666666666" ||
                      value === "77777777777" ||
                      value === "88888888888" ||
                      value === "99999999999") {
                    throw new Error('O CPF informado é inválido.');
                  }
                  for (let i = 1; i <= 9; i++) {
                    sum += parseInt(value.substring(i - 1, i)) * (11 - i);
                  }
                  rest = (sum * 10) % 11;
                  if ((rest === 10) || (rest === 11)) {
                    rest = 0;
                  }
                  if (rest !== parseInt(value.substring(9, 10))) {
                    throw new Error('O CPF informado é inválido.');
                  }
                  sum = 0;
                  for (let i = 1; i <= 10; i++) {
                    sum += parseInt(value.substring(i - 1, i)) * (12 - i);
                  }
                  rest = (sum * 10) % 11;
                  if ((rest === 10) || (rest === 11)) {
                    rest = 0;
                  }
                  if (rest !== parseInt(value.substring(10, 11))) {
                    throw new Error('O CPF informado é inválido.');
                  }
                  return value;
                })
            //.escape()
            .trim(),
        check('inputFatherName', 'Os dados do campo "Nome do Pai" são inválidos')
            .optional({ checkFalsy: true })
            .exists().withMessage('O campo "Nome do Pai" deve ser enviado')
            .isLength({min: 3, max: 100}).withMessage('O campo "Nome do Pai" pode ter entre 3 e 100 caracteres')
            //.escape()
            .trim()
            .customSanitizer(
                (value) => {
                  value = value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase();
                  return value;
                }
            ),
        check('inputAddress', 'Os dados do campo "Endereço" são inválidos')
            .exists().withMessage('O campo "Endereço" é obrigatório')
            .not().isEmpty().withMessage('O campo "Endereço" é obrigatório')
            .isLength({min: 3, max: 100}).withMessage('O campo "Endereço" pode ter entre 3 e 100 caracteres')
            //.escape()
            .trim()
            .customSanitizer(
                (value) => {
                  value = value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase();
                  return value;
                }
            ),
        check('inputResidenceNumber', 'Os dados do campo "Número" são inválidos')
            .exists().withMessage('O campo "Número" é obrigatório')
            .not().isEmpty().withMessage('O campo "Número" é obrigatório')
            .isLength({min: 1, max: 15}).withMessage('O campo "Número" pode ter entre 1 e 15 caracteres')
            //.escape()
            .trim()
            .customSanitizer(
                (value) => {
                  value = value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase();
                  return value;
                }
            ),
        check('inputNeighborhood', 'Os dados do campo "Bairro" são inválidos')
            .exists().withMessage('O campo "Bairro" é obrigatório')
            .not().isEmpty().withMessage('O campo "Bairro" é obrigatório')
            .isLength({min: 3, max: 100}).withMessage('O campo "Bairro" pode ter entre 1 e 15 caracteres')
            //.escape()
            .trim()
            .customSanitizer(
                (value) => {
                  value = value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase();
                  return value;
                }
            ),
        check('inputState', 'Os dados do campo "Estado" são inválidos')
            .exists().withMessage('O campo "Estado" é obrigatório')
            .not().isEmpty().withMessage('O campo "Estado" é obrigatório')
            .isLength({min: 2, max: 2}).withMessage('O campo "Estado" pode ter entre 1 e 15 caracteres')
            //.escape()
            .trim()
            .customSanitizer(
                (value) => {
                  value = value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase();
                  return value;
                }
            ),
        check('inputCity', 'Os dados do campo "Cidade" são inválidos')
            .exists().withMessage('O campo "Cidade" é obrigatório')
            .not().isEmpty().withMessage('O campo "Cidade" é obrigatório')
            .isLength({min: 1, max: 100}).withMessage('O campo "Cidade" pode ter entre 1 e 100 caracteres')
            //.escape()
            .trim()
            .customSanitizer(
                (value) => {
                  value = value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase();
                  return value;
                }
            ),
        check('inputCEP', 'Os dados do campo "CEP" são inválidos.')
            .optional({checkFalsy: true})
            .exists().withMessage('O campo "CEP" é obrigatório.')
            .not().isEmpty().withMessage('O campo "CEP" é obrigatório.')
            .blacklist('-')
            .custom(
                (value) => {
                  if (/^\d{2}.\d{3}-\d{3}?$|^\d{5}-?\d{3}?$/.test(value)) {
                    return value;
                  } else {
                    throw new Error('Os dados do campo "CEP" são inválidos.');
                  }
                }
            )
            //.escape()
            .trim(),
        check('inputEmail', 'Os dados do campo "E-mail" são inválidos')
            .optional({ checkFalsy: true })
            .isEmail().withMessage('O campo "E-mail" é inválido')
            .normalizeEmail()
            .customSanitizer(
                (value) => {
                  return value === '@' ? '' : value;
                }
            ),
        check('inputResTel', 'Os dados do campo "Telefone Residencial" são inválidos')
            .optional({checkFalsy: true})
            .blacklist('()-\\s')
            .trim()
            .isLength({min: 10, max: 11}).withMessage('O campo "Telefone Residencial" deve ter entre 10 e 11 dígitos')
            .isInt(),
        check('inputCommercialTel', 'Os dados do campo "Telefone Comercial" são inválidos')
            .optional({checkFalsy: true})
            .blacklist('()-\\s')
            .trim()
            .isLength({min: 10, max: 11}).withMessage('O campo "Telefone Comercial" deve ter entre 10 e 11 dígitos')
            .isInt(),
        //.escape(),
        check('inputCelPhone', 'Os dados do campo "Telefone Celular" são inválidos')
            .optional({checkFalsy: true})
            .blacklist('()-\\s')
            .trim()
            .isLength({min: 11, max: 11}).withMessage('O campo "Telefone Celular" deve ter 11 dígitos')
            .isInt().withMessage('O campo "Telefone Celular" deve ser composto somente por números'),
        //.escape()
      ]
    }
  }
};