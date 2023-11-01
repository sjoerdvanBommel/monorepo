import slugify from 'slugify'
import type {
  Answer,
  CourseSection,
  CourseWithoutRelations,
  QuestionType,
  QuestionWithoutRelations,
  Quiz,
} from '../client'

const JAVASCRIPT_COURSE_ID = 1
const JAVASCRIPT_COURSE_TITLE = 'The Interactive JavaScript Journey'
const JAVASCRIPT_COURSE_SLUG = slugify(JAVASCRIPT_COURSE_TITLE, { lower: true })

const TRUTHY_OR_FALSY_QT_ID = 1
const TRUTHY_OR_FALSY_QUIZ_ID = 1
const TRUTHY_OR_FALSY_QUIZ_TITLE = 'JavaScript: Truthy or Falsy?'
const TRUTHY_OR_FALSY_QUIZ_SLUG = slugify(TRUTHY_OR_FALSY_QUIZ_TITLE, {
  lower: true,
})

const INTRODUCTION_SECTION_ID = 1
const TRUTHY_OR_FALSY_SECTION_ID = 2

const AWS_BUCKET = process.env.AWS_BUCKET!
const AWS_REGION = process.env.AWS_REGION!

export const courses: readonly CourseWithoutRelations[] = [
  {
    id: JAVASCRIPT_COURSE_ID,
    slug: JAVASCRIPT_COURSE_SLUG,
    title: JAVASCRIPT_COURSE_TITLE,
    description:
      'JavaScript is big. Almost every developer has been in touch with JavaScript at some point in their career. Mastering it is therefore a very useful skill. This interactive course will adapt to your experience level and provide you hands-on challenges, dynamic exercises, and expert guidance!',
    imageUrl:
      'https://mr-ss-bucket-staging.s3.eu-west-2.amazonaws.com/javascript+logo.png',
  },
]

export const questionTypes: readonly QuestionType[] = [
  {
    id: TRUTHY_OR_FALSY_QT_ID,
    typeName: 'Truthy or Falsy?',
  },
] as const

export const quizzes: readonly Omit<Quiz, 'questions'>[] = [
  {
    id: TRUTHY_OR_FALSY_QUIZ_ID,
    slug: TRUTHY_OR_FALSY_QUIZ_SLUG,
    title: TRUTHY_OR_FALSY_QUIZ_TITLE,
    difficultyLevels: [
      'JUNIOR_DEVELOPER',
      'MEDIOR_DEVELOPER',
      'SENIOR_DEVELOPER',
      'TECH_LEAD',
    ],
    imageUrl: `https://${AWS_BUCKET}.s3.${AWS_REGION}.amazonaws.com/truthy-or-falsy.png`,
    sectionId: TRUTHY_OR_FALSY_SECTION_ID,
  },
]

const introductionTitle = 'Introduction'
const truthyOrFalsyTitle = 'Truthy or Falsy?'
const declaringVariablesTitle = 'Declaring variables'
const arraysTitle = 'Arrays'

export const sections: readonly Omit<CourseSection, 'quizzes'>[] = [
  {
    id: INTRODUCTION_SECTION_ID,
    slug: slugify(introductionTitle, { lower: true }),
    title: introductionTitle,
    courseId: JAVASCRIPT_COURSE_ID,
    content: `
      # JavaScript Introduction

      TODO JavaScript introduction
    `,
  },
  {
    id: TRUTHY_OR_FALSY_SECTION_ID,
    slug: slugify(truthyOrFalsyTitle, { lower: true }),
    title: truthyOrFalsyTitle,
    content: 'Truthy and falsy are JavaScript concepts that...',
    courseId: JAVASCRIPT_COURSE_ID,
  },
  {
    id: 3,
    slug: slugify(declaringVariablesTitle, { lower: true }),
    title: declaringVariablesTitle,
    courseId: JAVASCRIPT_COURSE_ID,
    content: `
      # Declaring variables

      TODO Declaring variables
    `,
  },
  {
    id: 4,
    slug: slugify(arraysTitle, { lower: true }),
    title: arraysTitle,
    courseId: JAVASCRIPT_COURSE_ID,
    content: `
      # Arrays

      TODO Arrays
    `,
  },
]

