const { TextEncoder, TextDecoder } = require('node:util');

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
import '@testing-library/jest-dom';
