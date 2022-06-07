const Agenda = require('agenda');
const consts = require('../consts');
const crawler = require('../filters/crawler');

/** Simplifica a interface e salva o resultado no banco */
const agendaWrapper = (fn) => async (job, done) => {
  try {
    console.log('Connected!! Nice');
    job.attrs.result = await fn(job.attrs.data);
    done();
  } catch (e) {
    done(e);
  }
};

const agenda = new Agenda({ db: { address: consts.MONGO_API_URL }, processEvery: '15 seconds' });

agenda.define('crawler', agendaWrapper(crawler));

module.exports = agenda;
