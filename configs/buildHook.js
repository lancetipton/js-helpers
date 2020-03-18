const fs = require('fs')
const path = require('path')
const { promisify } = require('util')
const { exec } = require('child_process')
const cmdExec = promisify(exec)

/**
 * Runs a command in a terminal
 * @param {string} cmd - Command to run
 *
 * @returns result of that command
 */
const runCmd = async (cmd) => {
  try {
    const output = await cmdExec(cmd)
    return output
  }
  catch(e){
    console.log(e.stack)
  }
}

/**
 * 
 * @export
 * @param {string} 
 *
 * @returns {void}
 */
export default function buildHook(devMode){
  return {
    name: 'buildHook',
    buildEnd: async () => {

      if(devMode !== 'esm') return

      const fromLoc = path.join(__dirname, '../')
      const appLoc = path.join(__dirname, '../../../../tdt/td_modules/jTree/app/node_modules/jsutils')
      const jTreeLoc = path.join(__dirname, '../../../../tdt/td_modules/jTree/node_modules/jsutils')

      await runCmd(`rm -rf ${appLoc}/build`)
      await runCmd(`cp -rf ${fromLoc}/build ${appLoc}/build`)
      await runCmd(`cp -rf ${fromLoc}/package.json ${appLoc}/package.json`)
      await runCmd(`cp -rf ${fromLoc}/src ${appLoc}/src`)
      
      await runCmd(`rm -rf ${jTreeLoc}/build`)
      await runCmd(`cp -rf ${fromLoc}/build ${jTreeLoc}/build`)
      await runCmd(`cp -rf ${fromLoc}/package.json ${jTreeLoc}/package.json`)
      await runCmd(`cp -rf ${fromLoc}/src ${jTreeLoc}/src`)

      console.log(`---------- finished copy ----------`)
      
      return true
    }
  }
}
