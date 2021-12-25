// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import "./__mockAudioContext__";
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });

// const mockGetUserMedia = jest.fn(async() => {
//     return new Promise(resolve => resolve());
//   });

const mediaDevicesMock = {
  getUserMedia: jest.fn().mockImplementation(async() => {
    return new Promise(resolve => resolve())
  })
};

window.navigator.mediaDevices = mediaDevicesMock;


// const mockGetUserMedia = jest.fn(async () => {
//     return new Promise(resolve => {
//         resolve()
//     })
// })

// Object.defineProperty(global.window.navigator, 'mediaDevices', {
//     value: {
//         getUserMedia: mockGetUserMedia,
//     },
// })

// const mockGetUserMedia = {
//     getUserMedia: jest.fn(async() => new Promise(resolve => resolve()))
// }
  
//   Object.defineProperty(global.navigator,
//     "mediaDevices", {
//       writable: true,
//       start: jest.fn(),
//       value: {
//         getUserMedia: mockGetUserMedia
//       }
//   });
//   global.navigator.mediaDevices.getUserMedia = mockGetUserMedia;

// global.navigator.mediaDevices = mockGetUserMedia;