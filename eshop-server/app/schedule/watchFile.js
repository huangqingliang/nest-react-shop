'use strict';

const Subscription = require('egg').Subscription;

class WatchFile extends Subscription {
  static get schedule() {
    return {
      interval: '3s',
      type: 'worker',
    };
  }
  async subscribe() {
    console.log('===========>', new Date().getTime());
    const result = await this.ctx.service.news.getContent();
    console.log('result-------->', result);
  }
}

module.exports = WatchFile;
