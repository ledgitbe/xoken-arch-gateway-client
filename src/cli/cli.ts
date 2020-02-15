/**
 * CLI client work in progress
 */
import { REPLServer } from 'repl';
import commander from 'commander';
import { Client } from '../lib/client';

const program = new commander.Command();
program
  .name('xoken-arch-gateway-client')
  .option('-c, --host', 'Host', '127.0.0.1')
  .option('-p, --port', 'Port', '9090')
  .option('-i, --interactive', 'Interactive mode');

program.command('getBlockByHeight <height>');
program.command('getBlocksByHeights <heights>');
program.command('getBlockByHash <hash>');
program.command('getBlocksByHashes <hashes>');
program.command('getTransactionByTxId <txid>');
program.command('getTransactionsByTxIds <txids>');
program.command('getOutputsByAddress <address>');
program.command('getOutputsByAddresses <addresses>');
program.command('getMerkleBranchByTxId <txid>');

program.parse(process.argv);

if (program.args.length === 0) {
  program.outputHelp();
  process.exit(0);
}

const client = new Client(program.host, parseInt(program.port || 9090));

// eslint-disable-next-line
const repl = require('repl');
const replServer: REPLServer = repl.start('>>> ');

const wrapper = (f: Function) => async (args: any) => {
  const F = f.bind(client);
  F(args).then(console.log);
};

for (const func of Object.getOwnPropertyNames(Client.prototype)) {
  if (func === 'constructor' || func === 'call') continue;
  (replServer.context as any)[func] = wrapper((client as any)[func]);
}
// //const optLength = Object.keys(program.opts()).length;
// const cmd = 'get';
// let args: any = program.args;

// for (let i = 0; i < args.length; i++) {
//   if (!isNaN(parseInt(args[i]))) {
//     args[i] = parseInt(args[i]);
//   }
// }

// if (args.length === 1) {
//   args = args[0];
// }

// (client as any)[cmd](args).then((result: any) => {
//   console.log(JSON.stringify(result, null, 2));
// });
