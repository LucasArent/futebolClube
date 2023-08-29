import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { mockTeams } from './mocks/mock.team';
import SequelizeTeam from '../database/models/SequelizeTeam';
// import Example from '../database/models/ExampleModel';
// import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Team tests', () => {
 it('Should return all teams', async () => {
  sinon.stub(SequelizeTeam, 'findAll').resolves(mockTeams as any);

  const { body, status } = await chai.request(app).get('/teams');

  expect(status).to.be.eq(200);
  expect(body).to.be.deep.eq(mockTeams);
  });

  it('Seu sub-teste', () => {
    expect(false).to.be.eq(true);
  });
});
