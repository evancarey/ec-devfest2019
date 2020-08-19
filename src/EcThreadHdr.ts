import { LitElement, html, property } from 'lit-element';

export class EcThreadHdr extends LitElement {
  @property({type: Object}) thread: any = {};
  @property({type: String}) index: any;

  constructor() {
    super();
    this.addEventListener('click', () => {
      const event = new CustomEvent('show-thread', {
        bubbles: true,
        composed: true,
        detail: {
          id: this.index
        }
      });
      this.dispatchEvent(event);
    });
  }

  render() {
    return html`<div>
      <p>${this.thread[8]}</p>
    </div>`;
  }
}
