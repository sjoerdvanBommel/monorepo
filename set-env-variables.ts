import * as fs from 'fs'

const ignore = ['node_modules']

function copyEnvFiles(directory: string) {
  const files = fs.readdirSync(directory)
  files.forEach((file) => {
    if (ignore.includes(file)) return

    const filePath = `${directory}/${file}`

    if (fs.statSync(filePath).isDirectory()) {
      copyEnvFiles(filePath)
    } else if (file === '.env.example') {
      fs.copyFileSync(filePath, `${directory}/.env`)
      console.log(
        `Copied ${filePath.replace(
          currentDirectory,
          '',
        )} to ${directory.replace(currentDirectory, '')}/.env`,
      )
    }
  })
}

const currentDirectory = process.cwd()
copyEnvFiles(currentDirectory)
