import axios, {AxiosResponse} from 'axios';

import {startApi} from '../src/api/api';

describe('Bank Kata Acceptance', () => {

  it('Should allow user to deposit and withdraw money in different dates and after allow user to request the transactions done', async () => {
    let apiPort = 3000;
    const api = await startApi(apiPort);

    try {
      const response = await executeUserJourney();
      thenTransactionsShouldBeTheExpected(response);
    } finally {
      api.close();
    }
  });

  async function executeUserJourney() {
    await userDeposit(1000);
    await userDeposit(2000);
    await userWithdraw(500);
    return await userRetrieveMovements();
  }

  async function userDeposit(amount: number) {
    try {
      await axios.post('http://localhost:3000/deposit', {
        amount
      });
    } catch (error: any) {
      error.message = `Error while executing deposit of ${amount}. ${error.message}`;
      throw error;
    }
  }

  async function userWithdraw(amount: number) {
    try {
      await axios.post('http://localhost:3000/withdraw', {
        amount
      });
    } catch (error: any) {
      error.message = `Error while executing withdraw of ${amount}. ${error.message}`;
      throw error;
    }
  }

  async function userRetrieveMovements() {
    try {
      return await axios.get('http://localhost:3000/transactions');
    } catch (error: any) {
      error.message = `Error while retrieving movements. ${error.message}`;
      throw error;
    }
  }

  function thenTransactionsShouldBeTheExpected(response: AxiosResponse<any>) {
    expect(response.data).toEqual([
      {
        amount: -500,
        balance: 2500,
        date: '14/01/2012'
      },
      {
        amount: 2000,
        balance: 3000,
        date: '13/01/2012'
      },
      {
        amount: 1000,
        balance: 1000,
        date: '10/01/2012'
      }
    ]);
  }
})