export const generateFunSeedData = () => {
  const questions: QuestionWithoutRelations[] = []
  const answers: Answer[] = []
  let currentQuestionId = 0
  let currentAnswerId = 0

  function generateQuestion(question: string) {
    try {
      answers.push(
        {
          id: currentAnswerId++,
          isCorrect: !!(0, eval)(`(${question})`),
          answerText: 'Truthy',
          questionId: currentQuestionId,
        },
        {
          id: currentAnswerId++,
          isCorrect: !(0, eval)(`(${question})`),
          answerText: 'Falsy',
          questionId: currentQuestionId,
        },
      )

      questions.push({
        id: currentQuestionId++,
        questionText: question,
        questionTypeId: TRUTHY_OR_FALSY_QT_ID,
        quizId: TRUTHY_OR_FALSY_QUIZ_ID,
      })
    } catch (e) {
      console.log('question', question, 'failed')
    }
  }

  function generateQuestions(values: string[]) {
    values.forEach((question) => {
      generateQuestion(question)
    })
  }

  /**
   * try { return 2 } finally { return 3 }
   */

  generateQuestions([
    '3 + 1',
    '-true === false',
    '+true === 1',
    '-true === 0',
    '0 == "0"',
    '[] == ![]',
    '[] == false',
    'Number([]) === 0',
    '!!"false" == !!"true"',
    'null == undefined',
    '"string" instanceof String',
    'typeof "a" === \'object\'',
    `typeof String('a') == 'string'`,
    `new String('a') != 'a'`,
    `typeof new String('a') === 'object'`,
    `('b' + 'a' + + 'a' + 'a').toLowerCase() === 'banana'`,
    `(new String('a')).toString() === 'a'`,
    `+'a' === NaN`,
    `NaN !== NaN`,
    `Object.is(NaN, NaN)`,
    `0 === -0`,
    `Object.is(0, -0)`,
    `0 / 0 === NaN`,
    `1 / 0 === Infinity`,
    `typeof new Date === 'Date'`,
    `Object.prototype.toString.call({}) === '[object Object]'`,
    `Object.prototype.toString.call([]) === '[object Object]'`,
    `{}.toString.call([]) === '[object Array]'`,
    `{}.toString.call(new Date) === '[object Object]'`,
    `\`\${9999999999999999}\`.includes('9')`,
    `0.1 + 0.2 === 0.3`,
    `\`\${0.1 + 0.2}\`.length === 3`,
    `1 > 2 > 3`,
    `3 > 2 > 1`,
    `3 > 2 >= 1`,
    `'2' + 1 - 1 === 2`,
    `'2' - -1 === 21`,
    `parseInt('08') === 8`,
    `parseFloat(Infinity) === Infinity`,
    `parseInt(Infinity) === Infinity`,
    `Infinity === Infinity`,
    `Infinity === -Infinity`,
    `(2).toFixed(2) === '2'`,
    `2.0.toFixed(2) === '2.00'`,
    `10..toFixed(1) === '10'`,
    `~~8.3 === 9`,
    `~~8.3 === Math.round(8.3)`,
    `(![] + [])[+[]] + (![] + [])[+!+[]] + ([![]] + [][[]])[+!+[] + [+[]]] + (![] + [])[!+[] + !+[]] === 'fail'`,
    `![] + [].toString() === 0`,
    `Number.MIN_VALUE > 0`,
    `[1,2] + [,4] === '1,2,,4'`,
    `[,,,].length === 4`,
    `[1,2,3,].length === 3`,
    `[,,,].toString() === ',,,'`,
    `Number() === 0`,
    `Number(undefined) === 0`,
    `parseInt('f*ck', 16) === 15`,
    `parseInt("Infinity", 19) === 18`,
    `isNaN(parseInt(null, 24))`,
    `isNaN(NaN)`,
    `parseInt({ toString: () => 2, valueOf: () => 1 }) === 1`,
    `Number({ toString: () => 2, valueOf: () => 1 }) === 1`,
    `parseInt(1 / 1999999) === 5`,
    `parseInt(0.0000001) === 0`,
    `true + true === 2`,
    `typeof NaN === 'number'`,
    `typeof null === 'object'`,
    `Math.pow(10, 16) + 1 === Math.pow(10, 16)`,
    `[4] * [4] === 1`,
    `isNaN([4, 4] * [4, 4])`,
    `{} + [] == [] + {}`,
    `({} + []) == ([] + {})`,
    `typeof String("str") == typeof new String("str")`,
    `{ [{}]: {} }[{}].toString() === '[object Object]'`,
    `(1).__proto__.toString() === '0'`,
    `\`\${{ Object }}\` === '{}'`,
    `[...'...'].length === 3`,
    `[...'...'].length === [...[...'...']].length`,
    `(() => {})() === undefined`,
    `Math.min() > Math.max()`,
    `Math.min() === Infinity`,
    `null > 0`,
    `[3, 2].sort()[0] === 3`,
    `[10, 4].sort()[0] === 4`,
    `"".split("").length === 0`,
    `"".split(" ").length === 0`,
    `JSON.stringify("Hi!") === "Hi!"`,
    `Infinity - 1 === Infinity`,
    `1 - Infinity === Infinity`,
    `0 === -0`,
    `Number.MAX_VALUE === Infinity`,
    `Number.MIN_VALUE.toString()[1] === 'e'`,
    `+ new Date == Date.now()`,
    `[2] == 2`,
    `null instanceof Object`,
    `JSON.stringify(-0) === "0"`,
    `-0 + "" === "-0"`,
    `Number("0O0") === 0`,
    `String([null]) === "null"`,
    `isNaN({} + {})`,
  ])

  return { questionTypes, questions, answers, quizzes, courses, sections }
}

