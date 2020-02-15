import frame from 'frame-stream';
import { Socket, createConnection } from 'net';
import cbor from 'cbor';
import { Duplex } from 'stream';

export class Client {
  private socket: Socket;
  private outbound: Duplex;
  private inbound: Duplex;

  constructor(host: string, port: number) {
    this.socket = createConnection(port, host);
    this.outbound = frame.encode({ lengthSize: 2 });
    this.inbound = frame.decode({ lengthSize: 2 });
    this.outbound.pipe(this.socket);
    this.socket.pipe(this.inbound);
  }

  async call(func: string, i: number, args: any): Promise<any> {
    return new Promise(resolve => {
      const msg = cbor.encode([0, 1, func, [[i, args]]]);
      const handler = (msg: Buffer) => {
        const decoded = cbor.decode(msg);
        this.inbound.off('data', handler);
        resolve(decoded);
      };
      this.inbound.on('data', handler);
      this.outbound.write(msg);
    });
  }

  async getBlockByHeight(height: number): Promise<any> {
    return this.call('HEIGHT->BLOCK', 0, height);
  }

  async getBlocksByHeights(heights: Array<number>): Promise<any> {
    return this.call('[HEIGHT]->[BLOCK]', 1, heights);
  }

  async getBlockByHash(hash: string): Promise<any> {
    return this.call('HASH->BLOCK', 2, hash);
  }

  async getBlocksByHashes(hashes: Array<string>): Promise<any> {
    return this.call('[HASH]->[BLOCK]', 3, hashes);
  }

  async getTransactionByTxId(txid: string): Promise<any> {
    return this.call('TXID->TX', 4, txid);
  }

  async getTransactionsByTxIds(txids: Array<string>): Promise<any> {
    return this.call('[TXID]->[TX]', 5, txids);
  }

  async getOutputsByAddress(address: string): Promise<any> {
    return this.call('ADDR->[OUTPUT]', 6, address);
  }

  async getOutputsByAddresses(addresses: Array<string>): Promise<any> {
    return this.call('[ADDR]->[OUTPUT]', 7, addresses);
  }

  async getMerkleBranchByTxId(txid: string): Promise<any> {
    return this.call('TXID->[MNODE]', 8, txid);
  }
}
