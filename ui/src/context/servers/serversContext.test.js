import React, { useContext, useEffect } from 'react';
import ServersContext from './serversContext';
import ServersState from './serversState';
import Adapter from 'enzyme-adapter-react-16';
import { mount, configure } from 'enzyme';

configure({ adapter: new Adapter() });
describe('reboot', () => {
    it('reboot single server', () => {
        const TestComponent = () => {
            const { servers, rebootServer } = useContext(ServersContext);

            return (
                <>
                    <div data-testid='SingleServerValue'>{servers[0].status}</div>
                    <button onClick={() => rebootServer(1)}>findOnline</button>
                </>
            )
        }

        const wrapper = mount(
            <ServersState>
                <TestComponent />
            </ServersState>
        )

        expect(wrapper.find('[data-testid="SingleServerValue"]').text()).toEqual('ONLINE');

        wrapper.find('button').simulate('click');

        expect(wrapper.find('[data-testid="SingleServerValue"]').text()).toEqual('ONLINE');

        setTimeout(() => {
            expect(wrapper.find('[data-testid="SingleServerValue"]').text()).toEqual('REBOOTING');
        }, 300)

        expect(wrapper.find('[data-testid="SingleServerValue"]').text()).toEqual('ONLINE');
    })
})