#!/usr/bin/env node
const cm = require("commander");
const inquirer = require("inquirer");
const download = require("download-git-repo");
const path = require("path");

const fs = require("fs");
const handleBars = require("handlebars");
const ora = require('ora');
const chalk = require("chalk")
const symbols = require('log-symbols');

const url = "./";

const spinner = ora('正在下载模板...');

cm.version("0.1.1", "-v, --version");
cm.command("init <name>")
  .action(name => {

    let dirs = fs.readdirSync("./");
    if(dirs.includes(name)){
      console.log(symbols.error, chalk.red('已有文件夹, 创建项目失败'))
    }else{
      inquirer.prompt([{
        name: 'description',
        message: '请输入项目描述'
      },
      {
        name: 'author',
        message: '请输入作者名称'
      }]).then(answers => {
        spinner.start();
        download("https://github.com:zhujunwei/cli_template#master", url + name, {clone : true}, (err, res) => {
          if(err){
            spinner.fail();
            console.log(symbols.error, chalk.red('创建项目失败'))
          }else{
            const meta = {
              name,
              description: answers.description,
              author: answers.author
            }
            try {
              const fileName = `${url}/${name}/package.json`;
              const content = fs.readFileSync(fileName).toString();
              const result = handleBars.compile(content)(meta);
              fs.writeFileSync(fileName, result);
              spinner.succeed();
              console.log(symbols.success, chalk.green("创建成功"))
            } catch (error) {
              spinner.fail();
              console.log(symbols.error, chalk.red(' 创建项目失败'))
            }
          }
        })
      })
    }


    

    

    
})
cm.parse(process.argv);