declare module 'frame-stream' {
  import { Duplex } from 'stream';
  export function decode(opts: any): Duplex;
  export function encode(opts: any): Duplex;
}
