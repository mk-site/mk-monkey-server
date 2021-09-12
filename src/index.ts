import 'reflect-metadata';
export { TYPES } from './constants';
export * from './core'; // 容器、服务
import { MonkeyServer } from './core';

const server = new MonkeyServer({});