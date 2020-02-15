import 'mocha';
import { wire } from './vectors';
import { Client } from '../lib/client';
import { Socket, createServer } from 'net';
import frame from 'frame-stream';
import { assert } from 'chai';

describe('Wire formats', () => {
  let clientData: Buffer;
  let client: Client;

  before(() => {
    const server = createServer((s: Socket) => {
      // 'connection' listener.
      const inbound = frame.decode({ lengthSize: 2 });
      const outbound = frame.encode({ lengthSize: 2 });

      console.log('client connected');
      s.pipe(inbound);
      outbound.pipe(s);

      s.on('data', data => {
        clientData = data;
        outbound.write(Buffer.from('Received something, sending stuff back'));
      });
    });

    server.on('error', err => {
      throw err;
    });

    server.listen(19090, () => {
      console.log('Test server bound');
      client = new Client('localhost', 19090);
    });
  });

  for (const vector of wire) {
    it(vector.call, async () => {
      await ((client as unknown) as any)[vector.call](vector.args);
      assert(clientData.equals(Buffer.from(vector.hex, 'hex')));
    });
  }
});