/**

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

export const generateSeedData = () => {
  const questions: Omit<Question, 'answers'>[] = []
  const answers: Answer[] = []

  let questionId = 1
  let answerId = 1

  situations.forEach((situation1) => {
    situations.forEach((situation2) => {
      const question1Text = `${situation1.label} == ${situation2.label}`

      answers.push(
        {
          id: answerId++,
          isCorrect: !!(0, eval)(`(${question1Text})`),
          answerText: 'Truthy',
          questionId: questionId,
        },
        {
          id: answerId++,
          isCorrect: !(0, eval)(`(${question1Text})`),
          answerText: 'Falsy',
          questionId: questionId,
        },
      )

      questions.push({
        id: questionId++,
        questionText: question1Text,
        questionTypeId: TRUTHY_OR_FALSY_QT_ID,
        quizSlug: TRUTHY_OR_FALSY_QUIZ_SLUG,
      })

      const question2Text = `${situation1.label} === ${situation2.label}`

      answers.push(
        {
          id: answerId++,
          isCorrect: !!(0, eval)(`(${question2Text})`),
          answerText: 'Truthy',
          questionId: questionId,
        },
        {
          id: answerId++,
          isCorrect: !(0, eval)(`(${question2Text})`),
          answerText: 'Falsy',
          questionId: questionId,
        },
      )

      questions.push({
        id: questionId++,
        questionText: question2Text,
        questionTypeId: TRUTHY_OR_FALSY_QT_ID,
        quizSlug: TRUTHY_OR_FALSY_QUIZ_SLUG,
      })
    })
  })

  return {
    answers,
    questions,
    questionTypes,
  }
}

*/
