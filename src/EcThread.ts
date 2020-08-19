import { LitElement, html, property } from 'lit-element';
import { repeat } from 'lit-html/directives/repeat';

export class EcThread extends LitElement {
  @property({type: Object}) thread: any = {};
  constructor() {
    super();
  }
  clickHandler() {
    const event = new CustomEvent('show-inbox', {
      bubbles: true,
      composed: true,
      detail: {
        id: 'INBOX'
      }
    });
    this.dispatchEvent(event);
  }
  render() {
    return html`<div>
      <button @click=${this.clickHandler}>back to inbox</button>
      <ul>
        ${repeat(this.thread, (i: any) => i, (i, index) => html`<p>${i}</p>`)}
      </ul>
    </div>`;
  }
}
