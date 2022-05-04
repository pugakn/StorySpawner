#!/usr/bin/env node

import chalk  from 'chalk'
import clear from 'clear'
import figlet from 'figlet'
import inquirer from 'inquirer'
import minimist from 'minimist'
import { getCurrentDirectoryBase, directoryExists } from './lib/files.js'

import fs from 'fs';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url))


const CreateParamas = async (filePath) => {
  let fileAsString = await fs.readFileSync(filePath, 'utf8')
  fileAsString = fileAsString.replace(/\/\/.*/g, '');
  fileAsString = fileAsString.replace(/\n/g, '').replace(/\s/g, '').replace(/\t/g, '').replace(/\r/g, '').replace(/\'/g, '').replace(/\"/g, '');
  const props = fileAsString.match(/props:{(.*?)}/g);
  if (props.length !== 1) {
    console.log(chalk.bgRed(`${filePath} has more than one props`));
    process.exit(1);
  }
  const propsString = props[0].replace('props:', '');
  //Add quotes to key objects
  const propsObject = propsString.replace(/\{/g, '{\"').replace(/\}/g, '\"}').replace(/:/g, '\":\"').replace(/,/g, '\",\"');

  console.log('propsssss', propsObject);
  console.log('props', JSON.parse(propsObject));
}

const CreateStory = async (filePath, dontOverride = false, confirmFirst = false) => {
  // const params = await CreateParamas(filePath);
  const componentNameScores = filePath.split('/').pop().replace('.vue', '')
  const storyPath = filePath.replace('.vue', '');
  const storyFile = `${storyPath}.stories.js`;
  const componentName = storyPath.replace(/^\w/, c => c.toUpperCase()).replace(/[-_]([a-z])/g, c => c.toUpperCase()).replace(/[-_]/g, '');
  const componentSeparatedName = componentName.replace(/(?=[A-Z])/g, ' ');
  const folderName = getCurrentDirectoryBase().replace(/^\w/, c => c.toUpperCase());
  const create = () => {
    console.log(
      chalk.bgGreen(
        `creating story for ${filePath}`
      )
    );
    const template = fs.readFileSync(path.resolve(__dirname, './story-template')).toString();
    fs.writeFileSync(storyFile, template.replace(/{{componentName}}/g, componentName).
      replace(/{{componentNameScores}}/g, componentNameScores).
      replace(/{{componentSeparatedName}}/g, componentSeparatedName).
      replace(/{{folderName}}/g, folderName));
  }
  if (dontOverride &&  directoryExists(storyFile)) {
    console.log(chalk.bgCyan(`Skip story creation for ${filePath}`));
    return;
  }
  if (directoryExists(storyFile)) {
    console.log(chalk.bgYellow(`${storyFile} already exists`));
    const response = await inquirer.prompt([{
      type: 'confirm',
      name: 'overwrite',
      message: 'Do you want to overwrite it?',
      default: false
    }])
    if (response.overwrite) {
      create();
    }
  } else {
    if (confirmFirst) {
      const response = await inquirer.prompt([{
        type: 'confirm',
        name: 'create',
        message: `Do you want to create a story for ${componentNameScores}?`,
        default: false
      }])
      if (response.create) {
        create();
      }
    } else {
      create();
    }
  }
}

const argv = minimist(process.argv.slice(2));

clear();

console.log(
  chalk.green(
    figlet.textSync('Story Sapwner', { horizontalLayout: 'full' })
  )
);


const name = argv.name;
if (name) {
  CreateStory(name);
} else {
  console.log(
    chalk.bgYellow(
      `no name provided`
    )
  );
  inquirer.prompt([{
    type: 'list',
    name: 'option',
    message: 'What do you want to do?',
    choices: [
      'Create a story for each vue file in the current directory',
      'Create a story for specific vue files']
  }]).then(async (answers) => {
    console.log(answers);
    if (answers.option === 'Create a story for each vue file in the current directory') {
      const files = fs.readdirSync(process.cwd());
      files.forEach(file => {
        if (file.endsWith('.vue')) {
          CreateStory(file, true);
        }
      });
    } else if (answers.option === 'Create a story for specific vue files') {
      const files = fs.readdirSync(process.cwd());
      for(let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.endsWith('.vue')) {
          await CreateStory(file, true, true);
        }
      }
    }
  });
  // //Spawn story for every vue file in current directory
}


