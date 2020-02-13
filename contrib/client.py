#!/usr/bin/python
# -*- coding: utf-8 -*-
import sys
import glob
import time
import socket
from cbor2 import dumps, loads, CBORTag


def sendRequest(s, payload):
    length = len(payload)
    lenPrefix = length.to_bytes(2, 'big')
    full = lenPrefix + payload
    s.sendall(lenPrefix)
    print ('Sending lenPrefix', lenPrefix)
    s.sendall(payload)
    print ('Sending payload', payload)
    prefix = s.recv(2)
    leng = int.from_bytes(prefix, byteorder='big')
    raw = s.recv(leng)
    data = loads(raw)
    print ('Received', data)


def client(host, port):
    print ('Starting...')
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.connect((host, int(port)))
    return s


if len(sys.argv) < 3:
    print ('Invalid args, need: <hostname> <port>')
    exit(0)

sock = client(sys.argv[1], sys.argv[2])


x1 = dumps((0, 1, 'HEIGHT->BLOCK', [(0, 100)]))

x2 = dumps((0, 1, '[HEIGHT]->[BLOCK]', [(1, [100, 101, 102])]))

x3 = dumps((0, 1, 'HASH->BLOCK', [(2,
           '00000000d1145790a8694403d4063f323d499e655c83426834d4ce2f8dd4a2ee'
           )]))

x4 = dumps((0, 1, '[HASH]->[BLOCK]', [(3,
           ['000000000000000002af2a6de04d4a1a73973827eae348fe4d3f4d05610ff968'
           ,
           '000000000000000007fc734cbf1fc04c59cf7ecb6af0707fd5cf5b8d46dc4c75'
           ])]))

x5 = dumps((0, 1, 'TXID->TX', [(4,
           '7d3eb236b526bd681b7fc499d657d237b4d3bc21ef25b37fc1c70822849f1243'
           )]))

x6 = dumps((0, 1, '[TXID]->[TX]', [(5,
           ['6c828920ea3a968f0c3c4a8f14d70b696e0440d8e4e1d019cced1ba2cc63cd51'
           ,
           '097cf9d4ec10711e809f316b7738bbbff94efe32ea2cd55e57ddf5840f828741'
           ])]))

x7 = dumps((0, 1, 'ADDR->[OUTPUT]', [(6,
           '13n561iVozTtMXJzAJNA5TQsnTboRvpxae')]))

x8 = dumps((0, 1, '[ADDR]->[OUTPUT]', [(7,
           ['1P8Jd8qQM7y45iXLM1eiXCCmGRhCPjykZB',
           '16qgC3hzi38xo1vn2gGsNVwWaW1sEH3h9R'])]))

x9 = dumps((0, 1, 'TXID->[MNODE]', [(8,
           '571c7508413415debe4ba146a2ed141e4d4204d0743169ab3366b1f1e1960a5d'
           )]))

sendRequest(sock, x1)
sendRequest(sock, x2)
sendRequest(sock, x3)
sendRequest(sock, x4)
sendRequest(sock, x5)
sendRequest(sock, x6)
sendRequest(sock, x7)
sendRequest(sock, x8)
sendRequest(sock, x9)
#
