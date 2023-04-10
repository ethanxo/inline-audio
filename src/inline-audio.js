import { LitElement, html, css } from 'lit';
import "@lrnwebcomponents/simple-icon/simple-icon.js";
import "@lrnwebcomponents/simple-icon/lib/simple-icons.js";

class InlineAudio extends LitElement {
  static properties = {
    placeholder: { type: String },
  }

  static styles = css`
    :host {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      font-size: calc(10px + 2vmin);
      color: #1a2b42;
      max-width: 960px;
      margin: 0 auto;
      text-align: center;
      background-color: var(--inline-audio-background-color);
    }

    span:hover {

    }
  `;

  constructor() {
    super();
  }

  render() {
    return html`
    <span>
      <simple-icon>
      </simple-icon>
    </span>
    `;
  }
}

customElements.define('inline-audio', InlineAudio);