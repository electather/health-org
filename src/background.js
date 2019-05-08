import { app, ipcMain, Menu } from 'electron';
import env from 'env';
import path from 'path';
import url from 'url';
import createWindow from './helpers/window';
import { devMenuTemplate } from './menu/dev_menu_template';
import { editMenuTemplate } from './menu/edit_menu_template';
import { Bridge } from './helpers/bridge';

const setApplicationMenu = () => {
  const menus = editMenuTemplate;
  if (env.name !== 'production') {
    menus.push(devMenuTemplate);
  }
  Menu.setApplicationMenu(Menu.buildFromTemplate(menus));
};

if (env.name !== 'production') {
  const userDataPath = app.getPath('userData');
  app.setPath('userData', `${userDataPath} (${env.name})`);
}

app.on('ready', () => {
  setApplicationMenu();

  const mainWindow = createWindow('bg', {
    width: 2000,
    height: 1500
  });

  mainWindow.center();

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, 'app.html'),
      protocol: 'file:',
      slashes: true
    })
  );

  if (env.name === 'development') {
    mainWindow.openDevTools();
  }
});

ipcMain.on('infectionData:send', (event, data) => {
  data['healing_rate'] = !!data['healing_rate'] ? data['healing_rate'] : 0.3;
  data['infection_rate'] = !!data['infection_rate']
    ? data['infection_rate']
    : 0.1;
  const json = JSON.stringify(data);
  const bridge = new Bridge();
  bridge.processInfectionSpread(json);
});

app.on('window-all-closed', () => {
  app.quit();
});
