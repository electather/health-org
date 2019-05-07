import fs from 'fs';
import { homedir } from 'os';
import path from 'path';
import { dialog } from 'electron';

class FileLoader {
  constructor() {
    this.saveDir = path.join(homedir(), 'health');
    this.inputDir = path.join(this.saveDir, 'inputDir');
    this.outputDir = path.join(this.saveDir, 'outputDir');
    if (!fs.existsSync(this.saveDir)) {
      fs.mkdirSync(this.saveDir);
    }
    if (!fs.existsSync(this.inputDir)) {
      fs.mkdirSync(this.inputDir);
    }
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir);
    }
  }

  saveInputAsJson(inputData) {
    fs.writeFile(
      path.join(this.inputDir, 'input.json'),
      inputData,
      'utf8',
      e => {
        if (e) {
          dialog.showErrorBox(
            'خطا در ذخیره ورودی',
            'خطایی در ذخیره ورودی در سیستم به وجود آمد. لطفا دوباره تلاش کنید!'
          );
        }
      }
    );
  }
}
const instance = new FileLoader();
Object.freeze(instance);

export { instance as Loader };
