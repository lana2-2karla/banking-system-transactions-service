const matchAnyType =
  /(?<!:)(?::package: build|:wrench: chore|:bricks: ci|:books: docs|:sparkles: feat|:bug: fix|:zap: perf|:recycle: refactor|:boom: revert|:ok_hand: style|:test_tube: test|:card_file_box: raw|:tada: init|:wastebasket: remove|build|chore|ci|docs|feat|fix|perf|refactor|revert|style|test|raw|init|remove)\b(?!_)/;
const matchOptionalTicketNumberWithSpaceAfter = /(?:\((T-\d+)\)\s)?/;
const subjectThatDontStartWithParenthesis = /([^\()].+)/;

module.exports = {
  parserPreset: {
    parserOpts: {
      headerPattern: new RegExp(
        '^' +
          matchAnyType.source +
          matchOptionalTicketNumberWithSpaceAfter.source +
          subjectThatDontStartWithParenthesis.source +
          '$',
      ),
      headerCorrespondence: ['type', 'ticket', 'subject'],
    },
  },
  plugins: [
    {
      rules: {
        'allowed-types-rule': (parsed, _when, allowedTypes) => {
          const { type, ticket, subject } = parsed;
          if (type === null && ticket === null && subject === null) {
            return [
              false,
              `The header must be in one of the following formats: 
                    'build: add new dependency'
                    'build (ticket): add new dependency'
                    ':package: build: add new dependency'
                    ':package: build (ticket): add new dependency'

Allowed types listed below:

${allowedTypes.map((t) => `${t}`).join('\n')}`,
            ];
          }
          return [true, ''];
        },
      },
    },
  ],
  rules: {
    'allowed-types-rule': [
      2,
      'always',
      [
        'build',
        ':package: build',
        'chore',
        ':wrench: chore',
        'ci',
        ':bricks: ci',
        'docs',
        ':books: docs',
        'feat',
        ':sparkles: feat',
        'fix',
        ':bug: fix',
        'perf',
        ':zap: perf',
        'refactor',
        ':recycle: refactor',
        'revert',
        ':boom: revert',
        'style',
        ':ok_hand: style',
        'test',
        ':test_tube: test',
        'raw',
        ':card_file_box: raw',
        'tada',
        ':tada: init',
        ':wastebasket:',
        ':wastebasket: remove'
      ],
    ],
  },
};
