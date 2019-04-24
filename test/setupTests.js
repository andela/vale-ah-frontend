import '../node_modules/regenerator-runtime/runtime';
import enzyme from 'enzyme';
import thunk from 'redux-thunk';
import Adapter from 'enzyme-adapter-react-16';
import configMockStore from 'redux-mock-store';
import dotenv from 'dotenv';
// React 16 Enzyme adapter
enzyme.configure({ adapter: new Adapter() });
jest.mock('axios');
dotenv.config();
export const mockStore = configMockStore([thunk]);
