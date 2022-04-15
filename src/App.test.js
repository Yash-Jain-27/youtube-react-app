import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import App from './App';
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import userEvent from '@testing-library/user-event';

jest.mock('axios');
// import axios from "axios";
jest.spyOn(global, 'setTimeout');

const server = setupServer(
    rest.get('/search', (req, res, ctx) => {
        return res(ctx.json({
            data: {
                items: [{
                    test: '123'
                }],
                nextPageToken: ''
            }
        }))
    }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => {
    server.close()
    jest.clearAllTimers()
})

beforeEach(() => {
    // IntersectionObserver isn't available in test environment
    const mockIntersectionObserver = jest.fn();
    mockIntersectionObserver.mockReturnValue({
        observe: () => null,
        unobserve: () => null,
        disconnect: () => null
    });
    window.IntersectionObserver = mockIntersectionObserver;
});

// beforeAll(() => {
//     axios.get.mockImplementation(() => Promise.resolve({
//         data: {
//             items: [{
//                 test: '123'
//             }],
//             nextPageToken: ''
//         }
//     }));
// });

test('test app', async () => {
    //   server.use(
    //       rest.get('/search', (req, res, ctx) => {
    //           console.log('testtestsetet')
    //           return res(ctx.json({
    //               data: {
    //                   items: [],
    //                   nextPageToken: ''
    //               }
    //           }))
    //       }),
    //   )
    // axios.get.mockResolvedValueOnce({
    //     data: {
    //         items: [],
    //         nextPageToken: ''
    //     }
    // });
    render(<App />)

    expect(screen.getByTestId('searchInput')).toHaveDisplayValue("")
    screen.getByPlaceholderText('Search youtube videos')
    const input = screen.getByTestId('searchInput')

    userEvent.type(input, 'Good');
    // fireEvent.change(input, { target: { value: 'Good' } })

    // jest.runOnlyPendingTimers();

    // await waitFor(() => expect(setTimeout).toHaveBeenCalledWith(), { timeout: 1000 });

    expect(screen.getByTestId('searchInput')).toHaveDisplayValue("Good")
    const video = screen.getByTestId('videoList').childNodes
    expect(setTimeout).toHaveBeenCalled();
    // console.log(video)
    // expect(axios.get).toHaveBeenCalled()
})
