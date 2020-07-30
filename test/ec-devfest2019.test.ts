import { html, fixture, expect } from '@open-wc/testing';

import {EcDevfest2019} from '../src/EcDevfest2019.js';
import '../src/ec-devfest2019.js';

describe('EcDevfest2019', () => {
  let element: EcDevfest2019;
  beforeEach(async () => {
    element = await fixture(html`
      <ec-devfest2019></ec-devfest2019>
    `);
  });

  it('renders a h1', () => {
    const h1 = element.shadowRoot!.querySelector('h1')!;
    expect(h1).to.exist;
    expect(h1.textContent).to.equal('My app');
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
