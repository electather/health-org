import createWindow from '../helpers/window';
import url from 'url';
import { DataLoader } from '../helpers/loadData';
import path from 'path';
import env from 'env';

const createSpreadResultsWindow = () => {
  const resWindow = createWindow('srw', {
    height: 1000,
    width: 500,
    show: false,
    webPreferences: {
      nodeIntegration: true
    }
  });

  resWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, 'resault.html'),
      protocol: 'file:',
      slashes: true
    })
  );

  resWindow.once('ready-to-show', () => {
    resWindow.show();
    const dataLoader = new DataLoader(30);
    resWindow.webContents.send('chartData:send', dataLoader.processSIRData(5));
    resWindow.webContents.send('tableData:send', dataLoader.processBedData());
  });
  if (env.name === 'development') {
    resWindow.openDevTools();
  }

  return resWindow;
};

export { createSpreadResultsWindow };
