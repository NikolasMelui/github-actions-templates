const { existsSync } = require('fs');
const { readFile } = require('fs/promises');
const { resolve } = require('path');
const { get } = require('axios').default;

(async () => {
  try {
    if (!existsSync) {
      console.error(`There is no 'addresses.txt' file`);
      return;
    }
    const addressesPath = resolve(__dirname, 'addresses.txt');
    const addresses = (await readFile(addressesPath)).toString();
    if (!addresses) {
      console.error(`There is no addresses in the 'address.txt' file`);
      return;
    }
    const addressList = addresses.split('\n');
    for (const address of addressList) {
      console.log(address)
      const {data} = await get(address);
      if (!data) {
        console.error('There is no results, something went wrong...');
        continue;
      }
      console.info(`The result of ${address} request - ${data}`)
    }
  } catch (error) {
    console.error(error);
  }
})(); 