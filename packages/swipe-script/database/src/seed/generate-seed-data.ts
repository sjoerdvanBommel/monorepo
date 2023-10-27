import type { Answer, Question, QuestionType } from '../client'

interface Situation {
  label: string
  difficulty_level: number
}

const situations: Situation[] = [
  { label: 'true', difficulty_level: 1 },
  { label: 'false', difficulty_level: 1 },
  { label: '0', difficulty_level: 2 },
  { label: "''", difficulty_level: 3 },
  { label: 'null', difficulty_level: 2 },
  { label: 'undefined', difficulty_level: 2 },
  { label: 'NaN', difficulty_level: 4 },
  { label: 'Infinity', difficulty_level: 4 },
  { label: '[]', difficulty_level: 3 },
  { label: '{}', difficulty_level: 3 },
  { label: 'Symbol()', difficulty_level: 4 },
  { label: "Symbol('foo')", difficulty_level: 4 },
]

const TRUTHY_OR_FALSY_QT_ID = 1

export const questionTypes: readonly QuestionType[] = [
  {
    id: TRUTHY_OR_FALSY_QT_ID,
    type_name: 'Truthy or Falsy?',
  },
] as const

export const generateFunSeedData = () => {
  const questions: Omit<Question, 'answers'>[] = []
  const answers: Answer[] = []
  let currentQuestionId = 0
  let currentAnswerId = 0

  function generateQuestion(question: string, difficultyLevel: number) {
    try {
      answers.push(
        {
          id: currentAnswerId++,
          is_correct: !!(0, eval)(`(${question})`),
          answer_text: 'Truthy',
          question_id: currentQuestionId,
        },
        {
          id: currentAnswerId++,
          is_correct: !(0, eval)(`(${question})`),
          answer_text: 'Falsy',
          question_id: currentQuestionId,
        },
      )

      questions.push({
        id: currentQuestionId++,
        question_text: question,
        difficulty_level: difficultyLevel,
        question_type_id: TRUTHY_OR_FALSY_QT_ID,
      })
    } catch (e) {
      console.log('question', question, 'failed')
    }
  }

  function generateQuestions(values: [string, number][]) {
    values.forEach(([question, difficultyLevel]) => {
      generateQuestion(question, difficultyLevel)
    })
  }

  /**
   * try { return 2 } finally { return 3 }
   */

  generateQuestions([
    ['3 + 1', 1],
    ['-true === false', 3],
    ['+true === 1', 3],
    ['-true === 0', 3],
    ['0 == "0"', 3],
    ['[] == ![]', 5],
    ['[] == false', 6],
    ['Number([]) === 0', 6],
    ['!!"false" == !!"true"', 4],
    ['null == undefined', 4],
    ['"string" instanceof String', 5],
    ['typeof "a" === \'object\'', 6],
    [`typeof String('a') == 'string'`, 6],
    [`new String('a') != 'a'`, 7],
    [`typeof new String('a') === 'object'`, 7],
    [`('b' + 'a' + + 'a' + 'a').toLowerCase() === 'banana'`, 7],
    [`(new String('a')).toString() === 'a'`, 8],
    [`+'a' === NaN`, 6],
    [`NaN !== NaN`, 7],
    [`Object.is(NaN, NaN)`, 7],
    [`0 === -0`, 6],
    [`Object.is(0, -0)`, 7],
    [`0 / 0 === NaN`, 7],
    [`1 / 0 === Infinity`, 7],
    [`typeof new Date === 'Date'`, 7],
    [`Object.prototype.toString.call({}) === '[object Object]'`, 7],
    [`Object.prototype.toString.call([]) === '[object Object]'`, 9],
    [`{}.toString.call([]) === '[object Array]'`, 9],
    [`{}.toString.call(new Date) === '[object Object]'`, 9],
    [`\`\${9999999999999999}\`.includes('9')`, 8],
    [`0.1 + 0.2 === 0.3`, 7],
    [`\`\${0.1 + 0.2}\`.length === 3`, 6],
    [`1 > 2 > 3`, 5],
    [`3 > 2 > 1`, 5],
    [`3 > 2 >= 1`, 5],
    [`'2' + 1 - 1 === 2`, 7],
    [`'2' - -1 === 21`, 7],
    [`parseInt('08') === 8`, 5],
    [`parseFloat(Infinity) === Infinity`, 5],
    [`parseInt(Infinity) === Infinity`, 7],
    [`Infinity === Infinity`, 4],
    [`Infinity === -Infinity`, 4],
    [`(2).toFixed(2) === '2'`, 5],
    [`2.0.toFixed(2) === '2.00'`, 5],
    [`10..toFixed(1) === '10'`, 7],
    [`~~8.3 === 9`, 7],
    [`~~8.3 === Math.round(8.3)`, 7],
    [
      `(![] + [])[+[]] + (![] + [])[+!+[]] + ([![]] + [][[]])[+!+[] + [+[]]] + (![] + [])[!+[] + !+[]] === 'fail'`,
      9,
    ],
    [`![] + [].toString() === 0`, 5],
    [`Number.MIN_VALUE > 0`, 7],
    [`[1,2] + [,4] === '1,2,,4'`, 6],
    [`[,,,].length === 4`, 6],
    [`[1,2,3,].length === 3`, 6],
    [`[,,,].toString() === ',,,'`, 6],
    [`Number() === 0`, 6],
    [`Number(undefined) === 0`, 7],
    [`parseInt('f*ck', 16) === 15`, 8],
    [`parseInt("Infinity", 19) === 18`, 8],
    [`isNaN(parseInt(null, 24))`, 8],
    [`isNaN(NaN)`, 4],
    [`parseInt({ toString: () => 2, valueOf: () => 1 }) === 1`, 6],
    [`Number({ toString: () => 2, valueOf: () => 1 }) === 1`, 6],
    [`parseInt(1 / 1999999) === 5`, 7],
    [`parseInt(0.0000001) === 0`, 6],
    [`true + true === 2`, 5],
    [`typeof NaN === 'number'`, 6],
    [`typeof null === 'object'`, 6],
    [`Math.pow(10, 16) + 1 === Math.pow(10, 16)`, 5],
    [`[4] * [4] === 1`, 5],
    [`isNaN([4, 4] * [4, 4])`, 6],
    [`{} + [] == [] + {}`, 6],
    [`({} + []) == ([] + {})`, 6],
    [`typeof String("str") == typeof new String("str")`, 5],
    [`{ [{}]: {} }[{}].toString() === '[object Object]'`, 5],
    [`(1).__proto__.toString() === '0'`, 6],
    [`\`\${{ Object }}\` === '{}'`, 6],
    [`[...'...'].length === 3`, 4],
    [`[...'...'].length === [...[...'...']].length`, 5],
    [`(() => {})() === undefined`, 4],
    [`Math.min() > Math.max()`, 5],
    [`Math.min() === Infinity`, 5],
    [`null > 0`, 5],
    [`[3, 2].sort()[0] === 3`, 3],
    [`[10, 4].sort()[0] === 4`, 5],
    [`"".split("").length === 0`, 5],
    [`"".split(" ").length === 0`, 5],
    [`JSON.stringify("Hi!") === "Hi!"`, 5],
    [`Infinity - 1 === Infinity`, 4],
    [`1 - Infinity === Infinity`, 4],
    [`0 === -0`, 4],
    [`Number.MAX_VALUE === Infinity`, 5],
    [`Number.MIN_VALUE.toString()[1] === 'e'`, 6],
    [`+ new Date == Date.now()`, 6],
    [`[2] == 2`, 6],
    [`null instanceof Object`, 6],
    [`JSON.stringify(-0) === "0"`, 7],
    [`-0 + "" === "-0"`, 7],
    [`Number("0O0") === 0`, 6],
    [`String([null]) === "null"`, 6],
    [`String(Symbol("I\'m unique!")) === 'Symbol(I\'m unique!)'`, 7],
    [`isNaN({} + {})`, 8],
  ])

  return { questionTypes, questions, answers }
}

