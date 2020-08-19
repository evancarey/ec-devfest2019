import { property } from 'lit-element';
import { directive } from 'lit-html';

const resolved  = new WeakSet();

export const lazyload = directive((importPromise, value): any => {
  return (part: any) => {
    if (!resolved.has(part)) {
      importPromise.then(() => resolved.add(part));
      // TODO: signal pending work
      const event = new CustomEvent('pending-state', {
        composed: true,
        bubbles: true,
        detail: {
          promise: importPromise
        }
      });
      part.startNode.parentNode!.dispatchEvent(event);
    }
    part.setValue(value);
  };
});

export const PendingContainer = (Base: any) => class extends Base {
  // @property() __hasPendingChildren: boolean = false; // error TS1206: Decorators are not valid here ???
  // @property() __pendingCount = 0;                    // error TS1206: Decorators are not valid here ???
  static get properties() {
    return {
      __hasPendingChildren: { type: Boolean },
      __pendingCount: { type: Number }
    };
  }

  constructor() {
    super();
    this.addEventListener('pending-state', async (e: any) => {
      this.__hasPendingChildren = true;
      this.__pendingCount++;
      await e.detail.promise;
      this.__pendingCount--;
      this.__hasPendingChildren = this.__pendingCount !== 0;
    });
  }
};
