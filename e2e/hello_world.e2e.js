import { expect } from 'chai';
import testUtils from './utils';

describe('application launch', () => {
  beforeEach(testUtils.beforeEach);
  afterEach(testUtils.afterEach);

  it('shows second tab at start screen', function() {
    return this.app.client.getText('#second-tab').then(text => {
      expect(text).to.equal('اطلاعات بیماری');
    });
  });
});
