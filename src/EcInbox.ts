import { LitElement, html, property } from 'lit-element';
import { repeat } from 'lit-html/directives/repeat';
import './ec-thread-hdr.js'

export class EcInbox extends LitElement {
  @property({type: Array}) threads: any[] = [];
  render() {
    return html`<ul>
      ${repeat(this.threads, (i: any) => i, (i, index) => html`<li><ec-thread-hdr .thread=${i} .index=${index}></ec-thread-hdr></li>`)}
    </ul>`;
  }
}
