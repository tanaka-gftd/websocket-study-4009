'use strict';
import $ from 'jquery';
const block = $('#block');
const scalingButton = $('#scaling-button');

scalingButton.on('click', () => {
  block.animate({ width: '200pt', height: '200pt' }, 2000);
  block.animate({ width: '100pt', height: '100pt' }, 2000);
});

const movingButton = $('#moving-button');

movingButton.on('click', () => {
  block.animate({ 'marginLeft': '500px' }, 500);
  block.animate({ 'marginLeft': '20px' }, 1000);
});

const loadavg = $('#loadavg');

/* クライアントサイドのJavaScriptをAJAX用から、WebSocket用に置き換え */

//WebSocketのオブジェクトを、socket.io-clientモジュールから読み込み、http://localhost:8000 に接続することで作成
import io from 'socket.io-client';
const socket = io('http://localhost:8000');

/* 
  WebSocket の接続上で server-status という文字列で定義されるイベントが発生した場合、
  そのデータを受け取って jQueryオブジェクト（ここではp要素のid=loadavg）を利用して、 
  pugテンプレートの中のloadavgの文字列を受け取ったデータで更新する実装
*/
socket.on('server-status', (data) => {
  loadavg.text(data.loadavg.toString());
})
