import { LitElement, html, css } from 'lit';
import "@lrnwebcomponents/simple-icon/simple-icon.js";
import "@lrnwebcomponents/simple-icon/lib/simple-icons.js";

// https://github.com/elmsln/issues/issues/1102

class InlineAudio extends LitElement {
  static properties = {
    icon: { type: String },
    size: { type: Number },
    volume: { type: Number },
    playing: { type: Boolean },
    url: { type: String },
    playedratio: { type: Number }
  }

  static styles = css`
    @import url('https://fonts.googleapis.com/css2?family=Lato&display=swap');

    span {
      margin: 0px 4px;
      //background-color: rgba(0, 0, 0, 0.15);
      background: linear-gradient(to right, rgba(0, 0, 0, 0.15) 100%, rgba(0, 0, 0, 0.05) 0);
      border-radius: 4px;
      font-family: 'Lato', sans-serif;
    }

    #audio {
      display: none;
    }
  `;

  constructor() {
    super();
    this.icon = "av:play-arrow"; // av:play-arrow av:pause
    this.size = 18;
    this.volume = 1;
    this.playing = false;
    this.url = "https://download.samplelib.com/mp3/sample-15s.mp3";
  } 

  a_play() {
    let audio = this.shadowRoot.getElementById('audio');
    audio.play();
    this.playing = true;
    this.icon = "av:pause";
  }
  a_pause() {
    let audio = this.shadowRoot.getElementById('audio');
    audio.pause();
    audio.currentTime = 0;
    this.playing = false;
    this.icon = "av:play-arrow";
  }
  a_toggle() {
    if (this.playing)
      this.a_pause();
    else
      this.a_play();    
  }

  highlight() {
    if (!this.playing) {
      if (this.shadowRoot.querySelector('span').style.background == "linear-gradient(to right, rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.07) 0)")
        return
      else
        this.shadowRoot.querySelector('span').style.background = "linear-gradient(to right, rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.07) 0)";
    }
    else {
      let audio = this.shadowRoot.getElementById('audio');
      this.playedratio = audio.currentTime / audio.duration;
      this.shadowRoot.querySelector('span').style.background = "linear-gradient(to right, rgba(0, 0, 0, 0.15) " + this.playedratio * 100 + "%, rgba(0, 0, 0, 0.05) 0)";
    }
  }

  firstUpdated() {
    let audio = this.shadowRoot.getElementById('audio');
    let icon = this.shadowRoot.getElementById('icon');
    audio.volume = this.volume;
    icon.addEventListener("click", this.a_toggle.bind(this)); // toggle on icon click
    audio.addEventListener("ended", this.a_pause.bind(this)); // reset upon end as if it was manually stopped
    setInterval(this.highlight.bind(this), 50); // 20x per second
  }

  render() {
    return html`
    <span style="font-size:${this.size}px">
      <audio id="audio" preload="auto">
        <source src="${this.url}">
      </audio>
      <simple-icon id="icon" accent-color="black" style="--simple-icon-width:${this.size}px; --simple-icon-height:${this.size}px;" icon="${this.icon}"></simple-icon>
      <slot></slot>
    </span>
    `;
  }
}

customElements.define('inline-audio', InlineAudio);