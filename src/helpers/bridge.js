import { createSpreadResultsWindow } from '../pages/spreadResaults';
import { Loader } from './fileLoader';
import { dialog } from 'electron';
import { exec } from 'child_process';

class Bridge {
  constructor() {}

  processInfectionSpread(data) {
    Loader.saveInputAsJson(data);

    exec(`Rscript ${Loader.rExec}`, function(error, stdout, stderr) {
      if (error) {
        console.log(error);
        dialog.showErrorBox(
          'خطا در پردازش داده ها!',
          'لطفا وجود فایل پردازشگر را برسی نمایید!'
        );
        return;
      } else if (stderr) {
        console.log(stderr);
      } else if (stdout) {
        console.log(stdout);
      }
      createSpreadResultsWindow();
    });
  }
}

export { Bridge };
