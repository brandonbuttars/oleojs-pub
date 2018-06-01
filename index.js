export default class OleoPubSubClass {
  constructor(alias = 'PubSub') {
    this.topics = {};
    this.hOP = this.topics.hasOwnProperty;
    if (!window[alias]) { window[alias] = this }
  }

  _uid(topic) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let i = 0, txt = topic.toLowerCase().replace(/[-:\ ]/ig, '_') +'__';
    for (i < 6; i++;) { txt += chars.charAt(Math.floor(Math.random() * chars.length)); }
    return txt;
  }

  _publish(topic, info) {
    if (!this.hOP.call(this.topics, topic)) { return }
    const topics = this.topics[topic],
          keys = Object.keys(topics);
    keys.forEach(key => {
      topics[key](info !== undefined ? info : {});
    });
  }

  _subscribe(topic, listener) {
    const tpc = topic.replace(/[-:\ ]/g, '_'),
          index = this._uid(topic);
    if (!this.hOP.call(this.topics, topic)) { this.topics[topic] = {} }
    this.topics[topic][index] = listener;
    return index;
  }

  _unsubscribe(topic, index) {
    delete this.topics[topic][index];
    if (this.topics[topic] === {}) {
      delete this.topics[topic];
    }
  }

  _riot_off(component, topic, index) {
    component.on('unmount', () => {
      this._unsubscribe(topic, index);
    });
  }

  push(topic, info) { this._publish(topic, info) }

  on(topic, listener, component = false) {
    const index = this._subscribe(topic, listener);
    if (component) { this._riot_off(component, topic, index) }
  }

  off(topic, index) { this._unsubscribe(topic, index) }
}
