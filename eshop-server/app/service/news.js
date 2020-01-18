'use strict';

const Service = require('egg').Service;

class NewsService extends Service {
  async getNewsList() {
    return [
      { title: '11' },
      { title: '22' },
      { title: '33' },
      { title: '44' },
    ];
  }
  async getContent() {
    return { content: 'content1' };
  }
}

module.exports = NewsService;
