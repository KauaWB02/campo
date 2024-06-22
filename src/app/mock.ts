export const moock = {
  id: 1,
  name: 'Questão 1.0',
  customFieldType: 'CheckBox',
  description: 'Primeira Questão',
  value: [], // Vai ja vir selecionar bote o id da alternativa abaixo exemplo:  [2]
  alternatives: [
    {
      id: 2,
      name: 'opção 1.1',
      isSelected: true,
      subQuestion: [
        {
          id: 3,
          name: 'Sub Questão 2.0',
          description: 'Segunda Questão',
          customFieldType: 'CheckBox',
          value: [],
          alternatives: [
            {
              id: 4,
              name: 'opção 2.1',
              isSelected: false,
              subQuestion: [
                {
                  id: 5,
                  name: 'Sub Questão 3.0',
                  customFieldType: 'CheckBox',
                  value: [],
                  alternatives: [
                    {
                      id: 6,
                      name: 'opção 3.1',
                      isSelected: false,
                      description: 'Só uma opção',
                    },
                    {
                      id: 7,
                      name: 'opção 3.2',
                      isSelected: false,
                      description: 'Só uma opção',
                    },
                    {
                      id: 8,
                      name: 'opção 3.3',
                      isSelected: false,
                      description: 'Só uma opção',
                    },
                    {
                      id: 9,
                      name: 'opção 3.4',
                      isSelected: false,
                      description: 'Só uma opção',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 10,
      name: 'opção 1.2',
      description: 'Só uma opção',
    },
  ],
};
