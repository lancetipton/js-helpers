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
      
      const fromLoc = path.join(__dirname, '../')
      const toLoc = path.join(__dirname, '../../../../tdt/td_modules/jTree/app/node_modules/jsutils')

      await runCmd(`cp -rf ${fromLoc}/build ${toLoc}/build`)
      await runCmd(`cp -rf ${fromLoc}/package.json ${toLoc}/package.json`)
      await runCmd(`cp -rf ${fromLoc}/src ${toLoc}/src`)
      
      console.log(`---------- finished copy ----------`)
      
      return true
    }
  }
}
