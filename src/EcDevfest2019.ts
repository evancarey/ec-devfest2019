import { LitElement, html, css, property } from 'lit-element';
import { MDCDrawer } from "@material/drawer";
import { MDCLinearProgress } from '@material/linear-progress';

import page from 'page';
import { theData } from './data.js';
import { lazyload, PendingContainer } from './util.js';

export class EcDevfest2019 extends PendingContainer(LitElement) {

  @property({type: String}) currentView: 'inbox' | 'thread' = 'inbox';
  @property({type: Array}) threads: any[] = [];
  @property({type: Object}) thread: any = {};

  constructor() {
    super();
    this._installRoutes();
  }

  private _installRoutes() {
    page.redirect('/', '/inbox');
    page('/inbox', this._inboxRoute.bind(this));
    page('/inbox/:label', this._inboxRoute.bind(this));
    page('/thread/:id', this._threadRoute.bind(this));
    page('/*', this._notFoundRoute.bind(this));
    page();
    this.addEventListener('show-thread', (event: any) => {
      const threadId = (event as CustomEvent).detail.id;
      page(`/thread/${threadId}`);
    });
    this.addEventListener('show-inbox', (event: any) => {
      page('/inbox');
    });
  }

  private _inboxRoute(context: any) {
    this.currentView = 'inbox';
    const labelId: string = context.params['label'] ?? 'INBOX';
    this._getThreads(labelId);
  }

  private _threadRoute(context: any) {
    this.currentView = 'thread';
    const threadId: string = context.params['id'];
    this._getThread(threadId);
  }

  private _getThreads(id: string) {
    console.log(`_getThreads(${id})`);
    this.threads = theData.data;
  }

  private _getThread(id: string) {
    console.log(`id = ${id}`);
    this.thread = theData.data[parseInt(id)];
  }

  private _notFoundRoute() {
    this.currentView = 'inbox';
  }

  static styles = css`
    :host { }
  `;

  _renderCurrentView() {
    switch (this.currentView) {
      case 'inbox': 
        return lazyload(import('./ec-inbox.js'), html`<ec-inbox .threads="${this.threads}"></ec-inbox>`);
      case 'thread': 
        return lazyload(import('./ec-thread.js'), html`<ec-thread .thread="${this.thread}"></ec-thread>`);
    }
  }

  render() {
    return html`
      <mdc-linear-progress .closed=${true}></mdc-linear-progress>
      <mdc-linear-progress .closed=${this.__hasPendingChildren}></mdc-linear-progress>
      <mdc-drawer>
        <div slot="appContent">${this._renderCurrentView()}</div>
      </mdc-drawer>
    `;
  }
}
