import fs from 'fs';
import path from 'path';
import { dialog } from 'electron';
import { homedir } from 'os';
import {
  generateNetwork,
  generatePopulation
} from '../generators/csvGenerator';
import { rScript } from '../generators/rGenerator';

class FileLoader {
  constructor() {
    this.saveDir = path.join(homedir(), 'healths');
    this.inputDir = path.join(this.saveDir, 'inputDir');
    this.outputDir = path.join(this.saveDir, 'outputDir');
    this.rExec = path.join(this.saveDir, 'SIR_final.R');
    if (!fs.existsSync(this.saveDir)) {
      fs.mkdirSync(this.saveDir);
    }
    if (!fs.existsSync(this.inputDir)) {
      fs.mkdirSync(this.inputDir);
    }
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir);
    }

    this.pathObj = {
      populationPath: path.join(this.inputDir, 'population.csv'),
      networkPath: path.join(this.inputDir, 'networkcsv.csv'),
      outBedPath: path.join(this.outputDir, 'outbed.json'),
      outSIRPath: path.join(this.outputDir, 'outsir.json'),
      inputPath: path.join(this.inputDir, 'input.json')
    };

    this.writeBackEndFiles();
  }

  saveInputAsJson(inputData) {
    fs.writeFile(this.pathObj.inputPath, inputData, 'utf8', e => {
      if (e) {
        dialog.showErrorBox(
          'خطا در ذخیره ورودی',
          'خطایی در ذخیره ورودی در سیستم به وجود آمد. لطفا دوباره تلاش کنید!'
        );
      }
    });
  }

  getChartOutputObj() {
    return JSON.parse(fs.readFileSync(this.pathObj.outSIRPath));
  }

  getTableOutputObj() {
    return JSON.parse(fs.readFileSync(this.pathObj.outBedPath));
  }

  writeBackEndFiles() {
    fs.writeFile(this.pathObj.networkPath, generateNetwork());
    fs.writeFile(this.pathObj.populationPath, generatePopulation());
    fs.writeFile(this.rExec, rScript(this.pathObj));
  }
}
const instance = new FileLoader();
Object.freeze(instance);

export { instance as Loader };
