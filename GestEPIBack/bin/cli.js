#!/usr/bin/env node

const {execSync} = require('child_process');

const runCommand = command=>{
    try {
        execSync(`${command}`, {stdio: 'inherit'});
    } catch (error) {
        console.log(error);
        return false;
    }
    return true; 
}

const repoName = process.argv[2];
const gitCheckoutCommand = `git clone --depth 1 https://github.com/Romeo-Giorgio/create-express-ts-mariadb-api.git ${repoName}`;
const installDepsCommand = `cd ${repoName} && npm install`;
const deleteGitCommand = `cd ${repoName} && rm -rf .git`;
const setProjectSettings = `cd ${repoName} && node -e "let pkg=require('./package.json'); pkg.name='${repoName}'; pkg.version='1.0.0'; pkg.author=''; pkg.repository=undefined; pkg.description=''; require('fs').writeFileSync('package.json', JSON.stringify(pkg, null, 2));"`

console.log(`Cloning repository with name ${repoName}`);
const checkedOut = runCommand(gitCheckoutCommand);
if(!checkedOut) process.exit(-1);

console.log(`Installing dependencies for ${repoName}`);
const installedDeps = runCommand(installDepsCommand);
if(!installedDeps) process.exit(-1);

console.log("Delete template's git history");
const deletedGit = runCommand(deleteGitCommand);
if(!deletedGit) process.exit(-1);

console.log("Set project parameters");
const settingsDone = runCommand(setProjectSettings);
if(!settingsDone) process.exit(-1);

console.log("Congratulations ! You are ready. Follow the following command to start");
console.log(`cd ${repoName} && npm run dev`);