export const generateSeedData = () => {
  const questions: Omit<Question, 'answers'>[] = []
  const answers: Answer[] = []

  let questionId = 1
  let answerId = 1

  situations.forEach((situation1) => {
    situations.forEach((situation2) => {
      const question1Text = `${situation1.label} == ${situation2.label}`

      let difficultyLevel = Math.round(
        (situation1.difficulty_level + situation2.difficulty_level) / 2,
      )

      if (situation1.label === situation2.label) difficultyLevel = 1

      answers.push(
        {
          id: answerId++,
          is_correct: !!(0, eval)(`(${question1Text})`),
          answer_text: 'Truthy',
          question_id: questionId,
        },
        {
          id: answerId++,
          is_correct: !(0, eval)(`(${question1Text})`),
          answer_text: 'Falsy',
          question_id: questionId,
        },
      )

      questions.push({
        id: questionId++,
        question_text: question1Text,
        difficulty_level: difficultyLevel,
        question_type_id: TRUTHY_OR_FALSY_QT_ID,
      })

      const question2Text = `${situation1.label} === ${situation2.label}`

      answers.push(
        {
          id: answerId++,
          is_correct: !!(0, eval)(`(${question2Text})`),
          answer_text: 'Truthy',
          question_id: questionId,
        },
        {
          id: answerId++,
          is_correct: !(0, eval)(`(${question2Text})`),
          answer_text: 'Falsy',
          question_id: questionId,
        },
      )

      questions.push({
        id: questionId++,
        question_text: question2Text,
        difficulty_level: difficultyLevel,
        question_type_id: TRUTHY_OR_FALSY_QT_ID,
      })
    })
  })

  return {
    answers,
    questions,
    questionTypes,
  }
}
