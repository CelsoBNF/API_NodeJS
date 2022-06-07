' use strict ';

const axios = require('axios');
const cheerio = require('cheerio');
const Resultado = require('../models/resultado');
const Consulta = require('../models/consulta');

const GITHUB_DOMAIN = 'https://github.com/';

const crawler = async (consulta) => {
  const searchResultRequest = await axios.get(new URL(`search?q=${consulta.param_request}&type=users`, GITHUB_DOMAIN).href);

  if (searchResultRequest.status !== 200) {
    throw new Error('Request failed');
  }

  const searchResultCheerio = cheerio.load(searchResultRequest.data);
  const firstResultRelativeHref = searchResultCheerio('#user_search_results').find('a').first().attr('href');
  const firstResultFullPath = new URL(firstResultRelativeHref, GITHUB_DOMAIN).href;

  const firstResultRequest = await axios.get(firstResultFullPath);

  if (firstResultRequest.status !== 200) {
    throw new Error('Request failed');
  }

  const firstResultRequestCheerio = cheerio.load(firstResultRequest.data);

  const result = {
    pinned: extractPinned(firstResultRequestCheerio),
    header: extractHeader(firstResultRequestCheerio),
    repositories: extractRepositories(firstResultRequestCheerio),
  };

  await Consulta.update({ finalized: true, finalized_at: new Date(), response: result }, {
    where: {
      id: consulta.id,
    },
  });

  const resultadoRow = await Resultado.create({ consultaId: consulta.id, ...result });
  return result;
};

const extractHeader = ($) => ({
  topUsers: Array.from($('.member-avatar').map((_i, el) => $(el).attr('href').substring(1))),
  topLanguages: Array.from($('a.color-fg-muted>span>span[itemprop=programmingLanguage]').map((_i, el) => $(el).parent().text().trim())),
  topTags: Array.from($('.topic-tag').map((_i, el) => $(el).text().trim())),
  title: $('.pagehead').find('.lh-condensed').html().trim(),
  avatar: $('.pagehead').find('.avatar').attr('src').trim(),
  urls: Array.from($('.has-blog').find('a').map((i, el) => ({ url: $(el).attr('href'), description: $(el).text().trim() }))),
});

const extractRepositories = ($) => {
  const repositories = [];

  $('#org-repositories').find('li').each((i, el) => {
    const element = $(el);

    repositories.push({
      repository: element.find('[data-hovercard-type=repository]').text().trim(),
      status: '',
      url: new URL(element.find('a').attr('href'), GITHUB_DOMAIN).href,
      description: element.find('[itemprop=description]').text().trim(),
      tags: element.find($('a.topic-tag, a.topic-tag-link ')).text().trim(),
      language: element.find('[itemprop=programmingLanguage]').text().trim(),
      forks: element.find('svg[aria-label=fork]').parent().text().trim(),
      stars: element.find('svg.octicon-star').parent().text().trim(),
      issues: element.find('svg.octicon-issue-opened').parent().text().trim(),
      pullRequests: element.find('svg.octicon-git-pull-request').parent().text().trim(),
      lastUpdate: element.find('relative-time').attr('datetime'),
    });
  });

  return repositories;
};

const extractPinned = ($) => {
  const pinned = [];

  $('.pinned-item-list-item').each((i, el) => {
    const element = $(el);

    pinned.push({
      url: new URL(element.find('a').attr('href'), GITHUB_DOMAIN).href,
      repository: element.find('.repo').text(),
      description: element.find('.pinned-item-desc').text().trim(),
      language: element.find("[itemprop='programmingLanguage']").parent().text().trim(),
      stars: element.find("[aria-label='stars']").parent().text().trim(),
      forks: element.find("[aria-label='forks']").parent().text().trim(),
    });
  });

  return pinned;
};

module.exports = crawler;
